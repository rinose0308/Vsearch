import { NextResponse } from "next/server";
import { fetchChannel, fetchAllVtubers, langToTag } from "@/lib/holodex";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  const apiKey = process.env.HOLODEX_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "HOLODEX_API_KEY が未設定です" }, { status: 500 });
  }

  const { channelId } = await params;

  const [detail, allChannels] = await Promise.all([
    fetchChannel(channelId, apiKey),
    fetchAllVtubers(apiKey),
  ]);

  const topics = detail.top_topics ?? [];

  // 類似VTuber: 同org優先 + 共通トピック数でスコアリング
  const similar = allChannels
    .filter((ch) => ch.id !== channelId)
    .map((ch) => {
      let score = 0;
      if (ch.org && ch.org === detail.org) score += 3;
      return { ch, score };
    })
    .sort((a, b) => b.score - a.score || b.ch.subscriber_count - a.ch.subscriber_count)
    .slice(0, 12)
    .map(({ ch }) => ({
      channelId: ch.id,
      name: ch.name,
      title: ch.name,
      group: ch.org || "個人勢",
      tags: [langToTag(ch.lang)],
      thumbnail: ch.photo,
      subscriberCount: String(ch.subscriber_count),
    }));

  return NextResponse.json({
    channelId: detail.id,
    name: detail.name,
    group: detail.org || "個人勢",
    thumbnail: detail.photo,
    subscriberCount: String(detail.subscriber_count),
    description: detail.description ?? "",
    topics,
    twitter: detail.twitter,
    lang: detail.lang,
    similar,
  });
}
