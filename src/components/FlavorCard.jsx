import ScoopSvg from "./ScoopSvg";
import { getAssetUrl } from "../lib/directus";

const baseBadge =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

function formatPrice(price) {
  if (typeof price === "number") return `$${price.toFixed(2)} / scoop`;
  if (typeof price === "string" && price.trim() !== "" && !isNaN(Number(price))) {
    return `$${Number(price).toFixed(2)} / scoop`;
  }
  return price;
}

export default function FlavorCard({ flavor, index = 0 }) {
  const fallbackKey = flavor.name || flavor.Name || "";
  const imageUrl = getAssetUrl(flavor.image || flavor.image_file, fallbackKey);
  const isSecondary =
    flavor.badgeVariant === "secondary" || flavor.badge_variant === "secondary";
  const badgeClasses = isSecondary
    ? `${baseBadge} border-transparent bg-secondary text-secondary-foreground`
    : `${baseBadge} border-transparent bg-primary text-primary-foreground`;

  return (
    <article
      className="group glass rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,hsl(0_0%_96%/0.9),transparent_55%),radial-gradient(circle_at_20%_85%,hsl(0_0%_94%/0.9),transparent_55%)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={flavor.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ScoopSvg className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[82%] w-auto drop-shadow-[0_10px_30px_rgba(230,0,0,0.2)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />
        )}
        {!imageUrl && (
          <span className="absolute left-3 sm:left-4 top-3 sm:top-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-border/60">
            Photo placeholder
          </span>
        )}
        {flavor.badge && (
          <span className={`${badgeClasses} absolute right-3 sm:right-4 top-3 sm:top-4`}>
            {flavor.badge}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6 md:p-7">
        <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold px-3 py-1 rounded-full bg-primary/10 w-fit">
          {formatPrice(flavor.price)}
        </span>
        <h3 className="mt-3 text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
          {flavor.name}
        </h3>
        <p className="mt-2 text-base sm:text-lg text-foreground leading-relaxed">
          {flavor.description || flavor.desc}
        </p>
      </div>
    </article>
  );
}