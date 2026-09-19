import { AnimatePresence, motion } from "framer-motion";
import { useFlavor } from "../../lib/FlavorContext";

function FlavorChips() {
  const { activeId, flavors, switchFlavor } = useFlavor();
  return (
    <div className="flex flex-wrap gap-2 pointer-events-auto">
      {flavors.map((flavor) => {
        const active = flavor.id === activeId;
        return (
          <button
            key={flavor.id}
            type="button"
            onClick={() => switchFlavor(flavor.id)}
            aria-pressed={active}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
              active
                ? "border-white/70 bg-white/20 text-white shadow-lg backdrop-blur-md"
                : "border-white/40 bg-black/40 text-white/85 backdrop-blur-md hover:bg-black/60"
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: flavor.accent }}
            />
            {flavor.name}
          </button>
        );
      })}
    </div>
  );
}

export default function FlavorOverlay() {
  const { activeFlavor } = useFlavor();

  return (
    <div className="relative z-10 pointer-events-none flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFlavor.id}
          className="glass bg-black/50 rounded-3xl px-8 py-6 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] pointer-events-auto w-full max-w-md"
          initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -80, filter: "blur(8px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ backgroundColor: activeFlavor.accent }}
          >
            Flavour of the Day
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-white">
            {activeFlavor.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
            {activeFlavor.tagline}
          </p>
          <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <FlavorChips />
    </div>
  );
}