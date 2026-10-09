// Syncs the About section's editable content into the backend so nothing
// user-facing on the About section is hardcoded:
//   - Ensures every `AboutUs` field the component renders exists.
//   - Creates the `AboutUs` singleton row if it is missing and fills in any
//     field that is still empty (re-runs never overwrite an editor's changes).
//   - Seeds the `AboutUsItem` collection with the three story-chapter cards.
//
//   node setup-about-content.mjs
import {
  getToken,
  listCollections,
  ensureField,
  request,
  readItemsOrEmpty,
} from "./setup-lib.mjs";

// Fields AboutUs.jsx reads. The component falls back to hardcoded copy when a
// value is missing, so anything listed here is worth exposing to editors.
// Heading_L1 / Heading_L2 / Footline / badges / rating used to be marked
// deprecated and deleted by this script — that was wrong: the component still
// reads them, so removing them just locked those strings into the bundle.
const ABOUT_FIELDS = [
  { field: "Title", type: "string", interface: "input", note: "Panel heading." },
  { field: "Tagline", type: "string", interface: "input", note: "Caption beneath the big headline." },
  { field: "Subtitle", type: "text", interface: "input-multiline", note: "Panel paragraph below the heading." },
  { field: "Heading_L1", type: "string", interface: "input", note: "Headline line one." },
  { field: "Heading_L2", type: "string", interface: "input", note: "Headline line two." },
  { field: "Story_Blurb", type: "text", interface: "input-multiline", note: "Story blurb." },
  { field: "Panel_Eyebrow", type: "string", interface: "input", note: "Panel eyebrow label." },
  { field: "Fresh_Cream", type: "string", interface: "input", note: "Fresh-cream stat, e.g. 100%." },
  { field: "Years_of_Trust", type: "string", interface: "input", note: "Years-of-trust stat, e.g. 20+." },
  { field: "Rated_Value", type: "string", interface: "input", note: "Rating value, e.g. 4.9." },
  { field: "Rated_Label", type: "string", interface: "input", note: "Rating caption." },
  { field: "Footline", type: "string", interface: "input", note: "Small print under the stats." },
  { field: "Badge_Made_Label", type: "string", interface: "input", note: "Badge over the story image." },
  { field: "Badge_Real_Label", type: "string", interface: "input", note: "Second image badge." },
];

// Seed copy for a brand-new AboutUs row. Mirrors the fallbacks that used to be
// hardcoded in AboutUs.jsx.
const DEFAULTS = {
  Title: "A little scoop of happiness, churned with care every morning.",
  Tagline: "Sweet moments, served with a smile.",
  Subtitle:
    "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.",
  Heading_L1: "Made Fresh.",
  Heading_L2: "Made With Love.",
  Fresh_Cream: "100%",
  Years_of_Trust: "20+",
  Rated_Value: "4.9",
  Rated_Label: "Rated Locally",
  Footline: "Three generations · one recipe book",
  Badge_Made_Label: "Made fresh daily",
  Badge_Real_Label: "Real fruit · pure cream",
};

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
    Desc: "We use whole fruit from local orchards and cream from Assam's dairies. No powders, no premixes — just honest ingredients.",
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
  const token = await getToken();

  const collections = await listCollections(token);
  for (const required of ["AboutUs", "AboutUsItem"]) {
    if (!collections.has(required)) {
      throw new Error(`Collection "${required}" is missing — run scaffold-flavors.mjs first.`);
    }
  }

  for (const field of ABOUT_FIELDS) {
    await ensureField(token, "AboutUs", field);
  }

  // 1. Ensure the singleton row exists.
  const existing = await readItemsOrEmpty("AboutUs", token);
  let row = existing[0] ?? null;

  if (!row) {
    row = await request("/items/AboutUs", { method: "POST", token, body: { ...DEFAULTS } });
    console.log(`add   AboutUs singleton row ${row.id}`);
  } else {
    // Only fill fields that are still blank so existing edits survive.
    const patch = {};
    for (const [field, value] of Object.entries(DEFAULTS)) {
      const current = row[field];
      if ((current === null || current === undefined || current === "") && !patch[field]) {
        patch[field] = value;
      }
    }
    if (Object.keys(patch).length > 0) {
      row = await request(`/items/AboutUs/${row.id}`, { method: "PATCH", token, body: patch });
      console.log(`patch AboutUs/${row.id}:`, Object.keys(patch).join(", "));
    } else {
      console.log("skip  AboutUs singleton (all fields already populated)");
    }
  }

  // 2. Seed the story chapter cards.
  const items = await readItemsOrEmpty("AboutUsItem", token);
  const titles = new Set(items.map((i) => i.Title));
  for (const card of CARDS) {
    if (titles.has(card.Title)) {
      console.log(`skip  AboutUsItem "${card.Title}" (already present)`);
      continue;
    }
    await request("/items/AboutUsItem", { method: "POST", token, body: card });
    console.log(`add   AboutUsItem "${card.Title}"`);
  }

  console.log("Done. About content is now editable in the backend.");
}

main().catch((err) => {
  console.error(`setup failed: ${err.message}`);
  process.exit(1);
});