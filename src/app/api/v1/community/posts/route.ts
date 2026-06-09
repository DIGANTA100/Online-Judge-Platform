import { NextResponse } from "next/server";
import { addPost, posts, type CommunityPost } from "@/app/api/v1/community/data";

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<CommunityPost>;

  if (!body.title || !body.excerpt) {
    return NextResponse.json({ error: "title and excerpt are required" }, { status: 400 });
  }

  const newPost: CommunityPost = {
    id: String(Date.now()),
    author: body.author ?? "Anonymous",
    title: body.title,
    excerpt: body.excerpt,
    category: body.category ?? "General",
    votes: 0,
    replies: 0
  };

  // DATABASE TODO:
  // Insert into PostgreSQL here.
  // await db.post.create({ data: newPost });
  addPost(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
