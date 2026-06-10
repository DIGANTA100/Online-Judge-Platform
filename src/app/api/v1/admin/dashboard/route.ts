import { NextResponse } from "next/server";

const dashboardSnapshot = {
  activeUsers: 18420,
  queuedSubmissions: 1284,
  openReports: 7,
  draftProblems: 18,
  acceptedSubmissionRate: "74.2%",
  averageQueueTime: "1.8s",
  newDiscussions: 326,
  problemReportsClosed: "91%"
};

export async function GET() {
  // AUTH TODO:
  // Verify the request has a valid ADMIN JWT/session before returning platform-wide data.
  // Example later:
  // const adminId = await requireAdminSession(request);

  // DATABASE TODO:
  // Replace this demo snapshot with aggregates from users, submissions, reports,
  // discussions, problems, and judge_jobs tables.
  // Example later:
  // const dashboardSnapshot = await adminDashboardRepository.getSnapshot(adminId);

  return NextResponse.json({ snapshot: dashboardSnapshot });
}
