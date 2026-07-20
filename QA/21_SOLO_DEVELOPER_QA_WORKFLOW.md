# 21 — Solo Developer QA Workflow

## Every commit
Syntax/lint → changed feature happy path → one negative/boundary → inspect console → neighbor feature check → update relevant test/known issue.

## Test build
Clean archive/hash → BVT → smoke → critical path → save reload/corrupt → known issues → targeted regression.

## Release
Clean extraction → full smoke → Critical/Core regression → Yandex sandbox → exploratory charter → long session → compatibility/a11y → release verdict.

## After bug fix
Reproduce old build → verify fix on new build → local regression via Feature/Risk IDs → clean-state check → evidence → update bug/traceability/changelog.

## Minimum by change
- UI: menu/navigation/responsive/localization/focus.
- Input: mouse/touch/keyboard/rapid/focus loss.
- Physics: line/collision/borders/fast hard level/win-fail.
- Level: config audit + previous/current/next level + progression.
- Save: clean/existing/corrupt/interrupt/all fields/cloud conflict.
- Balance: target boundaries and representative player playtest.
- Engine/dependency/SDK: BVT, offline fallback, all platform callbacks.
- Crash fix: original steps + soak + neighboring states + save integrity.
