import { NextResponse } from "next/server";
import { sampleProblems } from "@/lib/platform-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const problem = sampleProblems.find((item) => item.slug === slug);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...problem,
    editorial: {
      status: "PUBLISHED",
      summary: "Binary search the answer and use a monotonic feasibility check."
    },
    publicTests: problem.examples,
    hiddenTests: {
      count: 38,
      storage: "object-storage://hidden-tests/redacted"
    }
  });
}
