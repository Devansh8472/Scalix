import {
  type ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import combinedLogo from "./assets/images/combined-logo-1.png";
import scalixLogo from "./assets/images/scalix-logo.png";
import scalixVisualmark from "./assets/images/scalix-visualmark.png";
import heroBannerImage from "./assets/images/mr.diegender.webp";
import missionImage from "../page_3.webp";
import CaseStudiesDetailed, {
  type DetailedCaseStudyItem,
} from "./components/ui/case-studies";

const BRAND = {
  navy: "#0B4A7D",
  orange: "#F28C22",
  sky: "#2DB6D9",
  soft: "#F7FAFC",
  dark: "#081724",
};

/* ═══════════════════════════════════════════════════
   INLINE SVG ICONS (Lucide-style, stroke-based)
   No external dependency — crisp, cohesive, premium
   ═══════════════════════════════════════════════════ */
const Icons = {
  // Services
  Target: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Search: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  // Framework
  Compass: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Filter: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Zap: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Shield: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  // Mission
  CheckCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  // Hero features
  Layers: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  DollarSign: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  // Founder features
  Award: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  BadgeCheck: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  // Blog
  FileText: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  // Case Studies
  BarChart: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  // Contact
  Phone: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  // Footer social
  Linkedin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768M20 4l-6.768 6.768" />
    </svg>
  ),
  Instagram: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Globe: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="inline-flex items-center"
      aria-label="Scalix Marketing Solutions"
    >
      <div className={`mr-[1px] shrink-0 ${compact ? "h-9 w-9" : "h-11 w-11"}`}>
        <img
          src={scalixVisualmark}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </div>
      <div
        className={`relative overflow-hidden ${compact ? "h-14 w-44" : "h-16 w-52"}`}
      >
        <img
          src={scalixLogo}
          alt="Scalix Marketing Solutions"
          className="h-full w-full scale-[1.7] object-contain"
          loading="eager"
        />
      </div>
    </div>
  );
}

/* ── Scroll-aware hook ── */
function useScrolled(enterThreshold = 32, exitThreshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let rafId = 0;

    const updateScrolled = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled((prev) => (prev ? y > exitThreshold : y > enterThreshold));
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [enterThreshold, exitThreshold]);
  return scrolled;
}

/* ── Active section tracker ── */
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            visibleMap.set(id, e.intersectionRatio);
          });
          let best = sectionIds[0];
          let bestRatio = 0;
          visibleMap.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              best = key;
              bestRatio = ratio;
            }
          });
          if (bestRatio > 0) setActive(best);
        },
        { threshold: [0, 0.15, 0.3, 0.5] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);
  return active;
}

