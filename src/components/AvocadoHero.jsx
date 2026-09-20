import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { readItems } from "@directus/sdk";
import { client, getAssetUrl } from "../lib/directus";
import { buildHeroSlides, FALLBACK_HERO } from "../lib/heroCatalog";
import HeroArt from "./HeroArt";

const ROTATE_MS = 4500;

const C = {
  charcoal: "#2A2A2A",
  mute: "#545454",
  red: "#E60000",
  star: "#F5B301",
  track: "rgba(230,0,0,0.12)",
};

const badge = { backgroundColor: C.red, color: "#fff" };
const button = { backgroundColor: C.red, color: "#fff" };

const FLOAT_CIRCLES = [
  { left: "6%", top: "18%", size: 18, delay: 0, dur: 7 },
  { left: "12%", top: "72%", size: 12, delay: 1.4, dur: 8 },
  { left: "40%", top: "10%", size: 10, delay: 0.7, dur: 6.5 },
  { left: "88%", top: "30%", size: 16, delay: 0.3, dur: 9 },
  { left: "80%", top: "78%", size: 11, delay: 1.8, dur: 7.5 },
  { left: "30%", top: "86%", size: 8, delay: 2.2, dur: 6 },
];

function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={C.star} aria-hidden="true">
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.35l-5.8 3.05 1.1-6.45-4.7-4.6 6.5-.95z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="17.5" cy="20" r="1.6" />
      <path d="M2.5 3.5h2.8l2 11.4a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.3l1.4-7.4H6.1" />
    </svg>
  );
}

