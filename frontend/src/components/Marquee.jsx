const ITEMS = [
  "Premium Psyllium Husk",
  "Premium Moringa Powder",
  "Purity Grades 95% & 99%",
  "B2B Export From India",
  "MSME Registered",
  "IEC PLHPS3426M",
  "Quality-Focused Sourcing",
  "Global Logistics Coordination",
];

const Diamond = () => (
  <svg viewBox="0 0 8 8" className="h-2 w-2 shrink-0 text-emerald-400" aria-hidden="true">
    <rect x="1.5" y="1.5" width="5" height="5" transform="rotate(45 4 4)" fill="currentColor" />
  </svg>
);

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="editorial-marquee"
      className="marquee-paused relative overflow-hidden border-y border-white/10 bg-navy-950 py-4"
    >
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
              {item}
            </span>
            <Diamond />
          </span>
        ))}
      </div>
    </div>
  );
}
