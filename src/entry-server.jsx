import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { loadPublicData } from "./lib/data.js";

export async function render() {
  let initial = { flavors: [], hero: null, about: null, aboutCards: [], contact: null, social: [] };
  try {
    initial = await loadPublicData();
  } catch (err) {
    console.error("[SSR] Failed to load public data:", err.message);
  }

  const appHtml = renderToString(<App initialData={initial} />);
  return { appHtml, initialData: initial };
}
