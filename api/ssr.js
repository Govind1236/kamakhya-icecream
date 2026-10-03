import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../dist/server/entry-server.js";
import { existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "..", "dist", "client");
const templatePath = existsSync(path.join(clientDist, "template.html"))
  ? path.join(clientDist, "template.html")
  : path.join(clientDist, "index.html");

export default async function handler(req, res) {
  try {
    const template = await readFile(templatePath, "utf-8");
    const { appHtml, initialData } = await render();
    const html = template
      .replace("<!--app-html-->", appHtml)
      .replace(
        "</head>",
        `<script>window.__INITIAL_DATA__=${JSON.stringify(initialData).replace(/</g, "\\u003c")};</script></head>`
      );
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (err) {
    console.error("[SSR] render error:", err);
    res
      .status(500)
      .end(
        `<!doctype html><html><body><pre>${String(err.message || err)}</pre></body></html>`
      );
  }
}