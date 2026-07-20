# 11 — Smoke Suite

## Purpose
Fast release gate for packaging and critical player path. Execute from a clean extraction, not `QA/work/runtime-copy`.

## Cases
- TC-BUILD-001
- TC-ASSET-001
- TC-SMOKE-001
- TC-INPUT-001
- TC-SMOKE-002
- TC-SMOKE-003
- TC-CORE-001
- TC-CORE-002
- TC-NAV-001
- TC-SAVE-001
- TC-SAVE-002
- TC-FAIL-001
- TC-WIN-001
- TC-STATE-001

## Current result
Packaging/assets fail; limited runtime subset passes. Win, fail and true pause are NOT_RUN/BLOCKED, therefore smoke is **FAILED/INCOMPLETE**.

## Pass criteria
All P0 smoke cases PASS; no unexpected console errors; no open S1/S2 affecting the path.
