import type { ReactNode } from "react";

const COLORS: Record<string, string> = {
  "bg-blue-50":   "#4285F4",
  "bg-green-50":  "#34A853",
  "bg-orange-50": "#F29900",
  "bg-red-50":    "#EA4335",
  "bg-yellow-50": "#FBBC05",
  "bg-amber-50":  "#FBBC05",
  "bg-purple-50": "#8b5cf6",
  "bg-indigo-50": "#4285F4",
  "bg-teal-50":   "#34A853",
  "bg-gray-100":  "#4b5563",
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
      className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm"
      style={{ backgroundColor: bg }}
    >
      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <span className="text-white">{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-white/75 mb-0.5 uppercase tracking-wide">{label}</div>
        <div className="text-2xl font-bold text-white leading-none">{count}</div>
        <div className="text-[11px] text-white/75 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
