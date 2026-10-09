// Shared helpers for the Directus setup/migration scripts.
//
// Every setup-*.mjs and scaffold-*.mjs imports from here so that URL
// resolution, authentication and idempotent schema/permission creation stay
// identical across scripts. Duplicating that logic per script is what previously
// let the scripts drift apart (one read only VITE_DIRECTUS_URL, one didn't
// load .env at all and silently hit localhost).
import "dotenv/config";

const DEFAULT_BASE = "http://localhost:8055";

/**
 * Resolves the Directus instance to operate on.
 * DIRECTUS_URL wins so the migration scripts can target the online CMS without
 * having to touch VITE_DIRECTUS_URL, which is baked into the client bundle.
 */
export function getBaseUrl() {
  const raw =
    process.env.DIRECTUS_URL ??
    process.env.PUBLIC_URL ??
    process.env.VITE_DIRECTUS_URL ??
    DEFAULT_BASE;
  return raw.replace(/\/+$/, "");
}

/** Authenticated JSON request against Directus. Resolves to the `data` payload. */
export async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json.errors?.[0]?.message ?? JSON.stringify(json);
    const error = new Error(`${method} ${path} -> ${res.status} ${message}`);
    error.status = res.status;
    throw error;
  }
  return json.data;
}

/**
 * Returns an admin access token, preferring a static token when one is
 * configured and otherwise logging in with ADMIN_EMAIL / ADMIN_PASSWORD.
 */
export async function getToken() {
  if (process.env.DIRECTUS_ADMIN_TOKEN) {
    return process.env.DIRECTUS_ADMIN_TOKEN;
  }
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env (or set DIRECTUS_ADMIN_TOKEN)."
    );
  }
  const data = await request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  return data.access_token;
}

/**
 * Resolves the public policy (the one with neither app nor admin access).
 * Directus 11+ attaches permissions to policies rather than roles.
 */
export async function getPublicPolicyId(token) {
  const policies = await request("/policies?limit=-1", { token });
  const pub = policies.find((p) => !p.app_access && !p.admin_access);
  if (!pub) {
    throw new Error("Could not find the public policy on this Directus instance.");
  }
  return pub.id;
}

/** Set of collection names that already exist. */
export async function listCollections(token) {
  const rows = await request("/collections?limit=-1", { token });
  return new Set(rows.map((c) => c.collection));
}

/** Set of field names that already exist on a collection. */
export async function listFields(collection, token) {
  const rows = await request(`/fields/${encodeURIComponent(collection)}`, { token });
  return new Set(rows.map((f) => f.field));
}

/** Creates a collection if it is missing. Idempotent. */
export async function ensureCollection(token, { collection, note, icon, color, display_template }) {
  const existing = await listCollections(token);
  if (existing.has(collection)) {
    console.log(`skip  collection ${collection} (already exists)`);
    return false;
  }
  await request("/collections", {
    method: "POST",
    token,
    body: {
      collection,
      meta: { collection, note, icon, color, display_template },
      schema: { name: collection, comment: note },
    },
  });
  console.log(`add   collection ${collection}`);
  return true;
}

/** Creates a field on a collection if it is missing. Idempotent. */
export async function ensureField(token, collection, field) {
  const existing = await listFields(collection, token);
  if (existing.has(field.field)) {
    console.log(`skip  ${collection}.${field.field} (already exists)`);
    return false;
  }
  await request(`/fields/${encodeURIComponent(collection)}`, {
    method: "POST",
    token,
    body: {
      field: field.field,
      type: field.type,
      ...(field.schema ? { schema: field.schema } : {}),
      meta: {
        interface: field.interface,
        width: field.width ?? "full",
        ...(field.note ? { note: field.note } : {}),
        ...(field.required !== undefined ? { required: field.required } : {}),
        ...(field.special ? { special: field.special } : {}),
        ...(field.options ? { options: field.options } : {}),
      },
    },
  });
  console.log(`add   ${collection}.${field.field}`);
  return true;
}

/**
 * Links a uuid field to directus_files so the admin file picker works. The
 * column stays a plain uuid because the frontend builds asset URLs itself via
 * `${DIRECTUS_URL}/assets/${id}` and needs a bare string, not an object.
 */
export async function ensureFileRelation(token, collection, field) {
  const relations = await request("/relations?limit=-1", { token });
  const has = relations.some((r) => r.collection === collection && r.field === field);
  if (has) {
    console.log(`skip  relation ${collection}.${field} -> directus_files (already exists)`);
    return false;
  }
  await request("/relations", {
    method: "POST",
    token,
    body: {
      collection,
      field,
      related_collection: "directus_files",
      schema: { on_update: "NO ACTION", on_delete: "SET NULL" },
      meta: { one_deselect_action: "nullify" },
    },
  });
  console.log(`add   relation ${collection}.${field} -> directus_files`);
  return true;
}

/** Grants a permission to the public policy if not already granted. Idempotent. */
export async function grantPermission(token, policyId, collection, action, fields = ["*"]) {
  const existing = await request(
    `/permissions?limit=-1&filter[policy][_eq]=${policyId}` +
      `&filter[collection][_eq]=${encodeURIComponent(collection)}` +
      `&filter[action][_eq]=${action}`,
    { token }
  );
  if (existing.length > 0) {
    console.log(`skip  ${collection} ${action} (already granted)`);
    return false;
  }
  await request("/permissions", {
    method: "POST",
    token,
    body: {
      policy: policyId,
      collection,
      action,
      fields,
      ...(action === "read" ? { permissions: {}, validation: {} } : {}),
    },
  });
  console.log(`grant ${collection} ${action}`);
  return true;
}

/**
 * Reads every row from a collection, tolerating a collection that does not
 * exist yet (returns an empty list) so seeding scripts stay re-runnable.
 */
export async function readItemsOrEmpty(collection, token) {
  try {
    return await request(`/items/${encodeURIComponent(collection)}?limit=-1`, { token });
  } catch (err) {
    if (err.status === 403 || err.status === 404) return [];
    throw err;
  }
}