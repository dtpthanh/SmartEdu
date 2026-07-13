import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronLeft, ChevronRight, ArrowRight,
  School, Activity, Wrench, Wifi, AlertTriangle,
  Volume2, Camera, Focus, Thermometer, HandMetal,
  Users, UserCheck, HardDrive,
} from "lucide-react";

const COLORS: Record<string, string> = {
  "bg-blue-50": "#0147b8",
  "bg-green-50": "#008000",
  "bg-orange-50": "#e28103",
  "bg-red-50": "#dd1200",
  "bg-yellow-50": "#ffa600",
  "bg-amber-50": "#d2a40c",
  "bg-purple-50": "#6e0883",
  "bg-indigo-50": "#3ea1f1",
  "bg-teal-50": "#5cbb5c",
  "bg-gray-100": "#cecece",
};

const palette = {
  blue: COLORS["bg-blue-50"],
  green: COLORS["bg-green-50"],
  orange: COLORS["bg-orange-50"],
  red: COLORS["bg-red-50"],
  yellow: COLORS["bg-yellow-50"],
  amber: COLORS["bg-amber-50"],
  purple: COLORS["bg-purple-50"],
  indigo: COLORS["bg-indigo-50"],
  teal: COLORS["bg-teal-50"],
  gray: COLORS["bg-gray-100"],
};

const ACTIVE_ROOMS = [
  { id: "A101", name: "A101 - Lớp 10A1", students: "45/45", teacher: "Nguyễn Văn A", attention: 85, img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=65" },
  { id: "A102", name: "A102 - Lớp 10A2", students: "40/40", teacher: "Trần Thị B", attention: 78, img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=65" },
  { id: "B101", name: "B101 - Lớp 11B1", students: "42/45", teacher: "Lê Văn C", attention: 82, img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=400&q=65" },
  { id: "C201", name: "C201 - Lớp 12C1", students: "38/40", teacher: "Phạm Thị D", attention: 88, img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=400&q=65" },
  { id: "B102", name: "B102 - Lớp 11B2", students: "43/43", teacher: "Hoàng Minh T", attention: 74, img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=400&q=65" },
  { id: "A103", name: "A103 - Lớp 10A3", students: "36/40", teacher: "Đỗ Thị H", attention: 91, img: "https://images.unsplash.com/photo-1566833017497-830328f5bc5d?w=400&q=65" },
];

const ATTENTION_DATA = [
  { h: "07:00", v: 55 }, { h: "08:00", v: 72 }, { h: "09:00", v: 80 },
  { h: "10:00", v: 92 }, { h: "11:00", v: 85 }, { h: "12:00", v: 45 },
  { h: "13:00", v: 58 }, { h: "14:00", v: 76 }, { h: "15:00", v: 82 },
  { h: "16:00", v: 70 }, { h: "17:00", v: 60 },
];

const ALERTS = [
  { icon: <Volume2 size={14} />, bg: "bg-orange-100", color: "text-orange-500", title: "Mức độ ồn cao", sub: "Phòng A101 - Lớp 10A1", level: "Cao", lColor: "bg-red-100 text-red-600", time: "09:35" },
  { icon: <Camera size={14} />, bg: "bg-orange-100", color: "text-orange-500", title: "Camera offline", sub: "Camera Học sinh PTZ - A102", level: "Trung bình", lColor: "bg-yellow-100 text-yellow-700", time: "09:28" },
  { icon: <Focus size={14} />, bg: "bg-orange-100", color: "text-orange-500", title: "Phát hiện mất tập trung", sub: "Phòng B101 - Lớp 11B1", level: "Trung bình", lColor: "bg-yellow-100 text-yellow-700", time: "09:20" },
  { icon: <Thermometer size={14} />, bg: "bg-red-100", color: "text-red-500", title: "Thiết bị quá nhiệt", sub: "NVR-01 - Tòa nhà A", level: "Cao", lColor: "bg-red-100 text-red-600", time: "09:15" },
  { icon: <HandMetal size={14} />, bg: "bg-blue-100", color: "text-blue-500", title: "Học sinh giơ tay", sub: "Phòng C201 - Lớp 12C1", level: "Thấp", lColor: "bg-blue-100 text-blue-600", time: "09:10" },
];

const TIMELINE = [
  { time: "09:30", icon: <School size={13} />, bg: "bg-blue-100", color: "text-blue-600", title: "Phòng A101 bắt đầu tiết học", sub: "Giáo viên: Nguyễn Văn A" },
  { time: "09:25", icon: <Camera size={13} />, bg: "bg-green-100", color: "text-green-600", title: "Camera Giáo viên - A101 online", sub: "Thiết bị hoạt động bình thường" },
  { time: "09:20", icon: <Volume2 size={13} />, bg: "bg-orange-100", color: "text-orange-500", title: "Phát hiện mức độ ồn cao", sub: "Phòng A101 - Lớp 10A1" },
  { time: "09:15", icon: <Thermometer size={13} />, bg: "bg-red-100", color: "text-red-500", title: "NVR-01 quá nhiệt", sub: "Tòa nhà A" },
];

const panelClass = "app-surface app-surface-hover ring-1 ring-blue-100/70 dark:ring-white/10";
const viewAllLinkClass = "inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200";
const pillButtonClass = "flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 text-[12px] text-slate-700 shadow-sm shadow-slate-200/40 transition-all hover:border-slate-300 hover:bg-slate-50";

function AttentionChart() {
  const W = 520;
  const H = 140;
  const pad = { l: 36, r: 16, t: 20, b: 24 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const xs = ATTENTION_DATA.map((_, i) => pad.l + (i / (ATTENTION_DATA.length - 1)) * cW);
  const ys = ATTENTION_DATA.map(d => pad.t + (1 - d.v / 100) * cH);
  const pts = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area = `${xs[0]},${H - pad.b} ${pts} ${xs[xs.length - 1]},${H - pad.b}`;
  const peakIdx = ATTENTION_DATA.findIndex(d => d.v === Math.max(...ATTENTION_DATA.map(item => item.v)));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
      <defs>
        <linearGradient id="att-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.indigo} stopOpacity="0.18" />
          <stop offset="100%" stopColor={palette.indigo} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 25, 50, 75, 100].map(v => {
        const y = pad.t + (1 - v / 100) * cH;
        return (
          <g key={v}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="3 4" />
            <text x={pad.l - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{v}%</text>
          </g>
        );
      })}

      <polygon points={area} fill="url(#att-grad)" />
      <polyline points={pts} fill="none" stroke={palette.indigo} strokeWidth={2} strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r={i === peakIdx ? 4 : 2.5}
          fill={i === peakIdx ? palette.indigo : "white"}
          stroke={palette.indigo}
          strokeWidth={1.5}
        />
      ))}

      <rect x={xs[peakIdx] - 36} y={ys[peakIdx] - 26} width={72} height={18} rx={5} fill={palette.blue} />
      <text x={xs[peakIdx]} y={ys[peakIdx] - 14} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">
        Tập trung: {ATTENTION_DATA[peakIdx].v}%
      </text>

      {ATTENTION_DATA.map((d, i) => (
        <text key={i} x={xs[i]} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.h}</text>
      ))}
    </svg>
  );
}

