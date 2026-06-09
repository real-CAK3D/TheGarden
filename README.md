# The Garden Live

Animated farm-diorama dashboard for CAK3D's Garden agents and devices.

## What this build includes

- Next.js app deployed on Vercel as `The Garden`
- Lightweight 3D-style CSS/SVG farm diorama that avoids heavy WebGL stalls
- Dashboard-only character avatars for The Gardiner, Ganja, Chronic, BAK3R, CYPH3R, Fat Man, Little Boy, Homie, and B.I.G.
- Old farmhouse edge, wraparound porch, garden shed, oak tree, driveway, red farm truck, tractor loop, scarecrow, corn field, birds, butterflies, flowers, vegetables, and raised beds
- Clickable agent roster and detail panel
- Garden lane cards for Oracle VM, Obsidian/Memory Grove, theBAK3RY, Hack-Safe, NukeBox, and HP laptop
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
```

For a temporary local production preview on The Garden VM, use port 3055:

```bash
npm start -- --hostname 0.0.0.0 --port 3055
```

Production should still live on Vercel unless CAK3D decides to move the runtime to NukeBox/GMK.

## Vercel deploy

```bash
npx vercel@latest deploy --prod
```

Current production alias:

https://the-garden-mu.vercel.app

## Design reference

See `docs/garden-diorama-character-design.md` for the farm-diorama character direction. Those appearances are visual-only for the dashboard and do not change actual Hermes agent identities or routing behavior.

## Next upgrade path

The dashboard intentionally avoids exposing device secrets. For live telemetry, add a Garden-side script that pushes sanitized JSON to a protected Vercel API route. Keep SSH keys, Home Assistant tokens, Discord tokens, and device secrets inside The Garden only.
