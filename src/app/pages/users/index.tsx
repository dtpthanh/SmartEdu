import { useState } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Search, SlidersHorizontal, Plus, Download,
  Edit2, Lock, MoreHorizontal, Globe, School,
  Building2, UserCircle2, Shield, GraduationCap,
  Wrench, Calculator, Users, Check, UserCheck,
  CalendarDays,
} from "lucide-react";
import { PERMISSION_GROUPS, USERS_LIST } from "../../data/users";

type UsersTab = "list" | "groups";

// ── Color map ─────────────────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  "bg-blue-50":   "#4285F4",
  "bg-green-50":  "#34A853",
  "bg-orange-50": "#F29900",
  "bg-red-50":    "#EA4335",
  "bg-yellow-50": "#FBBC05",
  "bg-amber-50":  "#FBBC05",
  "bg-purple-50": "#8b5cf6",
  "bg-indigo-50": "#4285F4",
  "bg-teal-50":   "#34A853",
  "bg-gray-100":  "#4b5563",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function roleBadge(role: string) {
  if (role === "admin")   return <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Quản trị viên</span>;
  if (role === "teacher") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Giáo viên</span>;
  if (role === "staff")   return <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Nhân viên</span>;
  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{role}</span>;
}

function statusBadge(s: string) {
  if (s === "hoatdong") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">Hoạt động</span>;
  if (s === "tamkhoa")  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">Tạm khóa</span>;
  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{s}</span>;
}

function scopeIcon(type: string) {
  if (type === "global")  return <Globe size={13} className="text-blue-500 flex-shrink-0" />;
  if (type === "class")   return <School size={13} className="text-green-500 flex-shrink-0" />;
  if (type === "dept")    return <Building2 size={13} className="text-orange-500 flex-shrink-0" />;
  if (type === "student") return <UserCircle2 size={13} className="text-purple-500 flex-shrink-0" />;
  return null;
}

function groupIcon(id: string) {
  const cls = "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0";
  if (id === "admin")      return <div className={`${cls} bg-blue-100`}><Shield size={16} className="text-blue-600" /></div>;
  if (id === "teacher")    return <div className={`${cls} bg-orange-100`}><GraduationCap size={16} className="text-orange-500" /></div>;
  if (id === "staff")      return <div className={`${cls} bg-amber-100`}><Users size={16} className="text-amber-500" /></div>;
  if (id === "accountant") return <div className={`${cls} bg-green-100`}><Calculator size={16} className="text-green-600" /></div>;
  if (id === "tech")       return <div className={`${cls} bg-red-100`}><Wrench size={16} className="text-red-500" /></div>;
  if (id === "parent")     return <div className={`${cls} bg-pink-100`}><UserCheck size={16} className="text-pink-500" /></div>;
  return null;
}

const thCls = "px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap bg-gray-50";
const tdCls = "px-4 py-3.5 text-[12px] text-gray-700 align-middle";

