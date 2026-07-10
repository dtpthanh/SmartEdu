import { useState } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight, Plus, Download,
  Eye, MoreHorizontal, School, Camera, Activity, Radio,
  AlertTriangle, ArrowUpRight, Info, Calendar,
  FileBarChart, BookOpen, TrendingUp,
} from "lucide-react";

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

// ── Data ──────────────────────────────────────────────────────────────────────
const CHART_DAYS = [
  { d: "29/04", reports: 8,  events: 320 }, { d: "30/04", reports: 6,  events: 280 },
  { d: "01/05", reports: 5,  events: 210 }, { d: "02/05", reports: 9,  events: 350 },
  { d: "03/05", reports: 12, events: 420 }, { d: "04/05", reports: 10, events: 390 },
  { d: "05/05", reports: 7,  events: 260 }, { d: "06/05", reports: 11, events: 400 },
  { d: "07/05", reports: 14, events: 460 }, { d: "08/05", reports: 9,  events: 340 },
  { d: "09/05", reports: 13, events: 480 }, { d: "10/05", reports: 8,  events: 300 },
  { d: "11/05", reports: 15, events: 500 }, { d: "12/05", reports: 11, events: 410 },
  { d: "13/05", reports: 10, events: 370 },
];

const REPORTS = [
  { icon: <School size={14} />,   iconBg: "bg-blue-100",   iconColor: "text-blue-600",   name: "Báo cáo hiệu suất phòng học",     type: "Báo cáo phòng học",  scope: "Tất cả phòng học", creator: "Nguyễn Văn A", time: "13/05/2026 09:21", status: "hoantất" },
  { icon: <AlertTriangle size={14} />, iconBg: "bg-orange-100", iconColor: "text-orange-500", name: "Báo cáo sự kiện bất thường", type: "Báo cáo sự kiện",   scope: "A101 - Lớp 10A1",  creator: "Trần Thị B",   time: "13/05/2026 08:45", status: "hoantất" },
  { icon: <Activity size={14} />, iconBg: "bg-purple-100", iconColor: "text-purple-600", name: "Báo cáo AI - Mức độ tập trung",   type: "Báo cáo AI",         scope: "Tất cả phòng học", creator: "Lê Văn C",     time: "12/05/2026 16:30", status: "dangxuly" },
  { icon: <Camera size={14} />,   iconBg: "bg-gray-100",   iconColor: "text-gray-600",   name: "Báo cáo camera theo khu vực",     type: "Báo cáo camera",     scope: "Tòa nhà A",        creator: "Phạm Thị D",   time: "12/05/2026 10:15", status: "hoantất" },
  { icon: <Radio size={14} />,    iconBg: "bg-red-100",    iconColor: "text-red-500",    name: "Báo cáo livestream tổng hợp",     type: "Báo cáo livestream", scope: "Tất cả phòng học", creator: "Nguyễn Văn A", time: "11/05/2026 14:20", status: "hoantất" },
  { icon: <School size={14} />,   iconBg: "bg-blue-100",   iconColor: "text-blue-600",   name: "Báo cáo hàng tuần",               type: "Báo cáo phòng học",  scope: "Tất cả phòng học", creator: "Trần Thị B",   time: "11/05/2026 08:00", status: "lịch" },
];

const DONUT_DATA = [
  { label: "Báo cáo phòng học", val: 45, pct: 35, color: "#4285F4" },
  { label: "Báo cáo camera",    val: 32, pct: 25, color: "#34A853" },
  { label: "Báo cáo AI",        val: 24, pct: 19, color: "#FBBC05" },
  { label: "Báo cáo sự kiện",   val: 17, pct: 13, color: "#ef4444" },
  { label: "Báo cáo livestream",val: 10, pct: 8,  color: "#8b5cf6" },
];

const TOP_ROOMS = [
  { name: "A101 - Lớp 10A1", score: 86 },
  { name: "A102 - Lớp 10A2", score: 72 },
  { name: "B101 - Lớp 11B1", score: 64 },
  { name: "C201 - Lớp 12C1", score: 58 },
  { name: "D301 - Lớp 12D1", score: 47 },
];

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ s }: { s: string }) {
  if (s === "hoantất")  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">Hoàn tất</span>;
  if (s === "dangxuly") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">Đang xử lý</span>;
  return                       <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600 font-medium">Lên lịch</span>;
}

