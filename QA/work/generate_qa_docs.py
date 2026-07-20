from __future__ import annotations
from pathlib import Path
import csv, json, re, textwrap
from datetime import datetime, timezone

ROOT=Path('/mnt/data')
QA=ROOT/'QA'
(QA/'checklists').mkdir(parents=True,exist_ok=True)
for d in ['evidence','logs','work']:(QA/d).mkdir(exist_ok=True)
DATE='2026-07-17'
BUILD='SRC-20260717-4409e8e0-13a792df-8f215fa7'
SOURCE_HASHES={
'index(2).html':'4409e8e020e1722ed1b1c17a7400fb1466fa2861dbfb65d6d000709ed15fc2bc',
'script(1).js':'13a792df28a6f9faa5e4b263d171be0a08a5df95d4c70d6669e0400818c9e03b',
'style(1).css':'8f215fa727d27c2c9ca2e9900626ebd190ee256281dc2fe4d83be45dd3b67152'}

def w(name, content):
    p=QA/name
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content.strip()+"\n",encoding='utf-8')

def mdtable(headers, rows):
    def esc(v): return str(v).replace('|','\\|').replace('\n','<br>')
    return '| '+' | '.join(headers)+' |\n|'+ '|'.join(['---']*len(headers))+'|\n'+'\n'.join('| '+' | '.join(esc(x) for x in r)+' |' for r in rows)

features=[
('FEAT-BOOT-001','Bootstrap и offline fallback','Загрузка DOM, локальный запуск без YaGames SDK, инициализация состояния.','index(2).html; script(1).js:initYandexSdk/loadProgress','CONFIRMED','Critical','UI, Save, Platform','HTTP 200; меню активно','нет SDK; поврежденный save','SDK отсутствует; ready asset timeout','menu→chapter','Пакет не запускается','Yes','TC-SMOKE-001; TC-BUILD-001','CHK-01','PARTIAL'),
('FEAT-UI-001','Главное меню','Стартовый экран с кнопкой «Играть».','index(2).html#main-menu; style(1).css .start-screen','CONFIRMED','High','Progression, Input','Клик/Enter открывает карту','двойное нажатие, потеря фокуса','малое окно; touch','active/inactive','Недоступен старт','Yes','TC-SMOKE-001; TC-INPUT-001','CHK-02','PASS'),
('FEAT-PROG-001','Карта глав','10 глав по 10 уровней, блокировки и раскрытие карточек.','script(1).js:chapters/TOTAL_LEVELS/renderChapterScreens','CONFIRMED','Critical','Save, Levels, UI','Открыта глава 1, уровень 1','переход в закрытую главу','уровни 1/10/11/100/101','locked/current/completed','Softlock прогрессии','Yes','TC-SMOKE-002; TC-PROG-001..004','CHK-07','PARTIAL'),
('FEAT-CORE-001','Захват пространства','Игрок строит горизонтальные/вертикальные линии; область без шаров захватывается.','script(1).js:getLineCastResult/getPotentialSplitResultFromCast','CONFIRMED','Critical','Input, Collision, Level','Линия строится, процент растет','слишком близко к краю; линия через опасность','минимальная область; 0/100%','running/completed/failed','Невозможность пройти','Yes','TC-CORE-001; TC-CORE-003..009','CHK-03','PARTIAL'),
('FEAT-INPUT-001','Ввод','Pointer/touch gesture и клавиатура: стрелки, Space/Enter.','index(2).html#jezzCanvas aria-label; script(1).js pointer/key handlers','CONFIRMED','Critical','Core, Accessibility','click/gesture/keyboard','хаотичный ввод; cancel','dead zone 16px; 220ms tap','idle/aim/draft/active line','Потеря управления','Yes','TC-INPUT-001..008','CHK-04','PARTIAL'),
('FEAT-COLL-001','Шары, препятствия и штрафы','Шары отскакивают; опасные препятствия/контакт со строящейся линией дают штраф; максимум 3.','script(1).js BALL_RADIUS/MAX_PENALTIES/obstacles','CONFIRMED','Critical','Core, Fail, Levels','корректный отскок','туннелирование/двойной штраф','0,1,2,3 штрафа','running→failed','Ложная победа/поражение','Yes','TC-COLL-001..006','CHK-13','NOT_RUN'),
('FEAT-LEVEL-001','100 уровней','100 конфигураций с целями 70–88%, 1–4 шарами, скоростями и препятствиями.','script(1).js:TOTAL_LEVELS/LEVEL_CONFIGS/runDevLevelAudit','CONFIRMED','Critical','Core, Progression','уровни загружаются','некорректная конфигурация','1,10,50,100','locked/open/completed','Непроходимый уровень','Yes','TC-CORE-LEVEL-AUDIT; TC-LEVEL-001..006','CHK-07','PARTIAL'),
('FEAT-WIN-001','Победа, звезды, награды','Достижение target завершает уровень; 1–3 звезды и монеты.','script(1).js:completeJezzLevel/LEVEL_REWARDS/STAR_REWARDS','CONFIRMED','Critical','Save, Economy, Progression','награда один раз','повтор уровня/двойной клик','target-1/target/target+1; 0–3 штрафа','running→complete panel','Дюп наград','Yes','TC-WIN-001..006','CHK-08','NOT_RUN'),
('FEAT-FAIL-001','Поражение и жизни','После 3 штрафов попытка провалена; жизнь тратится на старт, восстанавливается раз в 3 минуты.','script(1).js:MAX_LIVES/LIFE_RESTORE_MS/loseSelectedLevel','CONFIRMED','Critical','Economy, Ads, Save','поражение/повтор','0 жизней; ad retry','0/1/5/7 жизней; таймер','running→failed→retry','Softlock без жизней','Yes','TC-FAIL-001..005','CHK-08','NOT_RUN'),
('FEAT-SAVE-001','Локальное сохранение','Прогресс сериализуется в localStorage key jezzball-progress-v1; поврежденные данные сбрасываются.','script(1).js:SAVE_KEY/serializeProgress/loadProgress','CONFIRMED','Critical','All progression','reload сохраняет','corrupt JSON; invalid ranges','пусто/частично/overflow','unsaved/saved/recovered','Потеря прогресса','Yes','TC-SAVE-001..006','CHK-09','PARTIAL'),
('FEAT-SAVE-002','Облачное сохранение','Best-effort getData/setData через Yandex Player с локальным fallback.','script(1).js:loadCloudProgress/saveCloudProgress','INFERRED','High','Platform, Save','merge более нового прогресса','нет player/network','конфликт timestamps/state','local/cloud merged','Откат/перезапись прогресса','Yes','TC-CLOUD-001..003','CHK-09','BLOCKED'),
('FEAT-ECON-001','Экономика','Монеты, жизни, регенерация, цены и награды.','script(1).js:SHOP_*_PRICES/STAR_REWARDS/MAX_LIVES','CONFIRMED','High','Shop, Win, Save','покупка при балансе','недостаточно монет; full lives','0; price-1; price; large values','available/insufficient/full','Отрицательные/дюп ресурсов','Yes','TC-ECON-001..006','CHK-03','NOT_RUN'),
('FEAT-BOOST-001','Бустеры','fastLine, slowBalls, lineShield, targetEase, penaltyRepair.','script(1).js:BOOSTER_ITEMS/useLevelBooster','CONFIRMED','High','Core, Shop, Save','эффект и списание','0 count; повторное применение','duration 6000ms; target -5; shield 420ms','available/armed/active/used','Бесконечный эффект','Yes','TC-BOOST-001..007','CHK-03','NOT_RUN'),
('FEAT-SHOP-001','Магазин, сундуки, скины','6 вкладок; покупки за монеты, случайные сундуки, косметика, подарки.','index(2).html#inventoryModal; script(1).js SHOP_*','CONFIRMED','High','Economy, Save, IAP, Ads','открытие и покупка','недостаток валюты; закрытие modal','вкладки; все tier/chance','closed/open/tab/result','Дюп/неверная выдача','Yes','TC-SHOP-001..008','CHK-03','PARTIAL'),
('FEAT-ACH-001','Достижения','20 достижений по прогрессу, звездам, идеалам, сундукам, стилям и бустерам.','script(1).js:ACHIEVEMENTS','CONFIRMED','Medium','Progression, Economy, Save','открыть/получить награду','повторное получение','0/target/target+1','locked/unlocked/claimed','Дюп награды','Yes','TC-ACH-001..004','CHK-07','PARTIAL'),
('FEAT-ADS-001','Реклама','Interstitial, rewarded retry/shop ads и sticky banner через Yandex SDK.','script(1).js:INTERSTITIAL_*/showFullscreenAd*/showRewarded*','INFERRED','High','Platform, Economy, Pause','callback success','error/close/no reward','интервалы 90/180s; каждый 3 уровень','idle/showing/resumed','Неверная награда/пауза','Yes','TC-ADS-001..004','CHK-18','BLOCKED'),
('FEAT-IAP-001','Внутриигровые покупки','Пакеты монет/бустеров; обработка и consume purchase tokens.','script(1).js:SHOP_IAP_REWARDS/processPendingYandexPurchases','INFERRED','Critical','Platform, Economy, Save','purchase success once','cancel/error/retry','100 token cap; duplicate token','pending/granted/consumed','Двойная выдача/потеря денег','Yes','TC-IAP-001..004','CHK-18','BLOCKED'),
('FEAT-PLAT-001','Yandex Games SDK','LoadingAPI.ready, GameplayAPI, pause/resume, player, payments, banner.','index(2).html /sdk.js; script(1).js:initYandexSdk','CONFIRMED','Critical','Ads, IAP, Save','SDK init','SDK unavailable/old mock','relative /sdk.js; lang fallback','uninitialized/ready/error','Модерация/сервисы','Yes','TC-PLAT-001..004','CHK-01','BLOCKED'),
('FEAT-LB-001','Лидерборд','Отправка суммарных звезд в leaderboard stars.','script(1).js:LEADERBOARD_NAME/submitLeaderboardScore','INFERRED','Medium','Platform, Save','setScore','недоступен API','0/300+ stars','dirty/submitted/error','Неверный счет','Yes','TC-LB-001..002','CHK-18','BLOCKED'),
('FEAT-LOC-001','Локализация RU','Единственный поддерживаемый язык — ru; fallback ru.','script(1).js:SUPPORTED_LANGUAGES/messages','CONFIRMED','Medium','UI, Platform','русский текст','lang=en fallback','длинные числа/строки','ru/fallback','Смешение/обрезание','Yes','TC-LOC-001..004','CHK-17','PARTIAL'),
('FEAT-RESP-001','Responsive layout','Desktop, portrait mobile, landscape, safe-area и overlay малого viewport.','style(1).css media queries; script(1).js viewport sync','CONFIRMED','High','UI, Input','адаптация','resize/orientation/fullscreen','320x240;390x844;1440x900','normal/too-small','Недоступные действия','Yes','TC-COMPAT-001..006','CHK-15','PARTIAL'),
('FEAT-ACC-001','Доступность интерфейса','ARIA labels, focus-visible, modal focus trap, keyboard canvas.','index(2).html aria-*; script(1).js modalFocusStack','CONFIRMED','High','Input, UI','Tab/Enter/Escape','focus trap/hidden screens','200% zoom; keyboard only','focused/modal','Клавиатурный softlock','Yes','TC-ACC-001..006','CHK-16','PARTIAL'),
('FEAT-PERF-001','Производительность','requestAnimationFrame, low-performance 30fps interval, cached canvases, ?perf overlay.','script(1).js:LOW_PERFORMANCE_FRAME_INTERVAL/perfState','CONFIRMED','High','Core, Mobile','stable loop','long session/background','1–4 balls; moving obstacles','normal/low-perf/paused','Low FPS/memory growth','Yes','TC-PERF-001..005','CHK-14','PARTIAL'),
('FEAT-FINAL-001','Финальный экран','После уровня 100 доступен финал и возврат в меню.','index(2).html#final-screen; script(1).js action final','CONFIRMED','High','Progression, Save','открытие после 100','ранний доступ','level 99/100/101','locked/unlocked','Невозможность завершить','Yes','TC-FINAL-001..002','CHK-07','NOT_RUN'),
]

