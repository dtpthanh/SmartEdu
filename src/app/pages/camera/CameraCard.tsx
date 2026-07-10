import { Clock3, ImageIcon, MapPin, Maximize2, Mic, Settings, Video, WifiOff } from "lucide-react";
import { CAMERAS } from "../../data/cameras";

export function CameraCard({ cam }: { cam: typeof CAMERAS[number] }) {
  const isOffline = cam.status === "offline";
  const isError = cam.status === "loi";

  const Badge = () => {
    const badgeBaseClass =
      "absolute top-2 left-2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] shadow-[0_10px_25px_rgba(15,23,42,0.22)] backdrop-blur-md";

    if (cam.status === "live") {
      return (
        <span className={`${badgeBaseClass} border-emerald-500/40 bg-stone-100/92 text-slate-800`}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      );
    }

    if (cam.status === "offline") {
      return (
        <span className={`${badgeBaseClass} border-slate-500/40 bg-stone-100/92 text-slate-700`}>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Offline
        </span>
      );
    }

    if (cam.status === "baotri") {
      return (
        <span className={`${badgeBaseClass} border-amber-500/40 bg-stone-100/92 text-slate-800`}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Bảo trì
        </span>
      );
    }

    return (
      <span className={`${badgeBaseClass} border-rose-500/40 bg-stone-100/92 text-slate-800`}>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        Lỗi
      </span>
    );
  };

  return (
    <div className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md ${isError ? "border-rose-200/80 shadow-rose-100/60" : "border-gray-900/15"}`}>
      <div className="relative">
        <img
          src={cam.img}
          alt={cam.name}
          className={`h-[168px] w-full object-cover ${isOffline ? "grayscale opacity-40" : ""}`}
        />
        <Badge />
        <button className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-black/30 transition-colors hover:bg-black/50">
          <Maximize2 size={11} className="text-white" />
        </button>
        {(isOffline || isError) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <WifiOff size={28} className="text-gray-200" />
          </div>
        )}
      </div>

      <div className="px-3 pt-2.5 pb-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
            {cam.id}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-gray-800">{cam.name}</div>
            <div className="mt-0.5 truncate text-[11px] text-gray-500">{cam.roomName}</div>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
            {cam.type}
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={11} />
              <span>Khu vực</span>
            </div>
            <div className="mt-1 line-clamp-2 text-gray-700">{cam.zone}</div>
          </div>
          <div className="rounded-lg bg-gray-50 px-2.5 py-1.5">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock3 size={11} />
              <span>Cập nhật</span>
            </div>
            <div className="mt-1 text-gray-700">{cam.updatedAt}</div>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500">
          <span>Độ phân giải: <span className="font-medium text-gray-700">{cam.resolution}</span></span>
          <span>ID: #{cam.id}</span>
        </div>
      </div>

      <div className="flex items-center justify-around border-t border-gray-50 px-2 py-2">
        {[<ImageIcon size={15} />, <Video size={15} />, <Mic size={15} />, <Settings size={15} />].map((icon, i) => (
          <button key={i} className="p-1 text-gray-400 transition-colors hover:text-blue-500">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
