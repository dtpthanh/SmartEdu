export function statusDotClass(s: string) {
  if (s === "online" || s === "live") return "bg-green-500";
  if (s === "offline") return "bg-gray-400";
  if (s === "baotri") return "bg-yellow-500";
  if (s === "loi") return "bg-red-500";
  return "bg-gray-400";
}

export function statusLabel(s: string) {
  if (s === "online") return "Online";
  if (s === "offline") return "Offline";
  if (s === "baotri") return "Báo trì";
  if (s === "loi") return "Lỗi";
  return s;
}

export function roomStatusLabel(s: string) {
  if (s === "danghoc") return "Đang học";
  if (s === "sansang") return "Sẵn sàng";
  if (s === "khonghoatdong") return "Không hoạt động";
  return s;
}

export function roomStatusBadge(s: string) {
  if (s === "danghoc") return "bg-green-100 text-green-700";
  if (s === "sansang") return "bg-amber-100 text-amber-700";
  if (s === "khonghoatdong") return "bg-gray-100 text-gray-600";
  return "bg-gray-100 text-gray-600";
}

export function roomStatusDot(s: string) {
  if (s === "danghoc") return "bg-green-500";
  if (s === "sansang") return "bg-amber-500";
  if (s === "khonghoatdong") return "bg-gray-400";
  return "bg-gray-400";
}
