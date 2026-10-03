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
      // Return a no-op function for any method access
      return () => Promise.resolve([]);
    }
    return c[prop];
  }
});

export function getAssetUrl(id) {
  if (!id || typeof id !== "string") return "";
  return `${DIRECTUS_URL}/assets/${id}`;
}