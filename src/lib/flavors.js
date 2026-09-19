export const FLAVORS = [
  {
    id: "strawberry",
    name: "Strawberry Bliss",
    tagline: "Ripe berries, cream & a hint of vanilla",
    bg: "#ffeaf0",
    accent: "#ff5f8f",
    model: "/models/icecream.gltf",
    scoopColor: "#ff8fb1",
    ingredients: [
      { shape: "berry", color: "#e0245e", count: 14, size: 0.3, spread: 2.6 },
      { shape: "berry", color: "#ff8fb1", count: 10, size: 0.22, spread: 3.4 },
      { shape: "sprinkle", color: "#fff3f6", count: 20, size: 0.12, spread: 3.2 },
    ],
  },
  {
    id: "chocolate",
    name: "Dark Chocolate",
    tagline: "Belgian cocoa, fudge swirls & roasted hazelnut",
    bg: "#f2eadf",
    accent: "#6b4226",
    model: "/models/icecream.gltf",
    scoopColor: "#8b5a3e",
    ingredients: [
      { shape: "chip", color: "#3b2314", count: 14, size: 0.24, spread: 2.6 },
      { shape: "nut", color: "#c68e4e", count: 8, size: 0.22, spread: 3.4 },
      { shape: "sprinkle", color: "#7a4a24", count: 18, size: 0.12, spread: 3.2 },
    ],
  },
  {
    id: "mango",
    name: "Mango Sorbet",
    tagline: "Sun-ripened mango, lime zest & tropical breeze",
    bg: "#fff3dd",
    accent: "#ffa629",
    model: "/models/icecream.gltf",
    scoopColor: "#ffb347",
    ingredients: [
      { shape: "cube", color: "#ff8c1a", count: 12, size: 0.24, spread: 2.6 },
      { shape: "leaf", color: "#7cb342", count: 8, size: 0.22, spread: 3.4 },
      { shape: "sprinkle", color: "#ffe0b3", count: 18, size: 0.12, spread: 3.2 },
    ],
  },
];

export const DEFAULT_FLAVOR_ID = FLAVORS[0].id;

export function getFlavor(id) {
  return FLAVORS.find((f) => f.id === id) ?? FLAVORS[0];
}