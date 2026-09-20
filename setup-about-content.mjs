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
  ["Heading_L1", "input", "Made Fresh.", 'First line of the big headline (line 1)'],
  ["Heading_L2", "input", "Made With Love.", 'Second line of the big headline (line 2)'],
  ["Story_Blurb", "input-multiline", "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.", "Editorial panel paragraph below the heading."],
  ["Panel_Eyebrow", "input", "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.", "Small eyebrow label above the panel heading."],
  ["Rated_Value", "input", "4.9", "Rating value shown in the stats strip."],
  ["Rated_Label", "input", "Rated Locally", "Label for the rating stat."],
  ["Footline", "input", "Three generations · one recipe book", "Small caption beneath the stats strip."],
  ["Badge_Made_Label", "input", "Made fresh daily", "Badge on the image, top-left."],
  ["Badge_Real_Label", "input", "Real fruit · pure cream", "Badge on the image, bottom-left."],
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
  for (const [field, interfaceType, value, note] of ABOUT_FIELDS) {
    updatePayload[field] = value;
    if (existing.has(field)) {
      console.log(`skip  AboutUs.${field} (already present)`);
      continue;
    }
    await adminRequest("/fields/AboutUs", {
      method: "POST",
      token,
      body: { field, type: "string", meta: { interface: interfaceType, width: "full", note } },
    });
    console.log(`add   AboutUs.${field}`);
  }

  // 2. Update the singleton AboutUs item (id 1) with the values.
  const patch = await adminRequest("/items/AboutUs/1", { method: "PATCH", token, body: updatePayload });
  console.log("patched AboutUs item:", patch.data.id);

  // 3. Seed AboutUsItem cards.
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