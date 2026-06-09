import { NextResponse } from "next/server";
import { communityThreads } from "@/lib/community-data";

export async function GET() {
  return NextResponse.json({
    items: communityThreads,
    total: communityThreads.length
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    body?: string;
    topic?: string;
  };

  if (!body.title || !body.body) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 }
    );
  }

  // DATABASE TODO:
  // Insert the new thread into PostgreSQL here.
  // Example later:
  // const thread = await communityThreadRepository.create({
  //   title: body.title,
  //   body: body.body,
  //   topic: body.topic,
  //   authorId: session.user.id
  // });

  return NextResponse.json(
    {
      id: "thread_demo_created",
      title: body.title,
      topic: body.topic ?? "Help",
      author: "afd123",
      replies: 0,
      views: 0,
      lastActive: "now"
    },
    { status: 201 }
  );
}
