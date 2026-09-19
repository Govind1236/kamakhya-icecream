import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const initialData = window.__INITIAL_DATA__ ?? null;
const rootEl = document.getElementById("root");

function renderApp() {
  return (
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  );
}

if (initialData && rootEl.childElementCount > 0) {
  hydrateRoot(rootEl, renderApp());
} else {
  createRoot(rootEl).render(renderApp());
}

delete window.__INITIAL_DATA__;
