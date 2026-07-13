import { useState } from "react";
import {
  Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight,
  Users, UserCheck, Wrench, ArrowRight, Plus,
  Volume2, Activity, AlertTriangle, WifiOff,
  School,
} from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { AddEntityDialog } from "../../components/AddEntityDialog";
import { ROOMS, RECENT_ACTIVITIES, ATTENTION_ROOMS, type Room } from "../../data/rooms";

// ── Status helpers ────────────────────────────────────────────────────────────
function statusLabel(s: string) {
  if (s === "hoatdong")       return "Đang hoạt động";
  if (s === "khonghoatdong")  return "Không hoạt động";
  if (s === "baotri")         return "Bảo trì";
  if (s === "chuy")           return "Cần chú ý";
  return s;
}
function statusBadgeCls(s: string) {
  if (s === "hoatdong")       return "bg-green-100 text-green-700";
  if (s === "khonghoatdong")  return "bg-gray-100 text-gray-600";
  if (s === "baotri")         return "bg-yellow-100 text-yellow-700";
  if (s === "chuy")           return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
}
function noiseCls(n: string) {
  if (n === "Thấp")     return "text-green-600 font-semibold";
  if (n === "Trung bình") return "text-yellow-600 font-semibold";
  if (n === "Cao")      return "text-red-600 font-semibold";
  return "text-gray-400";
}
function activityIcon(type: string) {
  const base = "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0";
  if (type === "active")   return <div className={`${base} bg-green-100`}><Activity size={14} className="text-green-600" /></div>;
  if (type === "warning")  return <div className={`${base} bg-yellow-100`}><Wrench size={14} className="text-yellow-600" /></div>;
  if (type === "alert")    return <div className={`${base} bg-red-100`}><Volume2 size={14} className="text-red-500" /></div>;
  if (type === "inactive") return <div className={`${base} bg-gray-100`}><WifiOff size={14} className="text-gray-500" /></div>;
  return <div className={`${base} bg-orange-100`}><AlertTriangle size={14} className="text-orange-500" /></div>;
}

