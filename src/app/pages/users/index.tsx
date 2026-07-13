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
import { PageTabs } from "../../components/PageTabs";
import { AddEntityDialog } from "../../components/AddEntityDialog";

type UsersTab = "list" | "groups";
type UserRow = (typeof USERS_LIST)[number];
type PermissionGroupRow = (typeof PERMISSION_GROUPS)[number];

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
  const cls = "app-icon-tile w-9 h-9 rounded-xl flex-shrink-0";
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
      <button className="app-icon-btn"><Edit2 size={12} /></button>
      <button className="app-icon-btn"><Lock size={12} /></button>
      <button className="app-icon-btn"><MoreHorizontal size={12} /></button>
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
  const [users, setUsers] = useState<UserRow[]>(USERS_LIST);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const stats = [
    { icon: <Users size={18} />,    val: 25, label: "Tổng người dùng",   sub: "Tất cả tài khoản trong hệ thống", iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Shield size={18} />,   val: 5,  label: "Quản trị viên",     sub: "20% tổng người dùng",             iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
    { icon: <GraduationCap size={18} />, val: 15, label: "Giáo viên",    sub: "60% tổng người dùng",             iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <UserCheck size={18} />, val: 5, label: "Nhân viên",         sub: "20% tổng người dùng",             iconBg: "bg-amber-50",  iconColor: "text-amber-500" },
    { icon: <Check size={18} />,    val: 23, label: "Đang hoạt động",    sub: "92% tài khoản hoạt động",         iconBg: "bg-green-50",  iconColor: "text-green-500" },
  ];

  function getInitials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(-2)
      .map(part => part[0]?.toUpperCase() ?? "")
      .join("") || "ND";
  }

  function handleAddUser(values: Record<string, string>) {
    const role = values.role || "teacher";
    const avatarColor = role === "admin" ? "#3b82f6" : role === "staff" ? "#f59e0b" : "#f97316";
    const name = values.name || "Người dùng mới";

    setUsers(current => [
      {
        initials: getInitials(name),
        name,
        phone: values.phone || "Chưa cập nhật",
        email: values.email || "user@school.edu.vn",
        role,
        rooms: values.rooms || "Chưa phân công",
        status: "hoatdong",
        lastLogin: "Chưa đăng nhập",
        avatarColor,
      },
      ...current,
    ]);
  }

  return (
    <>
      {/* Stats */}
      <div className="app-grid-stats mb-4">
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
      <div className="app-table-card">
        {/* Toolbar */}
        <div className="app-toolbar-strip flex flex-wrap items-center gap-2 px-4 py-3">
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
          <button
            type="button"
            className="app-primary-action flex items-center gap-1.5 rounded-lg px-[15px] py-[9px] text-[12px] font-medium"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus size={16} /> Thêm người dùng
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
              {users.map((u, i) => (
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
      <AddEntityDialog
        open={isAddOpen}
        title="Thêm người dùng"
        description="Tạo tài khoản người dùng mới trong hệ thống."
        submitLabel="Lưu người dùng"
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddUser}
        fields={[
          { name: "name", label: "Họ và tên", placeholder: "Nguyễn Văn An", required: true },
          { name: "email", label: "Email", type: "email", placeholder: "user@school.edu.vn", required: true },
          { name: "phone", label: "Số điện thoại", type: "tel", placeholder: "0901234567" },
          {
            name: "role",
            label: "Vai trò",
            defaultValue: "teacher",
            options: [
              { label: "Quản trị viên", value: "admin" },
              { label: "Giáo viên", value: "teacher" },
              { label: "Nhân viên", value: "staff" },
            ],
          },
          { name: "rooms", label: "Phòng phụ trách", placeholder: "A101, A102" },
        ]}
      />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB: NHÓM QUYỀN
// ══════════════════════════════════════════════════════════════════════════════
function PermissionGroupsTab() {
  const [groups, setGroups] = useState<PermissionGroupRow[]>(PERMISSION_GROUPS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const stats = [
    { icon: <Shield size={18} />,       val: 6, label: "Tổng nhóm quyền",  sub: "Tất cả nhóm quyền trong hệ thống",  iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { icon: <Shield size={18} />,       val: 1, label: "Quản trị viên",    sub: "16.7% tổng nhóm quyền",             iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
    { icon: <GraduationCap size={18} />, val: 2, label: "Giáo viên",       sub: "33.3% tổng nhóm quyền",             iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { icon: <UserCheck size={18} />,    val: 2, label: "Nhân viên",        sub: "33.3% tổng nhóm quyền",             iconBg: "bg-amber-50",  iconColor: "text-amber-500" },
    { icon: <Check size={18} />,        val: 6, label: "Đang áp dụng",     sub: "100% nhóm quyền đang hoạt động",    iconBg: "bg-green-50",  iconColor: "text-green-500" },
  ];

  function handleAddGroup(values: Record<string, string>) {
    const id = values.id || `group-${Date.now().toString().slice(-4)}`;

    setGroups(current => [
      {
        id,
        name: values.name || "Nhóm quyền mới",
        color: "#3b82f6",
        iconBg: "bg-blue-100",
        desc: values.desc || "Nhóm quyền mới được tạo",
        users: Number(values.users || 0),
        scope: values.scope || "Toàn hệ thống",
        scopeType: values.scopeType || "global",
        status: "hoatdong",
        updated: "Vừa cập nhật",
      },
      ...current,
    ]);
  }

  return (
    <>
      {/* Stats */}
      <div className="app-grid-stats mb-4">
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
      <div className="app-table-card">
        {/* Toolbar */}
        <div className="app-toolbar-strip flex flex-wrap items-center gap-2 px-4 py-3">
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
          <button
            type="button"
            className="app-primary-action flex items-center gap-1.5 rounded-lg px-[15px] py-[9px] text-[12px] font-medium"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus size={16} /> Thêm nhóm quyền
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
            {groups.map(g => (
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
      <AddEntityDialog
        open={isAddOpen}
        title="Thêm nhóm quyền"
        description="Tạo nhóm quyền mới và cấu hình phạm vi áp dụng."
        submitLabel="Lưu nhóm quyền"
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddGroup}
        fields={[
          { name: "id", label: "Mã nhóm", placeholder: "academic" },
          { name: "name", label: "Tên nhóm quyền", placeholder: "Phòng đào tạo", required: true },
          { name: "desc", label: "Mô tả", placeholder: "Quản lý nghiệp vụ đào tạo" },
          { name: "users", label: "Số người dùng", type: "number", defaultValue: "0" },
          { name: "scope", label: "Phạm vi", placeholder: "Toàn hệ thống" },
          {
            name: "scopeType",
            label: "Loại phạm vi",
            defaultValue: "global",
            options: [
              { label: "Toàn hệ thống", value: "global" },
              { label: "Theo lớp học", value: "class" },
              { label: "Theo phòng ban", value: "dept" },
              { label: "Theo học sinh", value: "student" },
            ],
          },
        ]}
      />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function UsersPage() {
  const [tab, setTab] = useState<UsersTab>("list");

  return (
    <div className="app-page">
      <div className="mb-4">
        <PageTabs
          tabs={[
            { id: "list" as UsersTab, label: "Danh sách người dùng" },
            { id: "groups" as UsersTab, label: "Nhóm quyền" },
          ]}
          activeTab={tab}
          onChange={setTab}
          ariaLabel="Quản lý người dùng"
        />
      </div>

      {tab === "list"   && <UserListTab />}
      {tab === "groups" && <PermissionGroupsTab />}
    </div>
  );
}