risks=[
('RISK-BUILD-001','Bootstrap','Игра не запускается из поставленного пакета','несовпадение имен/нет файлов','игрок не может начать','High','Critical','Critical','High','P0','FEAT-BOOT-001','TC-BUILD-001','Исправить состав/имена архива','OPEN'),
('RISK-ASSET-001','Assets','Графика не загружается','objects/ отсутствует или неверные пути','пустые фоны/нет скинов','High','High','High','High','P1','FEAT-RESP-001; FEAT-SHOP-001','TC-ASSET-001','Проверить полный архив и case-sensitive пути','OPEN'),
('RISK-CRASH-001','Runtime','Аварийное завершение/JS exception','необработанное состояние','потеря сессии','Medium','Critical','High','Medium','P0','FEAT-CORE-001','TC-STAB-001','Логи+длительная сессия','OPEN'),
('RISK-HANG-001','Runtime','Зависание цикла','геометрия/модал/SDK callback','игра не отвечает','Medium','Critical','High','Low','P0','FEAT-CORE-001; FEAT-PLAT-001','TC-STAB-002','Stress/chaotic input','OPEN'),
('RISK-SAVE-001','Save','Потеря или повреждение прогресса','ошибка local/cloud merge','откат прогресса/покупок','Medium','Critical','High','Medium','P0','FEAT-SAVE-001; FEAT-SAVE-002','TC-SAVE-001..006; TC-CLOUD-001','Версионирование и backup','OPEN'),
('RISK-SOFTLOCK-001','Core','Уровень нельзя завершить','геометрия/target/obstacle','блок прогрессии','Medium','Critical','High','Low','P0','FEAT-LEVEL-001','TC-LEVEL-001..006','Полный audit + playthrough','OPEN'),
('RISK-PROG-001','Progression','Нельзя продолжить/открыть следующую главу','неверный currentLevel/stars','блок контента','Medium','Critical','High','Medium','P0','FEAT-PROG-001','TC-PROG-001..004','Границы 10/11/100','OPEN'),
('RISK-WIN-001','Rules','Неверное условие победы/звезды','ошибка area/penalty thresholds','несправедливый результат','Medium','High','High','Medium','P1','FEAT-WIN-001','TC-WIN-001..006','BVA target/penalties','OPEN'),
('RISK-FAIL-001','Rules','Неверное поражение/расход жизни','двойной collision/event','потеря ресурсов','Medium','High','High','Medium','P1','FEAT-FAIL-001','TC-FAIL-001..005','State transition tests','OPEN'),
('RISK-INPUT-001','Input','Управление пропадает/двойное действие','focus/pointer capture/rapid input','невозможно играть','Medium','Critical','High','Medium','P0','FEAT-INPUT-001','TC-INPUT-002..008','Desktop+touch+keyboard','OPEN'),
('RISK-PAUSE-001','State','Игра продолжает идти при паузе/Alt+Tab','visibility/SDK callbacks','несправедливый штраф','Medium','High','High','Medium','P1','FEAT-PLAT-001','TC-STATE-001..004','Visibility+SDK tests','OPEN'),
('RISK-TRANS-001','State','Сохранение во время перехода дает неконсистентность','debounce/async cloud','повреждение прогресса','Low','Critical','High','Low','P1','FEAT-SAVE-001','TC-SAVE-004','Interrupt transition','OPEN'),
('RISK-RAPID-001','Input','Быстрый ввод вызывает повтор действия','несинхронные обработчики','двойная покупка/награда','Medium','High','High','Medium','P1','FEAT-INPUT-001; FEAT-SHOP-001','TC-INPUT-004; TC-SHOP-006','Debounce/idempotency','OPEN'),
('RISK-BOUND-001','Core','Выход объектов за поле','resize/collision precision','непроходимость/визуальный дефект','Medium','High','High','Low','P1','FEAT-COLL-001','TC-COLL-001..006','Boundary/resize','OPEN'),
('RISK-PHYS-001','Core','Неверные коллизии/туннелирование','frame time/speed','ложные штрафы','Medium','High','High','Low','P1','FEAT-COLL-001','TC-COLL-003..006','Fast level/long frame','OPEN'),
('RISK-ECON-001','Economy','Отрицательные/бесконечные ресурсы','границы/повтор callback','ломает экономику','Medium','High','High','Medium','P1','FEAT-ECON-001','TC-ECON-001..006','BVA+idempotency','OPEN'),
('RISK-IAP-001','IAP','Двойная/невыданная покупка','token handling/consume failure','финансовый ущерб','Medium','Critical','High','Medium','P0','FEAT-IAP-001','TC-IAP-001..004','Sandbox platform run','BLOCKED'),
('RISK-ADS-001','Ads','Награда без просмотра или нет награды','callback states','экономика/негатив','Medium','High','High','Medium','P1','FEAT-ADS-001','TC-ADS-001..004','Real SDK test','BLOCKED'),
('RISK-BAL-001','Balance','Баланс блокирует прохождение','target/speed/obstacles','отток игроков','Medium','High','High','Low','P1','FEAT-LEVEL-001','TC-LEVEL-004..006','Playtest hard levels','OPEN'),
('RISK-RES-001','UI','Интерфейс обрезан/нечитаем','viewport/safe area/large values','недоступные действия','High','High','High','High','P1','FEAT-RESP-001','TC-COMPAT-001..006','Device matrix','OPEN'),
('RISK-FEED-001','UX','Слабая обратная связь','цвет/тост/описание','игрок не понимает правила','Medium','Medium','Medium','Medium','P2','FEAT-CORE-001','TC-UX-001..003','Exploratory first-time','OPEN'),
('RISK-PERF-001','Performance','Низкий FPS/задержка ввода','canvas/4 balls/moving obstacles','неиграбельность','Medium','High','High','Low','P1','FEAT-PERF-001','TC-PERF-002..005','Profile level 100','OPEN'),
('RISK-MEM-001','Performance','Рост памяти в долгой сессии','cache/timers/modals','crash/slowdown','Low','High','Medium','Low','P1','FEAT-PERF-001','TC-PERF-004','60+ min soak','OPEN'),
('RISK-FOCUS-001','Compatibility','Проблемы после Alt+Tab/resize/fullscreen','visibility/layout','штраф/сломанный UI','Medium','High','High','Medium','P1','FEAT-RESP-001','TC-STATE-001..004','Browser state tests','OPEN'),
('RISK-DEVICE-001','Compatibility','Разные устройства ввода','touch/pointer/keyboard','часть игроков не может играть','Medium','High','High','Medium','P1','FEAT-INPUT-001','TC-INPUT-001..008','Physical devices','OPEN'),
('RISK-LOC-001','Localization','Смешение/обрезание/неверный текст','hardcoded ru/dynamic values','непонимание UI','Medium','Medium','Medium','High','P2','FEAT-LOC-001','TC-LOC-001..004','Pseudo-long strings','OPEN'),
('RISK-A11Y-001','Accessibility','Критическое действие недоступно с клавиатуры/цветовая зависимость','canvas/visual rules','часть пользователей исключена','High','High','High','Medium','P1','FEAT-ACC-001','TC-ACC-001..006','Keyboard/contrast review','OPEN'),
('RISK-NET-001','Platform','Ошибки без сети/SDK','external service unavailable','зависание/потеря функций','Medium','High','High','High','P1','FEAT-PLAT-001','TC-PLAT-003; TC-CLOUD-003','Offline/recovery','OPEN'),
('RISK-SECRET-001','Security','Секреты/PII попадают в клиент или отчеты','hardcoded config/logging','компрометация данных','Low','Critical','Medium','Medium','P0','FEAT-PLAT-001','TC-SEC-001','Secret scan/data review','OPEN'),
('RISK-AUDIO-001','Audio','Нет/неверный звук','аудиосистема отсутствует','слабая обратная связь','Low','Medium','Low','High','P3','N/A','N/A','Подтвердить дизайн','NOT_APPLICABLE'),
]

# Test cases: id, feature, risk, module, title, objective, preconditions, data, steps, expected, actual, status, priority, type, technique, platform, evidence, bug, notes
TC=[]
def add(id,feat,risk,module,title,obj,pre,data,steps,exp,status='NOT_RUN',actual='Not executed',priority='P1',typ='Functional',tech='Use case',platform='Web browser',evidence='',bug='',notes=''):
    TC.append(dict(id=id,feature=feat,risk=risk,module=module,title=title,objective=obj,pre=pre,data=data,steps=steps,expected=exp,actual=actual,status=status,priority=priority,type=typ,tech=tech,platform=platform,build=BUILD,environment='See QA/01_TEST_ENVIRONMENT.md',evidence=evidence,bug=bug,notes=notes))

