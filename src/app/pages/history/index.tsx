import { useState } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Play, Download, MoreHorizontal, Eye, ExternalLink,
  Camera, RotateCcw, Search, SlidersHorizontal,
  ImageIcon, LayoutGrid, Maximize2, Volume2,
  SkipBack, SkipForward, Trash2, Folder,
  MessageCircle, Smartphone, DoorOpen, UserX, Megaphone,
  CalendarDays, School, HardDrive, Pause,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { REC_CAMERAS, REC_LIST, EVENTS, DOWNLOADS } from "../../data/recordings";

type HistoryTab = "time" | "event" | "download";
type DownloadSubTab = "list" | "history";

// ── Helpers ───────────────────────────────────────────────────────────────────
function levelBadge(l: string) {
  if (l === "Cao")       return <span className="text-[11px] px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">Cao</span>;
  if (l === "Trung bình") return <span className="text-[11px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium">Trung bình</span>;
  return <span className="text-[11px] px-2 py-0.5 rounded bg-green-100 text-green-600 font-medium">Thấp</span>;
}

function statusBadge(s: string) {
  if (s === "Hoàn thành") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">Hoàn thành</span>;
  if (s === "Đang tải")   return <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">Đang tải</span>;
  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Chờ tải</span>;
}

function eventIcon(type: string) {
  if (type.includes("nói chuyện")) return <MessageCircle size={14} className="text-red-500" />;
  if (type.includes("điện thoại")) return <Smartphone size={14} className="text-yellow-500" />;
  if (type.includes("Ra vào"))     return <DoorOpen size={14} className="text-blue-500" />;
  if (type.includes("mặt"))        return <UserX size={14} className="text-orange-500" />;
  return <Megaphone size={14} className="text-purple-500" />;
}

// ── Common table header ───────────────────────────────────────────────────────
const thCls = "px-3 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap";
const tdCls = "px-3 py-3 text-[12px] text-gray-700 align-middle";

