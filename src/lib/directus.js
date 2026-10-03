import { createDirectus, rest } from "@directus/sdk";

function getDirectusUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_DIRECTUS_URL) {
    return import.meta.env.VITE_DIRECTUS_URL;
  }
  if (typeof process !== "undefined" && process.env?.VITE_DIRECTUS_URL) {
    return process.env.VITE_DIRECTUS_URL;
  }
  return "http://localhost:8055";
}

export const DIRECTUS_URL = getDirectusUrl();

export const PLATFORM =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_PLATFORM) ||
  (typeof process !== "undefined" && process.env?.VITE_PLATFORM) ||
  "web";

const fallbackImages = {
  vanilla: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80",
  chocolate: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
  strawberry: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=600&auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80",
};

function isLocalhostUrl(url) {
  return url && url.includes("localhost:8055");
}

function getFallbackImage(key) {
  const lowerKey = (key || "").toLowerCase();
  if (lowerKey.includes("vanilla")) return fallbackImages.vanilla;
  if (lowerKey.includes("chocolate")) return fallbackImages.chocolate;
  if (lowerKey.includes("strawberry")) return fallbackImages.strawberry;
  return fallbackImages.default;
}

let _client = null;
function createClient() {
  try {
    return createDirectus(DIRECTUS_URL).with(rest());
  } catch {
    return null;
  }
}

export function getClient() {
  if (!_client) {
    _client = createClient();
  }
  return _client;
}

// Lazy client for client-side components - creates on first access
export const client = new Proxy({}, {
  get(_, prop) {
    const c = getClient();
    if (!c) {
      return () => Promise.resolve([]);
    }
    return c[prop];
  }
});

export function getAssetUrl(id, fallbackKey = "") {
  if (!id || typeof id !== "string") return getFallbackImage(fallbackKey);
  const url = `${DIRECTUS_URL}/assets/${id}`;
  if (isLocalhostUrl(url)) {
    return getFallbackImage(fallbackKey);
  }
  return url;
}

export { fallbackImages };