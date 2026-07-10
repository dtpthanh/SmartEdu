import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export function Pagination({ total, label }: { total: number; label: string }) {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-900/15 text-[12px] text-gray-500">
      <span>Hiển thị 1 - 10 trong tổng số {total} {label}</span>
      <div className="flex items-center gap-1">
        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p-1))}>
          <ChevronLeft size={13} />
        </button>
        {pages.map(p => (
          <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded border text-[12px] font-medium ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>{p}</button>
        ))}
        <span className="px-1">...</span>
        <button onClick={() => setPage(13)} className={`w-7 h-7 rounded border text-[12px] font-medium ${page === 13 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"}`}>13</button>
        <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50" onClick={() => setPage(p => Math.min(13, p+1))}>
          <ChevronRight size={13} />
        </button>
        <div className="flex items-center gap-1 ml-2 border border-gray-200 rounded px-2 py-1">
          <span>10 / trang</span>
          <ChevronDown size={11} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
