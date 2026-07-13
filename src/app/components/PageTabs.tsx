export type PageTabOption<T extends string> = {
  id: T;
  label: string;
};

export function PageTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = "Điều hướng trang",
}: {
  tabs: PageTabOption<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="app-tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-active={isActive}
            className="app-tab"
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
