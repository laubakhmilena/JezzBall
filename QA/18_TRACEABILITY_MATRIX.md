# 18 — Traceability Matrix

| Feature ID | Feature | Oracle/source | Risks | Tests | Results | Bugs | Residual risk |
|---|---|---|---|---|---|---|---|
| FEAT-BOOT-001 | Bootstrap и offline fallback | index(2).html; script(1).js:initYandexSdk/loadProgress | RISK-BUILD-001 | TC-SMOKE-001; TC-BUILD-001 | FAIL; PASS | BUG-001 | Yes |
| FEAT-UI-001 | Главное меню | index(2).html#main-menu; style(1).css .start-screen | None mapped | TC-SMOKE-001; TC-INPUT-001 | PASS | None | No |
| FEAT-PROG-001 | Карта глав | script(1).js:chapters/TOTAL_LEVELS/renderChapterScreens | RISK-PROG-001 | TC-SMOKE-002; TC-PROG-001..004 | NOT_RUN; PASS | None | Yes |
| FEAT-CORE-001 | Захват пространства | script(1).js:getLineCastResult/getPotentialSplitResultFromCast | RISK-CRASH-001; RISK-HANG-001; RISK-FEED-001 | TC-CORE-001; TC-CORE-003..009 | NOT_RUN; PASS | None | Yes |
| FEAT-INPUT-001 | Ввод | index(2).html#jezzCanvas aria-label; script(1).js pointer/key handlers | RISK-INPUT-001; RISK-RAPID-001; RISK-DEVICE-001 | TC-INPUT-001..008 | NOT_RUN; PASS | None | Yes |
| FEAT-COLL-001 | Шары, препятствия и штрафы | script(1).js BALL_RADIUS/MAX_PENALTIES/obstacles | RISK-BOUND-001; RISK-PHYS-001 | TC-COLL-001..006 | NOT_RUN | None | Yes |
| FEAT-LEVEL-001 | 100 уровней | script(1).js:TOTAL_LEVELS/LEVEL_CONFIGS/runDevLevelAudit | RISK-SOFTLOCK-001; RISK-BAL-001 | TC-CORE-LEVEL-AUDIT; TC-LEVEL-001..006 | NOT_RUN; PASS | None | Yes |
| FEAT-WIN-001 | Победа, звезды, награды | script(1).js:completeJezzLevel/LEVEL_REWARDS/STAR_REWARDS | RISK-WIN-001 | TC-WIN-001..006 | NOT_RUN | None | Yes |
| FEAT-FAIL-001 | Поражение и жизни | script(1).js:MAX_LIVES/LIFE_RESTORE_MS/loseSelectedLevel | RISK-FAIL-001 | TC-FAIL-001..005 | BLOCKED; NOT_RUN | None | Yes |
| FEAT-SAVE-001 | Локальное сохранение | script(1).js:SAVE_KEY/serializeProgress/loadProgress | RISK-SAVE-001; RISK-TRANS-001 | TC-SAVE-001..006 | NOT_RUN; PASS | None | Yes |
| FEAT-SAVE-002 | Облачное сохранение | script(1).js:loadCloudProgress/saveCloudProgress | RISK-SAVE-001 | TC-CLOUD-001..003 | BLOCKED | None | Yes |
| FEAT-ECON-001 | Экономика | script(1).js:SHOP_*_PRICES/STAR_REWARDS/MAX_LIVES | RISK-ECON-001 | TC-ECON-001..006 | NOT_RUN | None | Yes |
| FEAT-BOOST-001 | Бустеры | script(1).js:BOOSTER_ITEMS/useLevelBooster | None mapped | TC-BOOST-001..007 | NOT_RUN | None | Yes |
| FEAT-SHOP-001 | Магазин, сундуки, скины | index(2).html#inventoryModal; script(1).js SHOP_* | RISK-ASSET-001; RISK-RAPID-001 | TC-SHOP-001..008 | NOT_RUN; PASS | None | Yes |
| FEAT-ACH-001 | Достижения | script(1).js:ACHIEVEMENTS | None mapped | TC-ACH-001..004 | NOT_RUN; PASS | None | Yes |
| FEAT-ADS-001 | Реклама | script(1).js:INTERSTITIAL_*/showFullscreenAd*/showRewarded* | RISK-ADS-001 | TC-ADS-001..004 | BLOCKED | None | Yes |
| FEAT-IAP-001 | Внутриигровые покупки | script(1).js:SHOP_IAP_REWARDS/processPendingYandexPurchases | RISK-IAP-001 | TC-IAP-001..004 | BLOCKED | None | Yes |
| FEAT-PLAT-001 | Yandex Games SDK | index(2).html /sdk.js; script(1).js:initYandexSdk | RISK-HANG-001; RISK-PAUSE-001; RISK-NET-001; RISK-SECRET-001 | TC-PLAT-001..004 | BLOCKED; NOT_RUN | None | Yes |
| FEAT-LB-001 | Лидерборд | script(1).js:LEADERBOARD_NAME/submitLeaderboardScore | None mapped | TC-LB-001..002 | BLOCKED | None | Yes |
| FEAT-LOC-001 | Локализация RU | script(1).js:SUPPORTED_LANGUAGES/messages | RISK-LOC-001 | TC-LOC-001..004 | NOT_RUN | None | Yes |
| FEAT-RESP-001 | Responsive layout | style(1).css media queries; script(1).js viewport sync | RISK-ASSET-001; RISK-RES-001; RISK-FOCUS-001 | TC-COMPAT-001..006 | FAIL; NOT_RUN; PASS | BUG-002 | Yes |
| FEAT-ACC-001 | Доступность интерфейса | index(2).html aria-*; script(1).js modalFocusStack | RISK-A11Y-001 | TC-ACC-001..006 | NOT_RUN | None | Yes |
| FEAT-PERF-001 | Производительность | script(1).js:LOW_PERFORMANCE_FRAME_INTERVAL/perfState | RISK-PERF-001; RISK-MEM-001 | TC-PERF-001..005 | NOT_RUN; PASS | None | Yes |
| FEAT-FINAL-001 | Финальный экран | index(2).html#final-screen; script(1).js action final | None mapped | TC-FINAL-001..002 | NOT_RUN | None | Yes |
