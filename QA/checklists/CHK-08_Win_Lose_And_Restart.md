# CHK-08 — Win Lose And Restart

Applicability: applicable unless an item explicitly states otherwise.

| Check ID | Check | Precondition | Expected | Priority | Type | Status | Comment | Bug | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CHK-08-01 | Target boundary | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-02 | Star rules 0/1/2 penalties | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-03 | Reward one-time | Complete build and required state | Observable expected behavior; no crash/data loss | P0 | Smoke | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-04 | Restart confirmation | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-08-05 | Restart reset | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-08-06 | Leave confirmation | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | PASS | Covered by executed static/browser subset; see execution report. |  | QA/logs/run.log |
| CHK-08-07 | Third penalty fail | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-08 | Retry consumes rules | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-09 | No lives handling | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
| CHK-08-10 | Next level destination | Complete build and required state | Observable expected behavior; no crash/data loss | P1 | Functional/Negative | NOT_RUN | Designed, not executed. |  |  |
