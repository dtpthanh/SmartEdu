import { type ReactNode, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  LayoutGrid,
  List,
  Maximize2,
  MoreHorizontal,
  X,
  Plus,
  Radio,
  Search,
  Settings,
  Square,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { siFacebook, siGooglemeet, siYoutube, siZoom, type SimpleIcon } from "simple-icons";
import { LIVE_STREAMS, PLATFORMS, UPCOMING, VIEWER_TREND } from "../../data/streaming";

type Stream = typeof LIVE_STREAMS[number];
type Section = "live" | "create";
type StatCardColor = "bg-blue-50" | "bg-green-50" | "bg-orange-50" | "bg-purple-50" | "bg-red-50";

// Kept in sync with the Dashboard status-card palette.
const STAT_CARD_COLORS: Record<StatCardColor, string> = {
  "bg-blue-50": "#0147b8",
  "bg-green-50": "#008000",
  "bg-orange-50": "#e28103",
  "bg-purple-50": "#6e0883",
  "bg-red-50": "#dd1200",
};

const SIMPLE_PLATFORM_LOGOS: Record<string, SimpleIcon> = {
  yt: siYoutube,
  fb: siFacebook,
  zm: siZoom,
  gm: siGooglemeet,
};

const qualityOptions = ["1080p", "720p", "480p"];
const cameraOptions = ["Camera toàn lớp", "Camera giáo viên", "Camera bảng", "Camera PTZ"];
const panelTitleClass = "font-bold text-slate-800 dark:text-slate-100";
const mutedTextClass = "text-slate-500 dark:text-slate-400";
const subtleTextClass = "text-slate-400 dark:text-slate-500";
const softItemClass = "border border-slate-100 bg-white/70 dark:border-slate-700/70 dark:bg-white/[0.04]";
const softControlClass =
  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800/80";
const softInputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-blue-400";
const streamStatusClasses = {
  live: {
    badge: "border border-rose-200 bg-rose-50 text-rose-700 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200",
    dot: "bg-rose-500 dark:bg-rose-300",
  },
  healthy: "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200",
  attention: "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-200",
  connected: {
    text: "text-teal-600 dark:text-teal-300",
    dot: "bg-teal-500 dark:bg-teal-300",
  },
  disconnected: {
    text: "text-slate-400 dark:text-slate-500",
    dot: "bg-slate-300 dark:bg-slate-600",
  },
  stopped:
    "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  stopAction:
    "border-[#dd1200]/80 bg-gradient-to-br from-[#dd1200] to-[#bd0f00] text-white shadow-[0_6px_14px_rgba(221,18,0,0.24)] transition-all hover:-translate-y-px hover:from-[#ed2614] hover:to-[#c71000] hover:shadow-[0_8px_18px_rgba(221,18,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dd1200]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
};

function TeamsLogo({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}>
      <rect x="2.5" y="5" width="9.6" height="14" rx="2.8" fill="#6264A7" />
      <rect x="9.8" y="4.5" width="11.7" height="15" rx="3" fill="#7B83EB" />
      <rect x="13.3" y="7.2" width="1.7" height="2.1" rx="0.5" fill="#FFFFFF" />
      <path d="M12.1 10.1h4.1v1.5H14.8v5.2h-1.4v-5.2h-1.3z" fill="#FFFFFF" />
      <circle cx="18.2" cy="9.1" r="2.1" fill="#B4B9F6" />
    </svg>
  );
}

