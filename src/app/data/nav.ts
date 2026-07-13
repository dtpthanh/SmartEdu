import {
  LayoutDashboard, School, Camera, Radio, BarChart2,
  Calendar, FileBarChart, History, Wrench, Settings2, Users,
} from "lucide-react";

export const NAV_PATHS: Record<string, string> = {
  dashboard: "/dashboard", rooms: "/rooms",    camera: "/camera",
  stream: "/stream",       analytics: "/analytics", events: "/events",
  reports: "/reports",     history: "/history", devices: "/devices",
  settings: "/settings",   users: "/users",
};

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",        id: "dashboard" },
  { icon: School,           label: "Phòng học",        id: "rooms" },
  { icon: Camera,           label: "Camera",           id: "camera" },
  { icon: Wrench,           label: "Thiết bị",         id: "devices" },
  { icon: Radio,            label: "Phát trực tuyến",  id: "stream" },
  { icon: History,          label: "Lịch sử ghi hình", id: "history" },
  { icon: BarChart2,        label: "AI Analytics",     id: "analytics" },
  { icon: Calendar,         label: "Sự kiện",          id: "events" },
  { icon: FileBarChart,     label: "Báo cáo",          id: "reports" },
  { icon: Settings2,        label: "Cài đặt",          id: "settings" },
  { icon: Users,            label: "Người dùng",       id: "users" },
];
