# CHK-06 — Game States

Applicability: applicable unless an item explicitly states otherwise.

| Check ID | Check | Precondition | Expected | Priority | Type | Status | Comment | Bug | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CHK-06-01 | Menu→chapter | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-06-02 | Chapter→level | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-06-03 | Running→complete | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-04 | Running→failed | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-05 | Complete→next/replay/chapter | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-06 | Modal pause | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-07 | Visibility pause | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-08 | Resize pause overlay | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-09 | State restored after close | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-06-10 | Invalid transitions blocked | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
