import type { ReactNode } from "react";

const COLORS: Record<string, string> = {
  "bg-blue-50":   "#004fcf",
  "bg-green-50":  "#008000",
  "bg-orange-50": "#ff9100",
  "bg-red-50":    "#dd1200",
  "bg-yellow-50": "#ffa600",
  "bg-amber-50":  "#ffc400",
  "bg-purple-50": "#5b0c9b",
  "bg-indigo-50": "#3ea1f1",
  "bg-teal-50":   " #5cbb5c",
  "bg-gray-100":  "#686969",
};

export function StatCard({ icon, count, label, sub, iconBg, onClick, active }: {
  icon: ReactNode;
  count: number | string;
  label: string;
  sub: string;
  iconBg: string;
  iconColor?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const bg = COLORS[iconBg] ?? "#4285F4";
  const content = (
    <>
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/18 shadow-inner shadow-white/10">
        <span className="text-white">{icon}</span>
      </div>
      <div className="min-w-0 text-left">
        <div className="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-white/72">{label}</div>
        <div className="text-2xl font-bold leading-none text-white">{count}</div>
        <div className="mt-0.5 text-[11px] text-white/72">{sub}</div>
      </div>
    </>
  );

  const className = `group flex items-center gap-3 rounded-2xl border border-white/50 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.10)] ring-1 ring-black/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
    onClick ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.16)]" : ""
  } ${active ? "ring-2 ring-white/80" : ""}`;

  if (onClick) {
    return (
      <button type="button" aria-pressed={active} onClick={onClick} className={className} style={{ background: `linear-gradient(135deg, ${bg} 0%, ${bg}dd 100%)` }}>
        {content}
      </button>
    );
  }

  return (
    <div className={className} style={{ background: `linear-gradient(135deg, ${bg} 0%, ${bg}dd 100%)` }}>
      {content}
    </div>
  );
}