// ── Room card ─────────────────────────────────────────────────────────────────
function RoomCard({ room }: { room: Room }) {
  const isInactive = room.status === "khonghoatdong";
  return (
    <div className="app-surface overflow-hidden">
      <div className="relative">
        <img src={room.img} alt={room.name}
          className={`w-full h-[150px] object-cover ${isInactive ? "grayscale opacity-50" : ""}`} />
        <span className={`absolute top-2 right-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusBadgeCls(room.status)}`}>
          {statusLabel(room.status)}
        </span>
      </div>
      <div className="p-3">
        <div className="font-bold text-[13px] text-gray-800 mb-2">{room.name}</div>
        {/* Students + Teacher */}
        <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Users size={11} />{room.students} học sinh</span>
          <span className="flex items-center gap-1"><UserCheck size={11} />{room.teacher}</span>
        </div>
        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-1 text-[11px] mb-3">
          <div>
            <div className="text-gray-400 mb-0.5">Tập trung</div>
            <div className="font-bold text-gray-700">{room.attention}%</div>
          </div>
          <div>
            <div className="text-gray-400 mb-0.5">Độ ồn</div>
            <div className={noiseCls(room.noise)}>{room.noise}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-0.5">Camera</div>
            <div className="font-bold text-gray-700">{room.cameras}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-0.5">Thiết bị</div>
            <div className="font-bold text-gray-700">{room.devices}</div>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-1.5 text-blue-600 text-[12px] font-medium border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors">
          Xem chi tiết <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

const ROOM_PAGE_ITEMS: Room[] = [
  ...ROOMS,
  ...ROOMS.map((room, index) => {
    const extraRooms = [
      { id: "A103", name: "A103 - Lớp 10A3", status: "hoatdong" as const, students: "44/45", attention: 81, cameras: 2, devices: 8 },
      { id: "A104", name: "A104 - Lớp 10A4", status: "chuy" as const, students: "39/42", attention: 52, cameras: 2, devices: 7 },
      { id: "B103", name: "B103 - Lớp 11B3", status: "hoatdong" as const, students: "41/41", attention: 84, cameras: 2, devices: 9 },
      { id: "B104", name: "B104 - Lớp 11B4", status: "baotri" as const, students: "36/40", attention: 60, cameras: 1, devices: 6 },
      { id: "C203", name: "C203 - Lớp 12C3", status: "hoatdong" as const, students: "42/44", attention: 79, cameras: 2, devices: 8 },
      { id: "C204", name: "C204 - Lớp 12C4", status: "khonghoatdong" as const, students: "0/38", attention: 0, cameras: 2, devices: 6 },
    ];
    return { ...room, ...extraRooms[index] };
  }),
];

// ── Right panel ───────────────────────────────────────────────────────────────
function RightPanel() {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
      {/* Recent activity */}
      <div className="app-surface h-full p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hoạt động gần đây</div>
          <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-2.5">
          {RECENT_ACTIVITIES.map((a, i) => (
            <div key={i} className="flex gap-2.5">
              {activityIcon(a.type)}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-gray-700 truncate">{a.room} {a.desc}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{a.time}</span>
                </div>
                <div className="text-[10px] text-gray-400 truncate">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attention rooms */}
      <div className="app-surface h-full p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Phòng học cần chú ý</div>
          <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-2.5">
          {ATTENTION_ROOMS.map((r, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <School size={14} className="text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium text-gray-700">{r.room}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{r.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-gray-500 truncate">{r.issue}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${r.badgeColor}`}>{r.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-between mt-4 text-[12px] text-gray-500">
      <span>Hiển thị 1 - 12 trong tổng số 256 phòng học</span>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p-1))}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
          <ChevronLeft size={13} />
        </button>
        {[1,2,3,4].map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={`w-7 h-7 rounded border text-[12px] font-medium ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
            {p}
          </button>
        ))}
        <span className="px-1">...</span>
        <button onClick={() => setPage(43)}
          className={`w-7 h-7 rounded border text-[12px] font-medium ${page === 43 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
          43
        </button>
        <button onClick={() => setPage(p => Math.min(43, p+1))}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
          <ChevronRight size={13} />
        </button>
        <div className="flex items-center gap-1 ml-2 border border-gray-200 rounded px-2 py-1">
          <span>12 / trang</span>
          <ChevronDown size={11} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// ── Rooms Page ────────────────────────────────────────────────────────────────
export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(ROOM_PAGE_ITEMS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const stats = [
    { icon: <School size={18} />,      count: 256, label: "Tổng phòng học",        sub: "100%",   iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,    count: 186, label: "Đang hoạt động",  sub: "72.7%",  iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,     count: 38,  label: "Không hoạt động",       sub: "14.8%",  iconBg: "bg-gray-100",  iconColor: "text-gray-500" },
    { icon: <Wrench size={18} />,      count: 16,  label: "Bảo trì",               sub: "6.3%",   iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <AlertTriangle size={18} />, count: 16, label: "Cần chú ý",            sub: "6.3%",   iconBg: "bg-red-50",    iconColor: "text-red-500" },
  ];

  function handleAddRoom(values: Record<string, string>) {
    const id = values.id || `ROOM-${Date.now().toString().slice(-4)}`;
    const room: Room = {
      id,
      name: values.name || `${id} - Lớp mới`,
      status: "hoatdong",
      students: values.students || "0/40",
      teacher: values.teacher || "Chưa phân công",
      attention: 0,
      noise: ROOMS[0]?.noise ?? "Thấp",
      cameras: Number(values.cameras || 0),
      devices: Number(values.devices || 0),
      img: values.img || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70",
    };

    setRooms(current => [room, ...current]);
  }

  return (
    <div className="app-page">
      {/* Stats */}
      <div className="app-grid-stats mb-4">
        {stats.map(s => (
          <StatCard key={s.label} icon={s.icon} count={s.count} label={s.label}
            sub={s.sub} iconBg={s.iconBg} iconColor={s.iconColor} />
        ))}
      </div>

      {/* Content */}
      <div>
        <div className="flex-1 min-w-0">
          {/* Section header + filters */}
          <div className="app-toolbar mb-4 px-4 py-3">
            <div className="text-[17px] font-bold text-gray-800 mb-3">Danh sách phòng học</div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-1.5">
                <Search size={13} className="text-gray-400 flex-shrink-0" />
                <input className="flex-1 text-[12px] outline-none placeholder-gray-400 bg-transparent"
                  placeholder="Tìm kiếm phòng học, tòa nhà..." />
              </div>
              {["Tất cả tòa nhà", "Tất cả trạng thái", "Tất cả khối lớp"].map(p => (
                <button key={p} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white hover:bg-gray-50 whitespace-nowrap">
                  {p} <ChevronDown size={11} className="text-gray-400" />
                </button>
              ))}
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white hover:bg-gray-50">
                <SlidersHorizontal size={13} /> Bộ lọc
              </button>
              <button
                type="button"
                className="app-primary-action ml-auto flex items-center gap-1.5 rounded-lg px-[15px] py-[9px] text-[12px] font-medium"
                onClick={() => setIsAddOpen(true)}
              >
                <Plus size={16} /> Thêm phòng học
              </button>
            </div>
          </div>

          {/* Room cards grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {rooms.map(room => <RoomCard key={room.id} room={room} />)}
          </div>

          <Pagination />
          <RightPanel />
        </div>

      </div>
      <AddEntityDialog
        open={isAddOpen}
        title="Thêm phòng học"
        description="Tạo phòng học mới và hiển thị ngay trong danh sách."
        submitLabel="Lưu phòng học"
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddRoom}
        fields={[
          { name: "id", label: "Mã phòng", placeholder: "A105", required: true },
          { name: "name", label: "Tên phòng", placeholder: "A105 - Lớp 10A5", required: true },
          { name: "teacher", label: "Giáo viên phụ trách", placeholder: "Nguyễn Văn An" },
          { name: "students", label: "Sĩ số", placeholder: "40/45" },
          { name: "cameras", label: "Số camera", type: "number", defaultValue: "2" },
          { name: "devices", label: "Số thiết bị", type: "number", defaultValue: "8" },
          { name: "img", label: "Ảnh phòng học", placeholder: "https://..." },
        ]}
      />
    </div>
  );
}
