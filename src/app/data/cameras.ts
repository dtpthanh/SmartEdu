export const CAMERAS = [
  { id: "01", name: "Camera Giáo viên", status: "live", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=70", roomName: "A101 - Lớp 10A1", zone: "Khối A - Tầng 1", type: "Giáo viên", updatedAt: "1 phút trước", resolution: "Full HD" },
  { id: "02", name: "Camera Toàn lớp", status: "live", img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=400&q=70", roomName: "A101 - Lớp 10A1", zone: "Khối A - Tầng 1", type: "Toàn cảnh", updatedAt: "Vừa xong", resolution: "2K" },
  { id: "03", name: "Camera Học sinh PTZ", status: "live", img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=400&q=70", roomName: "A102 - Lớp 10A2", zone: "Khối A - Tầng 1", type: "PTZ", updatedAt: "2 phút trước", resolution: "Full HD" },
  { id: "04", name: "Camera Bảng", status: "live", img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=400&q=70", roomName: "A203 - Lớp 10A3", zone: "Khối A - Tầng 2", type: "Bảng", updatedAt: "1 phút trước", resolution: "Full HD" },
  { id: "05", name: "Camera Cửa chính", status: "live", img: "https://images.unsplash.com/photo-1599036495538-ee049546a069?w=400&q=70", roomName: "Khu sảnh chính", zone: "Tầng trệt", type: "An ninh", updatedAt: "Vừa xong", resolution: "2K" },
  { id: "06", name: "Camera Hành lang", status: "live", img: "https://images.unsplash.com/photo-1762888568397-17827294d721?w=400&q=70", roomName: "Hành lang B1", zone: "Khối B - Tầng 1", type: "Hành lang", updatedAt: "3 phút trước", resolution: "HD" },
  { id: "07", name: "Camera Thư viện", status: "offline", img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=400&q=70", roomName: "Thư viện", zone: "Khối C - Tầng 2", type: "Giám sát", updatedAt: "15 phút trước", resolution: "Full HD" },
  { id: "08", name: "Camera Sân trường", status: "live", img: "https://images.unsplash.com/photo-1566833017497-830328f5bc5d?w=400&q=70", roomName: "Sân trường", zone: "Ngoài trời", type: "Ngoài trời", updatedAt: "Vừa xong", resolution: "2K" },
  { id: "09", name: "Camera Nhà xe", status: "baotri", img: "https://images.unsplash.com/photo-1745271968703-3c8411cae2f5?w=400&q=70", roomName: "Nhà xe học sinh", zone: "Cổng sau", type: "An ninh", updatedAt: "40 phút trước", resolution: "HD" },
  { id: "10", name: "Camera Cổng phụ", status: "live", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=70", roomName: "Cổng phụ", zone: "Khối B - lối ra vào", type: "An ninh", updatedAt: "5 phút trước", resolution: "Full HD" },
  { id: "11", name: "Camera Phòng máy tính", status: "loi", img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=70", roomName: "B101 - Lớp 11B1", zone: "Khối B - Tầng 1", type: "Phòng máy", updatedAt: "12 phút trước", resolution: "Full HD" },
  { id: "12", name: "Camera Nhà ăn", status: "live", img: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=400&q=70", roomName: "Nhà ăn", zone: "Khối D", type: "Dịch vụ", updatedAt: "4 phút trước", resolution: "HD" },
];

export const CLASSROOMS = [
  { id: "A101", name: "A101 - Lớp 10A1", status: "danghoc", cameras: 4, students: "38/40", attention: 85, img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70", feeds: ["online", "online", "online", "online"] },
  { id: "A102", name: "A102 - Lớp 10A2", status: "danghoc", cameras: 4, students: "40/40", attention: 78, img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=70", feeds: ["online", "online", "online", "online"] },
  { id: "B101", name: "B101 - Lớp 11B1", status: "danghoc", cameras: 4, students: "42/45", attention: 82, img: "https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=600&q=70", feeds: ["online", "online", "online", "online"] },
  { id: "C201", name: "C201 - Lớp 12C1", status: "sansang", cameras: 4, students: "38/40", attention: 88, img: "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=600&q=70", feeds: ["online", "online", "online", "online"] },
  { id: "B202", name: "B202 - Lớp 11B2", status: "khonghoatdong", cameras: 4, students: "0/40", attention: 0, img: "https://images.unsplash.com/photo-1510531704581-5b2870972060?w=600&q=70", feeds: ["offline", "offline", "online", "offline"] },
  { id: "A203", name: "A203 - Lớp 10A3", status: "sansang", cameras: 4, students: "36/40", attention: 72, img: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=600&q=70", feeds: ["online", "online", "online", "online"] },
];

export const ROOM_LIST = [
  { id: "A101", name: "A101 - Lớp 10A1", status: "danghoc" },
  { id: "A102", name: "A102 - Lớp 10A2", status: "danghoc" },
  { id: "B101", name: "B101 - Lớp 11B1", status: "danghoc" },
  { id: "C201", name: "C201 - Lớp 12C1", status: "sansang" },
  { id: "B202", name: "B202 - Lớp 11B2", status: "khonghoatdong" },
  { id: "A203", name: "A203 - Lớp 10A3", status: "sansang" },
];