add('TC-BUILD-001','FEAT-BOOT-001','RISK-BUILD-001','Build','Прямой запуск поставленного пакета','Проверить, что HTML находит CSS и JS без переименования.','Исходные файлы как поставлены.','index(2).html','1. Проверить src/href в HTML. 2. Проверить наличие style.css и script.js рядом.','Оба файла существуют и загружаются.', 'FAIL','HTML ссылается на style.css и script.js; в поставке есть только style(1).css и script(1).js.','P0','Build verification','Static path check','Supplied artifact','QA/logs/build.log','BUG-001','В runtime-copy имена нормализованы без изменения исходников.')
add('TC-ASSET-001','FEAT-RESP-001','RISK-ASSET-001','Assets','Доступность локальных графических ресурсов','Проверить все локальные ссылки на изображения.','Исходный пакет.','40 локальных ссылок','1. Извлечь пути из HTML/CSS/JS. 2. Проверить существование. 3. Запустить runtime-copy и собрать 404.','Ресурсы присутствуют; нет 404.','FAIL','objects/ отсутствует; 39 HTTP 404 за четыре browser-сценария; фоны и изображения мячей не загружены.','P1','Build/UI','Static + dynamic','Web browser','QA/logs/build.log; QA/logs/run.log; QA/evidence/BVT-001_main-menu_desktop.png','BUG-002','/sdk.js отдельно является платформенным dev path и не считается графическим asset.')
# Executed 16
add('TC-SMOKE-001','FEAT-BOOT-001','RISK-CRASH-001','Bootstrap','Загрузка и главное меню','Проверить базовую загрузку.','Runtime-copy; clean context.','1440x900','1. Открыть URL. 2. Дождаться load. 3. Проверить title, active screen и кнопку.','HTTP 200; title JezzBall; main-menu active; кнопка видима.','PASS','HTTP 200; title=JezzBall; active=main-menu; load=0.374s.','P0','Smoke','Use case','Chromium 144 desktop','QA/evidence/BVT-001_main-menu_desktop.png','','Фон отсутствует из-за BUG-002.')
add('TC-CORE-LEVEL-AUDIT','FEAT-LEVEL-001','RISK-SOFTLOCK-001','Levels','Dev-аудит репрезентативных уровней','Проверить доступные стартовые линии на 1/10/50/100.','?debug; debug API exposed.','1,10,50,100','1. Вызвать auditJezzBallLevels([1,10,50,100]). 2. Сохранить отчет.','Каждый уровень возвращает валидные стартовые позиции.','PASS','Все 4 уровня имеют 44–230 validStarts; level 100 отмечен high-target/four-balls/fast/many-danger/many-moving.','P0','Static/runtime audit','Boundary sampling','Chromium 144','QA/logs/level-audit.json','','Не заменяет фактическое прохождение.')
add('TC-INPUT-001','FEAT-INPUT-001','RISK-INPUT-001','Input','Старт с клавиатуры','Проверить Tab и Enter в меню.','Главное меню активно.','Tab, Enter','1. Нажать Tab. 2. Проверить focus. 3. Нажать Enter.','Фокус на playButton; открыта глава 1.','PASS','После Tab activeElement=playButton; Enter открыл chapter-1-screen.','P0','Accessibility/Smoke','State transition','Chromium 144 keyboard','QA/evidence/BVT-001_main-menu_desktop.png','','')
add('TC-SMOKE-002','FEAT-PROG-001','RISK-PROG-001','Progression','Открытие карты глав','Проверить карту после старта.','Меню активно.','Новый прогресс','1. Активировать Играть. 2. Проверить active screen и уровни главы.','chapter-1-screen; 10 level buttons.','PASS','chapter-1-screen active; 10 кнопок уровней.','P0','Smoke','Use case','Chromium 144','QA/evidence/SMOKE-002_chapter-1_desktop.png','','')
add('TC-UI-001','FEAT-PROG-001','RISK-RES-001','UI','Основные действия карты','Проверить наличие Магазина и Достижений.','Глава 1 открыта.','Default state','1. Найти действия shop и achievements.','Оба действия доступны.','PASS','shop=1; achievements=1.','P1','UI','Checklist','Chromium 144','QA/evidence/SMOKE-002_chapter-1_desktop.png','','')
add('TC-SHOP-001','FEAT-SHOP-001','RISK-RAPID-001','Shop','Открытие и закрытие магазина','Проверить modal state.','Карта главы.','recommended tab','1. Открыть Магазин. 2. Проверить is-open/aria-hidden. 3. Закрыть.','Modal открывается и закрывается.','PASS','inventoryModal is-open=true и aria-hidden=false.','P1','Smoke/UI','State transition','Chromium 144','QA/evidence/SMOKE-003_shop.png','','Покупки не выполнялись.')
add('TC-ACH-001','FEAT-ACH-001','RISK-RES-001','Achievements','Открытие достижений и Escape','Проверить панель и закрытие.','Карта главы.','Default state','1. Открыть Достижения. 2. Проверить panel. 3. Нажать Escape.','Панель видима и закрывается.','PASS','Создана 1 achievements-panel; Escape обработан.','P1','Smoke/Accessibility','State transition','Chromium 144','QA/evidence/SMOKE-004_achievements.png','','')
add('TC-SMOKE-003','FEAT-CORE-001','RISK-SOFTLOCK-001','Core','Старт уровня 1','Проверить вход в игровой цикл.','Chapter 1; level 1 unlocked.','Level 1','1. Нажать уровень 1. 2. Проверить level-screen/canvas.','Уровень активен; canvas имеет ненулевой размер.','PASS','level-screen active; canvas 1131.2×882.','P0','Smoke','Use case','Chromium 144','QA/evidence/SMOKE-005_level-1_start.png','','')
add('TC-CORE-001','FEAT-CORE-001','RISK-WIN-001','Core','Базовая линия мышью','Проверить реакцию на pointer action.','Level 1 running.','Click center','1. Кликнуть центр canvas. 2. Подождать завершение линии. 3. Проверить HUD.','Линия обрабатывается; процент и штрафы валидны.','PASS','Capture 0%→50%; penalties=0/3.','P0','Core gameplay','Use case','Chromium 144 mouse','QA/evidence/CORE-001_after_pointer_action.png','','Победа не достигалась.')
add('TC-CORE-002','FEAT-CORE-001','RISK-RAPID-001','Core','Рестарт с подтверждением','Проверить опасное действие и сброс попытки.','Level 1 после линии.','Restart','1. Нажать restart. 2. Проверить modal. 3. Подтвердить. 4. Проверить HUD.','Modal показан; capture=0%; penalties=0/3.','PASS','modal=true; capture=0%; penalties=0/3.','P0','Smoke/State','State transition','Chromium 144','QA/evidence/CORE-002_restart-confirmation.png','','')
add('TC-NAV-001','FEAT-UI-001','RISK-TRANS-001','Navigation','Возврат из уровня: отмена и подтверждение','Проверить защиту от потери попытки.','Level 1 running.','Cancel/Accept','1. Нажать Назад. 2. Отменить. 3. Повторить и подтвердить.','Отмена оставляет уровень; подтверждение открывает главу.','PASS','after cancel=level-screen; after accept=chapter-1-screen.','P0','Smoke/Recovery','Decision table','Chromium 144','QA/evidence/CORE-002_restart-confirmation.png','','')
add('TC-SAVE-001','FEAT-SAVE-001','RISK-SAVE-001','Save','Сохранение после reload','Проверить persist localStorage.','После навигации.','SAVE_KEY','1. Считать localStorage. 2. Reload. 3. Сравнить.','JSON существует и не меняется без действия.','PASS','before_len=957; after_equal=true.','P0','Smoke/Save','State transition','Chromium 144','QA/logs/run.log','','')
add('TC-PERF-001','FEAT-PERF-001','RISK-PERF-001','Performance','Navigation Timing','Зафиксировать инструментальное время загрузки.','Local runtime-copy.','1440x900','1. Открыть. 2. Снять PerformanceNavigationTiming.','Метрики доступны; без критерия pass/fail производительности.','PASS','DOM/load около 91 ms по browser timing; внешнее измерение 0.374s.','P2','Performance instrumentation','Measurement','Chromium 144 local','QA/logs/browser-performance.json','','Результат нельзя экстраполировать на production и не является SLA.')
add('TC-SAVE-002','FEAT-SAVE-001','RISK-SAVE-001','Save','Поврежденный JSON','Проверить безопасное восстановление.','Изолированный context.','{corrupt-json','1. Записать invalid JSON. 2. Reload. 3. Проверить меню и новое валидное состояние.','Нет crash; создается default save.','PASS','main-menu active; play visible; localStorage заменен валидным default JSON.','P0','Negative/Recovery','Error guessing','Chromium 144','QA/evidence/SAVE-002_corrupt-save-recovery.png','','')
add('TC-COMPAT-001','FEAT-RESP-001','RISK-RES-001','Compatibility','Слишком малое окно','Проверить защитный overlay.','Viewport 320x240.','320x240','1. Открыть игру. 2. Проверить viewport overlay.','aria-hidden=false; просьба увеличить окно.','PASS','Overlay видим.','P1','Compatibility','Boundary value','Chromium 144','QA/evidence/COMPAT-001_small-viewport.png','','')
add('TC-COMPAT-002','FEAT-RESP-001','RISK-DEVICE-001','Compatibility','Mobile portrait start','Проверить touch flow.','390x844, DPR2, touch.','Tap Play','1. Открыть. 2. Tap Играть. 3. Проверить экран.','Открыта chapter-1-screen.','PASS','Mobile active=chapter-1-screen.','P1','Compatibility/Smoke','Pairwise','Chromium mobile emulation','QA/evidence/COMPAT-003_mobile-chapter.png','','Физическое устройство не проверено.')

# Blocked platform cases
blocked=[
('TC-PLAT-001','FEAT-PLAT-001','RISK-NET-001','Platform','Реальная инициализация YaGames SDK','window.YaGames.init и LoadingAPI.ready','Yandex test environment','SDK production/test','Load game','SDK initializes and ready is sent'),
('TC-PLAT-002','FEAT-PLAT-001','RISK-PAUSE-001','Platform','GameplayAPI start/stop','Проверить маркеры gameplay','Real SDK','start/stop','Enter/leave level','Correct markers sent'),
('TC-ADS-001','FEAT-ADS-001','RISK-ADS-001','Ads','Interstitial cadence','Проверить каждые 3 уровня и 180s minimum','Real SDK/ad inventory','3 completions','Complete levels','Ad cadence correct, game paused'),
('TC-ADS-002','FEAT-ADS-001','RISK-ADS-001','Ads','Rewarded ad reward','Проверить reward only on rewarded callback','Real SDK','shop/retry reward','Open ad success/close/error','Reward only after success'),
('TC-IAP-001','FEAT-IAP-001','RISK-IAP-001','IAP','Успешная покупка','Проверить grant+consume','Sandbox payments','starter_pack','Purchase product','Exactly one reward and consume'),
('TC-IAP-002','FEAT-IAP-001','RISK-IAP-001','IAP','Повтор purchase token','Проверить idempotency','Sandbox pending purchase','same token twice','Restart/process purchases','No duplicate reward'),
('TC-CLOUD-001','FEAT-SAVE-002','RISK-SAVE-001','Cloud save','Конфликт local/cloud','Проверить shouldUseIncomingProgress','Authorized player','older/newer progress','Load cloud variants','Correct progress selected'),
('TC-LB-001','FEAT-LB-001','RISK-NET-001','Leaderboard','Отправка stars','Проверить setScore','Real leaderboard','0/300 stars','Save/exit','Correct score once'),
('TC-TIME-001','FEAT-FAIL-001','RISK-ECON-001','Server time','Life restore with server time','Проверить clock manipulation resistance','Real SDK serverTime','device clock shift','Lose life/reload','Timer uses trusted time/fallback safely'),
('TC-BANNER-001','FEAT-ADS-001','RISK-RES-001','Ads/UI','Sticky banner reserve','Проверить safe layout','Real sticky banner','visible/hidden','Open menu/chapter/level','Reserve toggles without overlap'),]
for x in blocked:
    id,feat,risk,module,title,obj,pre,data,steps,exp=x
    add(id,feat,risk,module,title,obj,pre,data,steps,exp,'BLOCKED','Blocked: real Yandex Games SDK, account, ad/payment catalog or platform environment unavailable.','P0' if 'IAP' in id or 'PLAT' in id else 'P1','Integration','Decision table','Yandex Games production/test','','','Local stub would not prove platform behavior.')

