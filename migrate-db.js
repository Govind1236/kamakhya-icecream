import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const localPool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'kamakhyaDB',
  user: 'postgres',
  password: 'postgres',
});

const neonPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function getTables(pool) {
  const result = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);
  return result.rows.map(r => r.table_name);
}

async function getTableSchema(pool, tableName) {
  const result = await pool.query(`
    SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = $1
    ORDER BY ordinal_position
  `, [tableName]);
  return result.rows;
}

async function getSequences(pool) {
  const result = await pool.query(`
    SELECT c.relname AS sequence_name
    FROM pg_class c
    WHERE c.relkind = 'S'
    AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  `);
  return result.rows.map(r => r.sequence_name);
}

async function getIndexes(pool, tableName) {
  const result = await pool.query(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = $1
  `, [tableName]);
  return result.rows;
}

async function getForeignKeys(pool, tableName) {
  const result = await pool.query(`
    SELECT
      tc.constraint_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = $1
  `, [tableName]);
  return result.rows;
}

async function getTableData(pool, tableName) {
  const result = await pool.query(`SELECT * FROM "${tableName}"`);
  return result.rows;
}

async function createSequences(pool, sequences) {
  for (const seq of sequences) {
    try {
      await pool.query(`CREATE SEQUENCE IF NOT EXISTS "${seq}"`);
    } catch (e) {
      // ignore
    }
  }
}

async function createTable(pool, tableName, columns, sequences) {
  const colDefs = columns.map(col => {
    let def = `"${col.column_name}" ${col.data_type}`;
    if (col.character_maximum_length) {
      def += `(${col.character_maximum_length})`;
    }
    if (col.is_nullable === 'NO') {
      def += ' NOT NULL';
    }
    return def;
  }).join(', ');
  
  await pool.query(`CREATE TABLE IF NOT EXISTS "${tableName}" (${colDefs})`);
  
  for (const col of columns) {
    if (col.column_default && col.column_default.includes('nextval')) {
      const seqMatch = col.column_default.match(/nextval\('([^']+)'/);
      if (seqMatch) {
        const seqName = seqMatch[1].replace(/"/g, '');
        try {
          await pool.query(`ALTER TABLE "${tableName}" ALTER COLUMN "${col.column_name}" SET DEFAULT nextval('${seqName}')`);
          await pool.query(`ALTER SEQUENCE "${seqName}" OWNED BY "${tableName}"."${col.column_name}"`);
        } catch (e) {
          // ignore
        }
      }
    }
  }
}

async function createIndexes(pool, indexes) {
  for (const idx of indexes) {
    if (!idx.indexdef.includes('PRIMARY KEY') && !idx.indexdef.includes('UNIQUE')) {
      try {
        await pool.query(idx.indexdef);
      } catch (e) {
        // ignore
      }
    }
  }
}

async function createForeignKeys(pool, tableName, fks) {
  for (const fk of fks) {
    try {
      await pool.query(`
        ALTER TABLE "${tableName}" 
        ADD CONSTRAINT "${fk.constraint_name}" 
        FOREIGN KEY ("${fk.column_name}") 
        REFERENCES "${fk.foreign_table_name}" ("${fk.foreign_column_name}")
      `);
    } catch (e) {
      // ignore
    }
  }
}

async function copyTableData(localPool, neonPool, tableName) {
  const data = await getTableData(localPool, tableName);
  if (data.length === 0) {
    console.log(`  ${tableName}: 0 rows`);
    return 0;
  }
  
  const columns = Object.keys(data[0]);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const colNames = columns.map(c => `"${c}"`).join(', ');
  
  const client = await neonPool.connect();
  try {
    await client.query('BEGIN');
    for (const row of data) {
      const values = columns.map(c => {
        const val = row[c];
        if (val !== null && typeof val === 'object') {
          return JSON.stringify(val);
        }
        return val;
      });
      await client.query(
        `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`,
        values
      );
    }
    await client.query('COMMIT');
    console.log(`  ${tableName}: ${data.length} rows`);
    return data.length;
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(`Failed to copy ${tableName}:`, e.message);
    throw e;
  } finally {
    client.release();
  }
}

async function migrate() {
  console.log('Starting migration from local Directus to Neon...\n');
  
  try {
    await localPool.query('SELECT 1');
    console.log('✓ Connected to local database');
    
    await neonPool.query('SELECT 1');
    console.log('✓ Connected to Neon database\n');
    
    const tables = await getTables(localPool);
    console.log(`Found ${tables.length} tables to migrate:\n`);
    
    const sequences = await getSequences(localPool);
    console.log(`Creating ${sequences.length} sequences...`);
    await createSequences(neonPool, sequences);
    console.log('✓ Sequences created\n');
    
    console.log('Creating tables...');
    for (const table of tables) {
      const columns = await getTableSchema(localPool, table);
      await createTable(neonPool, table, columns, sequences);
    }
    console.log('✓ Tables created\n');
    
    console.log('Copying data...');
    for (const table of tables) {
      console.log(`Migrating ${table}...`);
      await copyTableData(localPool, neonPool, table);
    }
    console.log('\n✓ Data copied\n');
    
    console.log('Creating indexes...');
    for (const table of tables) {
      const indexes = await getIndexes(localPool, table);
      await createIndexes(neonPool, indexes);
    }
    console.log('✓ Indexes created\n');
    
    console.log('Creating foreign keys...');
    for (const table of tables) {
      const fks = await getForeignKeys(localPool, table);
      await createForeignKeys(neonPool, table, fks);
    }
    console.log('✓ Foreign keys created\n');
    
    console.log('✅ Migration complete!');
    
    const neonTables = await getTables(neonPool);
    console.log(`\nTables in Neon: ${neonTables.join(', ')}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await localPool.end();
    await neonPool.end();
  }
}

migrate();