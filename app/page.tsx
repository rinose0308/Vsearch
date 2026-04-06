"use client";

import { useEffect, useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import VTuberCard, { VTuberCardData } from "@/components/VTuberCard";

type SortKey = "name" | "subscribers";

export default function Home() {
  const [allVtubers, setAllVtubers] = useState<VTuberCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("subscribers");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [subRange, setSubRange] = useState<string>("all");

  useEffect(() => {
    fetch("/api/channels")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setAllVtubers(data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = allVtubers;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.title.toLowerCase().includes(q) ||
          v.group.toLowerCase().includes(q)
      );
    }

    if (selectedGroups.length > 0) {
      list = list.filter((v) => selectedGroups.includes(v.group));
    }

    if (selectedTags.length > 0) {
      list = list.filter((v) =>
        selectedTags.every((t) => v.tags.includes(t))
      );
    }

    // 登録者数フィルター
    if (subRange !== "all") {
      list = list.filter((v) => {
        const n = parseInt(v.subscriberCount);
        if (subRange === "under1w") return n < 10_000;
        if (subRange === "1w-10w") return n >= 10_000 && n < 100_000;
        if (subRange === "10w-100w") return n >= 100_000 && n < 1_000_000;
        if (subRange === "over100w") return n >= 1_000_000;
        return true;
      });
    }

    return [...list].sort((a, b) => {
      if (sortKey === "subscribers") {
        return parseInt(b.subscriberCount) - parseInt(a.subscriberCount);
      }
      return a.title.localeCompare(b.title, "ja");
    });
  }, [allVtubers, query, selectedGroups, selectedTags, sortKey, subRange]);

  // グループ・タグをデータから動的生成
  const allGroups = useMemo(() => {
    const set = new Set(allVtubers.map((v) => v.group));
    return Array.from(set).sort();
  }, [allVtubers]);

  const allTags = useMemo(() => {
    const set = new Set(allVtubers.flatMap((v) => v.tags));
    return Array.from(set).sort();
  }, [allVtubers]);

  const toggleGroup = (g: string) =>
    setSelectedGroups((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const toggleTag = (t: string) =>
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const resetFilters = () => {
    setSelectedGroups([]);
    setSelectedTags([]);
    setQuery("");
    setSubRange("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
              🎭 VTuber Search
            </h1>
            <p className="text-xs text-gray-400">
              YouTube チャンネル情報を検索・フィルター
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Search + Sort */}
        <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="flex-1 sm:flex-none rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-purple-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="subscribers">登録者数順</option>
              <option value="name">名前順</option>
            </select>
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2" />
              </svg>
              フィルター
              {(selectedGroups.length + selectedTags.length + (subRange !== "all" ? 1 : 0)) > 0 && (
                <span className="ml-1 rounded-full bg-purple-500 px-1.5 text-[10px] font-bold text-white">
                  {selectedGroups.length + selectedTags.length + (subRange !== "all" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar / Mobile drawer */}
          <FilterPanel
            allGroups={allGroups}
            allTags={allTags}
            selectedGroups={selectedGroups}
            selectedTags={selectedTags}
            subRange={subRange}
            onGroupToggle={toggleGroup}
            onTagToggle={toggleTag}
            onSubRangeChange={setSubRange}
            onReset={resetFilters}
            mobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Results */}
          <div className="flex-1">
            {loading && (
              <div className="flex items-center justify-center py-24 text-gray-400">
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                読み込み中...
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                <strong>エラー:</strong> {error}
                <p className="mt-1 text-xs opacity-75">
                  .env.local に HOLODEX_API_KEY が設定されているか確認してください。
                </p>
              </div>
            )}

            {!loading && !error && (
              <>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {filtered.length} 件表示
                </p>
                {filtered.length === 0 ? (
                  <div className="py-16 text-center text-gray-400">
                    <p className="text-4xl">🔍</p>
                    <p className="mt-2 text-sm">該当するVTuberが見つかりません</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.map((v) => (
                      <VTuberCard key={v.channelId} data={v} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
