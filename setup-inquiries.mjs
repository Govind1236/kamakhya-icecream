// Creates the `Inquiries` collection and grants anonymous users permission to
// CREATE rows so the contact form works without authentication.
//
//   node setup-inquiries.mjs
import {
  getToken,
  getPublicPolicyId,
  ensureCollection,
  ensureField,
  grantPermission,
} from "./setup-lib.mjs";

const FIELDS = [
  { field: "Name", type: "string", interface: "input", required: true },
  { field: "Email", type: "string", interface: "input", required: true },
  { field: "Phone", type: "string", interface: "input", required: false },
  { field: "Message", type: "text", interface: "input-multiline", required: true },
  { field: "Status", type: "string", interface: "input", required: false },
];

async function main() {
  const token = await getToken();

  await ensureCollection(token, {
    collection: "Inquiries",
    note: "Contact form inquiries submitted from the website.",
    icon: "mail",
    color: "#E60000",
    display_template: "{{Name}}",
  });

  for (const field of FIELDS) {
    await ensureField(token, "Inquiries", field);
  }

  // NOTE: this Directus instance restricts "custom permission rules" (a licensed
  // feature). At runtime any permission whose fields aren't "*" is treated as a
  // custom rule and filtered out, so the grant has to be all fields.
  const publicPolicy = await getPublicPolicyId(token);
  await grantPermission(token, publicPolicy, "Inquiries", "create", ["*"]);

  console.log("Done. Contact form submissions can be posted anonymously.");
}

main().catch((err) => {
  console.error(`setup failed: ${err.message}`);
  process.exit(1);
});