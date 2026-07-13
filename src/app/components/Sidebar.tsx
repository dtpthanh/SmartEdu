import { useNavigate, useLocation } from "react-router";
import { NAV_ITEMS, NAV_PATHS } from "../data/nav";
import smartEduLogo from "../../assets/logo.png";

export function Sidebar({ collapsed, width }: {
  collapsed: boolean;
  width: number;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = Object.entries(NAV_PATHS).find(([, path]) => location.pathname.startsWith(path))?.[0] ?? "";

  return (
    <div
      className="flex h-full flex-shrink-0 flex-col border-r border-gray-200/90 bg-white/92 backdrop-blur-xl transition-[width] duration-150 dark:border-slate-700/70 dark:bg-card/95"
      style={{ width }}
    >
      {/* Logo */}
      <div className="border-b border-gray-900/15 px-3 py-4 dark:border-slate-700/60">
        <div className="overflow-hidden">
          {!collapsed && (
            <img
              src={smartEduLogo}
              alt="SmartEdu"
              className="h-10 w-auto object-contain object-left"
            />
          )}
          {collapsed && (
            <img
              src={smartEduLogo}
              alt="SmartEdu"
              className="mx-auto h-8 w-8 object-cover object-left"
            />
          )}
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => navigate(NAV_PATHS[id] ?? "/")}
            title={collapsed ? label : undefined}
            className={`mx-2 w-[calc(100%-16px)] flex items-center gap-3 rounded-xl px-3 py-2.5 text-[11px] font-medium transition-colors text-left ${
              activeId === id
                ? "border border-blue-200 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-500/30 dark:bg-blue-950/40 dark:text-blue-100 dark:shadow-none"
                : "text-gray-500 dark:text-white/78 hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-slate-800/80 dark:hover:text-white"
            }`}
          >
            <Icon size={15} className="flex-shrink-0" />
            {!collapsed && <span className="uppercase tracking-wide leading-tight">{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
