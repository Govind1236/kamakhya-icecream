const { Client } = require("pg");

const c = new Client({
  host: "127.0.0.1",
  port: 5432,
  database: "kamakhyaDB",
  user: "postgres",
  password: "postgres",
});

(async () => {
  await c.connect();

  const tables = await c.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
  );
  console.log("PUBLIC TABLES:", JSON.stringify(tables.rows.map((r) => r.table_name)));

  for (const name of ["directus_collections", "directus_roles", "directus_users", "directus_fields"]) {
    try {
      const list = await c.query(`SELECT * FROM ${name}`);
      console.log(`${name} (${list.rows.length}):`, JSON.stringify(list.rows.slice(0, 5)));
    } catch (e) {
      console.log(`${name}: ERROR ${e.message}`);
    }
  }
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
}).finally(() => c.end());