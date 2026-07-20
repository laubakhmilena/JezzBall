# 05 — Requirements and Oracles

## Oracle hierarchy
1. Explicit UI text and constants.
2. Consistent behavior in code/data.
3. Observed runtime behavior.
4. Official Yandex requirements for platform integration.
5. WCAG 2.2 for web accessibility recommendations.
6. Common user expectations; such items require developer confirmation.

| Requirement | Expected result | Oracle | Confidence | Tests |
|---|---|---|---|---|
| REQ-BOOT-001 | Игра открывает главное меню | HTML active class + observed runtime | CONFIRMED | TC-SMOKE-001 |
| REQ-CORE-001 | Захват увеличивает percentage | HUD label + geometry code + observed 0→50% | CONFIRMED | TC-CORE-001 |
| REQ-WIN-001 | Уровень завершен при captured ≥ target | completion condition in JS | CONFIRMED | TC-WIN-001 |
| REQ-FAIL-001 | 3 штрафа завершают попытку | MAX_PENALTIES=3 + text | CONFIRMED | TC-FAIL-001 |
| REQ-SAVE-001 | Progress persists locally and corrupt data recovers | SAVE_KEY/loadProgress + runtime | CONFIRMED | TC-SAVE-001/002 |
| REQ-PLAT-001 | SDK connection uses /sdk.js on Yandex-hosted game | HTML + official Yandex SDK doc | CONFIRMED design; runtime BLOCKED | TC-PLAT-001 |
| REQ-ACC-001 | Keyboard focus visible and modal focus contained | CSS :focus-visible + focus trap code + WCAG expectation | PARTIAL | TC-INPUT-001; TC-ACC-002 |
| REQ-PERF-001 | No project-specific FPS/load threshold supplied | No requirements source | UNKNOWN | TC-PERF-002 |

## Ambiguities requiring developer confirmation
- Exact star thresholds and whether penalties alone determine stars.
- Whether no audio/settings is intentional.
- Supported browsers/devices and minimum viewport.
- Whether all monetization products are release scope.
- Whether lives may exceed `MAX_LIVES` for IAP rewards or must clamp.
- Official performance targets and maximum acceptable loading time.

## Methodological/public sources checked on 2026-07-17
- ISTQB CTFL Syllabus v4.0.1: https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf
- ISO/IEC/IEEE 29119-1:2022: https://www.iso.org/standard/81291.html
- ISO/IEC/IEEE 29119-2:2021 overview: https://www.iso.org/obp/ui/en/
- WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- Yandex Games SDK connection: https://yandex.com/dev/games/doc/en/sdk/sdk-about
- Yandex Games requirements (checked 2026-07-17; page dated 2026-05-05): https://yandex.com/dev/games/doc/en/concepts/requirements
- Yandex Player data: https://yandex.com/dev/games/doc/en/sdk/sdk-player
- Yandex in-app purchases: https://yandex.com/dev/games/doc/en/sdk/sdk-purchases

No platform conformance or certification is claimed.
