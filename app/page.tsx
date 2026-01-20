"use client";

import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("@/game/PhaserGame").then(m => m.PhaserGame), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-stone-950">
      {/* PhaserGame or other content here */}
    </main>
  );
}
