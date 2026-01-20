import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Name",
  description: "Short Game Description",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