// ── Dual-axis chart ───────────────────────────────────────────────────────────
function ActivityChart() {
  const W = 580; const H = 180;
  const pad = { l: 38, r: 42, t: 16, b: 28 };
  const cW = W - pad.l - pad.r; const cH = H - pad.t - pad.b;
  const n = CHART_DAYS.length;

  const maxR = 20; const maxE = 500;
  const barW = (cW / n) * 0.55;

  // bars
  const bars = CHART_DAYS.map((d, i) => {
    const x = pad.l + (i / n) * cW + (cW / n - barW) / 2;
    const bH = (d.reports / maxR) * cH;
    return { x, y: H - pad.b - bH, w: barW, h: bH };
  });

  // line
  const lineXs = CHART_DAYS.map((_, i) => pad.l + (i / (n - 1)) * cW);
  const lineYs = CHART_DAYS.map(d => H - pad.b - (d.events / maxE) * cH);
  const linePts = lineXs.map((x, i) => `${x},${lineYs[i]}`).join(" ");

  // Y left labels (reports)
  const yLeftTicks = [0, 10, 20, 30, 40, 50];
  // Y right labels (events)
  const yRightTicks = [0, 100, 200, 300, 400, 500];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 180 }}>
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4285F4" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Gridlines */}
      {yLeftTicks.map(v => {
        const y = H - pad.b - (v / maxR) * cH;
        return <line key={v} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#f1f5f9" strokeWidth={1} />;
      })}
      {/* Y left labels */}
      {yLeftTicks.map(v => {
        const y = H - pad.b - (v / maxR) * cH;
        return <text key={v} x={pad.l - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#94a3b8">{v}</text>;
      })}
      {/* Y right labels */}
      {yRightTicks.map(v => {
        const y = H - pad.b - (v / maxE) * cH;
        return <text key={v} x={W - pad.r + 4} y={y + 3} textAnchor="start" fontSize={8} fill="#94a3b8">{v}</text>;
      })}
      {/* Bars */}
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#bar-grad)" rx={2} />
      ))}
      {/* Line */}
      <polyline points={linePts} fill="none" stroke="#34A853" strokeWidth={2} strokeLinejoin="round" />
      {lineXs.map((x, i) => (
        <circle key={i} cx={x} cy={lineYs[i]} r={2.5} fill="white" stroke="#34A853" strokeWidth={1.5} />
      ))}
      {/* X labels — every 2 */}
      {CHART_DAYS.map((d, i) => {
        if (i % 2 !== 0 && i !== n - 1) return null;
        const x = pad.l + (i / n) * cW + (cW / n) / 2;
        return <text key={i} x={x} y={H - 6} textAnchor="middle" fontSize={8} fill="#94a3b8">{d.d}</text>;
      })}
      {/* Axis lines */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#e2e8f0" strokeWidth={1} />
      <line x1={W - pad.r} y1={pad.t} x2={W - pad.r} y2={H - pad.b} stroke="#e2e8f0" strokeWidth={1} />
    </svg>
  );
}

