import { useState } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight, X, Play,
  Eye, MoreHorizontal, Download, Search, SlidersHorizontal,
  Volume2, MessageCircle, Smartphone, DoorOpen, UserX,
  Megaphone, Thermometer, Camera, Monitor, Shield,
  AlertOctagon, HandMetal, Focus, Check, Clock,
  BookOpen, CalendarDays, School, FileDown,
} from "lucide-react";
import { EVENTS_LIST, HISTORY_LIST, CHART_DATA, EVENT_DETAIL } from "../../data/events";

type MainView  = "list" | "history";
type PanelTab  = "info" | "media" | "log";

// ── Helpers ───────────────────────────────────────────────────────────────────
function levelBadge(l: string) {
  if (l === "Cao")        return <span className="text-[11px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">Cao</span>;
  if (l === "Trung bình") return <span className="text-[11px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium">Trung bình</span>;
  return                         <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">Thấp</span>;
}
function statusBadge(s: string) {
  if (s === "daxuly")   return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">Đã xử lý</span>;
  if (s === "choduyet") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600 font-medium">Chờ duyệt</span>;
  return                       <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">Chưa xử lý</span>;
}
function eventIcon(type: string) {
  const cls = "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0";
  if (type.includes("ồn"))         return <div className={`${cls} bg-orange-100`}><Volume2 size={14} className="text-orange-500" /></div>;
  if (type.includes("chuyện"))     return <div className={`${cls} bg-blue-100`}><MessageCircle size={14} className="text-blue-500" /></div>;
  if (type.includes("điện thoại")) return <div className={`${cls} bg-yellow-100`}><Smartphone size={14} className="text-yellow-500" /></div>;
  if (type.includes("rời"))        return <div className={`${cls} bg-yellow-100`}><UserX size={14} className="text-yellow-500" /></div>;
  if (type.includes("tay"))        return <div className={`${cls} bg-green-100`}><HandMetal size={14} className="text-green-500" /></div>;
  if (type.includes("tập trung"))  return <div className={`${cls} bg-orange-100`}><Focus size={14} className="text-orange-500" /></div>;
  if (type.includes("nhiệt"))      return <div className={`${cls} bg-red-100`}><Thermometer size={14} className="text-red-500" /></div>;
  if (type.includes("khuất"))      return <div className={`${cls} bg-gray-100`}><Camera size={14} className="text-gray-500" /></div>;
  if (type.includes("chiếu"))      return <div className={`${cls} bg-gray-100`}><Monitor size={14} className="text-gray-500" /></div>;
  if (type.includes("Xâm"))        return <div className={`${cls} bg-red-100`}><Shield size={14} className="text-red-500" /></div>;
  if (type.includes("cấm"))        return <div className={`${cls} bg-orange-100`}><AlertOctagon size={14} className="text-orange-500" /></div>;
  return                                   <div className={`${cls} bg-gray-100`}><Megaphone size={14} className="text-gray-500" /></div>;
}

const thCls = "px-3 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap bg-gray-50";
const tdCls = "px-3 py-3 text-[12px] text-gray-700 align-middle";