/* ── Hamburger icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="hamburger-icon" aria-hidden="true">
      <span className={`hamburger-bar ${open ? "bar-1-open" : ""}`} />
      <span className={`hamburger-bar ${open ? "bar-2-open" : ""}`} />
      <span className={`hamburger-bar ${open ? "bar-3-open" : ""}`} />
    </div>
  );
}

function PlaceholderImage({
  label,
  tall = false,
  premium = false,
  showVisualmark = false,
  imageSrc,
  imageAlt,
  preserveProportions = false,
  stretchToFit = false,
  heightClass,
}: {
  label: string;
  tall?: boolean;
  premium?: boolean;
  showVisualmark?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  preserveProportions?: boolean;
  stretchToFit?: boolean;
  heightClass?: string;
}) {
  return (
    <div
      className={`relative w-full ${heightClass ?? (tall ? "h-96" : "h-72")} overflow-hidden rounded-[2rem] border p-5 shadow-2xl`}
      style={{
        borderColor: premium ? `${BRAND.orange}25` : "rgba(148,163,184,0.16)",
        background: premium
          ? "linear-gradient(135deg, rgba(11,74,125,0.12), rgba(242,140,34,0.10), rgba(45,182,217,0.08))"
          : "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(11,74,125,0.18), rgba(2,6,23,0.94))",
      }}
    >
      <div
        className="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed text-center text-sm leading-7 text-slate-500"
        style={{
          borderColor: premium ? `${BRAND.orange}35` : "rgba(148,163,184,0.25)",
          backgroundColor: premium
            ? "rgba(255,255,255,0.65)"
            : "rgba(255,255,255,0.03)",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? label}
            className={`h-full w-full rounded-[1.5rem] ${stretchToFit ? "object-fill" : preserveProportions ? "object-contain" : "object-cover"}`}
            loading="lazy"
          />
        ) : (
          <div className="max-w-md px-6">{label}</div>
        )}
      </div>
      {showVisualmark ? (
        <div className="pointer-events-none absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/70 shadow-lg backdrop-blur">
          <img
            src={scalixVisualmark}
            alt=""
            aria-hidden="true"
            className="h-9 w-9 object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
      style={{
        borderColor: `${BRAND.orange}28`,
        backgroundColor: `${BRAND.orange}12`,
        color: BRAND.orange,
      }}
    >
      <img
        src={scalixVisualmark}
        alt=""
        aria-hidden="true"
        className="h-4 w-4 shrink-0 object-contain"
      />
      <span>{children}</span>
    </div>
  );
}

export default function ScalixDummyWebsite() {
  const services = [
    {
      title: "Intent-Based Campaign Architecture",
      desc: "We design campaign structures around discovery, consideration, and high-intent buying stages so traffic becomes easier to control and scale.",
      icon: Icons.Target,
    },
    {
      title: "Margin-Based Bidding System",
      desc: "We align bids with profit logic, not vanity metrics, so growth does not silently damage contribution margin.",
      icon: Icons.TrendingUp,
    },
    {
      title: "Search Term Domination Engine",
      desc: "We isolate winning search terms, split intent correctly, and build cleaner scaling paths across match types and placements.",
      icon: Icons.Search,
    },
  ];

  const framework = [
    {
      title: "Discovery",
      desc: "Auto and broad campaigns used to uncover patterns, search term signals, and hidden intent pockets.",
      icon: Icons.Compass,
    },
    {
      title: "Intent Validation",
      desc: "Phrase campaigns used to validate clusters, reduce noise, and improve traffic quality before aggressive scaling.",
      icon: Icons.Filter,
    },
    {
      title: "High-Intent Scaling",
      desc: "Exact campaigns used to isolate winners and push strong traffic with better placement control.",
      icon: Icons.Zap,
    },
    {
      title: "Profit Control",
      desc: "Budget allocation, TACOS monitoring, and margin-led optimization built to protect scale from chaos.",
      icon: Icons.Shield,
    },
  ];

  const caseStudies: DetailedCaseStudyItem[] = [
    {
      id: "home-decor",
      title: "Home Decor Brand Growth",
      stat: "ACOS down 38% in 90 days",
      desc: "Turned messy traffic into a cleaner PPC system with stronger allocation logic and clearer scaling decisions.",
      quote:
        "The campaign architecture finally made sense. Instead of scattered spend, we gained precise intent control and much cleaner scaling decisions week-over-week.",
      name: "Nora Elahi",
      role: "Founder, Home Decor Brand",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      iconKey: "monitor",
      metrics: [
        {
          value: "38%",
          label: "ACOS Reduction",
          sub: "Within the first 90 days",
        },
        {
          value: "2.1x",
          label: "ROAS Lift",
          sub: "After account restructuring",
        },
      ],
    },
    {
      id: "restructure-win",
      title: "Campaign Restructure Win",
      stat: "Spend waste cut by 41%",
      desc: "Rebuilt campaign segmentation so spend followed buyer intent instead of being spread across random traffic pockets.",
      quote:
        "Once segmentation was rebuilt around search intent and match-type purpose, wasted traffic dropped and reporting became far easier to act on.",
      name: "Rhea Kapoor",
      role: "PPC Manager, Consumer Brand",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
      iconKey: "layoutDashboard",
      metrics: [
        {
          value: "41%",
          label: "Waste Reduced",
          sub: "Low-intent spend eliminated",
        },
        {
          value: "63%",
          label: "Signal Clarity",
          sub: "Cleaner search-term visibility",
        },
      ],
    },
    {
      id: "profit-first",
      title: "Profit-First PPC System",
      stat: "Contribution margin +26%",
      desc: "Shifted the account away from activity-based management and into a more disciplined profit-focused structure.",
      quote:
        "The account moved from daily ad activity to a profit-control system. Forecasting became calmer, and scaling no longer came with silent margin damage.",
      name: "Daniel Chen",
      role: "Growth Lead, E-commerce Brand",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      iconKey: "users",
      metrics: [
        {
          value: "26%",
          label: "Margin Improvement",
          sub: "After profit-led bid controls",
        },
        {
          value: "1.8x",
          label: "Forecast Reliability",
          sub: "With structured scaling loops",
        },
      ],
    },
  ];

  const blogs = [
    "How to Reduce ACOS on Amazon Without Killing Sales",
    "Amazon PPC Campaign Structure for 2026",
    "Why Your Amazon Ads Are Not Converting",
    "Broad vs Phrase vs Exact Match: What Actually Matters",
    "How to Scale Amazon Sales Without Increasing ACOS",
  ];

  const heroFeatures: [string, string, React.FC][] = [
    [
      "System-Driven",
      "Campaigns built around Buyer search intent, Matchtype positioning, Scaling layer.",
      Icons.Layers,
    ],
    [
      "Profit-Focused",
      'We prioritize contribution margin, Strategic Targeting of "Profit Zones".',
      Icons.DollarSign,
    ],
    [
      "Architech-Led",
      "Specialist-led strategy, not volume-based agency management.",
      Icons.User,
    ],
  ];

  const missionItems: [string, React.FC][] = [
    ["Intent-led campaign structure", Icons.Target],
    ["Margin-based bidding logic", Icons.TrendingUp],
    ["Cleaner search term control", Icons.Search],
    ["More disciplined scaling decisions", Icons.Shield],
  ];

  const founderFeatures: [string, React.FC][] = [
    ["Amazon PPC specialist positioning", Icons.Award],
    ["Founder-led strategy approach", Icons.Briefcase],
    ["Certifications and proof assets", Icons.BadgeCheck],
    ["High-trust premium authority section", Icons.Star],
  ];

  const brand = BRAND;

  const ctaPrimaryStyle = {
    background: `linear-gradient(135deg, ${brand.orange}, #ff9e40)`,
  };

  const ctaSecondaryStyle = {
    borderColor: `${brand.navy}20`,
  };

  const sectionInset = "mx-auto max-w-7xl px-6";

  const navItems = useMemo(
    () => [
      { href: "#home", label: "Home", id: "home" },
      { href: "#services", label: "Services", id: "services" },
      { href: "#framework", label: "Framework", id: "framework" },
      { href: "#case-studies", label: "Case Studies", id: "case-studies" },
      { href: "#blogs", label: "Blogs", id: "blogs" },
      { href: "#contact", label: "Contact", id: "contact" },
    ],
    [],
  );

  const sectionIds = useMemo(() => navItems.map((n) => n.id), [navItems]);
  const scrolled = useScrolled(32);
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [activeCaseStudyIndex, setActiveCaseStudyIndex] = useState(0);

  // Lock body scroll when mobile nav or case studies popup is open
  useEffect(() => {
    const shouldLockScroll = mobileOpen || caseStudiesOpen;
    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousHtmlOverflow = htmlStyle.overflow;

    if (shouldLockScroll) {
      bodyStyle.overflow = "hidden";
      htmlStyle.overflow = "hidden";
    } else {
      bodyStyle.overflow = "";
      htmlStyle.overflow = "";
    }

    return () => {
      bodyStyle.overflow = previousBodyOverflow;
      htmlStyle.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen, caseStudiesOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeCaseStudies = useCallback(() => setCaseStudiesOpen(false), []);

  const openCaseStudies = useCallback(
    (index = 0) => {
      const safeIndex = Math.max(0, Math.min(index, caseStudies.length - 1));
      setMobileOpen(false);
      setActiveCaseStudyIndex(safeIndex);
      setCaseStudiesOpen(true);
    },
    [caseStudies.length],
  );

  return (
    <div
      className="site-shell min-h-screen"
      style={{ backgroundColor: brand.soft, color: brand.dark }}
    >
      {/* ─── Sticky header ─── */}
      <header
        className={`nav-header ${scrolled ? "nav-header--scrolled" : ""}`}
      >
        <div className="nav-shell mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <a href="#home" className="nav-logo" aria-label="Scalix home">
            <img
              src={combinedLogo}
              alt="Scalix Marketing Solutions"
              className="nav-logo-img"
              loading="eager"
            />
          </a>

          {/* Desktop nav links */}
          <nav
            aria-label="Primary"
            className="nav-core hidden items-center lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`nav-link ${activeSection === item.id ? "nav-link--active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="nav-cta btn-press shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
              style={ctaPrimaryStyle}
            >
              <span className="hidden sm:inline">Get Free PPC Audit</span>
              <span className="sm:hidden">Get Free PPC Audit</span>
            </a>
            <button
              type="button"
              className="nav-hamburger lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile overlay ─── */}
      <div
        className={`mobile-backdrop ${mobileOpen ? "mobile-backdrop--visible" : ""}`}
        onClick={closeMobile}
        aria-hidden
      />
      <nav
        className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-inner">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`mobile-link ${activeSection === item.id ? "mobile-link--active" : ""}`}
              onClick={closeMobile}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 border-t border-slate-200 pt-4">
            <a
              href="#contact"
              className="btn-press block rounded-xl px-6 py-3 text-center font-semibold text-white shadow-lg"
              style={ctaPrimaryStyle}
              onClick={closeMobile}
            >
              Get Free PPC Audit
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ═══ HERO ═══ */}
        <section
          id="home"
          className="reveal reveal-delay-1 relative overflow-x-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(242,140,34,0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(11,74,125,0.12), transparent 30%)",
            }}
          />
          <div
            className={`${sectionInset} relative grid gap-12 pt-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pt-8 lg:pb-28`}
          >
            <div>
              <SectionLabel>Premium Amazon PPC Positioning</SectionLabel>
              <h1
                className="max-w-3xl text-5xl font-extrabold leading-[1.12] tracking-tight md:text-7xl"
                style={{ color: brand.navy }}
              >
                We build profit Architecture for Amazon.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Scalix designs structured Amazon growth systems that turn
                unstable ads into predictable revenue engines. We help Amazon
                brands move from messy campaigns and random optimization to
                structured PPC systems built for cleaner traffic, stronger
                control, and more profitable growth.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="nav-cta btn-press inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
                  style={ctaPrimaryStyle}
                >
                  Get Free PPC Audit
                  <span className="icon-wrap" style={{ width: 18, height: 18 }}>
                    <Icons.ArrowRight />
                  </span>
                </a>
                <a
                  href="#case-studies"
                  className="btn-press inline-flex items-center gap-2 rounded-2xl border px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                  style={ctaSecondaryStyle}
                >
                  View Case Studies
                  <span className="icon-wrap" style={{ width: 16, height: 16 }}>
                    <Icons.ArrowUpRight />
                  </span>
                </a>
                <a
                  href="#" // Replace with tel:... later
                  className="bubble-strategy-call inline-flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #0B4A7D 60%, #2DB6D9 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>
                    Book a Strategy Call
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.35) 10%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.08) 100%)",
                      opacity: 0.85,
                      borderRadius: "1rem",
                      pointerEvents: "none",
                      boxShadow: "0 2px 16px 0 rgba(45,182,217,0.10)",
                    }}
                  />
                </a>
              </div>
              <div
                className="mt-8 inline-flex max-w-2xl items-center gap-3 rounded-2xl border bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
                style={{ borderColor: "rgba(11,74,125,0.16)" }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/90 p-1">
                  <img
                    src={scalixVisualmark}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Official Scalix visual identity integrated across your premium
                  PPC positioning.
                </span>
              </div>
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                {heroFeatures.map(([title, desc, Icon]) => (
                  <div
                    key={title}
                    className="lift-card rounded-[1.5rem] border bg-white p-4 shadow-sm"
                    style={{ borderColor: "rgba(148,163,184,0.18)" }}
                  >
                    <div className="mb-3 icon-wrap icon-hero-feature">
                      <Icon />
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: brand.navy }}
                    >
                      {title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ── Premium Hero Image Card ── */}
            <div
              className="hero-card-wrapper relative z-10 min-w-0 w-full max-w-[42rem] justify-self-center lg:max-w-[46rem] lg:justify-self-end"
            >
              {/* Animated gradient border container */}
              <div className="hero-card-border">
                <div className="hero-card-inner">
                  <img
                    src={heroBannerImage}
                    alt="Scalix hero banner"
                    className="h-full w-full rounded-[1.25rem] object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Floating visualmark badge */}
              <div className="pointer-events-none absolute right-2 top-2 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-md sm:-right-3 sm:-top-3 sm:h-16 sm:w-16">
                <img
                  src={scalixVisualmark}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                />
              </div>
              {/* Floating accent dots */}
              <div
                className="pointer-events-none absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-full float-anim sm:block"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,140,34,0.25), transparent 70%)",
                  animationDelay: "0.5s",
                }}
              />
              <div
                className="pointer-events-none absolute -right-6 top-1/3 hidden h-16 w-16 rounded-full float-anim lg:block"
                style={{
                  background:
                    "radial-gradient(circle, rgba(11,74,125,0.2), transparent 70%)",
                  animationDelay: "1.5s",
                }}
              />
              <div className="mt-8 w-full max-w-full">
                <div
                  className="critical-insight-card rounded-2xl border p-5 shadow-lg sm:p-6"
                  style={{
                    borderColor: `${brand.orange}35`,
                    background:
                      "linear-gradient(135deg, rgba(242,140,34,0.08), rgba(11,74,125,0.05))",
                  }}
                >
                  {/* Label */}
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${brand.orange}15`,
                      color: brand.orange,
                    }}
                  >
                    Critical Insight
                  </div>

                  {/* Headline */}
                  <h2
                    className="text-xl font-black leading-tight sm:text-2xl md:text-3xl"
                    style={{ color: brand.navy }}
                  >
                    Why Most Amazon Brands Fail ?
                  </h2>

                  {/* Divider */}
                  <div
                    className="mb-4 mt-4 h-[2px] w-16 rounded-full"
                    style={{ background: brand.orange }}
                  />

                  {/* Content */}
                  <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    Most Amazon brands don’t fail because of bad products.
                  </p>

                  <p className="mt-2 text-base font-semibold leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    They fail because of poor campaign structure.
                  </p>

                  {/* Punchline */}
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Random targeting. Messy segmentation. No intent control.
                    <br />
                    That’s where profitability silently breaks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══ WHO WE ARE ═══ */}
        <section
          className={`${sectionInset} reveal reveal-delay-2 grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}
        >
          <div>
            <PlaceholderImage
              premium
              showVisualmark
              label="Founder authority section image: polished portrait or strategy consultation visual. This should eventually be replaced with your real photo for premium trust."
            />
          </div>
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2
              className="max-w-2xl text-4xl font-black leading-tight md:text-5xl"
              style={{ color: brand.navy }}
            >
              Not just another marketing agency. A specialist Amazon PPC growth
              partner.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Scalix is built around one core belief: Amazon advertising works
              best when structure comes before scaling. That means cleaner
              campaign architecture, sharper intent segmentation, better budget
              control, and more disciplined optimization decisions.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              We focus on strategic clarity over flashy noise so every campaign
              decision supports long-term profitability and trust with serious
              e-commerce teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="btn-press inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                style={{ backgroundColor: brand.navy }}
              >
                <span className="icon-wrap" style={{ width: 18, height: 18 }}>
                  <Icons.User />
                </span>
                Meet the Founder
              </button>
            </div>
          </div>
        </section>

        {/* ═══ MISSION ═══ */}
        <section className="reveal reveal-delay-3 border-y border-slate-200 bg-white">
          <div
            className={`${sectionInset} grid gap-12 py-20 lg:grid-cols-2 lg:items-center`}
          >
            <div>
              <SectionLabel>Our Mission</SectionLabel>
              <h2
                className="text-4xl font-black leading-tight md:text-5xl"
                style={{ color: brand.navy }}
              >
                Turn Amazon advertising into a predictable profit system.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We help brands move away from random decisions and into
                structured execution built on intent, margin logic, and scalable
                operating discipline.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {missionItems.map(([item, Icon]) => (
                  <div
                    key={item}
                    className="lift-card flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
                    style={{ borderColor: "rgba(148,163,184,0.16)" }}
                  >
                    <span className="icon-wrap icon-check">
                      <Icon />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <PlaceholderImage
              premium
              showVisualmark
              label="Premium dashboard visual: half-cut Amazon PPC analytics interface with ACOS, ROAS, CTR, CPC, purchase and sales blocks in a premium layout."
              imageSrc={missionImage}
              imageAlt="Amazon PPC analytics dashboard"
              heightClass="h-96 md:h-[30rem] lg:h-[34rem]"
            />
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══ SERVICES ═══ */}
        <section
          id="services"
          className={`${sectionInset} reveal reveal-delay-1 py-20`}
        >
          <div className="mb-14 max-w-3xl">
            <SectionLabel>Core Systems</SectionLabel>
            <h2
              className="text-4xl font-black leading-tight md:text-5xl"
              style={{ color: brand.navy }}
            >
              THE SCALIX FRAMEWORK
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our 4-layer Scalix is a profit-architecture system built on
              intent, margin, control, and positioning. It brings clarity to
              campaigns, protects profitability, and turns advertising into a
              scalable growth system.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="lift-card group rounded-[2rem] border bg-white p-6 shadow-xl shadow-slate-200/60"
                style={{ borderColor: "rgba(148,163,184,0.18)" }}
              >
                <div className="mb-5">
                  <PlaceholderImage
                    premium
                    label={`Premium service card visual: ${service.title}`}
                  />
                </div>
                <div className="mb-4 icon-wrap icon-bubble">
                  <service.icon />
                </div>
                <div
                  className="text-2xl font-black"
                  style={{ color: brand.navy }}
                >
                  {service.title}
                </div>
                <p className="mt-4 leading-8 text-slate-600">{service.desc}</p>
                <div
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: brand.orange }}
                >
                  Framework-led execution
                  <span
                    className="icon-wrap transition-transform group-hover:translate-x-1"
                    style={{ width: 14, height: 14 }}
                  >
                    <Icons.ArrowRight />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FRAMEWORK ═══ */}
        <section
          id="framework"
          className={`${sectionInset} reveal reveal-delay-2 py-20`}
        >
          <div
            className="relative overflow-hidden rounded-[2.25rem] border p-10 shadow-2xl md:p-14"
            style={{
              borderColor: `${brand.orange}22`,
              background:
                "linear-gradient(135deg, rgba(11,74,125,0.95), rgba(8,23,36,0.98) 58%, rgba(242,140,34,0.16))",
            }}
          >
            <img
              src={scalixVisualmark}
              alt=""
              aria-hidden="true"
              className="float-anim pointer-events-none absolute -right-16 -top-16 h-64 w-64 rotate-[-12deg] opacity-[0.16]"
            />
            <img
              src={scalixVisualmark}
              alt=""
              aria-hidden="true"
              className="float-anim pointer-events-none absolute -bottom-14 -left-14 h-40 w-40 opacity-[0.12]"
              style={{ animationDelay: "3s" }}
            />
            <div className="mb-14 max-w-3xl">
              <SectionLabel>The Scalix Framework</SectionLabel>
              <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
                A cleaner 4-layer operating model for smarter Amazon PPC growth.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                The framework turns ad activity into a repeatable operating
                system, from discovery to high-intent profitability.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {framework.map((item, index) => (
                <div
                  key={item.title}
                  className="lift-card rounded-[2rem] border p-6"
                  style={{
                    borderColor:
                      index % 2 === 0
                        ? "rgba(242,140,34,0.28)"
                        : "rgba(255,255,255,0.14)",
                    background:
                      index % 2 === 0
                        ? "linear-gradient(180deg, rgba(242,140,34,0.12), rgba(255,255,255,0.03))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="mb-4 icon-wrap icon-layer">
                    <item.icon />
                  </div>
                  <div
                    className="text-xs font-semibold uppercase tracking-[0.28em]"
                    style={{ color: brand.orange }}
                  >
                    Layer 0{index + 1}
                  </div>
                  <div className="mt-3 text-2xl font-black text-white">
                    {item.title}
                  </div>
                  <p className="mt-4 leading-8 text-slate-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══ CASE STUDIES ═══ */}
        <section
          id="case-studies"
          className={`${sectionInset} reveal reveal-delay-3 py-20`}
        >
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <SectionLabel>Case Studies</SectionLabel>
              <h2
                className="text-4xl font-black leading-tight md:text-5xl"
                style={{ color: brand.navy }}
              >
                Proof that structure changes performance.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Each case study is positioned as an operating shift, showing how
                better campaign architecture can improve efficiency and control.
              </p>
            </div>
            <button
              type="button"
              className="btn-press inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition hover:bg-white"
              style={{ borderColor: `${brand.navy}33`, color: brand.navy }}
              onClick={() => openCaseStudies(0)}
              aria-haspopup="dialog"
              aria-controls="case-studies-popup"
            >
              View Full Case Studies
              <span className="icon-wrap" style={{ width: 16, height: 16 }}>
                <Icons.ArrowUpRight />
              </span>
            </button>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className="case-study-card-trigger lift-card group w-full rounded-[2rem] border bg-white p-6 text-left shadow-xl shadow-slate-200/60"
                style={{ borderColor: "rgba(148,163,184,0.18)" }}
                onClick={() => openCaseStudies(index)}
                aria-label={`Open full case study: ${item.title}`}
                aria-haspopup="dialog"
                aria-controls="case-studies-popup"
              >
                <div className="mb-5">
                  <PlaceholderImage
                    premium
                    label={`Premium case study placeholder: ${item.title}`}
                    imageSrc={item.image}
                    imageAlt={`${item.title} case study visual`}
                  />
                </div>
                <div
                  className="mb-3 icon-wrap icon-bubble"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(11,74,125,0.08), rgba(45,182,217,0.06))",
                    borderColor: "rgba(11,74,125,0.12)",
                    color: brand.navy,
                  }}
                >
                  <Icons.BarChart />
                </div>
                <div
                  className="text-sm font-semibold uppercase tracking-[0.22em]"
                  style={{ color: brand.orange }}
                >
                  {item.stat}
                </div>
                <div
                  className="mt-3 text-2xl font-black"
                  style={{ color: brand.navy }}
                >
                  {item.title}
                </div>
                <p className="mt-4 leading-8 text-slate-600">{item.desc}</p>
                <div
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-slate-900"
                  style={{ color: brand.navy }}
                >
                  Open full case
                  <span
                    className="icon-wrap transition-transform group-hover:translate-x-1"
                    style={{ width: 14, height: 14 }}
                  >
                    <Icons.ArrowRight />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ═══ FOUNDER AUTHORITY ═══ */}
        <section className="reveal reveal-delay-1 border-y border-slate-200 bg-white">
          <div
            className={`${sectionInset} grid gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center`}
          >
            <div>
              <SectionLabel>Founder Authority</SectionLabel>
              <h2
                className="text-4xl font-black leading-tight md:text-5xl"
                style={{ color: brand.navy }}
              >
                Premium websites sell trust fast. Founder-led brands do this
                better.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Add your real photo, credentials, Amazon Ads certifications, and
                a short founder note here. This single section can make your
                site feel dramatically more credible than a standard agency
                template.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {founderFeatures.map(([item, Icon]) => (
                  <div
                    key={item}
                    className="lift-card flex items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-medium text-slate-700"
                    style={{
                      borderColor: "rgba(148,163,184,0.16)",
                      backgroundColor: "rgba(248,250,252,0.9)",
                    }}
                  >
                    <span className="icon-wrap icon-feature">
                      <Icon />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <PlaceholderImage
              premium
              tall
              showVisualmark
              label="Founder section placeholder: premium portrait or desk shot with laptop, dashboards, and structured brand styling. Replace with your real photo in final build."
            />
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══ BLOGS ═══ */}
        <section
          id="blogs"
          className={`${sectionInset} reveal reveal-delay-2 py-20`}
        >
          <div className="mb-14 max-w-3xl">
            <SectionLabel>SEO Content Engine</SectionLabel>
            <h2
              className="text-4xl font-black leading-tight md:text-5xl"
              style={{ color: brand.navy }}
            >
              Blog topics that build authority and pull the right traffic.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              These topics are positioned for Amazon PPC intent, service
              discovery, and long-term search visibility.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog, i) => (
              <div
                key={blog}
                className="lift-card group rounded-[2rem] border bg-white p-6 shadow-lg shadow-slate-200/50"
                style={{ borderColor: "rgba(148,163,184,0.18)" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="icon-wrap icon-blog">
                    <Icons.FileText />
                  </div>
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: `${brand.orange}25`,
                      color: brand.orange,
                      backgroundColor: `${brand.orange}08`,
                    }}
                  >
                    Article {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="text-sm font-semibold uppercase tracking-[0.22em]"
                  style={{ color: brand.orange }}
                >
                  SEO Blog
                </div>
                <div
                  className="mt-3 text-xl font-black leading-8"
                  style={{ color: brand.navy }}
                >
                  {blog}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Built to support backend SEO, internal linking, trust, and
                  premium topical authority in the Amazon advertising niche.
                </p>
                <div
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: brand.navy }}
                >
                  Read more
                  <span
                    className="icon-wrap transition-transform group-hover:translate-x-1"
                    style={{ width: 14, height: 14 }}
                  >
                    <Icons.ArrowRight />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section
          id="contact"
          className={`${sectionInset} reveal reveal-delay-3 pb-24`}
        >
          <div
            className="relative overflow-hidden rounded-[2.25rem] border p-10 shadow-2xl md:p-14"
            style={{
              borderColor: `${brand.orange}22`,
              background:
                "linear-gradient(135deg, rgba(11,74,125,0.95), rgba(8,23,36,0.98) 58%, rgba(242,140,34,0.16))",
            }}
          >
            <img
              src={scalixVisualmark}
              alt=""
              aria-hidden="true"
              className="float-anim pointer-events-none absolute -right-20 -bottom-16 h-72 w-72 opacity-[0.16]"
            />
            <div className="max-w-3xl">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
                Ready to turn your Amazon PPC into a cleaner, more profitable
                system?
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-200">
                Use this as your premium conversion block to move qualified
                visitors into strategic conversations quickly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="btn-press inline-flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
                  style={ctaPrimaryStyle}
                >
                  <span className="icon-wrap" style={{ width: 18, height: 18 }}>
                    <Icons.Mail />
                  </span>
                  Get Free PPC Audit
                </button>
                <button
                  type="button"
                  className="btn-press inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/5"
                >
                  <span className="icon-wrap" style={{ width: 18, height: 18 }}>
                    <Icons.Phone />
                  </span>
                  Book Strategy Call
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`case-studies-modal-layer ${caseStudiesOpen ? "case-studies-modal-layer--open" : ""}`}
        aria-hidden={!caseStudiesOpen}
      >
        <div className="case-studies-modal-backdrop" aria-hidden="true" />
        <section
          id="case-studies-popup"
          className="case-studies-modal-shell"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-studies-detailed-heading"
        >
          <button
            type="button"
            className="case-studies-close-button"
            onClick={closeCaseStudies}
            aria-label="Close case studies"
          >
            <span className="icon-wrap" style={{ width: 18, height: 18 }}>
              <Icons.X />
            </span>
          </button>

          <CaseStudiesDetailed
            studies={caseStudies}
            activeStudyId={
              caseStudies[
                Math.max(0, Math.min(activeCaseStudyIndex, caseStudies.length - 1))
              ]?.id
            }
            onActiveStudyChange={(studyId) => {
              const matchIndex = caseStudies.findIndex(
                (study) => study.id === studyId,
              );
              if (matchIndex >= 0) setActiveCaseStudyIndex(matchIndex);
            }}
          />
        </section>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
          <div>
            <LogoMark compact />
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Premium website shell aligned to your colors, founder-led
              positioning, and higher-ticket Amazon PPC authority.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                className="icon-wrap icon-social"
                aria-label="LinkedIn"
              >
                <Icons.Linkedin />
              </a>
              <a
                href="#"
                className="icon-wrap icon-social"
                aria-label="Twitter"
              >
                <Icons.Twitter />
              </a>
              <a
                href="#"
                className="icon-wrap icon-social"
                aria-label="Instagram"
              >
                <Icons.Instagram />
              </a>
              <a
                href="#"
                className="icon-wrap icon-social"
                aria-label="Website"
              >
                <Icons.Globe />
              </a>
            </div>
          </div>
          <div>
            <div className="font-bold" style={{ color: brand.navy }}>
              Pages
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <div className="footer-link">Home</div>
              <div className="footer-link">Services</div>
              <div className="footer-link">Framework</div>
              <div className="footer-link">Case Studies</div>
              <div className="footer-link">Blogs</div>
              <div className="footer-link">Contact</div>
            </div>
          </div>
          <div>
            <div className="font-bold" style={{ color: brand.navy }}>
              Premium Additions
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <div className="footer-link">Founder authority block</div>
              <div className="footer-link">Framework positioning</div>
              <div className="footer-link">Premium CTA styling</div>
              <div className="footer-link">Higher-trust section flow</div>
            </div>
          </div>
          <div>
            <div className="font-bold" style={{ color: brand.navy }}>
              Backend SEO Focus
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <div className="footer-link">Keyword-led blog topics</div>
              <div className="footer-link">Title and meta structure</div>
              <div className="footer-link">Internal linking paths</div>
              <div className="footer-link">Authority content architecture</div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="footer-bottom">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Scalix Marketing Solutions. All
              rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <div
                className="inline-flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-1.5"
                style={{ borderColor: "rgba(11,74,125,0.14)" }}
              >
                <img
                  src={scalixVisualmark}
                  alt="Scalix visualmark"
                  className="h-5 w-5 object-contain"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Official Visualmark
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
