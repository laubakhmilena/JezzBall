# 03 — Product Overview

## Product
Single-player territory-capture arcade game for browser. A moving ball or set of balls remains in active territory. The player starts axis-aligned lines; when a line connects boundaries/eligible obstacles, the side without balls is captured. The level ends when captured percentage reaches its target.

## Entities and rules
- **Balls:** 1–4, speeds slow/medium/fast; reflect from borders/obstacles.
- **Line:** grows in two directions; vulnerable while building.
- **Captured area:** removed from active play and adds to percentage.
- **Safe obstacle:** ball-blocking and usable for line/capture geometry.
- **Danger obstacle:** interaction with building line risks a penalty.
- **Penalties:** maximum 3 per attempt.
- **Resources:** lives (max 5 default, time restore), coins, stars, boosters, cosmetics, chests.
- **Progression:** 100 levels, 10 chapters, final after level 100.

## States
`main-menu → chapter-screen → level-running → {complete-panel | failed-panel} → {replay | next | chapter}`. Any major screen can open Shop/Achievements modal. Visibility/platform events pause/resume active gameplay. Save transitions occur after progression/economy actions and before unload.

## Expected reactions
Input must either provide immediate visual feedback or be explicitly disabled. Dangerous navigation from an active attempt must ask for confirmation. Invalid/corrupt save must not crash. Unavailable platform services must leave local gameplay usable. A reward must be idempotent.

## Nonfunctional expectations (recommendations, not specifications)
Responsive 16:9/portrait mobile layout, stable animation without visible stalls, keyboard-operable UI, visible focus, readable Russian text, offline fallback, no data loss, and no duplicate monetization rewards.
