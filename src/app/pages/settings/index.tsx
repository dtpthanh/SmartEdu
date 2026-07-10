import { useState } from "react";
import {
  ChevronDown, RefreshCw, Upload, Lock, Database, Clock,
  Globe, Mail, MessageSquare, Bell, Zap, Webhook,
  Shield, Key, Server, Cloud, Wifi, Thermometer,
  HardDrive, Camera, Volume2, Video, AlertTriangle,
  Check, X, Plus, Minus, Save, RotateCcw, Download,
  FileArchive, Activity, Settings, Info, ChevronRight,
  GraduationCap, Wrench, Users, UserCheck, Phone, CalendarDays, School,
} from "lucide-react";
import smartEduLogo from "../../../assets/logo.png";

type SettingsTab = "general" | "recording" | "notification" | "system";

// ── Shared UI atoms ───────────────────────────────────────────────────────────
function Toggle({ on = false, onChange }: { on?: boolean; onChange?: (v: boolean) => void }) {
  const [val, setVal] = useState(on);
  const toggle = () => { setVal(v => !v); onChange?.(!val); };
  return (
    <button onClick={toggle}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${val ? "bg-blue-500" : "bg-gray-300"}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function Select({ value, options, className = "" }: { value: string; options?: string[]; className?: string }) {
  return (
    <div className={`flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 cursor-pointer text-[12px] text-gray-700 ${className}`}>
      <span>{value}</span><ChevronDown size={13} className="text-gray-400 flex-shrink-0" />
    </div>
  );
}

function Input({ value, placeholder, className = "" }: { value?: string; placeholder?: string; className?: string }) {
  return (
    <input defaultValue={value} placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-blue-300 bg-white ${className}`} />
  );
}

function FormRow({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[12px] text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-900/15 shadow-sm p-5 ${className}`}>
      <div className="mb-4">
        <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-gray-800">{title}</div>
        {subtitle && <div className="text-[11px] text-gray-400 mt-0.5">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function SaveBtn({ label = "Lưu thay đổi", full = false }: { label?: string; full?: boolean }) {
  return (
    <button className={`flex items-center justify-center gap-1.5 bg-blue-600 text-white rounded-lg px-4 py-2 text-[12px] font-medium hover:bg-blue-700 transition-colors ${full ? "w-full" : ""}`}>
      <Save size={13} />{label}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — CÀI ĐẶT CHUNG
// ══════════════════════════════════════════════════════════════════════════════
function GeneralTab() {
  const others = [
    { icon: <Lock size={15} className="text-blue-500" />, bg: "bg-blue-50", label: "Bảo mật 2 lớp (2FA)", desc: "Yêu cầu xác thực 2 lớp khi đăng nhập", on: true },
    { icon: <Database size={15} className="text-orange-500" />, bg: "bg-orange-50", label: "Tự động sao lưu dữ liệu", desc: "Tự động sao lưu dữ liệu hệ thống hằng ngày", on: true },
    { icon: <RefreshCw size={15} className="text-purple-500" />, bg: "bg-purple-50", label: "Xóa dữ liệu cũ", desc: "Tự động xóa dữ liệu ghi hình cũ theo thời gian lưu trữ", on: false },
    { icon: <Mail size={15} className="text-teal-500" />, bg: "bg-teal-50", label: "Gửi báo cáo hệ thống", desc: "Gửi báo cáo hoạt động hệ thống qua email hằng tuần", on: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* LEFT */}
      <div className="space-y-5">
        <SectionCard title="Thông tin trường học" subtitle="Cập nhật thông tin cơ bản của trường học">
          <div className="flex gap-4 mb-4">
            {/* Logo */}
            <div>
              <div className="text-[11px] text-gray-500 mb-2">Logo trường học</div>
              <div className="w-[130px] h-[110px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-gray-50 p-2">
                <img
                  src={smartEduLogo}
                  alt="SmartEdu 360"
                  className="w-full h-12 object-contain"
                />
                <button className="flex items-center gap-1 text-[11px] text-blue-500 hover:underline">
                  <Upload size={11} /> Thay đổi logo
                </button>
                <div className="text-[9px] text-gray-400 text-center">Định dạng: PNG, JPG<br />(tối đa 2MB)</div>
              </div>
            </div>
            {/* Fields */}
            <div className="flex-1 space-y-2.5">
              <FormRow label="Tên trường học" required>
                <Input value="Trường Tiểu học & THCS Bitcare" />
              </FormRow>
              <FormRow label="Mã trường học">
                <Input value="BITCARE-SCHOOL-01" />
              </FormRow>
            </div>
          </div>
          <div className="space-y-2.5">
            <FormRow label="Địa chỉ">
              <Input value="123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh" />
            </FormRow>
            <div className="grid grid-cols-2 gap-2.5">
              <FormRow label="Số điện thoại"><Input value="(028) 1234 5678" /></FormRow>
              <FormRow label="Email"><Input value="contact@bitcare.edu.vn" /></FormRow>
            </div>
            <FormRow label="Website"><Input value="https://bitcare.edu.vn" /></FormRow>
          </div>
          <div className="flex justify-end mt-4"><SaveBtn /></div>
        </SectionCard>

        <SectionCard title="Cài đặt khác" subtitle="Các thiết lập khác của hệ thống">
          <div className="space-y-3">
            {others.map(o => (
              <div key={o.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${o.bg} flex items-center justify-center flex-shrink-0`}>{o.icon}</div>
                  <div>
                    <div className="text-[12px] font-medium text-gray-800">{o.label}</div>
                    <div className="text-[11px] text-gray-400">{o.desc}</div>
                  </div>
                </div>
                <Toggle on={o.on} />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4"><SaveBtn /></div>
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-5">
        <SectionCard title="Cài đặt múi giờ và ngôn ngữ" subtitle="Thiết lập múi giờ và ngôn ngữ hiển thị">
          <div className="space-y-3">
            <FormRow label="Múi giờ"><Select value="(GMT+07:00) Bangkok, Hanoi, Jakarta" /></FormRow>
            <FormRow label="Ngôn ngữ"><Select value="Tiếng Việt" /></FormRow>
          </div>
          <div className="flex justify-end mt-4"><SaveBtn /></div>
        </SectionCard>

        <SectionCard title="Cài đặt phiên làm việc" subtitle="Quản lý thời gian phiên làm việc và đăng xuất tự động">
          <div className="grid grid-cols-2 gap-3">
            <FormRow label="Thời gian hết hạn phiên"><Select value="30 phát" /></FormRow>
            <FormRow label="Số phiên đăng nhập tối đa"><Select value="3 phiên" /></FormRow>
          </div>
          <div className="flex justify-end mt-4"><SaveBtn /></div>
        </SectionCard>

        <SectionCard title="Thông tin hệ thống" subtitle="Thông tin về phiên bản và trạng thái hệ thống">
          <div className="space-y-2 text-[12px]">
            {[
              ["Phiên bản hệ thống",  "v2.1.8"],
              ["Phiên bản ứng dụng",  "v2.1.8"],
              ["Cơ sở dữ liệu",       "MySQL 8.0"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Trạng thái hệ thống</span>
              <span className="flex items-center gap-1.5 text-green-600 font-medium"><span className="w-2 h-2 rounded-full bg-green-500" />Hoạt động</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Thời gian hoạt động</span>
              <span className="font-medium text-gray-800">15 ngày 8 giờ 32 phát</span>
            </div>
          </div>
          <button className="mt-4 flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={13} /> Kiểm tra cập nhật
          </button>
        </SectionCard>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — CÀI ĐẶT GHI HÌNH
// ══════════════════════════════════════════════════════════════════════════════
const SCHEDULE: Record<string, string[]> = {
  "00:00 - 06:00": ["ltu","ltu","ltu","ltu","ltu","ltu","ltu"],
  "06:00 - 18:00": ["tsuk","tsuk","tsuk","tsuk","tsuk","ltu","ltu"],
  "18:00 - 24:00": ["ltu","ltu","ltu","ltu","ltu","ltu","ltu"],
};
const DAYS = ["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","Chủ nhật"];
const MODE_LABEL: Record<string, string> = { ltu: "Liên tục", tsuk: "Theo sự kiện", ng: "Ngoài giờ" };
const MODE_COLOR: Record<string, string> = { ltu: "bg-blue-100 text-blue-700", tsuk: "bg-orange-100 text-orange-700", ng: "bg-gray-100 text-gray-600" };

function RecordingTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {/* LEFT */}
        <div className="space-y-5">
          <SectionCard title="Cài đặt ghi hình mặc định">
            <div className="space-y-3">
              <FormRow label="Chất lượng ghi hình"><Select value="Cao" /></FormRow>
              <FormRow label="Độ phân giải"><Select value="1920 x 1080 (Full HD)" /></FormRow>
              <FormRow label="Tốc độ khung hình (FPS)"><Select value="25 FPS" /></FormRow>
              {[
                { label: "Ghi âm cùng video", on: true },
                { label: "Ghi đè khi đầy bộ nhớ", on: true },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-700">{t.label}</span>
                  <Toggle on={t.on} />
                </div>
              ))}
              <FormRow label="Watermark"><Select value="Bitcare Smart Classroom" /></FormRow>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-[11px] text-blue-700 flex gap-2">
              <Info size={13} className="flex-shrink-0 mt-0.5" />
              Các thiết lập này sẽ được áp dụng mặc định cho tất cả camera mới hoặc khi không có cấu hình riêng cho từng camera/phòng.
            </div>
          </SectionCard>

          <SectionCard title="Lưu trữ & thời gian lưu">
            <div className="space-y-3">
              <FormRow label="Thời gian lưu mặc định"><Select value="30 ngày" /></FormRow>
              <FormRow label="Dung lượng mặc định cho 1 camera"><Select value="200 GB" /></FormRow>
              <FormRow label="Phân vùng lưu trữ"><Select value="Tự động cân bằng" /></FormRow>
              <FormRow label="Cảnh báo khi đầy bộ nhớ"><Select value="90%" /></FormRow>
            </div>
            {/* Storage bars */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-600 font-medium">Tổng dung lượng lưu trữ</span>
                  <span className="text-gray-500">Đã sử dụng <span className="font-semibold">12.45 TB</span> / 20.00 TB</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "62%" }} />
                </div>
                <div className="text-right text-[10px] text-gray-400 mt-0.5">62%</div>
              </div>
              <div className="text-[12px] font-medium text-gray-700 mb-2">Phân vùng lưu trữ</div>
              {[
                { label: "Ổ cứng 1", used: "6.20 TB", total: "10.00 TB", pct: 62 },
                { label: "Ổ cứng 2", used: "6.25 TB", total: "10.00 TB", pct: 63 },
              ].map(d => (
                <div key={d.label} className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                    <HardDrive size={11} className="text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-gray-700">{d.label}</span>
                      <span className="text-gray-400">Đã sử dụng {d.used} / {d.total}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.pct}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 w-8 text-right">{d.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <SectionCard title="Lịch ghi hình" subtitle="">
            {/* Mode cards */}
            <div className="text-[11px] text-gray-500 mb-2">Chế độ ghi hình mặc định</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { id: "ltu",  label: "Liên tục",      sub: "Ghi 24/7",         icon: <Video size={15} />, active: true },
                { id: "tsuk", label: "Theo sự kiện",  sub: "Ghi khi có sự kiện", icon: <Bell size={15} />, active: false },
                { id: "ng",   label: "Ngoài giờ",     sub: "Ghi theo khung giờ", icon: <Clock size={15} />, active: false },
              ].map(m => (
                <div key={m.id} className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${m.active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${m.active ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}>{m.icon}</div>
                  <div className={`text-[11px] font-semibold ${m.active ? "text-blue-700" : "text-gray-700"}`}>{m.label}</div>
                  <div className="text-[10px] text-gray-400">{m.sub}</div>
                </div>
              ))}
            </div>
            {/* Schedule table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-2 py-2 text-gray-500 font-semibold">Khung giờ</th>
                    {DAYS.map(d => <th key={d} className="px-1 py-2 text-gray-500 font-semibold text-center">{d}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(SCHEDULE).map(([time, modes]) => (
                    <tr key={time}>
                      <td className="px-2 py-2 text-gray-600 font-medium whitespace-nowrap">{time}</td>
                      {modes.map((m, i) => (
                        <td key={i} className="px-1 py-2 text-center">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${MODE_COLOR[m]}`}>{MODE_LABEL[m]}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
              <Info size={10} /> Nhấp vào từng ô để thay đổi chế độ ghi hình theo khung giờ.
            </div>
          </SectionCard>

          <SectionCard title="Ghi hình theo sự kiện">
            <div className="space-y-2.5">
              {[
                { label: "Ghi khi phát hiện chuyển động", on: true },
                { label: "Ghi khi Âm thanh vượt ngưỡng", on: true },
                { label: "Ghi khi AI cảnh báo",           on: true },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between py-1">
                  <span className="text-[12px] text-gray-700">{t.label}</span>
                  <Toggle on={t.on} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <FormRow label="Ghi trước sự kiện"><Select value="10 giây" /></FormRow>
                <FormRow label="Ghi sau sự kiện"><Select value="30 giây" /></FormRow>
                <FormRow label="Ngưỡng chuyển động"><Select value="Trung bình" /></FormRow>
                <FormRow label="Ngưỡng Âm thanh"><Select value="70 dB" /></FormRow>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Kiểm tra cấu hình">
            <div className="space-y-2">
              {[
                { label: "Kết nối camera",      val: "Tốt",       color: "text-green-600", dot: "bg-green-500" },
                { label: "Dung lượng lưu trữ",  val: "Tốt",       color: "text-green-600", dot: "bg-green-500" },
                { label: "Tốc độ ghi hình",     val: "Tốt",       color: "text-green-600", dot: "bg-green-500" },
                { label: "Đồng bộ thời gian",   val: "Tốt",       color: "text-green-600", dot: "bg-green-500" },
                { label: "Dịch vụ ghi hình",    val: "Đang chạy", color: "text-blue-600",  dot: "bg-blue-500" },
                { label: "Sao lưu cấu hình",    val: "Cập nhật",  color: "text-blue-600",  dot: "bg-blue-500" },
              ].map(c => (
                <div key={c.label} className="flex justify-between items-center text-[12px] py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{c.label}</span>
                  <span className={`flex items-center gap-1.5 font-medium ${c.color}`}>
                    {c.val} <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  </span>
                </div>
              ))}
            </div>
            <SaveBtn full label="Lưu thay đổi" />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — CÀI ĐẶT THÔNG BÁO
// ══════════════════════════════════════════════════════════════════════════════
const CHANNELS = [
  { icon: <Mail size={15} />, label: "Email",         config: "contact@bitcare.edu.vn", on: true },
  { icon: <MessageSquare size={15} />, label: "SMS",   config: "(+84) 912 345 678",      on: true },
  { icon: <Bell size={15} />, label: "Thông báo đẩy", config: "Ứng dụng Bitcare",        on: true },
  { icon: <Zap size={15} className="text-blue-400" />, label: "Zalo", config: "Zalo Official Account", on: true },
  { icon: <Settings size={15} />, label: "Webhook",   config: "0 endpoint",              on: false },
];

const ALERT_RULES = [
  { icon: <Activity size={13} />, label: "Sự kiện AI",      sub: "Phát hiện hành vi bất thường",     level: "Cao",       email: true,  sms: true,  push: true,  zalo: true  },
  { icon: <Camera size={13} />,   label: "Camera offline",  sub: "Camera mất kết nối",               level: "Trung bình", email: true, sms: true,  push: true,  zalo: false },
  { icon: <AlertTriangle size={13} />, label: "Thiết bị lỗi", sub: "Thiết bị bị gặp sự cố",          level: "Cao",       email: true,  sms: true,  push: true,  zalo: true  },
  { icon: <Volume2 size={13} />,  label: "Âm lượng cao",    sub: "Vượt ngưỡng Âm thanh",             level: "Trung bình", email: false, sms: true,  push: true,  zalo: false },
  { icon: <GraduationCap size={13} />, label: "Học sinh giơ tay", sub: "Học sinh giơ tay",          level: "Thấp",      email: false, sms: false, push: true,  zalo: false },
];

const NOTIF_RECEIVERS = [
  { icon: <Shield size={14} />,      bg: "bg-blue-100",   label: "Quản trị viên", desc: "Ban giÂm hiệu, quản trị hệ thống", count: 6 },
  { icon: <GraduationCap size={14} />, bg: "bg-orange-100", label: "Giáo viên",  desc: "Giáo viên các lớp",               count: 42 },
  { icon: <Wrench size={14} />,      bg: "bg-red-100",    label: "Kỹ thuật",     desc: "Nhân viên kỹ thuật, IT",          count: 8 },
  { icon: <UserCheck size={14} />,   bg: "bg-pink-100",   label: "Phụ huynh",    desc: "Phụ huynh học sinh",              count: 356 },
];

function NotificationTab() {
  const levelBadge = (l: string) => {
    if (l === "Cao")        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium">Cao</span>;
    if (l === "Trung bình") return <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium">Trung bình</span>;
    return                         <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">Thấp</span>;
  };

  // Donut for overview
  const pct = 98.2;
  const r = 44; const c = 2 * Math.PI * r;
  const dash = (c * pct) / 100;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        {/* Kênh thông báo */}
        <div className="col-span-1 space-y-5">
          <SectionCard title="Kênh thông báo" subtitle="Bật/tắt và cấu hình các kênh gửi thông báo">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-900/15">
                  {["Kênh","Trạng thái","Cấu hình","Kiểm tra"].map(h => (
                    <th key={h} className="text-left py-2 text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CHANNELS.map(ch => (
                  <tr key={ch.label}>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600">{ch.icon}</div>
                        <span className="font-medium text-gray-700">{ch.label}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${ch.on ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>{ch.on ? "Bật" : "Tắt"}</span>
                    </td>
                    <td className="py-2 text-gray-400 text-[10px] max-w-[80px] truncate">{ch.config}</td>
                    <td className="py-2">
                      <button className="text-[10px] text-blue-500 hover:underline">{ch.on ? "Gửi thử" : "Kiểm tra"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard title="Người nhận thông báo" subtitle="Quản lý nhóm người dùng và phạm vi nhận thông báo">
            <div className="space-y-2">
              {NOTIF_RECEIVERS.map(r => (
                <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${r.bg} flex items-center justify-center flex-shrink-0`}>{r.icon}</div>
                    <div>
                      <div className="text-[12px] font-medium text-gray-800">{r.label} <span className="text-gray-400 font-normal">({r.count} người)</span></div>
                      <div className="text-[10px] text-gray-400">{r.desc}</div>
                    </div>
                  </div>
                  <button className="text-[11px] text-blue-500 hover:underline whitespace-nowrap">Chỉnh sửa</button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Khung giờ gửi" subtitle="Thiết lập thời gian và tần suất gửi thông báo">
            <div className="space-y-3 text-[12px]">
              <div>
                <div className="text-gray-500 mb-1.5 flex items-center gap-1.5"><Clock size={12} /> Giờ yên tĩnh (không gửi thông báo thường)</div>
                <div className="flex items-center gap-2">
                  <Input value="22:00" className="w-20" /><span className="text-gray-400">–</span><Input value="06:30" className="w-20" />
                  <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><Plus size={11} className="text-gray-500" /></button>
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1.5 flex items-center gap-1.5"><RefreshCw size={12} /> Tần suất nhắc lại</div>
                <Select value="30 phát/lần" />
              </div>
              <div>
                <div className="text-gray-500 mb-1.5 flex items-center gap-1.5"><AlertTriangle size={12} /> Chống gửi trùng</div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-[11px]">Không gửi lại cùng một cảnh báo trong</span>
                  <Input value="15" className="w-14 text-center" />
                  <span className="text-gray-500 text-[11px]">phát</span>
                </div>
              </div>
              <div>
                <div className="text-gray-500 mb-1.5 flex items-center gap-1.5"><Bell size={12} /> TÂm tắt thông báo</div>
                <div className="flex items-center gap-2 mb-1.5">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-600">Hằng ngày</span>
                  <Select value="08:00" className="w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-600">Hằng tuần</span>
                  <Select value="Thứ 2" className="w-20" />
                  <Select value="08:00" className="w-20" />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right 2/3 */}
        <div className="col-span-2 space-y-5">
          {/* Alert rules */}
          <SectionCard title="Quy tắc cảnh báo" subtitle="Thiết lập mức độ cảnh báo và kênh nhận cho từng loại sự kiện">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-900/15 bg-gray-50">
                  <th className="text-left px-2 py-2.5 text-gray-500 font-semibold">Loại cảnh báo</th>
                  <th className="px-2 py-2.5 text-gray-500 font-semibold text-center">Mức độ</th>
                  <th className="px-2 py-2.5 text-gray-500 font-semibold text-center"><Mail size={12} className="inline" /> Email</th>
                  <th className="px-2 py-2.5 text-gray-500 font-semibold text-center"><MessageSquare size={12} className="inline" /> SMS</th>
                  <th className="px-2 py-2.5 text-gray-500 font-semibold text-center"><Bell size={12} className="inline" /> Push</th>
                  <th className="px-2 py-2.5 text-gray-500 font-semibold text-center"><Zap size={12} className="inline" /> Zalo</th>
                  <th className="px-2 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ALERT_RULES.map(r => (
                  <tr key={r.label} className="hover:bg-gray-50">
                    <td className="px-2 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-600">{r.icon}</div>
                        <div>
                          <div className="font-medium text-gray-800">{r.label}</div>
                          <div className="text-[10px] text-gray-400">{r.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-center">{levelBadge(r.level)}</td>
                    {[r.email, r.sms, r.push, r.zalo].map((v, i) => (
                      <td key={i} className="px-2 py-2.5 text-center">
                        <div className="flex justify-center"><Toggle on={v} /></div>
                      </td>
                    ))}
                    <td className="px-2 py-2.5">
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <div className="grid grid-cols-2 gap-5">
            {/* Template preview */}
            <SectionCard title="Mẫu thông báo" subtitle="Cấu hình nội dung mặc định cho các kênh">
              {/* Email template */}
              <div className="border border-gray-200 rounded-lg p-3 mb-3 text-[11px]">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={12} className="text-gray-500" />
                  <span className="font-semibold text-gray-700">Mẫu Email</span>
                  <button className="ml-auto text-blue-500 hover:underline">Chỉnh sửa</button>
                </div>
                <div className="bg-gray-50 rounded p-2 text-gray-600 text-[10px] space-y-1 font-mono">
                  <div>Tiêu đề: [EVENT_TYPE] tại [LOCATION_NAME]</div>
                  <div>Xin chào [RECIPIENT_NAME],</div>
                  <div className="text-gray-400">Hệ thống Bitcare phát hiện [EVENT_TYPE]<br />tại [LOCATION_NAME] vào lúc [EVENT_TIME].</div>
                  <div>Chi tiết: [EVENT_DETAIL]</div>
                </div>
              </div>
              {/* Push template */}
              <div className="border border-gray-200 rounded-lg p-3 text-[11px]">
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={12} className="text-gray-500" />
                  <span className="font-semibold text-gray-700">Mẫu thông báo đẩy</span>
                  <button className="ml-auto text-blue-500 hover:underline">Chỉnh sửa</button>
                </div>
                <div className="bg-gray-800 rounded-lg p-2.5 text-white text-[10px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold">B</div>
                    <span className="font-semibold">Bitcare</span>
                    <span className="ml-auto text-gray-400">09:41</span>
                  </div>
                  <div className="font-medium">[EVENT_TYPE]</div>
                  <div className="text-gray-300 text-[9px]">Tại [LOCATION_NAME] - [EVENT_TIME]<br />[EVENT_DETAIL]</div>
                </div>
              </div>
            </SectionCard>

            {/* Overview */}
            <SectionCard title="Tổng quan thông báo" subtitle="Thống kê 7 ngày qua">
              {/* Donut */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <svg width="100" height="100">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="50" cy="50" r={r} fill="none" stroke="#0AAE34" strokeWidth="12"
                      strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round"
                      transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-[15px] font-bold text-gray-800">{pct}%</div>
                    <div className="text-[9px] text-gray-400 text-center leading-tight">Tỷ lệ gửi<br />thành công</div>
                  </div>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {[
                    { label: "Thành công", val: "1.482", color: "bg-green-500" },
                    { label: "Thất bại",   val: "28",    color: "bg-red-500" },
                    { label: "Đang chờ",   val: "12",    color: "bg-yellow-400" },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${s.color}`} />
                      <span className="text-gray-500">{s.label}</span>
                      <span className="font-semibold text-gray-700 ml-auto">{s.val}</span>
                    </div>
                  ))}
                  <button className="text-blue-500 text-[11px] hover:underline flex items-center gap-1 mt-1">Xem chi tiết <ChevronRight size={11} /></button>
                </div>
              </div>

              {/* Recent failures */}
              <div>
                <div className="text-[11px] font-semibold text-gray-700 mb-2">Thông báo thất bại gần đây</div>
                <div className="space-y-2">
                  {[
                    { time: "09:35", ch: "SMS",  desc: "Camera offline - Lớp 10A1", err: "Không gửi được" },
                    { time: "09:28", ch: "Email", desc: "Thiết bị lỗi - Micro phòng B101", err: "Bị trả lại" },
                    { time: "09:15", ch: "Push",  desc: "Sự kiện AI - Phòng học B102", err: "Quá hạn token" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] p-1.5 rounded border border-gray-100 hover:bg-gray-50">
                      <span className="text-gray-400 font-mono w-8">{f.time}</span>
                      <span className="bg-gray-100 text-gray-600 px-1 rounded">{f.ch}</span>
                      <span className="text-gray-600 flex-1 truncate">{f.desc}</span>
                      <span className="text-red-400 whitespace-nowrap">{f.err}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 text-[11px] text-blue-500 hover:underline flex items-center gap-1">Xem tất cả <ChevronRight size={11} /></button>
              </div>
            </SectionCard>
          </div>

          <div className="flex justify-end">
            <SaveBtn label="Lưu thay đổi" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — CÀI ĐẶT HỆ THỐNG
// ══════════════════════════════════════════════════════════════════════════════
const ACTIVITY_LOG = [
  { time: "29/04/2026 09:21:15", icon: <Settings size={13} />, bg: "bg-blue-100",   color: "text-blue-600",  type: "Cài đặt hệ thống", desc: "Thay đổi múi giờ hệ thống", by: "admin" },
  { time: "29/04/2026 08:45:32", icon: <Shield size={13} />,   bg: "bg-green-100",  color: "text-green-600", type: "Bảo mật",           desc: "Bật xác thực 2 lớp (2FA)", by: "admin" },
  { time: "28/04/2026 17:10:08", icon: <Cloud size={13} />,    bg: "bg-purple-100", color: "text-purple-600", type: "Sao lưu",          desc: "Tạo bản sao lưu thủ công", by: "admin" },
  { time: "28/04/2026 14:33:47", icon: <Zap size={13} />,      bg: "bg-orange-100", color: "text-orange-600", type: "Tích hợp",         desc: "Cập nhật cấu hình SMTP", by: "admin" },
  { time: "28/04/2026 10:22:11", icon: <Settings size={13} />, bg: "bg-blue-100",   color: "text-blue-600",  type: "Cài đặt hệ thống",  desc: "Thay đổi thời gian tự động đăng xuất", by: "admin" },
];

function MoreHorizontal({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
    </svg>
  );
}

function SystemTab() {
  const integrations = [
    { label: "API Key",            status: "Đã kích hoạt", color: "text-green-600 bg-green-100" },
    { label: "Webhook Endpoint",   status: "Đã cấu hình",  color: "text-green-600 bg-green-100" },
    { label: "SMTP (Email)",       status: "Đã kết nối",   color: "text-green-600 bg-green-100" },
    { label: "SMS Gateway",        status: "Đã kết nối",   color: "text-green-600 bg-green-100" },
    { label: "Cloud Sync",         status: "Đã đồng bộ",   color: "text-blue-600 bg-blue-100"   },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* LEFT */}
      <div className="space-y-5">
        <SectionCard title="Cấu hình hệ thống">
          <div className="space-y-3">
            {[
              { label: "Định dạng ngày",     val: "DD/MM/YYYY (29/04/2026)" },
              { label: "Định dạng giờ",      val: "24 giờ (14:30)" },
              { label: "Múi giờ",            val: "(GMT+07:00) Bangkok, Hanoi, Jakarta" },
              { label: "Ngôn ngữ",           val: "Tiếng Việt" },
              { label: "Đơn vị nhiệt độ",    val: "°C" },
              { label: "Giao diện (Theme)",  val: "Sáng (Light)" },
              { label: "Tự động đăng xuất",  val: "30 phát" },
            ].map(f => <FormRow key={f.label} label={f.label}><Select value={f.val} /></FormRow>)}
          </div>
          <div className="flex justify-between mt-4">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
              <RotateCcw size={13} /> Khôi phục mặc định
            </button>
            <SaveBtn />
          </div>
        </SectionCard>

        <SectionCard title="Sao lưu & khôi phục">
          <div className="space-y-3 text-[12px]">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <div className="font-medium text-gray-800">Lịch sao lưu tự động</div>
                <div className="text-[11px] text-gray-400">Hằng ngày lúc 02:00</div>
              </div>
              <button className="border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Cấu hình</button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <div className="font-medium text-gray-800">Vị trí lưu trữ</div>
                <div className="text-[11px] text-gray-400">Cloud - Bitcare Storage (Singapore)</div>
              </div>
              <button className="border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Thay đổi</button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-800">Bản sao gần nhất</div>
                <div className="text-[11px] text-gray-400">29/04/2026 02:00:15</div>
              </div>
              <span className="bg-green-100 text-green-600 text-[11px] px-2 py-0.5 rounded-full font-medium">Thành công</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-[11px] text-gray-700 hover:bg-gray-50"><Plus size={12} /> Tạo sao lưu ngay</button>
            <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-[11px] text-gray-700 hover:bg-gray-50"><Download size={12} /> Tải về bản sao</button>
            <button className="flex items-center justify-center gap-1.5 border border-red-200 rounded-lg py-2 text-[11px] text-red-500 hover:bg-red-50"><RotateCcw size={12} /> Khôi phục dữ liệu</button>
          </div>
        </SectionCard>

        <SectionCard title="Thông tin hệ thống">
          <div className="space-y-2 text-[12px]">
            {[
              ["Phiên bản hệ thống",  "v2.4.1"],
              ["Phiên bản ứng dụng",  "v2.4.1 (Build 20260428.1)"],
              ["Cơ sở dữ liệu",       "PostgreSQL 15.7"],
              ["Uptime hệ thống",     "15 ngày 04 giờ 23 phát"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Trạng thái dịch vụ</span>
              <span className="flex items-center gap-1.5 text-green-600 font-medium"><span className="w-2 h-2 rounded-full bg-green-500" />Hoạt động bành thường</span>
            </div>
          </div>
          <button className="mt-3 flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
            <RefreshCw size={13} /> Kiểm tra cập nhật
          </button>
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-5">
        <SectionCard title="Bảo mật & truy cập">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <div className="text-[12px] font-medium text-gray-800">Xác thực 2 lớp (2FA)</div>
              </div>
              <div className="flex items-center gap-2">
                <Toggle on={true} />
                <span className="text-[11px] text-green-600 font-medium">Đã bật</span>
              </div>
            </div>
            <div className="py-2 border-b border-gray-50">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[12px] font-medium text-gray-800">Giới hạn phiên đăng nhập</div>
              </div>
              <div className="flex items-center gap-2">
                <input defaultValue="5" className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300" />
                <span className="text-[12px] text-gray-500">phiên / tài khoản</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <div className="text-[12px] font-medium text-gray-800">IP whitelist</div>
              </div>
              <div className="flex items-center gap-2">
                <Toggle on={false} />
                <span className="text-[11px] text-gray-400 font-medium">Đã tắt</span>
                <button className="border border-gray-200 rounded-lg px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Quản lý IP</button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <div className="text-[12px] font-medium text-gray-800">Chính sách mật khẩu</div>
                <div className="text-[11px] text-gray-400">Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt</div>
              </div>
              <button className="border border-gray-200 rounded-lg px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50 flex-shrink-0 ml-2">Cấu hình</button>
            </div>
            <div className="py-2">
              <div className="text-[12px] font-medium text-gray-800 mb-1.5">Thời gian khóa tài khoản</div>
              <Select value="30 phát sau 5 lần đăng nhập sai" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Tích hợp hệ thống">
          <div className="space-y-2">
            {integrations.map(it => (
              <div key={it.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 text-[12px]">
                <span className="font-medium text-gray-700">{it.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${it.color}`}>{it.status}</span>
                  <button className="border border-gray-200 rounded-lg px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
                    {it.label === "API Key" || it.label === "Webhook Endpoint" ? "Quản lý" : "Cấu hình"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Nhật ký hoạt động gần đây">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-gray-900/15 bg-gray-50">
                {["Thời gian","Loại thay đổi","Mô tả","Người thực hiện"].map(h => (
                  <th key={h} className="text-left px-2 py-2 text-gray-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ACTIVITY_LOG.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-2 py-2 font-mono text-[10px] text-gray-500 whitespace-nowrap">{a.time}</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded ${a.bg} flex items-center justify-center ${a.color}`}>{a.icon}</div>
                      <span className="font-medium text-gray-700">{a.type}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-gray-500">{a.desc}</td>
                  <td className="px-2 py-2 text-gray-600">{a.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("general");
  const TABS: { id: SettingsTab; label: string }[] = [
    { id: "general",      label: "Cài đặt chung" },
    { id: "recording",    label: "Cài đặt ghi hình" },
    { id: "notification", label: "Cài đặt thông báo" },
    { id: "system",       label: "Cài đặt hệ thống" },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "general"      && <GeneralTab />}
      {tab === "recording"    && <RecordingTab />}
      {tab === "notification" && <NotificationTab />}
      {tab === "system"       && <SystemTab />}
    </div>
  );
}



