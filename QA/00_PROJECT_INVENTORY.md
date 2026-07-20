# 00 — Project Inventory

**Дата анализа:** 2026-07-17  
**Build ID:** `SRC-20260717-4409e8e0-13a792df-8f215fa7`  
**Git commit:** `UNKNOWN` — репозиторий/.git не предоставлены.

## Краткое описание
JezzBall — single-player браузерная аркада: игрок проводит линии на поле с движущимися шарами и захватывает области без шаров. Сложность растет через target, число/скорость шаров и статические/движущиеся безопасные/опасные препятствия.

| Параметр | Вывод | Статус | Основание |
|---|---|---|---|
| Название | JezzBall | CONFIRMED | HTML title/H1 |
| Жанр | Аркадная puzzle/action territory-capture | INFERRED | Правила и canvas gameplay |
| Аудитория | Casual browser/mobile players | INFERRED | Touch, chapters, economy |
| Core loop | Выбрать уровень → строить линии → захватывать область → получить звезды/монеты → открыть уровни | CONFIRMED | UI/code |
| Start | Play → chapter map → unlocked level; требуется жизнь | CONFIRMED | Handlers/state |
| Win | captured percent достигает target | CONFIRMED | complete logic |
| Lose | 3 штрафа | CONFIRMED | MAX_PENALTIES=3 |
| Progress | 100 levels/10 chapters, stars/chests/achievements/cosmetics | CONFIRMED | Constants/data |
| Controls | Mouse/touch gestures; arrows + Space/Enter | CONFIRMED | Canvas aria + handlers |
| Tutorial | Hints levels 1–5 | CONFIRMED | TUTORIAL_HINT_KEYS |
| Pause | Visibility, modal and platform pause; отдельной кнопки нет | CONFIRMED | handlers/HTML |
| Settings | Отдельная система не обнаружена | NOT_APPLICABLE | No settings UI/data |
| Save | localStorage + optional Yandex cloud | CONFIRMED | SAVE_KEY/player |
| Audio/music | Не обнаружено | NOT_APPLICABLE | No audio API/assets refs |
| Localization | Только ru | CONFIRMED | SUPPORTED_LANGUAGES |
| Network | Yandex SDK services optional/fallback | CONFIRMED | initYandexSdk |
| Achievements | 20 | CONFIRMED | ACHIEVEMENTS |
| IAP/ads | Есть integration code | CONFIRMED | SHOP_IAP_REWARDS/ad functions |
| Accounts | Yandex Player, собственной регистрации нет | INFERRED | getPlayer |
| Telemetry | Отдельная аналитика не обнаружена | NOT_APPLICABLE | No analytics SDK |
| UGC/mods | Не обнаружены | NOT_APPLICABLE | No relevant code |
| Controller | Gamepad API не обнаружен | NOT_APPLICABLE | No gamepad |
| Touch | Есть | CONFIRMED | pointer/touch CSS |
| Modes | Один progression mode; replay levels | CONFIRMED | Flow |

## Технический стек
- **Engine:** custom HTML5 Canvas/DOM, без отдельного game engine (`CONFIRMED`).
- **Language:** JavaScript ES202x, HTML5, CSS3 (`CONFIRMED`).
- **Build system/package manager:** отсутствует (`CONFIRMED` для поставки).
- **Entry point:** `index(2).html`, ожидаемое релизное имя вероятно `index.html` (`INFERRED`).
- **Runtime:** modern browser; Yandex Games SDK (`CONFIRMED`).
- **Target platforms:** desktop/mobile web; Yandex Games (`INFERRED/CONFIRMED integration`).
- **Storage:** `localStorage['jezzball-progress-v1']`; Yandex Player data key `progress`.
- **Logs:** browser console/network; проектного file logger нет.

## Файлы поставки
| Файл | SHA-256 | Назначение |
|---|---|---|
| index(2).html | 4409e8e020e1722ed1b1c17a7400fb1466fa2861dbfb65d6d000709ed15fc2bc | DOM/entry |
| script(1).js | 13a792df28a6f9faa5e4b263d171be0a08a5df95d4c70d6669e0400818c9e03b | Game logic/data/integrations |
| style(1).css | 8f215fa727d27c2c9ca2e9900626ebd190ee256281dc2fe4d83be45dd3b67152 | Responsive UI/styles |

