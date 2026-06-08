import { NextResponse } from "next/server";
import { contests, standings } from "@/lib/platform-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const contest = contests.find((item) => item.slug === slug);

  if (!contest) {
    return NextResponse.json({ error: "Contest not found" }, { status: 404 });
  }

  return NextResponse.json({
    contest,
    frozen: contest.freeze !== "None",
    standings
  });
}
