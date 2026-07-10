import { useState } from "react";
import {
  ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight,
  School, Activity, Wrench, Wifi, AlertTriangle,
  Volume2, Camera, Focus, Thermometer, HandMetal,
  CalendarDays, Users, UserCheck,
} from "lucide-react";

const COLORS: Record<string, string> = {
  "bg-blue-50": "#4285F4",
  "bg-green-50": "#34A853",
  "bg-orange-50": "#F29900",
  "bg-red-50": "#EA4335",
  "bg-yellow-50": "#FBBC05",
  "bg-amber-50": "#FBBC05",
  "bg-purple-50": "#8b5cf6",
  "bg-indigo-50": "#4285F4",
  "bg-teal-50": "#34A853",
  "bg-gray-100": "#4b5563",
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

const ACTIVITY_STATS = [
  { label: "Số lượt truy cập", val: "2.650", pct: 12, color: "#4285F4", data: [20, 35, 28, 45, 38, 52, 44, 58, 50, 65] },
  { label: "Số buổi học", val: "86", pct: 8, color: "#34A853", data: [6, 8, 7, 9, 8, 10, 9, 11, 8, 9] },
  { label: "Tổng thời gian học", val: "128 giờ", pct: 15, color: "#FBBC05", data: [9, 12, 10, 14, 12, 15, 13, 16, 14, 15] },
  { label: "Lượt xem livestream", val: "3.256", pct: 18, color: "#8b5cf6", data: [28, 35, 30, 42, 36, 50, 44, 52, 46, 58] },
  { label: "Lượt xem bản ghi", val: "1.985", pct: 10, color: "#ec4899", data: [18, 22, 20, 25, 22, 28, 24, 30, 27, 29] },
];

const panelClass = "rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-sm";
const ghostButtonClass = "text-[11px] font-medium text-slate-500 transition-colors hover:text-blue-600";
const pillButtonClass = "flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 text-[12px] text-slate-700 shadow-sm shadow-slate-200/40 transition-all hover:border-slate-300 hover:bg-slate-50";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 80;
  const H = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * W);
  const ys = data.map(v => H - 2 - ((v - min) / (max - min + 1)) * (H - 4));
  const pts = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area = `0,${H} ${pts} ${W},${H}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id={`sp-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sp-${color.replace("#", "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

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
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
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
      <polyline points={pts} fill="none" stroke="#4f46e5" strokeWidth={2} strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={ys[i]}
          r={i === peakIdx ? 4 : 2.5}
          fill={i === peakIdx ? "#4f46e5" : "white"}
          stroke="#4f46e5"
          strokeWidth={1.5}
        />
      ))}

      <rect x={xs[peakIdx] - 36} y={ys[peakIdx] - 26} width={72} height={18} rx={5} fill="#312e81" />
      <text x={xs[peakIdx]} y={ys[peakIdx] - 14} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">
        Tập trung: {ATTENTION_DATA[peakIdx].v}%
      </text>

      {ATTENTION_DATA.map((d, i) => (
        <text key={i} x={xs[i]} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.h}</text>
      ))}
    </svg>
  );
}