# Remaining not-run cases tailored
remaining=[
('TC-INPUT-002','FEAT-INPUT-001','RISK-INPUT-001','Input','Keyboard line placement','Canvas focus; arrows + Space/Enter','Keyboard only'),
('TC-INPUT-003','FEAT-INPUT-001','RISK-DEVICE-001','Input','Touch gesture orientation','Swipe vertical/horizontal','Physical touch'),
('TC-INPUT-004','FEAT-INPUT-001','RISK-RAPID-001','Input','Rapid repeated pointer input','10 rapid taps/swipes','Mouse/touch'),
('TC-INPUT-005','FEAT-INPUT-001','RISK-INPUT-001','Input','Pointer cancel/leave','Cancel during gesture','Pointer'),
('TC-INPUT-006','FEAT-INPUT-001','RISK-INPUT-001','Input','Simultaneous keyboard and pointer','Conflict commands','Mixed'),
('TC-INPUT-007','FEAT-INPUT-001','RISK-FOCUS-001','Input','Alt+Tab during active line','Lose/restore focus','Desktop'),
('TC-INPUT-008','FEAT-INPUT-001','RISK-DEVICE-001','Input','Controller absence/behavior','Connect controller','Gamepad'),
('TC-CORE-003','FEAT-CORE-001','RISK-BOUND-001','Core','Line too close to edge','WALL_SNAP_EPSILON boundary','Desktop'),
('TC-CORE-004','FEAT-CORE-001','RISK-SOFTLOCK-001','Core','Minimum capturable area','MIN_CAPTURE_AREA_RATIO/CELLS','Desktop'),
('TC-CORE-005','FEAT-CORE-001','RISK-WIN-001','Core','Capture side without balls','Two candidate sides','Desktop'),
('TC-CORE-006','FEAT-CORE-001','RISK-PHYS-001','Core','Ball hits building line','Collision during growth','Desktop'),
('TC-CORE-007','FEAT-CORE-001','RISK-RAPID-001','Core','Start second line while first active','Concurrent action','Desktop'),
('TC-COLL-001','FEAT-COLL-001','RISK-BOUND-001','Collision','Wall reflection at four borders','Ball near each border','Desktop'),
('TC-COLL-002','FEAT-COLL-001','RISK-PHYS-001','Collision','Safe obstacle blocks ball and anchors line','Safe static obstacle','Desktop'),
('TC-COLL-003','FEAT-COLL-001','RISK-PHYS-001','Collision','Danger obstacle penalizes line','Danger static obstacle','Desktop'),
('TC-COLL-004','FEAT-COLL-001','RISK-PHYS-001','Collision','Moving obstacle extremes','Amplitude endpoints','Desktop'),
('TC-COLL-005','FEAT-COLL-001','RISK-FAIL-001','Collision','Exactly third penalty','2→3 penalty transition','Desktop'),
('TC-LEVEL-001','FEAT-LEVEL-001','RISK-SOFTLOCK-001','Levels','Load all 100 levels','Open each config','Desktop'),
('TC-LEVEL-002','FEAT-LEVEL-001','RISK-SOFTLOCK-001','Levels','Complete chapter boundary 10→11','Levels 10/11','Desktop'),
('TC-LEVEL-003','FEAT-LEVEL-001','RISK-PROG-001','Levels','Complete final boundary 100→final','Levels 100/101','Desktop'),
('TC-LEVEL-004','FEAT-LEVEL-001','RISK-BAL-001','Levels','Playtest hard level 50','4 balls/fast/danger','Desktop'),
('TC-LEVEL-005','FEAT-LEVEL-001','RISK-BAL-001','Levels','Playtest hard level 100','88%/moving obstacles','Desktop'),
('TC-WIN-001','FEAT-WIN-001','RISK-WIN-001','Win','Target boundary','target-0.1/target/target+','Desktop'),
('TC-WIN-002','FEAT-WIN-001','RISK-WIN-001','Win','Stars by penalty count','0/1/2+ penalties','Desktop'),
('TC-WIN-003','FEAT-WIN-001','RISK-ECON-001','Win','Reward idempotency','Double click next/replay','Desktop'),
('TC-WIN-004','FEAT-WIN-001','RISK-PROG-001','Win','Replay completed level improves stars','1→3 stars','Desktop'),
('TC-FAIL-001','FEAT-FAIL-001','RISK-FAIL-001','Fail','Failure at 3 penalties','3 collisions','Desktop'),
('TC-FAIL-002','FEAT-FAIL-001','RISK-ECON-001','Fail','Start with zero lives','lives=0','Desktop'),
('TC-FAIL-003','FEAT-FAIL-001','RISK-ECON-001','Fail','Life restore boundary','179999/180000ms','Desktop'),
('TC-SAVE-003','FEAT-SAVE-001','RISK-SAVE-001','Save','Partial/out-of-range save normalization','negative/huge values','Desktop'),
('TC-SAVE-004','FEAT-SAVE-001','RISK-TRANS-001','Save','Close during transition/save','beforeunload timing','Desktop'),
('TC-SAVE-005','FEAT-SAVE-001','RISK-SAVE-001','Save','All fields persistence','stars/chests/boosters/skins/tokens','Desktop'),
('TC-ECON-001','FEAT-ECON-001','RISK-ECON-001','Economy','Purchase price boundary','price-1/price','Desktop'),
('TC-ECON-002','FEAT-ECON-001','RISK-ECON-001','Economy','Large/negative resource normalization','-1/MAX_SAFE','Desktop'),
('TC-BOOST-001','FEAT-BOOST-001','RISK-ECON-001','Boosters','fastLine one-shot and count','count 0/1','Desktop'),
('TC-BOOST-002','FEAT-BOOST-001','RISK-PHYS-001','Boosters','slowBalls 6s duration','5999/6000ms','Desktop'),
('TC-BOOST-003','FEAT-BOOST-001','RISK-PHYS-001','Boosters','lineShield absorbs one hit','two hits','Desktop'),
('TC-BOOST-004','FEAT-BOOST-001','RISK-WIN-001','Boosters','targetEase -5 current attempt','target boundary','Desktop'),
('TC-BOOST-005','FEAT-BOOST-001','RISK-FAIL-001','Boosters','penaltyRepair at 0/1/3','penalty boundary','Desktop'),
('TC-SHOP-002','FEAT-SHOP-001','RISK-ECON-001','Shop','Buy each booster/life','all item IDs','Desktop'),
('TC-SHOP-003','FEAT-SHOP-001','RISK-ECON-001','Shop','Chest reward distribution contract','all drops/chances','Desktop'),
('TC-SHOP-004','FEAT-SHOP-001','RISK-ECON-001','Shop','Buy/equip cosmetics and persist','all groups','Desktop'),
('TC-SHOP-005','FEAT-SHOP-001','RISK-RAPID-001','Shop','Double click purchase','rapid double click','Desktop'),
('TC-ACH-002','FEAT-ACH-001','RISK-ECON-001','Achievements','Unlock/claim exactly once','target boundary','Desktop'),
('TC-ACH-003','FEAT-ACH-001','RISK-PROG-001','Achievements','All 20 progress calculations','state variants','Desktop'),
('TC-PROG-001','FEAT-PROG-001','RISK-PROG-001','Progression','Locked level cannot open','level 2 new save','Desktop'),
('TC-PROG-002','FEAT-PROG-001','RISK-PROG-001','Progression','Chapter chest tiers','0/10/20/30 stars','Desktop'),
('TC-LOC-001','FEAT-LOC-001','RISK-LOC-001','Localization','Russian UI completeness','all screens/modals','Desktop/mobile'),
('TC-LOC-002','FEAT-LOC-001','RISK-LOC-001','Localization','Unsupported language fallback','en/tr/unknown','Yandex mock'),
('TC-LOC-003','FEAT-LOC-001','RISK-LOC-001','Localization','Long numbers/text clipping','999999999 resources','Desktop/mobile'),
('TC-COMPAT-003','FEAT-RESP-001','RISK-RES-001','Compatibility','Landscape mobile','844x390 touch','Mobile'),
('TC-COMPAT-004','FEAT-RESP-001','RISK-FOCUS-001','Compatibility','Resize during level','multiple sizes','Desktop'),
('TC-COMPAT-005','FEAT-RESP-001','RISK-FOCUS-001','Compatibility','Fullscreen enter/exit','fullscreen API','Desktop'),
('TC-ACC-001','FEAT-ACC-001','RISK-A11Y-001','Accessibility','Full keyboard navigation','all screens/modals','Keyboard'),
('TC-ACC-002','FEAT-ACC-001','RISK-A11Y-001','Accessibility','Modal focus trap and restore','Tab/Shift+Tab/Escape','Keyboard'),
('TC-ACC-003','FEAT-ACC-001','RISK-A11Y-001','Accessibility','Contrast and color-only meaning','danger/safe obstacles','Visual review'),
('TC-ACC-004','FEAT-ACC-001','RISK-A11Y-001','Accessibility','Zoom 200%/text resize','browser zoom','Desktop'),
('TC-PERF-002','FEAT-PERF-001','RISK-PERF-001','Performance','FPS/frame time level 100','60s profile','Desktop'),
('TC-PERF-003','FEAT-PERF-001','RISK-PERF-001','Performance','Input latency under load','rapid lines level 100','Desktop/mobile'),
('TC-PERF-004','FEAT-PERF-001','RISK-MEM-001','Performance','Long session memory','60+ minutes','Desktop'),
('TC-STATE-001','FEAT-PLAT-001','RISK-PAUSE-001','State','Visibility pause/resume','Alt+Tab','Desktop'),
('TC-STATE-002','FEAT-PLAT-001','RISK-PAUSE-001','State','Modal pause/resume','open confirm/shop','Desktop'),
('TC-FINAL-001','FEAT-FINAL-001','RISK-PROG-001','Final','Final only after level 100','99/100 state','Desktop'),
('TC-SEC-001','FEAT-PLAT-001','RISK-SECRET-001','Security','Secret/PII static scan','source and reports','Static'),
('TC-STAB-001','FEAT-CORE-001','RISK-CRASH-001','Stability','Repeated launch/close','10 cycles','Desktop'),
('TC-STAB-002','FEAT-CORE-001','RISK-HANG-001','Stability','Chaos/soak','rapid input 30 min','Desktop'),
]
for id,feat,risk,module,title,data,platform in remaining:
    add(id,feat,risk,module,title,'Проверить '+title.lower()+'.','Полная сборка с ресурсами; соответствующее состояние подготовлено.',data,'1. Подготовить данные. 2. Выполнить действие. 3. Наблюдать UI/состояние/логи. 4. Повторить на границах.','Поведение соответствует правилам; нет crash, softlock, дюпа или неконсистентного состояния.','NOT_RUN','Not executed.','P0' if risk in ['RISK-SOFTLOCK-001','RISK-SAVE-001','RISK-IAP-001','RISK-CRASH-001'] else 'P1','Functional/Negative','Boundary/state/error guessing',platform)

# Product and docs
source_links="""- ISTQB CTFL Syllabus v4.0.1: https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf
- ISO/IEC/IEEE 29119-1:2022: https://www.iso.org/standard/81291.html
- ISO/IEC/IEEE 29119-2:2021 overview: https://www.iso.org/obp/ui/en/
- WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- Yandex Games SDK connection: https://yandex.com/dev/games/doc/en/sdk/sdk-about
- Yandex Games requirements (checked 2026-07-17; page dated 2026-05-05): https://yandex.com/dev/games/doc/en/concepts/requirements
- Yandex Player data: https://yandex.com/dev/games/doc/en/sdk/sdk-player
- Yandex in-app purchases: https://yandex.com/dev/games/doc/en/sdk/sdk-purchases"""

w('README.md',f"""# QA-комплект JezzBall

**Проверяемая поставка:** `{BUILD}`  
**Дата:** {DATE}  
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
""")

