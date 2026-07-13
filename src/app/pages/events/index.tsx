import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Filter,
  MapPin,
  School2,
  Search,
  SlidersHorizontal,
  FileClock,
} from "lucide-react";
import { PageTabs } from "../../components/PageTabs";
import { StatCard } from "../../components/StatCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";

type TabType = "schedule" | "events" | "history";
type ScheduleStatus = "Đang học" | "Sắp diễn ra" | "Đã xong";
type EventLevel = "Cao" | "Trung bình" | "Thấp";
type EventStatus = "Chưa tiếp nhận" | "Chờ xử lý";
type HistoryStatus = "Chờ xử lý" | "Hoàn tất";

type ScheduleItem = {
  day: string;
  time: string;
  room: string;
  subject: string;
  teacher: string;
  note: string;
  status: ScheduleStatus;
};

type EventItem = {
  id: number;
  time: string;
  room: string;
  title: string;
  level: EventLevel;
  source: string;
  summary: string;
  status: EventStatus;
};

type HistoryItem = {
  time: string;
  actor: string;
  action: string;
  room: string;
  result: HistoryStatus;
  note: string;
};

const TAB_OPTIONS: { id: TabType; label: string }[] = [
  { id: "schedule", label: "Thời khóa biểu" },
  { id: "events", label: "Danh sách sự kiện" },
  { id: "history", label: "Lịch sử xử lý" },
];

const WEEK_DAYS = [
  { key: "mon", label: "Thứ 2", offset: 0 },
  { key: "tue", label: "Thứ 3", offset: 1 },
  { key: "wed", label: "Thứ 4", offset: 2 },
  { key: "thu", label: "Thứ 5", offset: 3 },
  { key: "fri", label: "Thứ 6", offset: 4 },
  { key: "sat", label: "Thứ 7", offset: 5 },
  { key: "sun", label: "Chủ nhật", offset: 6 },
];

const DEFAULT_WEEK = "2026-W29";
const TIME_SLOTS = ["07:00 - 07:45", "08:00 - 08:45", "09:00 - 09:45", "10:00 - 10:45", "13:30 - 14:15", "14:30 - 15:15"];