function PlatformMark({ id, size = 24 }: { id: string; size?: number }) {
  const platform = PLATFORMS.find(item => item.id === id);
  const simpleIcon = SIMPLE_PLATFORM_LOGOS[id];

  return (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950"
      style={{ width: size, height: size }}
      title={platform?.name}
    >
      {simpleIcon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="block"
          style={{ width: Math.max(size - 8, 12), height: Math.max(size - 8, 12), color: `#${simpleIcon.hex}` }}
        >
          <path d={simpleIcon.path} fill="currentColor" />
        </svg>
      ) : id === "tm" ? (
        <TeamsLogo size={Math.max(size - 4, 14)} />
      ) : (
        <Radio size={Math.max(size - 10, 12)} className="text-slate-500" />
      )}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  sub: string;
  color: StatCardColor;
}) {
  return (
    <div
      className="rounded-2xl border border-white/50 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.10)] ring-1 ring-black/5"
      style={{ background: `linear-gradient(135deg, ${STAT_CARD_COLORS[color]} 0%, ${STAT_CARD_COLORS[color]}dd 100%)` }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/20 text-white shadow-inner shadow-white/10">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-white/75">{label}</div>
          <div className="text-2xl font-bold leading-none text-white">{value}</div>
          <div className="mt-0.5 truncate text-[11px] text-white/75">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${streamStatusClasses.live.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${streamStatusClasses.live.dot}`} />
      LIVE
    </span>
  );
}

function HealthBadge({ health }: { health: string }) {
  const attention = health !== "Ổn định";
  const statusClass = attention ? streamStatusClasses.attention : streamStatusClasses.healthy;

  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass}`}>
      {health}
    </span>
  );
}

function StreamCard({ stream, onStop, isStopped, onOpen }: { stream: Stream; onStop?: (id: string) => void; isStopped?: boolean; onOpen?: (id: string) => void }) {
  return (
    <article onClick={() => onOpen?.(stream.id)} className="app-surface app-surface-hover overflow-hidden cursor-pointer">
      <div className="relative">
        <img src={stream.img} alt={`${stream.room} - ${stream.className}`} className="h-[150px] w-full object-cover" />
        <div className="absolute left-3 top-3">
          <LiveBadge />
        </div>
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
          <Users size={12} />
          {stream.viewers}
        </div>
        <button className="app-icon-btn absolute bottom-3 right-3 h-8 w-8 border-white/20 bg-black/40 text-white hover:bg-black/55 hover:text-white" title="Mở toàn màn hình" onClick={(e) => e.stopPropagation()}>
          <Maximize2 size={14} />
        </button>
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-bold text-slate-800 dark:text-slate-100">{stream.room} - {stream.className}</div>
            <div className={`truncate text-[11px] ${subtleTextClass}`}>{stream.subject} · {stream.lesson}</div>
          </div>
          <HealthBadge health={stream.health} />
        </div>
        <div className={`mb-3 grid grid-cols-2 gap-2 text-[11px] ${mutedTextClass}`}>
          <div className="rounded-lg bg-slate-50 px-2 py-1.5 dark:bg-slate-800/70">
            <div className={subtleTextClass}>Giáo viên</div>
            <div className="truncate font-semibold text-slate-700 dark:text-slate-200">{stream.teacher}</div>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-1.5 dark:bg-slate-800/70">
            <div className={subtleTextClass}>Bắt đầu</div>
            <div className="font-semibold text-slate-700 dark:text-slate-200">{stream.startTime} · {stream.duration}</div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {stream.platforms.map(id => <PlatformMark key={id} id={id} size={24} />)}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button className="app-icon-btn h-8 w-8" title="Cài đặt phiên live" onClick={(e) => e.stopPropagation()}>
                <Settings size={13} />
              </button>
              <button className="app-icon-btn h-8 w-8" title="Thao tác khác" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal size={13} />
              </button>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onStop?.(stream.id); }}
              className={`inline-flex flex-shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors ${isStopped ? streamStatusClasses.stopped : streamStatusClasses.stopAction}`}
              title={isStopped ? "Đã dừng" : "Dừng live"}
            >
              {!isStopped && <Square size={9} fill="currentColor" aria-hidden="true" />}
              {isStopped ? "Đã dừng" : "Dừng live"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StreamRow({ stream, onStop, isStopped, onOpen }: { stream: Stream; onStop?: (id: string) => void; isStopped?: boolean; onOpen?: (id: string) => void }) {
  return (
    <div onClick={() => onOpen?.(stream.id)} className="grid grid-cols-[minmax(220px,1.4fr)_minmax(150px,1fr)_110px_130px_92px] items-center gap-3 rounded-xl border border-slate-100 bg-white/70 p-3 text-[12px] transition-colors hover:bg-blue-50/40 dark:border-slate-700/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.06] cursor-pointer">
      <div className="flex min-w-0 items-center gap-3">
        <img src={stream.img} alt={`${stream.room} - ${stream.className}`} className="h-14 w-20 rounded-lg object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <LiveBadge />
            <span className="truncate font-bold text-slate-800 dark:text-slate-100">{stream.room} - {stream.className}</span>
          </div>
          <div className={`mt-1 truncate ${subtleTextClass}`}>{stream.subject} · {stream.lesson}</div>
        </div>
      </div>
      <div className="min-w-0">
        <div className="truncate font-semibold text-slate-700 dark:text-slate-200">{stream.teacher}</div>
        <div className={`truncate ${subtleTextClass}`}>{stream.camera}</div>
      </div>
      <div className="font-semibold text-slate-700 dark:text-slate-200">{stream.viewers} xem</div>
      <div className="flex items-center gap-1">
        {stream.platforms.map(id => <PlatformMark key={id} id={id} size={24} />)}
      </div>
      <div className="flex items-center gap-2">
        <HealthBadge health={stream.health} />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onStop?.(stream.id); }}
          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors ${isStopped ? streamStatusClasses.stopped : streamStatusClasses.stopAction}`}
          title={isStopped ? "Đã dừng" : "Dừng live"}
        >
              {!isStopped && <Square size={9} fill="currentColor" aria-hidden="true" />}
              {isStopped ? "Đã dừng" : "Dừng"}
        </button>
      </div>
    </div>
  );
}

function ViewerTrendChart() {
  const width = 560;
  const height = 220;
  const pad = { left: 34, right: 12, top: 10, bottom: 22 };
  const maxValue = Math.max(...VIEWER_TREND.map(item => item.v));
  const points = VIEWER_TREND.map((item, index) => {
    const x = pad.left + (index / (VIEWER_TREND.length - 1)) * (width - pad.left - pad.right);
    const y = pad.top + (1 - item.v / (maxValue * 1.1)) * (height - pad.top - pad.bottom);
    return { x, y, ...item };
  });
  const line = points.map(point => `${point.x},${point.y}`).join(" ");
  const area = `${points[0].x},${height - pad.bottom} ${line} ${points[points.length - 1].x},${height - pad.bottom}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block h-full w-full">
      <defs>
        <linearGradient id="viewer-trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map(value => {
        const y = pad.top + (1 - value) * (height - pad.top - pad.bottom);
        return <line key={value} x1={pad.left} y1={y} x2={width - pad.right} y2={y} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth={1} />;
      })}
      <polygon points={area} fill="url(#viewer-trend-fill)" />
      <polyline points={line} fill="none" stroke="#4285F4" strokeLinejoin="round" strokeWidth={2.4} />
      {points.map(point => (
        <g key={point.t}>
          <circle cx={point.x} cy={point.y} r={3} className="fill-white dark:fill-slate-900" stroke="#4285F4" strokeWidth={1.6} />
          <text x={point.x} y={height - 5} textAnchor="middle" fontSize={8} className="fill-slate-400 dark:fill-slate-500">{point.t}</text>
        </g>
      ))}
    </svg>
  );
}

