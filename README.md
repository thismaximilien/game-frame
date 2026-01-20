# Game Frame

Next.js + Phaser 3 game shell with pre-built UI components.

## Setup

```bash
pnpm install
pnpm dev        # runs on port 8080
```

## Structure

```
app/                    # Next.js pages
components/             # React UI components
game/
  ├── main.ts           # Phaser config (1024x768)
  ├── PhaserGame.tsx    # React wrapper (use with dynamic import, ssr: false)
  ├── EventBus.ts       # React ↔ Phaser communication
  └── scenes/Game.ts    # Main scene
```

## Components

### Button

```tsx
<Button variant="default" | "secondary" | "ghost" | "destructive" size="sm" | "default" | "lg">
```

### Card

```tsx
<Card variant="default" | "muted">
```

### ChoiceGroup + ChoiceCard

```tsx
<ChoiceGroup value={selected} onValueChange={setSelected} columns={1|2|3|4} multiple={false}>
  <ChoiceCard value="a" state="default" | "selected" | "correct" | "incorrect">Option A</ChoiceCard>
</ChoiceGroup>
```

### ProgressBar

```tsx
<ProgressBar value={75} max={100} size="sm" | "md" | "lg" />
```

### Slider

```tsx
<Slider value={n} onValueChange={setN} min={0} max={5} color="green" | "blue" />
```

## EventBus

```ts
EventBus.emit('event-name', data);   // from Phaser
EventBus.on('event-name', handler);  // in React
EventBus.off('event-name', handler); // cleanup
```
