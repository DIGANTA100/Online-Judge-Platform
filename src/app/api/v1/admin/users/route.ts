import { NextResponse } from "next/server";

const demoUsers = [
  { id: "usr_001", handle: "afd123", email: "afd123@gmail.com", role: "USER", status: "ACTIVE" },
  { id: "usr_002", handle: "bitwise_mira", email: "mira@example.com", role: "AUTHOR", status: "ACTIVE" },
  { id: "usr_003", handle: "spam_probe", email: "probe@example.com", role: "USER", status: "FLAGGED" }
];

export async function GET() {
  // DATABASE TODO:
  // Read users from PostgreSQL with pagination, search, role filters, and status filters.
  // Example later:
  // const users = await userRepository.findAdminUserList({ page, query, role, status });
  return NextResponse.json({ items: demoUsers, total: demoUsers.length });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    userId?: string;
    role?: string;
    status?: string;
  };

  if (!body.userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // DATABASE TODO:
  // Update user role/status in PostgreSQL and write an audit log.
  // Example later:
  // await userRepository.updateAdminFields(body.userId, { role: body.role, status: body.status });
  // await auditLogRepository.create({ action: "ADMIN_USER_UPDATED", targetId: body.userId, adminId });

  return NextResponse.json({
    success: true,
    userId: body.userId,
    role: body.role,
    status: body.status
  });
}