function ConnectedPlatforms({ compact = false }: { compact?: boolean }) {
  return (
    <div className="app-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className={`text-[14px] ${panelTitleClass}`}>Nền tảng đã kết nối</div>
        <button className="app-icon-btn h-8 w-8" title="Cài đặt nền tảng">
          <Settings size={13} />
        </button>
      </div>
      {compact ? (
        <div className="space-y-2">
          {PLATFORMS.map(platform => (
            <div key={platform.id} className={`flex min-w-0 items-center gap-2 rounded-xl px-2.5 py-2 ${softItemClass}`}>
              <PlatformMark id={platform.id} size={32} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-bold text-slate-800 dark:text-slate-100">{platform.name}</div>
                <div className={`flex min-w-0 items-center gap-1 text-[10px] font-semibold ${platform.connected ? streamStatusClasses.connected.text : streamStatusClasses.disconnected.text}`}>
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${platform.connected ? streamStatusClasses.connected.dot : streamStatusClasses.disconnected.dot}`} />
                  {platform.connected ? "Đã kết nối" : "Chưa kết nối"}
                </div>
              </div>
              <button className="flex-shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold transition-colors border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/80">
                Quản lý
              </button>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {PLATFORMS.map(platform => (
          <div key={platform.id} className={`min-w-0 rounded-xl p-3 ${softItemClass}`}>
            <div className="flex min-w-0 items-center gap-2">
              <PlatformMark id={platform.id} size={36} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-bold text-slate-800 dark:text-slate-100">{platform.name}</div>
                <div className={`flex min-w-0 items-center gap-1 text-[10px] font-semibold ${platform.connected ? streamStatusClasses.connected.text : streamStatusClasses.disconnected.text}`}>
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${platform.connected ? streamStatusClasses.connected.dot : streamStatusClasses.disconnected.dot}`} />
                  {platform.connected ? "Đã kết nối" : "Chưa kết nối"}
                </div>
              </div>
              <button className="flex-shrink-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/80">
                Quản lý
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
function CreateLiveSection() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(["yt", "fb"]);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-3">
        <form className="app-surface overflow-hidden">
          <div className="border-b border-slate-200/70 px-4 py-3 dark:border-slate-700/70">
            <div className="text-[16px] font-bold text-slate-800 dark:text-slate-100">Tạo phiên live mới</div>
            <div className={`mt-0.5 text-[12px] ${mutedTextClass}`}>Thiết lập lớp, camera, nền tảng và lịch phát</div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-2">
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Phòng học</span>
              <button type="button" className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${softControlClass}`}>
                A101 - Lớp 10A1
                <ChevronDown size={15} className={subtleTextClass} />
              </button>
            </label>
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Giáo viên phụ trách</span>
              <input defaultValue="Nguyễn Văn An" className={softInputClass} />
            </label>
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Môn học</span>
              <input defaultValue="Toán học" className={softInputClass} />
            </label>
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Tên bài học</span>
              <input defaultValue="Phương trình bậc hai" className={softInputClass} />
            </label>
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Thời gian bắt đầu</span>
              <input type="datetime-local" defaultValue="2026-07-13T10:30" className={softInputClass} />
            </label>
            <label className={`space-y-1.5 text-[12px] ${mutedTextClass}`}>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Thời lượng dự kiến</span>
              <button type="button" className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${softControlClass}`}>
                45 phút
                <ChevronDown size={15} className={subtleTextClass} />
              </button>
            </label>
            <div className="space-y-2 lg:col-span-2">
              <div className="text-[12px] font-semibold text-slate-700 dark:text-slate-200">Camera sử dụng</div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {cameraOptions.map((item, index) => (
                  <button key={item} type="button" className={`rounded-xl border px-3 py-2.5 text-left text-[12px] transition-colors ${index === 0 ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-400/60 dark:bg-blue-500/15 dark:text-blue-200" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800/80"}`}>
                    <Video size={14} className="mb-1" />
                    <span className="font-semibold">{item}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <div className="text-[12px] font-semibold text-slate-700 dark:text-slate-200">Chất lượng phát</div>
              <div className="flex flex-wrap gap-2">
                {qualityOptions.map((item, index) => (
                  <button key={item} type="button" className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors ${index === 0 ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-400/60 dark:bg-blue-500/15 dark:text-blue-200" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800/80"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <div className="text-[12px] font-semibold text-slate-700 dark:text-slate-200">Nền tảng phát</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-2">
                {PLATFORMS.map(platform => {
                  const selected = selectedPlatforms.includes(platform.id);

                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className={`relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${selected ? "border-blue-300 bg-blue-50 dark:border-blue-400/60 dark:bg-blue-500/15" : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-800/80"}`}
                    >
                      <PlatformMark id={platform.id} size={32} />
                      <span className="min-w-0">
                        <span className="block truncate text-[12px] font-bold text-slate-800 dark:text-slate-100">{platform.name}</span>
                        <span className={`block text-[10px] font-semibold ${platform.connected ? streamStatusClasses.connected.text : streamStatusClasses.disconnected.text}`}>
                          {platform.connected ? "Sẵn sàng" : "Chưa kết nối"}
                        </span>
                      </span>
                      {selected && (
                        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                          <Check size={10} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </form>

        <div className="flex justify-end">
          <button type="button" className="app-primary-action inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold">
            <Radio size={14} />
            Tạo phiên live
          </button>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="app-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className={`text-[14px] ${panelTitleClass}`}>Phiên sắp tới</div>
            <button className="flex items-center gap-1 text-[12px] font-semibold text-blue-500 hover:underline dark:text-blue-300" type="button">
              Xem tất cả <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {UPCOMING.map(item => (
              <div key={`${item.room}-${item.time}`} className={`rounded-xl p-3 ${softItemClass}`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">{item.time}</span>
                  <span className={`text-[10px] font-semibold ${subtleTextClass}`}>{item.room}</span>
                </div>
                <div className="text-[12px] font-bold text-slate-800 dark:text-slate-100">{item.className}</div>
                <div className={`truncate text-[11px] ${subtleTextClass}`}>{item.subject} · {item.lesson}</div>
                <div className="mt-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300">{item.teacher}</div>
              </div>
            ))}
          </div>
        </div>
        <ConnectedPlatforms compact />
      </aside>
    </div>
  );
}

function LiveListSection({ gridView, setGridView, stoppedIds, onStop, onOpen }: { gridView: boolean; setGridView: (value: boolean) => void; stoppedIds: string[]; onStop: (id: string) => void; onOpen?: (id: string) => void }) {
  const [page, setPage] = useState(0);
  const visibleStreams = LIVE_STREAMS.filter(stream => !stoppedIds.includes(stream.id));
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(visibleStreams.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const pagedStreams = visibleStreams.slice(safePage * pageSize, safePage * pageSize + pageSize);
  const pageNumbers = totalPages <= 4 ? Array.from({ length: totalPages }, (_, index) => index + 1) : [1, 2, 3, 4];
  const showEllipsis = totalPages > 4;
  const pageStart = visibleStreams.length === 0 ? 0 : safePage * pageSize + 1;
  const pageEnd = visibleStreams.length === 0 ? 0 : Math.min((safePage + 1) * pageSize, visibleStreams.length);

  return (
    <div className="space-y-4">
      <div className="app-toolbar overflow-hidden">
        <div className="app-toolbar-strip flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-[17px] font-bold text-slate-800 dark:text-slate-100">
            Danh sách lớp đang live <span className={`font-normal ${subtleTextClass}`}>({visibleStreams.length})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="app-toolbar-control flex h-10 items-center gap-2 px-3">
              <Search size={14} className={subtleTextClass} />
              <input placeholder="Tìm lớp, phòng, giáo viên" className="w-48 bg-transparent text-[12px] text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" />
            </div>
            <div className="flex h-10 items-center overflow-hidden rounded-full border border-slate-200 bg-slate-100/80 p-1 shadow-inner dark:border-slate-700 dark:bg-slate-900/70">
              <button onClick={() => setGridView(true)} className={`app-icon-btn h-8 w-9 rounded-full border-0 transition-all ${gridView ? "-translate-y-0.5 bg-white text-blue-600 shadow-md shadow-blue-100 dark:bg-slate-700 dark:text-blue-200 dark:shadow-none" : "bg-transparent text-slate-500 shadow-none hover:bg-white/70 dark:text-slate-400 dark:hover:bg-slate-800/80"}`} title="Xem dạng lưới">
                <LayoutGrid size={14} />
              </button>
              <button onClick={() => setGridView(false)} className={`app-icon-btn h-8 w-9 rounded-full border-0 transition-all ${!gridView ? "-translate-y-0.5 bg-white text-blue-600 shadow-md shadow-blue-100 dark:bg-slate-700 dark:text-blue-200 dark:shadow-none" : "bg-transparent text-slate-500 shadow-none hover:bg-white/70 dark:text-slate-400 dark:hover:bg-slate-800/80"}`} title="Xem dạng danh sách">
                <List size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="min-w-0">
            {pagedStreams.length > 0 ? (
              gridView ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {pagedStreams.map(stream => (
                    <StreamCard key={stream.id} stream={stream} isStopped={stoppedIds.includes(stream.id)} onStop={onStop} onOpen={onOpen} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 overflow-x-auto pb-1">
                  {pagedStreams.map(stream => (
                    <StreamRow key={stream.id} stream={stream} isStopped={stoppedIds.includes(stream.id)} onStop={onStop} onOpen={onOpen} />
                  ))}
                </div>
              )
            ) : (
              <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 text-[12px] font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                Không còn lớp nào đang live
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-[12px] text-gray-500">
            <span>
              Hiển thị {pageStart} - {pageEnd} trong tổng số {visibleStreams.length} lớp live
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={safePage === 0}
                onClick={() => setPage(current => Math.max(0, current - 1))}
                className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800/80"
              >
                <ChevronLeft size={13} />
              </button>
              {pageNumbers.map(number => {
                const active = number - 1 === safePage;

                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number - 1)}
                    className={`w-7 h-7 rounded border text-[12px] font-medium ${active ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {number}
                  </button>
                );
              })}
              {showEllipsis && <span className="px-1">...</span>}
              {showEllipsis && (
                <button
                  type="button"
                  onClick={() => setPage(totalPages - 1)}
                  className={`w-7 h-7 rounded border text-[12px] font-medium ${safePage === totalPages - 1 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                  aria-current={safePage === totalPages - 1 ? "page" : undefined}
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setPage(current => Math.min(totalPages - 1, current + 1))}
                className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800/80"
                disabled={safePage === totalPages - 1}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="app-surface flex min-h-[320px] flex-col p-4">
          <div className="mb-1 flex items-center justify-between">
            <div className={`text-[16px] ${panelTitleClass}`}>Xu hướng người xem trực tiếp</div>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">Hôm nay</span>
          </div>
          <div className={`mb-3 text-[11px] ${mutedTextClass}`}>
            Cao nhất <span className="text-[15px] font-bold text-blue-600 dark:text-blue-300">1.248</span> người xem lúc 09:30
          </div>
          <div className="min-h-0 flex-1">
            <ViewerTrendChart />
          </div>
        </div>
        <div className="app-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className={`text-[13px] ${panelTitleClass}`}>Lịch phát sắp tới</div>
            <Link to="/events" className="flex items-center gap-1 text-[12px] font-semibold text-blue-500 hover:underline dark:text-blue-300">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {UPCOMING.map(item => (
              <div key={`${item.room}-${item.time}`} className={`flex items-center gap-3 rounded-xl p-2.5 ${softItemClass}`}>
                <div className="min-w-[86px] rounded-lg bg-blue-50 px-2 py-1 text-center dark:bg-blue-500/15">
                  <div className="text-[10px] font-bold text-blue-600 dark:text-blue-200">{item.time.split(" - ")[0]}</div>
                  <div className="text-[9px] font-semibold text-blue-400 dark:text-blue-300">{item.time.split(" - ")[1]}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-bold text-slate-800 dark:text-slate-100">{item.room} - {item.className}</div>
                  <div className={`truncate text-[11px] ${subtleTextClass}`}>{item.subject} · {item.teacher}</div>
                </div>
                <Calendar size={15} className="flex-shrink-0 text-blue-500 dark:text-blue-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConnectedPlatforms />
    </div>
  );
}

export default function StreamingPage() {
  const [section, setSection] = useState<Section>("live");
  const [gridView, setGridView] = useState(true);
  const [stoppedIds, setStoppedIds] = useState<string[]>([]);
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);
  const totalViewers = useMemo(() => LIVE_STREAMS.reduce((sum, stream) => sum + stream.viewers, 0), []);
  const attentionCount = LIVE_STREAMS.filter(stream => stream.health !== "Ổn định").length;

  const stopStream = (id: string) => {
    setStoppedIds(current => (current.includes(id) ? current : [...current, id]));
  };

  const openStream = (id: string) => setSelectedStreamId(id);
  const closeStream = () => setSelectedStreamId(null);

  return (
    <div className="app-page">
      <div className="app-grid-stats mb-4">
        <StatCard icon={<Radio size={18} />} label="Lớp đang live" value={LIVE_STREAMS.length} sub="Đang phát trực tiếp" color="bg-blue-50" />
        <StatCard icon={<Users size={18} />} label="Người xem" value={totalViewers.toLocaleString("vi-VN")} sub="Tổng người xem hiện tại" color="bg-green-50" />
        <StatCard icon={<Wifi size={18} />} label="Nền tảng" value={`${PLATFORMS.filter(item => item.connected).length}/${PLATFORMS.length}`} sub="Sẵn sàng phát" color="bg-orange-50" />
        <StatCard icon={<Clock3 size={18} />} label="Sắp tới" value={UPCOMING.length} sub="Phiên đã lên lịch" color="bg-purple-50" />
        <StatCard icon={<AlertTriangle size={18} />} label="Cần chú ý" value={attentionCount} sub="Tín hiệu cần kiểm tra" color="bg-red-50" />
      </div>

      <div className="app-surface mb-4 overflow-hidden">
        <div className="app-tabs">
          <button className="app-tab inline-flex items-center gap-2" data-active={section === "live"} onClick={() => setSection("live")}>
            <Eye size={14} />
            Đang live
          </button>
          <button className="app-tab inline-flex items-center gap-2" data-active={section === "create"} onClick={() => setSection("create")}>
            <Plus size={14} />
            Tạo phiên live
          </button>
        </div>
      </div>

      {section === "live" ? (
        <LiveListSection gridView={gridView} setGridView={setGridView} stoppedIds={stoppedIds} onStop={stopStream} onOpen={openStream} />
      ) : (
        <CreateLiveSection />
      )}

      {selectedStreamId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeStream} />
          <div className="relative z-10 w-[min(900px,95%)]">
            <div className="rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <div className="flex items-center justify-end border-b border-slate-100 p-2 dark:border-slate-800">
                <button className="app-icon-btn" onClick={closeStream} title="Đóng">
                  <X />
                </button>
              </div>
              <div className="p-4">
                {(() => {
                  const stream = LIVE_STREAMS.find(s => s.id === selectedStreamId);
                  return stream ? <StreamCard stream={stream} isStopped={stoppedIds.includes(stream.id)} onStop={stopStream} onOpen={() => {}} /> : null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
