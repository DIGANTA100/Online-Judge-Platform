// src/app/api/v1/admin/community/reports/route.ts
// GET  /api/v1/admin/community/reports           → list pending reports
// POST /api/v1/admin/community/reports           → create a new report (from UI)
//
// src/app/api/v1/admin/community/reports/[id]/route.ts  (inline for brevity)
// PATCH /api/v1/admin/community/reports/[id]     → resolve / dismiss / take action

import { NextResponse } from "next/server";
import { moderationQueue, type ModerationReport } from "@/lib/admin-community-data";

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "pending";
  const severity = searchParams.get("severity");

  // DATABASE TODO:
  // const reports = await db.report.findMany({
  //   where: {
  //     ...(status !== "all" && { status }),
  //     ...(severity && { severity }),
  //   },
  //   orderBy: { createdAt: "desc" },
  //   include: { reportedBy: true, targetUser: true, thread: true },
  // });

  let results = moderationQueue.filter((r) =>
    status === "all" ? true : r.status === status
  );
  if (severity) results = results.filter((r) => r.severity === severity);

  return NextResponse.json({ reports: results, total: results.length });
}

// ── POST (admin creates a manual report) ─────────────────────────────────────
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<ModerationReport>;

  if (!body.content || !body.reportType || !body.targetUser) {
    return NextResponse.json(
      { error: "reportType, content, and targetUser are required" },
      { status: 400 }
    );
  }

  const newReport: ModerationReport = {
    id: `R-${Date.now()}`,
    reportType: body.reportType,
    content: body.content,
    reportedBy: body.reportedBy ?? "admin",
    targetUser: body.targetUser,
    time: "Just now",
    severity: body.severity ?? "medium",
    status: "pending"
  };

  // DATABASE TODO:
  // await db.report.create({ data: newReport });
  moderationQueue.unshift(newReport);

  return NextResponse.json(newReport, { status: 201 });
}