// ── Row actions ───────────────────────────────────────────────────────────────
function RowActions() {
  return (
    <div className="flex items-center gap-1">
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"><Edit2 size={12} /></button>
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-colors"><Lock size={12} /></button>
      <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"><MoreHorizontal size={12} /></button>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pager({ total, unit, last }: { total: number; unit: string; last: number }) {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-900/15 text-[12px] text-gray-500">
      <span>Hiển thị 1 - {Math.min(10, total)} trong tổng số {total} {unit}</span>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
          <ChevronLeft size={13} />
        </button>
        {Array.from({ length: Math.min(last, 3) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={`w-7 h-7 rounded border text-[12px] font-medium ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
            {p}
          </button>
        ))}
        {last > 3 && <span className="px-1">...</span>}
        {last > 3 && (
          <button onClick={() => setPage(last)}
            className={`w-7 h-7 rounded border text-[12px] font-medium ${page === last ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>
            {last}
          </button>
        )}
        <button onClick={() => setPage(p => Math.min(last, p + 1))}
          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
          <ChevronRight size={13} />
        </button>
        <div className="flex items-center gap-1 ml-2 border border-gray-200 rounded px-2 py-1 cursor-pointer hover:bg-gray-50">
          <span>10 / trang</span><ChevronDown size={11} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB: DANH SÁCH NGƯỜI DÙNG
// ══════════════════════════════════════════════════════════════════════════════
function UserListTab() {
  const stats = [
    { icon: <Users size={18} />,    val: 25, label: "Tổng người dùng",   sub: "Tất cả tài khoản trong hệ thống", iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Shield size={18} />,   val: 5,  label: "Quản trị viên",     sub: "20% tổng người dùng",             iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
    { icon: <GraduationCap size={18} />, val: 15, label: "Giáo viên",    sub: "60% tổng người dùng",             iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <UserCheck size={18} />, val: 5, label: "Nhân viên",         sub: "20% tổng người dùng",             iconBg: "bg-amber-50",  iconColor: "text-amber-500" },
    { icon: <Check size={18} />,    val: 23, label: "Đang hoạt động",    sub: "92% tài khoản hoạt động",         iconBg: "bg-green-50",  iconColor: "text-green-500" },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ backgroundColor: COLORS[s.iconBg] ?? "#4285F4" }}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-0.5">{s.label}</div>
              <div className="text-2xl font-bold text-white leading-none">{s.val}</div>
              <div className="text-[11px] text-white/70 mt-0.5 truncate">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-900/15">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-1.5">
            <Search size={13} className="text-gray-400 flex-shrink-0" />
            <input className="flex-1 text-[12px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm theo tên, email, số điện thoại..." />
          </div>
          {["Tất cả vai trò", "Tất cả trạng thái"].map(f => (
            <button key={f} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 whitespace-nowrap">
              {f} <ChevronDown size={11} className="text-gray-400" />
            </button>
          ))}
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal size={13} /> Bộ lọc
          </button>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-blue-700 transition-colors">
            <Plus size={13} /> Thêm người dùng
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
            <Download size={13} /> Xuất danh sách
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-900/15">
              <tr>
                <th className="pl-4 pr-2 py-3 bg-gray-50"><input type="checkbox" className="rounded" /></th>
                <th className={thCls}>Người dùng</th>
                <th className={thCls}>Email / Số điện thoại</th>
                <th className={thCls}>Vai trò</th>
                <th className={thCls}>Phòng học phụ trách</th>
                <th className={thCls}>Trạng thái</th>
                <th className={thCls}>Đăng nhập cuối</th>
                <th className={thCls}>Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {USERS_LIST.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                        style={{ backgroundColor: u.avatarColor }}>
                        {u.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[12px] text-gray-800">{u.name}</div>
                        <div className="text-[11px] text-gray-400">{u.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className={tdCls + " text-gray-500 text-[11px]"}>{u.email}</td>
                  <td className={tdCls}>{roleBadge(u.role)}</td>
                  <td className={tdCls + " text-gray-600"}>{u.rooms}</td>
                  <td className={tdCls}>{statusBadge(u.status)}</td>
                  <td className={tdCls + " font-mono text-[11px] whitespace-nowrap"}>{u.lastLogin}</td>
                  <td className={tdCls}><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager total={25} unit="người dùng" last={3} />
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB: NHÓM QUYỀN
// ══════════════════════════════════════════════════════════════════════════════
function PermissionGroupsTab() {
  const stats = [
    { icon: <Shield size={18} />,       val: 6, label: "Tổng nhóm quyền",  sub: "Tất cả nhóm quyền trong hệ thống",  iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Shield size={18} />,       val: 1, label: "Quản trị viên",    sub: "16.7% tổng nhóm quyền",             iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
    { icon: <GraduationCap size={18} />, val: 2, label: "Giáo viên",       sub: "33.3% tổng nhóm quyền",             iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <UserCheck size={18} />,    val: 2, label: "Nhân viên",        sub: "33.3% tổng nhóm quyền",             iconBg: "bg-amber-50",  iconColor: "text-amber-500" },
    { icon: <Check size={18} />,        val: 6, label: "Đang áp dụng",     sub: "100% nhóm quyền đang hoạt động",    iconBg: "bg-green-50",  iconColor: "text-green-500" },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ backgroundColor: COLORS[s.iconBg] ?? "#4285F4" }}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-0.5">{s.label}</div>
              <div className="text-2xl font-bold text-white leading-none">{s.val}</div>
              <div className="text-[11px] text-white/70 mt-0.5 truncate">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-900/15 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-900/15">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-1.5">
            <Search size={13} className="text-gray-400 flex-shrink-0" />
            <input className="flex-1 text-[12px] outline-none placeholder-gray-400 bg-transparent" placeholder="Tìm kiếm theo tên nhóm quyền..." />
          </div>
          {["Tất cả trạng thái", "Tất cả phạm vi quyền"].map(f => (
            <button key={f} className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 whitespace-nowrap">
              {f} <ChevronDown size={11} className="text-gray-400" />
            </button>
          ))}
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal size={13} /> Bộ lọc
          </button>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-blue-700 transition-colors">
            <Plus size={13} /> Thêm nhóm quyền
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50">
            <Download size={13} /> Xuất danh sách
          </button>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="border-b border-gray-900/15">
            <tr>
              <th className="pl-4 pr-2 py-3 bg-gray-50"><input type="checkbox" className="rounded" /></th>
              <th className={thCls}>Nhóm quyền</th>
              <th className={thCls}>Mô tả</th>
              <th className={thCls}>Số người dùng</th>
              <th className={thCls}>Phạm vi quyền</th>
              <th className={thCls}>Trạng thái</th>
              <th className={thCls}>Cập nhật gần nhất</th>
              <th className={thCls}>Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PERMISSION_GROUPS.map(g => (
              <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" /></td>
                <td className={tdCls}>
                  <div className="flex items-center gap-3">
                    {groupIcon(g.id)}
                    <span className="font-semibold text-[13px] text-gray-800">{g.name}</span>
                  </div>
                </td>
                <td className={tdCls + " text-gray-500 max-w-[260px]"}>{g.desc}</td>
                <td className={tdCls + " text-center font-semibold"}>{g.users}</td>
                <td className={tdCls}>
                  <div className="flex items-center gap-1.5">
                    {scopeIcon(g.scopeType)}
                    <span>{g.scope}</span>
                  </div>
                </td>
                <td className={tdCls}>{statusBadge(g.status)}</td>
                <td className={tdCls + " font-mono text-[11px] whitespace-nowrap"}>{g.updated}</td>
                <td className={tdCls}><RowActions /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager total={6} unit="nhóm quyền" last={1} />
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function UsersPage() {
  const [tab, setTab] = useState<UsersTab>("list");

  return (
    <div className="p-4">
      <div className="mb-4">
        {/* Tabs */}
        <div className="flex">
          {[
            { id: "list"   as UsersTab, label: "Danh sách người dùng" },
            { id: "groups" as UsersTab, label: "Nhóm quyền" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide border-b-2 transition-colors ${tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "list"   && <UserListTab />}
      {tab === "groups" && <PermissionGroupsTab />}
    </div>
  );
}