// ── Pagination ────────────────────────────────────────────────────────────────
function Pager({ total, unit, last }: { total: number; unit: string; last: number }) {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-900/15 text-[12px] text-gray-500">
      <span>Hiển thị 1 - 10 trong tổng số {total} {unit}</span>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
          <ChevronLeft size={13} />
        </button>
        {[1,2,3,4,5].map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={`w-7 h-7 rounded border text-[12px] font-medium ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
            {p}
          </button>
        ))}
        <span className="px-1">...</span>
        <button onClick={() => setPage(last)}
          className={`w-7 h-7 rounded border text-[12px] font-medium ${page === last ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
          {last}
        </button>
        <button onClick={() => setPage(p => Math.min(last, p + 1))}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
          <ChevronRight size={13} />
        </button>
        <div className="flex items-center gap-1 ml-2 border border-gray-200 rounded px-2 py-1">
          <span>10 / trang</span><ChevronDown size={11} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// ── Action buttons ────────────────────────────────────────────────────────────
function ActionBtns() {
  return (
    <div className="flex items-center gap-1">
      <button className="app-icon-btn"><Eye size={12} /></button>
      <button className="app-icon-btn"><MoreHorizontal size={12} /></button>
    </div>
  );
}

// ── Chart (pure CSS — avoids recharts duplicate-key bug with stackId) ─────────
function EventChart() {
  const maxTotal = Math.max(...CHART_DATA.map(d => d.cao + d.tb + d.thap));
  return (
    <div className="app-surface p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-bold text-gray-800">Sự kiện theo thời gian</div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
          Theo giờ <ChevronDown size={11} className="text-gray-400" />
        </button>
      </div>
      {/* Y-axis labels + bars */}
      <div className="flex gap-3">
        {/* Y labels */}
        <div className="flex flex-col justify-between text-[9px] text-gray-400 text-right pb-5" style={{ height: 180 }}>
          {[60, 40, 20, 0].map(v => <span key={v}>{v}</span>)}
        </div>
        {/* Chart area */}
        <div className="flex-1">
          <div className="flex items-end gap-1" style={{ height: 160 }}>
            {CHART_DATA.map(d => {
              const total = d.cao + d.tb + d.thap;
              const h = (total / maxTotal) * 160;
              return (
                <div key={d.hour} className="flex-1 flex flex-col justify-end group relative" style={{ height: 160 }}>
                  <div className="w-full rounded-t overflow-hidden" style={{ height: h }}>
                    <div style={{ height: `${(d.cao / total) * 100}%`, backgroundColor: "#ef4444" }} />
                    <div style={{ height: `${(d.tb  / total) * 100}%`, backgroundColor: "#FBBC05" }} />
                    <div style={{ height: `${(d.thap / total) * 100}%`, backgroundColor: "#4285F4" }} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10 pointer-events-none">
                    <div className="bg-gray-800 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap">
                      <div>Cao: {d.cao}</div>
                      <div>TB: {d.tb}</div>
                      <div>Thấp: {d.thap}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* X labels */}
          <div className="flex gap-1 mt-1">
            {CHART_DATA.map(d => (
              <div key={d.hour} className="flex-1 text-center text-[9px] text-gray-400">{d.hour}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block bg-red-500" />Cao</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block bg-orange-500" />Trung bình</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm inline-block bg-blue-500" />Thấp</span>
      </div>
    </div>
  );
}

// ── Main events table ─────────────────────────────────────────────────────────
function EventsTable({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="app-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900/15">
        <div className="text-[13px] font-bold text-gray-800">
          Danh sách sự kiện <span className="text-gray-400 font-normal">(156)</span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50"><BookOpen size={13} /> Đánh dấu đã đọc</button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50"><FileDown size={13} /> Xuất danh sách</button>
        </div>
      </div>
      <table className="w-full">
        <thead className="border-b border-gray-900/15">
          <tr>
            <th className="pl-4 pr-2 py-3 bg-gray-50"><input type="checkbox" className="rounded" /></th>
            <th className={thCls}>Thời gian</th>
            <th className={thCls}>Phòng học</th>
            <th className={thCls}>Loại sự kiện</th>
            <th className={thCls}>Mức độ</th>
            <th className={thCls}>Mô tả</th>
            <th className={thCls}>Phát hiện bởi</th>
            <th className={thCls}>Trạng thái</th>
            <th className={thCls}>Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {EVENTS_LIST.map((e, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={onSelect}>
              <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" onClick={ev => ev.stopPropagation()} /></td>
              <td className={tdCls + " font-mono text-[12px] font-semibold"}>{e.time}</td>
              <td className={tdCls + " whitespace-nowrap"}>{e.room}</td>
              <td className={tdCls}>
                <div className="flex items-center gap-2">{eventIcon(e.type)}<span>{e.type}</span></div>
              </td>
              <td className={tdCls}>{levelBadge(e.level)}</td>
              <td className={tdCls + " text-gray-500 max-w-[200px] truncate"}>{e.desc}</td>
              <td className={tdCls}>{e.by}</td>
              <td className={tdCls}>{statusBadge(e.status)}</td>
              <td className={tdCls}><ActionBtns /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pager total={156} unit="sự kiện" last={16} />
    </div>
  );
}

// ── History table ─────────────────────────────────────────────────────────────
function HistoryTable({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="app-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900/15">
        <div>
          <div className="text-[13px] font-bold text-gray-800">Lịch sử xử lý sự kiện <span className="text-gray-400 font-normal">(72)</span></div>
          <div className="text-[11px] text-gray-400 mt-0.5">Theo dõi toàn bộ sự kiện đã được hệ thống xử lý</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5">
            <Search size={12} className="text-gray-400" />
            <input className="text-[12px] outline-none placeholder-gray-400 bg-transparent w-36" placeholder="Tìm trong lịch sử..." />
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">Tất cả kết quả <ChevronDown size={11} className="text-gray-400" /></button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">Mới nhất <ChevronDown size={11} className="text-gray-400" /></button>
          <button className="app-icon-btn"><Download size={13} /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-900/15">
            <tr>
              <th className="pl-4 pr-2 py-3 bg-gray-50"><input type="checkbox" className="rounded" /></th>
              <th className={thCls}>Thời gian</th>
              <th className={thCls}>Sự kiện</th>
              <th className={thCls}>Phòng học</th>
              <th className={thCls}>Thiết bị</th>
              <th className={thCls}>Mức độ</th>
              <th className={thCls}>Kết quả xử lý</th>
              <th className={thCls}>Xử lý bởi</th>
              <th className={thCls}>Thời gian xử lý</th>
              <th className={thCls}>Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {HISTORY_LIST.map((h, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={onSelect}>
                <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" onClick={ev => ev.stopPropagation()} /></td>
                <td className={tdCls}>
                  <div className="font-mono text-[12px] font-semibold text-gray-800">{h.time}</div>
                  <div className="text-[10px] text-gray-400">{h.date}</div>
                </td>
                <td className={tdCls}>
                  <div className="flex items-center gap-2">{eventIcon(h.type)}
                    <div>
                      <div className="text-[12px] font-medium text-gray-800">{h.type}</div>
                      <div className="text-[10px] text-gray-400">{h.sub}</div>
                    </div>
                  </div>
                </td>
                <td className={tdCls + " whitespace-nowrap"}>{h.room}</td>
                <td className={tdCls}>{h.device}</td>
                <td className={tdCls}>{levelBadge(h.level)}</td>
                <td className={tdCls}>{statusBadge(h.result)}</td>
                <td className={tdCls}>{h.handler}</td>
                <td className={tdCls + " font-mono text-[11px]"}>{h.duration}</td>
                <td className={tdCls}><ActionBtns /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager total={72} unit="kết quả" last={8} />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RIGHT PANEL
// ══════════════════════════════════════════════════════════════════════════════

function PanelInfo() {
  const d = EVENT_DETAIL;
  return (
    <div className="space-y-4">
      {/* Video */}
      <div className="relative rounded-lg overflow-hidden">
        <img src={d.img} alt="event" className="w-full h-[160px] object-cover" />
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            <Play size={18} className="text-white ml-0.5" />
          </div>
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 flex items-center gap-2">
          <span className="text-white text-[10px] font-mono">00:05</span>
          <div className="flex-1 h-1 bg-white/30 rounded-full"><div className="h-full bg-blue-400 rounded-full w-1/4" /></div>
          <span className="text-white text-[10px] font-mono">00:20</span>
        </div>
      </div>

      {/* Event info */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Thông tin sự kiện</div>
        <div className="space-y-1.5 text-[11px]">
          {[
            ["Thời gian xảy ra",  d.timeOccur],
            ["Thời gian phát hiện", d.timeDetect],
            ["Phòng học",         d.room.replace("Phòng ", "")],
            ["Thiết bị",          d.device],
            ["Phát hiện bởi",     d.detectedBy],
            ["Độ tin cậy",        `${d.confidence}%`],
            ["Mức độ ồn",         `${d.noise} dB`],
            ["Ngưỡng cảnh báo",   d.threshold],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <span className="text-gray-400 flex-shrink-0">{k}</span>
              <span className="text-gray-700 text-right">{v}</span>
            </div>
          ))}
          <div className="flex justify-between gap-2">
            <span className="text-gray-400 flex-shrink-0">Mô tả</span>
            <span className="text-gray-700 text-right">{d.desc} <button className="text-blue-500 hover:underline">Xem thêm</button></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Hành động</div>
        <div className="grid grid-cols-2 gap-1.5">
          <button className="py-1.5 rounded-lg bg-green-500 text-white text-[11px] font-medium hover:bg-green-600 transition-colors">Đánh dấu đã xử lý</button>
          <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Giao cho người khác</button>
          <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Bỏ qua</button>
          <button className="py-1.5 rounded-lg border border-red-200 text-red-500 text-[11px] font-medium hover:bg-red-50 transition-colors">Báo cáo</button>
        </div>
      </div>

      {/* Related */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Thông tin liên quan</div>
        <div className="space-y-1">
          {[
            ["Sự kiện tương tự", "3 sự kiện trong hôm nay"],
            ["Bản ghi liên quan", "09:30 - 09:40 (10 phút)"],
          ].map(([k, v]) => (
            <button key={k} className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 text-[11px] text-left transition-colors">
              <div><div className="text-gray-600 font-medium">{k}</div><div className="text-gray-400">{v}</div></div>
              <ChevronRight size={13} className="text-gray-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelMedia() {
  const d = EVENT_DETAIL;
  return (
    <div className="space-y-4">
      {/* Clips */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Video clips</div>
        <div className="grid grid-cols-2 gap-2">
          {d.clips.map((c, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
              <div className="relative">
                <img src={c.img} alt={c.label} className="w-full h-[80px] object-cover" />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Play size={13} className="text-white ml-0.5" />
                  </div>
                </button>
                <div className="absolute bottom-1 left-1 text-white text-[9px] font-mono bg-black/50 px-1 rounded">{c.time || c.dur}</div>
                <div className="absolute bottom-1 right-1 text-white text-[9px] font-mono bg-black/50 px-1 rounded">{c.dur}</div>
              </div>
              <div className="px-1.5 py-1 text-[10px] text-gray-600 font-medium truncate">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hình ảnh chụp</div>
          <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {d.screenshots.map((s, i) => (
            <div key={i} className="rounded overflow-hidden border border-gray-100">
              <img src={s.img} alt={s.time} className="w-full h-[60px] object-cover" />
              <div className="text-[9px] text-gray-400 text-center py-0.5 font-mono">{s.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Lịch sử xử lý (2)</div>
          <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-2">
          {[
            { date: "29/04/2026 09:40:15", user: "admin", status: "daxuly", note: "Đã nhắc nhở giáo viên và ổn định lớp học." },
            { date: "29/04/2026 09:36:02", user: "admin", status: "danxuly", note: "Đã tiếp nhận sự kiện, đang kiểm tra." },
          ].map((h, i) => (
            <div key={i} className="flex gap-2 text-[11px]">
              <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${h.status === "daxuly" ? "bg-green-500" : "bg-blue-500"}`}>
                {h.status === "daxuly" ? <Check size={9} className="text-white" /> : <Clock size={9} className="text-white" />}
              </div>
              <div>
                <div className="flex items-center gap-2"><span className="font-medium text-gray-700">{h.date}</span><span className="text-gray-400">{h.user}</span>{statusBadge(h.status === "daxuly" ? "daxuly" : "chuaxuly")}</div>
                <div className="text-gray-500">{h.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event info compact */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Thông tin sự kiện</div>
        <div className="space-y-1 text-[11px]">
          {[["Thời gian xảy ra", EVENT_DETAIL.timeOccur], ["Thời gian phát hiện", EVENT_DETAIL.timeDetect], ["Phòng học", "A101 - Lớp 10A1"], ["Thiết bị", EVENT_DETAIL.device], ["Ngưỡng cảnh báo", EVENT_DETAIL.threshold], ["Mô tả", EVENT_DETAIL.desc]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <span className="text-gray-400 flex-shrink-0">{k}</span>
              <span className="text-gray-700 text-right truncate max-w-[140px]">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-1.5">
        <button className="py-1.5 rounded-lg bg-green-500 text-white text-[11px] font-medium hover:bg-green-600 transition-colors">Đánh dấu đã xử lý</button>
        <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Giao cho người khác</button>
        <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Bỏ qua</button>
        <button className="py-1.5 rounded-lg border border-red-200 text-red-500 text-[11px] font-medium hover:bg-red-50 transition-colors">Báo cáo</button>
      </div>
    </div>
  );
}

function PanelLog() {
  const d = EVENT_DETAIL;
  return (
    <div className="space-y-4">
      {/* Processing timeline */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Quy trình xử lý</div>
        <div className="relative space-y-0">
          {d.timeline.map((t, i) => (
            <div key={i} className="flex gap-3 relative">
              {i < d.timeline.length - 1 && (
                <div className="absolute left-[13px] top-7 bottom-0 w-0.5 bg-gray-100 z-0" />
              )}
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center z-10 mt-0.5 ${t.done ? "bg-green-500" : t.active ? "bg-blue-500" : "bg-gray-200"}`}>
                {t.done ? <Check size={13} className="text-white" /> : t.active ? <Clock size={13} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-800">{t.step}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{t.time}</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">{t.by}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Ghi chú & hành động</div>
        <div className="border border-gray-100 rounded-lg p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">A</div>
            <span className="text-[11px] font-medium text-gray-700">{d.comment.user}</span>
            <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{d.comment.role}</span>
            <span className="text-[10px] text-gray-400 ml-auto font-mono">{d.comment.time}</span>
          </div>
          <p className="text-[11px] text-gray-600 whitespace-pre-line">{d.comment.text}</p>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Tệp đính kèm</div>
          <button className="text-[11px] text-blue-500 hover:underline">Tải xuống tất cả</button>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {d.clips.map((c, i) => (
            <div key={i} className="rounded overflow-hidden border border-gray-100 relative group cursor-pointer">
              <img src={c.img} alt="" className="w-full h-[50px] object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play size={14} className="text-white" />
              </div>
              <div className="text-[9px] text-gray-400 text-center py-0.5">{c.dur}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-1.5">
        <button className="py-1.5 rounded-lg bg-green-500 text-white text-[11px] font-medium hover:bg-green-600 transition-colors">Đánh dấu đã xử lý</button>
        <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Giao cho người khác</button>
        <button className="py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-medium hover:bg-gray-50 transition-colors">Bỏ qua</button>
        <button className="py-1.5 rounded-lg border border-red-200 text-red-500 text-[11px] font-medium hover:bg-red-50 transition-colors">Báo cáo</button>
      </div>
    </div>
  );
}

function RightPanel({ onClose }: { onClose: () => void }) {
  const [panelTab, setPanelTab] = useState<PanelTab>("info");
  const PTABS = [
    { id: "info"  as PanelTab, label: "Thông tin" },
    { id: "media" as PanelTab, label: "Phương tiện (3)" },
    { id: "log"   as PanelTab, label: "Lịch sử xử lý (3)" },
  ];
  return (
    <div className="app-surface flex max-h-[calc(100vh-140px)] w-full flex-shrink-0 flex-col self-start overflow-hidden 2xl:w-[280px]">
      {/* Header */}
      <div className="flex items-start justify-between px-3 pt-3 pb-2 border-b border-gray-900/15 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Volume2 size={15} className="text-orange-500" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-gray-800 truncate">{EVENT_DETAIL.type}</div>
              <div className="text-[11px] text-gray-400 truncate">{EVENT_DETAIL.room}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {levelBadge(EVENT_DETAIL.level)}
            {statusBadge(EVENT_DETAIL.status)}
          </div>
        </div>
        <button onClick={onClose} className="app-icon-btn ml-2 flex-shrink-0">
          <X size={14} />
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-900/15 flex-shrink-0">
        {PTABS.map(t => (
          <button key={t.id} onClick={() => setPanelTab(t.id)}
            className={`flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${panelTab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {panelTab === "info"  && <PanelInfo />}
        {panelTab === "media" && <PanelMedia />}
        {panelTab === "log"   && <PanelLog />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function EventsPage() {
  const [mainView, setMainView] = useState<MainView>("list");
  const [showPanel, setShowPanel] = useState(true);

  const stats = [
    { label: "Tổng sự kiện",         val: 156, sub: "100%",  color: "text-gray-800",   bg: "bg-blue-50",   icon: "text-blue-500" },
    { label: "Mức độ cao",           val: 45,  sub: "28.8%", color: "text-red-600",    bg: "bg-red-50",    icon: "text-red-500" },
    { label: "Mức độ trung bình",    val: 68,  sub: "43.6%", color: "text-orange-500", bg: "bg-orange-50", icon: "text-orange-500" },
    { label: "Mức độ thấp",          val: 32,  sub: "20.5%", color: "text-blue-600",   bg: "bg-blue-50",   icon: "text-blue-500" },
    { label: "Đã xử lý",             val: 72,  sub: "46.2%", color: "text-green-600",  bg: "bg-green-50",  icon: "text-green-500" },
    { label: "Chưa xử lý",           val: 84,  sub: "53.8%", color: "text-yellow-600", bg: "bg-yellow-50", icon: "text-yellow-500" },
  ];

  return (
    <div className="app-page">
      {/* Filter bar */}
      <div className="app-toolbar mb-4 p-3">
        <div className="flex items-center gap-2">
          {["Tất cả sự kiện", "Tất cả mức độ", "Tất cả trạng thái"].map(f => (
            <button key={f} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 whitespace-nowrap">
              {f} <ChevronDown size={11} className="text-gray-400" />
            </button>
          ))}
          <div className="flex-1 flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5">
            <Search size={12} className="text-gray-400 flex-shrink-0" />
            <input className="flex-1 text-[12px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm sự kiện, phòng, thiết bị..." />
            <SlidersHorizontal size={12} className="text-gray-400 flex-shrink-0" />
          </div>
          <button className="text-[12px] text-blue-500 hover:underline whitespace-nowrap">Xóa bộ lọc</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {stats.map(s => {
          const G: Record<string,string> = {
            "bg-blue-50":   "#4285F4",
            "bg-red-50":    "#EA4335",
            "bg-orange-50": "#F29900",
            "bg-green-50":  "#34A853",
            "bg-yellow-50": "#FBBC05",
          };
          return (
            <div key={s.label} className="rounded-xl shadow-sm px-3 py-3"
              style={{ backgroundColor: G[s.bg] ?? "#4285F4" }}>
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-white leading-none">{s.val}</div>
              <div className="text-[11px] text-white/70 mt-0.5">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMainView("list")}
          className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-colors ${mainView === "list" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          Danh sách sự kiện
        </button>
        <button onClick={() => setMainView("history")}
          className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-colors ${mainView === "history" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          Lịch sử xử lý
        </button>
      </div>

      {/* Content + right panel */}
      <div className="flex flex-col items-start gap-4 2xl:flex-row">
        <div className="flex-1 min-w-0">
          {mainView === "list" && (
            <>
              <EventChart />
              <EventsTable onSelect={() => setShowPanel(true)} />
            </>
          )}
          {mainView === "history" && (
            <HistoryTable onSelect={() => setShowPanel(true)} />
          )}
        </div>
        {showPanel && <RightPanel onClose={() => setShowPanel(false)} />}
      </div>
    </div>
  );
}

