import { readItems } from "@directus/sdk";
import { client } from "./directus";

export async function loadPublicData() {
  const [heroItems, products, aboutItems, contactItems, socialItems] =
    await Promise.all([
      client.request(readItems("Hero_Section", { limit: 1 })).catch(() => []),
      client.request(
        readItems("Products", { sort: ["id"] })
      ).catch(() => []),
      client.request(readItems("AboutUsItem", { limit: 1 })).catch(() => []),
      client.request(readItems("ContactUs", { limit: 1 })).catch(() => []),
      client.request(readItems("SocialMedia")).catch(() => []),
    ]);

  return {
    hero: heroItems?.[0] ?? null,
    flavors: products ?? [],
    about: aboutItems?.[0] ?? null,
    contact: contactItems?.[0] ?? null,
    social: socialItems ?? [],
  };
}

export async function loadPublicDataByEntry(entry) {
  const [hero, flavors, about, contact, social] = await Promise.all([
    entry?.hero ?? null,
    entry?.flavors ?? [],
    entry?.about ?? null,
    entry?.contact ?? null,
    entry?.social ?? [],
  ]);
  return { hero, flavors, about, contact, social };
}
