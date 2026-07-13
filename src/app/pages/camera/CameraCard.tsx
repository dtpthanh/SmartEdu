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
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { CAMERAS } from "../../data/cameras";

export function CameraCard({ cam }: { cam: typeof CAMERAS[number] }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const isOffline = cam.status === "offline";
  const isError = cam.status === "loi";
  const isMaintenance = cam.status === "baotri";

  const Badge = () => {
    const badgeBaseClass =
      "absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold leading-none shadow-[0_10px_24px_rgba(15,23,42,0.18)] backdrop-blur-md";

    const config = {
      live: {
        label: "Live",
        className:
          "border-emerald-300/75 bg-emerald-50/92 text-emerald-800 shadow-[0_10px_24px_rgba(16,185,129,0.16)]",
        dotClass: "bg-emerald-400 animate-pulse",
        glowClass: "shadow-[0_0_0_3px_rgba(16,185,129,0.14)]",
      },
      offline: {
        label: "Offline",
        className:
          "border-slate-300/80 bg-white/92 text-slate-700 shadow-[0_10px_24px_rgba(100,116,139,0.14)] dark:!text-[#000000]",
        dotClass: "bg-slate-400",
        glowClass: "shadow-[0_0_0_3px_rgba(148,163,184,0.12)]",
      },
      baotri: {
        label: "Bảo trì",
        className:
          "border-amber-300/80 bg-amber-50/92 text-amber-800 shadow-[0_10px_24px_rgba(245,158,11,0.16)]",
        dotClass: "bg-amber-400",
        glowClass: "shadow-[0_0_0_3px_rgba(245,158,11,0.12)]",
      },
      loi: {
        label: "Lỗi",
        className:
          "border-rose-300/80 bg-rose-50/92 text-rose-800 shadow-[0_10px_24px_rgba(244,63,94,0.16)]",
        dotClass: "bg-rose-400",
        glowClass: "shadow-[0_0_0_3px_rgba(244,63,94,0.12)]",
      },
    }[cam.status];

    return (
      <span className={`${badgeBaseClass} ${config.className}`}>
        <span className={`flex h-3 w-3 items-center justify-center rounded-full ${config.glowClass}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
        </span>
        <span className="tracking-[0.08em]">{config.label}</span>
      </span>
    );
  };

  const handleAction = (label: string) => setNotice(`${label} cho ${cam.name}`);

  return (
    <>
      <article className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_34px_rgba(15,23,42,0.16)] focus-within:border-blue-400 ${isError ? "border-rose-200/80 shadow-rose-100/60" : "border-gray-900/15"}`}>
      <div className="relative overflow-hidden">
        <img
          src={cam.img}
          alt={cam.name}
          className={`h-[168px] w-full object-cover transition duration-500 group-hover:scale-[1.03] ${isOffline ? "grayscale opacity-40" : ""}`}
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/18 to-transparent pointer-events-none" />
        <Badge />
        <button type="button" title="Mở chi tiết camera" aria-label={`Mở chi tiết ${cam.name}`} onClick={() => setOpen(true)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/35 text-white opacity-80 transition-all hover:bg-blue-600 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <Maximize2 size={11} className="text-white" />
        </button>
        {isOffline && (
          <div className="absolute inset-0 flex items-center justify-center">
            <WifiOff size={28} className="text-[#ffffff] dark:text-gray-200" />
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TriangleAlert size={28} className="text-rose-400 drop-shadow-[0_0_14px_rgba(251,113,133,0.55)]" />
          </div>
        )}
        {isMaintenance && (
          <div className="absolute inset-0 flex items-center justify-center">
            <TimerReset size={28} className="text-yellow-400 drop-shadow-[0_0_14px_rgba(250,204,21,0.45)]" />
          </div>
        )}
      </div>

      <div className="px-3 pb-2 pt-2.5">
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
        {[{ icon: <ImageIcon size={15} />, label: "Ảnh chụp" }, { icon: <Video size={15} />, label: "Xem video" }, { icon: <Mic size={15} />, label: "Bật micro" }, { icon: <Settings size={15} />, label: "Cài đặt" }].map(({ icon, label }) => (
          <button key={label} type="button" title={label} aria-label={`${label} - ${cam.name}`} onClick={() => handleAction(label)} className="rounded-md p-1.5 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            {icon}
          </button>
        ))}
      </div>
      {notice && <div role="status" className="border-t border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] text-blue-700">{notice}</div>}
      </article>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{cam.name}</DialogTitle>
            <DialogDescription>{cam.roomName} · {cam.zone}</DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden rounded-lg border bg-black">
            <img src={cam.img} alt={cam.name} className="h-64 w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 sm:grid-cols-4">
            <span>Trạng thái: <b className="text-gray-800">{cam.status}</b></span>
            <span>Độ phân giải: <b className="text-gray-800">{cam.resolution}</b></span>
            <span>Loại: <b className="text-gray-800">{cam.type}</b></span>
            <span>Cập nhật: <b className="text-gray-800">{cam.updatedAt}</b></span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
