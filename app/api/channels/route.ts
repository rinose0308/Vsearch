import { NextResponse } from "next/server";
import { fetchAllVtubers, langToTag } from "@/lib/holodex";

export async function GET() {
  const apiKey = process.env.HOLODEX_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "HOLODEX_API_KEY が設定されていません" },
      { status: 500 }
    );
  }

  const channels = await fetchAllVtubers(apiKey);

  const result = channels.map((ch) => {
    const tags: string[] = [langToTag(ch.lang)];
    if (ch.top_topics) {
      tags.push(...ch.top_topics.slice(0, 5));
    }
    return {
      channelId: ch.id,
      name: ch.name,
      title: ch.name,
      group: ch.org || "個人勢",
      tags,
      thumbnail: ch.photo,
      subscriberCount: String(ch.subscriber_count),
    };
  });

  return NextResponse.json(result);
}
