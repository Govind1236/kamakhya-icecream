import { createDirectus, rest } from "@directus/sdk";

export const DIRECTUS_URL =
  import.meta.env.VITE_DIRECTUS_URL ?? "http://localhost:8055";

export const client = createDirectus(DIRECTUS_URL).with(rest());

export function getAssetUrl(id) {
  if (!id || typeof id !== "string") return "";
  return `${DIRECTUS_URL}/assets/${id}`;
}