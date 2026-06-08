import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    source?: string;
    problemSlug?: string;
  };

  if (!body.source || !body.problemSlug) {
    return NextResponse.json(
      { error: "source and problemSlug are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    problemSlug: body.problemSlug,
    hints: [
      "Look for a monotonic predicate before choosing binary search.",
      "Keep hidden tests private; AI feedback should use only statement, samples, and submitted code."
    ],
    complexity: "Likely O(n log V) if feasibility is linear.",
    review:
      "The structure is close. Watch for integer overflow and avoid mutating arrays used by later checks."
  });
}
