import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client, getAssetUrl } from "../lib/directus";
import ScoopSvg from "./ScoopSvg";

export default function Hero({ initialHero = null, initialProducts = [] }) {
  const [hero, setHero] = useState(initialHero);
  const [products, setProducts] = useState(initialProducts);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (initialHero) return;
    let active = true;
    client
      .request(readItems("Hero_Section", { limit: 1 }))
      .then((data) => {
        if (active && data && data.length > 0) setHero(data[0]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialHero]);

  useEffect(() => {
    if (initialProducts.length > 0) return;
    let active = true;
    client
      .request(readItems("Products", { sort: ["id"] }))
      .then((data) => {
        if (active && data) setProducts(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialProducts]);

  const slides = products;
  const slideCount = slides.length;
  const safeIndex = slideCount > 0 ? slideIndex % slideCount : 0;

  useEffect(() => {
    if (slideCount <= 1 || paused) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slideCount);
    }, 3500);
    return () => clearInterval(timer);
  }, [slideCount, paused]);

  const title =
    hero?.Title ??
    "Small-batch ice cream with the taste of sunshine in every scoop.";
  const subtitle =
    hero?.SubTitle ??
    "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.";
  const tagline = hero?.Descriptions || "Sweet moments, served with a smile.";
  const yearsOfTrust = hero?.Yearoftrust ?? 20;
  const current = slides[safeIndex];
  const currentName = current?.Title ?? current?.name ?? "";
  const currentImage = getAssetUrl(current?.Product_Image ?? current?.image);

  const goTo = (i) => setSlideIndex(((i % slideCount) + slideCount) % slideCount);
  const next = () => goTo(safeIndex + 1);
  const prev = () => goTo(safeIndex - 1);
  return (
    <section className="relative overflow-hidden min-h-[80vh] sm:min-h-[75vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[80px]"></div>
        <div className="absolute top-1/3 -left-32 h-[380px] w-[380px] rounded-full bg-foreground/5 blur-[70px]"></div>
        <div className="absolute -bottom-24 left-1/4 h-[360px] w-[360px] rounded-full bg-brand-red/5 blur-[80px]"></div>
        <span className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-primary/50 animate-float"></span>
        <span className="absolute left-[16%] top-[70%] h-3 w-3 rounded-full bg-foreground/20 animate-float" style={{ animationDelay: "1.2s" }}></span>
        <span className="absolute left-[45%] top-[12%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_hsl(0_100%_45%/0.55)] animate-float" style={{ animationDelay: "0.6s" }}></span>
        <span className="absolute right-[12%] top-[30%] h-2.5 w-2.5 rounded-full bg-brand-red/20 animate-float-slow"></span>
        <span className="absolute right-[22%] bottom-[18%] h-2 w-2 rounded-full bg-foreground/15 animate-float" style={{ animationDelay: "1.8s" }}></span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs uppercase tracking-widest text-brand-red font-semibold animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse"></span>
              Locally crafted · Scooped fresh daily
            </span>
            <h1 className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight text-gradient animate-fade-up">
              {title}
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {subtitle}
            </p>
            <p className="mt-4 font-serif italic text-base sm:text-lg text-foreground/80 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {tagline}
            </p>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a href="#flavors" className="bg-primary text-white rounded-full px-6 sm:px-8 h-10 sm:h-12 inline-flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm border-none hover:brightness-110 hover:shadow-xl hover:shadow-brand-red/25 transition-all duration-300">
                View Today&apos;s Flavors
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
              <a href="#visit" className="rounded-full border border-input bg-background px-6 sm:px-8 h-10 sm:h-12 inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                Find Our Parlour
              </a>
            </div>
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold font-heading text-foreground">{yearsOfTrust}+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Years of Trust</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold font-heading text-foreground">100%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Fresh Cream</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold font-heading text-foreground">4.9<span className="text-primary">★</span></p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Rated Locally</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl glass bg-black/50 border-white/30 p-4 sm:p-6 shadow-[0_30px_80px_-20px_hsl(0_100%_45%/0.25)] animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,hsl(0_0%_97%/0.9),transparent_50%),radial-gradient(circle_at_15%_90%,hsl(0_0%_95%/0.9),transparent_50%)]"></div>
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-red/10 blur-[60px]"></div>
            </div>
            <div
              className="relative min-h-[320px] sm:min-h-[430px] flex items-center justify-center"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -ml-24 -mt-24 rounded-full bg-primary/15 blur-3xl animate-glow-pulse"></div>

              <div className="relative w-full max-w-[300px] sm:max-w-[340px] h-[300px] sm:h-[360px] overflow-hidden rounded-3xl ring-1 ring-white/40 shadow-[0_30px_80px_-20px_hsl(0_100%_45%/0.35)]">
                <div
                  className="flex h-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${safeIndex * 100}%)` }}
                >
                  {slides.map((p, i) => {
                    const imgUrl = getAssetUrl(p.Product_Image ?? p.image);
                    const name = p.Title ?? p.name ?? "";
                    return (
                      <div key={p.id ?? i} className="relative w-full shrink-0 h-full">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={name || "Today's featured flavor"}
                            loading={i === 0 ? "eager" : "lazy"}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_60%_30%,hsl(0_0%_97%/0.9),transparent_55%)]">
                            <ScoopSvg className="h-[70%] w-auto drop-shadow-[0_20px_60px_rgba(230,0,0,0.28)]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {slideCount > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous flavour"
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur border border-border/60 text-foreground flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next flavour"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur border border-border/60 text-foreground flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Go to flavour ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === safeIndex ? "w-5 bg-primary" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <span className="glass bg-black/50 border-white/30 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-bold text-white shadow-[0_4px_20px_-6px_hsl(0_0%_0%/0.12)] animate-float absolute left-4 sm:left-6 top-5 sm:top-7">
                {currentName ? `${currentName} · ` : ""}20+ flavours
              </span>
              <span className="glass bg-black/50 border-white/30 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-bold text-white shadow-[0_4px_20px_-6px_hsl(0_0%_0%/0.12)] animate-float absolute right-4 sm:right-6 bottom-6 sm:bottom-8" style={{ animationDelay: "1.5s" }}>
                100% fresh cream
              </span>
            </div>
            <div className="relative -mt-2 pb-2 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                {currentImage ? `Featuring · ${currentName}` : "Hero visual · placeholder image"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}