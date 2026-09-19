export default function ScoopSvg({ className = "", ariaHidden = true }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M40 108 a60 60 0 0 0 120 0 c0 -34 -27 -62 -60 -62 s-60 28 -60 62z" fill="url(#scoopGrad)" />
      <path d="M46 96 a54 54 0 0 0 108 0" stroke="hsl(0 0% 100% / 0.75)" strokeWidth="7" strokeLinecap="round" />
      <path d="M58 84 q-9 3 -8 14 M100 72 q-8 4 -7 13 M142 84 q-9 3 -8 14" stroke="hsl(0 0% 100% / 0.8)" strokeWidth="6" strokeLinecap="round" />
      <path d="M55 152 L100 224 L145 152 Z" fill="url(#coneGrad)" stroke="hsl(200 45% 78%)" strokeWidth="2" />
      <path d="M72 160 l28 52 M128 160 l-28 52 M92 152 l16 72" stroke="hsl(200 45% 80%)" strokeWidth="4" strokeLinecap="round" />
      <path d="M74 178 l52 -4 M68 200 l54 -3 M63 218 l52 -2" stroke="hsl(200 45% 82%)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}