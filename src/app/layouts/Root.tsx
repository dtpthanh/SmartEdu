import { type MouseEvent as ReactMouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const SIDEBAR_MIN_WIDTH = 72;
const SIDEBAR_MAX_WIDTH = 320;
const SIDEBAR_DEFAULT_WIDTH = 232;

export default function Root() {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dragStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  const sidebarCollapsed = sidebarWidth <= SIDEBAR_MIN_WIDTH + 4;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("smartedu-theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      return;
    }

    if (savedTheme === "light") {
      setIsDarkMode(false);
      return;
    }

    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem("smartedu-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStateRef.current) {
        return;
      }

      const delta = event.clientX - dragStateRef.current.startX;
      const nextWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, dragStateRef.current.startWidth + delta),
      );

      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      dragStateRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleToggleCollapse = () => {
    setSidebarWidth(current =>
      current <= SIDEBAR_MIN_WIDTH + 4 ? SIDEBAR_DEFAULT_WIDTH : SIDEBAR_MIN_WIDTH,
    );
  };

  const handleResizeStart = (event: ReactMouseEvent<HTMLButtonElement>) => {
    dragStateRef.current = { startX: event.clientX, startWidth: sidebarWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div
      className="relative flex h-screen overflow-hidden bg-slate-50 text-foreground dark:bg-[#040b17]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_48%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_38%)]" />
        <div className="absolute bottom-[-120px] left-[18%] h-[260px] w-[260px] rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute right-[8%] top-[12%] h-[220px] w-[220px] rounded-full bg-cyan-400/8 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full w-full overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} width={sidebarWidth} />
        <button
          type="button"
          aria-label="Thay đổi độ rộng menu"
          onMouseDown={handleResizeStart}
          className="group relative hidden w-2 flex-shrink-0 bg-transparent lg:block"
        >
          <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-blue-300/70 dark:group-hover:bg-blue-400/40" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            isDarkMode={isDarkMode}
            onToggleCollapse={handleToggleCollapse}
            onToggleTheme={() => setIsDarkMode(current => !current)}
          />
          <div className="flex flex-1 overflow-hidden">
            <main className="min-w-0 flex-1 overflow-y-auto dark:bg-transparent">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
