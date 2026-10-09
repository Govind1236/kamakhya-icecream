// Grants public (anonymous) READ access to every collection the site renders,
// plus directus_files, so both the browser SPA and the SSR bundle can load
// content without authentication.
//
//   node setup-public-read.mjs
//
// Idempotent: re-running only adds what is missing. AboutUs and SocialMedia
// were previously missing from this list, which made the About panel and the
// footer social links silently fall back to hardcoded defaults.
import {
  getToken,
  getPublicPolicyId,
  listCollections,
  grantPermission,
} from "./setup-lib.mjs";

const COLLECTIONS = [
  "Hero_Section",
  "Products",
  "AboutUs",
  "AboutUsItem",
  "ContactUs",
  "SocialMedia",
  "directus_files",
];

async function main() {
  const token = await getToken();
  const publicPolicy = await getPublicPolicyId(token);
  console.log(`Public policy: ${publicPolicy}`);

  const existing = await listCollections(token);

  for (const collection of COLLECTIONS) {
    if (!existing.has(collection)) {
      console.warn(`warn  ${collection} does not exist yet — run scaffold-flavors.mjs first (skipped)`);
      continue;
    }
    await grantPermission(token, publicPolicy, collection, "read");
  }

  console.log("Done. Public read is in place for all rendered content collections.");
}

main().catch((err) => {
  console.error(`setup failed: ${err.message}`);
  process.exit(1);
});