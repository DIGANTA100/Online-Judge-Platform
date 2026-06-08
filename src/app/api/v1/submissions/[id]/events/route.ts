import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return NextResponse.json({
    submissionId: id,
    events: [
      { type: "QUEUED", at: "2026-06-07T12:00:00.000Z" },
      { type: "COMPILING", at: "2026-06-07T12:00:00.120Z" },
      { type: "RUNNING", at: "2026-06-07T12:00:00.410Z" },
      { type: "AC", at: "2026-06-07T12:00:01.184Z" }
    ]
  });
}
