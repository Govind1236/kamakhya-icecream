import { useEffect, useState, lazy, Suspense } from "react";

// R3F/WebGL must only mount on the client (this app SSRs via renderToString).
const Scene = lazy(() => import("./three/Scene.jsx"));

export default function SceneLayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- intentional SSR-to-client gate for WebGL
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}