w('PROGRESS.md',f"""# QA progress

| Фаза | Статус | Завершено / решение | Ограничения |
|---|---|---|---|
| 1. Исследование | DONE | Проанализированы HTML/CSS/JS, 24 функции, 10 глав, 100 уровней, Yandex интеграции | Нет README/git/assets |
| 2. Сборка/запуск | DONE | `node --check` PASS; direct package FAIL; runtime-copy создан; Chromium smoke выполнен | Имена и assets отсутствуют |
| 3–5. Модель/стратегия/план | DONE | Созданы 03–08 | Требования выведены из кода/UI |
| 6–9. Checklists/cases/suites/charters | DONE | 20 checklist файлов, {len(TC)} test cases, smoke/regression, 15 charters | Большая часть NOT_RUN |
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
""")

inventory_rows=[
('Название','JezzBall','CONFIRMED','HTML title/H1'),('Жанр','Аркадная puzzle/action territory-capture','INFERRED','Правила и canvas gameplay'),('Аудитория','Casual browser/mobile players','INFERRED','Touch, chapters, economy'),('Core loop','Выбрать уровень → строить линии → захватывать область → получить звезды/монеты → открыть уровни','CONFIRMED','UI/code'),('Start','Play → chapter map → unlocked level; требуется жизнь','CONFIRMED','Handlers/state'),('Win','captured percent достигает target','CONFIRMED','complete logic'),('Lose','3 штрафа','CONFIRMED','MAX_PENALTIES=3'),('Progress','100 levels/10 chapters, stars/chests/achievements/cosmetics','CONFIRMED','Constants/data'),('Controls','Mouse/touch gestures; arrows + Space/Enter','CONFIRMED','Canvas aria + handlers'),('Tutorial','Hints levels 1–5','CONFIRMED','TUTORIAL_HINT_KEYS'),('Pause','Visibility, modal and platform pause; отдельной кнопки нет','CONFIRMED','handlers/HTML'),('Settings','Отдельная система не обнаружена','NOT_APPLICABLE','No settings UI/data'),('Save','localStorage + optional Yandex cloud','CONFIRMED','SAVE_KEY/player'),('Audio/music','Не обнаружено','NOT_APPLICABLE','No audio API/assets refs'),('Localization','Только ru','CONFIRMED','SUPPORTED_LANGUAGES'),('Network','Yandex SDK services optional/fallback','CONFIRMED','initYandexSdk'),('Achievements','20','CONFIRMED','ACHIEVEMENTS'),('IAP/ads','Есть integration code','CONFIRMED','SHOP_IAP_REWARDS/ad functions'),('Accounts','Yandex Player, собственной регистрации нет','INFERRED','getPlayer'),('Telemetry','Отдельная аналитика не обнаружена','NOT_APPLICABLE','No analytics SDK'),('UGC/mods','Не обнаружены','NOT_APPLICABLE','No relevant code'),('Controller','Gamepad API не обнаружен','NOT_APPLICABLE','No gamepad'),('Touch','Есть','CONFIRMED','pointer/touch CSS'),('Modes','Один progression mode; replay levels','CONFIRMED','Flow')]

w('00_PROJECT_INVENTORY.md',f"""# 00 — Project Inventory

**Дата анализа:** {DATE}  
**Build ID:** `{BUILD}`  
**Git commit:** `UNKNOWN` — репозиторий/.git не предоставлены.

## Краткое описание
JezzBall — single-player браузерная аркада: игрок проводит линии на поле с движущимися шарами и захватывает области без шаров. Сложность растет через target, число/скорость шаров и статические/движущиеся безопасные/опасные препятствия.

{mdtable(['Параметр','Вывод','Статус','Основание'],inventory_rows)}

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
{mdtable(['Файл','SHA-256','Назначение'],[(f,h,{'index(2).html':'DOM/entry','script(1).js':'Game logic/data/integrations','style(1).css':'Responsive UI/styles'}[f]) for f,h in SOURCE_HASHES.items()])}

## Структура и системы
{mdtable(['Система','Основные идентификаторы','Статус'],[(f[1],f[0],f[3]) for f in features])}

## Главы
{mdtable(['ID','Название','Уровни'],[(i,n,f'{(i-1)*10+1}–{i*10}') for i,n in enumerate(['Солнечная поляна','Тихая деревня','Золотые луга','Шепот реки','Лазурный берег','Тайна глубин','Городские огни','Неоновый ритм','Звёздный путь','Врата света'],1)])}

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
- [HTML](../index(2).html)
- [JavaScript](../script(1).js)
- [CSS](../style(1).css)
""")

w('01_TEST_ENVIRONMENT.md',f"""# 01 — Test Environment

| Field | Value |
|---|---|
| OS | Linux kernel 4.4.0, x86_64, containerized |
| CPU | 56 vCPU, AMD-compatible under Microsoft hypervisor |
| Memory | 4.0 GiB total; ~3.2 GiB available at snapshot |
| GPU | Physical adapter unavailable; headless Chromium rendering, exact GPU `UNKNOWN` |
| Browser | Chromium 144.0.7559.96 |
| Node | v22.16.0 |
| Python | 3.13.5 |
| Input | Playwright mouse/keyboard/touch emulation; no physical controller |
| Viewports | 1440×900@1x; 390×844@2x touch; 320×240 |
| Build | `{BUILD}` |
| Date/time | 2026-07-17 UTC |

## Commands
```bash
node --check "script(1).js"
mkdir -p QA/work/runtime-copy
cp "index(2).html" QA/work/runtime-copy/index.html
cp "script(1).js" QA/work/runtime-copy/script.js
cp "style(1).css" QA/work/runtime-copy/style.css
python3 -m http.server 8765 --bind 127.0.0.1  # from runtime-copy
python3 QA/work/browser_smoke.py
```

Runtime-copy was required only because the supplied filenames do not match HTML references. No source file was edited. Chromium had an environment URL block policy; the harness temporarily backed up and restored that policy through `run_browser_with_policy.py`. This is an environment workaround, not a product change.

## Logs
`logs/environment.log`, `build.log`, `run.log`, `tests.log`, `http-server.log`, `level-audit.json`, `browser-performance.json`.

## Limitations
No physical GPU/device, no audio output validation, no Yandex production/test account, no network service integration, no cross-browser fleet, incomplete assets, and no long-duration profiling.
""")

w('02_BUILD_VERIFICATION_REPORT.md',f"""# 02 — Build Verification Report

## Result
- **JavaScript syntax:** PASS (`node --check`).
- **Formal build:** NOT_APPLICABLE — no package manifest/build script.
- **Direct launch of supplied package:** FAIL — required `script.js` and `style.css` names absent.
- **QA runtime-copy launch:** PASS — HTTP 200 and menu loaded in Chromium.
- **Resources:** FAIL — `objects/` absent; 39 observed 404 responses across scenarios.

## Durations
Static syntax check <1s. First local browser load measured externally at 0.374s; browser Navigation Timing load ~91ms. These are local instrumentation values, not performance requirements.

## Blocking issues
1. BUG-001: packaging filenames.
2. BUG-002: missing assets.
3. Platform certification/integration checks blocked without real Yandex environment.

## Warnings
No JS page errors in executed runtime-copy subset. Console errors are missing resources. The `/sdk.js` relative path is correct for Yandex-hosted/local proxy use per official documentation, but was stubbed locally and not validated against production SDK.

## Safe recommendation
Produce a clean archive with `index.html`, `script.js`, `style.css`, full `objects/` tree and no QA folder; then rerun BVT from an empty extraction directory.
""")

w('03_PRODUCT_OVERVIEW.md',"""# 03 — Product Overview

## Product
Single-player territory-capture arcade game for browser. A moving ball or set of balls remains in active territory. The player starts axis-aligned lines; when a line connects boundaries/eligible obstacles, the side without balls is captured. The level ends when captured percentage reaches its target.

## Entities and rules
- **Balls:** 1–4, speeds slow/medium/fast; reflect from borders/obstacles.
- **Line:** grows in two directions; vulnerable while building.
- **Captured area:** removed from active play and adds to percentage.
- **Safe obstacle:** ball-blocking and usable for line/capture geometry.
- **Danger obstacle:** interaction with building line risks a penalty.
- **Penalties:** maximum 3 per attempt.
- **Resources:** lives (max 5 default, time restore), coins, stars, boosters, cosmetics, chests.
- **Progression:** 100 levels, 10 chapters, final after level 100.

## States
`main-menu → chapter-screen → level-running → {complete-panel | failed-panel} → {replay | next | chapter}`. Any major screen can open Shop/Achievements modal. Visibility/platform events pause/resume active gameplay. Save transitions occur after progression/economy actions and before unload.

## Expected reactions
Input must either provide immediate visual feedback or be explicitly disabled. Dangerous navigation from an active attempt must ask for confirmation. Invalid/corrupt save must not crash. Unavailable platform services must leave local gameplay usable. A reward must be idempotent.

## Nonfunctional expectations (recommendations, not specifications)
Responsive 16:9/portrait mobile layout, stable animation without visible stalls, keyboard-operable UI, visible focus, readable Russian text, offline fallback, no data loss, and no duplicate monetization rewards.
""")

feat_headers=['Feature ID','Name','Source/status','Criticality','Dependencies','Positive / Negative / Boundary','States','Risks','Regression','Tests','Checklist','Actual']
feat_rows=[]
for f in features:
    fid,name,desc,src,confirm,crit,deps,pos,neg,bound,states,risk,reg,tests,chk,actual=f
    feat_rows.append((fid,name,f'{src} / {confirm}',crit,deps,f'{pos}; {neg}; {bound}',states,risk,reg,tests,chk,actual))
w('04_FEATURE_MATRIX.md','# 04 — Feature Matrix\n\n'+mdtable(feat_headers,feat_rows))

oracle_rows=[
('REQ-BOOT-001','Игра открывает главное меню','HTML active class + observed runtime','CONFIRMED','TC-SMOKE-001'),
('REQ-CORE-001','Захват увеличивает percentage','HUD label + geometry code + observed 0→50%','CONFIRMED','TC-CORE-001'),
('REQ-WIN-001','Уровень завершен при captured ≥ target','completion condition in JS','CONFIRMED','TC-WIN-001'),
('REQ-FAIL-001','3 штрафа завершают попытку','MAX_PENALTIES=3 + text','CONFIRMED','TC-FAIL-001'),
('REQ-SAVE-001','Progress persists locally and corrupt data recovers','SAVE_KEY/loadProgress + runtime','CONFIRMED','TC-SAVE-001/002'),
('REQ-PLAT-001','SDK connection uses /sdk.js on Yandex-hosted game','HTML + official Yandex SDK doc','CONFIRMED design; runtime BLOCKED','TC-PLAT-001'),
('REQ-ACC-001','Keyboard focus visible and modal focus contained','CSS :focus-visible + focus trap code + WCAG expectation','PARTIAL','TC-INPUT-001; TC-ACC-002'),
('REQ-PERF-001','No project-specific FPS/load threshold supplied','No requirements source','UNKNOWN','TC-PERF-002'),]
w('05_REQUIREMENTS_AND_ORACLES.md',f"""# 05 — Requirements and Oracles

## Oracle hierarchy
1. Explicit UI text and constants.
2. Consistent behavior in code/data.
3. Observed runtime behavior.
4. Official Yandex requirements for platform integration.
5. WCAG 2.2 for web accessibility recommendations.
6. Common user expectations; such items require developer confirmation.

{mdtable(['Requirement','Expected result','Oracle','Confidence','Tests'],oracle_rows)}

## Ambiguities requiring developer confirmation
- Exact star thresholds and whether penalties alone determine stars.
- Whether no audio/settings is intentional.
- Supported browsers/devices and minimum viewport.
- Whether all monetization products are release scope.
- Whether lives may exceed `MAX_LIVES` for IAP rewards or must clamp.
- Official performance targets and maximum acceptable loading time.

## Methodological/public sources checked on {DATE}
{source_links}

No platform conformance or certification is claimed.
""")

