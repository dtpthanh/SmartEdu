import { useState } from "react";
import {
  Server, Activity, WifiOff, TriangleAlert, Wrench, Camera, HardDrive, Download,
  Search, SlidersHorizontal, ChevronDown, Eye, Settings, MoreHorizontal,
  School, CalendarDays,
} from "lucide-react";
import { StatCard } from "../../components/StatCard";
import { Pagination } from "../../components/Pagination";
import { ALL_DEVICES, CAMERA_DEVICES, NVR_DEVICES } from "../../data/devices";

type DeviceTabType = "all" | "camera" | "nvr";

function devStatusBadge(s: string) {
  if (s === "hoatdong")     return <span className="flex items-center gap-1 text-green-600 text-[11px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Hoạt động</span>;
  if (s === "ngoaitiyen")   return <span className="flex items-center gap-1 text-red-500 text-[11px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />Ngoài tuyến</span>;
  if (s === "canhbao")      return <span className="flex items-center gap-1 text-yellow-600 text-[11px] font-medium"><TriangleAlert size={11} />Cảnh báo</span>;
  if (s === "ghihinh")      return <span className="flex items-center gap-1 text-green-600 text-[11px] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Ghi hình</span>;
  if (s === "dungluongthap") return <span className="flex items-center gap-1 text-orange-500 text-[11px] font-medium"><TriangleAlert size={11} />Dung lượng thấp</span>;
  return <span className="text-gray-400 text-[11px]">{s}</span>;
}

function DeviceIcon({ kind }: { kind: "cam" | "nvr" }) {
  if (kind === "nvr") return (
    <div className="w-10 h-7 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
      <HardDrive size={13} className="text-gray-300" />
    </div>
  );
  return (
    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
      <Camera size={14} className="text-gray-500" />
    </div>
  );
}

function TableActions() {
  return (
    <div className="flex items-center gap-1.5">
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors">
        <Eye size={13} />
      </button>
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
        <Settings size={13} />
      </button>
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
        <MoreHorizontal size={13} />
      </button>
    </div>
  );
}

function DeviceToolbar({ placeholders }: { placeholders: string[] }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-900/15">
      <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-1.5">
        <Search size={13} className="text-gray-400 flex-shrink-0" />
        <input className="flex-1 text-[12px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm theo tên thiết bị, mã thiết bị, phòng học..." />
      </div>
      {placeholders.map(p => (
        <button key={p} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          {p} <ChevronDown size={11} className="text-gray-400" />
        </button>
      ))}
      <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white hover:bg-gray-50 flex-shrink-0">
        <SlidersHorizontal size={13} /> Bộ lọc
      </button>
      <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 bg-white hover:bg-gray-50 flex-shrink-0">
        <Download size={13} /> Xuất danh sách
      </button>
    </div>
  );
}

