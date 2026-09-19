const { Client } = require("pg");
const c = new Client({ host: "127.0.0.1", port: 5432, database: "kamakhyaDB", user: "postgres", password: "postgres" });
(async () => {
  await c.connect();
  for (const t of ["Products", "AboutUs", "ContactUs", "Hero_Section"]) {
    const r = await c.query('select count(*) as n from "' + t + '"');
    console.log(t + ": " + r.rows[0].n);
  }
  await c.end();
})().catch(e => { console.error(e.message); process.exit(1); });