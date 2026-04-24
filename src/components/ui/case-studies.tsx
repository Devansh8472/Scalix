import {
  type ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutDashboard, Monitor, Users } from "lucide-react";

export type CaseStudyIconKey = "monitor" | "layoutDashboard" | "users";

export type CaseStudyMetric = {
  value: string;
  label: string;
  sub?: string;
};

export type DetailedCaseStudyItem = {
  id: string;
  title: string;
  stat: string;
  desc: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  iconKey?: CaseStudyIconKey;
  metrics: CaseStudyMetric[];
};

type CaseStudiesDetailedProps = {
  studies: DetailedCaseStudyItem[];
  activeStudyId?: string;
  onActiveStudyChange?: (studyId: string) => void;
};

const iconMap: Record<CaseStudyIconKey, ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  layoutDashboard: LayoutDashboard,
  users: Users,
};

function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const match = value.match(
    /^([^-0-9+]*?)\s*([+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^0-9\s]*)$/,
  );

  if (!match) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }

  const [, prefix, numberString, suffix] = match;
  const normalized = numberString.replace(/,/g, "");
  const end = Number.parseFloat(normalized);
  const decimals = normalized.includes(".")
    ? normalized.split(".")[1].length
    : 0;

  return {
    prefix: prefix ?? "",
    end: Number.isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

function MetricStat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="rounded-2xl border border-white/45 bg-white/35 p-5 text-left backdrop-blur-md backdrop-saturate-150">
      <p
        className="text-2xl font-semibold text-slate-900 sm:text-3xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        <span>
          {end.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </span>
        {suffix}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
        {label}
      </p>
      {sub ? <p className="mt-1 text-sm text-slate-600">{sub}</p> : null}
    </div>
  );
}

export default function CaseStudiesDetailed({
  studies,
  activeStudyId,
  onActiveStudyChange,
}: CaseStudiesDetailedProps) {
  const normalizedStudies = useMemo(() => studies.filter(Boolean), [studies]);
  const [uncontrolledStudyId, setUncontrolledStudyId] = useState(
    activeStudyId ?? normalizedStudies[0]?.id ?? "",
  );
  const selectedStudyId =
    activeStudyId || uncontrolledStudyId || normalizedStudies[0]?.id || "";
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!selectedStudyId) return;

    const target = document.getElementById(
      `case-study-detail-${selectedStudyId}`,
    );

    if (!target) return;

    target.scrollIntoView({
      behavior: initializedRef.current ? "smooth" : "auto",
      block: "start",
    });

    initializedRef.current = true;
  }, [selectedStudyId]);

  const selectStudy = useCallback(
    (studyId: string) => {
      setUncontrolledStudyId(studyId);
      onActiveStudyChange?.(studyId);
    },
    [onActiveStudyChange],
  );

  if (!normalizedStudies.length) return null;

  return (
    <section
      className="h-full overflow-y-auto py-8 sm:py-10"
      aria-labelledby="case-studies-detailed-heading"
    >
      <div className="mx-auto w-full px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="case-studies-detailed-heading"
            className="text-3xl font-semibold text-slate-900 md:text-5xl"
          >
            Real PPC results with structured campaign architecture
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            From account cleanup to margin-led scaling, each study shows how
            disciplined PPC structure translates into faster, cleaner, and more
            profitable performance.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {normalizedStudies.map((study, index) => (
            <button
              key={study.id}
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selectedStudyId === study.id
                  ? "border-white/75 bg-white/50 text-slate-900"
                  : "border-white/45 bg-white/25 text-slate-700 hover:bg-white/35"
              }`}
              onClick={() => selectStudy(study.id)}
              aria-pressed={selectedStudyId === study.id}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/50 bg-white/45 text-[0.65rem] font-bold text-slate-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              {study.title}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-10">
          {normalizedStudies.map((study, index) => {
            const Icon = iconMap[study.iconKey ?? "monitor"];
            const reversed = index % 2 === 1;
            const isSelected = selectedStudyId === study.id;

            return (
              <article
                id={`case-study-detail-${study.id}`}
                key={study.id}
                className={`rounded-3xl border px-5 py-6 transition sm:px-8 sm:py-8 ${
                  isSelected
                    ? "border-white/75 bg-white/46 shadow-[0_20px_45px_rgba(8,23,36,0.14)]"
                    : "border-white/45 bg-white/28 shadow-[0_14px_30px_rgba(8,23,36,0.08)]"
                }`}
              >
                <div className="grid items-center gap-10 lg:grid-cols-3 xl:gap-16">
                  <div
                    className={[
                      "flex flex-col gap-7 text-left sm:flex-row lg:col-span-2",
                      reversed
                        ? "lg:order-2 lg:border-l lg:border-white/35 lg:pl-12"
                        : "lg:border-r lg:border-white/35 lg:pr-12",
                    ].join(" ")}
                  >
                    <img
                      src={study.image}
                      alt={`${study.name} portrait`}
                      className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-white/55 transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    <figure className="flex flex-col justify-between gap-6 text-left">
                      <blockquote className="text-left">
                        <h3 className="text-xl font-medium leading-relaxed text-slate-900">
                          {study.title}
                          <span className="mt-2 block text-base font-normal leading-7 text-slate-600 sm:text-lg">
                            {study.quote}
                          </span>
                        </h3>
                      </blockquote>

                      <figcaption className="mt-2 flex flex-col gap-4 text-left">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/60 bg-white/55 text-slate-700">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-base font-semibold text-slate-900">
                              {study.name}
                            </span>
                            <span className="text-sm text-slate-600">
                              {study.role}
                            </span>
                          </div>
                        </div>
                        
                        <a
                          href={`case-study.html?id=${study.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/75"
                        >
                          View Full Details
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15,3 21,3 21,8"/>
                            <line x1="16" y1="8" x2="21" y2="13"/>
                          </svg>
                        </a>
                      </figcaption>
                    </figure>
                  </div>

                  <div
                    className={[
                      "grid grid-cols-1 gap-4 self-center text-left",
                      reversed ? "lg:order-1" : "",
                    ].join(" ")}
                  >
                    {study.metrics.map((metric, metricIndex) => (
                      <MetricStat
                        key={`${study.id}-${metricIndex}`}
                        value={metric.value}
                        label={metric.label}
                        sub={metric.sub}
                      />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
