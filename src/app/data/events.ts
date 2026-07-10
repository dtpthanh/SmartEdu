export const EVENTS_LIST = [
  { time: "09:35:22", room: "A101 - Lớp 10A1", type: "Mức độ ồn cao",       level: "Cao",       desc: "Tiếng ồn: 78 dB",                        by: "AI Analytics", status: "chuaxuly" },
  { time: "09:28:11", room: "A102 - Lớp 10A2", type: "Nói chuyện riêng",    level: "Trung bình", desc: "Học sinh nói chuyện trong giờ học",       by: "AI Analytics", status: "chuaxuly" },
  { time: "09:20:45", room: "B101 - Lớp 11B1", type: "Học sinh rời chỗ",    level: "Trung bình", desc: "Phát hiện 3 HS rời khỏi chỗ",            by: "AI Analytics", status: "daxuly"   },
  { time: "09:15:57", room: "C201 - Lớp 12C1", type: "Giơ tay",             level: "Thấp",       desc: "Học sinh giơ tay",                       by: "AI Analytics", status: "daxuly"   },
  { time: "09:10:31", room: "A101 - Lớp 10A1", type: "Mất tập trung",       level: "Trung bình", desc: "23% học sinh mất tập trung",             by: "AI Analytics", status: "chuaxuly" },
  { time: "09:05:12", room: "B102 - Lớp 11B2", type: "Vượt ngưỡng nhiệt độ", level: "Cao",      desc: "Nhiệt độ: 31.2°C",                       by: "NVR-01",        status: "chuaxuly" },
  { time: "09:00:05", room: "A103 - Lớp 10A3", type: "Che khuất camera",    level: "Thấp",       desc: "Phát hiện vật thể che khuất",            by: "Camera 03",    status: "daxuly"   },
  { time: "08:55:33", room: "C202 - Lớp 12C2", type: "Máy chiếu tắt",       level: "Thấp",       desc: "Máy chiếu không hoạt động",              by: "Thiết bị",     status: "daxuly"   },
  { time: "08:50:22", room: "Thư viện",         type: "Xâm nhập khu vực",   level: "Cao",        desc: "Phát hiện người lạ xâm nhập",            by: "Camera 07",    status: "chuaxuly" },
  { time: "08:45:17", room: "Sân trường",       type: "Khu vực cấm",         level: "Trung bình", desc: "Vượt qua khu vực cấm",                  by: "Camera 08",    status: "daxuly"   },
];

export const HISTORY_LIST = [
  { time: "09:37:45", date: "29/04/2026", type: "Mức độ ồn cao",       sub: "Tiếng ồn: 78 dB",           room: "A101 - Lớp 10A1", device: "Camera 01", level: "Cao",       result: "daxuly",   handler: "AI Analytics", duration: "00:00:12" },
  { time: "09:36:20", date: "29/04/2026", type: "Nói chuyện riêng",    sub: "Học sinh nói chuyện",        room: "A102 - Lớp 10A2", device: "Camera 02", level: "Trung bình", result: "daxuly",   handler: "giovienA",     duration: "00:00:08" },
  { time: "09:35:22", date: "29/04/2026", type: "Học sinh rời chỗ",    sub: "Phát hiện 3 HS",             room: "B101 - Lớp 11B1", device: "Camera 03", level: "Trung bình", result: "daxuly",   handler: "Hệ thống AI",  duration: "00:00:15" },
  { time: "09:15:57", date: "29/04/2026", type: "Giơ tay",             sub: "Học sinh giơ tay",           room: "C201 - Lớp 12C1", device: "Camera 04", level: "Thấp",      result: "daxuly",   handler: "AI Analytics", duration: "00:00:05" },
  { time: "09:10:31", date: "29/04/2026", type: "Mất tập trung",       sub: "23% HS mất tập trung",       room: "A101 - Lớp 10A1", device: "Camera 01", level: "Trung bình", result: "choduyet", handler: "AI Analytics", duration: "00:02:30" },
  { time: "09:05:12", date: "29/04/2026", type: "Vượt ngưỡng nhiệt độ", sub: "Nhiệt độ: 31.2°C",         room: "B102 - Lớp 11B2", device: "NVR-01",    level: "Cao",       result: "daxuly",   handler: "NVR-01",       duration: "00:00:20" },
  { time: "09:00:05", date: "29/04/2026", type: "Che khuất camera",    sub: "Phát hiện vật thể",          room: "A103 - Lớp 10A3", device: "Camera 03", level: "Thấp",      result: "daxuly",   handler: "Hệ thống AI",  duration: "00:00:09" },
  { time: "08:55:33", date: "29/04/2026", type: "Máy chiếu tắt",       sub: "Không hoạt động",            room: "C202 - Lớp 12C2", device: "Thiết bị",  level: "Thấp",      result: "daxuly",   handler: "Thiết bị",     duration: "00:00:18" },
  { time: "08:50:22", date: "29/04/2026", type: "Xâm nhập khu vực",   sub: "Phát hiện người lạ",          room: "Thư viện",         device: "Camera 07", level: "Cao",       result: "daxuly",   handler: "AI Analytics", duration: "00:00:25" },
  { time: "08:45:17", date: "29/04/2026", type: "Khu vực cấm",         sub: "Ranh giới ảo",               room: "Sân trường",       device: "Camera 08", level: "Trung bình", result: "daxuly",   handler: "Hệ thống AI",  duration: "00:00:14" },
];

