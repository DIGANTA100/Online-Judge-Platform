import { NextResponse } from "next/server";

export async function GET() {
  // DATABASE TODO:
  // Load moderation reports from PostgreSQL ordered by severity and creation time.
  return NextResponse.json({
    items: [
      { id: "rep_001", type: "Discussion", severity: "Medium", title: "Spoiler in Median Patrol discussion" },
      { id: "rep_002", type: "User", severity: "High", title: "Suspicious submissions from spam_probe" }
    ]
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    reportId?: string;
    status?: string;
  };

  if (!body.reportId || !body.status) {
    return NextResponse.json({ error: "reportId and status are required" }, { status: 400 });
  }

  // DATABASE TODO:
  // Update report status and record the admin moderation action in audit_logs.

  return NextResponse.json({ success: true, reportId: body.reportId, status: body.status });
}
