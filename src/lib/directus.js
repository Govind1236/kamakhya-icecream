import { createDirectus, rest } from "@directus/sdk";

// Public, browser-facing base URL. Vite bakes VITE_DIRECTUS_URL into both the
// client bundle and the SSR bundle at build time, so this is the reliable value
// in every environment. This is what asset <img src> URLs must be built from.
function getDirectusPublicUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_DIRECTUS_URL) {
    return import.meta.env.VITE_DIRECTUS_URL;
  }
  if (typeof process !== "undefined" && process.env?.VITE_DIRECTUS_URL) {
    return process.env.VITE_DIRECTUS_URL;
  }
  return "http://localhost:8055";
}

// Internal, server-to-server URL. When the app runs inside a container the
// public URL (e.g. http://localhost:8055) is not reachable from the server, so
// API requests prefer the compose service URL. `process` is undefined in the
// browser bundle, so this is only used during SSR.
const DIRECTUS_INTERNAL_URL =
  typeof process !== "undefined" && process.env?.DIRECTUS_INTERNAL_URL
    ? process.env.DIRECTUS_INTERNAL_URL
    : null;

function getDirectusApiUrl() {
  return DIRECTUS_INTERNAL_URL ?? getDirectusPublicUrl();
}

// Base used for API requests (internal when server-side, public in the browser).
export const DIRECTUS_URL = getDirectusApiUrl();

// Base used to build browser-facing asset URLs. Always the public host.
export const DIRECTUS_PUBLIC_URL = getDirectusPublicUrl();

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
  // File fields can come back as a bare id, an object, or a full URL.
  const value =
    id && typeof id === "object" ? id.id ?? id.filename_disk ?? "" : id;

  if (!value || typeof value !== "string") return getFallbackImage(fallbackKey);

  // Already an absolute (or protocol-relative) URL: keep it as-is, but rewrite
  // any server-internal host back to the public base so the browser can reach it.
  if (/^(https?:)?\/\//i.test(value)) {
    if (DIRECTUS_INTERNAL_URL && value.startsWith(DIRECTUS_INTERNAL_URL)) {
      return `${DIRECTUS_PUBLIC_URL}${value.slice(DIRECTUS_INTERNAL_URL.length)}`;
    }
    return value;
  }

  return `${DIRECTUS_PUBLIC_URL}/assets/${value}`;
}

export { fallbackImages };