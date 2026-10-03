export const LogoMark = ({ light = false, className = "w-9 h-9" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M20 75L50 20L80 75H64L50 48L36 75H20Z"
      fill={light ? "#FFFFFF" : "#0B192C"}
    />
    <path
      d="M36 75L50 48L64 75"
      stroke="#10B981"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="32" r="4" fill="#10B981" />
  </svg>
);

export const Logo = ({ light = false }) => (
  <span className="flex items-center gap-2.5" data-testid="brand-logo">
    <LogoMark light={light} />
    <span className="flex flex-col leading-none">
      <span
        className={`font-display font-extrabold tracking-[0.18em] text-sm ${
          light ? "text-white" : "text-navy"
        }`}
      >
        ARNAVA
      </span>
      <span className="font-mono text-[10px] tracking-[0.42em] text-emerald-500">
        EXIM
      </span>
    </span>
  </span>
);
