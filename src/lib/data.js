import { readItems } from "@directus/sdk";
import { getClient, fallbackImages } from "./directus";

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

    const flavorsWithImages = (products ?? []).map((p) => ({
      ...p,
      Image: p.Image || getFallbackImageForFlavor(p.Name),
    }));

    return {
      hero: heroItems?.[0] ?? null,
      flavors: flavorsWithImages,
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

function getFallbackImageForFlavor(name) {
  const lowerName = (name || "").toLowerCase();
  if (lowerName.includes("vanilla")) return fallbackImages.vanilla;
  if (lowerName.includes("chocolate")) return fallbackImages.chocolate;
  if (lowerName.includes("strawberry")) return fallbackImages.strawberry;
  return fallbackImages.default;
}

function getFallbackData() {
  return {
    hero: null,
    flavors: [
      { id: 1, Name: "Vanilla", Description: "Classic creamy vanilla", Price: 50, Image: fallbackImages.vanilla, Sort: 1 },
      { id: 2, Name: "Chocolate", Description: "Rich dark chocolate", Price: 60, Image: fallbackImages.chocolate, Sort: 2 },
      { id: 3, Name: "Strawberry", Description: "Fresh strawberry delight", Price: 55, Image: fallbackImages.strawberry, Sort: 3 },
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

  const flavorsWithImages = (flavors ?? []).map((f) => ({
    ...f,
    Image: f.Image || getFallbackImageForFlavor(f.Name),
  }));

  return { hero, flavors: flavorsWithImages, about, aboutCards, contact, social };
}
