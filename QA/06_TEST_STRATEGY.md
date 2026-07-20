# 06 — Risk-based Test Strategy

## Goal and scope
Protect the critical player path (launch → level → play → win/fail → progress persistence) first, then economy/platform integrations. Static review, BVT, exploratory testing, state-transition tests, boundary analysis, equivalence partitions, decision tables and pairwise viewport/input combinations are used.

## Solo-developer priority
1. Packaging/assets and crash blockers.
2. One complete critical path with clean and existing save.
3. Save/economy idempotency.
4. Highest-risk levels (1,10,50,100) and chapter boundaries.
5. Monetization in Yandex sandbox.
6. UI/a11y/performance/extended compatibility.

## Levels/types
Static analysis; component-level debug audit; system manual testing; platform integration; smoke, functional, negative/recovery, exploratory, accessibility, compatibility, performance and regression.

## Entry
A clean complete archive, known build ID, supported browser, console access, deterministic test account/product catalog for platform tests.

## Suspension/resumption
Suspend release testing on launch blocker, reproducible data loss, frequent crash/hang, impossible critical path, or uncontrolled real-money operation. Resume after fix, clean rebuild, retest and targeted regression.

## Exit
BVT and smoke pass; no open S1; no unaccepted S2; one full path including win/fail/save passes; critical platform monetization passes if in scope; critical NOT_RUN areas are either completed or explicitly accepted.

## Evidence/defects
Store screenshots/logs under `evidence/` and `logs/`, include build/environment/steps/frequency. Static suspicions remain in Potential Defects until runtime confirmation.

## Standards basis
ISTQB CTFL 4.0.1 terminology and risk-based principles; ISO/IEC/IEEE 29119 concepts/process/documentation adapted without corporate overhead. Sources: see 05.
