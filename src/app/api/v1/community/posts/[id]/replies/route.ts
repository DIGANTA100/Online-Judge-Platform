import { NextResponse } from "next/server";
import { addReply, findPost } from "@/app/api/v1/community/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = findPost(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ replies: post.replies });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = findPost(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as { content?: string };

  if (!body.content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  // DATABASE TODO:
  // Insert reply into PostgreSQL here.
  // await db.reply.create({ data: { postId: id, author: userId, content: body.content } });
  addReply(id);

  return NextResponse.json({ success: true, replies: post.replies });
}
