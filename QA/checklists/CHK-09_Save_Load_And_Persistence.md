# CHK-09 — Save Load And Persistence

Applicability: applicable unless an item explicitly states otherwise.

| Check ID | Check | Precondition | Expected | Priority | Type | Status | Comment | Bug | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CHK-09-01 | First save created | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-09-02 | Reload equal | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-09-03 | All fields persist | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-09-04 | Corrupt JSON recovery | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-09-05 | Partial save normalization | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-09-06 | Out-of-range values | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-09-07 | Close during save | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-09-08 | Rapid saves | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-09-09 | Cloud newer/older merge | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | BLOCKED | Real Yandex environment unavailable. |  |  |
| CHK-09-10 | Version compatibility decision | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
