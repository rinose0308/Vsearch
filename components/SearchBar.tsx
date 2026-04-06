"use client";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="VTuber名 / グループ名で検索..."
        className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}
