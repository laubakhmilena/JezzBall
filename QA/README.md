# QA-комплект JezzBall

**Проверяемая поставка:** `SRC-20260717-4409e8e0-13a792df-8f215fa7`  
**Дата:** 2026-07-17  
**Release verdict:** **NO-GO для поставленного пакета** — исходный пакет не содержит файлов под именами, указанными в HTML, и не содержит каталога графических ресурсов. После безопасного переименования копий в `QA/work/runtime-copy` core bootstrap и ограниченный smoke прошли, но критический путь до победы, все 100 уровней и реальные сервисы Yandex не проверены.

## С чего начать
1. Откройте [20_RELEASE_READINESS_REPORT.md](20_RELEASE_READINESS_REPORT.md).
2. Исправьте состав релизного архива по [BUG-001](14_BUG_REPORTS.md#bug-001) и [BUG-002](14_BUG_REPORTS.md#bug-002), не используя `QA/work/runtime-copy` как релиз.
3. Выполните [11_SMOKE_SUITE.md](11_SMOKE_SUITE.md), затем критический раздел [12_REGRESSION_SUITE.md](12_REGRESSION_SUITE.md).

## Навигация
- Обзор продукта: [03_PRODUCT_OVERVIEW.md](03_PRODUCT_OVERVIEW.md)
- Функции и риски: [04_FEATURE_MATRIX.md](04_FEATURE_MATRIX.md), [07_RISK_REGISTER.md](07_RISK_REGISTER.md)
- План: [08_TEST_PLAN.md](08_TEST_PLAN.md)
- Чек-листы: [09_MASTER_CHECKLIST.md](09_MASTER_CHECKLIST.md), [`checklists/`](checklists/)
- Тест-кейсы: [10_TEST_CASES.md](10_TEST_CASES.md), [10_TEST_CASES.csv](10_TEST_CASES.csv)
- Баги: [14_BUG_REPORTS.md](14_BUG_REPORTS.md)
- Доказательства: [`evidence/`](evidence/); логи: [`logs/`](logs/)
- Итог выполнения: [19_TEST_EXECUTION_REPORT.md](19_TEST_EXECUTION_REPORT.md)

## Быстрые маршруты
### У меня 10 минут
Проверьте `TC-BUILD-001`, `TC-ASSET-001`, затем Smoke: загрузка → меню → глава → уровень 1 → линия → restart → выход → reload. Просмотрите console/network.

### Я изменил игровую механику
Запустите `Critical Regression`, тесты `TC-CORE-*`, `TC-COLL-*`, `TC-WIN-*`, затронутые уровни и соседние уровни сложности; повторите `auditJezzBallLevels` и ручной playthrough.

### Я исправил баг
Повторите точные шаги баг-репорта на чистом запуске, сохраните новое evidence, выполните локальную регрессию связанных Feature/Risk ID и обновите CSV/traceability/known issues.

### Я готовлю релиз
Чистый полный архив → BVT → полный Smoke → Critical/Core regression → сохранения → Yandex sandbox → accessibility/compatibility → long session → [release readiness](20_RELEASE_READINESS_REPORT.md).

## Что фактически не проверено
Полное прохождение и победа, поражение через три штрафа, уровни 2–100 вручную, реальные ads/IAP/cloud/leaderboard, физические мобильные устройства, контроллер, звук (аудиосистема не обнаружена), длительная производительность и полноценная кроссбраузерность.
