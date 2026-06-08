import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NimbleJudge | Competitive Programming Platform",
  description:
    "A premium competitive programming platform with contests, problems, analytics, and a VS Code-quality editor experience."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
