import type { ReactNode } from "react";

const COLORS: Record<string, string> = {
  "bg-blue-50":   "#004fcf",
  "bg-green-50":  "#008000",
  "bg-orange-50": "#ff9100",
  "bg-red-50":    "#dd1200",
  "bg-yellow-50": "#ffa600",
  "bg-amber-50":  "#ffc400",
  "bg-purple-50": "#991cff",
  "bg-indigo-50": "#3ea1f1",
  "bg-teal-50":   " #5cbb5c",
  "bg-gray-100":  "#999b9e",
};

export function StatCard({ icon, count, label, sub, iconBg }: {
  icon: ReactNode;
  count: number | string;
  label: string;
  sub: string;
  iconBg: string;
  iconColor?: string;
}) {
  const bg = COLORS[iconBg] ?? "#4285F4";
  return (
    <div
      className="group flex items-center gap-3 rounded-2xl border border-white/12 px-4 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.18)] dark:border-white/8 dark:shadow-[0_18px_40px_rgba(2,6,23,0.42)] dark:ring-white/6"
      style={{ backgroundColor: bg }}
    >
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/18 shadow-inner shadow-white/10 backdrop-blur-sm">
        <span className="text-white">{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 text-[10px] uppercase tracking-[0.1em] text-white/84">{label}</div>
        <div className="text-2xl font-bold leading-none text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.16)]">{count}</div>
        <div className="mt-0.5 text-[11px] text-white/92">{sub}</div>
      </div>
    </div>
  );
}
