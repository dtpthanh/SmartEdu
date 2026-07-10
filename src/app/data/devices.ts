export const ALL_DEVICES = [
  { id: "cam01", name: "Camera 01 - Giáo viên",   code: "CAM01-GV-A101", type: "Camera",         room: "A101 - Lớp 10A1", ip: "192.168.1.101", status: "hoatdong",  uptime: "2 ngày 14 giờ",  version: "V2.1.8", kind: "cam" },
  { id: "cam02", name: "Camera 02 - Học sinh",     code: "CAM02-HS-A101", type: "Camera",         room: "A101 - Lớp 10A1", ip: "192.168.1.102", status: "hoatdong",  uptime: "2 ngày 14 giờ",  version: "V2.1.8", kind: "cam" },
  { id: "cam03", name: "Camera 03 - Cửa ra vào",  code: "CAM03-CR-A101", type: "Camera",         room: "A101 - Lớp 10A1", ip: "192.168.1.103", status: "hoatdong",  uptime: "1 ngày 8 giờ",   version: "V2.1.7", kind: "cam" },
  { id: "nvr1",  name: "NVR - Tầng 1",            code: "NVR-T1-01",     type: "Đầu ghi (NVR)", room: "Phòng thiết bị",  ip: "192.168.1.10",  status: "hoatdong",  uptime: "5 ngày 2 giờ",   version: "V4.0.2", kind: "nvr" },
  { id: "cam04", name: "Camera 04 - Giáo viên",   code: "CAM04-GV-A102", type: "Camera",         room: "A102 - Lớp 10A2", ip: "192.168.1.104", status: "ngoaitiyen", uptime: "-",             version: "V2.1.6", kind: "cam" },
  { id: "cam05", name: "Camera 05 - Học sinh",     code: "CAM05-HS-A102", type: "Camera",         room: "A102 - Lớp 10A2", ip: "192.168.1.105", status: "hoatdong",  uptime: "12 giờ 45 phút", version: "V2.1.8", kind: "cam" },
  { id: "cam06", name: "Camera 06 - Cửa ra vào",  code: "CAM06-CR-A102", type: "Camera",         room: "A102 - Lớp 10A2", ip: "192.168.1.106", status: "canhbao",   uptime: "3 giờ 12 phút",  version: "V2.1.7", kind: "cam" },
  { id: "nvr2",  name: "NVR - Tầng 2",            code: "NVR-T2-01",     type: "Đầu ghi (NVR)", room: "Phòng thiết bị",  ip: "192.168.1.11",  status: "hoatdong",  uptime: "4 ngày 18 giờ",  version: "V4.0.2", kind: "nvr" },
  { id: "cam07", name: "Camera 07 - Giáo viên",   code: "CAM07-GV-A103", type: "Camera",         room: "A103 - Lớp 10A3", ip: "192.168.1.107", status: "hoatdong",  uptime: "6 giờ 33 phút",  version: "V2.1.8", kind: "cam" },
  { id: "cam08", name: "Camera 08 - Học sinh",     code: "CAM08-HS-A103", type: "Camera",         room: "A103 - Lớp 10A3", ip: "192.168.1.108", status: "ngoaitiyen", uptime: "-",             version: "V2.1.6", kind: "cam" },
];

export const CAMERA_DEVICES = [
  { id: "c01", name: "Camera 01 - Giáo viên",   code: "CAM01-GV-A101",  type: "Camera cố định",   room: "A101 - Lớp 10A1", ip: "192.168.1.101", status: "hoatdong",  uptime: "2 ngày 14 giờ",  version: "V2.1.8" },
  { id: "c02", name: "Camera 02 - Toàn lớp",    code: "CAM02-TL-A101",  type: "Camera toàn cảnh", room: "A101 - Lớp 10A1", ip: "192.168.1.102", status: "hoatdong",  uptime: "2 ngày 14 giờ",  version: "V2.1.8" },
  { id: "c03", name: "Camera 03 - Học sinh PTZ", code: "CAM03-PTZ-A101", type: "Camera PTZ",       room: "A101 - Lớp 10A1", ip: "192.168.1.103", status: "hoatdong",  uptime: "1 ngày 8 giờ",   version: "V2.1.7" },
  { id: "c04", name: "Camera 04 - Bảng/TV",     code: "CAM04-BD-A101",  type: "Camera cố định",   room: "A101 - Lớp 10A1", ip: "192.168.1.104", status: "canhbao",   uptime: "3 giờ 12 phút",  version: "V2.1.6" },
  { id: "c05", name: "Camera 05 - Cửa ra vào",  code: "CAM05-CR-A101",  type: "Camera cố định",   room: "A101 - Lớp 10A1", ip: "192.168.1.105", status: "hoatdong",  uptime: "12 giờ 45 phút", version: "V2.1.8" },
  { id: "c06", name: "Camera 06 - Giáo viên",   code: "CAM06-GV-A102",  type: "Camera cố định",   room: "A102 - Lớp 10A2", ip: "192.168.1.106", status: "hoatdong",  uptime: "4 ngày 18 giờ",  version: "V2.1.8" },
  { id: "c07", name: "Camera 07 - Toàn lớp",    code: "CAM07-TL-A102",  type: "Camera toàn cảnh", room: "A102 - Lớp 10A2", ip: "192.168.1.107", status: "ngoaitiyen", uptime: "2 giờ 33 phút", version: "V2.1.6" },
  { id: "c08", name: "Camera 08 - Học sinh PTZ", code: "CAM08-PTZ-A102", type: "Camera PTZ",       room: "A102 - Lớp 10A2", ip: "192.168.1.108", status: "hoatdong",  uptime: "6 giờ 22 phút",  version: "V2.1.7" },
  { id: "c09", name: "Camera 09 - Giáo viên",   code: "CAM09-GV-B101",  type: "Camera cố định",   room: "B101 - Lớp 11B1", ip: "192.168.1.109", status: "hoatdong",  uptime: "5 ngày 9 giờ",   version: "V2.1.8" },
  { id: "c10", name: "Camera 10 - Toàn lớp",    code: "CAM10-TL-B101",  type: "Camera toàn cảnh", room: "B101 - Lớp 11B1", ip: "192.168.1.110", status: "hoatdong",  uptime: "3 ngày 16 giờ",  version: "V2.1.8" },
  { id: "c11", name: "Camera 11 - Học sinh PTZ", code: "CAM11-PTZ-B101", type: "Camera PTZ",       room: "B101 - Lớp 11B1", ip: "192.168.1.111", status: "canhbao",   uptime: "1 giờ 45 phút",  version: "V2.1.7" },
  { id: "c12", name: "Camera 12 - Cửa ra vào",  code: "CAM12-CR-C201",  type: "Camera cố định",   room: "C201 - Lớp 12C1", ip: "192.168.1.112", status: "hoatdong",  uptime: "7 giờ 30 phút",  version: "V2.1.8" },
];

