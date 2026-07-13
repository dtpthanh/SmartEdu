import { Search, SlidersHorizontal, Tv2, Map, PlusCircle, Download } from "lucide-react";
import { ROOM_LIST } from "../../data/cameras";
import { roomStatusDot, roomStatusLabel } from "../../utils/status";

export function ClassroomRightPanel() {
  const stats = [
    { label: "Đang học",         count: 3, pct: 50,  barColor: "bg-blue-500" },
    { label: "Sẵn sàng",         count: 2, pct: 33,  barColor: "bg-teal-500" },
    { label: "Không hoạt động",  count: 1, pct: 17,  barColor: "bg-gray-400" },
    { label: "Tổng cộng",        count: 6, pct: 100, barColor: "bg-blue-500" },
  ];
  return (
    <div className="flex flex-col h-full text-[12px]">
      {/* Room list */}
      <div className="p-3 border-b">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-2">Danh sách phòng học</div>
        <div className="flex gap-1.5">
          <div className="flex-1 flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1.5">
            <Search size={12} className="text-gray-400" />
            <input className="flex-1 text-[11px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm phòng học..." />
          </div>
          <button className="app-icon-btn h-8 w-8 rounded-lg">
            <SlidersHorizontal size={12} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto px-2 py-1" style={{ maxHeight: 220 }}>
        {ROOM_LIST.map(r => (
          <div key={r.id} className="flex items-center justify-between py-1.5 px-1 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${roomStatusDot(r.status)}`} />
              <span className="text-gray-700">{r.name}</span>
            </div>
            <span className={`text-[10px] font-medium ${
              r.status === "danghoc" ? "text-green-600" :
              r.status === "sansang" ? "text-blue-600" :
              "text-gray-500"
            }`}>{roomStatusLabel(r.status)}</span>
          </div>
        ))}
        <button className="w-full text-center text-blue-600 text-[11px] py-2 hover:underline">
          Xem tất cả (32)
        </button>
      </div>

      {/* Stats by room */}
      <div className="border-t p-3">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-3">Thống kê theo phòng</div>
        <div className="space-y-2.5">
          {stats.map(s => (
            <div key={s.label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-gray-600">{s.label}</span>
                <span className="text-gray-500">{s.count} phòng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.barColor}`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-[11px] text-gray-500 w-8 text-right">{s.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="border-t p-3">
        <div className="font-semibold text-[11px] text-gray-500 uppercase tracking-wider mb-2">Hành động nhanh</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Tv2 size={18} />,       label: "Xem trực tiếp" },
            { icon: <Map size={18} />,        label: "Xem bản đồ" },
            { icon: <PlusCircle size={18} />, label: "Thêm camera" },
            { icon: <Download size={18} />,   label: "Xuất danh sách" },
          ].map(item => (
            <button key={item.label} className="flex flex-col items-center gap-1.5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="app-icon-tile bg-blue-50 text-blue-600">{item.icon}</span>
              <span className="text-[10px] text-gray-600 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
