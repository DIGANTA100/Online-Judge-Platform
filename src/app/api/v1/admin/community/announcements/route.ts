// src/app/api/v1/admin/community/announcements/route.ts
// GET  /api/v1/admin/community/announcements        → list announcements
// POST /api/v1/admin/community/announcements        → create announcement
//
// src/app/api/v1/admin/community/announcements/[id]/route.ts
// PATCH  /api/v1/admin/community/announcements/[id] → update / publish / schedule
// DELETE /api/v1/admin/community/announcements/[id] → delete

import { NextResponse } from "next/server";
import { announcements, type Announcement, type AnnouncementStatus } from "@/lib/admin-community-data";

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as AnnouncementStatus | null;

  // DATABASE TODO:
  // const items = await db.announcement.findMany({
  //   where: status ? { status } : {},
  //   orderBy: { createdAt: "desc" },
  // });

  const results = status
    ? announcements.filter((a) => a.status === status)
    : announcements;

  return NextResponse.json({ announcements: results, total: results.length });
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<Announcement>;

  if (!body.title || !body.body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 });
  }

  const item: Announcement = {
    id: `A-${Date.now()}`,
    title: body.title,
    body: body.body,
    author: body.author ?? "admin",
    status: body.status ?? "draft",
    publishAt: body.publishAt ?? "—",
    createdAt: "Just now",
    views: 0
  };

  // DATABASE TODO:
  // await db.announcement.create({ data: item });
  announcements.unshift(item);

  return NextResponse.json(item, { status: 201 });
}