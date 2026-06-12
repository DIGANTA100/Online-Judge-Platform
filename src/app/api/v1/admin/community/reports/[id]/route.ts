// src/app/api/v1/admin/community/reports/[id]/route.ts
// PATCH /api/v1/admin/community/reports/[id]
//   body: { action: "approve" | "remove" | "warn" | "suspend" | "dismiss" }

import { NextResponse } from "next/server";
import { moderationQueue } from "@/lib/admin-community-data";

type Action = "approve" | "remove" | "warn" | "suspend" | "dismiss";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { action?: Action };

  if (!body.action) {
    return NextResponse.json({ error: "action is required" }, { status: 400 });
  }

  const report = moderationQueue.find((r) => r.id === id);
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  // DATABASE TODO:
  // switch (body.action) {
  //   case "remove":
  //     await db.thread.update({ where: { id: report.threadId }, data: { status: "deleted" } });
  //     break;
  //   case "warn":
  //     await db.user.update({ where: { handle: report.targetUser }, data: { status: "warned" } });
  //     await db.notification.create({ data: { userId: report.targetUser, type: "warning", message: "..." } });
  //     break;
  //   case "suspend":
  //     await db.user.update({ where: { handle: report.targetUser }, data: { status: "suspended", suspendedUntil: addDays(new Date(), 7) } });
  //     break;
  // }
  // await db.report.update({ where: { id }, data: { status: body.action === "dismiss" ? "dismissed" : "resolved", resolvedBy: adminUserId, resolvedAt: new Date() } });

  report.status = body.action === "dismiss" ? "dismissed" : "resolved";

  return NextResponse.json({ success: true, report });
}