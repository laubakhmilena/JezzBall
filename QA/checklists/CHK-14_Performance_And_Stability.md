# CHK-14 — Performance And Stability

Applicability: applicable unless an item explicitly states otherwise.

| Check ID | Check | Precondition | Expected | Priority | Type | Status | Comment | Bug | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CHK-14-01 | Startup timing recorded | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-14-02 | FPS level 1 | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-03 | FPS level 100 | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-04 | Frame spikes | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-05 | CPU/memory | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-06 | 60min memory growth | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-07 | Rapid restart stability | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-08 | 10 launches | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-09 | Background recovery | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-14-10 | No JS errors | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
