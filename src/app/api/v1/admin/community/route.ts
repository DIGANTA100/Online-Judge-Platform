// src/app/api/v1/admin/community/route.ts
// GET  /api/v1/admin/community   → returns overview stats + analytics sparkline data
//
// DATABASE TODO: replace mock imports with real Prisma / SQL queries.

import { NextResponse } from "next/server";
import { adminStats, communityAnalytics } from "@/lib/admin-community-data";

export async function GET() {
  // DATABASE TODO:
  // const [threadCount, replyCount, dauCount, solvedCount, reportCount, flaggedCount] =
  //   await Promise.all([
  //     db.thread.count(),
  //     db.reply.count(),
  //     db.session.countDistinct({ where: { createdAt: { gte: startOfDay() } } }),
  //     db.thread.count({ where: { solved: true } }),
  //     db.report.count({ where: { status: "pending" } }),
  //     db.thread.count({ where: { status: "flagged" } }),
  //   ]);
  //
  // const analytics = await db.$queryRaw`
  //   SELECT date_trunc('day', created_at) AS day, count(*) AS value
  //   FROM threads WHERE created_at >= NOW() - INTERVAL '7 days'
  //   GROUP BY 1 ORDER BY 1
  // `;

  return NextResponse.json({ stats: adminStats, analytics: communityAnalytics });
}