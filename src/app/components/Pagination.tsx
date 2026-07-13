import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ total, label }: { total: number; label: string }) {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  const visibleEnd = Math.min(10, total);
  const buttonBase = "flex h-8 w-8 items-center justify-center rounded-md border text-[12px] font-medium transition-colors";
  const buttonIdle = "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/15 dark:hover:text-white";
  const buttonActive = "border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)] dark:border-blue-400 dark:bg-blue-500 dark:text-white dark:shadow-none";

  return (
    <div className="flex flex-col gap-3 border-t border-gray-900/10 px-4 py-3 text-[12px] text-gray-500 dark:border-gray-700 dark:text-white/80 lg:flex-row lg:items-center lg:justify-between">
      <span>Hiển thị 1 - {visibleEnd} trong tổng số {total} {label}</span>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          className={`${buttonBase} ${buttonIdle} disabled:opacity-40`}
          disabled={page === 1}
          onClick={() => setPage(current => Math.max(1, current - 1))}
        >
          <ChevronLeft size={13} />
        </button>
        {pages.map(item => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`${buttonBase} ${page === item ? buttonActive : buttonIdle}`}
          >
            {item}
          </button>
        ))}
        <span className="px-1 text-gray-400 dark:text-white/70">...</span>
        <button
          onClick={() => setPage(13)}
          className={`${buttonBase} ${page === 13 ? buttonActive : buttonIdle}`}
        >
          13
        </button>
        <button
          className={`${buttonBase} ${buttonIdle}`}
          onClick={() => setPage(current => Math.min(13, current + 1))}
        >
          <ChevronRight size={13} />
        </button>
        <div className="ml-2 flex items-center gap-1 rounded-xl border border-gray-200 bg-white/80 px-2.5 py-1.5 text-gray-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white">
          <span>10 / trang</span>
          <ChevronDown size={11} className="text-gray-400 dark:text-white/70" />
        </div>
      </div>
    </div>
  );
}
