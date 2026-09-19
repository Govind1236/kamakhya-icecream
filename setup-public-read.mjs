// Grants public (anonymous) READ access to the three content collections the
// site renders plus directus_files, so both the browser SPA and SSR can load
// the menu/hero/about content without authentication.
//
//   node setup-public-read.mjs
//
// Uses env DELIVERENV... defaults to http://localhost:8055
import "dotenv/config";

const BASE = (process.env.VITE_DIRECTUS_URL ?? process.env.DIRECTUS_URL ?? "http://localhost:8055").replace(/\/$/, "");

async function adminRequest(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(json.errors?.[0]?.message ?? json)}`);
  return json;
}

const COLLECTIONS = ["Hero_Section", "AboutUsItem", "ContactUs", "Products", "directus_files"];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  // login
  const login = await adminRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  const token = login.data.access_token;

  // public policy = the policy with app_access & admin_access false
  const policies = await adminRequest("/policies?limit=-1", { token });
  const pub = policies.data.find((p) => !p.app_access && !p.admin_access);
  if (!pub) throw new Error("Could not find the public policy.");
  console.log(`Public policy: ${pub.id} ${JSON.stringify(pub.name)}`);

  const existing = await adminRequest(`/permissions?limit=-1&filter[policy][_eq]=${pub.id}`, { token });
  const existingKeys = new Set(
    existing.data
      .filter((p) => p.action === "read")
      .map((p) => `${p.collection}|${p.action}`)
  );

  for (const collection of COLLECTIONS) {
    if (existingKeys.has(`${collection}|read`)) {
      console.log(`skip  ${collection} read (already present)`);
      continue;
    }
    await adminRequest("/permissions", {
      method: "POST",
      token,
      body: {
        policy: pub.id,
        collection,
        action: "read",
        fields: ["*"],
        permissions: {},
        validation: {},
      },
    });
    console.log(`grant ${collection} read`);
  }

  console.log("Done. Public read granted for the rendered content collections.");
}

main().catch((e) => {
  console.error("setup failed:", e.message);
  process.exit(1);
});
