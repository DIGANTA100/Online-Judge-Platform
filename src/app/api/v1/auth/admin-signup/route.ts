import { NextResponse } from "next/server";

const adminSecretCode = "153723";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    handle?: string;
    email?: string;
    password?: string;
    secretCode?: string;
  };

  if (!body.handle || !body.email || !body.password) {
    return NextResponse.json(
      { error: "handle, email, and password are required" },
      { status: 400 }
    );
  }

  if (body.secretCode !== adminSecretCode) {
    return NextResponse.json(
      { error: "Invalid admin secret code" },
      { status: 403 }
    );
  }

  // DATABASE TODO:
  // Replace this demo response with:
  // 1. Hash password.
  // 2. Create admin user with role ADMIN in PostgreSQL.
  // 3. Store an audit log event: ADMIN_CREATED.
  // 4. Send verification email if required.

  return NextResponse.json(
    {
      user: {
        id: "adm_demo_created",
        handle: body.handle,
        email: body.email,
        role: "ADMIN"
      },
      nextStep: "ADMIN_CREATED"
    },
    { status: 201 }
  );
}
