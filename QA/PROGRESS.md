# QA progress

| Фаза | Статус | Завершено / решение | Ограничения |
|---|---|---|---|
| 1. Исследование | DONE | Проанализированы HTML/CSS/JS, 24 функции, 10 глав, 100 уровней, Yandex интеграции | Нет README/git/assets |
| 2. Сборка/запуск | DONE | `node --check` PASS; direct package FAIL; runtime-copy создан; Chromium smoke выполнен | Имена и assets отсутствуют |
| 3–5. Модель/стратегия/план | DONE | Созданы 03–08 | Требования выведены из кода/UI |
| 6–9. Checklists/cases/suites/charters | DONE | 20 checklist файлов, 94 test cases, smoke/regression, 15 charters | Большая часть NOT_RUN |
| 10. Ручное тестирование | PARTIAL | 16 browser checks PASS + 2 package checks FAIL | Нет полного контента/платформы |
| 11–15. Bugs/a11y/perf/loc/traceability | DONE | 2 подтвержденных дефекта поставки; потенциальные риски отделены | Нет real SDK, devices, long run |
| 16–20. Reports/workflow/audit | DONE | Verdict NO-GO; документация проверена | Нужен retest полной поставки |

## Предположения
- `INFERRED`: целевая платформа — Yandex Games/современные web browsers по `/sdk.js` и YaGames API.
- `UNKNOWN`: production URL, требования к FPS, поддерживаемые browsers/devices, бизнес-цены IAP, ожидаемый звук.
- Runtime-copy — только QA-инструмент; это не исправление проекта.

## Созданные материалы
Все обязательные файлы `QA/00…25`, 20 чек-листов, CSV, screenshots, logs и безопасные scripts в `QA/work`.

## Фактические проверки
16 PASS, 2 FAIL; 10 platform tests BLOCKED; остальные design cases NOT_RUN. См. [19_TEST_EXECUTION_REPORT.md](19_TEST_EXECUTION_REPORT.md).
