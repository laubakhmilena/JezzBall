# 08 — Test Plan

| Field | Value |
|---|---|
| Document ID | TP-JEZZ-20260717 |
| Version | 1.0 |
| Build | `SRC-20260717-4409e8e0-13a792df-8f215fa7` |
| Scope | Web game, progression, save, economy, UI, responsive, Yandex integrations |
| Excluded now | Real production money, certification claim, unavailable devices/services |
| Test data | clean/corrupt/partial saves; levels 1/10/50/100; resource boundaries; SDK callbacks |
| Platforms | Chromium desktop/mobile emulation now; future Chrome/Firefox/Safari/Android/iOS |

## Execution order
BVT → Smoke → critical path → functional → negative/recovery → exploratory → saves/states → UI/UX → accessibility → performance → compatibility → regression → RC.

## Entry/exit/stop/resume
See Strategy. A release candidate must be extracted into an empty directory and hashed. Stop immediately for S1, uncontrolled purchase, or save destruction.

## Severity/Priority
S1 blocker/data loss/no critical path; S2 critical system loss; S3 major degraded function; S4 minor/cosmetic. Priority considers reach/frequency/workaround/release risk, not severity alone.

## Reporting
Update test case CSV, bug reports, traceability, execution report and release verdict. Retest fixes on the same environment plus clean context; perform local regression by Feature/Risk links.

## Current constraints/open questions
Incomplete archive and no real SDK. See 24_OPEN_QUESTIONS.md.
