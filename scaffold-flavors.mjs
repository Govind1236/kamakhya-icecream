// Bootstraps the Directus schema the Kamakhya frontend reads.
//
//   node scaffold-flavors.mjs
//
// Creates all six content collections with the exact field names the React
// components expect (Title / Description / Price / Product_Image / ... — the
// frontend is PascalCase, do not "tidy" these into snake_case).
//
// Idempotent: safe to re-run, existing collections/fields/relations are kept.
//
// Run order (schema first, permissions second):
//   node scaffold-flavors.mjs
//   node setup-public-read.mjs
//   node setup-inquiries.mjs
//   node setup-contact-content.mjs
//   node setup-about-content.mjs
import {
  getToken,
  getPublicPolicyId,
  ensureCollection,
  ensureField,
  ensureFileRelation,
  grantPermission,
} from "./setup-lib.mjs";

const FILE = "file";

/**
 * `fileFields` lists uuid fields that must be related to directus_files.
 * They intentionally stay plain `uuid` columns rather than o2m relations,
 * because the frontend resolves them via `${DIRECTUS_URL}/assets/${id}` and
 * `getAssetUrl()` rejects anything that is not a bare string.
 */
const COLLECTIONS = [
  {
    collection: "Products",
    note: "Ice-cream flavours shown in the menu grid and the hero carousel.",
    icon: "ice_cream",
    display_template: "{{Title}}",
    fileFields: ["Product_Image"],
    fields: [
      { field: "Title", type: "string", interface: "input", required: true, note: "Flavour name." },
      { field: "Description", type: "text", interface: "input-multiline", note: "Flavour blurb." },
      { field: "Price", type: "decimal", interface: "input", options: { min: 0 }, note: "Price per scoop." },
      { field: "Product_Image", type: "uuid", interface: "file-image", special: [FILE], note: "Flavour photo." },
      { field: "Tags", type: "string", interface: "input", note: "Badge text, e.g. Bestseller." },
      { field: "Sort", type: "integer", interface: "input", note: "Manual display order." },
    ],
  },
  {
    collection: "Hero_Section",
    note: "Hero content. Loaded by the SSR data loader but not rendered yet; kept for parity with the original template.",
    icon: "star",
    display_template: "{{Title}}",
    fields: [
      { field: "Title", type: "string", interface: "input" },
    ],
  },
  {
    collection: "AboutUs",
    note: "Singleton: the About section editorial panel, stats strip and badges.",
    icon: "info",
    display_template: "{{Title}}",
    fileFields: ["Displayimage"],
    fields: [
      { field: "Title", type: "string", interface: "input", note: "Panel heading." },
      { field: "Tagline", type: "string", interface: "input", note: "Caption beneath the big headline." },
      { field: "Subtitle", type: "text", interface: "input-multiline", note: "Panel paragraph." },
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
      { field: "Displayimage", type: "uuid", interface: "file-image", special: [FILE], note: "Story image." },
    ],
  },
  {
    collection: "AboutUsItem",
    note: "About section story chapter cards.",
    icon: "cards",
    display_template: "{{Title}}",
    fields: [
      { field: "Icon", type: "string", interface: "select-dropdown", options: { choices: [
        { text: "Store", value: "store" },
        { text: "Shopping bag", value: "shopping-bag" },
        { text: "Heart", value: "heart" },
      ] }, note: "Must be one of the keys AboutUs.jsx knows; unknown values fall back to the heart icon." },
      { field: "Title", type: "string", interface: "input", note: "Card title." },
      { field: "Desc", type: "text", interface: "input-multiline", note: "Card body copy." },
      { field: "Sort", type: "integer", interface: "input", note: "Manual display order." },
    ],
  },
  {
    collection: "ContactUs",
    note: "Singleton: contact card details, opening hours and map links.",
    icon: "contact_mail",
    display_template: "{{ContactNumber}}",
    fields: [
      { field: "ContactNumber", type: "string", interface: "input", note: "Phone number; digits drive both the tel: link and the WhatsApp order button." },
      { field: "Email", type: "string", interface: "input", note: "Public email address." },
      { field: "OpenHours", type: "string", interface: "input", note: "Opening hours line." },
      { field: "Address", type: "text", interface: "input-multiline", note: "Street address shown on the contact card and in the footer." },
      { field: "MapLink", type: "string", interface: "input", note: "Google Maps link for the location card." },
      { field: "MapEmbed", type: "string", interface: "input", note: "Embeddable map URL used in the footer iframe." },
    ],
  },
  {
    collection: "SocialMedia",
    note: "Footer social profile links.",
    icon: "share",
    display_template: "{{Platform}}",
    fields: [
      { field: "Platform", type: "string", interface: "select-dropdown", options: { choices: [
        { text: "WhatsApp", value: "WhatsApp" },
        { text: "Facebook", value: "Facebook" },
        { text: "Instagram", value: "Instagram" },
      ] }, note: "Drives which SVG icon Footer.jsx renders." },
      { field: "Link", type: "string", interface: "input", note: "Profile URL. Stored without backticks." },
    ],
  },
];

async function main() {
  const token = await getToken();
  console.log(`Connected to ${process.env.DIRECTUS_URL ?? "(default)"}`);

  for (const def of COLLECTIONS) {
    await ensureCollection(token, def);
    for (const field of def.fields) {
      await ensureField(token, def.collection, field);
    }
    for (const fileField of def.fileFields ?? []) {
      await ensureFileRelation(token, def.collection, fileField);
    }
  }

  // The SPA and SSR bundle read these without authentication.
  const publicPolicy = await getPublicPolicyId(token);
  const readable = [...COLLECTIONS.map((c) => c.collection), "directus_files"];
  for (const collection of readable) {
    await grantPermission(token, publicPolicy, collection, "read");
  }

  console.log(`Done. ${COLLECTIONS.length} collections ensured and public read granted.`);
}

main().catch((err) => {
  console.error(`scaffold failed: ${err.message}`);
  process.exit(1);
});