const SCHEDULE: Array<ScheduleItem & { dayKey: string }> = [
  { dayKey: "mon", day: "Thứ 2", time: "07:00 - 07:45", room: "A101 - 10A1", subject: "Toán", teacher: "Cô Linh", note: "Khởi động tuần mới", status: "Đang học" },
  { dayKey: "mon", day: "Thứ 2", time: "08:00 - 08:45", room: "A101 - 10A1", subject: "Ngữ văn", teacher: "Cô Trang", note: "Bài đọc hiểu", status: "Đang học" },
  { dayKey: "mon", day: "Thứ 2", time: "09:00 - 09:45", room: "B102 - 11B2", subject: "Vật lý", teacher: "Thầy Quân", note: "Thí nghiệm điện học", status: "Sắp diễn ra" },
  { dayKey: "mon", day: "Thứ 2", time: "10:00 - 10:45", room: "A101 - 10A1", subject: "Tiếng Anh", teacher: "Thầy Minh", note: "Luyện nói theo cặp", status: "Sắp diễn ra" },
  { dayKey: "mon", day: "Thứ 2", time: "13:30 - 14:15", room: "A102 - 10A2", subject: "Sinh học", teacher: "Cô Hạnh", note: "Quan sát mẫu vật", status: "Sắp diễn ra" },
  { dayKey: "mon", day: "Thứ 2", time: "14:30 - 15:15", room: "B101 - 11B1", subject: "GDCD", teacher: "Cô Thảo", note: "Thảo luận nhóm", status: "Sắp diễn ra" },
  { dayKey: "tue", day: "Thứ 3", time: "07:00 - 07:45", room: "C201 - 12C1", subject: "Hóa học", teacher: "Cô Mai", note: "Ôn tập phản ứng oxi hóa", status: "Đang học" },
  { dayKey: "tue", day: "Thứ 3", time: "08:00 - 08:45", room: "B102 - 11B2", subject: "Lịch sử", teacher: "Cô Vy", note: "Dòng thời gian sự kiện", status: "Đang học" },
  { dayKey: "tue", day: "Thứ 3", time: "09:00 - 09:45", room: "A102 - 10A2", subject: "Tin học", teacher: "Thầy Nam", note: "Thực hành lập trình", status: "Sắp diễn ra" },
  { dayKey: "tue", day: "Thứ 3", time: "10:00 - 10:45", room: "A103 - 10A3", subject: "Địa lý", teacher: "Cô Phương", note: "Đọc bản đồ", status: "Sắp diễn ra" },
  { dayKey: "tue", day: "Thứ 3", time: "13:30 - 14:15", room: "C202 - 12C2", subject: "Vật lý", teacher: "Thầy Quân", note: "Bài tập vận dụng", status: "Sắp diễn ra" },
  { dayKey: "tue", day: "Thứ 3", time: "14:30 - 15:15", room: "A101 - 10A1", subject: "Thể dục", teacher: "Thầy Khoa", note: "Rèn luyện đội hình", status: "Sắp diễn ra" },
  { dayKey: "wed", day: "Thứ 4", time: "07:00 - 07:45", room: "B101 - 11B1", subject: "Toán", teacher: "Cô Linh", note: "Hàm số bậc hai", status: "Đang học" },
  { dayKey: "wed", day: "Thứ 4", time: "08:00 - 08:45", room: "C201 - 12C1", subject: "Ngữ văn", teacher: "Cô Trang", note: "Phân tích tác phẩm", status: "Đang học" },
  { dayKey: "wed", day: "Thứ 4", time: "09:00 - 09:45", room: "A102 - 10A2", subject: "Tiếng Anh", teacher: "Thầy Minh", note: "Luyện nghe", status: "Sắp diễn ra" },
  { dayKey: "wed", day: "Thứ 4", time: "10:00 - 10:45", room: "B101 - 11B1", subject: "Sinh học", teacher: "Cô Hạnh", note: "Bài về hệ hô hấp", status: "Đã xong" },
  { dayKey: "wed", day: "Thứ 4", time: "13:30 - 14:15", room: "A101 - 10A1", subject: "GDCD", teacher: "Cô Thảo", note: "Thảo luận nhóm", status: "Sắp diễn ra" },
  { dayKey: "wed", day: "Thứ 4", time: "14:30 - 15:15", room: "C202 - 12C2", subject: "Tin học", teacher: "Thầy Nam", note: "Hoàn thiện bài thực hành", status: "Sắp diễn ra" },
  { dayKey: "thu", day: "Thứ 5", time: "07:00 - 07:45", room: "A103 - 10A3", subject: "Hóa học", teacher: "Cô Mai", note: "Thí nghiệm an toàn", status: "Đang học" },
  { dayKey: "thu", day: "Thứ 5", time: "08:00 - 08:45", room: "C202 - 12C2", subject: "Tiếng Anh", teacher: "Thầy Minh", note: "Luyện nghe", status: "Đang học" },
  { dayKey: "thu", day: "Thứ 5", time: "09:00 - 09:45", room: "B101 - 11B1", subject: "Toán", teacher: "Cô Linh", note: "Luyện đề nhanh", status: "Sắp diễn ra" },
  { dayKey: "thu", day: "Thứ 5", time: "10:00 - 10:45", room: "A101 - 10A1", subject: "Địa lý", teacher: "Cô Phương", note: "Địa hình Việt Nam", status: "Sắp diễn ra" },
  { dayKey: "thu", day: "Thứ 5", time: "13:30 - 14:15", room: "C201 - 12C1", subject: "Sinh học", teacher: "Cô Hạnh", note: "Ôn tập chương", status: "Sắp diễn ra" },
  { dayKey: "thu", day: "Thứ 5", time: "14:30 - 15:15", room: "B102 - 11B2", subject: "Lịch sử", teacher: "Cô Vy", note: "Kết nối chủ đề", status: "Sắp diễn ra" },
  { dayKey: "fri", day: "Thứ 6", time: "07:00 - 07:45", room: "A103 - 10A3", subject: "Địa lý", teacher: "Cô Phương", note: "Bản đồ châu Á", status: "Đã xong" },
  { dayKey: "fri", day: "Thứ 6", time: "08:00 - 08:45", room: "A101 - 10A1", subject: "Vật lý", teacher: "Thầy Quân", note: "Kiểm tra 15 phút", status: "Đang học" },
  { dayKey: "fri", day: "Thứ 6", time: "09:00 - 09:45", room: "C201 - 12C1", subject: "Thể dục", teacher: "Thầy Khoa", note: "Kiểm tra thể lực", status: "Sắp diễn ra" },
  { dayKey: "fri", day: "Thứ 6", time: "10:00 - 10:45", room: "B102 - 11B2", subject: "Ngữ văn", teacher: "Cô Trang", note: "Viết đoạn văn", status: "Sắp diễn ra" },
  { dayKey: "fri", day: "Thứ 6", time: "13:30 - 14:15", room: "A102 - 10A2", subject: "Tin học", teacher: "Thầy Nam", note: "Bài tập thuật toán", status: "Sắp diễn ra" },
  { dayKey: "fri", day: "Thứ 6", time: "14:30 - 15:15", room: "C202 - 12C2", subject: "GDCD", teacher: "Cô Thảo", note: "Tổng kết tuần", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "07:00 - 07:45", room: "B101 - 11B1", subject: "Toán", teacher: "Cô Linh", note: "Phụ đạo theo nhóm", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "08:00 - 08:45", room: "A101 - 10A1", subject: "Chuyên đề", teacher: "Bộ môn", note: "Hoạt động liên môn", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "09:00 - 09:45", room: "A103 - 10A3", subject: "Tiếng Anh", teacher: "Thầy Minh", note: "Câu lạc bộ giao tiếp", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "10:00 - 10:45", room: "C201 - 12C1", subject: "Hóa học", teacher: "Cô Mai", note: "Thực hành phòng lab", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "13:30 - 14:15", room: "Thư viện", subject: "Tự học", teacher: "Giám thị", note: "Ôn tập có hướng dẫn", status: "Sắp diễn ra" },
  { dayKey: "sat", day: "Thứ 7", time: "14:30 - 15:15", room: "Sân trường", subject: "Sinh hoạt", teacher: "GVCN", note: "Sinh hoạt cuối tuần", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "07:00 - 07:45", room: "Thư viện", subject: "Tự học", teacher: "Giám thị", note: "Ôn bài đầu tuần", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "08:00 - 08:45", room: "A101 - 10A1", subject: "Chuyên đề Toán", teacher: "Cô Linh", note: "Bồi dưỡng học sinh", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "09:00 - 09:45", room: "A102 - 10A2", subject: "Chuyên đề Anh", teacher: "Thầy Minh", note: "Luyện kỹ năng nghe nói", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "10:00 - 10:45", room: "Phòng lab", subject: "Khoa học", teacher: "Cô Mai", note: "Thực hành nhóm", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "13:30 - 14:15", room: "Sân trường", subject: "CLB Thể thao", teacher: "Thầy Khoa", note: "Sinh hoạt câu lạc bộ", status: "Sắp diễn ra" },
  { dayKey: "sun", day: "Chủ nhật", time: "14:30 - 15:15", room: "Hội trường", subject: "Kỹ năng sống", teacher: "GVCN", note: "Chuẩn bị tuần mới", status: "Sắp diễn ra" },
];

