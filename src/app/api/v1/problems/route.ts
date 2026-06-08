import { NextResponse } from "next/server";
import { sampleProblems } from "@/lib/platform-data";

export async function GET() {
  return NextResponse.json({
    items: sampleProblems,
    page: 1,
    pageSize: sampleProblems.length,
    total: sampleProblems.length
  });
}
