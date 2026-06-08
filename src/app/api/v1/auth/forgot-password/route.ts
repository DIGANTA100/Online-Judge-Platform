import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
  };

  if (!body.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  return NextResponse.json({
    accepted: true,
    message:
      "If an account exists for this email, a secure password reset link will be sent."
  });
}