// ── Pagination ────────────────────────────────────────────────────────────────
function Pager({ total, unit, perPage = 10 }: { total: number; unit: string; perPage?: number }) {
  const [page, setPage] = useState(1);
  const last = Math.ceil(total / perPage);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-900/15 text-[12px] text-gray-500">
      <span>Hiển thị 1 - {perPage} trong tổng số {total} {unit}</span>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
          <ChevronLeft size={13} />
        </button>
        {[1, 2, 3].map(p => (
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
        <div className="flex items-center gap-1 ml-2 border border-gray-200 rounded px-2 py-1 cursor-pointer hover:bg-gray-50">
          <span>{perPage} / trang</span>
          <ChevronDown size={11} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 – XEM THEO THỜI GIAN
// ══════════════════════════════════════════════════════════════════════════════

function RightFilterPanel() {
  const pieData = [
    { value: 682, color: "#4285F4" },
    { value: 318, color: "#e2e8f0" },
  ];
  return (
    <div className="w-[240px] flex-shrink-0 space-y-0">
      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3 mb-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Bộ lọc tìm kiếm</div>
        {[{ label: "Phòng học", placeholder: "Tất cả phòng học" }, { label: "Camera", placeholder: "Tất cả camera" }, { label: "Loại ghi hình", placeholder: "Tất cả" }].map(f => (
          <div key={f.label} className="mb-2">
            <div className="text-[11px] text-gray-500 mb-1">{f.label}</div>
            <button className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
              <span>{f.placeholder}</span><ChevronDown size={12} className="text-gray-400" />
            </button>
          </div>
        ))}
        <div className="mb-2">
          <div className="text-[11px] text-gray-500 mb-1">Khoảng thời gian</div>
          <div className="flex items-center gap-1">
            <input type="text" defaultValue="28/04/2026" className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] outline-none" />
            <span className="text-gray-400 text-[11px]">—</span>
            <input type="text" defaultValue="29/04/2026" className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] outline-none" />
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mb-1.5">Tìm kiếm nhanh</div>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {["Hôm nay", "Hôm qua", "7 ngày qua", "30 ngày qua"].map(q => (
            <button key={q} className="border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 hover:border-blue-300 transition-colors">{q}</button>
          ))}
          <button className="col-span-2 border border-blue-300 bg-blue-50 rounded-lg px-2 py-1.5 text-[11px] text-blue-600 font-medium">Tuỳ chọn</button>
        </div>
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 text-[12px] font-medium hover:bg-blue-700 transition-colors mb-1.5">
          Tìm kiếm
        </button>
        <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
          <RotateCcw size={12} /> Đặt lại
        </button>
      </div>

      {/* Storage */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3 mb-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Dung lượng lưu trữ</div>
        <div className="relative flex justify-center mb-1">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={38} outerRadius={52} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-lg font-bold text-gray-800">68%</div>
            <div className="text-[9px] text-gray-400 leading-tight text-center">Đã sử dụng</div>
          </div>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500" />Đã sử dụng</span><span className="font-medium">682 GB</span></div>
          <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-gray-200" />Còn trống</span><span className="font-medium">318 GB</span></div>
          <div className="flex justify-between text-gray-400 pt-1 border-t border-gray-50"><span>Tổng dung lượng</span><span>1.0 TB</span></div>
        </div>
      </div>

      {/* NVR device */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-3">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Thiết bị lưu trữ</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-6 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
            <HardDrive size={12} className="text-gray-300" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-gray-700">NVR-01 (Phòng Thiết bị)</div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Trạng thái: Hoạt động
            </div>
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mb-1">Dung lượng: 1.0 TB</div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }} />
        </div>
        <div className="text-[10px] text-gray-400 mt-0.5 text-right">68%</div>
      </div>
    </div>
  );
}

function TimelineBar() {
  const segments = [
    { start: 0,   end: 15,  color: "#4285F4" },
    { start: 15,  end: 30,  color: "#4285F4" },
    { start: 30,  end: 45,  color: "#34A853" },
    { start: 45,  end: 55,  color: "#FBBC05" },
    { start: 55,  end: 60,  color: "#4285F4" },
    { start: 60,  end: 75,  color: "#4285F4" },
    { start: 75,  end: 85,  color: "#34A853" },
    { start: 85,  end: 90,  color: "#ef4444" },
    { start: 90,  end: 100, color: "#4285F4" },
  ];
  const hours = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"];
  return (
    <div className="px-4 pb-3">
      {/* Segments */}
      <div className="relative h-5 bg-gray-100 rounded overflow-hidden mb-1">
        {segments.map((s, i) => (
          <div key={i} className="absolute top-0 h-full" style={{ left: `${s.start}%`, width: `${s.end - s.start}%`, backgroundColor: s.color, opacity: 0.7 }} />
        ))}
        <div className="absolute top-0 h-full w-0.5 bg-yellow-400" style={{ left: "39.3%" }} />
      </div>
      {/* Time labels */}
      <div className="flex justify-between text-[9px] text-gray-400 mb-2">
        {hours.map(h => <span key={h}>{h}</span>)}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-gray-500">
        {[
          { color: "#4285F4", label: "Ghi hình liên tục" },
          { color: "#34A853", label: "Phát hiện chuyển động" },
          { color: "#FBBC05", label: "Sự kiện" },
          { color: "#ef4444", label: "Thông báo hệ thống" },
        ].map(l => (
          <span key={l.label} className="flex items-center gap-1">
            <span className="w-3 h-2 rounded-sm inline-block" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function VideoPlayer({ cam }: { cam: typeof REC_CAMERAS[number] }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm mb-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-900/15">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[13px] text-gray-800">{cam.name} - {cam.sub}</span>
          <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Online
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1 text-[12px] text-gray-600 hover:bg-gray-50"><ImageIcon size={12} /> Chụp ảnh</button>
          <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><LayoutGrid size={13} className="text-gray-500" /></button>
          <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><Maximize2 size={13} className="text-gray-500" /></button>
        </div>
      </div>
      {/* Video */}
      <div className="relative bg-black">
        <img src={cam.img} alt={cam.name} className="w-full h-[300px] object-cover opacity-90" />
        <div className="absolute top-3 left-3 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded font-mono">
          29/04/2026&nbsp;&nbsp;09:35:22
        </div>
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setPlaying(p => !p)} className="text-white hover:text-blue-300 transition-colors">
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-white/70 hover:text-white"><SkipBack size={16} /></button>
            <button className="text-white/70 hover:text-white"><SkipForward size={16} /></button>
            <button className="text-white/70 hover:text-white"><Volume2 size={16} /></button>
            <div className="flex-1 mx-2">
              <div className="h-1 bg-white/30 rounded-full relative cursor-pointer">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: "39.3%" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" style={{ left: "calc(39.3% - 6px)" }} />
              </div>
            </div>
            <span className="text-white/80 text-[11px] font-mono">09:35:22</span>
            <span className="text-white/50 text-[11px] font-mono">/ 24:00:00</span>
            <button className="text-white/70 hover:text-white ml-1"><Camera size={15} /></button>
            <button className="text-white/70 hover:text-white"><Maximize2 size={15} /></button>
          </div>
        </div>
      </div>
      <TimelineBar />
    </div>
  );
}

function TimeTab() {
  const [selectedCam, setSelectedCam] = useState(REC_CAMERAS[0]);
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 min-w-0">
        {/* Camera strip */}
        <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm mb-4">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-900/15">
            <div className="text-[13px] font-bold text-gray-800">Danh sách camera ({REC_CAMERAS.length})</div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
              <Camera size={12} /> Quản lý camera
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-thin">
            {REC_CAMERAS.map(cam => (
              <div key={cam.id} onClick={() => setSelectedCam(cam)}
                className={`flex-shrink-0 w-[160px] cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedCam.id === cam.id ? "border-blue-500" : "border-transparent"}`}>
                <div className="relative">
                  <img src={cam.img} alt={cam.name} className="w-full h-[90px] object-cover" />
                  {selectedCam.id === cam.id && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="p-2 bg-white border-t border-gray-900/15">
                  <div className="text-[11px] font-semibold text-gray-800">{cam.name}</div>
                  <div className="text-[10px] text-gray-400">{cam.sub}</div>
                  <div className="text-[10px] text-gray-400 truncate">{cam.room}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-green-600">Online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video player */}
        <VideoPlayer cam={selectedCam} />

        {/* Recording list */}
        <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900/15">
            <div className="text-[13px] font-bold text-gray-800">Danh sách ghi hình <span className="text-gray-400 font-normal text-[12px]">Tổng 256 bản ghi</span></div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50"><Download size={13} /> Tải xuống đã chọn</button>
              <button className="flex items-center gap-1.5 border border-red-200 rounded-lg px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-50"><Trash2 size={13} /> Xóa</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-900/15">
                <tr>
                  <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                  <th className={thCls}>Hình thu nhỏ</th>
                  <th className={thCls}>Camera</th>
                  <th className={thCls}>Phòng học</th>
                  <th className={thCls}>Thời gian bắt đầu</th>
                  <th className={thCls}>Thời gian kết thúc</th>
                  <th className={thCls}>Loại ghi hình</th>
                  <th className={thCls}>Thời lượng</th>
                  <th className={thCls}>Kích thước</th>
                  <th className={thCls}>Sự kiện</th>
                  <th className={thCls}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REC_LIST.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="pl-4 pr-2 py-2"><input type="checkbox" className="rounded" /></td>
                    <td className="px-3 py-2">
                      <img src={r.img} alt="" className="w-14 h-10 object-cover rounded" />
                    </td>
                    <td className={tdCls}>
                      <div className="text-[11px] font-medium text-gray-800 whitespace-nowrap">{r.camera.split("·")[0].trim()}</div>
                      <div className="text-[10px] text-gray-400">{r.camera.split("·").slice(1).join("·").trim()}</div>
                    </td>
                    <td className={tdCls + " whitespace-nowrap"}>{r.room}</td>
                    <td className={tdCls + " font-mono text-[11px] whitespace-nowrap"}>{r.start}</td>
                    <td className={tdCls + " font-mono text-[11px] whitespace-nowrap"}>{r.end}</td>
                    <td className={tdCls}>
                      <span className={`text-[11px] px-2 py-0.5 rounded ${r.type === "Sự kiện" ? "bg-orange-100 text-orange-600" : "bg-blue-50 text-blue-600"}`}>{r.type}</span>
                    </td>
                    <td className={tdCls + " font-mono"}>{r.duration}</td>
                    <td className={tdCls}>{r.size}</td>
                    <td className={tdCls}>
                      {r.event !== "-"
                        ? <span className="text-[11px] text-orange-600 flex items-center gap-1"><span className="text-orange-400">⚠</span>{r.event}</span>
                        : <span className="text-gray-400">-</span>}
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"><Play size={12} /></button>
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><Download size={12} /></button>
                        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><MoreHorizontal size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pager total={256} unit="bản ghi" />
          </div>
        </div>
      </div>
      <RightFilterPanel />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 – XEM THEO SỰ KIỆN
// ══════════════════════════════════════════════════════════════════════════════

function EventTab() {
  return (
    <div>
      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm p-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Loại sự kiện", val: "Tất cả loại sự kiện" },
            { label: "Mức độ",       val: "Tất cả mức độ" },
            { label: "Camera",       val: "Tất cả camera" },
            { label: "Phòng học",    val: "Tất cả phòng học" },
          ].map(f => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <div className="text-[10px] text-gray-400">{f.label}</div>
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                {f.val} <ChevronDown size={11} className="text-gray-400" />
              </button>
            </div>
          ))}
          <div className="flex flex-col gap-0.5">
            <div className="text-[10px] text-gray-400">Thời gian</div>
            <div className="flex items-center gap-1">
              <input type="text" defaultValue="28/04/2026  00:00" className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none w-36" />
              <span className="text-gray-400 text-[11px]">→</span>
              <input type="text" defaultValue="29/04/2026  23:59" className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none w-36" />
              <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><CalendarDays size={13} className="text-gray-400" /></button>
            </div>
          </div>
          <div className="flex items-end gap-2 ml-auto">
            <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-4 py-1.5 text-[12px] font-medium hover:bg-blue-700">
              <Search size={13} /> Tìm kiếm
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
              <SlidersHorizontal size={13} /> Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Events table */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-900/15">
              <tr>
                <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                <th className={thCls}>Thời gian ↑</th>
                <th className={thCls}>Sự kiện</th>
                <th className={thCls}>Camera</th>
                <th className={thCls}>Phòng học</th>
                <th className={thCls}>Mức độ</th>
                <th className={thCls}>Hình ảnh</th>
                <th className={thCls}>Clip</th>
                <th className={thCls}>Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {EVENTS.map((e, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className={tdCls}>
                    <div className="font-mono text-[11px] text-gray-700">{e.time}</div>
                    <div className="font-mono text-[12px] font-semibold text-gray-800">{e.clock}</div>
                  </td>
                  <td className={tdCls}>
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">{eventIcon(e.type)}</span>
                      <span className="text-[12px] text-gray-700">{e.type}</span>
                    </span>
                  </td>
                  <td className={tdCls}>{e.camera}</td>
                  <td className={tdCls}>{e.room}</td>
                  <td className={tdCls}>{levelBadge(e.level)}</td>
                  <td className="px-3 py-2">
                    <img src={e.img} alt="" className="w-16 h-11 object-cover rounded" />
                  </td>
                  <td className={tdCls}>
                    <span className="flex items-center gap-1.5 text-[12px]"><Play size={11} className="text-gray-400" />{e.clip}</span>
                  </td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"><Eye size={12} /></button>
                      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><Download size={12} /></button>
                      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><ExternalLink size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager total={256} unit="sự kiện" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 – TẢI XUỐNG
// ══════════════════════════════════════════════════════════════════════════════

function DownloadTab() {
  const [subTab, setSubTab] = useState<DownloadSubTab>("list");
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
        {/* Sub-tabs + actions */}
        <div className="flex items-center justify-between px-4 border-b border-gray-900/15">
          <div className="flex">
            {[{ id: "list" as DownloadSubTab, label: "Danh sách tải xuống" }, { id: "history" as DownloadSubTab, label: "Lịch sử tải xuống" }].map(t => (
              <button key={t.id} onClick={() => setSubTab(t.id)}
                className={`px-4 py-3 text-[12px] font-medium border-b-2 transition-colors ${subTab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-red-200 rounded-lg px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-50"><Trash2 size={13} /> Xóa đã chọn</button>
            <button className="flex items-center gap-1.5 border border-red-200 rounded-lg px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-50"><Trash2 size={13} /> Xóa tất cả</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-900/15">
              <tr>
                <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                <th className={thCls}>Tên file</th>
                <th className={thCls}>Camera</th>
                <th className={thCls}>Phòng học</th>
                <th className={thCls}>Khoảng thời gian</th>
                <th className={thCls}>Dung lượng</th>
                <th className={thCls} style={{ minWidth: 140 }}>Tiến trình</th>
                <th className={thCls}>Trạng thái</th>
                <th className={thCls}>Thời gian tạo</th>
                <th className={thCls}>Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DOWNLOADS.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[8px] font-bold">MP4</span>
                      </div>
                      <span className="text-[11px] text-gray-700 font-mono">{d.file}</span>
                    </div>
                  </td>
                  <td className={tdCls}>{d.camera}</td>
                  <td className={tdCls}>{d.room}</td>
                  <td className={tdCls + " text-[11px] whitespace-nowrap"}>{d.range}</td>
                  <td className={tdCls}>{d.size}</td>
                  <td className={tdCls}>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${d.pct === 100 ? "bg-green-500" : d.pct > 0 ? "bg-blue-500" : "bg-gray-300"}`}
                        style={{ width: `${d.pct}%` }} />
                    </div>
                    <div className="text-[10px] text-gray-400">{d.pct}%</div>
                  </td>
                  <td className={tdCls}>{statusBadge(d.status)}</td>
                  <td className={tdCls + " text-[11px] whitespace-nowrap"}>{d.created}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-1">
                      {d.pct === 100
                        ? <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"><Play size={12} /></button>
                        : <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><Pause size={12} /></button>
                      }
                      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><Folder size={12} /></button>
                      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager total={24} unit="tải xuống" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function HistoryPage() {
  const [tab, setTab] = useState<HistoryTab>("time");
  const TABS = [
    { id: "time" as HistoryTab,     label: "Xem theo thời gian" },
    { id: "event" as HistoryTab,    label: "Xem theo sự kiện" },
    { id: "download" as HistoryTab, label: "Tải xuống" },
  ];

  return (
    <div className="p-4">
      {/* Page header */}
      <div className="mb-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-900/15">
          <div>
            <div className="text-[20px] font-bold uppercase tracking-[0.08em] text-slate-900">Lịch sử ghi hình</div>
          </div>
        </div>
        <div className="flex">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "time"     && <TimeTab />}
      {tab === "event"    && <EventTab />}
      {tab === "download" && <DownloadTab />}
    </div>
  );
}




