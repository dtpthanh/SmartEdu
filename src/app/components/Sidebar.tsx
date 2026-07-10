import { useNavigate, useLocation } from "react-router";
import { NAV_ITEMS, NAV_PATHS } from "../data/nav";
import smartEduLogo from "../../assets/smartedu-logo.jpg";

export function Sidebar({ collapsed, onToggleCollapse }: {
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = Object.entries(NAV_PATHS).find(([, path]) => location.pathname.startsWith(path))?.[0] ?? "";

  return (
    <div className={`${collapsed ? "w-[56px]" : "w-[200px]"} bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-full transition-all duration-200`}>
      {/* Logo */}
      <div className="px-3 py-4 border-b border-gray-900/15">
        <div className="overflow-hidden">
          {!collapsed && (
            <img
              src={smartEduLogo}
              alt="SmartEdu 360"
              className="h-10 w-full object-contain object-left"
            />
          )}
          {collapsed && (
            <img
              src={smartEduLogo}
              alt="SmartEdu 360"
              className="h-8 w-8 rounded-lg object-cover object-left"
            />
          )}
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => navigate(NAV_PATHS[id] ?? "/")}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-medium transition-colors text-left ${
              activeId === id
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
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
