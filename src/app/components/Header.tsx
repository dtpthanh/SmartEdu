import { useState, useEffect } from "react";
import { Bell, ChevronDown, Monitor, Menu } from "lucide-react";

export function Header({ onToggleCollapse }: { onToggleCollapse: () => void }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const clock = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <header className="h-[56px] bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
      <button onClick={onToggleCollapse} className="text-gray-400 hover:text-gray-700 flex-shrink-0 transition-colors">
        <Menu size={18} />
      </button>
      <div className="flex-shrink-0">
        <div className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">Hệ thống quản lý phòng học thông minh</div>
      </div>
      <div className="flex-1" />
      {/* Bell */}
      <div className="relative cursor-pointer">
        <Bell size={18} className="text-gray-500" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
      </div>
      {/* Clock */}
      <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
        <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center">
          <Monitor size={10} className="text-gray-500" />
        </div>
        <span className="font-mono">{clock}</span>
      </div>
      {/* User */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">A</div>
        <div>
          <div className="text-[11px] font-semibold text-gray-800">admin</div>
          <div className="text-[10px] text-gray-400">Quản trị viên</div>
        </div>
        <ChevronDown size={12} className="text-gray-400" />
      </div>
    </header>
  );
}