const EVENTS: EventItem[] = [
  { id: 1, time: "09:35", room: "A101 - 10A1", title: "Độ ồn vượt ngưỡng", level: "Cao", source: "AI Analytics", summary: "Mức ồn đo được 78 dB, vượt ngưỡng cho phép trong giờ học.", status: "Chưa tiếp nhận" },
  { id: 2, time: "09:28", room: "A102 - 10A2", title: "Nói chuyện riêng", level: "Trung bình", source: "AI Analytics", summary: "Hệ thống phát hiện nhiều cụm hội thoại trong lớp học.", status: "Chưa tiếp nhận" },
  { id: 3, time: "09:20", room: "B101 - 11B1", title: "Học sinh rời chỗ", level: "Trung bình", source: "AI Analytics", summary: "Có 3 học sinh di chuyển khỏi vị trí ngồi.", status: "Chờ xử lý" },
  { id: 4, time: "09:15", room: "C201 - 12C1", title: "Giơ tay phát biểu", level: "Thấp", source: "AI Analytics", summary: "Phát hiện hành vi tương tác tích cực trong lớp.", status: "Chờ xử lý" },
  { id: 5, time: "09:05", room: "B102 - 11B2", title: "Nhiệt độ tăng cao", level: "Cao", source: "NVR-01", summary: "Nhiệt độ phòng đạt 31.2°C, cần kiểm tra điều hòa.", status: "Chưa tiếp nhận" },
  { id: 6, time: "08:50", room: "Thư viện", title: "Xâm nhập khu vực", level: "Cao", source: "Camera 07", summary: "Phát hiện người lạ đi vào khu vực hạn chế.", status: "Chờ xử lý" },
];

