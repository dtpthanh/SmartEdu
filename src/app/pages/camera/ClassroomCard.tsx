import {
  Activity,
  ArrowRight,
  Camera,
  GraduationCap,
  Maximize2,
  Users,
  WifiOff,
} from "lucide-react";
import { CLASSROOMS } from "../../data/cameras";
import { roomStatusLabel } from "../../utils/status";

export function ClassroomCard({ room }: { room: typeof CLASSROOMS[number] }) {
  const isInactive = room.status === "khonghoatdong";
  const offlineFeeds = room.feeds.filter(feed => feed !== "online").length;

  const Badge = () => {
    const badgeBaseClass =
      "absolute top-2 left-2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] shadow-[0_10px_25px_rgba(15,23,42,0.22)] backdrop-blur-md";

    if (room.status === "danghoc") {
      return (
        <span className={`${badgeBaseClass} border-emerald-500/40 bg-stone-100/92 text-slate-800`}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {roomStatusLabel(room.status)}
        </span>
      );
    }

    if (room.status === "sansang") {
      return (
        <span className={`${badgeBaseClass} border-amber-500/40 bg-stone-100/92 text-slate-800`}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          {roomStatusLabel(room.status)}
        </span>
      );
    }

    return (
      <span className={`${badgeBaseClass} border-slate-500/40 bg-stone-100/92 text-slate-700`}>
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        {roomStatusLabel(room.status)}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-900/15 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <img
          src={room.img}
          alt={room.name}
          className={`h-[152px] w-full object-cover ${isInactive ? "grayscale opacity-40" : ""}`}
        />
        <Badge />
        <button className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-black/30 transition-colors hover:bg-black/50">
          <Maximize2 size={11} className="text-white" />
        </button>
        {isInactive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <WifiOff size={28} className="text-gray-200" />
          </div>
        )}
      </div>

      <div className="px-3 pt-2.5 pb-1.5">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
            {room.id}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-gray-800">{room.name}</div>
            <div className="mt-0.5 truncate text-[11px] text-gray-500">
              {room.cameras} camera theo doi lop hoc
            </div>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
            {room.students}
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
            <div className="flex items-center gap-1 text-gray-400">
              <Users size={11} />
              <span>Si so</span>
            </div>
            <div className="mt-1 text-gray-700">{room.students} hoc sinh</div>
          </div>
          <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
            <div className="flex items-center gap-1 text-gray-400">
              <Activity size={11} />
              <span>Tap trung</span>
            </div>
            <div className="mt-1 text-gray-700">{room.attention}%</div>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500">
          <span>
            Trang thai: <span className="font-medium text-gray-700">{roomStatusLabel(room.status)}</span>
          </span>
          <span>{offlineFeeds > 0 ? `${offlineFeeds} feed loi` : "On dinh"}</span>
        </div>
      </div>

      <div className="flex items-center justify-around border-t border-gray-50 px-2 py-2">
        {[<Camera size={15} />, <GraduationCap size={15} />, <Activity size={15} />, <ArrowRight size={15} />].map((icon, i) => (
          <button key={i} className="p-1 text-gray-400 transition-colors hover:text-blue-500">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
