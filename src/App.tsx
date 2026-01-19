import { PhaserGame } from "./PhaserGame";
import { ChoiceCard } from "@/components/ui/choice-card";
import { ChoiceGroup } from "@/components/ui/choice-group";
import { Card } from "@/components/ui/card";

function App() {
  return (
    <div className="min-h-screen w-full bg-white text-black px-6 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Card className="flex items-start gap-4">
          <span className="text-3xl">📘</span>
          <div>
            <div className="text-lg font-semibold">Start from scratch</div>
            <div className="text-sm text-gray-500">
              Take the easiest lesson of the Korean course
            </div>
          </div>
        </Card>

        <ChoiceGroup columns={3}>
          <ChoiceCard>
            <span className="text-2xl">💵</span>
            <div className="flex-1">
              <div className="text-sm text-gray-500">1</div>
              <div>Money</div>
            </div>
          </ChoiceCard>
          <ChoiceCard state="correct">
            <span className="text-2xl">🧼</span>
            <div className="flex-1">
              <div>Bathroom</div>
            </div>
          </ChoiceCard>
          <ChoiceCard>
            <span className="text-2xl">🍔</span>
            <div className="flex-1">
              <div className="text-sm text-gray-500">3</div>
              <div>Restaurant</div>
            </div>
          </ChoiceCard>
        </ChoiceGroup>

        <PhaserGame className="w-full max-w-[1024px] aspect-[4/3]" />
      </div>
    </div>
  );
}

export default App;
