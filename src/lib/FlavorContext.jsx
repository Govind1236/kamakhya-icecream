import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FLAVORS, DEFAULT_FLAVOR_ID, getFlavor } from "./flavors";

const FlavorContext = createContext(null);
const ROTATE_INTERVAL_MS = 6000;

export function FlavorProvider({ children }) {
  const [activeId, setActiveId] = useState(DEFAULT_FLAVOR_ID);
  const rotateTimer = useRef(null);

  const restartAutoRotate = useCallback(() => {
    clearInterval(rotateTimer.current);
    rotateTimer.current = setInterval(() => {
      setActiveId((current) => {
        const idx = FLAVORS.findIndex((f) => f.id === current);
        return FLAVORS[(idx + 1) % FLAVORS.length].id;
      });
    }, ROTATE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    restartAutoRotate();
    return () => clearInterval(rotateTimer.current);
  }, [restartAutoRotate]);

  const switchFlavor = useCallback(
    (id) => {
      setActiveId((current) => (current === id ? current : id));
      restartAutoRotate();
    },
    [restartAutoRotate]
  );

  const activeFlavor = useMemo(() => getFlavor(activeId), [activeId]);

  // GSAP: animate the HTML body's background color whenever the flavor changes.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const proxy = { color: getComputedStyle(document.body).backgroundColor || "#ffffff" };
    const tween = gsap.to(proxy, {
      color: activeFlavor.bg,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        document.body.style.backgroundColor = proxy.color;
      },
    });
    return () => {
      tween.kill();
    };
  }, [activeFlavor]);

  const value = useMemo(
    () => ({ activeId, activeFlavor, flavors: FLAVORS, switchFlavor }),
    [activeId, activeFlavor, switchFlavor]
  );

  return <FlavorContext.Provider value={value}>{children}</FlavorContext.Provider>;
}

export function useFlavor() {
  const ctx = useContext(FlavorContext);
  if (!ctx) throw new Error("useFlavor must be used within <FlavorProvider>");
  return ctx;
}