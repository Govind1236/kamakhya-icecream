import { readItems } from "@directus/sdk";
import { getClient } from "./directus";

export async function loadPublicData() {
  const client = getClient();
  if (!client) {
    console.warn("[SSR] Directus client not available, using fallback data");
    return getFallbackData();
  }

  try {
    const [heroItems, products, aboutItems, aboutCards, contactItems, socialItems] =
      await Promise.all([
        client.request(readItems("Hero_Section", { limit: 1 })).catch(() => []),
        client.request(readItems("Products", { sort: ["id"] })).catch(() => []),
        client.request(readItems("AboutUs", { limit: 1 })).catch(() => []),
        client.request(readItems("AboutUsItem", { sort: ["Sort", "id"] })).catch(() => []),
        client.request(readItems("ContactUs", { limit: 1 })).catch(() => []),
        client.request(readItems("SocialMedia")).catch(() => []),
      ]);

    return {
      hero: heroItems?.[0] ?? null,
      flavors: products ?? [],
      about: aboutItems?.[0] ?? null,
      aboutCards: aboutCards ?? [],
      contact: contactItems?.[0] ?? null,
      social: socialItems ?? [],
    };
  } catch (err) {
    console.error("[SSR] Failed to load public data:", err.message);
    return getFallbackData();
  }
}

function getFallbackData() {
  return {
    hero: null,
    flavors: [
      { id: 1, Name: "Vanilla", Description: "Classic creamy vanilla", Price: 50, Image: null, Sort: 1 },
      { id: 2, Name: "Chocolate", Description: "Rich dark chocolate", Price: 60, Image: null, Sort: 2 },
      { id: 3, Name: "Strawberry", Description: "Fresh strawberry delight", Price: 55, Image: null, Sort: 3 },
    ],
    about: null,
    aboutCards: [],
    contact: null,
    social: [],
  };
}

export async function loadPublicDataByEntry(entry) {
  const [hero, flavors, about, aboutCards, contact, social] = await Promise.all([
    entry?.hero ?? null,
    entry?.flavors ?? [],
    entry?.about ?? null,
    entry?.aboutCards ?? [],
    entry?.contact ?? null,
    entry?.social ?? [],
  ]);
  return { hero, flavors, about, aboutCards, contact, social };
}
