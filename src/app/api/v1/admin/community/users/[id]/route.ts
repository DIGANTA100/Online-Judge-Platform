// src/app/api/v1/admin/community/users/[id]/route.ts
// PATCH /api/v1/admin/community/users/[id]
//   body: { action: "warn" | "suspend" | "ban" | "activate" }

import { NextResponse } from "next/server";
import { communityUsers, type UserStatus } from "@/lib/admin-community-data";

const actionToStatus: Record<string, UserStatus> = {
  warn: "warned",
  suspend: "suspended",
  ban: "banned",
  activate: "active"
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { action?: string };

  if (!body.action || !(body.action in actionToStatus)) {
    return NextResponse.json({ error: "valid action required: warn | suspend | ban | activate" }, { status: 400 });
  }

  const user = communityUsers.find((u) => u.id === id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // DATABASE TODO:
  // const newStatus = actionToStatus[body.action];
  // await db.user.update({ where: { id }, data: { status: newStatus } });
  // await db.auditLog.create({ data: { adminId: currentAdmin.id, action: body.action, targetUserId: id } });
  // if (body.action === "ban") {
  //   await db.session.deleteMany({ where: { userId: id } }); // revoke all sessions
  // }

  user.status = actionToStatus[body.action];

  return NextResponse.json({ success: true, user });
}