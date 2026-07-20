# CHK-01 — Installation And First Launch

Applicability: applicable unless an item explicitly states otherwise.

| Check ID | Check | Precondition | Expected | Priority | Type | Status | Comment | Bug | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CHK-01-01 | Complete clean archive contains index.html/script.js/style.css | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | FAIL | Supplied package defect; see BUG-001/BUG-002. | BUG-001/002 |  |
| CHK-01-02 | All objects assets resolve | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | FAIL | Supplied package defect; see BUG-001/BUG-002. | BUG-001/002 |  |
| CHK-01-03 | JavaScript syntax check | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-01-04 | Serve over HTTP(S) | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-01-05 | First load shows menu | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-01-06 | Repeat load with existing save | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | BLOCKED | Real Yandex environment unavailable. |  |  |
| CHK-01-07 | Corrupt save recovers | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-01-08 | Offline/no SDK fallback | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | BLOCKED | Real Yandex environment unavailable. |  |  |
| CHK-01-09 | Console has no unexpected errors | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-01-10 | Close/reopen preserves progress | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
