const { Client } = require("pg");
const c = new Client({ host: "127.0.0.1", port: 5432, database: "kamakhyaDB", user: "postgres", password: "postgres" });
(async () => {
  await c.connect();
  for (const t of ["Products", "AboutUs", "ContactUs", "Hero_Section"]) {
    const r = await c.query(
      `select column_name, data_type, is_nullable from information_schema.columns where table_name=$1 order by ordinal_position`,
      [t]
    );
    console.log("=== " + t + " ===");
    for (const row of r.rows) console.log(row.column_name + " | " + row.data_type + " | null=" + row.is_nullable);
  }
  await c.end();
})().catch(e => { console.error(e.message); process.exit(1); });