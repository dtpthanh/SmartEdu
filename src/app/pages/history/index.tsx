import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Play,
  RotateCcw,
  Search,
  TriangleAlert,
} from "lucide-react";
import { REC_LIST } from "../../data/recordings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

type RecordItem = (typeof REC_LIST)[number];

const ALL_OPTION = "Tất cả";
const TABLE_HEAD = "px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap";
const TABLE_CELL = "px-3 py-3 text-[12px] text-slate-700 align-middle dark:text-slate-200";

const RECORD_TYPES = [ALL_OPTION, ...new Set(REC_LIST.map(record => record.type))];
const CAMERA_OPTIONS = [ALL_OPTION, ...new Set(REC_LIST.map(record => record.camera.split("·")[0].trim()))];
const ROOM_OPTIONS = [ALL_OPTION, ...new Set(REC_LIST.map(record => record.room))];

function getCameraName(record: RecordItem) {
  return record.camera.split("·")[0].trim();
}

function getCameraDetail(record: RecordItem) {
  return record.camera.split("·").slice(1).join("·").trim();
}

function typeBadge(type: string) {
  const style = type === "Sự kiện" ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-700";

  const darkStyle = type.startsWith("S")
    ? "dark:bg-amber-500/18 dark:text-amber-200 dark:ring-1 dark:ring-amber-400/24"
    : "dark:bg-blue-500/16 dark:text-blue-200 dark:ring-1 dark:ring-blue-400/20";

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${style} ${darkStyle}`}>
      {type}
    </span>
  );
}

function parseRecordSize(size: string) {
  const value = Number.parseFloat(size.replace(",", "."));
  if (Number.isNaN(value)) return 0;
  return size.toUpperCase().includes("GB") ? value * 1024 : value;
}

function formatStorageSize(sizeInMb: number) {
  if (sizeInMb >= 1024) return `${(sizeInMb / 1024).toFixed(1)} GB`;
  return `${sizeInMb.toFixed(1)} MB`;
}

export default function HistoryPage() {
  const [camera, setCamera] = useState(ALL_OPTION);
  const [room, setRoom] = useState(ALL_OPTION);
  const [recordType, setRecordType] = useState(ALL_OPTION);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [viewingRecord, setViewingRecord] = useState<RecordItem | null>(null);

  const filteredRecords = useMemo(() => {
    return REC_LIST.filter(record => {
      const matchesCamera = camera === ALL_OPTION || getCameraName(record) === camera;
      const matchesRoom = room === ALL_OPTION || record.room === room;
      const matchesType = recordType === ALL_OPTION || record.type === recordType;

      const recordDate = record.start.slice(0, 10).split("/").reverse().join("-");
      const matchesFromDate = fromDate ? recordDate >= fromDate : true;
      const matchesToDate = toDate ? recordDate <= toDate : true;

      return matchesCamera && matchesRoom && matchesType && matchesFromDate && matchesToDate;
    });
  }, [camera, fromDate, recordType, room, toDate]);

  const hasActiveFilters =
    camera !== ALL_OPTION || room !== ALL_OPTION || recordType !== ALL_OPTION || fromDate !== "" || toDate !== "";

  const totalStorageMb = useMemo(
    () => REC_LIST.reduce((total, record) => total + parseRecordSize(record.size), 0),
    [],
  );
  const storagePercent = Math.min(100, Math.max(6, (filteredRecords.length / Math.max(REC_LIST.length, 1)) * 100));

  const resetFilters = () => {
    setCamera(ALL_OPTION);
    setRoom(ALL_OPTION);
    setRecordType(ALL_OPTION);
    setFromDate("");
    setToDate("");
  };

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    setFromDate(start.toISOString().slice(0, 10));
    setToDate(end.toISOString().slice(0, 10));
  };

  return (
    <div className="app-page">
      <div className="mb-4 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <section className="app-surface overflow-hidden">
          <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/70">
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-slate-900 dark:text-slate-50">
              <span className="h-4 w-1 rounded-full bg-blue-500" />
              Bộ lọc tìm kiếm
            </div>
          </div>

          <div className="space-y-4 p-4">
            <div className="grid gap-4 xl:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                  Phòng học
                </label>
                <select
                  value={room}
                  onChange={event => setRoom(event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100"
                >
                  {ROOM_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option === ALL_OPTION ? "Tất cả phòng" : option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                  Camera
                </label>
                <select
                  value={camera}
                  onChange={event => setCamera(event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100"
                >
                  {CAMERA_OPTIONS.map(option => (
                    <option key={option} value={option}>
                      {option === ALL_OPTION ? "Tất cả camera" : option}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 text-[11px] text-slate-400">
                  Chọn một phòng cụ thể nếu muốn lọc theo camera.
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                  Trạng thái bản ghi
                </label>
                <select
                  value={recordType}
                  onChange={event => setRecordType(event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition-colors focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100"
                >
                  {RECORD_TYPES.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                Khoảng thời gian
              </label>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950/40">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={event => setFromDate(event.target.value)}
                    className="w-full bg-transparent text-[12px] outline-none dark:text-slate-100"
                  />
                  <CalendarDays size={14} className="text-slate-400" />
                </div>
                <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950/40">
                  <input
                    type="date"
                    value={toDate}
                    onChange={event => setToDate(event.target.value)}
                    className="w-full bg-transparent text-[12px] outline-none dark:text-slate-100"
                  />
                  <CalendarDays size={14} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Hôm nay", days: 1 },
                { label: "Hôm qua", days: 2 },
                { label: "7 ngày qua", days: 7 },
                { label: "30 ngày qua", days: 30 },
              ].map(option => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setQuickRange(option.days)}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-[12px] font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-500/10 dark:hover:text-blue-200"
                >
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                className="inline-flex h-8 min-w-[160px] items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 text-[13px] font-medium text-white transition-colors hover:bg-blue-700 md:ml-auto"
              >
                <Search size={14} />
                Tìm kiếm
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className={`inline-flex h-8 min-w-[160px] items-center justify-center gap-1.5 rounded-md px-4 text-[13px] font-medium transition-colors ${
                  hasActiveFilters
                    ? "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-200"
                    : "border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <RotateCcw size={14} />
                Đặt lại
              </button>
            </div>
          </div>
        </section>

        <section className="app-surface overflow-hidden">
          <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/70">
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-slate-900 dark:text-slate-50">
              <span className="h-4 w-1 rounded-full bg-violet-500" />
              Dung lượng lưu trữ
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] text-slate-500 dark:text-slate-400">Đã sử dụng</div>
                <div className="mt-1 text-[20px] font-bold text-slate-900 dark:text-slate-50">
                  {formatStorageSize(totalStorageMb)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-bold leading-none text-slate-900 dark:text-slate-50">
                  {filteredRecords.length}
                </div>
                <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">bản ghi</div>
              </div>
            </div>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${storagePercent}%` }} />
            </div>
          </div>
        </section>
      </div>

      <section className="app-surface overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/70 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-[17px] font-semibold text-slate-900 dark:text-slate-50">
              Danh sách các bản ghi
            </div>
            <div className="text-[13px] text-slate-500 dark:text-slate-400">
              Hiển thị {filteredRecords.length} / {REC_LIST.length} bản ghi
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/90 dark:bg-slate-900/70">
              <tr className="border-b border-slate-200/80 dark:border-slate-700/70">
                <th className={TABLE_HEAD}>Hình thu nhỏ</th>
                <th className={TABLE_HEAD}>Camera</th>
                <th className={TABLE_HEAD}>Phòng học</th>
                <th className={TABLE_HEAD}>Bắt đầu</th>
                <th className={TABLE_HEAD}>Kết thúc</th>
                <th className={TABLE_HEAD}>Loại</th>
                <th className={TABLE_HEAD}>Thời lượng</th>
                <th className={TABLE_HEAD}>Dung lượng</th>
                <th className={TABLE_HEAD}>Sự kiện</th>
                <th className={TABLE_HEAD}>Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="mx-auto flex max-w-md flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10">
                        <TriangleAlert size={20} />
                      </div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        Không tìm thấy bản ghi phù hợp
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Hãy thử nới điều kiện lọc hoặc đặt lại bộ tìm kiếm.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRecords.map(record => (
                  <tr
                    key={record.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setViewingRecord(record)}
                    onKeyDown={event => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setViewingRecord(record);
                      }
                    }}
                    className="cursor-pointer transition-colors hover:bg-slate-50/70 focus:outline-none focus-visible:bg-blue-50/80 dark:hover:bg-slate-800/40 dark:focus-visible:bg-blue-950/30"
                  >
                    <td className="px-3 py-3">
                      <img src={record.img} alt="" className="h-11 w-16 rounded-lg object-cover" />
                    </td>
                    <td className={TABLE_CELL}>
                      <div className="text-[12px] font-medium text-slate-900 dark:text-slate-100">
                        {getCameraName(record)}
                      </div>
                      <div className="text-[10px] text-slate-400">{getCameraDetail(record)}</div>
                    </td>
                    <td className={TABLE_CELL}>{record.room}</td>
                    <td className={`${TABLE_CELL} font-mono text-[11px] whitespace-nowrap`}>{record.start}</td>
                    <td className={`${TABLE_CELL} font-mono text-[11px] whitespace-nowrap`}>{record.end}</td>
                    <td className={TABLE_CELL}>{typeBadge(record.type)}</td>
                    <td className={`${TABLE_CELL} font-mono`}>{record.duration}</td>
                    <td className={TABLE_CELL}>{record.size}</td>
                    <td className={TABLE_CELL}>
                      {record.event === "-" ? (
                        <span className="text-slate-400">-</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                          <TriangleAlert size={12} className="text-amber-500" />
                          {record.event}
                        </span>
                      )}
                    </td>
                    <td className={TABLE_CELL}>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="app-icon-btn"
                          aria-label="Phát bản ghi"
                          onClick={event => {
                            event.stopPropagation();
                            setViewingRecord(record);
                          }}
                        >
                          <Play size={12} />
                        </button>
                        <button
                          type="button"
                          className="app-icon-btn"
                          aria-label="Tải xuống"
                          onClick={event => event.stopPropagation()}
                        >
                          <Download size={12} />
                        </button>
                        <button
                          type="button"
                          className="app-icon-btn"
                          aria-label="Khác"
                          onClick={event => event.stopPropagation()}
                        >
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200/80 px-4 py-3 text-[12px] text-slate-500 dark:border-slate-700/70 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Đang hiển thị {filteredRecords.length} bản ghi gần nhất</span>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg border border-slate-200 px-3 py-1.5 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80">
              <ChevronLeft size={14} />
            </button>
            <button type="button" className="rounded-lg border border-blue-600 bg-blue-600 px-3 py-1.5 font-medium text-white">
              1
            </button>
            <button type="button" className="rounded-lg border border-slate-200 px-3 py-1.5 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/80">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <Dialog open={viewingRecord !== null} onOpenChange={open => !open && setViewingRecord(null)}>
        <DialogContent className="max-w-[860px] overflow-hidden p-0">
          {viewingRecord && (
            <>
              <DialogHeader className="border-b border-slate-200 px-5 py-4 text-left dark:border-slate-700">
                <DialogTitle className="text-base">Xem bản ghi</DialogTitle>
                <DialogDescription>
                  {getCameraName(viewingRecord)} · {viewingRecord.room} · {viewingRecord.start}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
                <div className="bg-black">
                  <div className="relative aspect-video">
                    <img src={viewingRecord.img} alt="" className="h-full w-full object-cover opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 text-blue-600 shadow-xl transition-transform hover:scale-105"
                        aria-label="Phát bản ghi"
                      >
                        <Play size={24} fill="currentColor" />
                      </button>
                    </div>
                    <div className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-white">
                      {viewingRecord.start}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                      Thông tin bản ghi
                    </div>
                    <div className="mt-2 text-[15px] font-semibold text-slate-900 dark:text-slate-50">
                      {getCameraName(viewingRecord)}
                    </div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400">
                      {getCameraDetail(viewingRecord)}
                    </div>
                  </div>

                  <div className="grid gap-2 text-[12px]">
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Phòng học</span>
                      <span className="font-medium text-slate-800 dark:text-slate-100">{viewingRecord.room}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Bắt đầu</span>
                      <span className="font-mono text-slate-800 dark:text-slate-100">{viewingRecord.start}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Kết thúc</span>
                      <span className="font-mono text-slate-800 dark:text-slate-100">{viewingRecord.end}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Thời lượng</span>
                      <span className="font-mono text-slate-800 dark:text-slate-100">{viewingRecord.duration}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Dung lượng</span>
                      <span className="font-medium text-slate-800 dark:text-slate-100">{viewingRecord.size}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Loại</span>
                      {typeBadge(viewingRecord.type)}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      <Play size={13} />
                      Phát
                    </button>
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-[12px] font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Download size={13} />
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