function EventDonut() {
  const total = 48;
  const slices = [
    { label: "Cao", val: 12, pct: 25, color: "#ef4444" },
    { label: "Trung bình", val: 28, pct: 58, color: "#f59e0b" },
    { label: "Thấp", val: 8, pct: 17, color: "#4f46e5" },
  ];
  const r = 60;
  const cx = 80;
  const cy = 80;
  let angle = -Math.PI / 2;
  const paths = slices.map(s => {
    const sweep = (s.pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    const inner = 36;
    const ix1 = cx + inner * Math.cos(angle - sweep);
    const iy1 = cy + inner * Math.sin(angle - sweep);
    const ix2 = cx + inner * Math.cos(angle);
    const iy2 = cy + inner * Math.sin(angle);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`;
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <svg width={160} height={160} viewBox="0 0 160 160">
          {paths.map((d, i) => <path key={i} d={d} fill={slices[i].color} />)}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-slate-800">{total}</div>
          <div className="text-center text-[10px] leading-tight text-slate-400">Tổng sự<br />kiện</div>
        </div>
      </div>
      <div className="space-y-3">
        {slices.map(s => (
          <div key={s.label} className="flex items-center justify-between gap-8">
            <span className="flex items-center gap-2 text-[12px] text-slate-600">
              <span className="h-3 w-3 rounded-sm shadow-sm" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="text-[12px] font-semibold text-slate-800">{s.val} <span className="font-normal text-slate-400">({s.pct}%)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceStatusBar() {
  const items = [
    { label: "Online", val: 1024, color: "bg-emerald-500", textColor: "text-emerald-600" },
    { label: "Ngoài tuyến", val: 156, color: "bg-amber-400", textColor: "text-amber-600" },
    { label: "Lỗi", val: 45, color: "bg-rose-500", textColor: "text-rose-500" },
    { label: "Bảo trì", val: 20, color: "bg-slate-300", textColor: "text-slate-500" },
  ];
  const total = items.reduce((sum, item) => sum + item.val, 0);

  return (
    <div>
      <div className="mb-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/70">
        {items.map(item => (
          <div key={item.label} className={`${item.color} h-full`} style={{ width: `${(item.val / total) * 100}%` }} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.map(item => (
          <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/70 py-2 text-center">
            <div className={`text-[15px] font-bold ${item.textColor}`}>{item.val.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="w-[280px] flex-shrink-0 space-y-4">
      <div className={`${panelClass} p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Cảnh báo / Sự kiện gần nhất</div>
          <button className={ghostButtonClass}>Xem tất cả</button>
        </div>
        <div className="space-y-2.5">
          {ALERTS.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-slate-100 hover:bg-slate-50/70">
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
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Trạng thái thiết bị</div>
          <button className={ghostButtonClass}>Xem tất cả</button>
        </div>
        <DeviceStatusBar />
      </div>

      <div className={`${panelClass} p-4`}>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Dung lượng lưu trữ</div>
          <button className={ghostButtonClass}>Xem chi tiết</button>
        </div>
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="text-slate-500">Đã sử dụng <span className="font-semibold text-slate-800">12.45 TB</span></span>
          <span className="font-bold text-slate-700">62%</span>
        </div>
        <div className="mb-1 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/70">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: "62%" }} />
        </div>
        <div className="text-right text-[11px] text-slate-400">Tổng 20 TB</div>
      </div>

      <div className={`${panelClass} p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Timeline hệ thống</div>
          <button className={ghostButtonClass}>Xem tất cả</button>
        </div>
        <div className="relative space-y-0">
          {TIMELINE.map((t, i) => (
            <div key={i} className="relative flex gap-3">
              {i < TIMELINE.length - 1 && (
                <div className="absolute left-[13px] top-7 w-0.5 bg-slate-200/80" style={{ height: "calc(100% - 4px)" }} />
              )}
              <div className={`z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${t.bg} ${t.color} ring-1 ring-black/5`}>
                {t.icon}
              </div>
              <div className="flex-1 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-slate-800">{t.title}</span>
                  <span className="ml-1 flex-shrink-0 font-mono text-[10px] text-slate-400">{t.time}</span>
                </div>
                <div className="text-[11px] text-slate-400">{t.sub}</div>
              </div>
            </div>
          ))}
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
    { icon: <School size={20} />, val: "256", label: "Tổng phòng học", sub: "Tất cả tòa nhà", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
    { icon: <Activity size={20} />, val: "186", label: "Phòng đang hoạt động", sub: "72.7%", iconBg: "bg-green-50", iconColor: "text-green-500" },
    { icon: <Wrench size={20} />, val: "1.245", label: "Tổng thiết bị", sub: "Thiết bị", iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <Wifi size={20} />, val: "1.024", label: "Thiết bị online", sub: "82.3%", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
    { icon: <AlertTriangle size={20} />, val: "48", label: "Sự kiện hôm nay", sub: "Cao: 12 | TB: 28 | Thấp: 8", iconBg: "bg-red-50", iconColor: "text-red-500" },
  ];

  return (
    <div className="min-h-full bg-white p-4">
      <div className="mb-4 grid grid-cols-5 gap-3">
        {stats.map((s, index) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-white/50 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.10)] ring-1 ring-black/5"
            style={{
              background: index === 3
                ? "linear-gradient(135deg, rgb(117 15 159) 0%, rgb(91 33 182) 100%)"
                : `linear-gradient(135deg, ${COLORS[s.iconBg] ?? "#4285F4"} 0%, ${COLORS[s.iconBg] ?? "#4285F4"}dd 100%)`,
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

      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className={`${panelClass} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Phòng học đang hoạt động</div>
              <button className="flex items-center gap-1 text-[11px] font-medium text-blue-600 transition-colors hover:text-indigo-600">
                Xem tất cả <ArrowRight size={11} />
              </button>
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
              <div className="grid grid-cols-4 gap-3 overflow-hidden">
                {ACTIVE_ROOMS.slice(carouselIdx, carouselIdx + visible).map(r => (
                  <div key={r.id} className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
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
                          className={`h-full rounded-full ${r.attention >= 80 ? "bg-gradient-to-r from-emerald-500 to-green-500" : r.attention >= 60 ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-amber-400 to-yellow-400"}`}
                          style={{ width: `${r.attention}%` }}
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

          <div className="grid grid-cols-2 gap-4">
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
                  <div key={s.label} className="rounded-xl bg-slate-50/70 px-2 py-2 text-center">
                    <div className="mb-0.5 text-[10px] text-slate-400">{s.label}</div>
                    <div className={`text-[14px] font-bold ${s.up ? "text-emerald-600" : "text-slate-800"}`}>{s.val}</div>
                    {s.sub && <div className="text-[10px] text-slate-400">{s.sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${panelClass} p-4`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">Sự kiện theo mức độ</div>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:bg-slate-100">
                  Hôm nay <ChevronRight size={10} className="rotate-90 text-slate-400" />
                </button>
              </div>
              <EventDonut />
              <div className="mt-4 border-t border-slate-100 pt-3">
                <button className="flex items-center gap-1.5 text-[12px] font-medium text-blue-600 transition-colors hover:text-indigo-600">
                  Xem chi tiết sự kiện <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className={`${panelClass} p-4`}>
            <div className="mb-3 text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">
              Tổng quan hoạt động hệ thống <span className="text-[12px] font-normal text-slate-400">(24h qua)</span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {ACTIVITY_STATS.map(s => (
                <div key={s.label} className="rounded-xl border border-slate-200/70 bg-white p-3 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                  <div className="mb-2 leading-tight text-[11px] text-slate-500">{s.label}</div>
                  <div className="mb-2 flex items-end justify-between">
                    <div className="text-[16px] font-bold text-slate-800">{s.val}</div>
                    <div className="flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                      <ArrowUpRight size={11} />+{s.pct}%
                    </div>
                  </div>
                  <Sparkline data={s.data} color={s.color} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  );
}
