# Garden Diorama Dashboard Design

This document captures the visual-only dashboard direction for **The Garden Live**. These appearances apply only to the dashboard UI/animation layer. They do **not** change the actual Hermes profiles, agent routing rules, responsibilities, tone, or identities used elsewhere in CAK3D's Garden.

## Visual direction

Build the Garden as a smooth, detailed, lightweight 3D-style farm diorama that can remain GitHub/Vercel-friendly.

Preferred implementation:

- True Three.js / React Three Fiber scene for this approved phase: orthographic camera, low-poly mesh props, primitive gnome characters, path-following animation loops, and compact HTML HUD.
- Keep geometry primitive/procedural and assets light enough for Vercel/GitHub and the 1 GB Oracle VM build environment.
- Use `NODE_OPTIONS=--max-old-space-size=512 npm run build` on The Garden VM if TypeScript/Next builds start swapping.
- Fall back to commit `99933e8` if browser rendering becomes too heavy or unstable.

## Scene elements

- Old white farmhouse, partially cut off by the edge of the viewport, with a wraparound porch.
- Small garden shed for The Gardiner.
- Multiple raised garden beds with soil, sprouts, flowers, vegetables, and prepared rows.
- Small corn field.
- Scarecrow.
- Oak tree near the house.
- Driveway with B.I.G.'s red farm truck.
- Tractor path for Fat Man.
- Birds/crows flying through the scene.
- Ambient life: butterflies, smoke puffs, seed sparkle, swaying crops, soft lighting, textured ground.

## Dashboard-only character appearances

- **The Gardiner**: older gentleman gardener with gray hair, glasses, straw garden hat, maintaining a little shed.
- **Ganja**: cute redhead girl walking garden beds and planting seeds.
- **Chronic**: stoner dude chilling by a tree, smoking a joint, glancing around to see if anyone notices.
- **BAK3R**: male cook who loves to eat, picking vegetables from the garden beds.
- **CYPH3R**: nerdy hacker girl preparing garden beds before Ganja plants seeds.
- **Fat Man**: large man in a white shirt, blue jeans, straw hat, wheat straw in mouth, driving a tractor delivering hay/soil.
- **Little Boy**: little boy kid running around and playing in different garden spots.
- **Homie**: boy who never leaves home, listening to music with headphones in shade under an oak tree near the house.
- **B.I.G.**: big Black guy sitting in a nice old red farm truck in the driveway.

## Interaction goals

- Clicking an agent selects them in the dashboard panel.
- Each agent should have several small animations or visual details:
  - idle/bounce
  - task-specific loop
  - tiny props/smoke/sparkles/tools
- Device/agent data remains structured in `src/lib/gardenData.ts` so future live telemetry can update the same dashboard without changing the visual language.

## Rollback

The previous working dashboard baseline before this diorama phase was commit `c0df067`.

Rollback options:

```bash
cd /home/ubuntu/cak3d-garden-dashboard
git checkout main
git revert <diorama-commit>
# or hard reset locally only, if not preserving history:
git reset --hard c0df067
```
