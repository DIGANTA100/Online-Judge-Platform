import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "email and password are required" },
      { status: 400 }
    );
  }

  if (body.email !== "afd123@gmail.com" || body.password !== "12345678") {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    accessToken: "demo.jwt.access.token",
    refreshToken: "demo-refresh-token-rotated",
    expiresInSeconds: 900,
    user: {
      id: "usr_demo_001",
      handle: "afd123",
      email: body.email,
      role: "USER"
    }
  });
}