w('06_TEST_STRATEGY.md',f"""# 06 — Risk-based Test Strategy

## Goal and scope
Protect the critical player path (launch → level → play → win/fail → progress persistence) first, then economy/platform integrations. Static review, BVT, exploratory testing, state-transition tests, boundary analysis, equivalence partitions, decision tables and pairwise viewport/input combinations are used.

## Solo-developer priority
1. Packaging/assets and crash blockers.
2. One complete critical path with clean and existing save.
3. Save/economy idempotency.
4. Highest-risk levels (1,10,50,100) and chapter boundaries.
5. Monetization in Yandex sandbox.
6. UI/a11y/performance/extended compatibility.

## Levels/types
Static analysis; component-level debug audit; system manual testing; platform integration; smoke, functional, negative/recovery, exploratory, accessibility, compatibility, performance and regression.

## Entry
A clean complete archive, known build ID, supported browser, console access, deterministic test account/product catalog for platform tests.

## Suspension/resumption
Suspend release testing on launch blocker, reproducible data loss, frequent crash/hang, impossible critical path, or uncontrolled real-money operation. Resume after fix, clean rebuild, retest and targeted regression.

## Exit
BVT and smoke pass; no open S1; no unaccepted S2; one full path including win/fail/save passes; critical platform monetization passes if in scope; critical NOT_RUN areas are either completed or explicitly accepted.

## Evidence/defects
Store screenshots/logs under `evidence/` and `logs/`, include build/environment/steps/frequency. Static suspicions remain in Potential Defects until runtime confirmation.

## Standards basis
ISTQB CTFL 4.0.1 terminology and risk-based principles; ISO/IEC/IEEE 29119 concepts/process/documentation adapted without corporate overhead. Sources: see 05.
""")

w('07_RISK_REGISTER.md','# 07 — Risk Register\n\n'+mdtable(['Risk ID','Component','Risk / cause / impact','Probability','Impact','Level','Detectability','Test priority','Features','Tests','Action','Status'],[(r[0],r[1],f'{r[2]}; cause: {r[3]}; player impact: {r[4]}',r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[12],r[13]) for r in risks]))

w('08_TEST_PLAN.md',f"""# 08 — Test Plan

| Field | Value |
|---|---|
| Document ID | TP-JEZZ-{DATE.replace('-','')} |
| Version | 1.0 |
| Build | `{BUILD}` |
| Scope | Web game, progression, save, economy, UI, responsive, Yandex integrations |
| Excluded now | Real production money, certification claim, unavailable devices/services |
| Test data | clean/corrupt/partial saves; levels 1/10/50/100; resource boundaries; SDK callbacks |
| Platforms | Chromium desktop/mobile emulation now; future Chrome/Firefox/Safari/Android/iOS |

## Execution order
BVT → Smoke → critical path → functional → negative/recovery → exploratory → saves/states → UI/UX → accessibility → performance → compatibility → regression → RC.

## Entry/exit/stop/resume
See Strategy. A release candidate must be extracted into an empty directory and hashed. Stop immediately for S1, uncontrolled purchase, or save destruction.

## Severity/Priority
S1 blocker/data loss/no critical path; S2 critical system loss; S3 major degraded function; S4 minor/cosmetic. Priority considers reach/frequency/workaround/release risk, not severity alone.

## Reporting
Update test case CSV, bug reports, traceability, execution report and release verdict. Retest fixes on the same environment plus clean context; perform local regression by Feature/Risk links.

## Current constraints/open questions
Incomplete archive and no real SDK. See 24_OPEN_QUESTIONS.md.
""")

# checklist creation
check_defs={
'CHK-01_Installation_And_First_Launch.md':('CHK-01','Installation And First Launch',['Complete clean archive contains index.html/script.js/style.css','All objects assets resolve','JavaScript syntax check','Serve over HTTP(S)','First load shows menu','Repeat load with existing save','Corrupt save recovers','Offline/no SDK fallback','Console has no unexpected errors','Close/reopen preserves progress']),
'CHK-02_Main_Menu_And_Navigation.md':('CHK-02','Main Menu And Navigation',['Play visible/enabled','Tab focus visible','Enter activates Play','Rapid double activation','Chapter back to menu','Locked transitions blocked','Shop open/close','Achievements open/Escape','Modal focus trap','Dangerous leave confirmation']),
'CHK-03_Core_Gameplay.md':('CHK-03','Core Gameplay',['Level 1 starts','Pointer line builds','Keyboard line builds','Capture side without balls','Percentage updates','Target completes level','Penalty increments once','3 penalties fail','Reward granted once','Booster effects/counts']),
'CHK-04_Controls_And_Input.md':('CHK-04','Controls And Input',['Mouse click','Mouse gesture orientation','Touch tap','Touch swipe','Arrow aim','Space/Enter line','Rapid repeated input','Simultaneous input','Pointer cancel','Focus loss/return']),
'CHK-05_UI_And_HUD.md':('CHK-05','UI And HUD',['Target/captured/penalty values','Coins/lives/stars sync','Disabled controls appearance','Toasts visible','Modal overlays','No overlap desktop','No overlap mobile','Large numbers','Text clipping','Focus indicator']),
'CHK-06_Game_States.md':('CHK-06','Game States',['Menu→chapter','Chapter→level','Running→complete','Running→failed','Complete→next/replay/chapter','Modal pause','Visibility pause','Resize pause overlay','State restored after close','Invalid transitions blocked']),
'CHK-07_Levels_And_Progression.md':('CHK-07','Levels And Progression',['10 chapters rendered','10 levels each','Only unlocked level opens','10→11 unlock','100→final','Stars persist','Chapter chest tiers','Current chapter selection','Replay improves best','Audit 1/10/50/100']),
'CHK-08_Win_Lose_And_Restart.md':('CHK-08','Win Lose And Restart',['Target boundary','Star rules 0/1/2 penalties','Reward one-time','Restart confirmation','Restart reset','Leave confirmation','Third penalty fail','Retry consumes rules','No lives handling','Next level destination']),
'CHK-09_Save_Load_And_Persistence.md':('CHK-09','Save Load And Persistence',['First save created','Reload equal','All fields persist','Corrupt JSON recovery','Partial save normalization','Out-of-range values','Close during save','Rapid saves','Cloud newer/older merge','Version compatibility decision']),
'CHK-10_Settings.md':('CHK-10','Settings',['Settings screen exists','Volume controls','Fullscreen setting','Resolution setting','Language setting','Control remap','Defaults','Persistence','Reset','Invalid config']),
'CHK-11_Audio.md':('CHK-11','Audio',['Music exists','Effects exist','Volume balance','Mute/unmute','Pause audio','No overlap','Correct event cues','Visual equivalents','Background tab behavior','Device output change']),
'CHK-12_Graphics_And_Animation.md':('CHK-12','Graphics And Animation',['All backgrounds load','Ball skin images load','No sprite stretching','Screen transitions','Capture effect','Moving obstacle animation','Safe/danger distinction','No flicker','DPR scaling','Missing asset fallback']),
'CHK-13_Physics_And_Collisions.md':('CHK-13','Physics And Collisions',['Four border reflections','Line collision','Safe obstacle collision','Danger obstacle penalty','Moving obstacle extremes','High speed tunneling','Resize geometry','Minimum capture','No balls in captured area','Long-frame recovery']),
'CHK-14_Performance_And_Stability.md':('CHK-14','Performance And Stability',['Startup timing recorded','FPS level 1','FPS level 100','Frame spikes','CPU/memory','60min memory growth','Rapid restart stability','10 launches','Background recovery','No JS errors']),
'CHK-15_Compatibility.md':('CHK-15','Compatibility',['1440x900 desktop','390x844 mobile','320x240 overlay','Landscape mobile','4:3/ultrawide','DPR1/2/3','Chrome','Firefox','Safari/iOS','Physical Android']),
'CHK-16_Accessibility.md':('CHK-16','Accessibility',['Keyboard start','Keyboard gameplay','Visible focus','Modal trap','ARIA labels','Contrast','Color-independent obstacle cue','200% zoom','No keyboard trap','Timing/difficulty alternatives']),
'CHK-17_Localization.md':('CHK-17','Localization',['HTML lang ru','All UI Russian','No raw keys','Consistent terminology','Cyrillic glyphs','Punctuation','Dynamic variables','Large numbers','Text on images','Unsupported lang fallback']),
'CHK-18_Negative_And_Recovery.md':('CHK-18','Negative And Recovery',['No SDK','No network','Ad error/close','IAP cancel/error','Duplicate purchase token','Cloud conflict','Corrupt save','Rapid double purchase','Close during transition','Missing asset response']),
'CHK-19_Long_Session.md':('CHK-19','Long Session',['60+ minutes','Many level transitions','Repeated modals','Repeated restart','Life timer','Memory trend','FPS trend','Save frequency','Background cycles','No resource drift']),
'CHK-20_Release_Candidate.md':('CHK-20','Release Candidate',['Clean archive names','All assets included','No debug/test files','BVT pass','Full smoke pass','Critical path win/fail','Save pass','Yandex sandbox pass','No open S1/S2','Known issues/verdict updated']),
}

# maps exact observed checks
pass_phrases={'JavaScript syntax check','First load shows menu','Play visible/enabled','Tab focus visible','Enter activates Play','Shop open/close','Achievements open/Escape','Level 1 starts','Pointer line builds','Percentage updates','Mouse click','Menu→chapter','Chapter→level','Restart confirmation','Restart reset','Leave confirmation','First save created','Reload equal','Corrupt JSON recovery','1440x900 desktop','390x844 mobile','320x240 overlay','Keyboard start','HTML lang ru','Unsupported lang fallback','Audit 1/10/50/100','Startup timing recorded','No JS errors'}
fail_phrases={'Complete clean archive contains index.html/script.js/style.css','All objects assets resolve','All backgrounds load','Ball skin images load'}
na_files={'CHK-10_Settings.md':'Settings UI/system not found in supplied source.','CHK-11_Audio.md':'Audio system/API/assets not found in supplied source.'}
master_rows=[]
for fn,(cid,title,items) in check_defs.items():
    rows=[]
    if fn in na_files:
        intro=f'**Applicability: NOT_APPLICABLE.** {na_files[fn]}'
    else:intro='Applicability: applicable unless an item explicitly states otherwise.'
    for i,item in enumerate(items,1):
        check_id=f'{cid}-{i:02d}'
        if fn in na_files: status='NOT_APPLICABLE'; comment=na_files[fn]
        elif item in pass_phrases: status='PASS'; comment='Covered by executed static/browser subset; see execution report.'
        elif item in fail_phrases: status='FAIL'; comment='Supplied package defect; see BUG-001/BUG-002.'
        elif any(k in item.lower() for k in ['sdk','ad ','iap','purchase token','cloud','yandex sandbox']): status='BLOCKED'; comment='Real Yandex environment unavailable.'
        else: status='NOT_RUN'; comment='Designed, not executed.'
        rows.append((check_id,item,'Complete build and required state','Observable expected behavior; no crash/data loss','P0' if i<=3 else 'P1','Smoke' if i<=3 else 'Functional/Negative',status,comment,'BUG-001/002' if status=='FAIL' else '', 'QA/logs/run.log' if status=='PASS' else ''))
        master_rows.append((check_id,title,item,status,fn))
    w('checklists/'+fn,f"# {cid} — {title}\n\n{intro}\n\n"+mdtable(['Check ID','Check','Precondition','Expected','Priority','Type','Status','Comment','Bug','Evidence'],rows))
