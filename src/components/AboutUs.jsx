import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client } from "../lib/directus";

export default function AboutUs({ initialAbout = null }) {
  const [about, setAbout] = useState(initialAbout);

  useEffect(() => {
    if (initialAbout) return;
    let active = true;
    client
      .request(readItems("AboutUsItem", { limit: 1 }))
      .then((data) => {
        if (active && data && data.length > 0) setAbout(data[0]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialAbout]);

  const title = about?.Title || "Sweet Moments, Served With a Smile";
  const description =
    about?.Description ||
    "Kamakhya Icecream started with one tiny parlour, one family recipe and a simple promise — real ingredients, churned fresh every single day.";

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 right-1/3 h-[320px] w-[320px] rounded-full bg-brand-red/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 left-1/4 h-[340px] w-[400px] rounded-full bg-brand-red/5 blur-[80px]"></div>
      </div>
      <div className="relative container">
        <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-bold">About Us</p>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">{title}</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Locally Crafted</h3>
            <p className="mt-3 text-base sm:text-lg text-foreground leading-relaxed">
              Every batch is made in our Guwahati parlour with fruit and dairy from local farms — small-batch, never mass-produced.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">Real Fruit, Real Cream</h3>
            <p className="mt-3 text-base sm:text-lg text-foreground leading-relaxed">
              We use whole fruit from local orchards and cream from Assam&apos;s dairies. No powders, no premixes — just honest ingredients.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl font-bold">A Family Promise</h3>
            <p className="mt-3 text-base sm:text-lg text-foreground leading-relaxed">
              Three generations of the same recipe book. If we wouldn&apos;t serve it to our own family, it never leaves our kitchen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
