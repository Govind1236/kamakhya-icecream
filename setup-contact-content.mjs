// Syncs the Contact section's editable content into the backend so nothing
// user-facing on the contact/footer area is hardcoded in the components:
//   - Adds `Address`, `MapLink` and `MapEmbed` text fields to `ContactUs`.
//   - Migrates the legacy `Map` value into `Address` (it always held a street
//     address, the field name was just wrong).
//   - Cleans up `SocialMedia` links that were saved wrapped in backticks.
//
//   node setup-contact-content.mjs
//
// Uses env like setup-public-read.mjs.
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

const CONTACT_FIELDS = [
  // [field, interfaceType, type, seedValue, note]
  ["Address", "input-multiline", "text", null, "Street address shown on the contact cards and in the footer."],
  ["MapLink", "input", "string", "https://share.google/gmhjPcFdxrLkzav4u", "Google Maps link for the location card."],
  ["MapEmbed", "input", "string", "https://maps.google.com/maps?q=Shree%20Mata%20Kamakhya%20Ice-cream%20Udhyog%2C%20Shani%20Arjun%2C%20Koshi%20Province%206&z=16&output=embed", "Embeddable map URL used in the footer iframe."],
];

// Values that used to live inline in the components before this migration.
const SEEDS = {
  Address: "Arjundhara - 06, Pushpalal Chowk",
  MapLink: "https://share.google/gmhjPcFdxrLkzav4u",
  MapEmbed:
    "https://maps.google.com/maps?q=Shree%20Mata%20Kamakhya%20Ice-cream%20Udhyog%2C%20Shani%20Arjun%2C%20Koshi%20Province%206&z=16&output=embed",
};

// Re-interprets a string that was decoded as windows-1252 instead of utf-8, so
// "â€“" becomes "–". Returns the input untouched when nothing changes.
function decodeMojibake(value) {
  if (!/[\u0080-\u00ff]/.test(value)) return value;
  try {
    // windows-1252 remaps 0x80-0x9F to printable glyphs, so build the reverse
    // lookup table from the decoder itself instead of using charCodeAt.
    const cp1252 = new TextDecoder("windows-1252");
    const byteFor = new Map();
    for (let byte = 0; byte < 256; byte += 1) {
      const char = cp1252.decode(Uint8Array.of(byte));
      if (char.length === 1) byteFor.set(char, byte);
    }

    const bytes = [];
    for (const char of value) {
      const byte = byteFor.get(char);
      if (byte === undefined) return value;
      bytes.push(byte);
    }

    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
    return decoded === value ? value : decoded;
  } catch {
    return value;
  }
}

async function main() {
  const login = await adminRequest("/auth/login", {
    method: "POST",
    body: { email: process.env.ADMIN_EMAIL ?? "admin@example.com", password: process.env.ADMIN_PASSWORD ?? "admin123" },
  });
  const token = login.data.access_token;

  // 1. Add the new ContactUs fields (creates the column + Directus field).
  const existingFields = await adminRequest("/fields/ContactUs", { token });
  const existing = new Set(existingFields.data.map((f) => f.field));
  for (const [field, interfaceType, type, , note] of CONTACT_FIELDS) {
    if (existing.has(field)) {
      console.log(`skip  ContactUs.${field} (already present)`);
      continue;
    }
    await adminRequest("/fields/ContactUs", {
      method: "POST",
      token,
      body: { field, type, meta: { interface: interfaceType, width: "full", note } },
    });
    console.log(`add   ContactUs.${field}`);
  }

  // 2. Migrate the legacy `Map` value into `Address` before anything reads it,
  //    and repair text that was stored with the wrong encoding.
  const items = await adminRequest("/items/ContactUs?limit=-1", { token });
  const patch = {};
  for (const item of items.data) {
    const legacyAddress = typeof item.Map === "string" && item.Map.trim() ? item.Map.trim() : null;
    if (legacyAddress && !item.Address) {
      patch.Address = legacyAddress;
      console.log(`move  ContactUs/${item.id}.Map -> Address`);
    }

    // Values typed through a shell once came back as UTF-8 bytes read as
    // latin-1 ("â€“" instead of "–"). Re-decode them.
    for (const field of ["OpenHours", "Email", "ContactNumber", "Address"]) {
      const value = patch[field] ?? item[field];
      if (typeof value !== "string") continue;
      const fixed = decodeMojibake(value);
      if (fixed !== value && !patch[field]) {
        patch[field] = fixed;
        console.log(`fix   ContactUs/${item.id}.${field} encoding`);
      }
    }
  }

  // Only seed fields that are still empty so re-runs never clobber edits.
  const target = items.data[0];
  if (target) {
    for (const [field] of CONTACT_FIELDS) {
      if (!patch[field] && !target[field] && SEEDS[field]) {
        patch[field] = SEEDS[field];
        console.log(`seed  ContactUs.${field}`);
      }
    }
  }

  if (Object.keys(patch).length > 0) {
    const result = await adminRequest(`/items/ContactUs/${target.id}`, { method: "PATCH", token, body: patch });
    console.log("patched ContactUs item:", result.data.id, patch);
  } else {
    console.log("no ContactUs fields to patch");
  }

  // 3. Strip the stray backticks some social links were saved with.
  const social = await adminRequest("/items/SocialMedia?limit=-1", { token });
  for (const row of social.data) {
    if (typeof row.Link !== "string") continue;
    const cleaned = row.Link.trim().replace(/^`+|`+$/g, "").trim();
    if (cleaned && cleaned !== row.Link) {
      await adminRequest(`/items/SocialMedia/${row.id}`, { method: "PATCH", token, body: { Link: cleaned } });
      console.log(`clean SocialMedia/${row.id}.Link`);
    }
  }

  console.log("Done. Contact content is now editable in the backend.");
}

main().catch((e) => {
  console.error("setup failed:", e.message);
  process.exit(1);
});
