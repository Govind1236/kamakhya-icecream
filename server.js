import express from "express";
import compression from "compression";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { render } from "./dist/server/entry-server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "dist", "client");
const indexHtmlPath = path.join(clientDist, "index.html");

const app = express();
const PORT = process.env.PORT || 5173;

app.use(compression());
app.use(express.static(clientDist, { index: false }));

app.use(async (req, res) => {
  try {
    const template = await readFile(indexHtmlPath, "utf-8");
    const { appHtml, initialData } = await render();
    const html = template
      .replace("<!--app-html-->", appHtml)
      .replace(
        "</head>",
        `<script>window.__INITIAL_DATA__=${JSON.stringify(initialData).replace(/</g, "\\u003c")};</script></head>`
      );
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (err) {
    console.error("[SSR] render error:", err);
    res
      .status(500)
      .end(
        `<!doctype html><html><body><pre>${String(err.message || err)}</pre></body></html>`
      );
  }
});

app.listen(PORT, () => {
  console.log(`[SSR] Kamakhya Icecream ready -> http://localhost:${PORT}`);
});
