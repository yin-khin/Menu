// Inline SVG flags (emoji flags do not render on Windows).

const KhmerFlag = () => (
  <svg viewBox="0 0 30 20" className="h-full w-full" aria-hidden="true">
    <rect width="30" height="20" fill="#032EA1" />
    <rect y="5" width="30" height="10" fill="#E00025" />
    <g fill="#fff">
      <rect x="9" y="11.2" width="12" height="1.2" />
      <rect x="10.5" y="9.6" width="9" height="1.6" />
      <rect x="12" y="8" width="6" height="1.6" />
      <rect x="13.6" y="6.2" width="2.8" height="1.8" />
      <rect x="14.5" y="5.2" width="1" height="1" />
    </g>
  </svg>
);

const EnglishFlag = () => (
  <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
    <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="13" />
    <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
  </svg>
);

export const flags = { km: KhmerFlag, en: EnglishFlag };
