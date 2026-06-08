import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    problemSlug?: string;
    language?: string;
    source?: string;
    contestSlug?: string;
  };

  if (!body.problemSlug || !body.language || !body.source) {
    return NextResponse.json(
      { error: "problemSlug, language, and source are required" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      submissionId: "sub_demo_10492",
      verdict: "QUEUED",
      queue: "redis:judge:submissions",
      sandbox: {
        network: "disabled",
        cpuLimitMs: 1500,
        memoryLimitMb: 256
      }
    },
    { status: 202 }
  );
}
