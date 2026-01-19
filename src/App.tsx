"use client";

import { useState } from "react";

import { ChoiceCard } from "@/components/ui/choice-card";
import { ChoiceGroup } from "@/components/ui/choice-group";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Slider } from "@/components/ui/slider";
import { PhaserGame } from "./PhaserGame";
import { Button } from "@/components/ui/button";

function App() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["bathroom"]);
  const [greenValue, setGreenValue] = useState(1.6);
  const [blueValue, setBlueValue] = useState(0.85);

  return (
    <div className="min-h-screen w-full bg-white text-black px-6 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Card className="flex items-start gap-4">
          <span className="text-3xl">📘</span>
          <div>
            <div className="text-lg font-semibold">Start from scratch</div>
            <div className="text-md text-stone-500">
              Take the easiest lesson of the Korean course
            </div>
          </div>
        </Card>
        <Button>Start Game</Button>
        <ProgressBar value={58} size="lg" />

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-stone-600">
            Pick a topic to practice
          </div>
          <div className="text-lg text-stone-500">
            Selected:{" "}
            <span className="font-semibold">
              {selectedTopics.length ? selectedTopics.join(", ") : "none"}
            </span>
          </div>
        </div>

        <ChoiceGroup
          columns={3}
          multiple
          value={selectedTopics}
          onValueChange={(value) => {
            const next = Array.isArray(value)
              ? value.map(String)
              : value !== undefined
                ? [String(value)]
                : [];
            setSelectedTopics(next);
          }}
        >
          <ChoiceCard value="money">
            <span className="text-2xl">💵</span>
            <div className="flex-1">
              <div className="text-lg font-semibold">Money</div>
            </div>
          </ChoiceCard>
          <ChoiceCard value="bathroom">
            <span className="text-2xl">🧼</span>
            <div className="flex-1">
              <div className="text-lg font-semibold">Bathroom</div>
            </div>
          </ChoiceCard>
          <ChoiceCard value="restaurant">
            <span className="text-2xl">🍔</span>
            <div className="flex-1">
              <div className="text-lg font-semibold">Restaurant</div>
            </div>
          </ChoiceCard>
        </ChoiceGroup>

        <Card className="flex flex-col gap-4">
          <div>
            <div className="text-xl font-semibold text-stone-900">
              Pick your intensity
            </div>
            <div className="text-md text-stone-500">
              Drag the house to adjust the level.
            </div>
          </div>
          <div className="space-y-6">
            <Slider
              min={0}
              max={3}
              step={0.05}
              tickStep={0.1}
              value={greenValue}
              onValueChange={setGreenValue}
              color="green"
            />
            <Slider
              min={0}
              max={2}
              step={0.05}
              tickStep={0.1}
              value={blueValue}
              onValueChange={setBlueValue}
              color="blue"
            />
          </div>
          <div className="flex justify-between text-md font-semibold text-stone-600">
            <span>Green: {greenValue.toFixed(2)}</span>
            <span>Blue: {blueValue.toFixed(2)}</span>
          </div>
        </Card>

        <PhaserGame className="w-full max-w-[1024px] aspect-[4/3]" />
      </div>
    </div>
  );
}

export default App;
