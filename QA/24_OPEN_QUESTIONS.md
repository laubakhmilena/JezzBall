# 24 — Open Questions

| ID | Question | Why important | Component | Current assumption | Wrong-assumption risk | Resolution |
|---|---|---|---|---|---|---|
| Q-001 | Как выглядит полный релизный архив и были ли имена изменены загрузчиком? | Определяет BUG-001 | Packaging | Суффиксы появились при передаче | High | Предоставить ZIP/репозиторий |
| Q-002 | Где каталог objects и лицензии assets? | Визуальная полнота | Assets | Он не был загружен | High | Передать полный tree |
| Q-003 | Являются ли ads/IAP/cloud release scope? | Критический финансовый риск | Platform | Да, по коду | Critical | Yandex sandbox/account/catalog |
| Q-004 | Как рассчитываются 1/2/3 звезды? | Оракул победы/награды | Game design | По штрафам/проценту в коде | Medium | Зафиксировать rule spec |
| Q-005 | Какие browsers/devices/min viewport поддерживаются? | Compatibility gate | Platform | Modern desktop/mobile | High | Define matrix |
| Q-006 | Нужны ли звук, настройки, controller? | N/A vs missing feature | Product | Не входят | Medium | Confirm scope |
| Q-007 | Какие FPS/load targets? | Performance verdict | Performance | Не заданы | Medium | Define device-based targets |
| Q-008 | Должны ли IAP lives превышать MAX_LIVES? | Economy correctness | IAP | Вероятно clamp/bonus | High | Explicit rule + tests |