export const CHART_DATA = [
  { hour: "00:00", cao: 4,  tb: 8,  thap: 3  },
  { hour: "02:00", cao: 2,  tb: 5,  thap: 2  },
  { hour: "04:00", cao: 1,  tb: 3,  thap: 1  },
  { hour: "06:00", cao: 5,  tb: 12, thap: 4  },
  { hour: "08:00", cao: 18, tb: 28, thap: 10 },
  { hour: "10:00", cao: 22, tb: 35, thap: 14 },
  { hour: "12:00", cao: 30, tb: 42, thap: 18 },
  { hour: "14:00", cao: 28, tb: 38, thap: 15 },
  { hour: "16:00", cao: 20, tb: 30, thap: 12 },
  { hour: "18:00", cao: 10, tb: 18, thap: 6  },
  { hour: "20:00", cao: 6,  tb: 14, thap: 4  },
  { hour: "22:00", cao: 3,  tb: 7,  thap: 2  },
];

export const EVENT_DETAIL = {
  type: "Mức độ ồn cao",
  room: "Phòng A101 - Lớp 10A1",
  level: "Cao",
  status: "chuaxuly",
  timeOccur: "29/04/2026 09:35:22",
  timeDetect: "29/04/2026 09:35:24",
  device: "Camera 01 - Giáo viên",
  detectedBy: "AI Analytics",
  confidence: 92,
  noise: 78,
  threshold: "> 65 dB",
  desc: "Âm thanh trong lớp vượt ngưỡng cho phép",
  img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=70",
  clips: [
    { label: "Phœurot tiền", time: "09:35:22", dur: "00:20", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&q=60" },
    { label: "Cắp trước sự kiện", time: "", dur: "00:20", img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=200&q=60" },
    { label: "Cắp sau sự kiện", time: "", dur: "00:30", img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=200&q=60" },
  ],
  screenshots: [
    { time: "09:35:21", img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=120&q=60" },
    { time: "09:35:23", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=120&q=60" },
    { time: "09:35:25", img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=120&q=60" },
  ],
  timeline: [
    { step: "Phát hiện sự kiện", time: "09:35:22", by: "AI Analytics", desc: "Phát hiện mức độ ồn: 78 dB (vượt ngưỡng 65 dB)", done: true },
    { step: "Gửi cảnh báo",      time: "09:35:23", by: "Hệ thống",     desc: "Đã gửi thông báo đến quản trị viên và giáo viên", done: true },
    { step: "Đang xử lý",        time: "09:35:30", by: "admin (Quản trị viên)", desc: "Đang xem xét và phân tích chi tiết", done: false, active: true },
    { step: "Xử lý hoàn tất",    time: "09:37:45", by: "admin (Quản trị viên)", desc: "Đã xác nhận sự kiện, lưu vào báo cáo", done: true },
  ],
  comment: { user: "admin", role: "Quản trị viên", time: "09:37:45", text: "Đã kiểm tra, xác nhận mức ồn do hoạt động thảo luận nhóm.\nKhông cần can thiệp." },
};
