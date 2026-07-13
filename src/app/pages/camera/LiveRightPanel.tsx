import {
  Search, SlidersHorizontal, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Plus, Minus, Video, ImageIcon, Mic, Settings,
} from "lucide-react";
import { CAMERAS } from "../../data/cameras";
import { statusDotClass, statusLabel } from "../../utils/status";

export function LiveRightPanel() {
  return (
    <div className="flex flex-col h-full text-[12px]">
      {/* Camera list */}
      <div className="p-3 border-b">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-2">Danh sách camera</div>
        <div className="flex gap-1.5">
          <div className="flex-1 flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1.5">
            <Search size={12} className="text-gray-400" />
            <input className="flex-1 text-[11px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm camera..." />
          </div>
          <button className="app-icon-btn h-8 w-8 rounded-lg">
            <SlidersHorizontal size={12} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 px-2 py-1">
        {CAMERAS.map(cam => {
          const s = cam.status === "live" ? "online" : cam.status;
          return (
            <div key={cam.id} className="flex items-center justify-between py-1.5 px-1 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDotClass(s)}`} />
                <span className="text-gray-700">{cam.id}. {cam.name}</span>
              </div>
              <span className={`text-[10px] font-medium ${
                s === "online" ? "text-green-600" : s === "offline" ? "text-gray-500" : s === "baotri" ? "text-yellow-600" : "text-red-500"
              }`}>{statusLabel(s)}</span>
            </div>
          );
        })}
        <button className="w-full text-center text-blue-600 text-[11px] py-2 hover:underline">
          Xem tất cả (32)
        </button>
      </div>

      {/* PTZ Controls */}
      <div className="border-t p-3">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-2">Điều khiển PTZ</div>
        {/* Camera selector */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg px-2 py-1.5 mb-3 cursor-pointer hover:bg-gray-50">
          <span className="text-gray-700 text-[11px]">03. Camera Học sinh PTZ</span>
          <ChevronDown size={12} className="text-gray-400" />
        </div>
        {/* D-pad */}
        <div className="flex justify-center mb-3">
          <div className="grid grid-cols-3 gap-1 w-[90px]">
            <div />
            <button className="app-icon-btn h-7 w-7 rounded-lg border-0 bg-gray-100">
              <ChevronUp size={14} className="text-gray-600" />
            </button>
            <div />
            <button className="app-icon-btn h-7 w-7 rounded-lg border-0 bg-gray-100">
              <ChevronLeft size={14} className="text-gray-600" />
            </button>
            <button className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </button>
            <button className="app-icon-btn h-7 w-7 rounded-lg border-0 bg-gray-100">
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <div />
            <button className="app-icon-btn h-7 w-7 rounded-lg border-0 bg-gray-100">
              <ChevronDown size={14} className="text-gray-600" />
            </button>
            <div />
          </div>
        </div>
        {/* Zoom / Focus / Iris */}
        {["Zoom", "Focus", "Iris"].map(ctrl => (
          <div key={ctrl} className="flex items-center justify-between mb-1.5">
            <span className="text-gray-600 w-12">{ctrl}</span>
            <div className="flex-1 flex justify-end gap-6">
              <button className="app-icon-btn h-6 w-6 rounded-md text-gray-600">
                <Plus size={12} />
              </button>
              <button className="app-icon-btn h-6 w-6 rounded-md text-gray-600">
                <Minus size={12} />
              </button>
            </div>
          </div>
        ))}
        {/* Preset */}
        <div className="mt-2">
          <div className="text-gray-500 text-[11px] mb-1">Preset</div>
          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-2 py-1.5 mb-2 cursor-pointer hover:bg-gray-50">
            <span className="text-gray-700 text-[11px]">01 - Bảng</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["Gọi", "Lưu", "Xóa"].map(btn => (
              <button key={btn} className={`py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                btn === "Gọi" ? "bg-blue-500 text-white hover:bg-blue-600" :
                btn === "Lưu" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" :
                "bg-red-50 text-red-500 hover:bg-red-100"
              }`}>{btn}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick record */}
      <div className="border-t p-3">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-2">Ghi hình nhanh</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Video size={18} />, label: "Bắt đầu ghi" },
            { icon: <ImageIcon size={18} />, label: "Chụp ảnh" },
            { icon: <Mic size={18} />, label: "Đàm thoại" },
            { icon: <Settings size={18} />, label: "Cài đặt" },
          ].map(item => (
            <button key={item.label} className="flex flex-col items-center gap-1.5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="app-icon-tile bg-gray-50 text-gray-600">{item.icon}</span>
              <span className="text-[10px] text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
