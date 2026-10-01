import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client } from "../lib/directus";

function SocialIcon({ platform }) {
  const name = (platform || "").toLowerCase();
  const className = "h-5 w-5";
  if (name.includes("whatsapp")) {
    return (
      <svg viewBox="0 0 448 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    );
  }
  if (name.includes("facebook")) {
    return (
      <svg viewBox="0 0 512 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
      </svg>
    );
  }
  if (name.includes("instagram")) {
    return (
      <svg viewBox="0 0 448 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7s34.1-33.5 74.7-74.7-33.6-74.7-74.7-74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function telHref(number) {
  if (!number) return null;
  return `tel:+${number.replace(/\D/g, "")}`;
}

function mailtoHref(email) {
  if (!email) return null;
  return `mailto:${email.trim()}`;
}

// Returns a usable absolute URL, or null when the stored value isn't one.
// Guards against CMS rows saved as "example.com" or wrapped in backticks.
function safeUrl(url) {
  if (typeof url !== "string") return null;
  const trimmed = url.trim().replace(/^`+|`+$/g, "").trim();
  if (!trimmed) return null;
  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : null;
  } catch {
    return null;
  }
}

export default function Footer({ initialSocial = [], initialContact = null }) {
  const [socials, setSocials] = useState(initialSocial);
  const [info, setInfo] = useState(initialContact);
  const socialLinkClass =
    "h-8 w-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300";
  const linkClass = "text-sm text-gray-500 hover:text-primary transition-colors";
  const iconClass = "h-3.5 w-3.5 shrink-0";

  useEffect(() => {
    if (initialSocial && initialSocial.length > 0) return;
    let active = true;
    client
      .request(readItems("SocialMedia"))
      .then((data) => {
        if (active) setSocials(data ?? []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialSocial]);

  useEffect(() => {
    if (initialContact) return;
    let active = true;
    client
      .request(readItems("ContactUs", { limit: 1 }))
      .then((data) => {
        if (active && data && data.length > 0) setInfo(data[0]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialContact]);

  const phone = info?.ContactNumber ?? "";
  const email = info?.Email ?? "";
  const hours = info?.OpenHours ?? "";
  const address = info?.Address ?? "";
  const mapLink = safeUrl(info?.MapLink);
  const mapEmbed = safeUrl(info?.MapEmbed);

  const socialItems = socials
    .filter((s) => s?.Platform)
    .map((s) => ({ ...s, href: safeUrl(s.Link) }));

  return (
    <footer className="bg-brand-gray">
      <div className="container pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          <div className="lg:col-span-1 space-y-4">
            <a href="#home" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Kamakhya Icecream logo" className="h-9 sm:h-10 w-auto object-contain" />
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Kamakhya<span className="text-primary">Icecream</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
              Sweet moments, served daily. Artisan scoops made fresh for homes, celebrations, and every people around nation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Quick Links</div>
            <ul className="space-y-2.5">
              <li><a href="#home" className={linkClass}>Home</a></li>
              <li><a href="#flavors" className={linkClass}>Product</a></li>
              <li><a href="#about" className={linkClass}>About Us</a></li>
              <li><a href="#contact" className={linkClass}>Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Contact</div>
            <ul className="space-y-3">
              {phone && (
                <li>
                  <a href={telHref(phone)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} text-primary`}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={mailtoHref(email)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} text-primary`}>
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} mt-0.5 text-primary`}>
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{address}</span>
                  </div>
                </li>
              )}
              {hours && (
                <li>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} mt-0.5 text-primary`}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{hours}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Our Location</div>
            <ul className="space-y-3">
              {(address || mapLink) && (
                <li className="space-y-1">
                  <div className="text-xs font-bold tracking-wider text-foreground uppercase">Head Office</div>
                  {mapLink ? (
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} text-primary`}>
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {address}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} text-primary`}>
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {address}
                    </div>
                  )}
                </li>
              )}
              {socialItems.length > 0 && (
                <li className="space-y-2">
                  <div className="text-xs font-bold tracking-wider text-foreground uppercase">Follow Us</div>
                  <div className="flex items-center gap-3">
                    {socialItems.map((s) =>
                      s.href ? (
                        <a
                          key={s.id}
                          href={s.href}
                          aria-label={s.Platform}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={socialLinkClass}
                        >
                          <SocialIcon platform={s.Platform} />
                        </a>
                      ) : (
                        <span
                          key={s.id}
                          aria-label={`${s.Platform} (link not set)`}
                          title={`${s.Platform} link not set in CMS`}
                          className={`${socialLinkClass} opacity-40 cursor-not-allowed`}
                        >
                          <SocialIcon platform={s.Platform} />
                        </span>
                      )
                    )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {mapEmbed && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
            <iframe
              title={`${address || "Our"} location map`}
              src={mapEmbed}
              className="w-full h-[200px] sm:h-[260px] border-0 grayscale-[0.15] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 sm:pt-10 mt-10 border-t border-gray-100">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Kamakhya Icecream. All rights reserved.</p>
          <p className="text-xs text-gray-400">
            Crafted with love by{" "}
            <a href="https://codesparks.com.np" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Codesparks Technology Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}