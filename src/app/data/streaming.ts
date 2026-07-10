export const LIVE_STREAMS = [
  { id: "A101", room: "A101 - Lớp 10A1", teacher: "Nguyễn Văn An",    subject: "Toán học",   viewers: 256, platforms: ["yt","fb"],    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=65" },
  { id: "A102", room: "A102 - Lớp 10A2", teacher: "Trần Thị Bình",    subject: "Vật lý",     viewers: 199, platforms: ["yt","fb","zm"], img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=400&q=65" },
  { id: "B101", room: "B101 - Lớp 11B1", teacher: "Hoàng Minh Tuấn",  subject: "Hóa học",    viewers: 164, platforms: ["yt","gm"],    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=65" },
  { id: "B102", room: "B102 - Lớp 11B2", teacher: "Lê Thị Mai",       subject: "Sinh học",   viewers: 132, platforms: ["fb"],         img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=400&q=65" },
  { id: "C201", room: "C201 - Lớp 12C1", teacher: "Phạm Thị Dung",    subject: "Tiếng Anh",  viewers: 98,  platforms: ["yt","fb","zm"], img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=400&q=65" },
  { id: "C202", room: "C202 - Lớp 12C2", teacher: "Nguyễn Đức Huy",   subject: "Tin học",    viewers: 87,  platforms: ["gm","zm"],    img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=400&q=65" },
  { id: "D101", room: "D101 - Lớp 10D1", teacher: "Đỗ Thị Hoa",       subject: "Lịch sử",    viewers: 76,  platforms: ["yt"],         img: "https://images.unsplash.com/photo-1566833017497-830328f5bc5d?w=400&q=65" },
  { id: "E101", room: "E101 - Lớp 11E1", teacher: "Trần Quốc Bảo",    subject: "GDCD",       viewers: 37,  platforms: ["fb","rtmp"],  img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=65" },
];

export const PLATFORMS = [
  { id: "yt",   name: "YouTube",     color: "#FF0000", connected: true  },
  { id: "fb",   name: "Facebook",    color: "#1877F2", connected: true  },
  { id: "zm",   name: "Zoom",        color: "#2D8CFF", connected: true  },
  { id: "gm",   name: "Google Meet", color: "#00AC47", connected: true  },
  { id: "rtmp", name: "RTMP",        color: "#6B7280", connected: false },
];

export const VIEWER_TREND = [
  { t: "08:00", v: 120 },
  { t: "08:30", v: 380 },
  { t: "09:00", v: 820 },
  { t: "09:30", v: 1248 },
  { t: "10:00", v: 1100 },
  { t: "10:30", v: 950 },
  { t: "11:00", v: 780 },
];

export const UPCOMING = [
  { time: "09:45 - 10:30", room: "A103 - Lớp 10A3", subject: "Toán học - Phương trình bậc hai", teacher: "Lê Văn Cường" },
  { time: "10:30 - 11:15", room: "B201 - Lớp 11B3", subject: "Giải tích - Trần Văn Nam",        teacher: "Trần Văn Nam" },
  { time: "11:15 - 12:00", room: "C203 - Lớp 12C3", subject: "GDCD - Lê Minh Châu",             teacher: "Lê Minh Châu" },
];