function SystemTimeline() {
  return (
    <div className="relative space-y-0">
      {TIMELINE.map((t, i) => (
        <div key={i} className="relative flex gap-3 rounded-xl border border-transparent bg-white/45 px-2 py-2 transition-colors hover:border-blue-100 hover:bg-blue-50/55 dark:bg-white/[0.03] dark:hover:border-slate-600 dark:hover:bg-white/[0.06]">
          {i < TIMELINE.length - 1 && (
            <div className="absolute left-[14px] top-8 w-0.5 bg-slate-200/80" style={{ height: "calc(100% - 4px)" }} />
          )}
          <div className={`z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${t.bg} ${t.color} ring-1 ring-black/5`}>
            {t.icon}
          </div>
          <div className="min-w-0 flex-1 pb-3">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[12px] font-medium text-slate-800">{t.title}</span>
              <span className="flex-shrink-0 font-mono text-[10px] text-slate-400">{t.time}</span>
            </div>
            <div className="truncate text-[11px] text-slate-400">{t.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RightPanel() {
  return (
    <div className="w-full flex-shrink-0 space-y-4 2xl:w-[300px]">
      <div className={`${panelClass} min-h-[380px] p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Sự kiện gần đây</div>
          <Link to="/events" className={viewAllLinkClass}>
            Xem tất cả <ArrowRight size={11} />
          </Link>
        </div>
        <div className="space-y-3">
          {ALERTS.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-100/80 bg-white/70 px-2 py-2 shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition-colors hover:border-blue-100 hover:bg-blue-50/55 dark:border-slate-700/70 dark:bg-white/[0.03] dark:hover:border-slate-600 dark:hover:bg-white/[0.06]">
              <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${a.bg} ${a.color} ring-1 ring-black/5`}>
                {a.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[12px] font-medium text-slate-800">{a.title}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${a.lColor}`}>{a.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="truncate text-[11px] text-slate-400">{a.sub}</span>
                  <span className="ml-1 flex-shrink-0 font-mono text-[10px] text-slate-400">{a.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${panelClass} p-4`}>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Dung lượng lưu trữ</div>
          <HardDrive size={15} className="text-slate-400" />
        </div>
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="text-slate-500">Đã sử dụng <span className="font-semibold text-slate-800">12.45 TB</span></span>
          <span className="font-bold text-slate-700">62%</span>
        </div>
        <div className="mb-1 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/70">
          <div className="h-full rounded-full" style={{ width: "62%", background: `linear-gradient(90deg, ${palette.blue}, ${palette.indigo})` }} />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Còn trống 7.55 TB</span>
          <span>Tổng 20 TB</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const visible = 4;
  const canPrev = carouselIdx > 0;
  const canNext = carouselIdx + visible < ACTIVE_ROOMS.length;

  const stats = [
    { icon: <School size={20} />, val: "256", label: "Tổng phòng học", sub: "Tất cả tòa nhà", iconBg: "bg-blue-50" },
    { icon: <Activity size={20} />, val: "186", label: "Phòng đang hoạt động", sub: "72.7%", iconBg: "bg-green-50" },
    { icon: <Wrench size={20} />, val: "1.245", label: "Tổng thiết bị", sub: "Thiết bị", iconBg: "bg-orange-50" },
    { icon: <Wifi size={20} />, val: "1.024", label: "Thiết bị online", sub: "82.3%", iconBg: "bg-purple-50" },
    { icon: <AlertTriangle size={20} />, val: "48", label: "Sự kiện hôm nay", sub: "Sự kiện", iconBg: "bg-red-50" },
  ];

  return (
    <div className="app-page min-h-full">
      <div className="app-grid-stats mb-4">
        {stats.map(s => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-white/50 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.10)] ring-1 ring-black/5"
            style={{
              background: `linear-gradient(135deg, ${COLORS[s.iconBg] ?? "#4285F4"} 0%, ${COLORS[s.iconBg] ?? "#4285F4"}dd 100%)`,
            }}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/18 shadow-inner shadow-white/10">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-white/72">{s.label}</div>
              <div className="text-2xl font-bold leading-none text-white">{s.val}</div>
              <div className="mt-0.5 text-[11px] text-white/72">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 2xl:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className={`${panelClass} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Phòng học đang hoạt động</div>
              <Link to="/rooms" className={viewAllLinkClass}>
                Xem tất cả <ArrowRight size={11} />
              </Link>
            </div>
            <div className="relative">
              {canPrev && (
                <button
                  onClick={() => setCarouselIdx(i => i - 1)}
                  className="absolute -left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-md shadow-slate-200/80 transition-colors hover:bg-slate-50"
                >
                  <ChevronLeft size={14} className="text-slate-600" />
                </button>
              )}
              <div className="grid grid-cols-1 gap-3 overflow-hidden sm:grid-cols-2 xl:grid-cols-4">
                {ACTIVE_ROOMS.slice(carouselIdx, carouselIdx + visible).map(r => (
                  <div key={r.id} className="group overflow-hidden rounded-xl border border-blue-100/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] ring-1 ring-blue-50/80 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)] dark:border-slate-700/80 dark:bg-white/[0.04] dark:ring-white/10 dark:hover:border-slate-500">
                    <div className="relative">
                      <img src={r.img} alt={r.name} className="h-[110px] w-full object-cover" />
                      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/20 to-transparent" />
                      <span className="absolute right-2 top-2 rounded-full border border-white/30 bg-emerald-50/95 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 shadow-sm">
                        Đang học
                      </span>
                    </div>
                    <div className="p-2.5">
                      <div className="mb-1 text-[12px] font-semibold text-slate-800">{r.name}</div>
                      <div className="mb-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                        <Users size={9} />{r.students} học sinh
                      </div>
                      <div className="mb-2 flex items-center gap-1 text-[10px] text-slate-500">
                        <UserCheck size={9} />Giáo viên: {r.teacher}
                      </div>
                      <div className="mb-1 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Tập trung:</span>
                        <span className="font-semibold text-slate-700">{r.attention}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/70">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${r.attention}%`,
                            background: r.attention >= 80
                              ? `linear-gradient(90deg, ${palette.teal}, ${palette.green})`
                              : r.attention >= 60
                                ? `linear-gradient(90deg, ${palette.blue}, ${palette.indigo})`
                                : `linear-gradient(90deg, ${palette.amber}, ${palette.yellow})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {canNext && (
                <button
                  onClick={() => setCarouselIdx(i => i + 1)}
                  className="absolute -right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-md shadow-slate-200/80 transition-colors hover:bg-slate-50"
                >
                  <ChevronRight size={14} className="text-slate-600" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className={`${panelClass} p-4`}>
              <div className="mb-1 flex items-center justify-between">
                <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Mức độ tập trung trung bình</div>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100">
                  Hôm nay <ChevronRight size={10} className="rotate-90 text-slate-400" />
                </button>
              </div>
              <AttentionChart />
              <div className="mt-3 grid grid-cols-4 gap-2 border-t border-slate-100 pt-3">
                {[
                  { label: "Trung bình hôm nay", val: "76%", sub: null, up: null },
                  { label: "Cao nhất", val: "92%", sub: "09:20", up: null },
                  { label: "Thấp nhất", val: "45%", sub: "13:10", up: null },
                  { label: "So với hôm qua", val: "↑8%", sub: null, up: true },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-blue-100/70 bg-white px-2 py-2 text-center shadow-[0_8px_18px_rgba(15,23,42,0.05)] dark:border-slate-700/70 dark:bg-white/[0.04]">
                    <div className="mb-0.5 text-[10px] text-slate-400">{s.label}</div>
                    <div className={`text-[14px] font-bold ${s.up ? "text-emerald-600" : "text-slate-800"}`}>{s.val}</div>
                    {s.sub && <div className="text-[10px] text-slate-400">{s.sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${panelClass} p-4`}>
              <div className="mb-3 text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Timeline hệ thống
              </div>
              <SystemTimeline />
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  );
}