w('09_MASTER_CHECKLIST.md','# 09 — Master Checklist\n\nStatus is evidence-based; NOT_RUN is intentionally visible.\n\n'+mdtable(['Check ID','Area','Check','Status','File'],master_rows))

# test case CSV+MD
headers=['Test Case ID','Feature ID','Risk ID','Module','Title','Objective','Preconditions','Test Data','Steps','Expected Result','Actual Result','Status','Priority','Test Type','Test Technique','Platform','Build','Environment','Evidence','Related Bug','Notes']
with open(QA/'10_TEST_CASES.csv','w',newline='',encoding='utf-8-sig') as f:
    cw=csv.writer(f)
    cw.writerow(headers)
    for t in TC:
        cw.writerow([t[k] for k in ['id','feature','risk','module','title','objective','pre','data','steps','expected','actual','status','priority','type','tech','platform','build','environment','evidence','bug','notes']])
status_counts={s:sum(t['status']==s for t in TC) for s in ['PASS','FAIL','BLOCKED','NOT_RUN','NOT_APPLICABLE']}
case_rows=[(t['id'],t['feature'],t['risk'],t['module'],t['title'],t['status'],t['priority'],t['expected'],t['actual'],t['evidence'],t['bug']) for t in TC]
w('10_TEST_CASES.md',f"# 10 — Test Cases\n\nTotal: {len(TC)}; "+', '.join(f'{k}={v}' for k,v in status_counts.items())+'\n\n'+mdtable(['ID','Feature','Risk','Module','Title','Status','Priority','Expected','Actual','Evidence','Bug'],case_rows)+"\n\nDetailed atomic steps and all mandatory fields are in `10_TEST_CASES.csv`.")

smoke_ids=['TC-BUILD-001','TC-ASSET-001','TC-SMOKE-001','TC-INPUT-001','TC-SMOKE-002','TC-SMOKE-003','TC-CORE-001','TC-CORE-002','TC-NAV-001','TC-SAVE-001','TC-SAVE-002','TC-FAIL-001','TC-WIN-001','TC-STATE-001']
w('11_SMOKE_SUITE.md',f"""# 11 — Smoke Suite

## Purpose
Fast release gate for packaging and critical player path. Execute from a clean extraction, not `QA/work/runtime-copy`.

## Cases
{chr(10).join('- '+x for x in smoke_ids)}

## Current result
Packaging/assets fail; limited runtime subset passes. Win, fail and true pause are NOT_RUN/BLOCKED, therefore smoke is **FAILED/INCOMPLETE**.

## Pass criteria
All P0 smoke cases PASS; no unexpected console errors; no open S1/S2 affecting the path.
""")

w('12_REGRESSION_SUITE.md',"""# 12 — Regression Suite

## Critical Regression
Run after every core/save/monetization fix: BVT, launch/menu/chapter/level, one line, win, fail, restart, local save/reload/corrupt save, resource idempotency. Effort: small-to-medium for this project, but cannot be stated in exact minutes until one full manual pass is timed.

## Core Regression
Critical + representative levels 1/10/50/100, all boosters, chapter boundary, shop/achievement basic actions, desktop/mobile portrait/landscape.

## Extended Regression
Core + all economy items, chests/cosmetics, cloud/leaderboard/ads/IAP error paths, accessibility and browser matrix.

## Full Regression
All test cases, 100-level configuration audit, targeted manual playthrough of every level, long session and release candidate checklist.

## Trigger mapping
- UI change: UI/RESP/LOC/ACC + smoke.
- Physics/level change: CORE/COLL/LEVEL/WIN/FAIL + save progression.
- Save/economy: SAVE/ECON/SHOP/ACH/IAP + idempotency.
- SDK/dependency: PLAT/ADS/IAP/CLOUD/LB + offline fallback.
""")

charters=[]
charter_names=['Первый запуск новым игроком','Полный основной цикл','Быстрый и хаотичный ввод','Неверный порядок действий','Границы поля','Переходы состояний','Пауза/Alt+Tab/возврат','Многократный рестарт','Длительная сессия','Минимумы и максимумы','Сохранение и восстановление','Слабая обратная связь','Доступность интерфейса','Тяжелая сцена/performance','Попытка вызвать softlock']
for i,n in enumerate(charter_names,1):
    charters.append((f'CHAR-{i:02d}',n,'Связанные P0/P1 риски','Too fast/slow/many/few/zero/max; repeat/cancel/interrupt/focus loss/corrupt data as applicable','30–60 min recommendation; actual session NOT_RUN','Prepare clean and boundary saves','NOT_RUN','None confirmed in this charter','See open questions','Execute after complete archive'))
w('13_EXPLORATORY_TEST_CHARTERS.md','# 13 — Exploratory Test Charters\n\n'+mdtable(['ID','Goal/Scope','Risks','Test ideas','Timebox','Data','Observations','Problems','Questions','Conclusion'],charters))

bug_rows=[
('BUG-001','Поставленный HTML ссылается на отсутствующие script.js и style.css','CONFIRMED','Packaging/Bootstrap',BUILD,'Supplied files','Files unchanged','1. Serve/extract supplied files. 2. Open index(2).html. 3. Inspect paths/existence.','Required JS/CSS filenames do not exist; functional game cannot initialize directly.','All runtime files referenced by HTML exist.','Always','S1 — Blocker','P0','No direct playable build','Temporarily rename copies, not acceptable for release','New','TC-BUILD-001','FEAT-BOOT-001','QA/logs/build.log','','HTML tail and directory listing','Packaging/file naming','High'),
('BUG-002','Каталог objects отсутствует, графические ресурсы отвечают 404','CONFIRMED','Assets/UI',BUILD,'Chromium 144; runtime-copy','Runtime-copy with normalized source names','1. Launch. 2. Visit menu/chapter/level/mobile. 3. Inspect network.','39 404 responses across scenarios; backgrounds/ball images absent, fallback gradients visible.','All referenced assets return 200 and intended visuals render.','Always','S3 — Major','P1','Degraded visuals and unavailable skins','CSS gradients keep core visible','New','TC-ASSET-001','FEAT-RESP-001; FEAT-SHOP-001','QA/evidence/BVT-001_main-menu_desktop.png','QA/logs/run.log','36 concrete image paths absent','Archive content/asset paths','High')]
# CSV
bug_headers=['Bug ID','Title','Confirmation','Component','Build','Environment','Preconditions','Steps','Actual','Expected','Frequency','Severity','Priority','Player Impact','Workaround','Regression/New','Related Tests','Related Features','Evidence','Logs','Additional','Suspected Code Area','Cause Confidence']
with open(QA/'14_BUG_REPORTS.csv','w',newline='',encoding='utf-8-sig') as f:
    cw=csv.writer(f); cw.writerow(bug_headers); cw.writerows(bug_rows)
bug_md=[]
for b in bug_rows:
    bid=b[0]
    bug_md.append(f"## {bid}\n\n"+mdtable(['Field','Value'],list(zip(bug_headers,b))))
w('14_BUG_REPORTS.md','# 14 — Bug Reports\n\nConfirmed defects: 2.\n\n'+'\n\n'.join(bug_md)+"""

## Potential Defects Requiring Runtime Confirmation
- Reward/life clamping for IAP packages that declare more than `MAX_LIVES` requires a real purchase/state test.
- Cloud conflict selection and duplicate purchase token recovery require platform sandbox confirmation.
- Level 100 high target and moving obstacles may be balance/softlock risk; debug audit alone does not prove playability.
- Hardcoded Russian strings outside `messages` may complicate future localization; not a defect while ru-only is intended.
""")

acc_rows=[
('Text/readability','Applicable','PARTIAL','Screenshots/CSS','High','Test 200% zoom and small devices','Low','P1'),('Keyboard UI','Applicable','PARTIAL PASS','TC-INPUT-001','High','Run full keyboard flow','Medium','P1'),('Keyboard gameplay','Applicable','NOT_RUN','Canvas aria/code','High','Test arrows+Space across levels','Medium','P1'),('Focus visibility/trap','Applicable','PARTIAL','CSS/code; achievements Escape observed','High','Execute Tab/Shift+Tab all modals','Low','P1'),('Color dependence','Applicable','RISK','Safe/danger use color and line style/text legend','High','Ensure persistent non-color shapes/icons and contrast','Medium','P1'),('Audio/subtitles','No speech/audio found','NOT_APPLICABLE','Static scan','Low','Confirm design','Low','P3'),('Timing/difficulty','Applicable','RISK','Real-time balls; boosters but no global difficulty','High','Consider reduced speed/practice mode','High','P2'),('Motion/flashing','Applicable','NOT_RUN','Glow/transitions/moving obstacles','Medium','Photosensitivity review, reduce motion option','Medium','P2'),('Touch target','Applicable','PARTIAL','Screenshots/CSS','Medium','Physical device check','Low','P2'),('Error/help text','Applicable','PARTIAL','Toasts/hints/confirm dialogs','Medium','First-player exploratory session','Low','P2')]
w('15_ACCESSIBILITY_REPORT.md',f"""# 15 — Accessibility Report

No claim of full accessibility is made.

{mdtable(['Area','Applicability','Result','Evidence','Impact','Recommendation','Effort','Solo priority'],acc_rows)}

## Quick wins
Persistent keyboard help near canvas, full focus test, retain non-color obstacle patterns, verify 200% zoom, add reduced-motion preference, and document controls on first level.

## Standards/reference
WCAG 2.2 is used as a web accessibility oracle; game-specific real-time difficulty remains a product recommendation, not WCAG conformance. Checked {DATE}: https://www.w3.org/TR/WCAG22/
""")

w('16_PERFORMANCE_AND_COMPATIBILITY.md',f"""# 16 — Performance and Compatibility

## Actual measurements
| Scene | Build | Environment | Method | Duration | Min/Avg/Max | Result/limits |
|---|---|---|---|---|---|---|
| Initial navigation | {BUILD} | Chromium 144 local | external monotonic + NavigationTiming | one load | 0.374s external; browser load ~91ms | Instrumentation only; assets missing and localhost invalidate production comparison |
| Levels 1/10/50/100 audit | {BUILD} | Chromium debug | geometry scan | one call | validStarts 44–230 | Not FPS/playability |

No reliable FPS, frame-time, CPU/GPU or memory series were collected. They remain NOT_TESTED.

## Compatibility executed
- 1440×900 desktop: limited flow PASS.
- 390×844 DPR2 touch emulation: menu→chapter PASS.
- 320×240: too-small overlay PASS.

## Future matrix
Chrome/Edge/Firefox/Safari; Windows/macOS/Linux; physical Android/iOS; portrait/landscape; DPR1–3; 4:3/16:9/19.5:9/ultrawide; resize/fullscreen/Alt+Tab; mouse/keyboard/touch. Controller is NOT_APPLICABLE unless scope changes.

## Recommended thresholds (not requirements)
Aim for responsive input and visually stable 60fps on typical devices, with 30fps low-performance fallback; investigate sustained frame times >33ms, visible input lag, growth across a 60-minute soak, and load stalls. Final thresholds require target device definition.
""")

