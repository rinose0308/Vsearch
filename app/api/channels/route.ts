import { NextResponse } from "next/server";
import { VTUBERS } from "@/data/vtubers";
import { fetchChannels } from "@/lib/youtube";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY が設定されていません" },
      { status: 500 }
    );
  }

  const channelIds = VTUBERS.map((v) => v.channelId);

  const youtubeData = await fetchChannels(channelIds, apiKey);

  // Merge YouTube data with our local metadata
  const merged = VTUBERS.map((v) => {
    const yt = youtubeData.find((y) => y.channelId === v.channelId);
    return {
      ...v,
      title: yt?.title ?? v.name,
      thumbnail: yt?.thumbnail ?? "",
      subscriberCount: yt?.subscriberCount ?? "0",
      viewCount: yt?.viewCount ?? "0",
      videoCount: yt?.videoCount ?? "0",
      customUrl: yt?.customUrl,
    };
  });

  return NextResponse.json(merged);
}