const HISTORY: HistoryItem[] = [
  { time: "09:37:45", actor: "admin", action: "Xác nhận và đóng sự kiện", room: "A101 - 10A1", result: "Hoàn tất", note: "Đã nhắc nhở giáo viên và ghi nhận vào báo cáo buổi sáng." },
  { time: "09:36:20", actor: "giovienA", action: "Tiếp nhận cảnh báo", room: "A102 - 10A2", result: "Chờ xử lý", note: "Đã kiểm tra lớp, yêu cầu học sinh ổn định trật tự." },
  { time: "09:35:50", actor: "AI Analytics", action: "Tự động gán mức độ", room: "A101 - 10A1", result: "Hoàn tất", note: "Mức cảnh báo được gán là cao dựa trên ngưỡng ồn." },
  { time: "09:22:11", actor: "Quản trị viên", action: "Chuyển xử lý cho giáo viên", room: "B101 - 11B1", result: "Chờ xử lý", note: "Đã chuyển thông báo tới giáo viên chủ nhiệm." },
  { time: "09:05:30", actor: "Hệ thống", action: "Ghi nhận nhật ký thiết bị", room: "B102 - 11B2", result: "Hoàn tất", note: "Đã lưu trạng thái nhiệt độ và kiểm tra cảm biến." },
];

function levelBadge(level: EventLevel) {
  const cls =
    level === "Cao"
      ? "bg-red-100 text-red-700"
      : level === "Trung bình"
        ? "bg-amber-100 text-amber-700"
        : "bg-blue-100 text-blue-700";

  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{level}</span>;
}

function historyBadge(result: HistoryStatus) {
  const cls =
    result === "Hoàn tất"
      ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-200"
      : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200";

  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{result}</span>;
}

function PageHeader({ tab, setTab }: { tab: TabType; setTab: (tab: TabType) => void }) {
  return (
    <div className="mb-4">
      <PageTabs tabs={TAB_OPTIONS} activeTab={tab} onChange={setTab} ariaLabel="Chế độ xem sự kiện" />
    </div>
  );
}

function getWeekStart(weekValue: string) {
  const [yearText, weekText] = weekValue.split("-W");
  const year = Number(yearText);
  const week = Number(weekText);

  if (!year || !week) {
    return getWeekStart(DEFAULT_WEEK);
  }

  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const monday = new Date(year, 0, 4 - jan4Day + 1);
  monday.setDate(monday.getDate() + (week - 1) * 7);
  return monday;
}

