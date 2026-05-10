(() => {
  const root = document.getElementById("gameRoot");
  const playButton = document.getElementById("playButton");
  const levelScreen = document.getElementById("level-screen");
  const levelChapterLabel = document.getElementById("levelChapterLabel");
  const levelTitle = document.getElementById("levelTitle");
  const completeCloseButton = document.getElementById("completeCloseButton");
  const completeReplayButton = document.getElementById("completeReplayButton");
  const completeNextButton = document.getElementById("completeNextButton");
  const jezzCanvas = document.getElementById("jezzCanvas");
  const capturePercent = document.getElementById("capturePercent");
  const penaltyCount = document.getElementById("penaltyCount");
  const targetPercent = document.getElementById("targetPercent");
  const helperTargetPercent = document.getElementById("helperTargetPercent");
  const obstacleLegend = document.querySelector(".obstacle-legend");
  const levelToast = document.getElementById("levelToast");
  const levelCompletePanel = document.getElementById("levelCompletePanel");
  const levelCompleteScore = document.getElementById("levelCompleteScore");
  const rewardStars = document.getElementById("rewardStars");
  const rewardPrizes = document.getElementById("rewardPrizes");
  const rewardCoins = document.getElementById("rewardCoins");
  const rewardLifePrize = document.getElementById("rewardLifePrize");
  const rewardLife = document.getElementById("rewardLife");
  const settingsModal = document.getElementById("settingsModal");
  const confirmModal = document.getElementById("confirmModal");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmCancelButton = document.getElementById("confirmCancelButton");
  const confirmAcceptButton = document.getElementById("confirmAcceptButton");
  const musicToggle = document.getElementById("musicToggle");
  const soundToggle = document.getElementById("soundToggle");
  const SAVE_KEY = "jezzball-progress-v1";
  const MAX_LIVES = 5;
  const LIFE_RESTORE_MS = 3 * 60 * 1000;
  const TOTAL_LEVELS = 100;
  const LEVEL_ONE_TARGET = 70;
  const STAR_COIN_MULTIPLIERS = {
    1: 1,
    2: 1.5,
    3: 2.2
  };
  const STAR_REWARDS = {
    1: { coins: 80 },
    2: { coins: 120 },
    3: { coins: 176 }
  };
  const LEVEL_REWARDS = {
    1: { 1: { coins: 50 }, 2: { coins: 75 }, 3: { coins: 110 } },
    2: { 1: { coins: 50 }, 2: { coins: 80 }, 3: { coins: 120 } },
    3: { 1: { coins: 60 }, 2: { coins: 90 }, 3: { coins: 132 } },
    4: { 1: { coins: 60 }, 2: { coins: 90 }, 3: { coins: 132 } },
    5: { 1: { coins: 70 }, 2: { coins: 105 }, 3: { coins: 154 } },
    6: { 1: { coins: 70 }, 2: { coins: 105 }, 3: { coins: 154 } },
    7: { 1: { coins: 80 }, 2: { coins: 120 }, 3: { coins: 176 } },
    8: { 1: { coins: 80 }, 2: { coins: 120 }, 3: { coins: 176 } },
    9: { 1: { coins: 90 }, 2: { coins: 135 }, 3: { coins: 198 } },
    10: { 1: { coins: 90 }, 2: { coins: 135 }, 3: { coins: 198 } }
  };
  const LINE_GROW_SPEED = 420;
  const BALL_RADIUS = 11;
  const OBSTACLE_THICKNESS = 12;
  const LEVEL_SPEEDS = {
    slow: 150,
    medium: 190,
    fast: 235
  };

  const createGeneratedLevelConfig = (level) => {
    const chapterIndex = Math.floor((level - 1) / 10);
    const chapterStep = (level - 1) % 10;
    const speedCycle = ["slow", "medium", "fast"];
    const obstacleCount = Math.min(3, 1 + Math.floor(chapterStep / 3) + (chapterIndex >= 5 ? 1 : 0));
    const obstacles = [];

    for (let index = 0; index < obstacleCount; index += 1) {
      const vertical = (level + index) % 2 === 0;
      const moving = (level + index + chapterIndex) % 3 === 0;
      const safe = index === obstacleCount - 1 && (level + chapterIndex) % 4 === 0;
      const center = 0.26 + ((chapterStep * 0.07 + index * 0.19 + chapterIndex * 0.03) % 0.48);
      const start = 0.16 + ((chapterIndex * 0.04 + index * 0.09) % 0.18);
      const end = 0.84 - ((chapterStep * 0.025 + index * 0.06) % 0.16);
      const obstacle = vertical
        ? { orientation: "vertical", x: center, y1: start, y2: Math.max(start + 0.28, end) }
        : { orientation: "horizontal", y: center, x1: start, x2: Math.max(start + 0.28, end) };

      obstacle.type = moving ? "moving" : "static";
      obstacle.safe = safe;
      obstacle.color = safe ? "rgba(173, 246, 255, 0.92)" : (index % 2 === 0 ? "#ff4e7a" : "#7c1d49");
      obstacle.blocksBall = !safe;

      if (moving) {
        obstacle.axis = vertical ? "y" : "x";
        obstacle.amplitude = Math.min(0.2, 0.08 + chapterIndex * 0.01 + index * 0.025);
        obstacle.phase = ((chapterStep + index * 3) % 10) / 10;
      }

      obstacles.push(obstacle);
    }

    return {
      target: Math.min(95, 76 + Math.floor((level - 1) / 5)),
      balls: Math.min(4, 1 + Math.floor((level - 1) / 12)),
      speed: speedCycle[(chapterIndex + chapterStep) % speedCycle.length],
      obstacles
    };
  };

  const generatedLevelConfigs = Object.fromEntries(
    Array.from({ length: TOTAL_LEVELS - 10 }, (_, index) => {
      const level = index + 11;
      return [level, createGeneratedLevelConfig(level)];
    })
  );

  const LEVEL_CONFIGS = {
    1: { target: 70, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-lines" },
    2: { target: 71, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-lines" },
    3: { target: 72, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-lines" },
    4: { target: 74, balls: 1, speed: "medium", obstacles: [], purpose: "tutorial-lines" },
    5: { target: 75, balls: 1, speed: "medium", obstacles: [], purpose: "tutorial-lines" },
    6: {
      target: 75,
      balls: 1,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.32, x1: 0.18, x2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "first-challenge"
    },
    7: {
      target: 75,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "vertical", x: 0.36, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#8d2454" }],
      purpose: "first-challenge"
    },
    8: {
      target: 75,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.16, x2: 0.84, type: "static", safe: false, color: "#7c1d49" }],
      purpose: "first-challenge"
    },
    9: {
      target: 75,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "vertical", x: 0.64, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "first-challenge"
    },
    10: {
      target: 75,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.68, x1: 0.18, x2: 0.82, type: "static", safe: false, color: "#8d2454" }],
      purpose: "first-challenge"
    },
    ...generatedLevelConfigs
  };
  const BALL_STARTS = [
    { x: 0.64, y: 0.42, vx: 0.78, vy: 0.62 },
    { x: 0.32, y: 0.66, vx: -0.7, vy: 0.72 },
    { x: 0.73, y: 0.72, vx: 0.64, vy: -0.76 },
    { x: 0.27, y: 0.32, vx: -0.82, vy: -0.58 }
  ];

  const chapters = [
    { id: 1, title: "Солнечная поляна", slug: "sunny-glade", icon: "☀" },
    { id: 2, title: "Таинственный лес", slug: "quiet-village", icon: "♣" },
    { id: 3, title: "Хрустальные пещеры", slug: "golden-meadows", icon: "♦" },
    { id: 4, title: "Забытая башня", slug: "river-whisper", icon: "♜" },
    { id: 5, title: "Огненные вершины", slug: "cote-d-azur", icon: "▲" },
    { id: 6, title: "Небесные острова", slug: "secret-of-the-depths", icon: "☁" },
    { id: 7, title: "Огни города", slug: "city-lights", icon: "✦" },
    { id: 8, title: "Неоновый ритм", slug: "neon-rhythm", icon: "✹" },
    { id: 9, title: "Звёздный путь", slug: "star-trek", icon: "★" },
    { id: 10, title: "Врата света", slug: "gates-of-light", icon: "◈" }
  ];

  const SUPPORTED_LANGUAGES = ["ru"];
  const FALLBACK_LANGUAGE = "ru";
  const yandexState = {
    sdk: null,
    lang: "ru",
    readySent: false,
    gameplayActive: false
  };

  const messages = {
    ru: {
      pageTitle: "JezzBall - карта глав",
      gameRoot: "Экран игры JezzBall",
      subtitleStart: "Проведи линию. ",
      subtitleAccent: "Захвати пространство.",
      mainMenu: "Главное меню",
      play: "Играть",
      levelScreen: "Экран уровня",
      topPanel: "Верхняя панель",
      backToChapter: "Назад к главе",
      resources: "Ресурсы",
      coins: "Монеты",
      lives: "Жизни",
      levelStars: "Звезды за уровень",
      totalStars: "Всего звезд",
      settings: "Настройки",
      levelGoal: "Цель уровня",
      chapter: "Глава",
      level: "Уровень",
      target: "Цель",
      captured: "Захвачено",
      penalties: "Штрафы",
      playfield: "Игровое поле JezzBall",
      toChapters: "К главам",
      levelComplete: "Уровень пройден!",
      earnedStars: "Полученные звезды",
      capturedField: "Ты захватил {percent}% поля!",
      rewards: "Награды",
      replay: "Играть еще раз",
      nextLevel: "Следующий уровень",
      exitBack: "Выйти обратно",
      chapterComplete: "Глава завершена",
      chestClaimed: "Сундук получен",
      chapterChestTitle: "Сундук главы",
      chapterChestMessage: "Глава {chapter} завершена. Сундук получен!",
      levelHintPanel: "Подсказка уровня",
      levelHint: "Рисуй линии и замыкай области, чтобы захватить пространство.",
      toGoal: "до цели",
      final: "Финал",
      finalUnlocked: "Финал открыт",
      finalTitle: "Врата света пройдены",
      toMenu: "В меню",
      closeSettings: "Закрыть настройки",
      music: "Музыка",
      sounds: "Звуки",
      confirm: "Подтверждение",
      continue: "Продолжить?",
      stay: "Остаться",
      yes: "Да",
      shop: "Магазин",
      achievements: "Достижения",
      chapterSelect: "Выбор главы",
      chapterSelectHint: "Проходите уровни и открывайте новые главы",
      shopAndAchievements: "Магазин и достижения",
      stars: "Звезды",
      nextChapter: "Перейти в следующую главу",
      toFinal: "Перейти в финал",
      collapseChapter: "Свернуть главу",
      expandChapter: "Раскрыть главу",
      currentLevel: "Текущий уровень {level}",
      completedLevel: "Пройденный уровень {level}, звезд: {stars}",
      lockedLevel: "Уровень {level} заблокирован",
      tooClose: "Слишком близко к краю",
      penalty: "Штраф",
      leaveTitle: "Выйти из уровня?",
      leaveMessage: "Прогресс текущей попытки не сохранится. Остаться в игре?",
      leaveAccept: "Выйти",
      restartLevel: "Играть уровень заново",
      restartTitle: "Сыграть заново?",
      restartMessage: "Текущая попытка начнется сначала.",
      replayTitle: "Пройти уровень заново?",
      replayMessage: "Уровень {level} уже пройден. Начать заново?",
      cancel: "Отмена",
      noLivesTitle: "Нет жизней",
      noLivesMessage: "Нужна жизнь для старта уровня. Подожди восстановления или получи жизнь за награду.",
      livesFull: "Жизни полные",
      ok: "Понятно",
      shopSummary: "У вас {coins} монет и {lives} жизней. Магазин с бустами будет подключен к этой экономике.",
      achievementSummary: "Звезд получено: {stars} из {total}. Проходите уровни без штрафов, чтобы собрать максимум.",
      obstacleDanger: "Яркая или темная линия - штраф при касании",
      obstacleSafe: "Пунктирная светлая линия - можно задевать"
    }
  };

  const state = {
    currentChapter: 1,
    currentLevel: 1,
    selectedLevel: 1,
    coins: 0,
    lives: MAX_LIVES,
    nextLifeAt: null,
    music: true,
    sound: true,
    starsByLevel: {},
    perfectChapters: new Set(),
    chapterChests: new Set(),
    expandedChapters: new Set([1])
  };

  const levelState = {
    running: false,
    completed: false,
    config: LEVEL_CONFIGS[1],
    target: LEVEL_ONE_TARGET,
    capturedArea: 0,
    totalArea: 1,
    penalties: 0,
    rect: null,
    activeRect: null,
    activeRects: [],
    capturedRects: [],
    walls: [],
    obstacles: [],
    elapsed: 0,
    activeLine: null,
    draftPointer: null,
    aimPointer: null,
    ball: null,
    balls: [],
    animationId: null,
    lastFrameAt: 0,
    toastTimer: null,
    lastCompletion: null,
    replayingCompleted: false
  };

  let confirmResolve = null;

  const normalizeLanguage = (lang) => {
    const code = String(lang || "").toLowerCase().split("-")[0];
    return SUPPORTED_LANGUAGES.includes(code) ? code : FALLBACK_LANGUAGE;
  };

  const t = (key, values = {}) => {
    const template = (messages[yandexState.lang] && messages[yandexState.lang][key]) || messages.ru[key] || messages[FALLBACK_LANGUAGE][key] || key;
    return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
  };

  const getChapterTitle = (chapterId) => {
    const chapter = chapters[clampChapterId(chapterId) - 1];
    return chapter.title;
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  };

  const setAttribute = (selector, attribute, value) => {
    const node = document.querySelector(selector);
    if (node) {
      node.setAttribute(attribute, value);
    }
  };

  const localizeStaticDom = () => {
    document.documentElement.lang = yandexState.lang;
    document.title = t("pageTitle");
    setAttribute("#gameRoot", "aria-label", t("gameRoot"));
    setText(".game-subtitle", t("subtitleStart"));
    const subtitle = document.querySelector(".game-subtitle");
    if (subtitle) {
      const accent = document.createElement("span");
      accent.textContent = t("subtitleAccent");
      subtitle.append(accent);
    }
    setAttribute(".menu-actions", "aria-label", t("mainMenu"));
    setText("#playButton > span:last-child", t("play"));
    setAttribute("#level-screen", "aria-label", t("levelScreen"));
    setAttribute("#level-screen .top-ui", "aria-label", t("topPanel"));
    setAttribute("#level-screen [data-action='return-chapter']", "aria-label", t("backToChapter"));
    setAttribute("#level-screen [data-action='restart-level']", "aria-label", t("restartLevel"));
    setAttribute("#level-screen .resource-strip", "aria-label", t("resources"));
    setAttribute("#level-screen .coins-pill", "aria-label", t("coins"));
    setAttribute("#level-screen .lives-pill", "aria-label", t("lives"));
    setAttribute("#level-screen [data-action='achievements']", "aria-label", t("levelStars"));
    setAttribute("#level-screen [data-action='settings']", "aria-label", t("settings"));
    setAttribute(".level-hud", "aria-label", t("levelGoal"));
    const levelStats = document.querySelectorAll(".level-stat span");
    if (levelStats[0]) levelStats[0].textContent = t("target");
    if (levelStats[1]) levelStats[1].textContent = t("captured");
    if (levelStats[2]) levelStats[2].textContent = t("penalties");
    setAttribute("#jezzCanvas", "aria-label", t("playfield"));
    const obstacleItems = document.querySelectorAll(".obstacle-legend-item");
    if (obstacleItems[0]) obstacleItems[0].lastChild.textContent = ` ${t("obstacleDanger")}`;
    if (obstacleItems[1]) obstacleItems[1].lastChild.textContent = ` ${t("obstacleSafe")}`;
    setAttribute("#completeCloseButton", "aria-label", t("toChapters"));
    setText("#rewardTitle", t("levelComplete"));
    setAttribute("#rewardStars", "aria-label", t("earnedStars"));
    if (levelCompleteScore) {
      const percent = levelCompleteScore.textContent.replace("%", "") || String(LEVEL_ONE_TARGET);
      const [before, after] = t("capturedField", { percent }).split(`${percent}%`);
      document.querySelector(".reward-capture")?.replaceChildren(before || "", levelCompleteScore, after || "");
    }
    setText(".reward-prizes h3", t("rewards"));
    setText("#completeReplayButton", t("replay"));
    setText("#completeNextButton", levelState.replayingCompleted ? t("exitBack") : t("nextLevel"));
    setAttribute(".level-helper-panel", "aria-label", t("levelHintPanel"));
    setText(".level-helper-panel p", t("levelHint"));
    const helperTarget = document.querySelector(".helper-target");
    if (helperTarget) {
      helperTarget.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = ` ${t("toGoal")}`;
        }
      });
    }
    setAttribute("#final-screen", "aria-label", t("final"));
    setAttribute("#final-screen .top-ui", "aria-label", t("topPanel"));
    setAttribute("#final-screen [data-action='return-chapter']", "aria-label", t("backToChapter"));
    setAttribute("#final-screen .resource-strip", "aria-label", t("resources"));
    setAttribute("#final-screen .coins-pill", "aria-label", t("coins"));
    setAttribute("#final-screen .lives-pill", "aria-label", t("lives"));
    setAttribute("#final-screen [data-action='achievements']", "aria-label", t("totalStars"));
    setAttribute("#final-screen [data-action='settings']", "aria-label", t("settings"));
    setText(".final-card span", t("finalUnlocked"));
    setText(".final-card h2", t("finalTitle"));
    setText(".final-card [data-action='main-menu']", t("toMenu"));
    setAttribute(".settings-close", "aria-label", t("closeSettings"));
    setText("#settingsTitle", t("settings"));
    setText(".toggle-row:nth-of-type(1) span", t("music"));
    setText(".toggle-row:nth-of-type(2) span", t("sounds"));
    setText("#confirmTitle", t("confirm"));
    setText("#confirmMessage", t("continue"));
    setText("#confirmCancelButton", t("stay"));
    setText("#confirmAcceptButton", t("yes"));
  };

  const applyLanguage = (lang) => {
    yandexState.lang = normalizeLanguage(lang);
    localizeStaticDom();
  };

  const initYandexSdk = async () => {
    if (!window.YaGames || typeof window.YaGames.init !== "function") {
      applyLanguage("ru");
      return;
    }

    try {
      yandexState.sdk = await window.YaGames.init();
      applyLanguage("ru");
      renderChapterScreens();
      yandexState.sdk?.features?.LoadingAPI?.ready?.();
      yandexState.readySent = true;
    } catch (_error) {
      applyLanguage("ru");
    }
  };

  const updateGameplayMarker = (isActive) => {
    if (yandexState.gameplayActive === isActive) {
      return;
    }

    yandexState.gameplayActive = isActive;
    const gameplayApi = yandexState.sdk?.features?.GameplayAPI;
    const method = isActive ? "start" : "stop";

    try {
      gameplayApi?.[method]?.();
    } catch (_error) {
      // SDK marker failures should never interrupt the playable loop.
    }
  };

  const clampChapterId = (chapterId) => Math.min(chapters.length, Math.max(1, chapterId));
  const getChapter = (chapterId) => chapters[clampChapterId(chapterId) - 1];
  const getChapterScreenId = (chapterId) => `chapter-${clampChapterId(chapterId)}-screen`;
  const getChapterForLevel = (level) => Math.min(chapters.length, Math.max(1, Math.ceil(level / 10)));
  const getChapterLevelStart = (chapterId) => (chapterId - 1) * 10 + 1;
  const getChapterLevelEnd = (chapterId) => chapterId * 10;
  const getGeneratedLevelRewards = (level) => {
    const baseCoins = 45 + Math.floor(level * 5.5);

    return {
      1: { coins: baseCoins },
      2: { coins: Math.round(baseCoins * STAR_COIN_MULTIPLIERS[2]) },
      3: { coins: Math.round(baseCoins * STAR_COIN_MULTIPLIERS[3]) }
    };
  };

  const getBaseCoinReward = (level) => {
    const levelRewards = LEVEL_REWARDS[level] || getGeneratedLevelRewards(level);
    return levelRewards?.[1]?.coins || STAR_REWARDS[1].coins;
  };

  const getStarReward = (stars, level = state.selectedLevel) => {
    const safeStars = Math.max(1, Math.min(3, stars));
    return {
      coins: Math.round(getBaseCoinReward(level) * (STAR_COIN_MULTIPLIERS[safeStars] || STAR_COIN_MULTIPLIERS[1]))
    };
  };
  const getLevelCoinReward = (level, stars = 1) => getStarReward(stars, level).coins;
  const isChapterPerfectAfter = (level, stars) => {
    if (stars < 3) {
      return false;
    }

    const chapterId = getChapterForLevel(level);
    const chapterStart = getChapterLevelStart(chapterId);
    const chapterEnd = getChapterLevelEnd(chapterId);

    for (let chapterLevel = chapterStart; chapterLevel <= chapterEnd; chapterLevel += 1) {
      const earnedStars = chapterLevel === level ? stars : (state.starsByLevel[chapterLevel] || 0);
      if (earnedStars < 3) {
        return false;
      }
    }

    return true;
  };

  const getLifeRewardInfo = (stars, previousStars, level) => {
    if (stars < 3 || previousStars >= 3) {
      return { eligible: false, restoreLife: false, lifeFull: false, perfectChapterId: null };
    }

    const chapterId = getChapterForLevel(level);
    const perfectChapterId = isChapterPerfectAfter(level, stars) && !state.perfectChapters.has(chapterId)
      ? chapterId
      : null;
    const eligible = level % 10 === 0 || Boolean(perfectChapterId);

    return {
      eligible,
      restoreLife: eligible && state.lives < MAX_LIVES,
      lifeFull: eligible && state.lives >= MAX_LIVES,
      perfectChapterId
    };
  };

  const getRewardDelta = (stars, previousStars = 0, level = state.selectedLevel) => {
    const bestStars = Math.max(0, Math.min(3, previousStars));
    const nextStars = Math.max(0, Math.min(3, stars));
    if (nextStars <= bestStars) {
      return { stars: 0, coins: 0, restoreLife: false, lifeFull: false, perfectChapterId: null };
    }

    const lifeReward = getLifeRewardInfo(nextStars, bestStars, level);

    return {
      stars: nextStars - bestStars,
      coins: getStarReward(nextStars, level).coins - (bestStars > 0 ? getStarReward(bestStars, level).coins : 0),
      restoreLife: lifeReward.restoreLife,
      lifeFull: lifeReward.lifeFull,
      perfectChapterId: lifeReward.perfectChapterId
    };
  };

  const getStarsForResult = (percent, penalties) => {
    if (percent < levelState.target) {
      return 0;
    }

    if (penalties === 0) {
      return 3;
    }

    if (penalties <= 1) {
      return 2;
    }

    return 1;
  };

  const createIconButton = (action, label, path, extraClass = "") => `
    <button class="icon-button ${extraClass}" type="button" data-action="${action}" aria-label="${label}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>
    </button>
  `;

  const createTopUi = () => `
    <header class="top-ui" aria-label="${t("topPanel")}">
      ${createIconButton("main-menu", t("toMenu"), "M14.7 5.3a1 1 0 0 1 0 1.4L10.41 11H20a1 1 0 1 1 0 2h-9.59l4.3 4.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 0Z", "chapter-top-back")}
      <div class="resource-strip" aria-label="${t("resources")}">
        <div class="resource-pill resource-counter lives-pill" aria-label="${t("lives")}"><span class="resource-icon" aria-hidden="true">♥</span><span data-resource="lives">5</span><span class="life-restore-timer" data-life-timer hidden>3:00</span></div>
        <div class="resource-pill resource-counter coins-pill" aria-label="${t("coins")}"><span class="resource-icon" aria-hidden="true">●</span><span data-resource="coins">0</span></div>
        <div class="resource-pill resource-counter achievement-button" aria-label="${t("stars")}"><span class="resource-icon" aria-hidden="true">★</span><span data-resource="total-stars">0</span></div>
      </div>
      ${createIconButton("settings", t("settings"), "M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.3 7.3 0 0 0-1.69-.98L14.5 2.42A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.49.42L9.13 5.07c-.61.24-1.18.56-1.69.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65a7.9 7.9 0 0 0 0 1.96l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46c.13.23.4.32.64.22l2.49-1c.51.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.24 1.18-.56 1.69-.98l2.49 1c.24.1.51.01.64-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.18-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z", "settings-button")}
    </header>
  `;

  const getStarMarkup = (stars) => {
    let markup = "";
    for (let index = 1; index <= 3; index += 1) {
      markup += `<span class="${index <= stars ? "is-earned" : ""}" aria-hidden="true">★</span>`;
    }
    return markup;
  };

  const createLevelNode = (chapterId, index) => {
    const level = getChapterLevelStart(chapterId) + index;
    const stars = state.starsByLevel[level] || 0;
    const isUnlocked = level <= state.currentLevel;
    const isCurrent = level === state.currentLevel;
    const isCompleted = level < state.currentLevel;
    const node = document.createElement("div");
    const button = document.createElement("button");
    const starRow = document.createElement("div");

    node.className = "level-node";

    button.className = "level-button";
    button.type = "button";
    button.dataset.level = String(level);
    button.textContent = String(index + 1);

    if (isCurrent) {
      button.classList.add("is-current");
      button.setAttribute("aria-label", t("currentLevel", { level }));
    } else if (isCompleted) {
      button.classList.add("is-completed");
      button.setAttribute("aria-label", t("completedLevel", { level, stars }));
    } else {
      button.classList.add("is-locked");
      button.disabled = true;
      button.setAttribute("aria-label", t("lockedLevel", { level }));
    }

    if (isUnlocked) {
      button.addEventListener("click", () => openLevel(level));
      setPressedFeedback(button);
    }

    starRow.className = "level-stars";
    starRow.innerHTML = getStarMarkup(stars);
    node.append(button, starRow);
    return node;
  };

  const isChapterUnlocked = (chapterId) => getChapterLevelStart(chapterId) <= state.currentLevel;

  const createChapterExpansionMarkup = (chapter) => {
    const nextText = chapter.id === chapters.length ? t("toFinal") : t("nextChapter");
    const nextAction = chapter.id === chapters.length ? "final" : "next-progress-chapter";
    return `
      <div class="level-layer" data-level-layer="${chapter.id}"></div>
      <button class="next-chapter-cta" type="button" data-chapter-cta="${chapter.id}" data-action="${nextAction}">${nextText}<span aria-hidden="true">→</span></button>
    `;
  };

  const createChapterItem = (chapter) => {
    const isExpanded = state.expandedChapters.has(chapter.id);
    const isUnlocked = isChapterUnlocked(chapter.id);
    const isCurrentChapter = chapter.id === getChapterForLevel(state.currentLevel);
    const levelsMarkup = isExpanded ? createChapterExpansionMarkup(chapter) : "";
    const statusText = state.chapterChests.has(chapter.id) ? t("chestClaimed") : t("chapterComplete");

    return `
      <article class="chapter-card ${isExpanded ? "is-expanded" : ""} ${isUnlocked ? "is-unlocked" : "is-locked"} ${isCurrentChapter ? "is-current-chapter" : ""}" data-chapter-card="${chapter.id}">
        <div class="chapter-card-head">
          <span class="chapter-badge" aria-hidden="true"><span class="chapter-badge-icon">${chapter.icon}</span></span>
          <span class="chapter-card-copy">
            <span class="chapter-kicker">${t("chapter")} ${chapter.id}</span>
            <span class="chapter-card-title">${getChapterTitle(chapter.id)}</span>
            <span class="chapter-complete-status" data-chapter-status="${chapter.id}" aria-hidden="true">${statusText}</span>
          </span>
          <button class="chapter-toggle" type="button" data-action="toggle-chapter" data-chapter-id="${chapter.id}" aria-expanded="${isExpanded ? "true" : "false"}" aria-label="${isExpanded ? t("collapseChapter") : t("expandChapter")}">
            <span class="chapter-chevron" aria-hidden="true">${isExpanded ? "⌃" : "⌄"}</span>
          </button>
        </div>
        ${levelsMarkup}
      </article>
    `;
  };

  const createChapterScreen = (chapter) => {
    const screen = document.getElementById(getChapterScreenId(chapter.id));

    screen.setAttribute("aria-label", `${t("chapter")} ${chapter.id} ${getChapterTitle(chapter.id)}`);
    screen.innerHTML = `
      <div class="chapter-scene">
        ${createTopUi()}
        <div class="chapter-select">
          <div class="chapter-select-title">
            <h2><span aria-hidden="true">✦</span>${t("chapterSelect")}<span aria-hidden="true">✦</span></h2>
            <p>${t("chapterSelectHint")}</p>
          </div>
          <div class="chapter-list">
            ${chapters.map((item) => createChapterItem(item)).join("")}
          </div>
        </div>
        <nav class="chapter-action-bar" aria-label="${t("shopAndAchievements")}">
          <button type="button" data-action="shop"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14.26c-.75 0-1.41-.41-1.75-1.03L2 6.2V5h3.21l.94 2h12.9c.75 0 1.24.78.92 1.45l-2.42 5.05A2 2 0 0 1 15.74 14H8.1l-1.1 2h12v2H7c-1.52 0-2.48-1.63-1.75-2.96l1.03-1.86-.12-.24ZM7.1 9l1.42 3h7.22l1.44-3H7.1Z"/></svg>${t("shop")}</button>
          <button type="button" data-action="achievements"><span aria-hidden="true">★</span>${t("achievements")}</button>
        </nav>
      </div>
    `;
  };

  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  };

  const renderChapterScreens = () => {
    chapters.forEach(createChapterScreen);
    renderAllChapters();
    document.querySelectorAll("button").forEach(setPressedFeedback);
  };

  const setPressedFeedback = (button) => {
    button.addEventListener("pointerdown", () => {
      if (!button.disabled) {
        button.classList.add("is-pressed");
      }
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      button.addEventListener(eventName, () => button.classList.remove("is-pressed"));
    });
  };

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      const isActive = screen.id === screenId;
      screen.classList.toggle("is-active", isActive);
      screen.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  }

  const saveProgress = () => {
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify({
        currentChapter: state.currentChapter,
        currentLevel: state.currentLevel,
        selectedLevel: state.selectedLevel,
        coins: state.coins,
        lives: state.lives,
        nextLifeAt: state.nextLifeAt,
        music: state.music,
        sound: state.sound,
        starsByLevel: state.starsByLevel,
        perfectChapters: Array.from(state.perfectChapters),
        chapterChests: Array.from(state.chapterChests),
        expandedChapters: Array.from(state.expandedChapters)
      }));
    } catch (_error) {
      // Some embedded browsers disable storage; the game still works for the session.
    }
  };

  const loadProgress = () => {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return;
      }

      const saved = JSON.parse(raw);
      state.currentChapter = clampChapterId(Number(saved.currentChapter) || state.currentChapter);
      state.currentLevel = Math.max(1, Math.min(TOTAL_LEVELS + 1, Math.round(Number(saved.currentLevel) || state.currentLevel)));
      state.selectedLevel = Math.max(1, Math.min(TOTAL_LEVELS, Math.round(Number(saved.selectedLevel) || state.selectedLevel)));
      state.coins = Math.max(0, Math.round(Number(saved.coins) || 0));
      state.lives = Math.max(0, Math.min(MAX_LIVES, Math.round(Number(saved.lives) || 0)));
      state.nextLifeAt = Number.isFinite(Number(saved.nextLifeAt)) ? Number(saved.nextLifeAt) : null;
      state.music = saved.music !== false;
      state.sound = saved.sound !== false;
      state.starsByLevel = saved.starsByLevel && typeof saved.starsByLevel === "object" ? saved.starsByLevel : {};
      state.perfectChapters = new Set(
        Array.isArray(saved.perfectChapters)
          ? saved.perfectChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
          : []
      );
      state.chapterChests = new Set(
        Array.isArray(saved.chapterChests)
          ? saved.chapterChests.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
          : []
      );
      state.expandedChapters = new Set(
        Array.isArray(saved.expandedChapters)
          ? saved.expandedChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
          : [getChapterForLevel(state.currentLevel)]
      );
      state.expandedChapters.add(getChapterForLevel(state.currentLevel));
    } catch (_error) {
      state.perfectChapters = new Set();
      state.chapterChests = new Set();
      state.expandedChapters = new Set([getChapterForLevel(state.currentLevel)]);
    }
  };

  const showConfirm = ({ title, message, acceptText = t("yes"), cancelText = t("stay") }) => {
    if (!confirmModal) {
      return Promise.resolve(true);
    }

    confirmTitle.textContent = title;
    if (message) {
      confirmMessage.hidden = false;
      confirmMessage.textContent = message;
    } else {
      confirmMessage.hidden = true;
      confirmMessage.textContent = "";
    }
    confirmAcceptButton.textContent = acceptText;
    const hasCancel = Boolean(cancelText);
    confirmCancelButton.hidden = !hasCancel;
    confirmCancelButton.textContent = hasCancel ? cancelText : "";
    confirmCancelButton.parentElement?.setAttribute("data-count", hasCancel ? "2" : "1");
    confirmModal.classList.add("is-open");
    confirmModal.setAttribute("aria-hidden", "false");
    confirmAcceptButton.focus();

    return new Promise((resolve) => {
      confirmResolve = resolve;
    });
  };

  const closeConfirm = (result) => {
    if (!confirmModal || !confirmResolve) {
      return;
    }

    confirmModal.classList.remove("is-open");
    confirmModal.setAttribute("aria-hidden", "true");
    const resolve = confirmResolve;
    confirmResolve = null;
    resolve(result);
  };

  const showChapterChest = (chapterId) => new Promise((resolve) => {
    const panel = document.createElement("div");
    panel.className = "chapter-chest-panel is-visible";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML = `
      <div class="chapter-chest-card">
        <div class="chapter-chest-icon" aria-hidden="true">★</div>
        <h2>${t("chapterChestTitle")}</h2>
        <p>${t("chapterChestMessage", { chapter: chapterId })}</p>
        <button class="menu-button play-button compact-play" type="button">${t("ok")}</button>
      </div>
    `;

    const close = () => {
      panel.remove();
      resolve();
    };

    panel.querySelector("button")?.addEventListener("click", close, { once: true });
    root.append(panel);
  });

  const isCompletedLevel = (level) => level < state.currentLevel || (state.starsByLevel[level] || 0) > 0;
  const isChapterComplete = (chapterId) => state.currentLevel > getChapterLevelEnd(chapterId);
  const isChapterFinalLevel = (level) => level === getChapterLevelEnd(getChapterForLevel(level));

  const setCompletionActions = (isReplay) => {
    levelState.replayingCompleted = isReplay;
    if (!completeNextButton) {
      return;
    }

    completeNextButton.dataset.destination = isReplay ? "chapters" : "next";
    completeNextButton.textContent = isReplay ? t("exitBack") : t("nextLevel");
    completeNextButton.setAttribute("aria-label", isReplay ? t("exitBack") : t("nextLevel"));
  };

  const getEarnedStars = () => Object.values(state.starsByLevel).reduce((sum, stars) => sum + stars, 0);

  const formatLifeRestoreTime = (ms) => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const syncLifeRestoreTimer = () => {
    const showTimer = Boolean(state.nextLifeAt && state.lives < MAX_LIVES);
    const text = showTimer ? formatLifeRestoreTime(state.nextLifeAt - Date.now()) : "";

    document.querySelectorAll("[data-life-timer]").forEach((node) => {
      node.hidden = !showTimer;
      node.textContent = text;
    });
  };

  const syncResources = () => {
    state.achievements = getEarnedStars();
    state.lives = Math.min(MAX_LIVES, Math.max(0, state.lives));
    state.coins = Math.max(0, state.coins);

    document.querySelectorAll('[data-resource="coins"]').forEach((node) => {
      node.textContent = state.coins;
    });
    document.querySelectorAll('[data-resource="lives"]').forEach((node) => {
      node.textContent = state.lives;
    });
    document.querySelectorAll('[data-resource="achievements"], [data-resource="total-stars"]').forEach((node) => {
      node.textContent = state.achievements;
    });
    document.querySelectorAll('[data-resource="level-stars"]').forEach((node) => {
      node.textContent = levelState.completed && levelState.lastCompletion
        ? levelState.lastCompletion.stars
        : (state.starsByLevel[state.selectedLevel] || 0);
    });
    syncLifeRestoreTimer();
    saveProgress();
  };

  const restoreLife = () => {
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncResources();
      return;
    }

    state.lives += 1;
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
    } else if (!state.nextLifeAt) {
      state.nextLifeAt = Date.now() + LIFE_RESTORE_MS;
    }
    syncResources();
  };

  const updateLifeRestore = () => {
    if (!state.nextLifeAt || state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncLifeRestoreTimer();
      return;
    }

    const now = Date.now();
    if (now >= state.nextLifeAt) {
      const restoredLives = 1 + Math.floor((now - state.nextLifeAt) / LIFE_RESTORE_MS);
      state.lives = Math.min(MAX_LIVES, state.lives + restoredLives);
      state.nextLifeAt = state.lives < MAX_LIVES
        ? state.nextLifeAt + restoredLives * LIFE_RESTORE_MS
        : null;
      syncResources();
      return;
    }

    syncLifeRestoreTimer();
  };

  const spendLife = () => {
    if (state.lives <= 0) {
      syncResources();
      return false;
    }

    state.lives -= 1;
    if (!state.nextLifeAt && state.lives < MAX_LIVES) {
      state.nextLifeAt = Date.now() + LIFE_RESTORE_MS;
    }
    syncResources();
    return true;
  };

  const renderChapterLevels = (chapterId) => {
    const layers = document.querySelectorAll(`[data-level-layer="${chapterId}"]`);

    layers.forEach((layer) => {
      const fragment = document.createDocumentFragment();

      for (let index = 0; index < 10; index += 1) {
        fragment.append(createLevelNode(chapterId, index));
      }

      layer.replaceChildren(fragment);
    });
  };

  const updateChapterCtas = () => {
    chapters.forEach((chapter) => {
      const ctas = document.querySelectorAll(`[data-chapter-cta="${chapter.id}"]`);
      const statuses = document.querySelectorAll(`[data-chapter-status="${chapter.id}"]`);
      const complete = isChapterComplete(chapter.id);
      const nextChapterVisible = chapter.id < chapters.length && isChapterUnlocked(chapter.id + 1);
      const showCta = complete && (chapter.id === chapters.length || !nextChapterVisible);
      const statusText = state.chapterChests.has(chapter.id) ? t("chestClaimed") : t("chapterComplete");

      ctas.forEach((cta) => {
        cta.classList.toggle("is-visible", showCta);
        cta.setAttribute("aria-hidden", showCta ? "false" : "true");
      });
      statuses.forEach((status) => {
        status.textContent = statusText;
        status.classList.toggle("is-visible", complete && !showCta);
        status.setAttribute("aria-hidden", complete && !showCta ? "false" : "true");
      });
    });
  };

  const renderAllChapters = () => {
    chapters.forEach((chapter) => renderChapterLevels(chapter.id));
    updateChapterCtas();
    syncResources();
  };

  const keepChapterInView = (chapterId, scrollTop = 0) => {
    const screen = document.getElementById(getChapterScreenId(chapterId));
    const list = screen ? screen.querySelector(".chapter-list") : null;
    const card = screen ? screen.querySelector(`[data-chapter-card="${chapterId}"]`) : null;

    if (!list || !card) {
      return;
    }

    list.scrollTop = scrollTop;

    const listRect = list.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    if (cardRect.top < listRect.top) {
      list.scrollTop += cardRect.top - listRect.top - 8;
    } else if (cardRect.bottom > listRect.bottom) {
      list.scrollTop += cardRect.bottom - listRect.bottom + 8;
    }
  };

  const syncChapterCardExpansion = (chapterId) => {
    const chapter = getChapter(chapterId);
    const isExpanded = state.expandedChapters.has(chapter.id);
    const cards = document.querySelectorAll(`[data-chapter-card="${chapter.id}"]`);

    cards.forEach((card) => {
      const toggle = card.querySelector(".chapter-toggle");
      const chevron = card.querySelector(".chapter-chevron");
      const existingLayer = card.querySelector(".level-layer");
      const existingCta = card.querySelector(".next-chapter-cta");

      card.classList.toggle("is-expanded", isExpanded);
      toggle?.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      toggle?.setAttribute("aria-label", isExpanded ? t("collapseChapter") : t("expandChapter"));
      if (chevron) {
        chevron.textContent = isExpanded ? "⌃" : "⌄";
      }

      if (isExpanded && !existingLayer) {
        card.insertAdjacentHTML("beforeend", createChapterExpansionMarkup(chapter));
        const newCta = card.querySelector(".next-chapter-cta");
        if (newCta) {
          setPressedFeedback(newCta);
        }
      }

      if (!isExpanded) {
        existingLayer?.remove();
        existingCta?.remove();
      }
    });

    if (isExpanded) {
      renderChapterLevels(chapter.id);
    }

    updateChapterCtas();
    syncResources();
  };

  const getCaptureRatio = () => levelState.totalArea > 0 ? levelState.capturedArea / levelState.totalArea : 0;

  const showLevelToast = (message) => {
    if (!levelToast) {
      return;
    }

    levelToast.textContent = message;
    levelToast.classList.add("is-visible");
    window.clearTimeout(levelState.toastTimer);
    levelState.toastTimer = window.setTimeout(() => {
      levelToast.classList.remove("is-visible");
    }, 1100);
  };

  const syncLevelHud = () => {
    const percent = Math.floor(getCaptureRatio() * 100);
    if (capturePercent) {
      capturePercent.textContent = `${percent}%`;
    }
    if (penaltyCount) {
      penaltyCount.textContent = String(levelState.penalties);
    }
    if (targetPercent) {
      targetPercent.textContent = `${levelState.target}%`;
    }
    if (helperTargetPercent) {
      helperTargetPercent.textContent = `${levelState.target}%`;
    }
    if (obstacleLegend) {
      obstacleLegend.hidden = !(levelState.obstacles && levelState.obstacles.length);
    }
  };

  const resizeJezzCanvas = () => {
    if (!jezzCanvas) {
      return { width: 0, height: 0 };
    }

    const pixelRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const box = jezzCanvas.getBoundingClientRect();
    const width = Math.max(280, Math.round(box.width));
    const height = Math.max(240, Math.round(box.height));
    jezzCanvas.width = Math.round(width * pixelRatio);
    jezzCanvas.height = Math.round(height * pixelRatio);
    const ctx = jezzCanvas.getContext("2d");
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return { width, height };
  };

  const getCanvasPoint = (event) => {
    const rect = jezzCanvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const pointInRect = (point, rect) => (
    point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.h
  );

  const rectArea = (rect) => rect.w * rect.h;

  const getLevelConfig = (level) => LEVEL_CONFIGS[level] || LEVEL_CONFIGS[1];

  const getSpeedValue = (speed) => LEVEL_SPEEDS[speed] || LEVEL_SPEEDS.medium;

  const createObstacle = (definition, rect, index = 0) => {
    const obstacle = {
      ...definition,
      type: definition.type || (definition.moving ? "moving" : "static"),
      safe: Boolean(definition.safe),
      moving: definition.type ? definition.type === "moving" : Boolean(definition.moving),
      blocksBall: definition.blocksBall ?? !definition.safe,
      baseX: definition.x,
      baseY: definition.y,
      wRatio: definition.w,
      hRatio: definition.h,
      x1Ratio: definition.x1,
      x2Ratio: definition.x2,
      y1Ratio: definition.y1,
      y2Ratio: definition.y2,
      phase: definition.phase || index * 0.27,
      thickness: OBSTACLE_THICKNESS
    };
    return updateObstacleGeometry(obstacle, rect, 0);
  };

  function updateObstacleGeometry(obstacle, rect, elapsed) {
    const wave = obstacle.moving ? Math.sin((elapsed * 0.9) + obstacle.phase * Math.PI * 2) * (obstacle.amplitude || 0.12) : 0;
    if (obstacle.wRatio !== undefined && obstacle.hRatio !== undefined) {
      const offsetX = obstacle.axis === "x" ? wave : 0;
      const offsetY = obstacle.axis === "y" ? wave : 0;
      const maxX = Math.max(0.02, 0.98 - obstacle.wRatio);
      const maxY = Math.max(0.02, 0.98 - obstacle.hRatio);
      obstacle.x = rect.x + rect.w * Math.min(maxX, Math.max(0.02, (obstacle.baseX ?? 0.5) + offsetX));
      obstacle.y = rect.y + rect.h * Math.min(maxY, Math.max(0.02, (obstacle.baseY ?? 0.5) + offsetY));
      obstacle.w = rect.w * obstacle.wRatio;
      obstacle.h = rect.h * obstacle.hRatio;
      return obstacle;
    }

    if (obstacle.orientation === "vertical") {
      const offsetY = obstacle.axis === "y" ? wave : 0;
      const offsetX = obstacle.axis === "x" ? wave : 0;
      obstacle.x = rect.x + rect.w * Math.min(0.92, Math.max(0.08, (obstacle.baseX ?? 0.5) + offsetX));
      obstacle.y1 = rect.y + rect.h * Math.min(0.92, Math.max(0.08, (obstacle.y1Ratio ?? obstacle.y1) + offsetY));
      obstacle.y2 = rect.y + rect.h * Math.min(0.92, Math.max(0.08, (obstacle.y2Ratio ?? obstacle.y2) + offsetY));
      if (obstacle.y1 > obstacle.y2) [obstacle.y1, obstacle.y2] = [obstacle.y2, obstacle.y1];
    } else {
      const offsetX = obstacle.axis === "x" ? wave : 0;
      const offsetY = obstacle.axis === "y" ? wave : 0;
      obstacle.y = rect.y + rect.h * Math.min(0.92, Math.max(0.08, (obstacle.baseY ?? obstacle.y ?? 0.5) + offsetY));
      obstacle.x1 = rect.x + rect.w * Math.min(0.92, Math.max(0.08, (obstacle.x1Ratio ?? obstacle.x1) + offsetX));
      obstacle.x2 = rect.x + rect.w * Math.min(0.92, Math.max(0.08, (obstacle.x2Ratio ?? obstacle.x2) + offsetX));
      if (obstacle.x1 > obstacle.x2) [obstacle.x1, obstacle.x2] = [obstacle.x2, obstacle.x1];
    }
    return obstacle;
  }

  const ballRect = (ball) => levelState.activeRects.find((rect) => pointInRect(ball, rect)) || levelState.activeRect || levelState.rect;

  const getPointerActiveRect = (point) => levelState.activeRects.find((rect) => pointInRect(point, rect)) || null;

  const forEachBall = (callback) => {
    const balls = levelState.balls && levelState.balls.length ? levelState.balls : (levelState.ball ? [levelState.ball] : []);
    balls.forEach(callback);
  };

  const clampBallToRect = (ball, rect) => {
    if (!ball || !rect) {
      return;
    }

    ball.x = Math.min(rect.x + rect.w - ball.r, Math.max(rect.x + ball.r, ball.x));
    ball.y = Math.min(rect.y + rect.h - ball.r, Math.max(rect.y + ball.r, ball.y));
  };

  const clampBallsToActiveRects = () => {
    forEachBall((ball) => clampBallToRect(ball, ballRect(ball)));
  };

  const buildCompletedWall = (line, rect) => (
    line.orientation === "vertical"
      ? { orientation: "vertical", x: line.x, y1: rect.y, y2: rect.y + rect.h }
      : { orientation: "horizontal", y: line.y, x1: rect.x, x2: rect.x + rect.w }
  );

  const lineHitsObstacle = (line, obstacle) => {
    const pad = (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5;
    if (line.orientation === "vertical") {
      const minY = Math.min(line.y, line.endA, line.endB);
      const maxY = Math.max(line.y, line.endA, line.endB);
      if (obstacle.w !== undefined && obstacle.h !== undefined) {
        return line.x >= obstacle.x - pad
          && line.x <= obstacle.x + obstacle.w + pad
          && maxY >= obstacle.y - pad
          && minY <= obstacle.y + obstacle.h + pad;
      }

      if (obstacle.orientation === "vertical") {
        return Math.abs(line.x - obstacle.x) <= pad
          && maxY >= obstacle.y1 - pad
          && minY <= obstacle.y2 + pad;
      }

      return line.x >= obstacle.x1 - pad
        && line.x <= obstacle.x2 + pad
        && obstacle.y >= minY - pad
        && obstacle.y <= maxY + pad;
    }

    const minX = Math.min(line.x, line.endA, line.endB);
    const maxX = Math.max(line.x, line.endA, line.endB);
    if (obstacle.w !== undefined && obstacle.h !== undefined) {
      return line.y >= obstacle.y - pad
        && line.y <= obstacle.y + obstacle.h + pad
        && maxX >= obstacle.x - pad
        && minX <= obstacle.x + obstacle.w + pad;
    }

    if (obstacle.orientation === "horizontal") {
      return Math.abs(line.y - obstacle.y) <= pad
        && maxX >= obstacle.x1 - pad
        && minX <= obstacle.x2 + pad;
    }

    return line.y >= obstacle.y1 - pad
      && line.y <= obstacle.y2 + pad
      && obstacle.x >= minX - pad
      && obstacle.x <= maxX + pad;
  };

  const pointHitsObstacle = (point) => levelState.obstacles.some((obstacle) => {
    if (obstacle.safe) {
      return false;
    }

    const pad = (obstacle.thickness || OBSTACLE_THICKNESS) * 0.65;
    if (obstacle.w !== undefined && obstacle.h !== undefined) {
      return point.x >= obstacle.x - pad
        && point.x <= obstacle.x + obstacle.w + pad
        && point.y >= obstacle.y - pad
        && point.y <= obstacle.y + obstacle.h + pad;
    }

    return obstacle.orientation === "vertical"
      ? Math.abs(point.x - obstacle.x) <= pad && point.y >= obstacle.y1 - pad && point.y <= obstacle.y2 + pad
      : Math.abs(point.y - obstacle.y) <= pad && point.x >= obstacle.x1 - pad && point.x <= obstacle.x2 + pad;
  });

  const splitActiveRect = (line) => {
    const rect = line.rect || levelState.activeRect;
    if (!rect) {
      return;
    }

    let first;
    let second;

    if (line.orientation === "vertical") {
      first = { x: rect.x, y: rect.y, w: line.x - rect.x, h: rect.h };
      second = { x: line.x, y: rect.y, w: rect.x + rect.w - line.x, h: rect.h };
    } else {
      first = { x: rect.x, y: rect.y, w: rect.w, h: line.y - rect.y };
      second = { x: rect.x, y: line.y, w: rect.w, h: rect.y + rect.h - line.y };
    }

    if (first.w < BALL_RADIUS * 2 || first.h < BALL_RADIUS * 2 || second.w < BALL_RADIUS * 2 || second.h < BALL_RADIUS * 2) {
      showLevelToast(t("tooClose"));
      return;
    }

    const firstBalls = levelState.balls.filter((ball) => pointInRect(ball, first));
    const secondBalls = levelState.balls.filter((ball) => pointInRect(ball, second));
    const rectIndex = levelState.activeRects.indexOf(rect);
    if (rectIndex >= 0) {
      levelState.activeRects.splice(rectIndex, 1);
    }
    if (firstBalls.length) {
      levelState.activeRects.push(first);
    } else {
      levelState.capturedRects.push(first);
      levelState.capturedArea += rectArea(first);
    }
    if (secondBalls.length) {
      levelState.activeRects.push(second);
    } else {
      levelState.capturedRects.push(second);
      levelState.capturedArea += rectArea(second);
    }
    levelState.activeRect = levelState.activeRects[0] || null;
    levelState.walls.push(buildCompletedWall(line, rect));
    clampBallsToActiveRects();
    syncLevelHud();

    if (getCaptureRatio() * 100 >= levelState.target) {
      finishJezzLevel();
    }
  };

  const cancelActiveLine = (penalize = false) => {
    levelState.activeLine = null;
    if (penalize) {
      levelState.penalties += 1;
      syncLevelHud();
      showLevelToast(t("penalty"));
    }
  };

  const lineHitBall = (line) => {
    if (!line) {
      return false;
    }

    if (line.orientation === "vertical") {
      const minY = Math.min(line.y, line.endA, line.endB);
      const maxY = Math.max(line.y, line.endA, line.endB);
      return levelState.balls.some((ball) => Math.abs(ball.x - line.x) <= ball.r && ball.y >= minY - ball.r && ball.y <= maxY + ball.r);
    }

    const minX = Math.min(line.x, line.endA, line.endB);
    const maxX = Math.max(line.x, line.endA, line.endB);
    return levelState.balls.some((ball) => Math.abs(ball.y - line.y) <= ball.r && ball.x >= minX - ball.r && ball.x <= maxX + ball.r);
  };

  const updateActiveLine = (dt) => {
    const line = levelState.activeLine;
    const rect = line?.rect || levelState.activeRect;
    if (!line || !rect) {
      return;
    }

    const grow = LINE_GROW_SPEED * dt;
    if (line.orientation === "vertical") {
      line.endA = Math.max(rect.y, line.endA - grow);
      line.endB = Math.min(rect.y + rect.h, line.endB + grow);
      line.done = line.endA <= rect.y && line.endB >= rect.y + rect.h;
    } else {
      line.endA = Math.max(rect.x, line.endA - grow);
      line.endB = Math.min(rect.x + rect.w, line.endB + grow);
      line.done = line.endA <= rect.x && line.endB >= rect.x + rect.w;
    }

    if (lineHitBall(line) || levelState.obstacles.some((obstacle) => !obstacle.safe && lineHitsObstacle(line, obstacle))) {
      cancelActiveLine(true);
      return;
    }

    if (line.done) {
      levelState.activeLine = null;
      splitActiveRect(line);
    }
  };

  const bounceBallOffObstacle = (ball, obstacle) => {
    if (!obstacle.blocksBall) {
      return;
    }

    const pad = (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5;
    if (obstacle.w !== undefined && obstacle.h !== undefined) {
      const nearestX = Math.max(obstacle.x, Math.min(ball.x, obstacle.x + obstacle.w));
      const nearestY = Math.max(obstacle.y, Math.min(ball.y, obstacle.y + obstacle.h));
      const dx = ball.x - nearestX;
      const dy = ball.y - nearestY;
      if ((dx * dx) + (dy * dy) <= (ball.r + pad) ** 2) {
        if (Math.abs(dx) > Math.abs(dy)) {
          ball.vx *= -1;
          ball.x = nearestX + Math.sign(dx || ball.vx || 1) * (ball.r + pad);
        } else {
          ball.vy *= -1;
          ball.y = nearestY + Math.sign(dy || ball.vy || 1) * (ball.r + pad);
        }
      }
      return;
    }

    if (obstacle.orientation === "vertical") {
      const inY = ball.y >= obstacle.y1 - ball.r && ball.y <= obstacle.y2 + ball.r;
      if (inY && Math.abs(ball.x - obstacle.x) <= ball.r + pad) {
        ball.vx *= -1;
        ball.x = obstacle.x + (ball.x < obstacle.x ? -1 : 1) * (ball.r + pad);
      }
      return;
    }

    const inX = ball.x >= obstacle.x1 - ball.r && ball.x <= obstacle.x2 + ball.r;
    if (inX && Math.abs(ball.y - obstacle.y) <= ball.r + pad) {
      ball.vy *= -1;
      ball.y = obstacle.y + (ball.y < obstacle.y ? -1 : 1) * (ball.r + pad);
    }
  };

  const updateBalls = (dt) => {
    if (levelState.completed) {
      return;
    }

    levelState.balls.forEach((ball) => {
      const rect = ballRect(ball);
      if (!rect) {
        return;
      }

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      if (ball.x - ball.r <= rect.x || ball.x + ball.r >= rect.x + rect.w) {
        ball.vx *= -1;
        ball.x = Math.min(rect.x + rect.w - ball.r, Math.max(rect.x + ball.r, ball.x));
      }
      if (ball.y - ball.r <= rect.y || ball.y + ball.r >= rect.y + rect.h) {
        ball.vy *= -1;
        ball.y = Math.min(rect.y + rect.h - ball.r, Math.max(rect.y + ball.r, ball.y));
      }

      levelState.obstacles.forEach((obstacle) => bounceBallOffObstacle(ball, obstacle));
      clampBallToRect(ball, rect);
    });
  };

  const drawJezzLevel = () => {
    if (!jezzCanvas) {
      return;
    }

    const ctx = jezzCanvas.getContext("2d");
    const width = jezzCanvas.clientWidth;
    const height = jezzCanvas.clientHeight;
    const rect = levelState.rect;
    ctx.clearRect(0, 0, width, height);

    if (!rect) {
      return;
    }

    ctx.save();
    const boardGradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
    boardGradient.addColorStop(0, "rgba(13, 10, 48, 0.94)");
    boardGradient.addColorStop(0.5, "rgba(11, 16, 55, 0.96)");
    boardGradient.addColorStop(1, "rgba(28, 10, 68, 0.94)");
    ctx.fillStyle = boardGradient;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillStyle = "rgba(177, 160, 255, 0.28)";
    for (let x = rect.x + 16; x < rect.x + rect.w; x += 26) {
      for (let y = rect.y + 16; y < rect.y + rect.h; y += 26) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.strokeStyle = "rgba(190, 177, 255, 0.92)";
    ctx.lineWidth = 4;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

    levelState.capturedRects.forEach((captured) => {
      const capturedGradient = ctx.createLinearGradient(captured.x, captured.y, captured.x + captured.w, captured.y + captured.h);
      capturedGradient.addColorStop(0, "rgba(255, 211, 91, 0.7)");
      capturedGradient.addColorStop(1, "rgba(255, 78, 211, 0.48)");
      ctx.fillStyle = capturedGradient;
      ctx.fillRect(captured.x, captured.y, captured.w, captured.h);
      ctx.strokeStyle = "rgba(255, 242, 190, 0.78)";
      ctx.lineWidth = 2;
      ctx.strokeRect(captured.x, captured.y, captured.w, captured.h);
    });

    ctx.strokeStyle = "rgba(255, 240, 160, 0.96)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    levelState.walls.forEach((wall) => {
      ctx.beginPath();
      if (wall.orientation === "vertical") {
        ctx.moveTo(wall.x, wall.y1);
        ctx.lineTo(wall.x, wall.y2);
      } else {
        ctx.moveTo(wall.x1, wall.y);
        ctx.lineTo(wall.x2, wall.y);
      }
      ctx.stroke();
    });

    levelState.obstacles.forEach((obstacle) => {
      ctx.save();
      const obstacleColor = obstacle.color || (obstacle.safe ? "rgba(173, 246, 255, 0.92)" : (obstacle.moving ? "#8d2454" : "#ff4e7a"));
      ctx.strokeStyle = obstacleColor;
      ctx.fillStyle = obstacleColor;
      ctx.lineWidth = obstacle.safe ? Math.max(4, (obstacle.thickness || OBSTACLE_THICKNESS) * 0.48) : (obstacle.thickness || OBSTACLE_THICKNESS);
      ctx.lineCap = "round";
      ctx.shadowColor = obstacle.safe ? "rgba(106, 235, 255, 0.62)" : "rgba(255, 78, 122, 0.7)";
      ctx.shadowBlur = obstacle.safe ? 9 : 16;
      if (obstacle.safe) {
        ctx.setLineDash([13, 11]);
      }
      ctx.beginPath();
      if (obstacle.w !== undefined && obstacle.h !== undefined) {
        ctx.roundRect?.(obstacle.x, obstacle.y, obstacle.w, obstacle.h, 6);
        if (!ctx.roundRect) {
          ctx.rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
        }
        ctx.globalAlpha = obstacle.safe ? 0.68 : 0.92;
        ctx.fill();
      } else if (obstacle.orientation === "vertical") {
        ctx.moveTo(obstacle.x, obstacle.y1);
        ctx.lineTo(obstacle.x, obstacle.y2);
        ctx.stroke();
      } else {
        ctx.moveTo(obstacle.x1, obstacle.y);
        ctx.lineTo(obstacle.x2, obstacle.y);
        ctx.stroke();
      }
      ctx.restore();
    });

    const line = levelState.activeLine;
    if (line) {
      const lineGradient = line.orientation === "vertical"
        ? ctx.createLinearGradient(line.x, line.endA, line.x, line.endB)
        : ctx.createLinearGradient(line.endA, line.y, line.endB, line.y);
      lineGradient.addColorStop(0, "rgba(126, 247, 255, 0.96)");
      lineGradient.addColorStop(0.5, "rgba(255, 246, 145, 0.98)");
      lineGradient.addColorStop(1, "rgba(255, 91, 218, 0.96)");
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255, 237, 132, 0.58)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      if (line.orientation === "vertical") {
        ctx.moveTo(line.x, line.endA);
        ctx.lineTo(line.x, line.endB);
      } else {
        ctx.moveTo(line.endA, line.y);
        ctx.lineTo(line.endB, line.y);
      }
      ctx.stroke();
    }

    const aim = levelState.draftPointer || levelState.aimPointer;
    if (aim && !line && (aim.rect || levelState.activeRect)) {
      const aimRect = aim.rect || levelState.activeRect;
      const orientation = aim.orientation || getFallbackLineOrientation(aim, aimRect);
      ctx.save();
      ctx.strokeStyle = "rgba(255, 246, 145, 0.94)";
      ctx.lineWidth = levelState.draftPointer ? 4 : 3;
      ctx.lineCap = "round";
      ctx.setLineDash(levelState.draftPointer ? [14, 10] : [8, 9]);
      ctx.shadowColor = "rgba(255, 219, 76, 0.82)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      if (orientation === "vertical") {
        ctx.moveTo(aim.x, aimRect.y + 8);
        ctx.lineTo(aim.x, aimRect.y + aimRect.h - 8);
      } else {
        ctx.moveTo(aimRect.x + 8, aim.y);
        ctx.lineTo(aimRect.x + aimRect.w - 8, aim.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255, 246, 145, 0.96)";
      ctx.font = "900 26px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(orientation === "vertical" ? "↕" : "↔", aim.x, aim.y);
      ctx.restore();
    }

    levelState.balls.forEach((ball) => {
      const gradient = ctx.createRadialGradient(ball.x - 4, ball.y - 5, 2, ball.x, ball.y, ball.r + 4);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.28, "#9ff7ff");
      gradient.addColorStop(1, "#3f46ff");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ctx.restore();
  };

  function finishJezzLevel() {
    if (levelState.completed) {
      return;
    }

    levelState.completed = true;
    levelState.running = false;
    updateGameplayMarker(false);
    levelState.activeLine = null;
    const percent = Math.floor(getCaptureRatio() * 100);
    const stars = getStarsForResult(percent, levelState.penalties);
    const previousStars = state.starsByLevel[state.selectedLevel] || 0;
    const reward = getRewardDelta(stars, previousStars);
    const replayingCompleted = levelState.replayingCompleted || isCompletedLevel(state.selectedLevel);
    levelState.lastCompletion = {
      level: state.selectedLevel,
      percent,
      penalties: levelState.penalties,
      stars,
      awardedStars: reward.stars,
      coins: reward.coins,
      restoreLife: reward.restoreLife,
      lifeFull: reward.lifeFull,
      perfectChapterId: reward.perfectChapterId,
      chapterChestId: null,
      replayingCompleted,
      applied: false
    };
    setCompletionActions(replayingCompleted);
    if (levelCompleteScore) {
      levelCompleteScore.textContent = `${percent}%`;
    }
    const rewardCapture = document.querySelector(".reward-capture");
    if (rewardCapture && levelCompleteScore) {
      const [before, after] = t("capturedField", { percent }).split(`${percent}%`);
      levelCompleteScore.textContent = `${percent}%`;
      rewardCapture.replaceChildren(before || "", levelCompleteScore, after || "");
    }
    if (rewardCoins) {
      rewardCoins.textContent = `+${reward.coins}`;
    }
    if (rewardLife) {
      rewardLife.textContent = reward.restoreLife ? "+1" : (reward.lifeFull ? t("livesFull") : "0");
    }
    if (rewardLifePrize) {
      rewardLifePrize.hidden = !(reward.restoreLife || reward.lifeFull);
    }
    if (rewardPrizes) {
      rewardPrizes.dataset.prizeCount = reward.restoreLife || reward.lifeFull ? "2" : "1";
    }
    if (rewardStars) {
      rewardStars.dataset.stars = String(stars);
      rewardStars.querySelectorAll("[data-star]").forEach((star) => {
        star.classList.toggle("is-earned", Number(star.dataset.star) <= stars);
      });
    }
    levelCompletePanel?.classList.add("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "false");
    syncResources();
  }

  const tickJezzLevel = (time) => {
    if (!levelState.running) {
      drawJezzLevel();
      return;
    }

    const dt = Math.min(0.033, Math.max(0, (time - levelState.lastFrameAt) / 1000 || 0));
    levelState.lastFrameAt = time;
    levelState.elapsed += dt;
    levelState.obstacles.forEach((obstacle) => updateObstacleGeometry(obstacle, levelState.rect, levelState.elapsed));
    updateBalls(dt);
    updateActiveLine(dt);
    drawJezzLevel();
    levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
  };

  const stopJezzLevel = () => {
    levelState.running = false;
    updateGameplayMarker(false);
    if (levelState.animationId) {
      window.cancelAnimationFrame(levelState.animationId);
      levelState.animationId = null;
    }
  };

  const mapPointBetweenRects = (point, fromRect, toRect) => ({
    x: toRect.x + ((point.x - fromRect.x) / fromRect.w) * toRect.w,
    y: toRect.y + ((point.y - fromRect.y) / fromRect.h) * toRect.h
  });

  const mapRectBetweenRects = (rect, fromRect, toRect) => {
    const start = mapPointBetweenRects({ x: rect.x, y: rect.y }, fromRect, toRect);
    const end = mapPointBetweenRects({ x: rect.x + rect.w, y: rect.y + rect.h }, fromRect, toRect);
    return {
      x: start.x,
      y: start.y,
      w: end.x - start.x,
      h: end.y - start.y
    };
  };

  const mapWallBetweenRects = (wall, fromRect, toRect) => {
    if (wall.orientation === "vertical") {
      const top = mapPointBetweenRects({ x: wall.x, y: wall.y1 }, fromRect, toRect);
      const bottom = mapPointBetweenRects({ x: wall.x, y: wall.y2 }, fromRect, toRect);
      return { orientation: wall.orientation, x: top.x, y1: top.y, y2: bottom.y };
    }

    const left = mapPointBetweenRects({ x: wall.x1, y: wall.y }, fromRect, toRect);
    const right = mapPointBetweenRects({ x: wall.x2, y: wall.y }, fromRect, toRect);
    return { orientation: wall.orientation, y: left.y, x1: left.x, x2: right.x };
  };

  const resizeActiveJezzLevel = () => {
    const oldRect = levelState.rect;
    const size = resizeJezzCanvas();
    const margin = Math.max(12, Math.min(22, size.width * 0.03));
    const nextRect = {
      x: margin,
      y: margin,
      w: size.width - margin * 2,
      h: size.height - margin * 2
    };

    if (!oldRect || oldRect.w <= 0 || oldRect.h <= 0) {
      startJezzLevel();
      return;
    }

    levelState.rect = nextRect;
    levelState.activeRect = levelState.activeRect
      ? mapRectBetweenRects(levelState.activeRect, oldRect, nextRect)
      : { ...nextRect };
    levelState.activeRects = levelState.activeRects.length
      ? levelState.activeRects.map((rect) => mapRectBetweenRects(rect, oldRect, nextRect))
      : [levelState.activeRect];
    levelState.capturedRects = levelState.capturedRects.map((rect) => mapRectBetweenRects(rect, oldRect, nextRect));
    levelState.walls = levelState.walls.map((wall) => mapWallBetweenRects(wall, oldRect, nextRect));
    levelState.obstacles = (levelState.config.obstacles || []).map((obstacle, index) => createObstacle(obstacle, nextRect, index));
    levelState.obstacles.forEach((obstacle) => updateObstacleGeometry(obstacle, nextRect, levelState.elapsed));
    levelState.capturedArea = levelState.capturedRects.reduce((sum, rect) => sum + rectArea(rect), 0);
    levelState.totalArea = rectArea(nextRect);
    levelState.activeLine = null;
    levelState.draftPointer = null;

    levelState.balls.forEach((ball) => {
      const nextBall = mapPointBetweenRects(ball, oldRect, nextRect);
      ball.x = nextBall.x;
      ball.y = nextBall.y;
    });
    levelState.ball = levelState.balls[0] || null;

    syncLevelHud();
    drawJezzLevel();
  };

  const startJezzLevel = () => {
    stopJezzLevel();
    const size = resizeJezzCanvas();
    const margin = Math.max(12, Math.min(22, size.width * 0.03));
    const rect = {
      x: margin,
      y: margin,
      w: size.width - margin * 2,
      h: size.height - margin * 2
    };
    const config = getLevelConfig(state.selectedLevel);
    const speed = getSpeedValue(config.speed);
    levelState.running = true;
    updateGameplayMarker(true);
    levelState.completed = false;
    levelState.config = config;
    levelState.target = config.target;
    levelState.capturedArea = 0;
    levelState.totalArea = rectArea(rect);
    levelState.penalties = 0;
    levelState.rect = rect;
    levelState.activeRect = { ...rect };
    levelState.activeRects = [{ ...rect }];
    levelState.capturedRects = [];
    levelState.walls = [];
    levelState.obstacles = (config.obstacles || []).map((obstacle, index) => createObstacle(obstacle, rect, index));
    levelState.elapsed = 0;
    levelState.activeLine = null;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    levelState.lastCompletion = null;
    levelState.balls = BALL_STARTS.slice(0, config.balls).map((start) => ({
      x: rect.x + rect.w * start.x,
      y: rect.y + rect.h * start.y,
      vx: speed * start.vx,
      vy: speed * start.vy,
      r: BALL_RADIUS
    }));
    levelState.ball = levelState.balls[0] || null;
    levelCompletePanel?.classList.remove("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "true");
    syncLevelHud();
    syncResources();
    levelState.lastFrameAt = performance.now();
    levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
  };

  const beginLineFromPointer = (event) => {
    if (!levelState.running || levelState.completed || levelState.activeLine || !levelState.activeRect) {
      return;
    }

    const point = getCanvasPoint(event);
    const rect = getPointerActiveRect(point);
    if (!rect || pointHitsObstacle(point)) {
      return;
    }

    event.preventDefault();
    jezzCanvas.setPointerCapture?.(event.pointerId);
    const orientation = levelState.aimPointer && pointInRect(levelState.aimPointer, rect)
      ? levelState.aimPointer.orientation
      : getFallbackLineOrientation(point, rect);
    if (isTouchLikePointer(event)) {
      levelState.draftPointer = {
        x: point.x,
        y: point.y,
        orientation,
        rect
      };
      drawJezzLevel();
      return;
    }

    startActiveLine(point, orientation, rect);
  };

  const isTouchLikePointer = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      return true;
    }

    return event.pointerType === "mouse"
      && window.matchMedia?.("(pointer: coarse)").matches;
  };

  const getFallbackLineOrientation = (point, rect) => {
    const fromLeft = point.x - rect.x;
    const fromRight = rect.x + rect.w - point.x;
    const fromTop = point.y - rect.y;
    const fromBottom = rect.y + rect.h - point.y;
    const horizontalEdge = Math.min(fromLeft, fromRight);
    const verticalEdge = Math.min(fromTop, fromBottom);
    return horizontalEdge <= verticalEdge ? "horizontal" : "vertical";
  };

  const startActiveLine = (point, orientation, rect = getPointerActiveRect(point)) => {
    if (!rect) {
      return;
    }
    levelState.activeRect = rect;
    levelState.activeLine = orientation === "vertical"
      ? { orientation, x: point.x, y: point.y, endA: point.y, endB: point.y, done: false, rect }
      : { orientation, x: point.x, y: point.y, endA: point.x, endB: point.x, done: false, rect };
    levelState.draftPointer = null;
    levelState.aimPointer = null;
  };

  const continueLineFromPointer = (event) => {
    if (!levelState.running || levelState.completed || levelState.activeLine || !levelState.activeRect) {
      return;
    }

    const touchLike = isTouchLikePointer(event);
    if (touchLike && !levelState.draftPointer) {
      return;
    }

    const point = getCanvasPoint(event);
    const rect = getPointerActiveRect(point);
    if (!rect || pointHitsObstacle(point)) {
      if (!levelState.draftPointer) {
        levelState.aimPointer = null;
        drawJezzLevel();
      }
      return;
    }

    event.preventDefault();
    const previousAim = levelState.draftPointer || levelState.aimPointer;
    const dx = previousAim ? point.x - previousAim.x : 0;
    const dy = previousAim ? point.y - previousAim.y : 0;
    const movedEnough = Math.hypot(dx, dy) >= 3;
    const orientation = movedEnough
      ? (Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical")
      : getFallbackLineOrientation(point, rect);

    if (levelState.draftPointer) {
      levelState.draftPointer = {
        x: point.x,
        y: point.y,
        orientation,
        rect
      };
      drawJezzLevel();
      return;
    }

    levelState.aimPointer = {
      x: point.x,
      y: point.y,
      orientation,
      rect
    };
    drawJezzLevel();
  };

  const finishLinePointer = (event) => {
    if (levelState.draftPointer && levelState.running && !levelState.completed && !levelState.activeLine && levelState.activeRect) {
      const point = getCanvasPoint(event);
      const rect = getPointerActiveRect(point) || levelState.draftPointer.rect;
      const draft = rect && pointInRect(point, rect) && !pointHitsObstacle(point)
        ? {
          x: point.x,
          y: point.y,
          orientation: levelState.draftPointer.orientation,
          rect
        }
        : levelState.draftPointer;
      levelState.draftPointer = null;
      levelState.aimPointer = null;
      event.preventDefault();
      startActiveLine(draft, draft.orientation, draft.rect);
      return;
    }

    levelState.draftPointer = null;
  };

  const openChapter = (chapterId) => {
    stopJezzLevel();
    const nextChapterId = clampChapterId(chapterId);
    state.currentChapter = nextChapterId;
    showScreen(getChapterScreenId(nextChapterId));
    saveProgress();
  };

  const openProgressChapter = () => {
    openChapter(getChapterForLevel(state.currentLevel));
  };

  const confirmLeaveLevel = async () => {
    if (!levelScreen.classList.contains("is-active") || levelState.completed || !levelState.running) {
      return true;
    }

    return showConfirm({
      title: t("leaveTitle"),
      message: t("leaveMessage"),
      acceptText: t("leaveAccept"),
      cancelText: t("stay")
    });
  };

  const restartCurrentLevel = async () => {
    if (!levelScreen.classList.contains("is-active") || levelState.completed) {
      return;
    }

    const shouldRestart = await showConfirm({
      title: t("restartTitle"),
      message: t("restartMessage"),
      acceptText: t("play"),
      cancelText: t("cancel")
    });

    if (!shouldRestart) {
      return;
    }

    setCompletionActions(isCompletedLevel(state.selectedLevel));
    stopJezzLevel();
    window.requestAnimationFrame(startJezzLevel);
  };

  const openLevel = async (level, options = {}) => {
    if (level > state.currentLevel) {
      return;
    }

    if (!options.skipReplayConfirm && isCompletedLevel(level)) {
      const shouldReplay = await showConfirm({
        title: t("replayTitle"),
        acceptText: t("play"),
        cancelText: t("cancel")
      });

      if (!shouldReplay) {
        return;
      }
    }

    if (!spendLife()) {
      await showConfirm({
        title: t("noLivesTitle"),
        message: t("noLivesMessage"),
        acceptText: t("ok"),
        cancelText: null
      });
      return;
    }

    const chapter = getChapter(getChapterForLevel(level));
    state.selectedLevel = level;
    state.currentChapter = chapter.id;
    setCompletionActions(isCompletedLevel(level));
    levelScreen.className = `level-screen screen chapter-${chapter.id}`;
    levelChapterLabel.textContent = `${t("chapter")} ${chapter.id} - ${getChapterTitle(chapter.id)}`;
    levelTitle.textContent = `${t("level")} ${level}`;
    showScreen("level-screen");
    saveProgress();
    window.requestAnimationFrame(startJezzLevel);
  };

  const completeSelectedLevel = async (destination = "chapters") => {
    const completedChapterId = getChapterForLevel(state.selectedLevel);
    const completedNextChapterId = Math.min(chapters.length, completedChapterId + 1);
    const completion = levelState.lastCompletion || {
      level: state.selectedLevel,
      stars: 1,
      awardedStars: 1,
      coins: getRewardDelta(1, state.starsByLevel[state.selectedLevel] || 0).coins,
      restoreLife: false,
      lifeFull: false,
      perfectChapterId: null,
      chapterChestId: null,
      replayingCompleted: levelState.replayingCompleted || isCompletedLevel(state.selectedLevel),
      applied: false
    };

    if (!completion.applied) {
      const previousStars = state.starsByLevel[state.selectedLevel] || 0;
      const improvedStars = completion.stars > previousStars;
      const reward = getRewardDelta(completion.stars, previousStars);
      const completedChapterFinal = isChapterFinalLevel(completion.level);

      if (improvedStars) {
        state.starsByLevel[state.selectedLevel] = completion.stars;
      }

      if (!completion.replayingCompleted && state.selectedLevel === state.currentLevel) {
        state.coins += reward.coins;
        if (reward.restoreLife) {
          restoreLife();
        }
        if (reward.perfectChapterId) {
          state.perfectChapters.add(reward.perfectChapterId);
        }
        state.currentLevel = Math.min(TOTAL_LEVELS + 1, state.currentLevel + 1);
        if (completedChapterFinal && !state.chapterChests.has(completedChapterId)) {
          state.chapterChests.add(completedChapterId);
          completion.chapterChestId = completedChapterId;
        }
        if (completedChapterFinal && completion.level < TOTAL_LEVELS) {
          state.expandedChapters.add(completedNextChapterId);
          state.currentChapter = completedNextChapterId;
        }
        completion.applied = true;
        completion.awardedStars = reward.stars;
        completion.coins = reward.coins;
        completion.restoreLife = reward.restoreLife;
        completion.lifeFull = reward.lifeFull;
        completion.perfectChapterId = reward.perfectChapterId;
        levelState.lastCompletion = completion;
        renderChapterScreens();
      } else if (improvedStars) {
        state.coins += reward.coins;
        if (reward.restoreLife) {
          restoreLife();
        }
        if (reward.perfectChapterId) {
          state.perfectChapters.add(reward.perfectChapterId);
        }
        completion.applied = true;
        completion.awardedStars = reward.stars;
        completion.coins = reward.coins;
        completion.restoreLife = reward.restoreLife;
        completion.lifeFull = reward.lifeFull;
        completion.perfectChapterId = reward.perfectChapterId;
        completion.chapterChestId = null;
        levelState.lastCompletion = completion;
        renderChapterScreens();
      } else {
        completion.applied = true;
        completion.awardedStars = 0;
        completion.coins = 0;
        completion.restoreLife = false;
        completion.lifeFull = false;
        completion.perfectChapterId = null;
        completion.chapterChestId = null;
        levelState.lastCompletion = completion;
      }
    }

    levelCompletePanel?.classList.remove("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "true");
    stopJezzLevel();

    if (completion.chapterChestId) {
      await showChapterChest(completion.chapterChestId);
    }

    if (destination === "next" && completion.replayingCompleted) {
      openChapter(completedChapterId);
      return;
    }

    if (destination === "stay") {
      return;
    }

    if (isChapterFinalLevel(completion.level) && !completion.replayingCompleted && completion.level < TOTAL_LEVELS) {
      openChapter(completedNextChapterId);
      return;
    }

    if (destination === "next" && state.currentLevel <= TOTAL_LEVELS) {
      openLevel(state.currentLevel, { skipReplayConfirm: true });
      return;
    }

    if (destination === "next") {
      showScreen("final-screen");
      return;
    }

    openChapter(completedChapterId);
  };

  const replayCompletedLevel = async () => {
    await completeSelectedLevel("stay");
    openLevel(state.selectedLevel, { skipReplayConfirm: true });
  };

  const loseSelectedLevel = () => {
    if (spendLife()) {
      openChapter(state.currentChapter);
    }
  };

  const toggleSettings = (isOpen) => {
    settingsModal.classList.toggle("is-open", isOpen);
    settingsModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
  };

  const handleAction = async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const screen = button.closest(".chapter-screen");
    const chapterId = screen ? Number(screen.dataset.chapter) : state.currentChapter;

    if (action === "main-menu") {
      if (!(await confirmLeaveLevel())) {
        return;
      }
      if (levelState.completed) {
        await completeSelectedLevel("stay");
      }
      stopJezzLevel();
      showScreen("main-menu");
      playButton.disabled = false;
      saveProgress();
      return;
    }

    if (action === "prev-chapter") {
      openChapter(chapterId - 1);
      return;
    }

    if (action === "next-chapter") {
      openChapter(chapterId + 1);
      return;
    }

    if (action === "next-progress-chapter") {
      openChapter(chapterId + 1);
      return;
    }

    if (action === "toggle-chapter") {
      const selectedChapterId = clampChapterId(Number(button.dataset.chapterId));
      const list = button.closest(".chapter-list");
      const scrollTop = list ? list.scrollTop : 0;

      if (state.expandedChapters.has(selectedChapterId)) {
        state.expandedChapters.delete(selectedChapterId);
      } else {
        state.expandedChapters.add(selectedChapterId);
      }
      state.currentChapter = selectedChapterId;
      syncChapterCardExpansion(selectedChapterId);
      keepChapterInView(selectedChapterId, scrollTop);
      return;
    }

    if (action === "final") {
      showScreen("final-screen");
      return;
    }

    if (action === "return-chapter") {
      if (!(await confirmLeaveLevel())) {
        return;
      }
      if (levelState.completed) {
        await completeSelectedLevel("stay");
      }
      openChapter(state.currentChapter);
      return;
    }

    if (action === "restart-level") {
      await restartCurrentLevel();
      return;
    }

    if (action === "achievements") {
      await showConfirm({
        title: t("achievements"),
        message: t("achievementSummary", { stars: getEarnedStars(), total: TOTAL_LEVELS * 3 }),
        acceptText: t("ok"),
        cancelText: t("cancel")
      });
      return;
    }

    if (action === "shop") {
      await showConfirm({
        title: t("shop"),
        message: t("shopSummary", { coins: state.coins, lives: state.lives }),
        acceptText: t("ok"),
        cancelText: t("cancel")
      });
      return;
    }

    if (action === "settings") {
      toggleSettings(true);
      return;
    }

    if (action === "close-settings") {
      toggleSettings(false);
    }
  };

  const blockBrowserGesture = (event) => {
    if (event.type === "touchmove" && event.target.closest(".chapter-list")) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }
  };

  playButton.addEventListener("click", () => {
    playButton.classList.add("is-starting");
    window.setTimeout(() => {
      playButton.classList.remove("is-starting");
      openProgressChapter();
    }, 220);
  });

  completeCloseButton?.addEventListener("click", () => completeSelectedLevel("chapters"));
  completeReplayButton?.addEventListener("click", replayCompletedLevel);
  completeNextButton?.addEventListener("click", () => completeSelectedLevel(completeNextButton.dataset.destination || "next"));
  musicToggle.addEventListener("change", () => {
    state.music = musicToggle.checked;
    saveProgress();
  });
  soundToggle.addEventListener("change", () => {
    state.sound = soundToggle.checked;
    saveProgress();
  });
  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      toggleSettings(false);
    }
  });
  confirmCancelButton?.addEventListener("click", () => closeConfirm(false));
  confirmAcceptButton?.addEventListener("click", () => closeConfirm(true));
  confirmModal?.addEventListener("click", (event) => {
    if (event.target === confirmModal) {
      closeConfirm(false);
    }
  });
  window.setInterval(updateLifeRestore, 1000);
  document.addEventListener("click", handleAction);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });
  jezzCanvas?.addEventListener("pointerdown", beginLineFromPointer);
  jezzCanvas?.addEventListener("pointermove", continueLineFromPointer);
  jezzCanvas?.addEventListener("pointerup", finishLinePointer);
  jezzCanvas?.addEventListener("pointercancel", () => {
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    drawJezzLevel();
  });
  jezzCanvas?.addEventListener("pointerleave", () => {
    levelState.aimPointer = null;
    if (!levelState.draftPointer) {
      drawJezzLevel();
    }
  });
  window.addEventListener("resize", () => {
    syncViewportHeight();
    if (levelScreen.classList.contains("is-active")) {
      window.requestAnimationFrame(resizeActiveJezzLevel);
    }
  });
  window.addEventListener("orientationchange", () => {
    syncViewportHeight();
    if (levelScreen.classList.contains("is-active")) {
      window.requestAnimationFrame(resizeActiveJezzLevel);
    }
  });

  loadProgress();
  musicToggle.checked = state.music;
  soundToggle.checked = state.sound;
  updateLifeRestore();
  syncViewportHeight();
  renderChapterScreens();
  initYandexSdk();

  window.showScreen = showScreen;
  window.JezzBallChapterMap = {
    chapters,
    state,
    openChapter,
    openLevel,
    spendLife,
    restoreLife,
    loseSelectedLevel,
    getLevelCoinReward,
    renderAllChapters,
    setCurrentLevel(level) {
      const parsedLevel = Number(level);
      if (!Number.isFinite(parsedLevel)) {
        return;
      }

      state.currentLevel = Math.max(1, Math.min(TOTAL_LEVELS + 1, Math.round(parsedLevel)));
      renderChapterScreens();
      openChapter(getChapterForLevel(state.currentLevel));
    }
  };

  const initialChapterMatch = window.location.hash.match(/^#chapter-(\d+)-screen$/);
  if (initialChapterMatch) {
    openChapter(Number(initialChapterMatch[1]));
  }
})();
