export const REC_CAMERAS = [
  { id: "01", name: "Camera 01", sub: "Giáo viên · Toàn cảnh", room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=60" },
  { id: "02", name: "Camera 02", sub: "Học sinh · Trải",        room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=300&q=60" },
  { id: "03", name: "Camera 03", sub: "Học sinh · Phải",        room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=300&q=60" },
  { id: "04", name: "Camera 04", sub: "Cửa ra vào",             room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1599036495538-ee049546a069?w=300&q=60" },
  { id: "05", name: "Camera 05", sub: "Bảng viết",              room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=300&q=60" },
  { id: "06", name: "Camera 06", sub: "Toàn cảnh sau",          room: "Phòng A101 - Lớp 10A1", status: "online", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&q=60" },
];

export const REC_LIST = [
  { id: 1,  img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&q=60",  camera: "Camera 01 · Giáo viên · Toàn cảnh", room: "A101 - Lớp 10A1", start: "29/04/2026 09:30:00", end: "29/04/2026 09:45:00", type: "Liên tục", duration: "15:00", size: "1.2 GB", event: "-" },
  { id: 2,  img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=80&q=60",  camera: "Camera 02 · Học sinh · Trải",        room: "A101 - Lớp 10A1", start: "29/04/2026 09:30:00", end: "29/04/2026 09:45:00", type: "Liên tục", duration: "15:00", size: "1.1 GB", event: "-" },
  { id: 3,  img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=80&q=60",  camera: "Camera 03 · Học sinh · Phải",        room: "A101 - Lớp 10A1", start: "29/04/2026 09:30:00", end: "29/04/2026 09:45:00", type: "Liên tục", duration: "15:00", size: "1.0 GB", event: "-" },
  { id: 4,  img: "https://images.unsplash.com/photo-1599036495538-ee049546a069?w=80&q=60",  camera: "Camera 04 · Cửa ra vào",             room: "A101 - Lớp 10A1", start: "29/04/2026 09:29:30", end: "29/04/2026 09:44:30", type: "Sự kiện", duration: "15:00", size: "900 MB", event: "Phát hiện người" },
  { id: 5,  img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=80&q=60",     camera: "Camera 05 · Bảng viết",              room: "A101 - Lớp 10A1", start: "29/04/2026 09:30:00", end: "29/04/2026 09:45:00", type: "Liên tục", duration: "15:00", size: "800 MB", event: "-" },
  { id: 6,  img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=80&q=60",  camera: "Camera 06 · Toàn cảnh sau",          room: "A101 - Lớp 10A1", start: "29/04/2026 09:30:00", end: "29/04/2026 09:45:00", type: "Liên tục", duration: "15:00", size: "1.3 GB", event: "-" },
];

export const EVENTS = [
  { time: "29/04/2026", clock: "09:35:22", type: "Phát hiện nói chuyện riêng", camera: "Camera 01", room: "A101 - Lớp 10A1", level: "Cao",      clip: "00:20", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&q=60" },
  { time: "29/04/2026", clock: "09:32:05", type: "Sử dụng điện thoại",         camera: "Camera 02", room: "A102 - Lớp 10A2", level: "Trung bình", clip: "00:18", img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=100&q=60" },
  { time: "29/04/2026", clock: "09:28:47", type: "Ra vào lớp học",             camera: "Camera 04", room: "B101 - Lớp 11B1", level: "Thấp",      clip: "00:15", img: "https://images.unsplash.com/photo-1599036495538-ee049546a069?w=100&q=60" },
  { time: "29/04/2026", clock: "09:25:13", type: "Không có mặt trong lớp",     camera: "Camera 03", room: "A103 - Lớp 10A3", level: "Cao",       clip: "00:25", img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=100&q=60" },
  { time: "29/04/2026", clock: "09:21:56", type: "Gây mất trật tự",            camera: "Camera 05", room: "C201 - Lớp 12C1", level: "Trung bình", clip: "00:22", img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=100&q=60" },
  { time: "29/04/2026", clock: "09:18:33", type: "Sử dụng điện thoại",         camera: "Camera 06", room: "B102 - Lớp 11B2", level: "Trung bình", clip: "00:17", img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=100&q=60" },
  { time: "29/04/2026", clock: "09:15:09", type: "Phát hiện nói chuyện riêng", camera: "Camera 01", room: "A101 - Lớp 10A1", level: "Cao",       clip: "00:19", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=100&q=60" },
  { time: "29/04/2026", clock: "09:11:42", type: "Ra vào lớp học",             camera: "Camera 07", room: "C202 - Lớp 12C2", level: "Thấp",      clip: "00:14", img: "https://images.unsplash.com/photo-1566833017497-830328f5bc5d?w=100&q=60" },
  { time: "29/04/2026", clock: "09:08:27", type: "Không có mặt trong lớp",     camera: "Camera 08", room: "B103 - Lớp 11B3", level: "Cao",       clip: "00:23", img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=100&q=60" },
  { time: "29/04/2026", clock: "09:04:58", type: "Gây mất trật tự",            camera: "Camera 05", room: "C201 - Lớp 12C1", level: "Trung bình", clip: "00:21", img: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=100&q=60" },
];

export const DOWNLOADS = [
  { id: 1,  file: "A101_Camera01_20260429_093000.mp4", camera: "Camera 01", room: "A101 - Lớp 10A1", range: "29/04/2026 09:30:00 - 10:00:00", size: "1.2 GB", pct: 100, status: "Hoàn thành", created: "29/04/2026 10:00:15" },
  { id: 2,  file: "B101_Camera02_20260429_090000.mp4", camera: "Camera 02", room: "B101 - Lớp 11B1", range: "29/04/2026 09:00:00 - 09:30:00", size: "850 MB", pct: 100, status: "Hoàn thành", created: "29/04/2026 09:30:45" },
  { id: 3,  file: "A102_Camera03_20260429_091500.mp4", camera: "Camera 03", room: "A102 - Lớp 10A2", range: "29/04/2026 09:15:00 - 10:15:00", size: "1.6 GB", pct: 100, status: "Hoàn thành", created: "29/04/2026 10:15:30" },
  { id: 4,  file: "C201_Camera05_20260429_084500.mp4", camera: "Camera 05", room: "C201 - Lớp 12C1", range: "29/04/2026 08:45:00 - 09:45:00", size: "1.1 GB", pct: 68,  status: "Đang tải",   created: "29/04/2026 09:45:12" },
  { id: 5,  file: "B102_Camera04_20260429_100000.mp4", camera: "Camera 04", room: "B102 - Lớp 11B2", range: "29/04/2026 10:00:00 - 10:30:00", size: "720 MB", pct: 45,  status: "Đang tải",   created: "29/04/2026 10:30:05" },
  { id: 6,  file: "A103_Camera01_20260429_071500.mp4", camera: "Camera 01", room: "A103 - Lớp 10A3", range: "29/04/2026 07:15:00 - 08:15:00", size: "900 MB", pct: 0,   status: "Chờ tải",    created: "29/04/2026 08:15:22" },
  { id: 7,  file: "B103_Camera03_20260428_143000.mp4", camera: "Camera 03", room: "B103 - Lớp 11B3", range: "28/04/2026 14:30:00 - 15:30:00", size: "1.3 GB", pct: 0,   status: "Chờ tải",    created: "29/04/2026 09:10:18" },
  { id: 8,  file: "C202_Camera06_20260428_160000.mp4", camera: "Camera 06", room: "C202 - Lớp 12C2", range: "28/04/2026 16:00:00 - 17:00:00", size: "1.8 GB", pct: 0,   status: "Chờ tải",    created: "29/04/2026 09:05:44" },
  { id: 9,  file: "A104_Camera02_20260429_083000.mp4", camera: "Camera 02", room: "A104 - Lớp 10A4", range: "29/04/2026 08:30:00 - 09:00:00", size: "650 MB", pct: 0,   status: "Chờ tải",    created: "29/04/2026 08:55:11" },
  { id: 10, file: "B104_Camera04_20260428_101500.mp4", camera: "Camera 04", room: "B104 - Lớp 11B4", range: "28/04/2026 10:15:00 - 11:15:00", size: "1.0 GB", pct: 0,   status: "Chờ tải",    created: "29/04/2026 08:40:09" },
];
