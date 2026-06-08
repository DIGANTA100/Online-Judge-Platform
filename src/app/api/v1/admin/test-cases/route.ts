import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    problemSlug?: string;
    isHidden?: boolean;
  };

  if (!body.problemSlug) {
    return NextResponse.json({ error: "problemSlug is required" }, { status: 400 });
  }

  return NextResponse.json({
    testCaseId: "tc_demo_001",
    problemSlug: body.problemSlug,
    isHidden: body.isHidden ?? true,
    blobKey: "object-storage://judge-tests/demo/tc_demo_001",
    auditLogId: "audit_demo_001"
  });
}