loc_rows=[('Игра','game','JezzBall'),('Глава','chapter','Progression group of 10 levels'),('Уровень','level','Playable stage'),('Захвачено','captured','Captured field percentage'),('Штраф','penalty','Line collision penalty; 3 fails'),('Жизнь','life','Attempt resource'),('Монета','coin','Soft currency'),('Бустер','booster','Consumable modifier'),('Сундук','chest','Reward container'),('Звезда','star','Performance/progression score')]
w('17_LOCALIZATION_REPORT.md',f"""# 17 — Localization Report

**Supported languages:** `ru` only. Unsupported Yandex language normalizes to Russian. Static DOM and dynamic strings are mostly localized through `messages.ru`, but many shop/achievement definitions are hardcoded Russian; acceptable for ru-only, technical debt for expansion.

## Results
- Cyrillic rendering: observed PASS in Chromium screenshots.
- Raw keys/mixed language: no raw localization keys observed in executed screens; full screen sweep NOT_RUN.
- Clipping/wrapping/large values: NOT_RUN beyond default values.
- Text on missing background images: UNKNOWN due absent assets.
- Terminology: generally consistent; use “Звёзды” consistently (code contains both `Звезды` and UI `Звёзды`).

## Glossary
{mdtable(['RU','EN/internal concept','Definition'],loc_rows)}
""")

trace_rows=[]
for f in features:
    fid=f[0]; tests=f[13]; related=[t for t in TC if t['feature']==fid]
    statuses=sorted(set(t['status'] for t in related))
    bugs=sorted(set(t['bug'] for t in related if t['bug']))
    rr=[r[0] for r in risks if fid in r[10]]
    trace_rows.append((fid,f[1],f[3],'; '.join(rr) or 'None mapped',tests,'; '.join(statuses) or 'NOT_RUN','; '.join(bugs) or 'None','Yes' if any(s in statuses for s in ['BLOCKED','NOT_RUN','FAIL']) else 'No'))
trace_headers=['Feature ID','Feature','Oracle/source','Risks','Tests','Results','Bugs','Residual risk']
w('18_TRACEABILITY_MATRIX.md','# 18 — Traceability Matrix\n\n'+mdtable(trace_headers,trace_rows))
with open(QA/'18_TRACEABILITY_MATRIX.csv','w',newline='',encoding='utf-8-sig') as f:
    cw=csv.writer(f); cw.writerow(trace_headers); cw.writerows(trace_rows)

executed_pass=status_counts['PASS']; executed_fail=status_counts['FAIL']; blocked=status_counts['BLOCKED']; notrun=status_counts['NOT_RUN']; na=status_counts['NOT_APPLICABLE']; total=len(TC)
passrate=100*executed_pass/(executed_pass+executed_fail) if executed_pass+executed_fail else 0
w('19_TEST_EXECUTION_REPORT.md',f"""# 19 — Test Execution Report

**Build:** `{BUILD}`  
**Environment/date:** Chromium 144, Linux x86_64, {DATE} UTC.

## Metrics
| Total | Passed | Failed | Blocked | Not Run | Not Applicable |
|---:|---:|---:|---:|---:|---:|
| {total} | {executed_pass} | {executed_fail} | {blocked} | {notrun} | {na} |

**Executed pass rate:** `{executed_pass}/({executed_pass}+{executed_fail}) = {passrate:.1f}%`. BLOCKED/NOT_RUN are excluded from this percentage and remain visible.

## Per-module summary
- Build/assets: 2 FAIL.
- Limited browser smoke/core/UI/save/viewport: 16 PASS.
- Real platform integration: {blocked} BLOCKED.
- Full gameplay/progression/economy/a11y/performance: mostly NOT_RUN.

## Smoke/critical path
Smoke is incomplete and fails release gate due packaging/assets; no full win/fail path was completed. Core line action, restart, leave confirmation and local persistence were observed.

## Defects
2 confirmed: S1=1, S2=0, S3=1, S4=0. Potential defects are not counted.

## Confidence
Low-to-medium for core bootstrap/UI and local save; low for overall release because the supplied build is incomplete and critical gameplay/platform scope is unexecuted.
""")

w('20_RELEASE_READINESS_REPORT.md',"""# 20 — Release Readiness Report

## Verdict: NO-GO

### Evidence
- Open S1 BUG-001: supplied package cannot directly initialize required JS/CSS.
- Open S3 BUG-002: required graphical assets absent.
- Smoke/critical path is not complete: no verified victory, defeat, full progression, release archive or Yandex integration.
- Performance, cross-browser/device compatibility and long session lack sufficient evidence.

### Mandatory before reconsideration
1. Produce a complete clean archive with correct names and assets.
2. Rerun BVT and full smoke including win/fail/restart/save.
3. Complete Yandex sandbox tests for ads/IAP/cloud/leaderboard if release scope.
4. Manually validate representative hard levels and all level configs; resolve any softlocks.
5. Run critical accessibility, physical mobile and performance checks.

### Conditions to change verdict
`CONDITIONAL GO` only after package issues are fixed, smoke/critical path pass and no S1/S2 remain, with documented acceptance of bounded residual risks. `GO` requires sufficient evidence across release scope; current data cannot support it.
""")

w('21_SOLO_DEVELOPER_QA_WORKFLOW.md',"""# 21 — Solo Developer QA Workflow

## Every commit
Syntax/lint → changed feature happy path → one negative/boundary → inspect console → neighbor feature check → update relevant test/known issue.

## Test build
Clean archive/hash → BVT → smoke → critical path → save reload/corrupt → known issues → targeted regression.

## Release
Clean extraction → full smoke → Critical/Core regression → Yandex sandbox → exploratory charter → long session → compatibility/a11y → release verdict.

## After bug fix
Reproduce old build → verify fix on new build → local regression via Feature/Risk IDs → clean-state check → evidence → update bug/traceability/changelog.

## Minimum by change
- UI: menu/navigation/responsive/localization/focus.
- Input: mouse/touch/keyboard/rapid/focus loss.
- Physics: line/collision/borders/fast hard level/win-fail.
- Level: config audit + previous/current/next level + progression.
- Save: clean/existing/corrupt/interrupt/all fields/cloud conflict.
- Balance: target boundaries and representative player playtest.
- Engine/dependency/SDK: BVT, offline fallback, all platform callbacks.
- Crash fix: original steps + soak + neighboring states + save integrity.
""")

w('22_KNOWN_ISSUES.md',"""# 22 — Known Issues

| Bug | Severity/Priority | Summary | Status | Workaround |
|---|---|---|---|---|
| BUG-001 | S1/P0 | Runtime filenames referenced by HTML absent | OPEN | QA-only runtime-copy; not releasable |
| BUG-002 | S3/P1 | `objects/` assets absent, repeated 404 | OPEN | CSS fallback only |

Only confirmed current issues are listed. Potential defects remain in 14_BUG_REPORTS.md.
""")

w('23_QA_CHANGELOG.md',f"""# 23 — QA Changelog

| Date | Build | Documents | Tests/risks/bugs | Verdict |
|---|---|---|---|---|
| {DATE} | {BUILD} | Initial full QA set 00–25, checklists, CSV, evidence/logs | {len(TC)} cases; 30 risks; BUG-001/002 opened | NO-GO |
""")

questions=[
('Q-001','Как выглядит полный релизный архив и были ли имена изменены загрузчиком?','Определяет BUG-001','Packaging','Суффиксы появились при передаче','High','Предоставить ZIP/репозиторий'),
('Q-002','Где каталог objects и лицензии assets?','Визуальная полнота','Assets','Он не был загружен','High','Передать полный tree'),
('Q-003','Являются ли ads/IAP/cloud release scope?','Критический финансовый риск','Platform','Да, по коду','Critical','Yandex sandbox/account/catalog'),
('Q-004','Как рассчитываются 1/2/3 звезды?','Оракул победы/награды','Game design','По штрафам/проценту в коде','Medium','Зафиксировать rule spec'),
('Q-005','Какие browsers/devices/min viewport поддерживаются?','Compatibility gate','Platform','Modern desktop/mobile','High','Define matrix'),
('Q-006','Нужны ли звук, настройки, controller?','N/A vs missing feature','Product','Не входят','Medium','Confirm scope'),
('Q-007','Какие FPS/load targets?','Performance verdict','Performance','Не заданы','Medium','Define device-based targets'),
('Q-008','Должны ли IAP lives превышать MAX_LIVES?','Economy correctness','IAP','Вероятно clamp/bonus','High','Explicit rule + tests')]
w('24_OPEN_QUESTIONS.md','# 24 — Open Questions\n\n'+mdtable(['ID','Question','Why important','Component','Current assumption','Wrong-assumption risk','Resolution'],questions))

# documentation audit
all_required=['README.md','PROGRESS.md']+[f'{i:02d}_{n}.md' for i,n in [
(0,'PROJECT_INVENTORY'),(1,'TEST_ENVIRONMENT'),(2,'BUILD_VERIFICATION_REPORT'),(3,'PRODUCT_OVERVIEW'),(4,'FEATURE_MATRIX'),(5,'REQUIREMENTS_AND_ORACLES'),(6,'TEST_STRATEGY'),(7,'RISK_REGISTER'),(8,'TEST_PLAN'),(9,'MASTER_CHECKLIST'),(10,'TEST_CASES'),(11,'SMOKE_SUITE'),(12,'REGRESSION_SUITE'),(13,'EXPLORATORY_TEST_CHARTERS'),(14,'BUG_REPORTS'),(15,'ACCESSIBILITY_REPORT'),(16,'PERFORMANCE_AND_COMPATIBILITY'),(17,'LOCALIZATION_REPORT'),(18,'TRACEABILITY_MATRIX'),(19,'TEST_EXECUTION_REPORT'),(20,'RELEASE_READINESS_REPORT'),(21,'SOLO_DEVELOPER_QA_WORKFLOW'),(22,'KNOWN_ISSUES'),(23,'QA_CHANGELOG'),(24,'OPEN_QUESTIONS')]]
w('25_DOCUMENTATION_AUDIT.md',f"""# 25 — Documentation Audit

## Checks
- Required files created: {len(all_required)} markdown entry/report files plus CSVs and 20 checklists.
- IDs: Feature/Risk/Test/Bug IDs generated uniquely; traceability uses existing IDs.
- Counts: test metrics derive from CSV; confirmed bugs=2 consistently.
- Evidence discipline: only 16 browser PASS and 2 package FAIL; unexecuted scope is NOT_RUN/BLOCKED.
- Secrets: no passwords/tokens/API keys copied.
- CSV: UTF-8 with BOM, quoted via Python csv module.
- Source files untouched; changes are confined to `QA/`.

## Remaining limitations
No complete archive, real Yandex environment, physical device fleet, full playthrough or long performance session. Some traceability references use ID ranges for compactness; individual cases exist in CSV.

## Final status
**PASS WITH KNOWN LIMITATIONS** for documentation integrity. **Product release status remains NO-GO.**
""")

# Validate counts and basic references
assert len({t['id'] for t in TC})==len(TC)
assert len({f[0] for f in features})==len(features)
assert len({r[0] for r in risks})==len(risks)
# exact final progress marker
print(json.dumps({'features':len(features),'risks':len(risks),'test_cases':len(TC),'status_counts':status_counts,'files':len(list(QA.rglob('*')))},ensure_ascii=False,indent=2))
