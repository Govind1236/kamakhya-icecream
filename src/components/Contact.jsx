import { useEffect, useState } from "react";
import { readItems, createItem } from "@directus/sdk";
import { client } from "../lib/directus";

const initialForm = { Name: "", Email: "", Phone: "", Message: "" };

const details = [
  {
    id: "call",
    title: "Call Us",
    primary: "+977 9823800422",
    secondary: "Sun – Sat, 7:30 AM – 9:30 PM",
    href: "tel:+9779823800422",
  },
  {
    id: "email",
    title: "Email Us",
    primary: "kamakhyaicecream@gmail.com",
    secondary: "We reply within 24 hours.",
    href: "mailto:kamakhyaicecream@gmail.com",
  },
  {
    id: "visit",
    title: "Visit the Parlour",
    primary: "Arjundhara - 06, Pushpalal Chowk",
    secondary: "Come say hello and taste what's fresh.",
    href: "https://maps.google.com/maps?q=Arjundhara%20-%2006%2C%20Pushpalal%20Chowk&output=embed",
  },
];

const detailIcons = {
  call: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  email: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  visit: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400";
const fieldClass =
  "w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm sm:text-base text-foreground placeholder:text-gray-400 outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10";

function DetailCard({ id, title, primary, secondary, href, external }) {
  const cardClass =
    "group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-24px_hsl(0_0%_0%/0.25)]";
  const iconClass =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-[0_10px_24px_-10px_hsl(0_100%_45%/0.65)] transition-transform duration-300 group-hover:scale-105";
  const primaryClass = "mt-4 block break-words font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary";

  const inner = (
    <>
      <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand-red transition-transform duration-500 group-hover:scale-y-100" aria-hidden="true" />
      <div className="flex h-full items-center gap-4">
        <span className={iconClass}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {detailIcons[id]}
          </svg>
        </span>
        <div className="min-w-0">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{title}</h3>
          <span className={primaryClass}>{primary}</span>
          <span className="mt-1.5 block text-sm leading-relaxed text-gray-500">{secondary}</span>
        </div>
      </div>
    </>
  );

  if (!href) return <div className={cardClass}>{inner}</div>;

  return (
    <a
      href={href}
      className={cardClass}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export default function Contact({ initialContact = null }) {
  const [info, setInfo] = useState(initialContact);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.Name.trim() || !form.Email.trim() || !form.Message.trim()) {
      setError("Please fill in your name, email and message.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await client.request(createItem("Inquiries", form));
      setForm(initialForm);
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  }

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

  const call = details[0];
  const email = details[1];
  const visit = details[2];

  const cards = [
    {
      ...call,
      primary: info?.ContactNumber || call.primary,
      secondary: info?.OpenHours || call.secondary,
      href: info?.ContactNumber ? `tel:+${info.ContactNumber.replace(/\D/g, "")}` : call.href,
    },
    { ...email, primary: info?.Email || email.primary },
    { ...visit, primary: info?.Map || visit.primary },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-brand-gray py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-[320px] w-[380px] rounded-full bg-brand-red/10 blur-[90px]"></div>
        <div className="absolute -bottom-32 right-0 h-[300px] w-[340px] rounded-full bg-brand-red/5 blur-[80px]"></div>
      </div>

      <div className="relative container">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            Contact
            <span className="h-px w-8 bg-brand-red/40" aria-hidden="true" />
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-foreground">
            We&apos;d Love to <span className="text-gradient">Hear From You</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg">
            Questions, bulk orders, party tubs, or just a flavour idea — reach out and we&apos;ll get back to you fast.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="grid gap-4 sm:gap-5 lg:h-full lg:grid-rows-3">
            {cards.map((card) => (
              <DetailCard
                key={card.id}
                {...card}
                external={card.id === "visit"}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_50px_-25px_hsl(0_0%_0%/0.18)] sm:p-8 lg:p-10">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Send Us a Message
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
              Fill in the form and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5 sm:mt-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={`${labelClass} mb-2`}>
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="Name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.Name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={`${labelClass} mb-2`}>
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="Email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.Email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className={`${labelClass} mb-2`}>
                  Phone <span className="normal-case tracking-normal text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="Phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.Phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={`${labelClass} mb-2`}>
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="Message"
                  rows={5}
                  required
                  value={form.Message}
                  onChange={handleChange}
                  placeholder="Tell us about your flavour idea, bulk order, or question..."
                  className={`${fieldClass} h-auto resize-none py-3`}
                />
              </div>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {status === "success" && (
                <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700">
                  Thank you! Your message has been sent. We&apos;ll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_hsl(0_100%_45%/0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_16px_34px_-14px_hsl(0_100%_45%/0.75)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-base"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}