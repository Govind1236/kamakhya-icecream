import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client, getAssetUrl } from "../lib/directus";
import { motion } from "framer-motion";
import ScoopSvg from "./ScoopSvg";

const STORY_IMAGE = "7ade0628-6c15-42e9-b95d-e8738b66cb2c";

const easeOut = [0.22, 1, 0.36, 1];

const headerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const lineReveal = {
  hidden: { y: "115%" },
  visible: { y: 0 },
};

const cardParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
};

const chapterIcons = {
  store: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  "shopping-bag": (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
};

const defaultChapterIcon = chapterIcons.heart;

export default function AboutUs({ initialAbout = null, initialCards = [] }) {
  const [about, setAbout] = useState(initialAbout);
  const [cards, setCards] = useState(initialCards);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const needsAbout = !about;
    const needsCards = cards.length === 0;
    if (!needsAbout && !needsCards) return;

    if (needsAbout) {
      client
        .request(readItems("AboutUs", { limit: 1 }))
        .then((data) => {
          if (active && data && data.length > 0) setAbout(data[0]);
        })
        .catch(() => {});
    }
    if (needsCards) {
      client
        .request(readItems("AboutUsItem", { sort: ["Sort", "id"] }))
        .then((data) => {
          if (active && data) setCards(data);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [about, cards]);

  const storyIntro =
    "Hand-churned daily with real fruit, pure cream and a whole lot of love — from our parlour to your spoon.";

  const cardBlurb = storyIntro;

  const storyImage = getAssetUrl(about?.Displayimage ?? STORY_IMAGE);

  const freshCream = about?.Fresh_Cream || "100%";
  const yearsOfTrust = about?.Years_of_Trust || "20+";

  const heading =
    about?.Title || "A little scoop of happiness, churned with care every morning.";

  const chapters = cards.map((card, i) => ({
    index: String(i + 1).padStart(2, "0"),
    title: card.Title || "Untitled",
    icon: chapterIcons[card.Icon] || defaultChapterIcon,
    copy: card.Desc || "",
  }));

  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 right-1/3 h-[320px] w-[320px] rounded-full bg-brand-red/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 left-1/4 h-[340px] w-[400px] rounded-full bg-brand-red/5 blur-[80px]"></div>
      </div>

      <div className="relative container">
        {/* ——— Story header ——— */}
        <motion.div
          variants={headerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-primary font-bold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            Our Story
            <span className="h-px w-8 bg-brand-red/40" aria-hidden="true" />
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 sm:mt-6 font-heading text-[2.5rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block overflow-hidden py-0.5">
              <motion.span variants={lineReveal} transition={{ duration: 0.9, ease: easeOut }} className="block text-gradient">Made Fresh.</motion.span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <motion.span variants={lineReveal} transition={{ duration: 0.9, ease: easeOut, delay: 0.12 }} className="block text-gradient">Made With Love.</motion.span>
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-foreground font-medium leading-relaxed sm:leading-[1.85]"
          >
            {storyIntro}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-serif italic text-lg sm:text-xl text-foreground/70"
          >
            {`Sweet moments, served with a smile.`}
          </motion.p>
        </motion.div>

        {/* ——— Premium visual ——— */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.955, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: easeOut }}
          className="relative z-10 mx-auto mt-14 sm:mt-20 max-w-6xl"
        >
          <div className="absolute -inset-3 sm:-inset-6 rounded-[2.5rem] sm:rounded-[3rem] bg-brand-red/10 blur-2xl" aria-hidden="true" />
          <div className="absolute -top-10 -right-8 sm:-right-14 h-40 w-40 rounded-full border-[14px] border-brand-red/10" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-brand-red/10 blur-2xl" aria-hidden="true" />

          <div className="relative grid overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] border border-primary/10 bg-white shadow-[0_40px_90px_-35px_hsl(0_0%_0%/0.35)] lg:grid-cols-[1.15fr_1fr]">
            {/* Image */}
            <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]">
              {storyImage && !imageFailed ? (
                <img
                  src={storyImage}
                  alt="Freshly churned Kamakhya ice cream, made daily with real fruit and pure Assam cream"
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_60%_30%,hsl(0_0%_97%/0.9),transparent_55%),radial-gradient(circle_at_20%_85%,hsl(0_0%_94%/0.9),transparent_50%)]">
                  <ScoopSvg className="h-[55%] w-auto drop-shadow-[0_20px_60px_rgba(230,0,0,0.28)]" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />

              <span className="glass bg-white/80 border-white/70 rounded-full px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold text-primary shadow-[0_8px_24px_-8px_hsl(0_0%_0%/0.2)] absolute left-4 sm:left-6 top-4 sm:top-6">
                Made fresh daily
              </span>
              <span className="hidden sm:flex glass bg-white/80 border-white/70 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] font-bold text-foreground shadow-[0_8px_24px_-8px_hsl(0_0%_0%/0.2)] absolute right-5 top-5 items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" aria-hidden="true" />
                {freshCream} fresh cream
              </span>
              <span className="glass bg-black/45 border-white/20 rounded-full px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold text-white shadow-[0_8px_24px_-8px_hsl(0_0%_0%/0.3)] absolute bottom-5 left-5 items-center gap-2 hidden sm:inline-flex">
                Real fruit · pure cream
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-7.5-4.6-10-9.5C.4 8.2 2.5 4.5 6 4.5c2.1 0 3.7 1.1 6 3.6 2.3-2.5 3.9-3.6 6-3.6 3.5 0 5.6 3.7 4 7-.7 1.4-2 2.9-2 2.9S12 21 12 21z" fill="currentColor" />
                </svg>
              </span>
            </div>

            {/* Editorial panel */}
            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold">
                {storyIntro}
              </p>
              <h3 className="mt-4 font-heading text-2xl sm:text-3xl md:text-[2.1rem] font-extrabold leading-tight tracking-tight text-foreground">
                {heading}
              </h3>
              <p className="mt-5 font-serif italic text-base sm:text-lg text-foreground/75 leading-relaxed">
                {cardBlurb}
              </p>

              <dl className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-primary/10 pt-6 sm:pt-8">
                <div>
                  <dd className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">{freshCream}</dd>
                  <dt className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Fresh Cream</dt>
                </div>
                <div>
                  <dd className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">{yearsOfTrust}</dd>
                  <dt className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Years of Trust</dt>
                </div>
                <div>
                  <dd className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">4.9<span className="text-primary">★</span></dd>
                  <dt className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">Rated Locally</dt>
                </div>
              </dl>

              <p className="mt-7 text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-[0.16em]">
                Three generations · one recipe book
              </p>
            </div>
          </div>
        </motion.figure>

        {/* ——— Story chapters ——— */}
        <motion.div
          variants={cardParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto mt-12 sm:mt-16 max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {chapters.map((chapter) => (
            <motion.article
              key={chapter.index}
              variants={cardItem}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 sm:p-8 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_hsl(0_0%_0%/0.22)] hover:border-primary/30"
              >
                <span
                  className="absolute -right-3 -top-7 select-none font-heading text-[7rem] font-extrabold leading-none tracking-tight text-foreground/[0.045] transition-colors duration-500 group-hover:text-brand-red/10"
                  aria-hidden="true"
                >
                  {chapter.index}
                </span>
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-b-full bg-gradient-primary transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="relative flex items-center justify-between">
                  <span className="font-heading text-sm font-extrabold tracking-[0.24em] text-foreground/30 transition-colors duration-500 group-hover:text-primary">
                    {chapter.index}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_hsl(0_100%_45%/0.6)] group-hover:-translate-y-0.5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {chapter.icon}
                    </svg>
                  </span>
                </div>

                <h3 className="relative mt-6 font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {chapter.title}
                </h3>
                <p className="relative mt-3 text-sm sm:text-base text-foreground leading-relaxed">
                  {chapter.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}