export default function DevicesPage() {
  const [tab, setTab] = useState<DeviceTabType>("all");

  const TABS = [
    { id: "all" as DeviceTabType,    label: "Tất cả thiết bị" },
    { id: "camera" as DeviceTabType, label: "Camera" },
    { id: "nvr" as DeviceTabType,    label: "Đầu ghi (NVR)" },
  ];

  const statsAll = [
    { icon: <Server size={18} />,       count: 128, label: "Tổng thiết bị",    sub: "Tất cả thiết bị trong hệ thống", iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 112, label: "Đang hoạt động",   sub: "87.5% tổng thiết bị",            iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 12,  label: "Ngoài tuyến",      sub: "9.4% tổng thiết bị",             iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 4,  label: "Cảnh báo",         sub: "3.1% tổng thiết bị",             iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Wrench size={18} />,       count: 0,   label: "Bảo trì",          sub: "0% tổng thiết bị",               iconBg: "bg-gray-100",  iconColor: "text-gray-400" },
  ];
  const statsCamera = [
    { icon: <Camera size={18} />,       count: 48, label: "Tổng camera",      sub: "Tất cả camera",        iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 42, label: "Đang hoạt động",   sub: "87.5% tổng camera",   iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 4,  label: "Ngoài tuyến",      sub: "8.3% tổng camera",    iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 1, label: "Cảnh báo",         sub: "2.1% tổng camera",    iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Wrench size={18} />,       count: 1,  label: "Bảo trì",          sub: "2.1% tổng camera",    iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  ];
  const statsNvr = [
    { icon: <HardDrive size={18} />,    count: 12, label: "Tổng đầu ghi",     sub: "Tất cả đầu ghi",      iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 9,  label: "Đang hoạt động",   sub: "75% tổng đầu ghi",    iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 2,  label: "Ngoài tuyến",      sub: "16.7% tổng đầu ghi",  iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 1, label: "Dung lượng cảnh báo", sub: "8.3% tổng đầu ghi", iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Download size={18} />,     count: 2,  label: "Cần cập nhật",     sub: "16.7% tổng đầu ghi",  iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  const currentStats = tab === "all" ? statsAll : tab === "camera" ? statsCamera : statsNvr;

  const thTh = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap";
  const td = "px-4 py-3 text-[12px] text-gray-700 align-middle";

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {currentStats.map(s => (
          <StatCard key={s.label} icon={s.icon} count={s.count} label={s.label} sub={s.sub} iconBg={s.iconBg} iconColor={s.iconColor} />
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm">
        {/* Toolbar */}
        {tab === "all" && <DeviceToolbar placeholders={["Tất cả trạng thái", "Tất cả loại thiết bị", "Tất cả phòng học"]} />}
        {tab === "camera" && <DeviceToolbar placeholders={["Tất cả trạng thái", "Tất cả loại camera", "Tất cả phòng học"]} />}
        {tab === "nvr" && <DeviceToolbar placeholders={["Tất cả trạng thái", "Tất cả loại đầu ghi", "Tất cả tòa nhà / khu vực"]} />}

        {/* Table – All devices */}
        {tab === "all" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-900/15">
                <tr>
                  <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                  <th className={thTh}>Thiết bị</th>
                  <th className={thTh}>Loại thiết bị</th>
                  <th className={thTh}>Phòng học</th>
                  <th className={thTh}>Địa chỉ IP</th>
                  <th className={thTh}>Trạng thái</th>
                  <th className={thTh}>Thời gian hoạt động</th>
                  <th className={thTh}>Phiên bản</th>
                  <th className={thTh}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ALL_DEVICES.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <DeviceIcon kind={d.kind as "cam"|"nvr"} />
                        <div>
                          <div className="font-medium text-gray-800 text-[12px]">{d.name}</div>
                          <div className="text-[11px] text-gray-400">{d.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className={td}>{d.type}</td>
                    <td className={td}>{d.room}</td>
                    <td className={`${td} font-mono text-[11px]`}>{d.ip}</td>
                    <td className={td}>{devStatusBadge(d.status)}</td>
                    <td className={td}>{d.uptime}</td>
                    <td className={td}><span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded font-mono">{d.version}</span></td>
                    <td className={td}><TableActions /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination total={128} label="thiết bị" />
          </div>
        )}

        {/* Table – Camera */}
        {tab === "camera" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-900/15">
                <tr>
                  <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                  <th className={thTh}>Thiết bị</th>
                  <th className={thTh}>Loại camera</th>
                  <th className={thTh}>Phòng học</th>
                  <th className={thTh}>Địa chỉ IP</th>
                  <th className={thTh}>Trạng thái</th>
                  <th className={thTh}>Thời gian hoạt động</th>
                  <th className={thTh}>Phiên bản</th>
                  <th className={thTh}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CAMERA_DEVICES.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <DeviceIcon kind="cam" />
                        <div>
                          <div className="font-medium text-gray-800 text-[12px]">{d.name}</div>
                          <div className="text-[11px] text-gray-400">{d.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className={td}>{d.type}</td>
                    <td className={td}>{d.room}</td>
                    <td className={`${td} font-mono text-[11px]`}>{d.ip}</td>
                    <td className={td}>{devStatusBadge(d.status)}</td>
                    <td className={td}>{d.uptime}</td>
                    <td className={td}><span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded font-mono">{d.version}</span></td>
                    <td className={td}><TableActions /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination total={48} label="camera" />
          </div>
        )}

        {/* Table – NVR */}
        {tab === "nvr" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-900/15">
                <tr>
                  <th className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></th>
                  <th className={thTh}>Tên đầu ghi</th>
                  <th className={thTh}>Mã thiết bị</th>
                  <th className={thTh}>Số kênh</th>
                  <th className={thTh}>Khu vực / Phòng kỹ thuật</th>
                  <th className={thTh}>Địa chỉ IP</th>
                  <th className={thTh} style={{ minWidth: 160 }}>Dung lượng lưu trữ</th>
                  <th className={thTh}>Trạng thái ghi hình</th>
                  <th className={thTh}>Online lần cuối</th>
                  <th className={thTh}>Phiên bản firmware</th>
                  <th className={thTh}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {NVR_DEVICES.map(d => {
                  const barColor = d.pct >= 85 ? "bg-red-500" : d.pct >= 60 ? "bg-yellow-400" : "bg-blue-500";
                  return (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                      <td className={td}>
                        <div className="flex items-center gap-3">
                          <DeviceIcon kind="nvr" />
                          <div>
                            <div className="font-medium text-gray-800 text-[12px]">{d.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`${td} font-mono text-[11px]`}>{d.code}</td>
                      <td className={td}>{d.channels}</td>
                      <td className={td}>{d.location}</td>
                      <td className={`${td} font-mono text-[11px]`}>{d.ip}</td>
                      <td className={td}>
                        <div className="text-[11px] text-gray-600 mb-1">{d.usedTB} TB / {d.totalTB} TB</div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${d.pct}%` }} />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{d.pct}%</div>
                      </td>
                      <td className={td}>{devStatusBadge(d.status)}</td>
                      <td className={td}>
                        <span className="flex items-center gap-1 text-[11px]">
                          <span className={`w-1.5 h-1.5 rounded-full ${d.status === "ngoaitiyen" ? "bg-red-500" : "bg-green-500"}`} />
                          {d.lastOnline}
                        </span>
                      </td>
                      <td className={td}><span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded font-mono">{d.firmware}</span></td>
                      <td className={td}><TableActions /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination total={9} label="đầu ghi" />
          </div>
        )}
      </div>
    </div>
  );
}

