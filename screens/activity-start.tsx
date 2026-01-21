import { Button } from "@/components/button";

interface ActivityStartScreenProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  eyebrow?: string;
  onStart?: () => void;
}

export function ActivityStartScreen({
  title,
  subtitle,
  ctaLabel,
  eyebrow,
  onStart,
}: ActivityStartScreenProps) {
  return (
    <>
      <div className="flex flex-1 flex-col items-center gap-8">
        <div className="h-[32%] rounded-lg w-full bg-stone-200" />
        <div className="text-center">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-lg bg-stone-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-stone-500">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-6 text-4xl font-extrabold text-stone-800">{title}</h1>
          <p className="mt-6 text-2xl font-medium text-stone-500">{subtitle}</p>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={onStart}>
        {ctaLabel}
      </Button>
    </>
  );
}
