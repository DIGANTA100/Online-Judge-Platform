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

  // DATABASE TODO:
  // Replace this demo credential check with:
  // 1. Find admin user by email in PostgreSQL.
  // 2. Verify password hash with Argon2id/BCrypt.
  // 3. Ensure role === ADMIN and account is active.
  // 4. Issue signed JWT + rotating refresh token.
  if (body.email !== "admin123@gmail.com" || body.password !== "admin123") {
    return NextResponse.json(
      { error: "Invalid admin email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    accessToken: "demo.admin.jwt.access.token",
    refreshToken: "demo-admin-refresh-token",
    expiresInSeconds: 900,
    user: {
      id: "adm_demo_001",
      handle: "admin123",
      email: body.email,
      role: "ADMIN"
    }
  });
}
