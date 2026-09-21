// Syncs the AboutUs section's editable content into the backend so nothing
// user-facing on the About section is hardcoded:
//   - Adds text fields to the `AboutUs` collection and updates the singleton item.
//   - Seeds the `AboutUsItem` collection with the three story-chapter cards.
//
//   node setup-about-content.mjs
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

const ABOUT_FIELDS = [
  // [field, interfaceType, defaultValue, note, dbType]
  ["Title", "input", "A little scoop of happiness, churned with care every morning.", "Editorial panel heading."],
  ["Tagline", "input", "Sweet moments, served with a smile.", "Small caption beneath the big headline."],
  ["Subtitle", "input-multiline", "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.", "Editorial panel paragraph below the heading."],
  ["Fresh_Cream", "input", "100%", "% fresh cream shown on the image badge."],
  ["Years_of_Trust", "input", "20+", "Years of trust shown in the stats strip."],
  ["Displayimage", "file-image", "7ade0628-6c15-42e9-b95d-e8738b66cb2c", "Story image shown in the panel.", "uuid", ["file"]],
];

// Fields that used to power the newer story-blurb layout. The About Us
// section is now driven solely by the fields above, so remove any leftovers.
const DEPRECATED_FIELDS = [
  "Heading_L1",
  "Heading_L2",
  "Story_Blurb",
  "Panel_Eyebrow",
  "Rated_Value",
  "Rated_Label",
  "Footline",
  "Badge_Made_Label",
  "Badge_Real_Label",
];

const CARDS = [
  {
    Icon: "store",
    Title: "Locally Crafted",
    Desc: "Every batch is made in our Guwahati parlour with fruit and dairy from local farms — small-batch, never mass-produced.",
    Sort: 1,
  },
  {
    Icon: "shopping-bag",
    Title: "Real Fruit, Real Cream",
    Desc: "We use whole fruit from local orchards and cream from Assam&apos;s dairies. No powders, no premixes — just honest ingredients.",
    Sort: 2,
  },
  {
    Icon: "heart",
    Title: "A Family Promise",
    Desc: "A recipe passed down through generations, served with the same warmth and care it was first made with.",
    Sort: 3,
  },
];

async function main() {
  const login = await adminRequest("/auth/login", {
    method: "POST",
    body: { email: process.env.ADMIN_EMAIL ?? "admin@example.com", password: process.env.ADMIN_PASSWORD ?? "admin123" },
  });
  const token = login.data.access_token;

  // 1. Add the missing AboutUs text fields (creates the column + Directus field).
  const existingFields = await adminRequest("/fields/AboutUs", { token });
  const existing = new Set(existingFields.data.map((f) => f.field));
  const updatePayload = {};
  for (const [field, interfaceType, value, note, type = "string", special = []] of ABOUT_FIELDS) {
    if (existing.has(field)) {
      console.log(`skip  AboutUs.${field} (already present)`);
      continue;
    }
    await adminRequest("/fields/AboutUs", {
      method: "POST",
      token,
      body: { field, type, meta: { interface: interfaceType, width: "full", note, ...(special.length ? { special } : {}) } },
    });
    console.log(`add   AboutUs.${field}`);
    // Only set a default for fields that are brand new so existing
    // content is never overwritten.
    updatePayload[field] = value;
  }

  // Ensure the story image field is wired to directus_files the same way as
  // Products.Product_Image so the upload/choose control works in the admin.
  const existingRelations = await adminRequest("/relations?limit=-1", { token });
  const hasImageRel = existingRelations.data.some(
    (r) => r.collection === "AboutUs" && r.field === "Displayimage"
  );
  if (!hasImageRel) {
    await adminRequest("/relations", {
      method: "POST",
      token,
      body: {
        collection: "AboutUs",
        field: "Displayimage",
        related_collection: "directus_files",
        schema: { on_update: "NO ACTION", on_delete: "SET NULL" },
        meta: { one_deselect_action: "nullify" },
      },
    });
    console.log("rel   AboutUs.Displayimage -> directus_files");
  } else {
    console.log("skip  AboutUs.Displayimage relation (already present)");
  }

  // 2. Remove leftover fields from the old about layout.
  for (const field of DEPRECATED_FIELDS) {
    if (!existing.has(field)) {
      console.log(`skip  AboutUs.${field} (not present)`);
      continue;
    }
    await adminRequest(`/fields/AboutUs/${field}`, { method: "DELETE", token });
    console.log(`rm    AboutUs.${field}`);
  }

  // 3. Update the singleton AboutUs item (id 1) with only newly added values.
  if (Object.keys(updatePayload).length > 0) {
    const patch = await adminRequest("/items/AboutUs/1", { method: "PATCH", token, body: updatePayload });
    console.log("patched AboutUs item:", patch.data.id);
  } else {
    console.log("no new AboutUs fields to patch");
  }

  // 4. Seed AboutUsItem cards.
  const items = await adminRequest("/items/AboutUsItem?limit=-1", { token });
  const titles = new Set(items.data.map((i) => i.Title));
  for (const card of CARDS) {
    if (titles.has(card.Title)) {
      console.log(`skip  AboutUsItem "${card.Title}" (already present)`);
      continue;
    }
    const created = await adminRequest("/items/AboutUsItem", {
      method: "POST",
      token,
      body: card,
    });
    console.log(`seed  AboutUsItem "${created.data.Title}"`);
  }

  console.log("Done. AboutUs content is now editable in the backend.");
}

main().catch((e) => {
  console.error("setup failed:", e.message);
  process.exit(1);
});