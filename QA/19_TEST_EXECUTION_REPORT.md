# 19 — Test Execution Report

**Build:** `SRC-20260717-4409e8e0-13a792df-8f215fa7`  
**Environment/date:** Chromium 144, Linux x86_64, 2026-07-17 UTC.

## Metrics
| Total | Passed | Failed | Blocked | Not Run | Not Applicable |
|---:|---:|---:|---:|---:|---:|
| 94 | 16 | 2 | 10 | 66 | 0 |

**Executed pass rate:** `16/(16+2) = 88.9%`. BLOCKED/NOT_RUN are excluded from this percentage and remain visible.

## Per-module summary
- Build/assets: 2 FAIL.
- Limited browser smoke/core/UI/save/viewport: 16 PASS.
- Real platform integration: 10 BLOCKED.
- Full gameplay/progression/economy/a11y/performance: mostly NOT_RUN.

## Smoke/critical path
Smoke is incomplete and fails release gate due packaging/assets; no full win/fail path was completed. Core line action, restart, leave confirmation and local persistence were observed.

## Defects
2 confirmed: S1=1, S2=0, S3=1, S4=0. Potential defects are not counted.

## Confidence
Low-to-medium for core bootstrap/UI and local save; low for overall release because the supplied build is incomplete and critical gameplay/platform scope is unexecuted.
