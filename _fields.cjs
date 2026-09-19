const { Client } = require("pg");
const c = new Client({ host: "127.0.0.1", port: 5432, database: "kamakhyaDB", user: "postgres", password: "postgres" });
(async () => {
  await c.connect();
  const r = await c.query("select collection,field,special,interface from directus_fields where collection in ('Products','AboutUs','Hero_Section','ContactUs') order by collection,sort");
  for (const row of r.rows) console.log(row.collection + " | " + row.field + " | " + row.type + " | " + (row.special || "") + " | " + row.interface);
  await c.end();
})().catch(e => { console.error(e.message); process.exit(1); });