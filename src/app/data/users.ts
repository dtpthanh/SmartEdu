export const PERMISSION_GROUPS = [
  {
    id: "admin",     name: "Quản trị viên", color: "#3b82f6", iconBg: "bg-blue-100",
    desc: "Toàn quyền quản trị hệ thống, quản lý người dùng và cài đặt",
    users: 1, scope: "Toàn hệ thống", scopeType: "global", status: "hoatdong", updated: "28/04/2026 14:30",
  },
  {
    id: "teacher",   name: "Giáo viên",     color: "#f97316", iconBg: "bg-orange-100",
    desc: "Quản lý lớp học, học sinh và nội dung giảng dạy",
    users: 15, scope: "Theo lớp học", scopeType: "class", status: "hoatdong", updated: "28/04/2026 13:20",
  },
  {
    id: "staff",     name: "Nhân viên",     color: "#f59e0b", iconBg: "bg-amber-100",
    desc: "Hỗ trợ vận hành và quản lý dữ liệu hệ thống",
    users: 5, scope: "Theo phòng ban", scopeType: "dept", status: "hoatdong", updated: "27/04/2026 16:40",
  },
  {
    id: "accountant", name: "Kế toán",      color: "#22c55e", iconBg: "bg-green-100",
    desc: "Quản lý tài chính, hóa đơn và báo cáo kế toán",
    users: 3, scope: "Theo phòng ban", scopeType: "dept", status: "hoatdong", updated: "27/04/2026 15:10",
  },
  {
    id: "tech",      name: "Kỹ thuật",      color: "#ef4444", iconBg: "bg-red-100",
    desc: "Quản lý thiết bị, camera và hệ thống kỹ thuật",
    users: 2, scope: "Toàn hệ thống", scopeType: "global", status: "hoatdong", updated: "27/04/2026 11:05",
  },
  {
    id: "parent",    name: "Phụ huynh",     color: "#ec4899", iconBg: "bg-pink-100",
    desc: "Theo dõi thông tin học tập và điểm danh của con",
    users: 23, scope: "Theo học sinh", scopeType: "student", status: "hoatdong", updated: "26/04/2026 09:15",
  },
];

export const USERS_LIST = [
  { initials: "NA", name: "Nguyễn Văn An",  phone: "0987654321", email: "nguyenvanan@school.edu.vn",   role: "admin",   rooms: "Tất cả phòng học", status: "hoatdong", lastLogin: "29/04/2026 08:30", avatarColor: "#3b82f6" },
  { initials: "TB", name: "Trần Thị Bình",  phone: "0912345678", email: "tranthibinh@school.edu.vn",   role: "teacher", rooms: "A101, A102, A103", status: "hoatdong", lastLogin: "29/04/2026 07:45", avatarColor: "#f97316" },
  { initials: "LC", name: "Lê Văn Cường",   phone: "0934567890", email: "levancuong@school.edu.vn",    role: "teacher", rooms: "B201, B202",       status: "hoatdong", lastLogin: "29/04/2026 06:15", avatarColor: "#f97316" },
  { initials: "PD", name: "Phạm Thị Dung",  phone: "0909876543", email: "phamthidung@school.edu.vn",   role: "staff",   rooms: "Văn phòng",        status: "hoatdong", lastLogin: "28/04/2026 17:20", avatarColor: "#f59e0b" },
  { initials: "HD", name: "Hoàng Minh Đức", phone: "0923456789", email: "hoangminhduc@school.edu.vn",  role: "teacher", rooms: "C301, C302, C303", status: "hoatdong", lastLogin: "29/04/2026 09:10", avatarColor: "#f97316" },
  { initials: "DH", name: "Đỗ Thị Hương",   phone: "0976543210", email: "dothihuong@school.edu.vn",    role: "staff",   rooms: "Phòng thiết bị",   status: "tamkhoa",  lastLogin: "27/04/2026 16:40", avatarColor: "#f59e0b" },
  { initials: "VK", name: "Vũ Văn Khánh",   phone: "0918765432", email: "vuvankhanh@school.edu.vn",    role: "teacher", rooms: "A104, A105",       status: "hoatdong", lastLogin: "29/04/2026 08:05", avatarColor: "#f97316" },
  { initials: "BL", name: "Bùi Thị Lan",    phone: "0932109876", email: "buithilan@school.edu.vn",     role: "staff",   rooms: "Kế toán",          status: "hoatdong", lastLogin: "28/04/2026 14:30", avatarColor: "#f59e0b" },
];
