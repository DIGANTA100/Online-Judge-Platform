import { NextResponse } from "next/server";

const demoAnnouncements = [
  {
    id: "ann_demo_001",
    title: "Problemset maintenance",
    body: "Some practice problems are being refreshed with clearer examples.",
    audience: "ALL_USERS",
    status: "DRAFT"
  },
  {
    id: "ann_demo_002",
    title: "New editorial release",
    body: "Fresh editorials are available for selected medium problems.",
    audience: "PRACTICE_USERS",
    status: "QUEUED"
  }
];

export async function GET() {
  // AUTH TODO:
  // Verify ADMIN JWT/session before exposing announcement drafts.
  // DATABASE TODO:
  // Read announcements from PostgreSQL with status and audience filters.
  return NextResponse.json({ items: demoAnnouncements });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    body?: string;
    audience?: string;
  };

  if (!body.title || !body.body) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 }
    );
  }

  // AUTH TODO:
  // Verify ADMIN JWT/session and use the admin id as createdBy.
  // DATABASE TODO:
  // Insert the announcement into PostgreSQL and write an audit log.
  // Example later:
  // const announcement = await announcementRepository.create({
  //   title: body.title,
  //   body: body.body,
  //   audience: body.audience ?? "ALL_USERS",
  //   createdBy: adminId
  // });

  return NextResponse.json(
    {
      success: true,
      announcement: {
        id: "ann_demo_created",
        title: body.title,
        body: body.body,
        audience: body.audience ?? "ALL_USERS",
        status: "PUBLISHED"
      }
    },
    { status: 201 }
  );
}
