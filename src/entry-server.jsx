import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { loadPublicData } from "./lib/data.js";

const FALLBACK_FLAVORS = [
  { id: 1, Name: "Vanilla", Description: "Classic creamy vanilla", Price: 50, Image: null, Sort: 1 },
  { id: 2, Name: "Chocolate", Description: "Rich dark chocolate", Price: 60, Image: null, Sort: 2 },
  { id: 3, Name: "Strawberry", Description: "Fresh strawberry delight", Price: 55, Image: null, Sort: 3 },
];

export async function render() {
  let initial = { flavors: [], hero: null, about: null, aboutCards: [], contact: null, social: [] };
  try {
    initial = await loadPublicData();
  } catch (err) {
    console.error("[SSR] Failed to load public data:", err.message);
    initial = {
      flavors: FALLBACK_FLAVORS,
      hero: null,
      about: null,
      aboutCards: [],
      contact: null,
      social: [],
    };
  }

  const appHtml = renderToString(<App initialData={initial} />);
  return { appHtml, initialData: initial };
}
