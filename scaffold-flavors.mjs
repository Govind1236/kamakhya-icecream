import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  createDirectus,
  rest,
  staticToken,
  authentication,
  createCollection,
  createField,
  createPermissions,
  readCollections,
} from "@directus/sdk";

const BASE_URL =
  process.env.DIRECTUS_URL ?? process.env.PUBLIC_URL ?? "http://localhost:8055";

async function getAdminClient() {
  if (process.env.DIRECTUS_ADMIN_TOKEN) {
    return createDirectus(BASE_URL)
      .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN))
      .with(rest());
  }

  const authClient = createDirectus(BASE_URL)
    .with(authentication("json"))
    .with(rest());
  await authClient.login({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  const token = randomUUID();
  await authClient.request({
    method: "PATCH",
    path: "/users/me",
    body: { token },
  });

  persistToken(token);
  return createDirectus(BASE_URL).with(staticToken(token)).with(rest());
}

function persistToken(token) {
  const envPath = join(process.cwd(), ".env");
  let content;
  try {
    content = readFileSync(envPath, "utf8");
  } catch {
    content = "";
  }

  const lines = content.split(/\r?\n/);
  const hasKey = lines.some((line) =>
    /^\s*DIRECTUS_ADMIN_TOKEN\s*=/.test(line)
  );

  if (!hasKey) {
    const entry = `DIRECTUS_ADMIN_TOKEN="${token}"`;
    writeFileSync(envPath, content.trimEnd() + (content.trimEnd() ? "\n" : "") + entry + "\n", "utf8");
    console.log(`Static admin token saved to .env as DIRECTUS_ADMIN_TOKEN`);
  }
}

const collections = [
  {
    collection: "flavors",
    schema: {},
    meta: {
      icon: "ice_cream",
      note: "Ice-cream flavors for Kamakhya Ice-Cream",
      display_template: "{{name}}",
    },
  },
];

const fields = [
  {
    field: "name",
    type: "string",
    schema: { is_nullable: false, max_length: 255 },
    meta: { interface: "input", label: "Name", required: true },
  },
  {
    field: "description",
    type: "text",
    schema: { is_nullable: true },
    meta: { interface: "input-multiline", label: "Description" },
  },
  {
    field: "price",
    type: "integer",
    schema: { is_nullable: true },
    meta: { interface: "input", label: "Price", options: { min: 0 } },
  },
  {
    field: "image",
    type: "uuid",
    schema: { is_nullable: true },
    meta: { interface: "file", label: "Image", special: ["file"] },
  },
  {
    field: "status",
    type: "string",
    schema: { is_nullable: true, default_value: "available" },
    meta: {
      interface: "select-dropdown",
      label: "Status",
      options: {
        choices: [
          { text: "Available", value: "available" },
          { text: "Sold Out", value: "sold_out" },
        ],
      },
    },
  },
  {
    field: "category",
    type: "string",
    schema: { is_nullable: true },
    meta: {
      interface: "select-dropdown",
      label: "Category",
      options: {
        choices: [
          { text: "Cups", value: "Cups" },
          { text: "Family Packs", value: "Family Packs" },
          { text: "Kulfi", value: "Kulfi" },
        ],
      },
    },
  },
  {
    field: "stock_count",
    type: "integer",
    schema: { is_nullable: true },
    meta: { interface: "input", label: "Stock Count", options: { min: 0 } },
  },
];

const publicPermissions = [
  {
    role: null,
    collection: "flavors",
    action: "read",
    fields: ["*"],
    permissions: {},
    validation: {},
  },
  {
    role: null,
    collection: "directus_files",
    action: "read",
    fields: ["*"],
    permissions: {},
    validation: {},
  },
];

async function main() {
  const client = await getAdminClient();

  const existing = await client.request(readCollections());
  if (existing.some((c) => c.collection === "flavors")) {
    console.log("'flavors' collection already exists — skipping creation.");
  } else {
    await client.request(createCollection(collections[0]));
    for (const field of fields) {
      await client.request(createField("flavors", field));
    }
    await client.request(createPermissions(publicPermissions));
    console.log("Done: 'flavors' collection, fields, and public read permissions created.");
  }
}

main().catch((err) => {
  console.error("Scaffold failed:", err.message ?? err);
  process.exit(1);
});