import { useEffect, useState } from "react";
import { readItems, createItem } from "@directus/sdk";
import { client } from "../lib/directus";

const initialForm = { Name: "", Email: "", Phone: "", Message: "" };



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

  const phone = info?.ContactNumber || "+91 98765 43210";
  const email = info?.Email || "hello@kamakhyaicecream.in";
  const hours = info?.OpenHours || "Mon – Sun, 11 AM – 9:30 PM";
  const address =
    info?.Map || "Kamakhya Icecream, 42 Market Road, near Temple Gate, Guwahati, Assam 781001";

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 h-[340px] w-[420px] rounded-full bg-brand-red/5 blur-[80px]"></div>
        <div className="absolute top-10 -left-24 h-[300px] w-[300px] rounded-full bg-foreground/5 blur-[70px]"></div>
      </div>
      <div className="relative container">
        <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-bold">Contact</p>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">We&apos;d Love to Hear From You</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-foreground leading-relaxed">
            Questions, bulk orders, party tubs, or just a flavour idea — reach out and we&apos;ll get back to you fast.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="h-12 sm:h-16 w-12 sm:w-16 shrink-0 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
                  <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Call Us</h3>
              </div>
              <p className="mt-5 text-base sm:text-lg text-foreground leading-relaxed">
                {phone}<br />
                {hours}
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="h-12 sm:h-16 w-12 sm:w-16 shrink-0 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
                  <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Email Us</h3>
              </div>
              <p className="mt-5 text-base sm:text-lg text-foreground leading-relaxed">
                {email}<br />
                We reply within 24 hours.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-7 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="h-12 sm:h-16 w-12 sm:w-16 shrink-0 rounded-lg sm:rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
                  <svg viewBox="0 0 24 24" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Visit the Parlour</h3>
              </div>
              <p className="mt-5 text-base sm:text-lg text-foreground leading-relaxed whitespace-pre-line">
                {address}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-primary/10 shadow-[0_4px_30px_-8px_hsl(0_0%_0%/0.08)]">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold">Send Us a Message</h3>
              <p className="mt-2 text-sm sm:text-base text-foreground leading-relaxed">
                Fill in the form and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs sm:text-sm font-semibold mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="Name"
                    type="text"
                    required
                    value={form.Name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full h-11 sm:h-12 rounded-xl border border-input bg-background px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="Email"
                    type="email"
                    required
                    value={form.Email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full h-11 sm:h-12 rounded-xl border border-input bg-background px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs sm:text-sm font-semibold mb-2">
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="Phone"
                  type="tel"
                  value={form.Phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full h-11 sm:h-12 rounded-xl border border-input bg-background px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs sm:text-sm font-semibold mb-2">
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
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-shadow resize-none"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              {status === "success" && (
                <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700">
                  Thank you! Your message has been sent. We&apos;ll get back to you soon.
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 h-12 text-sm sm:text-base font-semibold text-white shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}