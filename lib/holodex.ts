export interface HolodexChannel {
  id: string;
  name: string;
  org: string;
  suborg?: string;
  photo: string;
  subscriber_count: number;
  video_count: number;
  lang: string;
  inactive: boolean;
  description?: string;
}

export interface HolodexChannelDetail extends HolodexChannel {
  top_topics?: string[];
  twitter?: string;
}

const HOLODEX_API_BASE = "https://holodex.net/api/v2";
const FETCH_LIMIT = 50;
const TOTAL_FETCH = 500; // 最大取得数

export async function fetchAllVtubers(apiKey: string): Promise<HolodexChannel[]> {
  const results: HolodexChannel[] = [];

  for (let offset = 0; offset < TOTAL_FETCH; offset += FETCH_LIMIT) {
    const url = new URL(`${HOLODEX_API_BASE}/channels`);
    url.searchParams.set("type", "vtuber");
    url.searchParams.set("limit", String(FETCH_LIMIT));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("sort", "subscriber_count");
    url.searchParams.set("order", "desc");

    const res = await fetch(url.toString(), {
      headers: { "X-APIKEY": apiKey },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Holodex API error: ${res.status} ${err}`);
    }

    const data: HolodexChannel[] = await res.json();
    results.push(...data.filter((ch) => !ch.inactive));

    // APIが返した件数がlimitより少なければ終端
    if (data.length < FETCH_LIMIT) break;
  }

  return results;
}

export async function fetchChannel(channelId: string, apiKey: string): Promise<HolodexChannelDetail> {
  const res = await fetch(`${HOLODEX_API_BASE}/channels/${channelId}`, {
    headers: { "X-APIKEY": apiKey },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Holodex API error: ${res.status}`);
  }

  return res.json();
}

export function formatSubscriberCount(count: number | string): string {
  const n = typeof count === "string" ? parseInt(count, 10) : count;
  if (isNaN(n)) return "非公開";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.floor(n / 10_000)}万`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function langToTag(lang: string): string {
  const map: Record<string, string> = {
    ja: "日本語",
    en: "英語",
    id: "インドネシア語",
    ko: "韓国語",
    zh: "中国語",
    es: "スペイン語",
  };
  if (!lang) return "その他";
  return map[lang] ?? lang.toUpperCase();
}
