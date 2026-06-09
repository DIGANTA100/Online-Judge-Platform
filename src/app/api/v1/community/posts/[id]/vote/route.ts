import { NextResponse } from "next/server";
import { findPost, updateVotes } from "@/app/api/v1/community/data";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { delta?: number };
  const delta = typeof body.delta === "number" ? body.delta : 1;
  const post = findPost(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // DATABASE TODO:
  // Persist vote change to PostgreSQL here.
  // await db.post.update({ where: { id }, data: { votes: { increment: delta } } });
  updateVotes(id, delta);

  return NextResponse.json({ success: true, votes: post.votes });
}
