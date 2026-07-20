# 12 — Regression Suite

## Critical Regression
Run after every core/save/monetization fix: BVT, launch/menu/chapter/level, one line, win, fail, restart, local save/reload/corrupt save, resource idempotency. Effort: small-to-medium for this project, but cannot be stated in exact minutes until one full manual pass is timed.

## Core Regression
Critical + representative levels 1/10/50/100, all boosters, chapter boundary, shop/achievement basic actions, desktop/mobile portrait/landscape.

## Extended Regression
Core + all economy items, chests/cosmetics, cloud/leaderboard/ads/IAP error paths, accessibility and browser matrix.

## Full Regression
All test cases, 100-level configuration audit, targeted manual playthrough of every level, long session and release candidate checklist.

## Trigger mapping
- UI change: UI/RESP/LOC/ACC + smoke.
- Physics/level change: CORE/COLL/LEVEL/WIN/FAIL + save progression.
- Save/economy: SAVE/ECON/SHOP/ACH/IAP + idempotency.
- SDK/dependency: PLAT/ADS/IAP/CLOUD/LB + offline fallback.
