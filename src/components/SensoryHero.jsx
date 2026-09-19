import FlavorOverlay from "./three/FlavorOverlay";

export default function SensoryHero() {
  return (
    <section className="relative h-svh overflow-hidden bg-transparent">
      {/* Full-screen looping background video — melting pink ice cream.
          WebM (VP9, ~300 KB) is preferred by Chromium/Firefox; the MP4 (~400 KB)
          H.264 fallback covers Safari/iOS. */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-20"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src="/videos/melting-icecream.webm" type="video/webm" />
        <source src="/videos/melting-icecream.mp4" type="video/mp4" />
      </video>
      {/* Readability overlay — keeps glassmorphic cards & typography legible */}
      <div className="absolute inset-0 bg-black/20 -z-10" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 text-center">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
            Churned Fresh Daily
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            Swirl into <span className="text-white">sensory delight</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Pick a flavour to remix the world — every scoop changes the
            colours around you.
          </p>
        </div>

        <div className="mt-8">
          <FlavorOverlay />
        </div>
      </div>
    </section>
  );
}