// src/app/api/v1/admin/community/announcements/[id]/route.ts

import { NextResponse } from "next/server";
import { announcements, type Announcement } from "@/lib/admin-community-data";

// ── PATCH ─────────────────────────────────────────────────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Partial<Announcement>;

  const item = announcements.find((a) => a.id === id);
  if (!item) {
    return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
  }

  // DATABASE TODO:
  // await db.announcement.update({ where: { id }, data: body });

  Object.assign(item, body);
  return NextResponse.json({ success: true, announcement: item });
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = announcements.findIndex((a) => a.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
  }

  // DATABASE TODO:
  // await db.announcement.delete({ where: { id } });
  announcements.splice(index, 1);

  return NextResponse.json({ success: true });
}