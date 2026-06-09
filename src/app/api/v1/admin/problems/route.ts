import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    difficulty?: string;
    statement?: string;
    samples?: string;
  };

  if (!body.title || !body.difficulty || !body.statement) {
    return NextResponse.json(
      { error: "title, difficulty, and statement are required" },
      { status: 400 }
    );
  }

  // DATABASE TODO:
  // Insert problem, examples, tags, limits, and author id into PostgreSQL.
  // Hidden test files should be stored in object storage, then referenced by blob keys.
  // Example later:
  // const problem = await problemRepository.create({ ...body, authorId: adminId });
  // await auditLogRepository.create({ action: "PROBLEM_CREATED", targetId: problem.id, adminId });

  return NextResponse.json(
    {
      id: "problem_demo_created",
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      status: "DRAFT"
    },
    { status: 201 }
  );
}
