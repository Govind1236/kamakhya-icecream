function Garnish({ kind }) {
  switch (kind) {
    case "avocado":
      return (
        <g transform="rotate(-8 250 40)">
          <ellipse cx="250" cy="42" rx="50" ry="34" fill="#5C8238" />
          <ellipse cx="250" cy="42" rx="39" ry="25" fill="#CBE7A0" />
          <ellipse cx="250" cy="42" rx="39" ry="25" fill="none" stroke="#A6CD72" strokeWidth="2" />
          <circle cx="268" cy="38" r="9" fill="#8A6A3E" />
        </g>
      );
    case "vanilla":
      return (
        <g transform="translate(250 40)">
          <path
            d="M-44 6 C-52 -16 -32 -32 -6 -32 C22 -32 40 -14 36 8 C34 22 18 32 -6 32 C-30 32 -42 22 -44 6 Z"
            fill="#5B3A24"
          />
          <path
            d="M-20 -16 C-8 -24 6 -24 16 -18 C22 -14 22 -8 18 -6 C14 -10 6 -12 -2 -9 Z"
            fill="#8A5A33"
          />
          <path
            d="M-44 6 C-52 -16 -32 -32 -6 -32"
            fill="none"
            stroke="#7A4A24"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case "mango":
      return (
        <g transform="rotate(18 250 40)">
          <path
            d="M232 26 C 254 18 282 28 286 48 C 288 62 272 74 252 70 C 234 66 224 48 230 32 Z"
            fill="#FFA41B"
          />
          <path
            d="M232 26 C 248 20 272 30 276 48 C 278 62 266 70 252 66 C 240 62 232 46 236 32 Z"
            fill="#FFC369"
          />
          <ellipse cx="256" cy="38" rx="6" ry="11" fill="#E87E00" opacity="0.85" transform="rotate(25 256 38)" />
        </g>
      );
    case "chocolate":
      return (
        <g transform="rotate(-8 250 40)">
          <path d="M206 52 L238 30 L266 42 L288 26 L270 62 L228 70 Z" fill="#4A2A18" />
          <path d="M238 30 L266 42 L264 52 L238 44 Z" fill="#7A4A24" opacity="0.75" />
          <path d="M266 42 L288 26 L270 62 Z" fill="#3A1E10" opacity="0.6" />
          <path d="M292 24 L302 14 L312 26 L304 34 Z" fill="#6B4226" />
          <path d="M196 58 L206 50 L214 62 L206 70 Z" fill="#8B5A36" />
        </g>
      );
    case "strawberry":
      return (
        <g transform="rotate(4 250 46)">
          <path
            d="M250 62 C234 46 220 42 210 45 C200 48 196 60 202 68 C216 82 250 102 250 102 C250 102 284 82 298 68 C304 60 300 48 290 45 C280 42 266 46 250 62 Z"
            fill="#EF3E5E"
          />
          <path d="M232 50 L228 38 L240 40 M250 46 L250 34 L262 42 M270 48 L278 38 L280 50" stroke="#3C7A33" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="224" cy="58" r="1.6" fill="#FFD9E4" />
          <circle cx="244" cy="64" r="1.6" fill="#FFD9E4" />
          <circle cx="238" cy="46" r="1.6" fill="#FFD9E4" />
          <circle cx="260" cy="56" r="1.6" fill="#FFD9E4" />
          <circle cx="268" cy="68" r="1.6" fill="#FFD9E4" />
          <circle cx="278" cy="56" r="1.6" fill="#FFD9E4" />
          <path d="M250 62 C260 54 270 54 278 58" stroke="#F7B7C4" strokeWidth="2.5" fill="none" opacity="0.7" />
        </g>
      );
    case "pistachio":
      return (
        <g transform="translate(0 8)">
          <path d="M226 26 C208 14 200 16 194 24 C188 32 192 46 204 50 C218 55 230 48 230 36 Z" fill="#EFE2B8" stroke="#C9A964" strokeWidth="2" />
          <ellipse cx="230" cy="34" rx="9" ry="13" fill="#9CCB63" transform="rotate(18 230 34)" />
          <path d="M286 14 C298 22 300 34 292 42 C286 48 274 46 268 38 C262 30 270 18 286 14 Z" fill="#EFE2B8" stroke="#C9A964" strokeWidth="2" opacity="0.85" />
          <circle cx="282" cy="32" r="6" fill="#A8C96A" transform="rotate(-12 282 32)" />
          <circle cx="316" cy="34" r="11" fill="#E86B9C" />
          <circle cx="316" cy="34" r="5" fill="#F3A9C6" />
          <circle cx="256" cy="52" r="7" fill="#E2AED2" opacity="0.9" />
        </g>
      );
    case "caramel":
      return (
        <g transform="rotate(-6 250 40)">
          <path
            d="M212 52 C224 30 244 24 262 30 C280 36 290 50 282 60 C276 68 260 66 250 58 C238 48 226 46 218 50 C214 52 212 54 212 52 Z"
            fill="#C77F14"
          />
          <path d="M224 44 C234 36 248 34 258 38 C266 41 270 47 265 50" fill="none" stroke="#FFF1DA" strokeWidth="4" strokeLinecap="round" />
          <path d="M240 30 C248 24 258 24 264 28" fill="none" stroke="#8C4A1C" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

export default function HeroArt({ theme, className = "" }) {
  const { key, scoops, drizzle, drizzleDeep, sparkle, garnish } = theme;
  const ns = `hero-${key}`;
  const gradA = `${ns}-scoopA`;
  const gradB = `${ns}-scoopB`;
  const gradC = `${ns}-scoopC`;
  const gradGlass = `${ns}-glass`;
  const gradGlassEdge = `${ns}-glassEdge`;
  const gradDrizzle = `${ns}-drizzle`;

  return (
    <svg
      viewBox="0 0 520 560"
      className={`h-auto w-full select-none ${className}`}
      role="img"
      aria-label={`${theme.word ?? "Premium"} ice cream served in a glass bowl`}
    >
      <defs>
        <linearGradient id={gradA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scoops.a[0]} />
          <stop offset="0.55" stopColor={scoops.a[1]} />
          <stop offset="1" stopColor={scoops.a[0] ?? scoops.a[1]} />
        </linearGradient>
        <linearGradient id={gradB} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scoops.b[0]} />
          <stop offset="0.6" stopColor={scoops.b[1]} />
          <stop offset="1" stopColor={scoops.b[0] ?? scoops.b[1]} />
        </linearGradient>
        <radialGradient id={gradC} cx="0.38" cy="0.3" r="0.9">
          <stop offset="0" stopColor={scoops.c[0]} />
          <stop offset="0.6" stopColor={scoops.c[1]} />
          <stop offset="1" stopColor={scoops.c[0] ?? scoops.c[1]} />
        </radialGradient>
        <linearGradient id={gradGlass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.42)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
        <linearGradient id={gradGlassEdge} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="0.35" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="0.7" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
        <linearGradient id={gradDrizzle} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={drizzle} />
          <stop offset="1" stopColor={drizzleDeep} />
        </linearGradient>
        <filter id={`${ns}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#E60000" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter={`url(#${ns}-shadow)`}>
        {/* back rim */}
        <ellipse cx="250" cy="312" rx="176" ry="38" fill="rgba(255,255,255,0.22)" />

        {/* tower of scoops */}
        <g>
          <circle cx="196" cy="170" r="86" fill={`url(#${gradB})`} />
          <circle cx="322" cy="158" r="80" fill={`url(#${gradA})`} />
          <circle cx="250" cy="86" r="74" fill={`url(#${gradC})`} />
          <circle cx="250" cy="256" r="82" fill={`url(#${gradA})`} />
          <circle cx="168" cy="282" r="66" fill={`url(#${gradB})`} />
          <circle cx="338" cy="276" r="68" fill={`url(#${gradC})`} />

          <circle cx="180" cy="130" r="20" fill="rgba(255,255,255,0.55)" />
          <circle cx="306" cy="118" r="16" fill="rgba(255,255,255,0.5)" />
          <circle cx="236" cy="52" r="14" fill="rgba(255,255,255,0.6)" />
          <circle cx="176" cy="292" r="12" fill="rgba(255,255,255,0.45)" />
        </g>

        {/* drizzle */}
        <g fill="none" stroke={`url(#${gradDrizzle})`} strokeLinecap="round">
          <path d="M244 40 C252 96 226 132 250 168 C270 198 250 224 262 250" strokeWidth="13" />
          <path d="M322 96 C330 136 312 154 322 186 C330 212 318 228 312 242" strokeWidth="11" />
          <path d="M178 110 C188 146 168 168 178 196 C186 218 176 232 172 242" strokeWidth="10" />
          <path d="M250 168 C288 178 310 196 316 218" strokeWidth="9" />
        </g>
        <g fill={drizzle}>
          <circle cx="262" cy="252" r="10" fill={`url(#${gradDrizzle})`} />
          <circle cx="312" cy="246" r="9" fill={`url(#${gradDrizzle})`} />
          <circle cx="172" cy="246" r="8" fill={`url(#${gradDrizzle})`} />
        </g>

        {/* garnish */}
        <Garnish kind={garnish} />

        {/* glass bowl front */}
        <path
          d="M84,314 C84,352 118,464 250,470 C382,464 436,352 436,314 Z"
          fill={`url(#${gradGlass})`}
          stroke={`url(#${gradGlassEdge})`}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M124,330 C136,372 176,436 250,446"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M360,352 C352,398 316,446 264,452"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse cx="250" cy="312" rx="176" ry="38" fill="none" stroke={`url(#${gradGlassEdge})`} strokeWidth="5" />
      </g>

      {/* sparkle dots */}
      <g fill={sparkle}>
        <circle cx="96" cy="120" r="5" />
        <circle cx="438" cy="96" r="6" />
        <circle cx="452" cy="180" r="4" />
        <circle cx="70" cy="240" r="4" />
      </g>
    </svg>
  );
}