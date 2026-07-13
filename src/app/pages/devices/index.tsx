import { useState } from "react";
import {
  Server, Activity, WifiOff, TriangleAlert, Wrench, Camera, HardDrive, Download,
  Search, SlidersHorizontal, ChevronDown, Settings, MoreHorizontal,
  X, Plus,
} from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MouseEventHandler } from "react";
import { StatCard } from "../../components/StatCard";
import { Pagination } from "../../components/Pagination";
import { PageTabs } from "../../components/PageTabs";
import { AddEntityDialog } from "../../components/AddEntityDialog";
import { ALL_DEVICES, CAMERA_DEVICES, NVR_DEVICES } from "../../data/devices";

type DeviceTabType = "all" | "camera" | "nvr";
type AllDevice = {
  id: string;
  name: string;
  code: string;
  type: string;
  room: string;
  ip: string;
  status: string;
  uptime: string;
  version: string;
  kind: "cam" | "nvr";
};
type CameraDevice = Omit<AllDevice, "kind">;
type NvrDevice = {
  id: string;
  name: string;
  code: string;
  channels: number;
  location: string;
  ip: string;
  usedTB: number;
  totalTB: number;
  pct: number;
  status: string;
  lastOnline: string;
  firmware: string;
};
type SelectedDevice =
  | { tab: "all"; device: AllDevice }
  | { tab: "camera"; device: CameraDevice }
  | { tab: "nvr"; device: NvrDevice };

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

function TableActions({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div className="flex items-center gap-1.5" onClick={onClick}>
      <button className="app-icon-btn">
        <Settings size={13} />
      </button>
      <button className="app-icon-btn">
        <MoreHorizontal size={13} />
      </button>
    </div>
  );
}

