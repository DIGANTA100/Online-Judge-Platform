import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    accessToken: "demo.jwt.access.token.rotated",
    refreshToken: "demo-refresh-token-rotated-again",
    expiresInSeconds: 900
  });
}
