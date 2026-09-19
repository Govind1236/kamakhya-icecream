import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import { client } from "../lib/directus";
import FlavorCard from "./FlavorCard";

export default function FlavorMenu({ initialFlavors = [] }) {
  const [flavors, setFlavors] = useState(() =>
    initialFlavors.map((p) => ({
      id: p.id,
      name: p.Title,
      price: p.Price,
      description: p.Description,
      badge: p.Tags,
      image: p.Product_Image,
    }))
  );
  const [loading, setLoading] = useState(initialFlavors.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialFlavors.length > 0) return;
    let active = true;

    async function loadFlavors() {
      try {
        const data = await client.request(readItems("Products", { sort: ["id"] }));
        if (active) {
          setFlavors(
            data.map((p) => ({
              id: p.id,
              name: p.Title,
              price: p.Price,
              description: p.Description,
              badge: p.Tags,
              image: p.Product_Image,
            }))
          );
          setError(null);
        }
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFlavors();
    return () => {
      active = false;
    };
  }, [initialFlavors]);

  return (
    <section id="flavors" className="relative overflow-hidden bg-brand-gray py-16 sm:py-24 md:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[320px] w-[420px] rounded-full bg-brand-red/5 blur-[80px]"></div>
      </div>
      <div className="relative container">
        <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-bold">Our Menu</p>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">Today&apos;s Flavors</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-foreground leading-relaxed">
            A rotating board of churned-daily scoops — classic creams, tropical fruit and indulgent swirls.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-muted/60"></div>
                <div className="p-5 sm:p-6 md:p-7 space-y-3">
                  <div className="h-6 w-24 rounded-full bg-muted"></div>
                  <div className="h-6 w-3/4 rounded bg-muted"></div>
                  <div className="h-20 w-full rounded bg-muted/60"></div>
                </div>
              </div>
            ))}

          {error && (
            <div className="sm:col-span-2 lg:col-span-3 rounded-3xl glass p-8 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Couldn&apos;t load menu items right now.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Check your {`VITE_DIRECTUS_URL`} and the <code className="font-mono">Products</code> collection.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            flavors.map((flavor, i) => (
              <FlavorCard key={flavor.id} flavor={flavor} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
}