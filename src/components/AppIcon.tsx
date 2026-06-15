// macOS-style "squircle" app icons, drawn with inline SVG so they stay crisp.

type Props = { icon: string; size?: number };

const G = ({ id, from, to }: { id: string; from: string; to: string }) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={from} />
    <stop offset="1" stopColor={to} />
  </linearGradient>
);

export function AppIcon({ icon, size = 56 }: Props) {
  const r = size * 0.225; // squircle approximation
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  switch (icon) {
    case "about":
      return (
        <svg {...common}>
          <defs><G id="about-g" from="#A0C4FF" to="#4C6FFF" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#about-g)" />
          <circle cx="50" cy="40" r="15" fill="#fff" opacity="0.95" />
          <path d="M25 78c2-16 13-24 25-24s23 8 25 24z" fill="#fff" opacity="0.95" />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <defs><G id="proj-g" from="#FFD479" to="#FF9F0A" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#proj-g)" />
          <path d="M20 38c0-4 3-7 7-7h14l6 7h26c4 0 7 3 7 7v25c0 4-3 7-7 7H27c-4 0-7-3-7-7z" fill="#fff" opacity="0.9" />
          <rect x="20" y="44" width="60" height="33" rx="6" fill="#fff" />
        </svg>
      );
    case "resume":
      return (
        <svg {...common}>
          <defs><G id="res-g" from="#F4F5F7" to="#D7DBE2" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#res-g)" />
          <rect x="28" y="20" width="44" height="60" rx="6" fill="#fff" />
          <g fill="#9aa3b2">
            <rect x="36" y="32" width="28" height="4" rx="2" />
            <rect x="36" y="42" width="28" height="4" rx="2" />
            <rect x="36" y="52" width="20" height="4" rx="2" />
            <rect x="36" y="62" width="24" height="4" rx="2" />
          </g>
          <rect x="58" y="14" width="22" height="8" rx="4" fill="#FF3B30" />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <defs><G id="con-g" from="#34D399" to="#059669" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#con-g)" />
          <rect x="22" y="30" width="56" height="40" rx="7" fill="#fff" />
          <path d="M24 34l26 19 26-19" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common}>
          <defs><G id="term-g" from="#3a3a3c" to="#1c1c1e" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#term-g)" />
          <rect x="14" y="20" width="72" height="60" rx="9" fill="#0b0b0d" />
          <rect x="14" y="20" width="72" height="14" rx="9" fill="#2c2c2e" />
          <path d="M26 48l9 8-9 8" fill="none" stroke="#30D158" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="40" y="62" width="20" height="4.5" rx="2.2" fill="#fff" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <rect width="100" height="100" rx={r * (100 / size)} fill="#24292f" />
          <path fill="#fff" d="M50 22c-15.5 0-28 12.5-28 28 0 12.4 8 22.9 19.2 26.6 1.4.3 1.9-.6 1.9-1.4v-4.9c-7.8 1.7-9.5-3.7-9.5-3.7-1.3-3.3-3.1-4.1-3.1-4.1-2.6-1.7.2-1.7.2-1.7 2.8.2 4.3 2.9 4.3 2.9 2.5 4.3 6.6 3 8.2 2.3.3-1.8 1-3 1.8-3.7-6.3-.7-12.9-3.1-12.9-14 0-3.1 1.1-5.6 2.9-7.6-.3-.7-1.3-3.6.3-7.4 0 0 2.4-.8 7.7 2.9 2.2-.6 4.6-.9 7-.9s4.8.3 7 .9c5.3-3.7 7.7-2.9 7.7-2.9 1.6 3.8.6 6.7.3 7.4 1.8 2 2.9 4.5 2.9 7.6 0 10.9-6.6 13.3-12.9 14 1 .9 1.9 2.6 1.9 5.3v7.8c0 .8.5 1.7 1.9 1.4C70 72.9 78 62.4 78 50c0-15.5-12.5-28-28-28z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect width="100" height="100" rx={r * (100 / size)} fill="#0A66C2" />
          <g fill="#fff">
            <rect x="26" y="42" width="11" height="34" rx="1" />
            <circle cx="31.5" cy="31" r="6.5" />
            <path d="M46 42h11v5c1.7-3 5.2-6 11-6 9 0 12 5.8 12 14.4V76H79V57c0-4.5-1.6-7.5-5.6-7.5-3 0-4.8 2-5.6 4-.3.7-.4 1.7-.4 2.7V76H46z" />
          </g>
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <rect width="100" height="100" rx={r * (100 / size)} fill="#000" />
          <path fill="#fff" d="M58.5 44.7L78 23h-6.3L55.7 41.8 42.9 23H26l20.5 29.8L26 76h6.3l17.9-20.8L64.1 76H81zM52.6 51.4l-2.1-3L34.6 27.6h6l13.4 19 2.1 3 17.4 24.7h-6z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <defs><G id="mail-g" from="#5AC8FA" to="#0A84FF" /></defs>
          <rect width="100" height="100" rx={r * (100 / size)} fill="url(#mail-g)" />
          <rect x="22" y="30" width="56" height="40" rx="7" fill="#fff" />
          <path d="M24 34l26 19 26-19" fill="none" stroke="#0A84FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="100" height="100" rx={r * (100 / size)} fill="#888" />
          <text x="50" y="64" textAnchor="middle" fontSize="40" fill="#fff">{icon}</text>
        </svg>
      );
  }
}
