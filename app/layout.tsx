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
      <body>   
         <main className="mx-auto min-h-dvh max-w-xl">
          <div className="flex h-screen flex-col px-6 pb-12 pt-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