function DeviceToolbar({ placeholders }: { placeholders: string[] }) {
  return (
    <div className="app-toolbar-strip flex flex-wrap items-center gap-2 px-4 py-3">
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

function DeviceDetailPanel({ selected, onClose }: { selected: SelectedDevice; onClose: () => void }) {
  const { device, tab } = selected;
  const isNvr = tab === "nvr";
  const title = isNvr ? "Chi tiết đầu ghi" : tab === "camera" ? "Chi tiết camera" : "Chi tiết thiết bị";
  const deviceKind = isNvr ? "nvr" : "cam";
  const details = isNvr
    ? [
        ["Mã thiết bị", device.code],
        ["Khu vực / Phòng kỹ thuật", device.location],
        ["Địa chỉ IP", device.ip],
        ["Số kênh", `${device.channels} kênh`],
        ["Dung lượng", `${device.usedTB} TB / ${device.totalTB} TB (${device.pct}%)`],
        ["Online lần cuối", device.lastOnline],
        ["Firmware", device.firmware],
      ]
    : [
        ["Mã thiết bị", device.code],
        ["Loại thiết bị", device.type],
        ["Phòng học", device.room],
        ["Địa chỉ IP", device.ip],
        ["Thời gian hoạt động", device.uptime],
        ["Phiên bản", device.version],
      ];
  const primaryInfo = isNvr
    ? [
        ["Khu vực", device.location],
        ["Địa chỉ IP", device.ip],
        ["Số kênh", `${device.channels} kênh`],
      ]
    : [
        ["Phòng học", device.room],
        ["Địa chỉ IP", device.ip],
        ["Loại thiết bị", device.type],
      ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/35 backdrop-blur-[1px]" onClick={onClose}>
      <div
        className="h-full w-full max-w-[min(36rem,100vw)] overflow-y-auto bg-white shadow-2xl dark:bg-card"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-start gap-4">
            <DeviceIcon kind={deviceKind} />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{title}</div>
              <div className="mt-1 text-[17px] font-bold leading-snug text-gray-900 dark:text-white">{device.name}</div>
              <div className="mt-1.5 font-mono text-[12px] font-semibold text-gray-500">{device.code}</div>
            </div>
          </div>
          <button type="button" className="app-icon-btn h-9 w-9 rounded-lg" onClick={onClose} aria-label="Đóng chi tiết">
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-gray-700">
                {isNvr ? "Trạng thái ghi hình" : "Trạng thái thiết bị"}
              </span>
              {devStatusBadge(device.status)}
            </div>
            {isNvr ? (
              <>
                <div className="mb-1 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Dung lượng đã dùng</span>
                  <span className="font-semibold text-gray-700">{device.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${device.pct >= 85 ? "bg-red-500" : device.pct >= 60 ? "bg-yellow-400" : "bg-blue-500"}`}
                    style={{ width: `${device.pct}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="text-[11px] text-gray-500">{device.uptime}</div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {primaryInfo.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</div>
                <div className="mt-1 break-words text-[13px] font-semibold leading-snug text-gray-800">{value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 text-[13px] font-bold text-gray-800">Thông tin chi tiết</div>
            <div className="divide-y divide-gray-100 rounded-lg border border-gray-100">
            {details.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[140px_1fr] gap-4 px-3 py-2.5">
                <span className="text-[11px] font-medium text-gray-500">{label}</span>
                <span className="break-words text-right text-[12px] font-semibold leading-5 text-gray-800">{value}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function DevicesPage() {
  const [tab, setTab] = useState<DeviceTabType>("all");
  const [selectedDevice, setSelectedDevice] = useState<SelectedDevice | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [allDevices, setAllDevices] = useState<AllDevice[]>(ALL_DEVICES as AllDevice[]);
  const [cameraDevices, setCameraDevices] = useState<CameraDevice[]>(CAMERA_DEVICES);
  const [nvrDevices, setNvrDevices] = useState<NvrDevice[]>(NVR_DEVICES);

  const TABS = [
    { id: "all" as DeviceTabType,    label: "Tất cả thiết bị" },
    { id: "camera" as DeviceTabType, label: "Camera" },
    { id: "nvr" as DeviceTabType,    label: "Đầu ghi (NVR)" },
  ];

  const statsAll = [
    { icon: <Server size={18} />,       count: 128, label: "Tổng thiết bị",    sub: "Thiết bị", iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 112, label: "Đang hoạt động",   sub: "87.5%",            iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 12,  label: "Ngoài tuyến",      sub: "9.4%",             iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 4,  label: "Cảnh báo",         sub: "3.1%",             iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Wrench size={18} />,       count: 0,   label: "Bảo trì",          sub: "0%",               iconBg: "bg-gray-100",  iconColor: "text-gray-400" },
  ];
  const statsCamera = [
    { icon: <Camera size={18} />,       count: 48, label: "Tổng camera",      sub: "Camera",        iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 42, label: "Đang hoạt động",   sub: "87.5%",   iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 4,  label: "Ngoài tuyến",      sub: "8.3%",    iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 1, label: "Cảnh báo",         sub: "2.1%",    iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Wrench size={18} />,       count: 1,  label: "Bảo trì",          sub: "2.1%",    iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  ];
  const statsNvr = [
    { icon: <HardDrive size={18} />,    count: 12, label: "Tổng đầu ghi",     sub: "Đầu ghi",      iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Activity size={18} />,     count: 9,  label: "Đang hoạt động",   sub: "75%",    iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { icon: <WifiOff size={18} />,      count: 2,  label: "Ngoại tuyến",      sub: "16.7%",  iconBg: "bg-red-50",    iconColor: "text-red-500" },
    { icon: <TriangleAlert size={18} />, count: 1, label: "Cảnh báo", sub: "8.3%", iconBg: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: <Download size={18} />,     count: 2,  label: "Cần cập nhật",     sub: "16.7%",  iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  const currentStats = tab === "all" ? statsAll : tab === "camera" ? statsCamera : statsNvr;

  const thTh = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap";
  const td = "px-4 py-3 text-[12px] text-gray-700 align-middle";

  function handleAddDevice(values: Record<string, string>) {
    const id = Date.now().toString();
    const isNvr = values.kind === "nvr";
    const code = values.code || `${isNvr ? "NVR" : "CAM"}-${id.slice(-4)}`;
    const name = values.name || (isNvr ? "NVR mới" : "Camera mới");
    const ip = values.ip || "192.168.1.200";
    const room = values.room || "Chưa gán phòng";

    if (isNvr) {
      const nvr: NvrDevice = {
        id: `nvr-${id}`,
        name,
        code,
        channels: Number(values.channels || 16),
        location: room,
        ip,
        usedTB: 0,
        totalTB: Number(values.storage || 8),
        pct: 0,
        status: "ghihinh",
        lastOnline: "Vừa thêm",
        firmware: values.version || "V4.0.2",
      };
      setNvrDevices(current => [nvr, ...current]);
      setAllDevices(current => [
        {
          id: `all-${id}`,
          name,
          code,
          type: "Đầu ghi (NVR)",
          room,
          ip,
          status: "hoatdong",
          uptime: "Vừa thêm",
          version: nvr.firmware,
          kind: "nvr",
        },
        ...current,
      ]);
      setTab("nvr");
      return;
    }

    const camera: CameraDevice = {
      id: `cam-${id}`,
      name,
      code,
      type: values.type || "Camera cố định",
      room,
      ip,
      status: "hoatdong",
      uptime: "Vừa thêm",
      version: values.version || "V2.1.8",
    };
    setCameraDevices(current => [camera, ...current]);
    setAllDevices(current => [{ ...camera, id: `all-${id}`, kind: "cam" }, ...current]);
    setTab("camera");
  }

  return (
    <div className="app-page">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <PageTabs tabs={TABS} activeTab={tab} onChange={setTab} ariaLabel="Loại thiết bị" />
        <button
          type="button"
          className="app-primary-action flex items-center gap-1.5 rounded-lg px-[15px] py-[9px] text-[12px] font-medium"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus size={16} /> Thêm thiết bị
        </button>
      </div>

      {/* Stats */}
      <div className="app-grid-stats mb-4">
        {currentStats.map(s => (
          <StatCard key={s.label} icon={s.icon} count={s.count} label={s.label} sub={s.sub} iconBg={s.iconBg} iconColor={s.iconColor} />
        ))}
      </div>

      {/* Table card */}
      <div className="app-table-card">
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
                {allDevices.map(d => (
                  <tr
                    key={d.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedDevice({ tab: "all", device: d })}
                  >
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
                    <td className={td}><TableActions onClick={event => event.stopPropagation()} /></td>
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
                {cameraDevices.map(d => (
                  <tr
                    key={d.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedDevice({ tab: "camera", device: d })}
                  >
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
                    <td className={td}><TableActions onClick={event => event.stopPropagation()} /></td>
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
                  <th className={thTh} style={{ minWidth: 220 }}>Tên đầu ghi</th>
                  <th className={thTh}>Số kênh</th>
                  <th className={thTh}>Khu vực / Phòng kỹ thuật</th>
                  <th className={thTh} style={{ minWidth: 160 }}>Dung lượng lưu trữ</th>
                  <th className={thTh}>Trạng thái ghi hình</th>
                  <th className={thTh}>Online lần cuối</th>
                  <th className={thTh}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {nvrDevices.map(d => {
                  const barColor = d.pct >= 85 ? "bg-red-500" : d.pct >= 60 ? "bg-yellow-400" : "bg-blue-500";
                  return (
                    <tr
                      key={d.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedDevice({ tab: "nvr", device: d })}
                    >
                      <td className={td} style={{ minWidth: 220 }}>
                        <div className="flex items-center gap-3">
                          <DeviceIcon kind="nvr" />
                          <div className="min-w-0">
                            <div className="whitespace-nowrap font-medium text-gray-800 text-[12px]">{d.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className={td}>{d.channels}</td>
                      <td className={td}>{d.location}</td>
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
                      <td className={td}>
                        <TableActions onClick={event => event.stopPropagation()} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination total={9} label="đầu ghi" />
          </div>
        )}
      </div>
      {selectedDevice && <DeviceDetailPanel selected={selectedDevice} onClose={() => setSelectedDevice(null)} />}
      <AddEntityDialog
        open={isAddOpen}
        title="Thêm thiết bị"
        description="Nhập thông tin cơ bản để tạo thiết bị mới trong danh sách."
        submitLabel="Lưu thiết bị"
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddDevice}
        fields={[
          {
            name: "kind",
            label: "Loại thiết bị",
            defaultValue: tab === "nvr" ? "nvr" : "cam",
            options: [
              { label: "Camera", value: "cam" },
              { label: "Đầu ghi (NVR)", value: "nvr" },
            ],
          },
          { name: "name", label: "Tên thiết bị", placeholder: "Camera 13 - Cửa ra vào", required: true },
          { name: "code", label: "Mã thiết bị", placeholder: "CAM13-CR-A101" },
          { name: "room", label: "Phòng / Khu vực", placeholder: "A101 - Lớp 10A1", required: true },
          { name: "ip", label: "Địa chỉ IP", placeholder: "192.168.1.120", required: true },
          { name: "type", label: "Loại camera", placeholder: "Camera cố định" },
          { name: "channels", label: "Số kênh NVR", type: "number", defaultValue: "16" },
          { name: "storage", label: "Dung lượng NVR (TB)", type: "number", defaultValue: "8" },
          { name: "version", label: "Phiên bản", placeholder: "V2.1.8" },
        ]}
      />
    </div>
  );
}