export const NVR_DEVICES = [
  { id: "n1", name: "NVR - Tòa nhà A - Tầng 1", code: "NVR-A-T1", channels: 16, location: "Tòa nhà A / Phòng KT T1", ip: "192.168.1.10", usedTB: 6.2,  totalTB: 8,  pct: 77, status: "ghihinh",     lastOnline: "2 phút trước",  firmware: "V4.0.2" },
  { id: "n2", name: "NVR - Tòa nhà A - Tầng 2", code: "NVR-A-T2", channels: 16, location: "Tòa nhà A / Phòng KT T2", ip: "192.168.1.11", usedTB: 5.1,  totalTB: 8,  pct: 64, status: "ghihinh",     lastOnline: "5 phút trước",  firmware: "V4.0.2" },
  { id: "n3", name: "NVR - Tòa nhà A - Tầng 3", code: "NVR-A-T3", channels: 16, location: "Tòa nhà A / Phòng KT T3", ip: "192.168.1.12", usedTB: 7.3,  totalTB: 8,  pct: 91, status: "ghihinh",     lastOnline: "1 phút trước",  firmware: "V4.0.1" },
  { id: "n4", name: "NVR - Tòa nhà B - Tầng 1", code: "NVR-B-T1", channels: 32, location: "Tòa nhà B / Phòng KT T1", ip: "192.168.2.10", usedTB: 12.8, totalTB: 16, pct: 80, status: "ghihinh",     lastOnline: "3 phút trước",  firmware: "V4.0.2" },
  { id: "n5", name: "NVR - Tòa nhà B - Tầng 2", code: "NVR-B-T2", channels: 32, location: "Tòa nhà B / Phòng KT T2", ip: "192.168.2.11", usedTB: 9.4,  totalTB: 16, pct: 59, status: "ngoaitiyen",  lastOnline: "3 giờ trước",   firmware: "V3.9.8" },
  { id: "n6", name: "NVR - Tòa nhà C - Tầng 1", code: "NVR-C-T1", channels: 16, location: "Tòa nhà C / Phòng KT T1", ip: "192.168.3.10", usedTB: 4.0,  totalTB: 8,  pct: 50, status: "ghihinh",     lastOnline: "7 phút trước",  firmware: "V4.0.1" },
  { id: "n7", name: "NVR - Tòa nhà C - Tầng 2", code: "NVR-C-T2", channels: 16, location: "Tòa nhà C / Phòng KT T2", ip: "192.168.3.11", usedTB: 2.1,  totalTB: 8,  pct: 26, status: "dungluongthap", lastOnline: "15 phút trước", firmware: "V3.9.7" },
  { id: "n8", name: "NVR - Tòa nhà C - Tầng 3", code: "NVR-C-T3", channels: 16, location: "Tòa nhà C / Phòng KT T3", ip: "192.168.3.12", usedTB: 5.6,  totalTB: 8,  pct: 70, status: "ghihinh",     lastOnline: "4 phút trước",  firmware: "V4.0.2" },
  { id: "n9", name: "NVR - Tòa nhà B - Tầng 3", code: "NVR-B-T3", channels: 32, location: "Tòa nhà B / Phòng KT T3", ip: "192.168.2.12", usedTB: 13.2, totalTB: 16, pct: 83, status: "ghihinh",     lastOnline: "6 phút trước",  firmware: "V4.0.2" },
];
