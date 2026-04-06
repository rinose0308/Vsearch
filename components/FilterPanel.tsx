"use client";

const SUB_RANGES = [
  { value: "all", label: "すべて" },
  { value: "under1w", label: "1万未満" },
  { value: "1w-10w", label: "1万〜10万" },
  { value: "10w-100w", label: "10万〜100万" },
  { value: "over100w", label: "100万以上" },
];

interface FilterPanelProps {
  allGroups: string[];
  allTags: string[];
  selectedGroups: string[];
  selectedTags: string[];
  subRange: string;
  onGroupToggle: (g: string) => void;
  onTagToggle: (t: string) => void;
  onSubRangeChange: (v: string) => void;
  onReset: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function FilterContent({
  allGroups,
  allTags,
  selectedGroups,
  selectedTags,
  subRange,
  onGroupToggle,
  onTagToggle,
  onSubRangeChange,
  onReset,
}: Omit<FilterPanelProps, "mobileOpen" | "onMobileClose">) {
  const hasFilters = selectedGroups.length > 0 || selectedTags.length > 0 || subRange !== "all";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          フィルター
        </h2>
        {hasFilters && (
          <button onClick={onReset} className="text-xs text-purple-500 hover:underline">
            リセット
          </button>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          グループ
        </h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {allGroups.map((g) => (
            <label
              key={g}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedGroups.includes(g)}
                onChange={() => onGroupToggle(g)}
                className="accent-purple-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          タグ
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => onTagToggle(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedTags.includes(t)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-purple-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 登録者数フィルター */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          登録者数
        </h3>
        <div className="space-y-1">
          {SUB_RANGES.map((r) => (
            <label
              key={r.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                name="subRange"
                value={r.value}
                checked={subRange === r.value}
                onChange={() => onSubRangeChange(r.value)}
                className="accent-purple-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FilterPanel({
  allGroups,
  allTags,
  selectedGroups,
  selectedTags,
  subRange,
  onGroupToggle,
  onTagToggle,
  onSubRangeChange,
  onReset,
  mobileOpen,
  onMobileClose,
}: FilterPanelProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 shrink-0">
        <FilterContent
          allGroups={allGroups}
          allTags={allTags}
          selectedGroups={selectedGroups}
          selectedTags={selectedTags}
          subRange={subRange}
          onGroupToggle={onGroupToggle}
          onTagToggle={onTagToggle}
          onSubRangeChange={onSubRangeChange}
          onReset={onReset}
        />
      </aside>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white dark:bg-gray-900 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold text-gray-800 dark:text-white">フィルター</span>
              <button
                onClick={onMobileClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <FilterContent
              allGroups={allGroups}
              allTags={allTags}
              selectedGroups={selectedGroups}
              selectedTags={selectedTags}
              subRange={subRange}
              onGroupToggle={onGroupToggle}
              onTagToggle={onTagToggle}
              onSubRangeChange={onSubRangeChange}
              onReset={onReset}
            />
            <button
              onClick={onMobileClose}
              className="mt-6 w-full rounded-full bg-purple-500 py-3 text-sm font-semibold text-white"
            >
              適用する
            </button>
          </div>
        </div>
      )}
    </>
  );
}
