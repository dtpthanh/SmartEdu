import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type HeaderProps = {
  isDarkMode: boolean;
  onToggleCollapse: () => void;
  onToggleTheme: () => void;
};

type HeaderNotification = {
  id: number;
  title: string;
  description: string;
  time: string;
  href: string;
  unread: boolean;
};

const INITIAL_NOTIFICATIONS: HeaderNotification[] = [
  {
    id: 1,
    title: "Cảnh báo âm thanh cao",
    description: "Phòng C202 vượt ngưỡng 82dB trong tiết 3.",
    time: "2 phút trước",
    href: "/events",
    unread: true,
  },
  {
    id: 2,
    title: "Báo cáo mới đã sẵn sàng",
    description: "Báo cáo tuần này đã được tổng hợp tại trang Báo cáo.",
    time: "10 phút trước",
    href: "/reports",
    unread: true,
  },
  {
    id: 3,
    title: "Tài khoản mới chờ duyệt",
    description: "Có 2 người dùng mới đang chờ cấp quyền.",
    time: "25 phút trước",
    href: "/users",
    unread: true,
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/rooms": "Phòng học",
  "/camera": "Camera",
  "/stream": "Phát trực tuyến",
  "/analytics": "AI Analytics",
  "/events": "Sự kiện",
  "/reports": "Báo cáo",
  "/history": "Lịch sử ghi hình",
  "/devices": "Thiết bị",
  "/settings": "Cài đặt",
  "/users": "Người dùng",
};

export function Header({ isDarkMode, onToggleCollapse, onToggleTheme }: HeaderProps) {
  const [time, setTime] = useState(() => new Date());
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter(notification => notification.unread).length,
    [notifications],
  );

  const pageTitle = useMemo(() => {
    const matchedPath = Object.keys(PAGE_TITLES)
      .sort((a, b) => b.length - a.length)
      .find(path => location.pathname.startsWith(path));

    return matchedPath ? PAGE_TITLES[matchedPath] : "SmartEdu";
  }, [location.pathname]);

  const pad = (value: number) => String(value).padStart(2, "0");
  const clock = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  const markAllAsRead = () => {
    setNotifications(current => current.map(notification => ({ ...notification, unread: false })));
  };

  const handleNotificationClick = (id: number, href: string) => {
    setNotifications(current =>
      current.map(notification =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
    navigate(href);
  };

  return (
    <header className="flex h-[72px] flex-shrink-0 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75 dark:shadow-[0_14px_40px_rgba(2,6,23,0.55)]">
      <button
        onClick={onToggleCollapse}
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent bg-transparent text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/90 dark:hover:text-white"
        aria-label="Thu gọn menu"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0 flex-shrink">
        <div className="truncate text-[22px] font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-slate-50">
          {pageTitle}
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={onToggleTheme}
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label={isDarkMode ? "Chuyển sang light mode" : "Chuyển sang dark mode"}
        title={isDarkMode ? "Light mode" : "Dark mode"}
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Thông báo"
          >
            <Bell size={18} className="text-current" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-[0_0_16px_rgba(239,68,68,0.45)]">
                {unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[360px] border-slate-200/80 bg-white/95 p-0 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/95 dark:shadow-[0_24px_60px_rgba(2,6,23,0.7)]"
        >
          <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Thông báo</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {unreadCount} thông báo chưa đọc
                </div>
              </div>
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-500/10"
              >
                <CheckCheck size={14} />
                Đánh dấu đã đọc
              </button>
            </div>
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            {notifications.map(notification => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id, notification.href)}
                className="flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-800/80 dark:hover:bg-slate-900/80"
              >
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.unread ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.45)]" : "bg-slate-300 dark:bg-slate-600"}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {notification.title}
                    </div>
                    <div className="flex-shrink-0 text-[10px] text-slate-400 dark:text-white/60">
                      {notification.time}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-white/78">
                    {notification.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="px-4 py-3">
            <button
              onClick={() => navigate("/events")}
              className="w-full rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-700 dark:shadow-[0_12px_28px_rgba(37,99,235,0.3)]"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-3 py-1.5 text-[12px] text-slate-600 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200">
        <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Monitor size={10} className="text-slate-500 dark:text-slate-300" />
        </div>
        <span className="font-mono">{clock}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-2xl border border-transparent px-2 py-1.5 transition-all hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900/90">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-[11px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)]">
              A
            </div>
            <div className="text-left">
              <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">admin</div>
              <div className="text-[10px] text-slate-400 dark:text-white/72">Quản trị viên</div>
            </div>
            <ChevronDown size={12} className="text-slate-400 dark:text-slate-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 border-slate-200/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/95 dark:shadow-[0_24px_60px_rgba(2,6,23,0.7)]"
        >
          <DropdownMenuLabel className="pb-1">
            <div className="text-sm font-semibold">admin</div>
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
              Quản trị hệ thống SmartEdu
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/users")}>
              <User size={16} />
              Hồ sơ cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/users")}>
              <Users size={16} />
              Quản lý tài khoản
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings size={16} />
              Cài đặt hệ thống
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/events")}>
            <Bell size={16} />
            Trung tâm thông báo
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => navigate("/dashboard")}>
            <LogOut size={16} />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