## Структура и системы
| Система | Основные идентификаторы | Статус |
|---|---|---|
| Bootstrap и offline fallback | FEAT-BOOT-001 | index(2).html; script(1).js:initYandexSdk/loadProgress |
| Главное меню | FEAT-UI-001 | index(2).html#main-menu; style(1).css .start-screen |
| Карта глав | FEAT-PROG-001 | script(1).js:chapters/TOTAL_LEVELS/renderChapterScreens |
| Захват пространства | FEAT-CORE-001 | script(1).js:getLineCastResult/getPotentialSplitResultFromCast |
| Ввод | FEAT-INPUT-001 | index(2).html#jezzCanvas aria-label; script(1).js pointer/key handlers |
| Шары, препятствия и штрафы | FEAT-COLL-001 | script(1).js BALL_RADIUS/MAX_PENALTIES/obstacles |
| 100 уровней | FEAT-LEVEL-001 | script(1).js:TOTAL_LEVELS/LEVEL_CONFIGS/runDevLevelAudit |
| Победа, звезды, награды | FEAT-WIN-001 | script(1).js:completeJezzLevel/LEVEL_REWARDS/STAR_REWARDS |
| Поражение и жизни | FEAT-FAIL-001 | script(1).js:MAX_LIVES/LIFE_RESTORE_MS/loseSelectedLevel |
| Локальное сохранение | FEAT-SAVE-001 | script(1).js:SAVE_KEY/serializeProgress/loadProgress |
| Облачное сохранение | FEAT-SAVE-002 | script(1).js:loadCloudProgress/saveCloudProgress |
| Экономика | FEAT-ECON-001 | script(1).js:SHOP_*_PRICES/STAR_REWARDS/MAX_LIVES |
| Бустеры | FEAT-BOOST-001 | script(1).js:BOOSTER_ITEMS/useLevelBooster |
| Магазин, сундуки, скины | FEAT-SHOP-001 | index(2).html#inventoryModal; script(1).js SHOP_* |
| Достижения | FEAT-ACH-001 | script(1).js:ACHIEVEMENTS |
| Реклама | FEAT-ADS-001 | script(1).js:INTERSTITIAL_*/showFullscreenAd*/showRewarded* |
| Внутриигровые покупки | FEAT-IAP-001 | script(1).js:SHOP_IAP_REWARDS/processPendingYandexPurchases |
| Yandex Games SDK | FEAT-PLAT-001 | index(2).html /sdk.js; script(1).js:initYandexSdk |
| Лидерборд | FEAT-LB-001 | script(1).js:LEADERBOARD_NAME/submitLeaderboardScore |
| Локализация RU | FEAT-LOC-001 | script(1).js:SUPPORTED_LANGUAGES/messages |
| Responsive layout | FEAT-RESP-001 | style(1).css media queries; script(1).js viewport sync |
| Доступность интерфейса | FEAT-ACC-001 | index(2).html aria-*; script(1).js modalFocusStack |
| Производительность | FEAT-PERF-001 | script(1).js:LOW_PERFORMANCE_FRAME_INTERVAL/perfState |
| Финальный экран | FEAT-FINAL-001 | index(2).html#final-screen; script(1).js action final |

## Главы
| ID | Название | Уровни |
|---|---|---|
| 1 | Солнечная поляна | 1–10 |
| 2 | Тихая деревня | 11–20 |
| 3 | Золотые луга | 21–30 |
| 4 | Шепот реки | 31–40 |
| 5 | Лазурный берег | 41–50 |
| 6 | Тайна глубин | 51–60 |
| 7 | Городские огни | 61–70 |
| 8 | Неоновый ритм | 71–80 |
| 9 | Звёздный путь | 81–90 |
| 10 | Врата света | 91–100 |

## User flows
1. First launch → main menu → chapter 1 → level 1 → draw lines → complete/fail → reward/retry → progression.
2. Chapter map → shop → purchase/equip → return.
3. Chapter map/level → achievements → claim reward.
4. Local progress → optional cloud merge → leaderboard.

## External dependencies
- `/sdk.js` and Yandex Games APIs: Player, Payments, Leaderboards, Ads, Gameplay/Loading API, banner, server time.
- Browser APIs: Canvas 2D, localStorage, requestAnimationFrame, ResizeObserver, Fullscreen/Visibility, Pointer Events.
- 36 concrete image paths under `objects/` are referenced but absent.

## Unknowns
Production archive, original filenames, license/ownership of assets, browser support matrix, moderation state, real catalog/product IDs and prices, exact accessibility/performance requirements, audio design, analytics/privacy policy.

## Source links
- [HTML](../index%282%29.html)
- [JavaScript](../script%281%29.js)
- [CSS](../style%281%29.css)