// ── Donut ─────────────────────────────────────────────────────────────────────
function ReportDonut() {
  const total = 128;
  const r = 55; const cx = 70; const cy = 70;
  let angle = -Math.PI / 2;
  const paths = DONUT_DATA.map(s => {
    const sweep = (s.pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle); const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle); const y2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    const inner = 32;
    const ix1 = cx + inner * Math.cos(angle - sweep); const iy1 = cy + inner * Math.sin(angle - sweep);
    const ix2 = cx + inner * Math.cos(angle); const iy2 = cy + inner * Math.sin(angle);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`;
  });

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <svg width={140} height={140} viewBox="0 0 140 140">
          {paths.map((d, i) => <path key={i} d={d} fill={DONUT_DATA[i].color} />)}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-xl font-bold text-gray-800">{total}</div>
          <div className="text-[9px] text-gray-400 text-center leading-tight">Tổng báo<br />cáo</div>
        </div>
      </div>
      <div className="flex-1 space-y-1.5">
        {DONUT_DATA.map(d => (
          <div key={d.label} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-gray-600">{d.label}</span>
            </span>
            <span className="font-semibold text-gray-700">{d.val} <span className="text-gray-400 font-normal">({d.pct}%)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Top rooms bar chart ───────────────────────────────────────────────────────
function TopRoomsChart() {
  return (
    <div>
      <div className="space-y-2 mb-2">
        {TOP_ROOMS.map((r, i) => (
          <div key={r.name} className="flex items-center gap-2 text-[11px]">
            <span className="w-4 text-gray-400 text-right flex-shrink-0">{i + 1}</span>
            <span className="w-[110px] text-gray-700 font-medium flex-shrink-0 truncate">{r.name}</span>
            <div className="flex-1 h-4 bg-gray-100 rounded-sm overflow-hidden">
              <div className="h-full bg-blue-500 rounded-sm" style={{ width: `${r.score}%` }} />
            </div>
            <span className="w-6 text-right font-semibold text-gray-700 flex-shrink-0">{r.score}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center text-[9px] text-gray-400 pl-6 mt-1">
        <span>0</span>
        {[25, 50, 75, 100].map(v => (
          <span key={v} className="flex-1 text-center">{v}</span>
        ))}
      </div>
      <div className="text-[10px] text-gray-400 text-center mt-0.5">Điểm hoạt động</div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pager() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-900/15 text-[12px] text-gray-500">
      <span>Hiển thị 1 đến 6 trong 128 báo cáo</span>
      <div className="flex items-center gap-1">
        <span className="mr-2 text-[11px] text-gray-400">Số dòng mỗi trang:</span>
        <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">
          10 <ChevronDown size={11} className="text-gray-400" />
        </button>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 ml-1">
          <ChevronLeft size={13} />
        </button>
        {[1, 2, 3].map(p => (
          <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded border text-[12px] font-medium ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>{p}</button>
        ))}
        <span className="px-1">...</span>
        <button onClick={() => setPage(13)} className={`w-7 h-7 rounded border text-[12px] font-medium ${page === 13 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>13</button>
        <button onClick={() => setPage(p => Math.min(13, p + 1))} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function ReportsPage() {
  const thCls = "px-3 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide bg-gray-50";
  const tdCls = "px-3 py-3 text-[12px] text-gray-700 align-middle";

  const stats = [
    { icon: <FileBarChart size={20} />, val: "128",   label: "Tổng báo cáo",             trend: "+18%", iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <TrendingUp size={20} />,  val: "82%",   label: "Tỷ lệ sử dụng phòng",      trend: "+6%",  iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <Activity size={20} />,    val: "2.45 TB", label: "Tổng thời lượng ghi hình", trend: "+12%", iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <AlertTriangle size={20} />, val: "1.248", label: "Sự kiện phân tích",        trend: "+14%", iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Radio size={20} />,       val: "3.256", label: "Lượt xem livestream",        trend: "+21%", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  return (
    <div className="p-4">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4 pb-3">
        <div>
          <div className="text-[20px] font-bold uppercase tracking-[0.08em] text-slate-900">Báo cáo</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm px-4 py-3 mb-4 flex items-center gap-2 flex-wrap">
        {[
          { label: "Khoảng thời gian", val: "15 ngày qua (29/04 - 13/05/2026)" },
          { label: "Tòa nhà / Khu vực", val: "Tất cả tòa nhà" },
          { label: "Loại báo cáo",     val: "Tất cả loại báo cáo" },
          { label: "Phòng học",        val: "Tất cả phòng học" },
        ].map(f => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <div className="text-[10px] text-gray-400">{f.label}</div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50 whitespace-nowrap">
              {f.val} <ChevronDown size={11} className="text-gray-400" />
            </button>
          </div>
        ))}
        <div className="ml-auto flex items-end gap-2">
          <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-2 text-[12px] font-medium hover:bg-blue-700 transition-colors">
            <Plus size={13} /> Tạo báo cáo
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
            <Download size={13} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ backgroundColor: COLORS[s.iconBg] ?? "#4285F4" }}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-0.5 truncate">{s.label}</div>
              <div className="text-xl font-bold text-white leading-none">{s.val}</div>
              <div className="flex items-center gap-1 text-white/70 text-[11px] mt-0.5 font-medium">
                <ArrowUpRight size={11} />{s.trend} so với 15 ngày trước
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content + right panel */}
      <div className="flex gap-4 items-start">
        {/* Left */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Activity chart */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] font-bold text-gray-800">Tổng quan hoạt động theo thời gian</div>
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
                Theo ngày <ChevronDown size={10} className="text-gray-400" />
              </button>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-1">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" />Số báo cáo</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-green-500 inline-block" />Số sự kiện</span>
            </div>
            <ActivityChart />
          </div>

          {/* Recent reports table */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900/15">
              <div className="text-[13px] font-bold text-gray-800">Báo cáo gần đây</div>
              <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
            </div>
            <table className="w-full">
              <thead className="border-b border-gray-900/15">
                <tr>
                  <th className={thCls}>Tên báo cáo</th>
                  <th className={thCls}>Loại</th>
                  <th className={thCls}>Phòng học / Khu vực</th>
                  <th className={thCls}>Người tạo</th>
                  <th className={thCls}>Thời gian</th>
                  <th className={thCls}>Trạng thái</th>
                  <th className={thCls}>Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORTS.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className={tdCls}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg ${r.iconBg} ${r.iconColor} flex items-center justify-center flex-shrink-0`}>{r.icon}</div>
                        <span className="font-medium text-gray-800 text-[12px]">{r.name}</span>
                      </div>
                    </td>
                    <td className={tdCls + " whitespace-nowrap"}>{r.type}</td>
                    <td className={tdCls}>{r.scope}</td>
                    <td className={tdCls}>{r.creator}</td>
                    <td className={tdCls + " font-mono text-[11px] whitespace-nowrap"}>{r.time}</td>
                    <td className={tdCls}><StatusBadge s={r.status} /></td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors">
                          {r.status === "lịch" ? <Calendar size={12} /> : <Download size={12} />}
                        </button>
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><Eye size={12} /></button>
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><MoreHorizontal size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pager />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[300px] flex-shrink-0 space-y-4">
          {/* Donut */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="text-[13px] font-bold text-gray-800 mb-3">Phân bổ báo cáo theo loại</div>
            <ReportDonut />
            <button className="mt-3 w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-[12px] text-blue-600 hover:bg-blue-50 transition-colors">
              Xem chi tiết
            </button>
          </div>

          {/* Top rooms */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-bold text-gray-800">Top phòng học theo mức độ hoạt động</div>
              <button className="text-[11px] text-blue-500 hover:underline flex-shrink-0 ml-1">Xem tất cả</button>
            </div>
            <TopRoomsChart />
          </div>

          {/* Metrics 2-col */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="text-[11px] text-gray-500">Hiệu suất giảng dạy</div>
                <Info size={10} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-800">87%</div>
              <div className="flex items-center gap-1 text-green-600 text-[11px] font-medium mb-2">
                <ArrowUpRight size={11} />8%
              </div>
              <div className="text-[10px] text-gray-400 mb-1.5">Trung bình 15 ngày qua</div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: "87%" }} /></div>
            </div>
            <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[11px] text-gray-500">Mức độ tập trung trung bình</div>
                <button className="text-[10px] text-blue-500 hover:underline flex-shrink-0">Xem chi tiết</button>
              </div>
              <div className="text-2xl font-bold text-gray-800">76%</div>
              <div className="flex items-center gap-1 text-green-600 text-[11px] font-medium mb-2">
                <ArrowUpRight size={11} />6%
              </div>
              <div className="text-[10px] text-gray-400 mb-1.5">Trung bình 15 ngày qua</div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{ width: "76%" }} /></div>
            </div>
          </div>

          {/* Alerts this week */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-bold text-gray-800">Cảnh báo theo tuần</div>
              <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-3xl font-bold text-gray-800">48</div>
                <div className="flex items-center gap-1 text-green-600 text-[11px] font-medium mt-0.5">
                  <ArrowUpRight size={11} />12% so với tuần trước
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Cao",       val: 18, color: "bg-red-500" },
                { label: "Trung bình", val: 20, color: "bg-yellow-400" },
                { label: "Thấp",      val: 10, color: "bg-blue-500" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-[12px]">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                  <span className="text-gray-600 flex-1">{item.label}</span>
                  <span className="font-semibold text-gray-800">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] font-bold text-gray-800">Dung lượng lưu trữ sử dụng</div>
              <button className="text-[11px] text-blue-500 hover:underline">Xem chi tiết</button>
            </div>
            <div className="flex items-end justify-between mb-1.5">
              <div className="text-3xl font-bold text-gray-800">62%</div>
              <div className="text-[12px] text-gray-500">12.45 TB / 20 TB</div>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div className="h-full rounded-full" style={{ width: "62%", background: "linear-gradient(90deg, #4285F4 0%, #60a5fa 100%)" }} />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Còn trống 7.55 TB</span>
              <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-lg px-2 py-0.5">
                <AlertTriangle size={11} className="text-red-500" />
                <span className="text-red-500 font-medium text-[10px]">Sắp đầy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




