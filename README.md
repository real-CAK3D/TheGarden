# The Garden Live

Animated top-down dashboard for CAK3D's Garden agents and devices.

## What this build includes

- Next.js app deployed on Vercel as `The Garden`
- Lightweight CSS/SVG living Garden world that avoids heavy WebGL stalls
- Animated agent sprites, pulsing beacons, rotating rings, and patrol traces
- Clickable agent roster and detail panel
- Device zone cards for Oracle VM, Obsidian VM, theBAK3RY, Hack-Safe, NukeBox, and HP laptop
- Static-safe data model in `src/lib/gardenData.ts`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

No long-running local server is required; production lives on Vercel.

## Vercel deploy

```bash
npx vercel@latest deploy --prod
```

Current production alias:

https://the-garden-mu.vercel.app

## Next upgrade path

The v1 dashboard intentionally avoids exposing device secrets. For live telemetry, add a Garden-side script that pushes sanitized JSON to a protected Vercel API route. Keep SSH keys, Home Assistant tokens, Discord tokens, and device secrets inside The Garden only.
