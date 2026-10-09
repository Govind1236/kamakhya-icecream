// Syncs the Contact section's editable content into the backend so nothing
// user-facing on the contact/footer area is hardcoded in the components:
//   - Ensures the `Address`, `MapLink` and `MapEmbed` fields exist on `ContactUs`.
//   - Migrates the legacy `Map` value into `Address` (it always held a street
//     address, the field name was just wrong).
//   - Cleans up `SocialMedia` links that were saved wrapped in backticks.
//
//   node setup-contact-content.mjs
import {
  getToken,
  listCollections,
  ensureField,
  request,
  readItemsOrEmpty,
} from "./setup-lib.mjs";

const CONTACT_FIELDS = [
  // [field, interfaceType, type, note]
  ["Address", "input-multiline", "text", "Street address shown on the contact cards and in the footer."],
  ["MapLink", "input", "string", "Google Maps link for the location card."],
  ["MapEmbed", "input", "string", "Embeddable map URL used in the footer iframe."],
];

// Values that used to live inline in the components before this migration.
const SEEDS = {
  Address: "Arjundhara - 06, Pushpalal Chowk",
  MapLink: "https://share.google/gmhjPcFdxrLkzav4u",
  MapEmbed:
    "https://maps.google.com/maps?q=Shree%20Mata%20Kamakhya%20Ice-cream%20Udhyog%2C%20Shani%20Arjun%2C%20Koshi%20Province%206&z=16&output=embed",
};

async function main() {
  const token = await getToken();

  const collections = await listCollections(token);
  for (const required of ["ContactUs", "SocialMedia"]) {
    if (!collections.has(required)) {
      throw new Error(`Collection "${required}" is missing — run scaffold-flavors.mjs first.`);
    }
  }

  for (const [field, interfaceType, type, note] of CONTACT_FIELDS) {
    await ensureField(token, "ContactUs", { field, type, interface: interfaceType, note });
  }

  // Migrate the legacy `Map` value into `Address` before anything reads it.
  const items = await readItemsOrEmpty("ContactUs", token);
  const patch = {};
  for (const item of items) {
    const legacyAddress = typeof item.Map === "string" && item.Map.trim() ? item.Map.trim() : null;
    if (legacyAddress && !item.Address) {
      patch.Address = legacyAddress;
      console.log(`move  ContactUs/${item.id}.Map -> Address`);
    }
  }

  // Only seed fields that are still empty so re-runs never clobber edits.
  const target = items[0];
  if (target) {
    for (const [field] of CONTACT_FIELDS) {
      if (!patch[field] && !target[field] && SEEDS[field]) {
        patch[field] = SEEDS[field];
        console.log(`seed  ContactUs.${field}`);
      }
    }
  } else {
    console.log("warn  ContactUs has no rows yet — create one in the admin app, then re-run to seed it.");
  }

  if (target && Object.keys(patch).length > 0) {
    const result = await request(`/items/ContactUs/${target.id}`, {
      method: "PATCH",
      token,
      body: patch,
    });
    console.log(`patched ContactUs item ${result.id}:`, patch);
  } else {
    console.log("no ContactUs fields to patch");
  }

  // Strip the stray backticks some social links were saved with.
  for (const row of await readItemsOrEmpty("SocialMedia", token)) {
    if (typeof row.Link !== "string") continue;
    const cleaned = row.Link.trim().replace(/^`+|`+$/g, "").trim();
    if (cleaned && cleaned !== row.Link) {
      await request(`/items/SocialMedia/${row.id}`, { method: "PATCH", token, body: { Link: cleaned } });
      console.log(`clean SocialMedia/${row.id}.Link`);
    }
  }

  console.log("Done. Contact content is now editable in the backend.");
}

main().catch((err) => {
  console.error(`setup failed: ${err.message}`);
  process.exit(1);
});