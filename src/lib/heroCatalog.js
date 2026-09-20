const METRIC_LABELS = ["Creaminess", "Sweetness", "Freshness"];

export const THEMES = {
  vanilla: {
    key: "vanilla",
    word: "Honey",
    scoops: {
      a: ["#FDF8EA", "#F6E7C3"],
      b: ["#FFF9EE", "#F2DDB0"],
      c: ["#FFFDF5", "#F8EAC9"],
    },
    drizzle: "#E9A11C",
    drizzleDeep: "#C77F14",
    sparkle: "#F2B02C",
    garnish: "vanilla",
    rating: "4.9",
    reviews: "2.8k",
    metrics: [
      { label: METRIC_LABELS[0], value: 92 },
      { label: METRIC_LABELS[1], value: 70 },
      { label: METRIC_LABELS[2], value: 90 },
    ],
  },
  mango: {
    key: "mango",
    word: "Mango",
    scoops: {
      a: ["#FFF3D6", "#FFD98E"],
      b: ["#FFEBB8", "#FFC56A"],
      c: ["#FFF9E8", "#FFE3A8"],
    },
    drizzle: "#FF9E1B",
    drizzleDeep: "#E87E00",
    sparkle: "#FFA629",
    garnish: "mango",
    rating: "4.8",
    reviews: "1.7k",
    metrics: [
      { label: METRIC_LABELS[0], value: 88 },
      { label: METRIC_LABELS[1], value: 96 },
      { label: METRIC_LABELS[2], value: 98 },
    ],
  },
  chocolate: {
    key: "chocolate",
    word: "Cocoa",
    scoops: {
      a: ["#C89B78", "#8B5A36"],
      b: ["#A97E56", "#6E4526"],
      c: ["#E4CDAF", "#A97E56"],
    },
    drizzle: "#5B3A24",
    drizzleDeep: "#402614",
    sparkle: "#D9A066",
    garnish: "chocolate",
    rating: "4.9",
    reviews: "2.3k",
    metrics: [
      { label: METRIC_LABELS[0], value: 96 },
      { label: METRIC_LABELS[1], value: 78 },
      { label: METRIC_LABELS[2], value: 84 },
    ],
  },
  strawberry: {
    key: "strawberry",
    word: "Berry",
    scoops: {
      a: ["#FFDCE8", "#FF9EC5"],
      b: ["#F3A9C6", "#E86B9C"],
      c: ["#FFEAF1", "#FFBBD4"],
    },
    drizzle: "#E8568C",
    drizzleDeep: "#C73A6B",
    sparkle: "#FF7FA3",
    garnish: "strawberry",
    rating: "4.8",
    reviews: "3.1k",
    metrics: [
      { label: METRIC_LABELS[0], value: 90 },
      { label: METRIC_LABELS[1], value: 85 },
      { label: METRIC_LABELS[2], value: 96 },
    ],
  },
  pistachio: {
    key: "pistachio",
    word: "Rose",
    scoops: {
      a: ["#EDF3D9", "#C5DA93"],
      b: ["#D3E6A8", "#A8C96A"],
      c: ["#F6F2E3", "#E2D9B8"],
    },
    drizzle: "#D4819F",
    drizzleDeep: "#A95C79",
    sparkle: "#E2AED2",
    garnish: "pistachio",
    rating: "5.0",
    reviews: "1.2k",
    metrics: [
      { label: METRIC_LABELS[0], value: 94 },
      { label: METRIC_LABELS[1], value: 72 },
      { label: METRIC_LABELS[2], value: 92 },
    ],
  },
  caramel: {
    key: "caramel",
    word: "Caramel",
    scoops: {
      a: ["#FCEBD0", "#F3C98B"],
      b: ["#E9B469", "#D28A3E"],
      c: ["#FFF2DD", "#F6D9AC"],
    },
    drizzle: "#B4672A",
    drizzleDeep: "#8C4A1C",
    sparkle: "#E9A11C",
    garnish: "caramel",
    rating: "4.9",
    reviews: "2.0k",
    metrics: [
      { label: METRIC_LABELS[0], value: 95 },
      { label: METRIC_LABELS[1], value: 92 },
      { label: METRIC_LABELS[2], value: 86 },
    ],
  },
};

export const PRODUCT_THEMES = {
  "classic vanilla bean": "vanilla",
  "alphonso mango": "mango",
  "belgian dark chocolate": "chocolate",
  "strawberry fields": "strawberry",
  "pistachio rose": "pistachio",
  "salted caramel swirl": "caramel",
};

export function themeForProduct(product) {
  const name = (product?.Title ?? product?.name ?? "")
    .toString()
    .toLowerCase()
    .trim();
  return THEMES[PRODUCT_THEMES[name]] ?? THEMES.vanilla;
}

export function buildHeroSlides(products) {
  return (products ?? []).map((p) => {
    const id = p.id ?? p.Title ?? p.name ?? "slide";
    const name = p.Title ?? p.name ?? "Signature Scoop";
    const description =
      p.Description ?? p.Tagline ?? "Hand-churned daily with real fruit and pure cream.";
    return {
      id,
      name,
      description,
      badge: p.Tags || null,
      image: p.Product_Image ?? p.image ?? null,
      theme: themeForProduct(p),
    };
  });
}

export const FALLBACK_HERO = {
  id: "fallback",
  name: "Avocado Honey",
  description:
    "Hand-blended each morning with silky avocado, pure cream and golden wildflower honey — naturally sweet, refreshingly light and scooped straight from our parlour.",
  badge: "Loved by Thousands",
  theme: {
    ...THEMES.vanilla,
    key: "avocado",
    word: "Honey",
    scoops: {
      a: ["#F1F9E4", "#C9E39B"],
      b: ["#EAF6D8", "#BCDD8C"],
      c: ["#F5FBE9", "#CFE6A1"],
    },
    drizzle: "#FFD166",
    drizzleDeep: "#E9A11C",
    sparkle: "#F2B02C",
    garnish: "avocado",
  },
};