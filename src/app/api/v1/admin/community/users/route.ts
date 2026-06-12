// src/app/api/v1/admin/community/users/route.ts
// GET  /api/v1/admin/community/users            → list users with filters
//
// src/app/api/v1/admin/community/users/[id]/route.ts
// PATCH /api/v1/admin/community/users/[id]      → change status (warn/suspend/ban/activate)

import { NextResponse } from "next/server";
import { communityUsers, type UserStatus } from "@/lib/admin-community-data";

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const query = searchParams.get("q")?.toLowerCase();

  // DATABASE TODO:
  // const users = await db.user.findMany({
  //   where: {
  //     ...(status && { status }),
  //     ...(query && {
  //       OR: [{ handle: { contains: query } }, { email: { contains: query } }],
  //     }),
  //   },
  //   select: { id: true, handle: true, email: true, reputation: true, ... },
  //   orderBy: { reputation: "desc" },
  // });

  let results = [...communityUsers];
  if (status) results = results.filter((u) => u.status === status);
  if (query) results = results.filter(
    (u) => u.handle.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
  );

  return NextResponse.json({ users: results, total: results.length });
}