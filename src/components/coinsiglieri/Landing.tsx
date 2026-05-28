import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Database,
  Eye,
  FileSearch,
  Filter,
  Flame,
  Gauge,
  Lock,
  Mail,
  Moon,
  Radar,
  Scale,
  Search,
  ShieldCheck,
  Signal,
  Sparkles,
  Sun,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Radar as ReRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* ----------------------------- Brand helpers ----------------------------- */

function BrandWord({
  word,
  zeroColor,
  className,
}: {
  word: string;
  zeroColor: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {word.split("").map((ch, i) =>
        ch === "0" ? (
          <span key={i} style={{ color: zeroColor }}>
            0
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}

const Tagline = ({ className = "" }: { className?: string }) => (
  <span className={`cs-tagline ${className}`}>
    ALL SIGNAL. <span style={{ color: "#18b4d4" }}>0</span> GUESS.
  </span>
);

/* ------------------------------- Floats --------------------------------- */

function FloatingDots({ count = 26 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        dur: 5 + Math.random() * 6,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? "#18b4d4" : "#10b981",
      })),
    [count],
  );
  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((d, i) => (
        <span
          key={i}
          className="cs-float-dot"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Nav ---------------------------------- */

const NAV_SECTIONS = [
  { id: "products", label: "Products" },
  { id: "compare", label: "Compare" },
  { id: "methodology", label: "Methodology" },
  { id: "signal", label: "Signal" },
  { id: "advertise", label: "Advertise" },
];

function Nav({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{
        background: scrolled ? "rgba(8,11,22,0.72)" : "transparent",
        borderBottom: scrolled ? "0.5px solid var(--cs-line)" : "0.5px solid transparent",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div
            className="relative grid place-items-center"
            style={{
              width: 28,
              height: 28,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(24,180,212,0.18))",
              border: "0.5px solid var(--cs-line-strong)",
            }}
          >
            <Signal size={14} color="#10b981" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">CoinSiglieri</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px]">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`cs-nav-link cs-link-soft ${active === s.id ? "active" : ""}`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="cs-btn-outline !p-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a
            href="#products"
            className="cs-btn-primary !py-2 !px-3 hidden sm:inline-flex"
          >
            Explore <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section
      id="top"
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="cs-hero-mesh cs-glow-pulse" />
      <div className="cs-grid-overlay" />
      <FloatingDots />

      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-7xl px-5 md:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 cs-pill cs-pill-live mb-6"
        >
          <span className="cs-pulse-dot" />
          <span>Live · v1.0 · Public beta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="cs-h1 text-[44px] sm:text-[64px] md:text-[84px] leading-[0.98] max-w-5xl mx-auto"
        >
          Crypto intelligence,{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #10b981 0%, #18b4d4 60%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            scored.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-6 max-w-2xl mx-auto text-[15px] md:text-[17px] leading-relaxed"
          style={{ color: "var(--cs-text-dim)" }}
        >
          Independent scoring of exchanges, products and placements — built on
          public, auditable data. No paid rankings. No vibes. Just numbers you can
          re-derive yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href="#products" className="cs-btn-primary">
            See the scores <ArrowRight size={14} />
          </a>
          <a href="#methodology" className="cs-btn-outline">
            Read methodology <FileSearch size={14} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10"
        >
          <Tagline />
        </motion.div>
      </motion.div>

      {/* Hero preview card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mt-16 mx-auto max-w-5xl px-5 md:px-8"
      >
        <HeroPreviewCard />
      </motion.div>
    </section>
  );
}

function HeroPreviewCard() {
  const data = [
    { k: "Liquidity", v: 96 },
    { k: "Custody", v: 92 },
    { k: "Compliance", v: 95 },
    { k: "Transparency", v: 90 },
    { k: "Product depth", v: 94 },
    { k: "Track record", v: 93 },
  ];
  return (
    <div
      className="cs-card relative overflow-hidden"
      style={{
        boxShadow:
          "0 30px 80px -30px rgba(16,185,129,0.35), 0 1px 0 rgba(255,255,255,0.04) inset",
      }}
    >
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="p-6 md:p-8 cs-border-b md:!border-b-0 md:border-r md:border-r-[0.5px] md:border-r-[var(--cs-line)] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="cs-pill cs-pill-featured">
                <Trophy size={11} /> Featured
              </span>
              <span className="cs-pill">
                <ShieldCheck size={11} /> MiCAR Licensed
              </span>
            </div>
            <span className="cs-mono text-[11px]" style={{ color: "var(--cs-text-dim)" }}>
              EXCH-001
            </span>
          </div>

          <div className="mt-5 flex items-end gap-4">
            <div
              className="cs-score-ring"
              style={
                { ["--p" as any]: 94, width: 96, height: 96 } as React.CSSProperties
              }
            >
              <div style={{ width: 78, height: 78 }}>
                <div className="text-center">
                  <div className="cs-mono text-[24px] font-semibold leading-none">
                    94
                  </div>
                  <div
                    className="cs-mono text-[10px] mt-0.5"
                    style={{ color: "var(--cs-text-dim)" }}
                  >
                    /100
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-tight">Bybit</div>
              <div
                className="text-[13px] mt-0.5"
                style={{ color: "var(--cs-text-dim)" }}
              >
                Tier-1 exchange · EU regulated · Spot, Perps, Options
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Liquidity A+", "PoR monthly", "Insurance fund", "EU MiCAR"].map(
                  (t) => (
                    <span key={t} className="cs-pill">
                      <CheckCircle2 size={11} color="#10b981" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "24h Vol", v: "$12.4B", k: "+8.2%" },
              { l: "Spread BTC", v: "0.6bps", k: "tight" },
              { l: "Uptime 90d", v: "99.98%", k: "stable" },
            ].map((s) => (
              <div key={s.l} className="cs-border cs-radius p-3">
                <div
                  className="text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--cs-text-dim)" }}
                >
                  {s.l}
                </div>
                <div className="cs-mono text-[16px] mt-1">{s.v}</div>
                <div className="text-[11px]" style={{ color: "#10b981" }}>
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] cs-mono" style={{ color: "var(--cs-text-dim)" }}>
              SCORE BREAKDOWN
            </div>
            <div className="cs-pill cs-pill-live">
              <span className="cs-pulse-dot" />
              Live data
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="78%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="k"
                  tick={{ fill: "#8a93a8", fontSize: 11 }}
                />
                <ReRadar
                  dataKey="v"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.22}
                  strokeWidth={1.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Stats bar ------------------------------- */

function StatsBar() {
  const items = [
    { k: "Exchanges scored", v: "47" },
    { k: "Data points / day", v: "1.2M" },
    { k: "Independent signals", v: "18" },
    { k: "Paid placements", v: "0" },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="cs-border-t cs-border-b grid grid-cols-2 md:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.k}
              className={`py-7 md:py-9 px-2 ${
                i !== items.length - 1
                  ? "md:border-r md:border-r-[0.5px] md:border-r-[var(--cs-line)]"
                  : ""
              } ${
                i < 2 ? "border-b md:border-b-0 border-b-[0.5px] border-b-[var(--cs-line)]" : ""
              }`}
            >
              <div
                className="cs-mono text-[32px] md:text-[44px] font-semibold tracking-tight"
                style={{
                  background:
                    "linear-gradient(180deg, #fff, rgba(255,255,255,0.55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {it.v}
              </div>
              <div
                className="text-[12px] mt-1 uppercase tracking-[0.14em]"
                style={{ color: "var(--cs-text-dim)" }}
              >
                {it.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Products ------------------------------- */

const PRODUCTS = [
  {
    name: "Exchange Scores",
    status: "LIVE",
    icon: Gauge,
    desc: "47 venues scored on 18 weighted signals: liquidity, PoR, custody, compliance, uptime, spreads.",
    metric: "47 exchanges",
  },
  {
    name: "Compare",
    status: "LIVE",
    icon: Scale,
    desc: "Side-by-side venue comparison with fee tables, supported assets, and regulatory footprint.",
    metric: "Up to 4 at once",
  },
  {
    name: "Placement Index",
    status: "LIVE",
    icon: BarChart3,
    desc: "Track where exchanges are ranked on which sites, and who's paying for placement.",
    metric: "1,400+ placements",
  },
  {
    name: (
      <BrandWord word="Ax0n" zeroColor="#D4A853" className="font-semibold" />
    ),
    status: "IN DEV",
    icon: Sparkles,
    desc: "AI research agent that explains the score, flags anomalies, and answers in plain English.",
    metric: "Q3 2026",
  },
  {
    name: "Signal Feed",
    status: "LIVE",
    icon: Radar,
    desc: "Real-time alerts on score deltas, PoR updates, outages, and regulatory events.",
    metric: "8.1k subscribers",
  },
  {
    name: (
      <BrandWord word="C0insiglieri API" zeroColor="#18b4d4" className="font-semibold" />
    ),
    status: "IN DEV",
    icon: Database,
    desc: "Read-only API for the full score graph, breakdowns, history and signals.",
    metric: "Q4 2026",
  },
] as const;

function Products() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Products"
          title="Six surfaces. One source of truth."
          subtitle="Every product runs on the same score graph — same weights, same inputs, same audit trail."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="cs-card p-6 relative group overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div
                  className="grid place-items-center cs-radius"
                  style={{
                    width: 36,
                    height: 36,
                    border: "0.5px solid var(--cs-line-strong)",
                    background: "rgba(16,185,129,0.06)",
                  }}
                >
                  <p.icon size={16} color="#10b981" />
                </div>
                <span
                  className={
                    p.status === "LIVE" ? "cs-pill cs-pill-live" : "cs-pill cs-pill-dev"
                  }
                >
                  {p.status === "LIVE" && <span className="cs-pulse-dot" />}
                  {p.status}
                </span>
              </div>
              <div className="mt-5 text-[17px] font-semibold tracking-tight">
                {p.name}
              </div>
              <div
                className="mt-2 text-[13.5px] leading-relaxed"
                style={{ color: "var(--cs-text-dim)" }}
              >
                {p.desc}
              </div>
              <div className="mt-5 flex items-center justify-between cs-border-t pt-4">
                <span
                  className="cs-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--cs-text-dim)" }}
                >
                  {p.metric}
                </span>
                <ArrowUpRight
                  size={14}
                  className="opacity-50 group-hover:opacity-100 transition"
                />
              </div>

              <div
                className="absolute -inset-px cs-radius opacity-0 group-hover:opacity-100 transition pointer-events-none"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% -10%, rgba(16,185,129,0.12), transparent 60%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Compare preview --------------------------- */

const ALL_EXCHANGES = [
  {
    name: "Bybit",
    score: 94,
    tier: "Tier 1",
    region: "Global",
    vol: "$12.4B",
    spread: "0.6bps",
    por: "Monthly",
    badge: "FEATURED",
    licensed: true,
  },
  { name: "Kraken", score: 91, tier: "Tier 1", region: "US/EU", vol: "$2.1B", spread: "0.8bps", por: "Bi-annual", licensed: true },
  { name: "Coinbase", score: 90, tier: "Tier 1", region: "US", vol: "$4.8B", spread: "0.7bps", por: "Quarterly", licensed: true },
  { name: "Binance", score: 88, tier: "Tier 1", region: "Global", vol: "$22.6B", spread: "0.4bps", por: "Monthly", licensed: false },
  { name: "OKX", score: 86, tier: "Tier 1", region: "Global", vol: "$6.3B", spread: "0.5bps", por: "Monthly", licensed: false },
  { name: "Bitstamp", score: 84, tier: "Tier 2", region: "EU", vol: "$0.3B", spread: "1.1bps", por: "Quarterly", licensed: true },
  { name: "Gemini", score: 82, tier: "Tier 2", region: "US", vol: "$0.4B", spread: "1.0bps", por: "Quarterly", licensed: true },
  { name: "Bitfinex", score: 79, tier: "Tier 2", region: "Global", vol: "$0.6B", spread: "0.9bps", por: "Annual", licensed: false },
] as const;

function ComparePreview() {
  const [tab, setTab] = useState<"all" | "eu" | "tier1" | "por">("all");
  const filtered = useMemo(() => {
    const r = ALL_EXCHANGES.filter((e) => {
      if (tab === "eu") return e.region.includes("EU");
      if (tab === "tier1") return e.tier === "Tier 1";
      if (tab === "por") return e.por === "Monthly";
      return true;
    });
    // Bybit always featured & on top
    return r.sort((a, b) => (a.name === "Bybit" ? -1 : b.name === "Bybit" ? 1 : b.score - a.score));
  }, [tab]);

  const tabs = [
    { id: "all", label: "All venues" },
    { id: "tier1", label: "Tier 1 only" },
    { id: "eu", label: "EU regulated" },
    { id: "por", label: "Monthly PoR" },
  ] as const;

  return (
    <section id="compare" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(24,180,212,0.07), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="Compare"
          title="The leaderboard nobody paid to be on."
          subtitle="Filter by tier, region or proof-of-reserves cadence. Featured slot is editorial, not commercial."
        />

        <div className="mt-10 cs-card overflow-hidden">
          <div className="flex items-center gap-2 p-3 cs-border-b cs-no-scrollbar overflow-x-auto">
            <Filter size={14} className="ml-1" style={{ color: "var(--cs-text-dim)" }} />
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="cs-radius px-3 py-1.5 text-[12.5px] whitespace-nowrap transition"
                style={{
                  border: "0.5px solid",
                  borderColor: tab === t.id ? "var(--cs-emerald)" : "var(--cs-line)",
                  background:
                    tab === t.id ? "rgba(16,185,129,0.1)" : "transparent",
                  color: tab === t.id ? "var(--cs-text)" : "var(--cs-text-dim)",
                }}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto hidden sm:flex items-center gap-2 pr-2">
              <Search size={14} style={{ color: "var(--cs-text-dim)" }} />
              <span
                className="cs-mono text-[11px]"
                style={{ color: "var(--cs-text-dim)" }}
              >
                {filtered.length} venues
              </span>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.6fr] gap-2 px-5 py-3 cs-border-b text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--cs-text-dim)" }}>
            <div>Exchange</div>
            <div>Score</div>
            <div>Tier</div>
            <div>Region</div>
            <div>24h Vol</div>
            <div>BTC spread</div>
            <div>PoR</div>
          </div>

          <div>
            {filtered.map((e, i) => {
              const isBybit = e.name === "Bybit";
              return (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="grid grid-cols-2 md:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.6fr] gap-2 items-center px-5 py-4 cs-border-b text-[13.5px] relative"
                  style={{
                    background: isBybit
                      ? "linear-gradient(90deg, rgba(24,180,212,0.06), transparent)"
                      : "transparent",
                  }}
                >
                  <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                    <div
                      className="grid place-items-center cs-radius cs-mono text-[12px] font-semibold"
                      style={{
                        width: 28,
                        height: 28,
                        background: isBybit
                          ? "rgba(24,180,212,0.12)"
                          : "rgba(255,255,255,0.04)",
                        border: "0.5px solid var(--cs-line)",
                        color: isBybit ? "#18b4d4" : "var(--cs-text-dim)",
                      }}
                    >
                      {e.name.slice(0, 2)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{e.name}</span>
                      <span className="flex gap-1 mt-0.5">
                        {isBybit && (
                          <span className="cs-pill cs-pill-featured !py-0">
                            <Trophy size={9} /> Featured
                          </span>
                        )}
                        {e.licensed && (
                          <span className="cs-pill !py-0">
                            <ShieldCheck size={9} color="#10b981" /> MiCAR
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 cs-radius flex-1 max-w-[80px] overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${e.score}%`,
                          background:
                            "linear-gradient(90deg,#18b4d4,#10b981)",
                        }}
                      />
                    </div>
                    <span className="cs-mono font-semibold">{e.score}</span>
                  </div>
                  <div className="cs-mono text-[12px]" style={{ color: "var(--cs-text-dim)" }}>{e.tier}</div>
                  <div className="text-[12.5px]" style={{ color: "var(--cs-text-dim)" }}>{e.region}</div>
                  <div className="cs-mono">{e.vol}</div>
                  <div className="cs-mono">{e.spread}</div>
                  <div className="cs-mono text-[12px]" style={{ color: "var(--cs-text-dim)" }}>{e.por}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-4 flex items-center justify-between">
            <span className="cs-mono text-[11px]" style={{ color: "var(--cs-text-dim)" }}>
              Last updated 2m ago · Source: on-chain + venue APIs
            </span>
            <a href="#compare" className="cs-btn-outline !py-1.5 !px-3">
              Open full compare <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Methodology ------------------------------ */

const PILLARS = [
  { icon: Database, name: "Liquidity", w: "22%", note: "Order book depth, slippage on $1M, market share." },
  { icon: Lock, name: "Custody", w: "18%", note: "Cold/hot ratio, segregation, insurance fund coverage." },
  { icon: ShieldCheck, name: "Compliance", w: "16%", note: "Licenses, MiCAR, KYC framework, sanction screening." },
  { icon: Eye, name: "Transparency", w: "14%", note: "Proof-of-reserves cadence, public audits, disclosures." },
  { icon: Sparkles, name: "Product depth", w: "12%", note: "Spot, perps, options, fiat rails, asset coverage." },
  { icon: Trophy, name: "Track record", w: "10%", note: "Years operating, security incidents, outage history." },
  { icon: Zap, name: "Execution", w: "8%", note: "Spreads, latency, fees realized vs advertised." },
];

function Methodology() {
  return (
    <section id="methodology" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Methodology"
          title="Seven pillars. One score out of 100."
          subtitle="Every score is reproducible. Inputs are public. Weights are versioned. The math is open."
        />

        <div className="mt-12 grid md:grid-cols-[1.1fr_1fr] gap-6">
          <div className="cs-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" />
            <div className="cs-scanline absolute inset-x-0 top-0 h-full" />
            <div className="text-[12px] cs-mono uppercase tracking-[0.16em]" style={{ color: "var(--cs-text-dim)" }}>
              Weights · v1.0
            </div>
            <div className="mt-5 space-y-3">
              {PILLARS.map((p) => (
                <div key={p.name} className="grid grid-cols-[28px_1fr_44px] gap-3 items-center">
                  <div
                    className="grid place-items-center cs-radius"
                    style={{
                      width: 28,
                      height: 28,
                      background: "rgba(16,185,129,0.06)",
                      border: "0.5px solid var(--cs-line)",
                    }}
                  >
                    <p.icon size={13} color="#10b981" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium">{p.name}</div>
                    <div className="text-[12px]" style={{ color: "var(--cs-text-dim)" }}>
                      {p.note}
                    </div>
                  </div>
                  <div className="cs-mono text-[13px] text-right">{p.w}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                t: "Public inputs only",
                d: "Order book snapshots, on-chain wallets, regulatory registers, venue APIs. No insider data, no NDAs.",
                icon: Database,
              },
              {
                t: "Versioned weights",
                d: "Weight changes ship as semver releases with diff, rationale, and backfilled scores. Nothing changes silently.",
                icon: FileSearch,
              },
              {
                t: "Zero paid rankings",
                d: "Featured slots are editorial. Ads are clearly labeled. The leaderboard is not for sale.",
                icon: ShieldCheck,
              },
              {
                t: "Re-derive it yourself",
                d: "Download the inputs, run the formula, get the same number. If you can't, that's a bug we want to hear about.",
                icon: CheckCircle2,
              },
            ].map((b) => (
              <div key={b.t} className="cs-card p-5 flex gap-4">
                <div
                  className="grid place-items-center cs-radius flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(24,180,212,0.08)",
                    border: "0.5px solid var(--cs-line)",
                  }}
                >
                  <b.icon size={15} color="#18b4d4" />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold">{b.t}</div>
                  <div className="mt-1 text-[13px] leading-relaxed" style={{ color: "var(--cs-text-dim)" }}>
                    {b.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Signal Demo ----------------------------- */

const SIGNAL_FEED = [
  { t: "02:14", venue: "Binance", k: "PoR delta", v: "BTC reserves -1.8% vs prior", sev: "warn" },
  { t: "02:08", venue: "Bybit", k: "Spread tightening", v: "BTC spread 0.6→0.4 bps", sev: "ok" },
  { t: "01:54", venue: "OKX", k: "License update", v: "Acquired EU MiCAR notification", sev: "ok" },
  { t: "01:33", venue: "Kraken", k: "Score change", v: "91 → 92 (+1) · Custody up", sev: "ok" },
  { t: "01:20", venue: "Bitfinex", k: "Outage", v: "Withdrawals paused 4m · USDT", sev: "warn" },
  { t: "00:58", venue: "Coinbase", k: "Audit posted", v: "Q1 attestation published", sev: "ok" },
] as const;

function SignalDemo() {
  const chartData = Array.from({ length: 24 }).map((_, i) => ({
    h: `${i}h`,
    bybit: 90 + Math.round(Math.sin(i / 2) * 2 + i * 0.15),
    binance: 88 + Math.round(Math.cos(i / 3) * 2),
    kraken: 89 + Math.round(Math.sin(i / 4) * 1.5 + i * 0.1),
  }));

  return (
    <section id="signal" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Signal Feed"
          title="The market doesn't sleep. Neither does the score."
          subtitle="Score deltas, PoR updates, outages and regulatory events — streamed in real time."
        />

        <div className="mt-12 grid md:grid-cols-[1.2fr_1fr] gap-5">
          <div className="cs-card p-5 md:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={14} color="#10b981" />
                <span className="text-[13px] font-semibold">Score · last 24h</span>
              </div>
              <span className="cs-pill cs-pill-live">
                <span className="cs-pulse-dot" /> Live
              </span>
            </div>
            <div className="h-[260px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <XAxis dataKey="h" tick={{ fill: "#8a93a8", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} interval={3} />
                  <YAxis tick={{ fill: "#8a93a8", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} domain={[80, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "#11172a",
                      border: "0.5px solid rgba(255,255,255,0.12)",
                      borderRadius: 3,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="bybit" stroke="#18b4d4" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="binance" stroke="#D4A853" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="kraken" stroke="#10b981" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 text-[11px] cs-mono mt-1" style={{ color: "var(--cs-text-dim)" }}>
              <span><span style={{ color: "#18b4d4" }}>■</span> Bybit</span>
              <span><span style={{ color: "#D4A853" }}>■</span> Binance</span>
              <span><span style={{ color: "#10b981" }}>■</span> Kraken</span>
            </div>
          </div>

          <div className="cs-card overflow-hidden">
            <div className="flex items-center justify-between p-5 cs-border-b">
              <div className="flex items-center gap-2">
                <Radar size={14} color="#18b4d4" />
                <span className="text-[13px] font-semibold">Live signals</span>
              </div>
              <span className="cs-mono text-[11px]" style={{ color: "var(--cs-text-dim)" }}>UTC</span>
            </div>
            <ul>
              {SIGNAL_FEED.map((s, i) => (
                <li key={i} className="grid grid-cols-[44px_1fr_auto] gap-3 px-5 py-3.5 cs-border-b items-center">
                  <span className="cs-mono text-[11.5px]" style={{ color: "var(--cs-text-dim)" }}>{s.t}</span>
                  <div>
                    <div className="text-[13px]">
                      <span className="font-semibold">{s.venue}</span>
                      <span style={{ color: "var(--cs-text-dim)" }}> · {s.k}</span>
                    </div>
                    <div className="text-[12px]" style={{ color: "var(--cs-text-dim)" }}>{s.v}</div>
                  </div>
                  <span
                    className="cs-pill"
                    style={{
                      color: s.sev === "warn" ? "#ef4444" : "#10b981",
                      borderColor: s.sev === "warn" ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)",
                      background: s.sev === "warn" ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
                    }}
                  >
                    {s.sev === "warn" ? "WATCH" : "OK"}
                  </span>
                </li>
              ))}
            </ul>
            <div className="p-4">
              <a href="#advertise" className="cs-btn-outline w-full justify-center">
                Subscribe to Signal Feed <Mail size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Advertise ------------------------------ */

const PLACEMENTS = [
  {
    name: "Featured Slot",
    price: "$ on request",
    desc: "Editorial featured card above the leaderboard. One per category, rotated quarterly.",
    perks: ["Hero placement", "Logo + score breakdown", "Quarterly review cycle"],
    accent: "#18b4d4",
  },
  {
    name: "Sponsored Research",
    price: "From $4,500",
    desc: "Co-published deep-dive on your venue or product. Editorial control stays with us.",
    perks: ["3,000+ word brief", "Distributed via Signal Feed", "Clearly labeled SPONSORED"],
    accent: "#10b981",
  },
  {
    name: "API Banner",
    price: "From $1,200/mo",
    desc: "Single-banner placement inside the developer dashboard. Tech-buyer audience.",
    perks: ["1 banner, 1 advertiser", "Dev-targeted reach", "Monthly performance report"],
    accent: "#D4A853",
  },
];

function Advertise() {
  return (
    <section id="advertise" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="Advertise"
          title="Three slots. Clearly labeled. Editorially gated."
          subtitle="We sell attention, not rank. Every paid surface is marked, audited, and removable."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {PLACEMENTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="cs-card p-6 relative overflow-hidden"
            >
              <div
                className="absolute -top-px left-0 right-0 h-px"
                style={{ background: p.accent, opacity: 0.6 }}
              />
              <div className="flex items-center justify-between">
                <span className="cs-pill" style={{ color: p.accent, borderColor: `${p.accent}55` }}>
                  Slot {i + 1}
                </span>
                <span className="cs-mono text-[12px]" style={{ color: "var(--cs-text-dim)" }}>
                  {p.price}
                </span>
              </div>
              <div className="mt-5 text-[18px] font-semibold tracking-tight">{p.name}</div>
              <div className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--cs-text-dim)" }}>
                {p.desc}
              </div>
              <ul className="mt-5 space-y-2">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[13px]">
                    <CheckCircle2 size={14} color={p.accent} className="mt-0.5 flex-shrink-0" />
                    <span style={{ color: "var(--cs-text)" }}>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:partners@coinsiglieri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn-outline w-full justify-center mt-6"
              >
                Request media kit <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 cs-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div>
            <div className="text-[12px] cs-mono uppercase tracking-[0.16em]" style={{ color: "var(--cs-text-dim)" }}>
              Partner with us
            </div>
            <div className="text-[20px] md:text-[24px] font-semibold tracking-tight mt-1">
              Talk to the editorial desk before you talk to sales.
            </div>
          </div>
          <a
            href="mailto:partners@coinsiglieri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-btn-primary"
          >
            partners@coinsiglieri.com <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer() {
  const groups = [
    {
      h: "Products",
      links: ["Exchange Scores", "Compare", "Placement Index", "Signal Feed", "API"],
    },
    { h: "Methodology", links: ["Weights v1.0", "Inputs", "Changelog", "Audit log"] },
    { h: "Company", links: ["About", "Editorial standards", "Contact", "Press"] },
    { h: "Legal", links: ["Terms", "Privacy", "Disclosure", "Cookies"] },
  ];
  return (
    <footer className="relative cs-border-t mt-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid md:grid-cols-[1.4fr_2fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="grid place-items-center"
              style={{
                width: 28,
                height: 28,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(24,180,212,0.18))",
                border: "0.5px solid var(--cs-line-strong)",
              }}
            >
              <Signal size={14} color="#10b981" />
            </div>
            <span className="text-[15px] font-semibold">CoinSiglieri</span>
          </div>
          <p className="mt-4 text-[13px] max-w-sm" style={{ color: "var(--cs-text-dim)" }}>
            Independent crypto intelligence. Scored, sourced and re-derivable.
            Powered by{" "}
            <BrandWord word="Ax0n" zeroColor="#D4A853" className="font-semibold" />
            {" "}and the{" "}
            <BrandWord word="C0insiglieri" zeroColor="#18b4d4" className="font-semibold" />
            {" "}graph.
          </p>
          <div className="mt-5">
            <Tagline />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {groups.map((g) => (
            <div key={g.h}>
              <div className="text-[11px] cs-mono uppercase tracking-[0.16em]" style={{ color: "var(--cs-text-dim)" }}>
                {g.h}
              </div>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-link-soft text-[13px]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="cs-border-t">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]" style={{ color: "var(--cs-text-dim)" }}>
          <span>© {new Date().getFullYear()} CoinSiglieri. All rights reserved.</span>
          <span className="cs-mono">v1.0 · Public beta</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- Section header ---------------------------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] cs-mono uppercase tracking-[0.18em] flex items-center gap-2" style={{ color: "var(--cs-text-dim)" }}>
        <span
          className="inline-block"
          style={{ width: 18, height: 1, background: "var(--cs-emerald)" }}
        />
        {eyebrow}
      </div>
      <h2
        className="cs-h1 mt-4 text-[32px] md:text-[48px]"
        style={{ letterSpacing: "-0.025em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-[15px] md:text-[16px] leading-relaxed"
          style={{ color: "var(--cs-text-dim)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

export function CoinSiglieriLanding() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={`cs-root ${theme === "light" ? "light" : ""} min-h-screen`}>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <StatsBar />
      <Products />
      <ComparePreview />
      <Methodology />
      <SignalDemo />
      <Advertise />
      <Footer />
    </div>
  );
}