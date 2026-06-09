import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    threadId?: string;
    body?: string;
  };

  if (!body.threadId || !body.body) {
    return NextResponse.json(
      { error: "threadId and body are required" },
      { status: 400 }
    );
  }

  // DATABASE TODO:
  // Insert this comment into PostgreSQL using the authenticated user's id.
  // Example later:
  // await communityCommentRepository.create({
  //   threadId: body.threadId,
  //   body: body.body,
  //   authorId: session.user.id
  // });

  return NextResponse.json(
    {
      id: "comment_demo_created",
      threadId: body.threadId,
      body: body.body,
      author: "afd123",
      createdAt: new Date().toISOString()
    },
    { status: 201 }
  );
}
