import { useState } from "react";
import { Activity, AlertCircle, ChevronDown, Map, Monitor, RadioTower, School, Search, Target, TriangleAlert, WifiOff, Wrench } from "lucide-react";
import { CAMERAS, CLASSROOMS } from "../../data/cameras";
import { StatCard } from "../../components/StatCard";
import { CameraCard } from "./CameraCard";
import { ClassroomCard } from "./ClassroomCard";

type TabType = "live" | "classroom" | "map";
type CameraStatus = "all" | "live" | "offline" | "baotri" | "loi";
type ClassroomStatus = "all" | "danghoc" | "sansang" | "khonghoatdong";

const STATUS_OPTIONS: { id: CameraStatus; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "live", label: "Live" },
  { id: "offline", label: "Offline" },
  { id: "loi", label: "Lỗi" },
  { id: "baotri", label: "Bảo trì" },
];

const STATUS_PRIORITY: Record<Exclude<CameraStatus, "all">, number> = {
  loi: 0,
  offline: 1,
  baotri: 2,
  live: 3,
};

const CLASSROOM_STATUS_OPTIONS: { id: ClassroomStatus; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "danghoc", label: "Đang học" },
  { id: "sansang", label: "Sẵn sàng" },
  { id: "khonghoatdong", label: "Không hoạt động" },
];


function getCameraFilterClass(optionId: CameraStatus, active: boolean) {
  if (!active) {
    return "border border-transparent bg-stone-100 text-slate-600 hover:bg-stone-200 dark:bg-slate-800/90 dark:text-white/80 dark:hover:bg-slate-700/90 dark:hover:text-white";
  }

  if (optionId === "live") {
    return "border border-emerald-500 bg-emerald-950/[0.06] text-emerald-900 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)] dark:border-emerald-400/70 dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.3)_0%,rgba(6,95,70,0.4)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(16,185,129,0.28)]";
  }

  if (optionId === "loi") {
    return "border border-rose-500 bg-rose-950/[0.06] text-rose-900 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.12)] dark:border-rose-400/70 dark:bg-[linear-gradient(135deg,rgba(244,63,94,0.3)_0%,rgba(127,29,29,0.42)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(244,63,94,0.28)]";
  }

  if (optionId === "baotri") {
    return "border border-amber-500 bg-amber-950/[0.06] text-amber-900 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.12)] dark:border-amber-300/70 dark:bg-[linear-gradient(135deg,rgba(245,158,11,0.34)_0%,rgba(146,64,14,0.42)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(245,158,11,0.24)]";
  }

  if (optionId === "offline") {
    return "border border-slate-500 bg-slate-200/80 text-slate-800 dark:border-slate-300/55 dark:bg-[linear-gradient(135deg,rgba(100,116,139,0.34)_0%,rgba(30,41,59,0.5)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(51,65,85,0.26)]";
  }

  return "border border-slate-700 bg-slate-800 text-white shadow-sm shadow-slate-300/50 dark:border-white/80 dark:bg-[#ffffff] dark:text-slate-900 dark:shadow-[0_14px_30px_rgba(255,255,255,0.22)]";
}

function getClassroomFilterClass(optionId: ClassroomStatus, active: boolean) {
  if (!active) {
    return "border border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/90 dark:text-white/80 dark:hover:bg-slate-700/90 dark:hover:text-white";
  }

  if (optionId === "sansang") {
    return "border border-amber-500 bg-amber-50 text-amber-900 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.12)] dark:border-amber-300/70 dark:bg-[linear-gradient(135deg,rgba(245,158,11,0.34)_0%,rgba(146,64,14,0.42)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(245,158,11,0.24)]";
  }

  if (optionId === "danghoc") {
    return "border border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)] dark:border-emerald-400/70 dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.3)_0%,rgba(6,95,70,0.4)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(16,185,129,0.28)]";
  }

  if (optionId === "khonghoatdong") {
    return "border border-slate-500 bg-slate-200/80 text-slate-800 dark:border-slate-300/55 dark:bg-[linear-gradient(135deg,rgba(100,116,139,0.34)_0%,rgba(30,41,59,0.5)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(51,65,85,0.26)]";
  }

  return "border border-slate-700 bg-slate-800 text-white shadow-sm shadow-slate-300/50 dark:border-blue-400/55 dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.32)_0%,rgba(30,64,175,0.42)_100%)] dark:text-white dark:shadow-[0_14px_30px_rgba(37,99,235,0.24)]";
}
function PageHeader({ tab, setTab }: { tab: TabType; setTab: (t: TabType) => void }) {
  const tabs: { id: TabType; label: string }[] = [
    { id: "live", label: "Xem trực tiếp" },
    { id: "classroom", label: "Xem theo phòng học" },
    { id: "map", label: "Bản đồ camera" },
  ];

  return (
    <div className="mb-4">
      <div className="flex">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${
              tab === t.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatsRow() {
  const total = CAMERAS.length;
  const live = CAMERAS.filter(cam => cam.status === "live").length;
  const offline = CAMERAS.filter(cam => cam.status === "offline").length;
  const baotri = CAMERAS.filter(cam => cam.status === "baotri").length;
  const loi = CAMERAS.filter(cam => cam.status === "loi").length;

  return (
    <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard icon={<Monitor size={18} />} count={total} label="Tổng camera" sub="Tất cả" iconBg="bg-blue-50" iconColor="text-blue-500" />
      <StatCard icon={<RadioTower size={18} />} count={live} label="Đang hoạt động" sub={`${Math.round((live / total) * 100)}%`} iconBg="bg-green-50" iconColor="text-green-500" />
      <StatCard icon={<WifiOff size={18} />} count={offline} label="Offline" sub={`${Math.round((offline / total) * 100)}%`} iconBg="bg-gray-100" iconColor="text-gray-500" />
      <StatCard icon={<Wrench size={18} />} count={baotri} label="Bảo trì" sub={`${Math.round((baotri / total) * 100)}%`} iconBg="bg-yellow-50" iconColor="text-yellow-500" />
      <StatCard icon={<TriangleAlert size={18} />} count={loi} label="Lỗi" sub={`${Math.round((loi / total) * 100)}%`} iconBg="bg-red-50" iconColor="text-red-500" />
    </div>
  );
}

function MapView() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
      <Map size={48} className="opacity-30" />
      <div className="text-sm">Bản đồ camera đang được cập nhật</div>
    </div>
  );
}

function LiveToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  resultCount,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: CameraStatus;
  onStatusChange: (value: CameraStatus) => void;
  resultCount: number;
}) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-blue-300">
            <Search size={15} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên camera, phòng học, khu vực..."
              className="w-full bg-transparent text-[12px] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(option => (
            <button
              key={option.id}
              onClick={() => onStatusChange(option.id)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${getCameraFilterClass(option.id, status === option.id)}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[13px] text-gray-500">
        <span>Kết quả hiển thị: {resultCount} camera</span>
      </div>
    </div>
  );
}

function ClassroomToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  resultCount,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: ClassroomStatus;
  onStatusChange: (value: ClassroomStatus) => void;
  resultCount: number;
}) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-blue-300">
            <Search size={15} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên phòng học, mã lớp..."
              className="w-full bg-transparent text-[12px] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CLASSROOM_STATUS_OPTIONS.map(option => (
            <button
              key={option.id}
              onClick={() => onStatusChange(option.id)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${getClassroomFilterClass(option.id, status === option.id)}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[13px] text-gray-500">
        <span>Kết quả hiển thị: {resultCount} phòng học</span>
      </div>
    </div>
  );
}

function CameraGroup({
  title,
  description,
  cameras,
}: {
  title: string;
  description: string;
  cameras: typeof CAMERAS;
}) {
  if (!cameras.length) return null;

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-[13px] font-semibold text-gray-800">{title}</div>
          <div className="text-[11px] text-gray-400">{description}</div>
        </div>
        <div className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
          {cameras.length} camera
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cameras.map(cam => <CameraCard key={cam.id} cam={cam} />)}
      </div>
    </section>
  );
}

export default function CameraPage() {
  const [tab, setTab] = useState<TabType>("live");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CameraStatus>("all");
  const [classroomSearch, setClassroomSearch] = useState("");
  const [classroomStatusFilter, setClassroomStatusFilter] = useState<ClassroomStatus>("all");

  const normalizedSearch = search.trim().toLowerCase();
  const normalizedClassroomSearch = classroomSearch.trim().toLowerCase();
  const filteredCameras = CAMERAS
    .filter(cam => statusFilter === "all" || cam.status === statusFilter)
    .filter(cam => {
      if (!normalizedSearch) return true;
      const haystack = [cam.id, cam.name, cam.roomName, cam.zone, cam.type, cam.resolution]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedSearch);
    })
    .sort((a, b) => {
      const priorityDiff = STATUS_PRIORITY[a.status as Exclude<CameraStatus, "all">] - STATUS_PRIORITY[b.status as Exclude<CameraStatus, "all">];
      if (priorityDiff !== 0) return priorityDiff;
      return a.roomName.localeCompare(b.roomName) || a.name.localeCompare(b.name);
    });

  const filteredClassrooms = CLASSROOMS
    .filter(room => classroomStatusFilter === "all" || room.status === classroomStatusFilter)
    .filter(room => {
      if (!normalizedClassroomSearch) return true;
      const haystack = [room.id, room.name, room.students, String(room.cameras)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedClassroomSearch);
    });

  const groupedCameras = {
    loi: filteredCameras.filter(cam => cam.status === "loi"),
    offline: filteredCameras.filter(cam => cam.status === "offline"),
    baotri: filteredCameras.filter(cam => cam.status === "baotri"),
    live: filteredCameras.filter(cam => cam.status === "live"),
  };

  const showGroupedLayout = statusFilter !== "all";

  return (
    <div className="p-4">
      <PageHeader tab={tab} setTab={setTab} />
      <StatsRow />

      {tab === "live" && (
        <div>
          <LiveToolbar
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            resultCount={filteredCameras.length}
          />

          {filteredCameras.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
              <div className="text-[13px] font-medium text-gray-700">Không tìm thấy camera phù hợp</div>
              <div className="mt-1 text-[11px] text-gray-400">Thử đổi từ khóa tìm kiếm hoặc chọn lại trạng thái khác.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCameras.map(cam => <CameraCard key={cam.id} cam={cam} />)}
            </div>
          )}
        </div>
      )}

      {tab === "classroom" && (
        <div>
          <ClassroomToolbar
            search={classroomSearch}
            onSearchChange={setClassroomSearch}
            status={classroomStatusFilter}
            onStatusChange={setClassroomStatusFilter}
            resultCount={filteredClassrooms.length}
          />

          {filteredClassrooms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
              <div className="text-[13px] font-medium text-gray-700">Không tìm thấy phòng học phù hợp</div>
              <div className="mt-1 text-[11px] text-gray-400">Thử đổi từ khóa tìm kiếm hoặc chọn lại trạng thái khác.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              {filteredClassrooms.map(room => <ClassroomCard key={room.id} room={room} />)}
            </div>
          )}
        </div>
      )}

      {tab === "map" && <MapView />}
    </div>
  );
}
















