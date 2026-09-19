export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="scoopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(200 90% 62%)" />
          <stop offset="1" stopColor="hsl(200 90% 52%)" />
        </linearGradient>
        <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(0 0% 100% / 0.92)" />
          <stop offset="1" stopColor="hsl(200 45% 88%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}