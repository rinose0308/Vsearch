export interface YouTubeChannel {
  channelId: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  customUrl?: string;
}

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function fetchChannels(
  channelIds: string[],
  apiKey: string
): Promise<YouTubeChannel[]> {
  // YouTube API allows max 50 IDs per request
  const chunks: string[][] = [];
  for (let i = 0; i < channelIds.length; i += 50) {
    chunks.push(channelIds.slice(i, i + 50));
  }

  const results: YouTubeChannel[] = [];

  for (const chunk of chunks) {
    const ids = chunk.join(",");
    const url = `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${ids}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `YouTube API error: ${error?.error?.message ?? res.statusText}`
      );
    }

    const data = await res.json();

    for (const item of data.items ?? []) {
      results.push({
        channelId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails?.medium?.url ??
          item.snippet.thumbnails?.default?.url ??
          "",
        subscriberCount: item.statistics.subscriberCount ?? "0",
        viewCount: item.statistics.viewCount ?? "0",
        videoCount: item.statistics.videoCount ?? "0",
        customUrl: item.snippet.customUrl,
      });
    }
  }

  return results;
}

export function formatSubscriberCount(count: string): string {
  const n = parseInt(count, 10);
  if (isNaN(n)) return "非公開";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.floor(n / 10_000)}万`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
