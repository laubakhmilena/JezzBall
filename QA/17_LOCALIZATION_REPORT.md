# 17 — Localization Report

**Supported languages:** `ru` only. Unsupported Yandex language normalizes to Russian. Static DOM and dynamic strings are mostly localized through `messages.ru`, but many shop/achievement definitions are hardcoded Russian; acceptable for ru-only, technical debt for expansion.

## Results
- Cyrillic rendering: observed PASS in Chromium screenshots.
- Raw keys/mixed language: no raw localization keys observed in executed screens; full screen sweep NOT_RUN.
- Clipping/wrapping/large values: NOT_RUN beyond default values.
- Text on missing background images: UNKNOWN due absent assets.
- Terminology: generally consistent; use “Звёзды” consistently (code contains both `Звезды` and UI `Звёзды`).

## Glossary
| RU | EN/internal concept | Definition |
|---|---|---|
| Игра | game | JezzBall |
| Глава | chapter | Progression group of 10 levels |
| Уровень | level | Playable stage |
| Захвачено | captured | Captured field percentage |
| Штраф | penalty | Line collision penalty; 3 fails |
| Жизнь | life | Attempt resource |
| Монета | coin | Soft currency |
| Бустер | booster | Consumable modifier |
| Сундук | chest | Reward container |
| Звезда | star | Performance/progression score |
