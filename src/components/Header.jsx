import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client } from "../lib/directus";
import { buildWhatsAppUrl } from "../lib/whatsapp";

export default function Header({ initialContact = null }) {
  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (initialContact) return;
    let active = true;
    client
      .request(readItems("ContactUs", { limit: 1 }))
      .then((data) => {
        if (active && data && data.length > 0) setContact(data[0]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialContact]);

  const orderUrl = buildWhatsAppUrl(
    contact?.ContactNumber,
    "Hi Kamakhya Icecream! I'd like to place an order."
  );

  return (
    <header className="sticky top-3 sm:top-5 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="backdrop-blur-xl bg-white/45 border border-white/60 px-5 sm:px-8 py-3 rounded-2xl sm:rounded-full shadow-[0_20px_50px_-20px_rgba(230,0,0,0.3)] flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="Kamakhya Icecream logo" className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(230,0,0,0.2)]" />
            <span style={{ color: "#E60000" }} className="font-heading text-lg sm:text-xl font-extrabold tracking-tight whitespace-nowrap">
              Kamakhya <span style={{ color: "#2A2A2A" }}>Icecream</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <a href="#home" className="text-sm font-semibold text-[#2A2A2A]/70 hover:text-brand-red transition-colors duration-200">Home</a>
            <a href="#flavors" className="text-sm font-semibold text-[#2A2A2A]/70 hover:text-brand-red transition-colors duration-200">Product</a>
            <a href="#about" className="text-sm font-semibold text-[#2A2A2A]/70 hover:text-brand-red transition-colors duration-200">About Us</a>
            <a href="#contact" className="text-sm font-semibold text-[#2A2A2A]/70 hover:text-brand-red transition-colors duration-200">Contact</a>
          </div>
          <a
            href={orderUrl ?? "#contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red text-white rounded-full px-4 sm:px-5 h-9 sm:h-10 inline-flex items-center gap-2 font-semibold text-xs sm:text-sm border-none hover:brightness-110 hover:shadow-[0_18px_40px_-12px_rgba(230,0,0,0.6)] transition-all duration-300"
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}