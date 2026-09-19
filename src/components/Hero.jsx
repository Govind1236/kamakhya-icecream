import ScoopSvg from "./ScoopSvg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] sm:min-h-[75vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[80px]"></div>
        <div className="absolute top-1/3 -left-32 h-[380px] w-[380px] rounded-full bg-brand-chocolate/5 blur-[70px]"></div>
        <div className="absolute -bottom-24 left-1/4 h-[360px] w-[360px] rounded-full bg-brand-pink/50 blur-[80px]"></div>
        <span className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-primary/50 animate-float"></span>
        <span className="absolute left-[16%] top-[70%] h-3 w-3 rounded-full bg-brand-chocolate/20 animate-float" style={{ animationDelay: "1.2s" }}></span>
        <span className="absolute left-[45%] top-[12%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_hsl(350_100%_75%/0.9)] animate-float" style={{ animationDelay: "0.6s" }}></span>
        <span className="absolute right-[12%] top-[30%] h-2.5 w-2.5 rounded-full bg-brand-red/20 animate-float-slow"></span>
        <span className="absolute right-[22%] bottom-[18%] h-2 w-2 rounded-full bg-brand-chocolate/15 animate-float" style={{ animationDelay: "1.8s" }}></span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs uppercase tracking-widest text-brand-red font-semibold animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse"></span>
              Locally crafted · Scooped fresh daily
            </span>
            <h1 className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight text-gradient animate-fade-up">
              Small-batch ice cream with the taste of sunshine in every scoop.
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-500 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.
            </p>
            <p className="mt-4 font-serif italic text-base sm:text-lg text-brand-chocolate/80 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Sweet moments, served with a smile.
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
                <p className="text-3xl sm:text-4xl font-bold font-heading text-brand-chocolate">20+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Flavors</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold font-heading text-brand-chocolate">100%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Fresh Cream</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold font-heading text-brand-chocolate">4.9<span className="text-primary">★</span></p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Rated Locally</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl glass p-4 sm:p-6 shadow-[0_30px_80px_-20px_hsl(0_100%_45%/0.25)] animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,hsl(350_100%_90%/0.7),transparent_50%),radial-gradient(circle_at_15%_90%,hsl(0_100%_95%/0.6),transparent_50%)]"></div>
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-red/10 blur-[60px]"></div>
            </div>
            <div className="relative min-h-[320px] sm:min-h-[430px] flex items-center justify-center">
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -ml-24 -mt-24 rounded-full bg-primary/15 blur-3xl animate-glow-pulse"></div>
              <ScoopSvg className="w-3/4 max-w-[200px] sm:max-w-[240px] h-auto drop-shadow-[0_20px_60px_rgba(230,0,0,0.28)]" />
              <span className="glass rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-bold text-brand-chocolate shadow-[0_4px_20px_-6px_hsl(350_60%_50%/0.25)] animate-float absolute left-4 sm:left-6 top-5 sm:top-7">
                20+ flavours
              </span>
              <span className="glass rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] font-bold text-primary shadow-[0_4px_20px_-6px_hsl(350_60%_50%/0.25)] animate-float absolute right-4 sm:right-6 bottom-6 sm:bottom-8" style={{ animationDelay: "1.5s" }}>
                100% fresh cream
              </span>
            </div>
            <div className="relative -mt-2 pb-2 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                Hero visual · placeholder image
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}