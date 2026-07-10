import {
  Clock3,
  ImageIcon,
  MapPin,
  Maximize2,
  Mic,
  Settings,
  TimerReset,
  TriangleAlert,
  Video,
  WifiOff,
} from "lucide-react";
import { CAMERAS } from "../../data/cameras";

export function CameraCard({ cam }: { cam: typeof CAMERAS[number] }) {
  const isOffline = cam.status === "offline";
  const isError = cam.status === "loi";
  const isMaintenance = cam.status === "baotri";

  const Badge = () => {
    const badgeBaseClass =
      "absolute top-2 left-2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] shadow-[0_10px_25px_rgba(15,23,42,0.22)] backdrop-blur-md";

    if (cam.status === "live") {
      return (
        <span className={`${badgeBaseClass} border-emerald-500/40 bg-stone-100/92 text-slate-800 dark:border-emerald-300/40 dark:bg-emerald-500/18 dark:text-white`}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      );
    }

    if (cam.status === "offline") {
      return (
        <span className={`${badgeBaseClass} border-slate-500/40 bg-stone-100/92 text-slate-700 dark:border-slate-300/30 dark:bg-slate-500/18 dark:text-white`}>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Offline
        </span>
      );
    }

    if (cam.status === "baotri") {
      return (
        <span className={`${badgeBaseClass} border-amber-500/40 bg-stone-100/92 text-slate-800 dark:border-amber-300/40 dark:bg-amber-500/18 dark:text-white`}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Bảo trì
        </span>
      );
    }

    return (
      <span className={`${badgeBaseClass} border-rose-500/40 bg-stone-100/92 text-slate-800 dark:border-rose-300/40 dark:bg-rose-500/18 dark:text-white`}>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        Lỗi
      </span>
    );
  };

  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(10,18,32,0.98)_100%)] dark:hover:shadow-[0_22px_50px_rgba(2,6,23,0.55)] ${isError ? "border-rose-200/80 shadow-rose-100/60 dark:border-rose-400/35" : "border-gray-900/15 dark:border-slate-700/60 hover:border-blue-200 dark:hover:border-blue-400/35"}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={cam.img}
          alt={cam.name}
          className={`h-[168px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.045] ${isOffline ? "grayscale opacity-40" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/8 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
        <Badge />
        <button className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/30 transition-all hover:scale-105 hover:bg-black/55">
          <Maximize2 size={11} className="text-white" />
        </button>
        {isOffline && (
          <div className="absolute inset-0 flex items-center justify-center">
            <WifiOff size={30} className="text-gray-200" />
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TriangleAlert size={30} className="text-rose-400 drop-shadow-[0_0_14px_rgba(251,113,133,0.55)]" />
          </div>
        )}
        {isMaintenance && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TimerReset size={30} className="text-yellow-400 drop-shadow-[0_0_14px_rgba(250,204,21,0.45)]" />
          </div>
        )}
      </div>

      <div className="px-3 pt-2.5 pb-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,0.35)]">
            {cam.id}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-gray-800 dark:text-white">{cam.name}</div>
            <div className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-white/78">{cam.roomName}</div>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-500/18 dark:text-white">
            {cam.type}
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-xl bg-gray-50 px-2.5 py-1.5 dark:bg-slate-800/75">
            <div className="flex items-center gap-1 text-gray-400 dark:text-white/68">
              <MapPin size={11} />
              <span>Khu vực</span>
            </div>
            <div className="mt-1 line-clamp-2 text-gray-700 dark:text-white/92">{cam.zone}</div>
          </div>
          <div className="rounded-xl bg-gray-50 px-2.5 py-1.5 dark:bg-slate-800/75">
            <div className="flex items-center gap-1 text-gray-400 dark:text-white/68">
              <Clock3 size={11} />
              <span>Cập nhật</span>
            </div>
            <div className="mt-1 text-gray-700 dark:text-white/92">{cam.updatedAt}</div>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500 dark:text-white/76">
          <span>
            Độ phân giải: <span className="font-medium text-gray-700 dark:text-white">{cam.resolution}</span>
          </span>
          <span>ID: #{cam.id}</span>
        </div>
      </div>

      <div className="flex items-center justify-around border-t border-gray-50 px-2 py-2 dark:border-slate-700/60">
        {[<ImageIcon size={15} />, <Video size={15} />, <Mic size={15} />, <Settings size={15} />].map((icon, i) => (
          <button
            key={i}
            className="rounded-lg p-1 text-gray-400 transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-500 dark:text-white/70 dark:hover:bg-blue-500/12 dark:hover:text-white"
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
