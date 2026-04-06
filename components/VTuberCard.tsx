"use client";

import Image from "next/image";
import { formatSubscriberCount } from "@/lib/youtube";
import { VTuberGroup, VTuberTag } from "@/data/vtubers";

export interface VTuberCardData {
  channelId: string;
  name: string;
  title: string;
  group: VTuberGroup;
  tags: VTuberTag[];
  thumbnail: string;
  subscriberCount: string;
  customUrl?: string;
}

interface VTuberCardProps {
  data: VTuberCardData;
}

const GROUP_COLORS: Record<string, string> = {
  "ホロライブ": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "にじさんじ": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "ぶいすぽっ！": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "個人勢": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  "VShojo": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "NIJISANJI EN": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function VTuberCard({ data }: VTuberCardProps) {
  const channelUrl = `https://www.youtube.com/channel/${data.channelId}`;
  const groupColor =
    GROUP_COLORS[data.group] ??
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

  return (
    <a
      href={channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Thumbnail */}
      <div className="relative h-28 sm:h-36 w-full overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-700">
        {data.thumbnail ? (
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-4xl">
            🎭
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-1">
          <p className="line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white leading-snug">
            {data.title}
          </p>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${groupColor}`}
          >
            {data.group}
          </span>
        </div>

        {/* Subscriber count */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2h5m6-10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
            />
          </svg>
          <span>{formatSubscriberCount(data.subscriberCount)} 登録</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
