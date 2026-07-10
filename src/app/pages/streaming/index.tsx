import { useState } from "react";
import {
  ChevronDown, Maximize2, LayoutGrid, List,
  Radio, Users, Wifi, AlertTriangle, Calendar,
  CalendarDays, School, Plus, ArrowRight, Check, Settings, MoreHorizontal,
  BookOpen,
} from "lucide-react";
import { LIVE_STREAMS, PLATFORMS, VIEWER_TREND, UPCOMING } from "../../data/streaming";

// ── Color map ─────────────────────────────────────────────────────────────────
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

// ── Platform pill ─────────────────────────────────────────────────────────────
const PLATFORM_COLORS: Record<string, string> = {
  yt: "#FF0000", fb: "#1877F2", zm: "#2D8CFF", gm: "#00AC47", rtmp: "#6B7280",
};
const PLATFORM_LABELS: Record<string, string> = {
  yt: "YT", fb: "FB", zm: "ZM", gm: "GM", rtmp: "RTMP",
};
function PlatformDot({ id }: { id: string }) {
  return (
    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
      style={{ backgroundColor: PLATFORM_COLORS[id] ?? "#6b7280" }}>
      {PLATFORM_LABELS[id]}
    </span>
  );
}

// ── Live stream card ──────────────────────────────────────────────────────────
function StreamCard({ s }: { s: typeof LIVE_STREAMS[number] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-900/15 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative">
        <img src={s.img} alt={s.room} className="w-full h-[110px] object-cover" />
        <span className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
        </span>
        <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
          <Users size={9} />{s.viewers}
        </span>
        <button className="absolute bottom-2 right-2 w-6 h-6 bg-black/40 rounded flex items-center justify-center hover:bg-black/60 transition-colors">
          <Maximize2 size={10} className="text-white" />
        </button>
      </div>
      <div className="px-2.5 pt-2 pb-1.5">
        <div className="font-semibold text-[12px] text-gray-800 truncate">{s.room}</div>
        <div className="text-[10px] text-gray-400 truncate">{s.subject} · {s.teacher}</div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1">
            {s.platforms.map(p => <PlatformDot key={p} id={p} />)}
          </div>
          <div className="flex items-center gap-1">
            <button className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors"><Settings size={10} /></button>
            <button className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal size={10} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Viewer trend SVG chart ────────────────────────────────────────────────────
function ViewerTrendChart() {
  const W = 560; const H = 100; const pad = { l: 36, r: 10, t: 8, b: 20 };
  const xs = VIEWER_TREND.map((_, i) => pad.l + (i / (VIEWER_TREND.length - 1)) * (W - pad.l - pad.r));
  const maxV = Math.max(...VIEWER_TREND.map(d => d.v));
  const ys = VIEWER_TREND.map(d => pad.t + (1 - d.v / (maxV * 1.1)) * (H - pad.t - pad.b));
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area = `${xs[0]},${H - pad.b} ` + xs.map((x, i) => `${x},${ys[i]}`).join(" ") + ` ${xs[xs.length - 1]},${H - pad.b}`;
  const peakIdx = VIEWER_TREND.findIndex(d => d.v === maxV);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 100 }}>
        <defs>
          <linearGradient id="vt-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Y gridlines */}
        {[0.25, 0.5, 0.75, 1].map(f => {
          const y = pad.t + (1 - f) * (H - pad.t - pad.b);
          return <line key={f} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#f1f5f9" strokeWidth={1} />;
        })}
        {/* Y labels */}
        {[{ v: 0, label: "0" }, { v: 500, label: "500" }, { v: 1000, label: "1.0k" }, { v: 1500, label: "1.5k" }].map(({ v, label }) => {
          const y = pad.t + (1 - v / (maxV * 1.1)) * (H - pad.t - pad.b);
          return <text key={v} x={pad.l - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#94a3b8">{label}</text>;
        })}
        {/* Area fill */}
        <polygon points={area} fill="url(#vt-grad)" />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke="#4285F4" strokeWidth={2} strokeLinejoin="round" />
        {/* Dots */}
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r={i === peakIdx ? 4 : 2.5}
            fill={i === peakIdx ? "#4285F4" : "white"} stroke="#4285F4" strokeWidth={i === peakIdx ? 0 : 1.5} />
        ))}
        {/* Peak label */}
        <text x={xs[peakIdx]} y={ys[peakIdx] - 7} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#4285F4">
          1,248
        </text>
        <text x={xs[peakIdx]} y={ys[peakIdx] - 16} textAnchor="middle" fontSize={8} fill="#64748b">
          Người xem tối đa
        </text>
        {/* X labels */}
        {VIEWER_TREND.map((d, i) => (
          <text key={i} x={xs[i]} y={H - 4} textAnchor="middle" fontSize={8} fill="#94a3b8">{d.t}</text>
        ))}
      </svg>
    </div>
  );
}

