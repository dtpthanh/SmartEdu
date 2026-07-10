export type RoomStatus = "hoatdong" | "khonghoatdong" | "baotri" | "chuy";

export interface Room {
  id: string;
  name: string;
  status: RoomStatus;
  students: string;
  teacher: string;
  attention: number;
  noise: "Thấp" | "Trung bình" | "Cao" | "Không có";
  cameras: number;
  devices: number;
  img: string;
}

export const ROOMS: Room[] = [
  {
    id: "A101", name: "A101 - Lớp 10A1", status: "hoatdong",
    students: "45/45", teacher: "Nguyễn Văn An",
    attention: 85, noise: "Thấp", cameras: 2, devices: 8,
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70",
  },
  {
    id: "A102", name: "A102 - Lớp 10A2", status: "hoatdong",
    students: "40/40", teacher: "Trần Thị Bình",
    attention: 78, noise: "Trung bình", cameras: 2, devices: 8,
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=70",
  },
  {
    id: "B101", name: "B101 - Lớp 11B1", status: "baotri",
    students: "42/45", teacher: "Lê Văn Cường",
    attention: 62, noise: "Cao", cameras: 2, devices: 7,
    img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=600&q=70",
  },
  {
    id: "B102", name: "B102 - Lớp 11B2", status: "hoatdong",
    students: "43/43", teacher: "Phạm Thị Dung",
    attention: 88, noise: "Thấp", cameras: 2, devices: 9,
    img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=600&q=70",
  },
  {
    id: "C201", name: "C201 - Lớp 12C1", status: "khonghoatdong",
    students: "0/40", teacher: "Hoàng Minh Tuấn",
    attention: 0, noise: "Không có", cameras: 2, devices: 6,
    img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=600&q=70",
  },
  {
    id: "C202", name: "C202 - Lớp 12C2", status: "chuy",
    students: "38/40", teacher: "Đỗ Thị Hoa",
    attention: 45, noise: "Cao", cameras: 1, devices: 5,
    img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=600&q=70",
  },
];

export const RECENT_ACTIVITIES = [
  { time: "09:35", room: "A101 - Lớp 10A1", desc: "bắt đầu hoạt động", sub: "Giáo viên: Nguyễn Văn An",      type: "active" },
  { time: "09:28", room: "B101 - Lớp 11B1", desc: "chuyển sang báo trì", sub: "Kỹ thuật viên: Trần Minh Đức", type: "warning" },
  { time: "09:20", room: "C202 - Lớp 12C2", desc: "độ ồn cao",           sub: "Vượt ngưỡng 75dB",             type: "alert" },
  { time: "09:15", room: "C201 - Lớp 12C1", desc: "ngừng hoạt động",     sub: "Không có học sinh",             type: "inactive" },
  { time: "09:05", room: "B102 - Lớp 11B2", desc: "Camera offline",      sub: "Camera 2 - Góc phải",          type: "error" },
];

export const ATTENTION_ROOMS = [
  { room: "C202 - Lớp 12C2", issue: "Độ ồn cao (82dB)",      badge: "Cao",      badgeColor: "bg-red-100 text-red-600",    time: "09:20" },
  { room: "A103 - Lớp 10A3", issue: "Tập trung thấp (38%)",  badge: "Trung bình", badgeColor: "bg-yellow-100 text-yellow-700", time: "09:10" },
  { room: "B101 - Lớp 11B1", issue: "Thiết bị cần báo trì",  badge: "Trung bình", badgeColor: "bg-yellow-100 text-yellow-700", time: "09:05" },
];