export default function AvocadoHero({ initialFlavors = [] }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  const [products, setProducts] = useState(() => initialFlavors);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(() => buildHeroSlides(products), [products]);
  const displaySlides = slides.length > 0 ? slides : [FALLBACK_HERO];
  const slideCount = displaySlides.length;
  const safeIndex = slideCount > 0 ? active % slideCount : 0;
  const current = displaySlides[safeIndex];
  const hasMultiple = slideCount > 1;
  const currentImage = getAssetUrl(current?.image);

  useEffect(() => {
    if (initialFlavors.length > 0) return;
    let activeFlag = true;
    client
      .request(readItems("Products", { sort: ["id"] }))
      .then((data) => {
        if (activeFlag && data) setProducts(data);
      })
      .catch(() => {});
    return () => {
      activeFlag = false;
    };
  }, [initialFlavors]);

  // Auto-rotate. Re-keying on `active` means a manual selection also resets the timer.
  useEffect(() => {
    if (!hasMultiple || paused) return;
    const t = setTimeout(
      () => setActive((i) => (i + 1) % slideCount),
      ROTATE_MS
    );
    return () => clearTimeout(t);
  }, [hasMultiple, paused, active, slideCount]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const goTo = (i) => setActive(((i % slideCount) + slideCount) % slideCount);

  // Image transition — starting slightly above/smaller, springing into place,
  // natural overshoot provides the bounce-up before it settles.
  const imageInitial = reduced
    ? { opacity: 0 }
    : { opacity: 0, y: -70, scale: 0.82, rotate: -8 };
  const imageAnimate = reduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1, rotate: 0 };
  const imageExit = reduced
    ? { opacity: 0 }
    : { opacity: 0, y: 34, scale: 0.94, rotate: 4 };

  const contentEnter = reduced
    ? { opacity: 0 }
    : { opacity: 0, x: 26 };
  const contentExit = reduced
    ? { opacity: 0 }
    : { opacity: 0, x: -26 };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* soft white brand field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ambient glows + floating circles, with a whisper of parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ y: reduced ? 0 : bgY }}
      >
        <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-brand-red/5 blur-3xl" />

        {FLOAT_CIRCLES.map((c, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-red/20"
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: c.size,
            }}
            animate={
              reduced
                ? undefined
                : { y: [0, -14, 0], opacity: [0.35, 0.7, 0.35] }
            }
            transition={{
              duration: c.dur,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:py-16 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* Product image — first on mobile */}
          <motion.div
            className="relative order-1 mx-auto w-full max-w-sm sm:max-w-md lg:order-2 lg:max-w-[30rem]"
            initial={reduced ? { opacity: 0 } : { scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 15 }}
          >
            <div className="relative aspect-[520/560] w-full">
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-2xl" aria-hidden="true" />

              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={imageInitial}
                  animate={imageAnimate}
                  exit={imageExit}
                  transition={reduced
                    ? { duration: 0.3 }
                    : {
                        opacity: { duration: 0.25 },
                        y: { type: "spring", stiffness: 220, damping: 12, mass: 1 },
                        scale: { type: "spring", stiffness: 220, damping: 15 },
                        rotate: { type: "spring", stiffness: 180, damping: 14 },
                      }}
                >
                  <motion.div
                    className="relative h-full w-full drop-shadow-[0_40px_70px_rgba(230,0,0,0.25)]"
                    animate={reduced ? undefined : { y: [0, -10, 0] }}
                    transition={{
                      duration: 5.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt={current.name}
                        className="h-full w-full rounded-[2.5rem] object-cover"
                      />
                    ) : (
                      <HeroArt theme={current.theme} className="h-full w-full" />
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Glassmorphism card — second on mobile */}
          <motion.div
            className="order-2 lg:order-1"
            initial={reduced ? { opacity: 0 } : { x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, mass: 1 }}
          >
            <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(230,0,0,0.15)] sm:p-8 lg:p-9">
              {/* animated content */}
              <div className="relative overflow-hidden min-h-[31rem]">
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.div
                    key={current.id}
                    className="relative"
                    initial={contentEnter}
                    animate={{ opacity: 1, x: 0 }}
                    exit={contentExit}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    aria-live="polite"
                  >
                    {/* badge */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                        style={badge}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                          <path d="M12 21s-7.5-4.6-10-9.5C.4 8.2 2.5 4.5 6 4.5c2.1 0 3.7 1.1 6 3.6 2.3-2.5 3.9-3.6 6-3.6 3.5 0 5.6 3.7 4 7-.7 1.4-2 2.9-2 2.9S12 21 12 21z" />
                        </svg>
                        {current.badge ?? "Loved by Thousands"}
                      </span>
                    </div>

                    {/* heading */}
                    <h1
                      className="font-heading text-[2.4rem] font-extrabold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
                      style={{ color: C.charcoal }}
                    >
                      {current.name}
                    </h1>

                    {/* description */}
                    <p
                      className="mt-4 max-w-md text-[15px] leading-relaxed sm:text-[17px]"
                      style={{ color: C.mute }}
                    >
                      {current.description}
                    </p>

                    {/* rating */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-[1.15rem] w-[1.15rem]" />
                        ))}
                      </div>
                      <span className="text-sm font-bold" style={{ color: C.red }}>
                        {current.theme.rating}/5.0{" "}
                        <span className="font-medium opacity-55" style={{ color: C.charcoal }}>
                          · {current.theme.reviews} reviews
                        </span>
                      </span>
                    </div>

                    {/* stat bars */}
                    <div className="mt-6 space-y-3.5">
                      {current.theme.metrics.map((s, i) => (
                        <div key={s.label}>
                          <div className="flex items-baseline justify-between text-[11px] font-bold uppercase tracking-[0.16em]">
                            <span style={{ color: C.charcoal }}>{s.label}</span>
                            <span style={{ color: C.red }}>{s.value}%</span>
                          </div>
                          <div
                            className="mt-1.5 h-2 w-full overflow-hidden rounded-full"
                            style={{ backgroundColor: C.track }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: C.red,
                                boxShadow: "0 0 12px rgba(230,0,0,0.45)",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${s.value}%` }}
                              transition={
                                reduced
                                  ? { duration: 0.2 }
                                  : {
                                      delay: 0.15 + i * 0.1,
                                      type: "spring",
                                      stiffness: 70,
                                      damping: 20,
                                    }
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-7">
                      <button
                        type="button"
                        className="group inline-flex h-[3.25rem] items-center gap-2.5 rounded-full px-9 text-sm font-bold uppercase tracking-wider shadow-[0_18px_40px_-12px_rgba(230,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        style={button}
                      >
                        <CartIcon />
                        Buy Now
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* carousel indicators */}
            {hasMultiple && (
              <div
                role="group"
                aria-label="Featured flavours"
                className="mt-8 flex items-center justify-center gap-2.5"
              >
                {displaySlides.map((s, i) => {
                  const isActive = i === safeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Show ${s.name}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-8" : "w-2.5 opacity-40 hover:opacity-70"
                      }`}
                      style={{
                        backgroundColor: C.red,
                        opacity: isActive ? 1 : 0.35,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}