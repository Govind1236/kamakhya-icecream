// Creates an `Inquiries` collection in Directus and grants anonymous users
// permission to CREATE rows (submissions) so the contact form works without auth.
//
//   node setup-inquiries.mjs
import "dotenv/config";

const BASE = (process.env.VITE_DIRECTUS_URL ?? "http://localhost:8055").replace(/\/$/, "");

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

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const login = await adminRequest("/auth/login", { method: "POST", body: { email, password } });
  const token = login.data.access_token;

  const policies = await adminRequest("/policies?limit=-1", { token });
  const pub = policies.data.find((p) => !p.app_access && !p.admin_access);
  if (!pub) throw new Error("Could not find the public policy.");

  // 1. Create the collection
  let collection;
  try {
    collection = await adminRequest("/collections", {
      method: "POST",
      token,
      body: {
        collection: "Inquiries",
        meta: {
          collection: "Inquiries",
          note: "Contact form inquiries submitted from the website.",
          color: "#E60000",
        },
        schema: {
          name: "Inquiries",
          comment: "Contact form inquiries submitted from the website.",
        },
      },
    });
    console.log("Collection Inquiries created.");
  } catch (e) {
    if (/already exists/i.test(e.message)) {
      console.log("Collection Inquiries already exists.");
    } else {
      throw e;
    }
  }

  // 2. Add fields
  const fields = [
    { field: "Name", type: "string", interface: "input", required: true, sort: 2 },
    { field: "Email", type: "string", interface: "input", required: true, sort: 3 },
    { field: "Phone", type: "string", interface: "input", required: false, sort: 4 },
    { field: "Message", type: "text", interface: "input-multiline", required: true, sort: 5 },
    { field: "Status", type: "string", interface: "input", required: false, sort: 6 },
  ];
  for (const f of fields) {
    try {
      await adminRequest(`/fields/Inquiries`, {
        method: "POST",
        token,
        body: {
          field: f.field,
          type: f.type,
          meta: {
            interface: f.interface,
            width: "full",
            required: f.required,
          },
        },
      });
      console.log(`Field ${f.field} added.`);
    } catch (e) {
      if (/already exists/i.test(e.message)) {
        console.log(`Field ${f.field} already exists.`);
      } else {
        throw e;
      }
    }
  }

  // 3. Grant anonymous create permission on Inquiries
  //
  // NOTE: This Directus instance has "custom permission rules" restricted (a
  // licensed feature). At runtime, any permission whose fields aren't "*" is
  // treated as a custom rule and filtered out. So we grant all fields ("*").
  const existing = await adminRequest(
    `/permissions?limit=-1&filter[policy][_eq]=${pub.id}&filter[collection][_eq]=Inquiries&filter[action][_eq]=create`,
    { token }
  );
  if (existing.data.length === 0) {
    await adminRequest("/permissions", {
      method: "POST",
      token,
      body: {
        policy: pub.id,
        collection: "Inquiries",
        action: "create",
        fields: ["*"],
      },
    });
    console.log("Public create permission granted on Inquiries.");
  } else {
    console.log("Public create permission already exists on Inquiries.");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error("setup failed:", e.message);
  process.exit(1);
});