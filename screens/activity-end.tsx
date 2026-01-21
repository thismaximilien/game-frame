"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { Sparkles } from "@/components/sparkles";

export type StatColor = "yellow" | "green" | "cyan" | "orange" | "red" | "blue" | "purple" | "pink";

export interface Stat {
  label: string;
  value: number;
  format: "number" | "percent" | "time";
  icon: ReactNode;
  color: StatColor;
}

const statColorMap: Record<StatColor, { border: string; header: string; body: string }> = {
  yellow: { border: "border-yellow-400 bg-yellow-400", header: "bg-yellow-400", body: "text-yellow-500" },
  green: { border: "border-green-500 bg-green-500", header: "bg-green-500", body: "text-green-600" },
  cyan: { border: "border-cyan-500 bg-cyan-500", header: "bg-cyan-500", body: "text-cyan-600" },
  orange: { border: "border-orange-500 bg-orange-500", header: "bg-orange-500", body: "text-orange-600" },
  red: { border: "border-red-500 bg-red-500", header: "bg-red-500", body: "text-red-600" },
  blue: { border: "border-blue-500 bg-blue-500", header: "bg-blue-500", body: "text-blue-600" },
  purple: { border: "border-purple-500 bg-purple-500", header: "bg-purple-500", body: "text-purple-600" },
  pink: { border: "border-pink-500 bg-pink-500", header: "bg-pink-500", body: "text-pink-600" },
};

const textColorMap: Record<StatColor, string> = {
  yellow: "text-yellow-500",
  green: "text-green-500",
  cyan: "text-cyan-500",
  orange: "text-orange-500",
  red: "text-red-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
};

const strokeColorMap: Record<StatColor, string> = {
  yellow: "#eab308",
  green: "#22c55e",
  cyan: "#06b6d4",
  orange: "#f97316",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#a855f7",
  pink: "#ec4899",
};

const sparkleColorMap: Record<StatColor, string> = {
  yellow: "text-yellow-400",
  green: "text-green-400",
  cyan: "text-cyan-400",
  orange: "text-orange-400",
  red: "text-red-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
};

function formatValue(value: number, format: Stat["format"]) {
  switch (format) {
    case "percent": return `${value}%`;
    case "time": return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
    default: return value;
  }
}


interface ActivityEndScreenProps {
  title: { text: string; color: StatColor };
  subtitle: string;
  stats: Stat[];
  onRestart: () => void;
}

export function ActivityEndScreen({ title, subtitle, stats, onRestart }: ActivityEndScreenProps) {
  const isSingleStat = stats.length === 1;

  return (
    <>
      <div className="h-[32%] rounded-lg w-full bg-stone-200" />

      <div className="flex flex-1 flex-col pt-8">
        {isSingleStat ? (
          <div className="text-center">
            <motion.div
              className="text-9xl font-black tracking-tight"
              style={{
                WebkitTextStroke: `6px ${strokeColorMap[stats[0].color]}`,
                color: "transparent",
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.05, 1] }}
              transition={{ duration: 0.35, times: [0, 0.5, 1], ease: [0.34, 1.3, 0.64, 1] }}
            >
              {formatValue(stats[0].value, stats[0].format)}
            </motion.div>
            <p className={`mt-2 text-2xl font-bold ${textColorMap[stats[0].color]}`}>
              {stats[0].label}
            </p>
            <p className="mt-8 text-2xl font-medium text-stone-500">{subtitle}</p>
          </div>
        ) : (
          // Multiple stats layout
          <>
            <div className="text-center">
              <h1 className={`text-3xl font-extrabold ${textColorMap[title.color]}`}>{title.text}</h1>
              <p className="mt-4 text-2xl font-medium text-stone-500">{subtitle}</p>
            </div>

            <div className="mt-12 flex gap-8 px-6 items-center justify-center">
              {stats.map((stat, index) => {
                const colors = statColorMap[stat.color];
                return (
                  <div className="relative">
                    <Sparkles show color={sparkleColorMap[stat.color]} />
                    <div
                      key={stat.label}
                      className={`relative w-32 lg:w-28 overflow-hidden rounded-2xl border-2 ${colors.border}`}
                    >
                      <motion.div
                        className={`overflow-hidden text-center text-sm font-bold uppercase tracking-wide text-white ${colors.header}`}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <div className="py-1">{stat.label}</div>
                      </motion.div>
                      <div className={`flex items-center justify-center gap-2 bg-white py-4 px-1 rounded-xl text-xl font-bold ${colors.body}`}>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {stat.icon}
                        </motion.span>
                        {formatValue(stat.value, stat.format)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-auto">
          <Button size="lg" className="w-full" onClick={onRestart}>
            Restart
          </Button>
        </div>
      </div>
    </>
  );
}
