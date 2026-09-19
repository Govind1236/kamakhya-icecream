export default function VisitUs() {
  return (
    <section id="visit" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -bottom-24 right-1/4 h-[340px] w-[420px] rounded-full bg-brand-chocolate/5 blur-[80px]"></div>
        <div className="absolute top-10 -left-24 h-[300px] w-[300px] rounded-full bg-brand-pink/50 blur-[70px]"></div>
      </div>
      <div className="relative container">
        <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-bold">Visit Us</p>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">Find Your Nearest Scoop</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
            Drop by the parlour for a sundae, a family tub, or a quiet corner to enjoy your scoop in the sunshine.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Visit Our Parlour</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              Kamakhya Icecream<br />
              42 Market Road, near Temple Gate<br />
              Guwahati, Assam 781001
            </p>
            <div className="mt-5 relative aspect-[16/9] rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_50%_40%,hsl(350_100%_90%/0.7),transparent_60%)] bg-muted border border-border/60 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Map placeholder</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Store Hours</h3>
            <div className="mt-4 divide-y divide-border/60">
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="text-sm font-semibold text-foreground">Monday – Thursday</span>
                <span className="text-sm text-gray-500">11:00 AM – 9:30 PM</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="text-sm font-semibold text-foreground">Friday – Saturday</span>
                <span className="text-sm text-gray-500">11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="text-sm font-semibold text-foreground">Sunday</span>
                <span className="text-sm text-gray-500">9:00 AM – 10:00 PM</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Hours may vary on public holidays.</p>
            <a href="#visit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-5 h-10 text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Google Maps
            </a>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 md:col-span-2 lg:col-span-1">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Get In Touch</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              +91 98765 43210<br />
              hello@kamakhyaicecream.in
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Bulk and party tubs available — order 24 hours ahead for a scoop party.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="tel:+919876543210" className="bg-primary text-white rounded-full px-5 h-10 inline-flex items-center gap-2 font-semibold text-xs sm:text-sm border-none hover:brightness-110 hover:shadow-xl hover:shadow-brand-red/25 transition-all duration-300">
                Call the Parlour
              </a>
              <a href="mailto:hello@kamakhyaicecream.in" className="rounded-full border border-input bg-background px-5 h-10 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}