function formatWeekDate(weekValue: string, dayOffset: number) {
  const date = getWeekStart(weekValue);
  date.setDate(date.getDate() + dayOffset);
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function SummaryRow({
  tab,
  setTab,
  eventCount,
  handledCount,
  pendingCount,
}: {
  tab: TabType;
  setTab: (tab: TabType) => void;
  eventCount: number;
  handledCount: number;
  pendingCount: number;
}) {

  return (
    <div className="app-grid-stats mb-4">
      <StatCard onClick={() => setTab("events")} active={tab === "events"} icon={<AlertTriangle size={18} />} count={eventCount} label="Sự kiện" sub="Đang theo dõi" iconBg="bg-blue-50" iconColor="text-orange-500" />
      <StatCard onClick={() => setTab("history")} active={tab === "history"} icon={<CheckCircle2 size={18} />} count={handledCount} label="Đã giải quyết" sub="Hoàn tất" iconBg="bg-green-50" iconColor="text-green-500" />
      <StatCard onClick={() => setTab("history")} active={tab === "history"} icon={<FileClock size={18} />} count={pendingCount} label="Chờ xử lý" sub="Cần theo dõi" iconBg="bg-orange-50" iconColor="text-yellow-500" />
    </div>
  );
}

function ScheduleTab() {
  const [selectedWeek, setSelectedWeek] = useState(DEFAULT_WEEK);
  const weekDays = useMemo(
    () => WEEK_DAYS.map(day => ({ ...day, fullDate: formatWeekDate(selectedWeek, day.offset) })),
    [selectedWeek],
  );

  return (
    <div>
      <div className="app-toolbar overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200/70 px-4 py-4 dark:border-slate-700/70 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-[15px] font-semibold text-slate-900 dark:text-slate-50">Thời khóa biểu lớp học</div>
            <div className="text-[13px] text-slate-500 dark:text-slate-400">Chọn tuần để xem nhanh lịch học tương ứng</div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] font-medium text-slate-500 dark:text-slate-400" htmlFor="schedule-week">
              Tuần
            </label>
            <input
              id="schedule-week"
              type="week"
              value={selectedWeek}
              onChange={event => setSelectedWeek(event.target.value || DEFAULT_WEEK)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition-colors focus:border-blue-300 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] table-fixed border-separate border-spacing-0">
            <colgroup>
              <col className="w-[136px]" />
              {weekDays.map(day => (
                <col key={day.key} />
              ))}
            </colgroup>
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-900/60">
                <th className="sticky left-0 z-10 border-b border-r border-slate-200/70 bg-inherit px-3 py-3 text-center text-[12px] font-semibold text-slate-900 dark:border-slate-700/70 dark:text-slate-50">
                  Giờ
                </th>
                {weekDays.map(day => (
                  <th
                    key={day.key}
                    className="border-b border-slate-200/70 px-4 py-3 text-center text-[12px] font-semibold text-slate-900 dark:border-slate-700/70 dark:text-slate-50"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{day.label}</span>
                      <span>{day.fullDate}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map(slot => (
                <tr key={slot} className="align-top">
                  <td className="sticky left-0 z-10 border-b border-r border-slate-200/70 bg-white px-3 py-4 text-[12px] font-semibold text-slate-900 dark:border-slate-700/70 dark:bg-slate-950/20 dark:text-slate-50">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Clock3 size={13} className="text-blue-500" />
                      {slot}
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const item = SCHEDULE.find(entry => entry.dayKey === day.key && entry.time === slot);

                    return (
                      <td key={`${day.key}-${slot}`} className="border-b border-slate-200/70 bg-white px-3 py-3 dark:border-slate-700/70 dark:bg-slate-950/20">
                        {item ? (
                          <div className="rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/20 dark:hover:bg-slate-800/40">
                            <div className="mb-2">
                              <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-50">{item.room}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.subject}</div>
                            </div>
                            <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <School2 size={12} className="text-slate-400" />
                                {item.teacher}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-slate-400" />
                                {item.note}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex min-h-[98px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 text-[11px] text-slate-400 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-500">
                            Trống
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EventsTab({
  events,
  setEvents,
  setHistoryItems,
}: {
  events: EventItem[];
  setEvents: (value: EventItem[] | ((current: EventItem[]) => EventItem[])) => void;
  setHistoryItems: (value: HistoryItem[] | ((current: HistoryItem[]) => HistoryItem[])) => void;
}) {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<EventLevel | "Tất cả">("Tất cả");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return events.filter(item => {
      const matchesQuery = normalized
        ? [item.time, item.room, item.title, item.source, item.summary].join(" ").toLowerCase().includes(normalized)
        : true;
      const matchesLevel = levelFilter === "Tất cả" || item.level === levelFilter;
      return matchesQuery && matchesLevel;
    });
  }, [events, levelFilter, query]);

  const receiveEvent = (event: EventItem) => {
    if (event.status === "Chờ xử lý") {
      return;
    }

    setEvents(current => current.map(item => (item.id === event.id ? { ...item, status: "Chờ xử lý" } : item)));
    setSelectedEvent(current => (current?.id === event.id ? { ...current, status: "Chờ xử lý" } : current));
    setHistoryItems(current => [
      {
        time: new Date().toLocaleTimeString("vi-VN", { hour12: false }),
        actor: "Quản trị viên",
        action: `Đã tiếp nhận: ${event.title}`,
        room: event.room,
        result: "Chờ xử lý",
        note: event.summary,
      },
      ...current,
    ]);
  };

  const resolveEvent = (event: EventItem) => {
    const resolvedAt = new Date();
    const time = resolvedAt.toLocaleTimeString("vi-VN", { hour12: false });

    setEvents(current => current.filter(item => item.id !== event.id));
    setSelectedEvent(null);
    setHistoryItems(current => [
      {
        time,
        actor: "Quản trị viên",
        action: `Đã giải quyết: ${event.title}`,
        room: event.room,
        result: "Hoàn tất",
        note: event.summary,
      },
      ...current,
    ]);
  };

  return (
    <div className="app-toolbar overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-200/70 px-4 py-4 dark:border-slate-700/70 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="text-[16px] font-semibold text-slate-900 dark:text-slate-50">Danh sách sự kiện</div>
          <div className="text-[13px] text-slate-500 dark:text-slate-400">{filteredEvents.length} sự kiện phù hợp với bộ lọc hiện tại</div>
        </div>
        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
          <div className="app-toolbar-control flex min-h-10 items-center gap-2 px-3">
            <Search size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm theo lớp, sự kiện, nguồn..."
              className="w-64 bg-transparent text-[12px] outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["Tất cả", "Cao", "Trung bình", "Thấp"].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setLevelFilter(level as EventLevel | "Tất cả")}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  levelFilter === level
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-300"
                }`}
              >
                {level}
              </button>
            ))}
            <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-200">
              <SlidersHorizontal size={13} />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {filteredEvents.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Search size={18} />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Không tìm thấy sự kiện phù hợp</div>
            <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">Thử đổi từ khóa hoặc chọn lại mức độ cảnh báo.</div>
          </div>
        ) : (
          filteredEvents.map(event => {
            const levelClass =
              event.level === "Cao"
                ? "border-red-200 bg-red-50/70 dark:border-red-500/20 dark:bg-red-500/5"
                : event.level === "Trung bình"
                  ? "border-amber-200 bg-amber-50/70 dark:border-amber-500/20 dark:bg-amber-500/5"
                  : "border-blue-200 bg-blue-50/70 dark:border-blue-500/20 dark:bg-blue-500/5";

            return (
              <article
                key={event.id}
                role="button"
                tabIndex={0}
                aria-label={`Xem chi tiết sự kiện ${event.title}`}
                onClick={() => setSelectedEvent(event)}
                onKeyDown={keyEvent => {
                  if (keyEvent.key === "Enter" || keyEvent.key === " ") {
                    keyEvent.preventDefault();
                    setSelectedEvent(event);
                  }
                }}
                className={`mx-4 my-3 rounded-2xl border px-4 py-4 transition-colors hover:cursor-pointer hover:bg-white dark:hover:bg-slate-900/40 ${levelClass}`}
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="truncate text-[14px] font-semibold text-slate-900 dark:text-slate-50">{event.title}</div>
                      {levelBadge(event.level)}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400">
                      <span className="rounded-md bg-white/80 px-2 py-1 font-mono font-semibold text-slate-700 dark:bg-slate-950/30 dark:text-slate-200">{event.time}</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 dark:bg-slate-950/30">
                        <MapPin size={12} />
                        {event.room}
                      </span>
                      <span className="rounded-md bg-white/80 px-2 py-1 dark:bg-slate-950/30">{event.source}</span>
                      <span className={`rounded-md px-2 py-1 font-medium ${event.status === "Chờ xử lý" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200" : "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200"}`}>
                        Trạng thái: {event.status}
                      </span>
                    </div>
                    <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-600 dark:text-slate-300">{event.summary}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    {event.status === "Chưa tiếp nhận" ? (
                      <button
                        type="button"
                        onClick={clickEvent => {
                          clickEvent.stopPropagation();
                          receiveEvent(event);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25"
                      >
                        <CheckCircle2 size={13} />
                        Đã tiếp nhận
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={clickEvent => {
                        clickEvent.stopPropagation();
                        resolveEvent(event);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                    >
                      Đã giải quyết
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <Dialog
        open={selectedEvent !== null}
        onOpenChange={open => {
          if (!open) {
            setSelectedEvent(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[720px]">
          {selectedEvent ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-left text-slate-900 dark:text-slate-50">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-left">
                  Sự kiện được ghi nhận lúc {selectedEvent.time} tại {selectedEvent.room}.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/30 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mức độ</div>
                    <div className="mt-1">{levelBadge(selectedEvent.level)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Trạng thái</div>
                    <div className="mt-1">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${selectedEvent.status === "Chờ xử lý" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200" : "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200"}`}>
                        {selectedEvent.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Thời gian</div>
                    <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedEvent.time}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Phòng</div>
                    <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedEvent.room}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Nguồn</div>
                    <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedEvent.source}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mã sự kiện</div>
                    <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">#{selectedEvent.id.toString().padStart(3, "0")}</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 dark:border-slate-700 dark:bg-slate-950/20 dark:text-slate-300">
                  {selectedEvent.summary}
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                {selectedEvent.status === "Chưa tiếp nhận" ? (
                  <button
                    type="button"
                    onClick={() => receiveEvent(selectedEvent)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25"
                  >
                    <CheckCircle2 size={13} />
                    Đã tiếp nhận
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => resolveEvent(selectedEvent)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                >
                  Đã giải quyết
                </button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HistoryTab({ historyItems }: { historyItems: HistoryItem[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<HistoryStatus | "Tất cả">("Tất cả");

  const filteredHistory = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return historyItems.filter(item => {
      const matchesQuery = normalized
        ? [item.time, item.actor, item.action, item.room, item.note].join(" ").toLowerCase().includes(normalized)
        : true;
      const matchesStatus = statusFilter === "Tất cả" || item.result === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [historyItems, query, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="app-toolbar overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200/70 px-4 py-4 dark:border-slate-700/70 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-[15px] font-semibold text-slate-900 dark:text-slate-50">Lịch sử xử lý</div>
            <div className="text-[13px] text-slate-500 dark:text-slate-400">Theo dõi toàn bộ thao tác liên quan đến sự kiện</div>
          </div>
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
            <div className="app-toolbar-control flex min-h-10 items-center gap-2 px-3">
              <Search size={14} className="text-slate-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm người xử lý, lớp học, ghi chú..."
                className="w-64 bg-transparent text-[12px] outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["Tất cả", "Hoàn tất", "Chờ xử lý"].map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status as HistoryStatus | "Tất cả")}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    statusFilter === status
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-300"
                  }`}
                >
                  {status}
                </button>
              ))}
              <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/10 dark:text-slate-200">
                <Filter size={13} />
                Bộ lọc
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="space-y-0">
            {filteredHistory.map((item, index) => (
              <div key={`${item.time}-${index}`} className="relative flex gap-4 pb-4 last:pb-0">
                {index < filteredHistory.length - 1 ? <div className="absolute left-[18px] top-8 h-full w-px bg-slate-200 dark:bg-slate-700" /> : null}

                <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200/40">
                  <FileClock size={15} />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-50">{item.action}</div>
                    {historyBadge(item.result)}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-medium text-slate-700 dark:text-slate-200">{item.time}</span>
                    <span>{item.actor}</span>
                    <span>{item.room}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [tab, setTab] = useState<TabType>("schedule");
  const [events, setEvents] = useState(EVENTS);
  const [historyItems, setHistoryItems] = useState(HISTORY);
  const handledCount = historyItems.filter(item => item.result === "Hoàn tất").length;
  const pendingCount = historyItems.filter(item => item.result === "Chờ xử lý").length;

  return (
    <div className="app-page">
      <PageHeader tab={tab} setTab={setTab} />
      {tab !== "schedule" && (
        <SummaryRow
          tab={tab}
          setTab={setTab}
          eventCount={events.length}
          handledCount={handledCount}
          pendingCount={pendingCount}
        />
      )}

      {tab === "schedule" && <ScheduleTab />}
      {tab === "events" && <EventsTab events={events} setEvents={setEvents} setHistoryItems={setHistoryItems} />}
      {tab === "history" && <HistoryTab historyItems={historyItems} />}
    </div>
  );
}
