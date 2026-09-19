export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 h-[340px] w-[420px] rounded-full bg-brand-pink/50 blur-[80px]"></div>
        <div className="absolute top-10 -left-24 h-[300px] w-[300px] rounded-full bg-brand-chocolate/5 blur-[70px]"></div>
      </div>
      <div className="relative container">
        <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-bold">Contact</p>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">We&apos;d Love to Hear From You</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
            Questions, bulk orders, party tubs, or just a flavour idea — reach out and we&apos;ll get back to you fast.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Call Us</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              +91 98765 43210<br />
              Mon – Sun, 11 AM – 9:30 PM
            </p>
            <a href="tel:+919876543210" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-5 h-10 text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              Call the Parlour
            </a>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Email Us</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              hello@kamakhyaicecream.in<br />
              We reply within 24 hours.
            </p>
            <a href="mailto:hello@kamakhyaicecream.in" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-5 h-10 text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              Send an Email
            </a>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 md:col-span-2 lg:col-span-1">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Visit the Parlour</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              Kamakhya Icecream<br />
              42 Market Road, near Temple Gate<br />
              Guwahati, Assam 781001
            </p>
            <a href="#visit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-5 h-10 text-xs sm:text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              Store Hours &amp; Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}