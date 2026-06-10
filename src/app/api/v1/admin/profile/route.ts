import { NextResponse } from "next/server";

const demoAdminProfile = {
  id: "adm_demo_001",
  handle: "admin123",
  email: "admin123@gmail.com",
  role: "ADMIN",
  accessLevel: "FULL_PLATFORM_CONTROL",
  joinedAt: "2026-06-09T00:00:00.000Z"
};

export async function GET() {
  // DATABASE TODO:
  // Replace this demo profile with the authenticated admin record from PostgreSQL.
  // Example later:
  // const adminId = requireAdminSession(request);
  // const profile = await adminRepository.findProfileById(adminId);
  // return NextResponse.json({ profile });
  return NextResponse.json({ profile: demoAdminProfile });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    displayName?: string;
    recoveryEmail?: string;
  };

  // DATABASE TODO:
  // Update only editable admin profile fields and write an audit log.
  // Example later:
  // await adminRepository.updateProfile(adminId, body);
  // await auditLogRepository.create({ action: "ADMIN_PROFILE_UPDATED", adminId });

  return NextResponse.json({
    success: true,
    profile: {
      ...demoAdminProfile,
      displayName: body.displayName ?? "Platform Admin",
      recoveryEmail: body.recoveryEmail ?? demoAdminProfile.email
    }
  });
}