// ── Right panel ───────────────────────────────────────────────────────────────
function RightPanel() {
  const [selPlatforms, setSelPlatforms] = useState<string[]>(["yt", "fb"]);
  const toggle = (id: string) => setSelPlatforms(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const allPlatforms = [
    { id: "yt", label: "YouTube", color: "#FF0000" },
    { id: "fb", label: "Facebook", color: "#1877F2" },
    { id: "gm", label: "Google Meet", color: "#00AC47" },
    { id: "zm", label: "Zoom", color: "#2D8CFF" },
    { id: "rtmp", label: "RTMP", color: "#6B7280" },
  ];
  const health = [
    { label: "Sức khỏe", val: "Tốt",  color: "bg-green-500" },
    { label: "Bitrate",  val: "5 Mbps", color: "bg-green-500" },
    { label: "Độ trễ (Latency)", val: "1.2 s", color: "bg-green-500" },
    { label: "Packet Loss",      val: "0.3%",  color: "bg-yellow-500" },
  ];

  return (
    <div className="w-[260px] flex-shrink-0 space-y-3">
      {/* Quick create button */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
          <BookOpen size={13} /> Hướng dẫn
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-2 text-[12px] font-medium hover:bg-blue-700 transition-colors">
          <Plus size={13} /> Tạo phát mới
        </button>
      </div>

      {/* Quick setup */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Thiết lập phát nhanh</div>
        <div className="space-y-2.5">
          <div>
            <div className="text-[11px] text-gray-500 mb-1">Chọn phòng học</div>
            <button className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
              <span>A101 - Lớp 10A1</span><ChevronDown size={12} className="text-gray-400" />
            </button>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 mb-1">Tiêu đề buổi học</div>
            <input defaultValue="Toán học - Phương trình bậc hai"
              className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none focus:border-blue-300" />
          </div>
          <div>
            <div className="text-[11px] text-gray-500 mb-2">Chọn nền tảng</div>
            <div className="flex gap-1.5 flex-wrap">
              {allPlatforms.map(p => (
                <button key={p.id} onClick={() => toggle(p.id)}
                  className={`relative w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${selPlatforms.includes(p.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                    style={{ backgroundColor: p.color }}>{PLATFORM_LABELS[p.id]}</span>
                  {selPlatforms.includes(p.id) && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={8} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 mb-1">Chất lượng stream</div>
            <button className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
              <span>HD 1080p (Khuyến nghị)</span><ChevronDown size={12} className="text-gray-400" />
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 text-[12px] font-semibold hover:bg-blue-700 transition-colors">
            <Radio size={14} /> Bắt đầu phát ngay
          </button>
        </div>
      </div>

      {/* Selected stream info */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Thông tin stream đang chọn</div>
        <div className="text-[13px] font-bold text-gray-800 mb-0.5">A101 - Lớp 10A1</div>
        <div className="text-[11px] text-gray-500 mb-2">Toán học - Phương trình bậc hai</div>
        <div className="space-y-1 text-[11px] mb-3">
          {[
            ["Giáo viên", "Nguyễn Văn An"],
            ["Bắt đầu",   "09:30"],
            ["Thời lượng","00:11:23"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-gray-400">{k}</span>
              <span className="text-gray-700 font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
          </span>
          <span className="bg-green-100 text-green-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Ổn định</span>
        </div>
      </div>

      {/* Stream health */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Tình trạng stream</div>
        <div className="space-y-1.5">
          {health.map(h => (
            <div key={h.label} className="flex items-center justify-between text-[11px]">
              <span className="text-gray-500">{h.label}</span>
              <span className="flex items-center gap-1.5 font-medium text-gray-700">
                {h.val}
                <span className={`w-2 h-2 rounded-full ${h.color}`} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function StreamingPage() {
  const [gridView, setGridView] = useState(true);

  const stats = [
    {
      icon: <Radio size={18} />, label: "Đang phát", val: 8, sub: null,
      badge: <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5"><span className="w-1 h-1 rounded-full bg-white animate-pulse" />LIVE</span>,
      iconBg: "bg-red-50", iconColor: "text-red-500",
    },
    {
      icon: <Calendar size={18} />, label: "Sắp diễn ra hôm nay", val: 248, sub: "Hiện nay",
      badge: null, iconBg: "bg-blue-50", iconColor: "text-blue-500",
    },
    {
      icon: <Users size={18} />, label: "Người xem hiện tại", val: "1.248", sub: "+18% so với hôm qua",
      badge: null, iconBg: "bg-green-50", iconColor: "text-green-500",
    },
    {
      icon: <Wifi size={18} />, label: "Nền tảng đã kết nối", val: "4/6", sub: "hoạt động",
      badge: null, iconBg: "bg-purple-50", iconColor: "text-purple-500",
    },
    {
      icon: <AlertTriangle size={18} />, label: "Cảnh báo stream", val: 2, sub: "Cần xử lý",
      badge: null, iconBg: "bg-yellow-50", iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="p-4">
      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ backgroundColor: COLORS[s.iconBg] ?? "#4285F4" }}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-0.5">{s.label}</div>
              <div className="text-2xl font-bold text-white leading-none">{s.val}</div>
              {s.badge ?? (s.sub ? <div className="text-[11px] text-white/70 mt-0.5">{s.sub}</div> : null)}
            </div>
          </div>
        ))}
      </div>

      {/* Main content + right panel */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0 space-y-4">
          {/* Live grid */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900/15">
              <div className="text-[13px] font-bold text-gray-800">
                Các buổi học đang phát trực tiếp <span className="text-gray-400 font-normal">({LIVE_STREAMS.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1">
                  <button onClick={() => setGridView(true)} className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${gridView ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}><LayoutGrid size={13} /></button>
                  <button onClick={() => setGridView(false)} className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${!gridView ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}><List size={13} /></button>
                </div>
                <label className="flex items-center gap-1.5 text-[12px] text-gray-600 cursor-pointer">
                  <div className="w-8 h-4 bg-blue-500 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow" />
                  </div>
                  Tự động làm mới
                </label>
                <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
                  <Maximize2 size={13} /> Toàn màn hình
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className={gridView ? "grid grid-cols-4 gap-3" : "space-y-2"}>
                {LIVE_STREAMS.map(s => <StreamCard key={s.id} s={s} />)}
              </div>
            </div>
          </div>

          {/* Platform connections */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="text-[13px] font-bold text-gray-800 mb-3">Nền tảng đã kết nối</div>
            <div className="grid grid-cols-5 gap-3">
              {PLATFORMS.map(p => (
                <div key={p.id} className="border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ backgroundColor: p.color }}>{PLATFORM_LABELS[p.id]}</div>
                  <div className="text-[11px] font-medium text-gray-700 text-center leading-tight">{p.name}</div>
                  <div className={`flex items-center gap-1 text-[10px] font-medium ${p.connected ? "text-green-600" : "text-gray-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.connected ? "bg-green-500" : "bg-gray-300"}`} />
                    {p.connected ? "Đã kết nối" : "Chưa kết nối"}
                  </div>
                  <button className="w-full border border-gray-200 rounded-lg py-1 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
                    Quản lý
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: trend + schedule */}
          <div className="grid grid-cols-2 gap-4">
            {/* Viewer trend */}
            <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[13px] font-bold text-gray-800">Xu hướng người xem trực tiếp</div>
              </div>
              <div className="text-[11px] text-gray-400 mb-3">
                <span className="text-blue-600 font-bold text-[15px]">1.248</span> người xem tối đa lúc 09:30
              </div>
              <ViewerTrendChart />
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[13px] font-bold text-gray-800">Lịch phát sắp tới</div>
                <button className="text-[12px] text-blue-500 hover:underline flex items-center gap-1">Xem tất cả <ArrowRight size={11} /></button>
              </div>
              <div className="space-y-2.5">
                {UPCOMING.map((u, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 text-center bg-blue-50 rounded-lg px-2 py-1 min-w-[80px]">
                      <div className="text-[10px] text-blue-500 font-semibold">{u.time.split(" - ")[0]}</div>
                      <div className="text-[9px] text-blue-400">{u.time.split(" - ")[1]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-gray-800 truncate">{u.room}</div>
                      <div className="text-[11px] text-gray-400 truncate">{u.subject}</div>
                    </div>
                    <span className="flex-shrink-0 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">Sắp diễn ra</span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-gray-400 text-center mt-3">Hiển thị 3 trong tổng số {UPCOMING.length} buổi sắp tới</div>
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  );
}

