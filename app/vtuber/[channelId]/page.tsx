"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import VTuberCard, { VTuberCardData } from "@/components/VTuberCard";
import { formatSubscriberCount } from "@/lib/holodex";

interface DetailData {
  channelId: string;
  name: string;
  group: string;
  thumbnail: string;
  subscriberCount: string;
  description: string;
  topics: string[];
  twitter?: string;
  lang: string;
  similar: VTuberCardData[];
}

export default function VTuberDetailPage() {
  const { channelId } = useParams<{ channelId: string }>();
  const router = useRouter();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/channel/${channelId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [channelId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <svg className="h-8 w-8 animate-spin text-purple-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">エラー: {error}</p>
      </div>
    );
  }

  const channelUrl = `https://www.youtube.com/channel/${data.channelId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </button>
          <h1 className="text-lg font-bold text-purple-600 dark:text-purple-400">🎭 VTuber Search</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {/* Profile card */}
        <div className="flex gap-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            {data.thumbnail && (
              <Image src={data.thumbnail} alt={data.name} fill className="object-cover" sizes="96px" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                {data.group}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              登録者数: <span className="font-semibold text-gray-700 dark:text-gray-200">{formatSubscriberCount(data.subscriberCount)}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
                </svg>
                YouTubeで見る
              </a>
              {data.twitter && (
                <a
                  href={`https://twitter.com/${data.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-600"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Topics */}
        {data.topics.length > 0 && (
          <section>
            <h3 className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-300">よく配信するジャンル・ゲーム</h3>
            <div className="flex flex-wrap gap-2">
              {data.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        {data.description && (
          <section>
            <h3 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">チャンネル説明</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line line-clamp-6">
              {data.description}
            </p>
          </section>
        )}

        {/* Similar VTubers */}
        {data.similar.length > 0 && (
          <section>
            <h3 className="mb-4 text-sm font-bold text-gray-700 dark:text-gray-300">似ているVTuber</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {data.similar.map((v) => (
                <VTuberCard key={v.channelId} data={v} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
