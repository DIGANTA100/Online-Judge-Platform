import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    handle?: string;
    email?: string;
  };

  if (!body.handle || !body.email) {
    return NextResponse.json(
      { error: "handle and email are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    user: {
      id: "usr_demo_001",
      handle: body.handle,
      email: body.email,
      role: "USER",
      emailVerified: false
    },
    nextStep: "VERIFY_EMAIL"
  });
}
