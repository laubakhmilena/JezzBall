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
  const obstacleLegendToggle = document.querySelector(".obstacle-legend-toggle");
  const lineOrientationButtons = document.querySelectorAll("[data-line-orientation]");
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
  const inventoryModal = document.getElementById("inventoryModal");
  const inventoryCloseButton = document.getElementById("inventoryCloseButton");
  const inventoryContent = document.getElementById("inventoryContent");
  const musicToggle = document.getElementById("musicToggle");
  const soundToggle = document.getElementById("soundToggle");
  const SAVE_KEY = "jezzball-progress-v1";
  const IS_PERF = new URLSearchParams(location.search).has("perf");
  const IS_DEBUG = new URLSearchParams(location.search).has("debug")
    || location.hostname === "localhost"
    || location.hostname === "127.0.0.1";
  const CLOUD_SAVE_KEY = "progress";
  const LEADERBOARD_NAME = "stars";
  const INTERSTITIAL_LEVEL_INTERVAL = 3;
  const INTERSTITIAL_MIN_INTERVAL_MS = 180 * 1000;
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
  const CHEST_TIERS = {
    none: 0,
    small: 1,
    medium: 2,
    large: 3
  };
  const CHAPTER_CHEST_REWARDS = {
    0: {
      type: "none",
      title: "Нет сундука",
      coins: 0,
      lives: 0
    },
    1: {
      type: "small",
      title: "Малый сундук",
      coins: 200,
      lives: 0
    },
    2: {
      type: "medium",
      title: "Средний сундук",
      coins: 400,
      lives: 1
    },
    3: {
      type: "large",
      title: "Большой сундук",
      coins: 700,
      lives: 2
    }
  };
  const BOOSTER_ITEMS = {
    fastLine: {
      icon: "⚡",
      title: "Молниеносная линия",
      description: "Следующая линия строится быстрее."
    },
    slowBalls: {
      icon: "❄",
      title: "Ледяная пауза",
      description: "Шары замедляются на 6 секунд."
    },
    lineShield: {
      icon: "🛡",
      title: "Щит чертёжника",
      description: "Один удар по строящейся линии не ломает её."
    }
  };
  const DEFAULT_BOOSTERS = {
    fastLine: 0,
    slowBalls: 0,
    lineShield: 0
  };
  const DEFAULT_SELECTED_BOOSTERS = ["fastLine", "slowBalls", "lineShield"];
  const DEFAULT_COSMETICS = {
    balls: ["default"],
    lines: ["default"],
    captureEffects: ["default"]
  };
  const DEFAULT_EQUIPPED_COSMETICS = {
    ball: "default",
    line: "default",
    captureEffect: "default"
  };
  const COSMETIC_GROUPS = {
    balls: {
      title: "Мячи",
      equippedKey: "ball",
      items: {
        default: { icon: "●", title: "Обычный" },
        neon: { icon: "🟣", title: "Неоновый" },
        fire: { icon: "🔥", title: "Огненный" }
      }
    },
    lines: {
      title: "Линии",
      equippedKey: "line",
      items: {
        default: { icon: "─", title: "Обычная" },
        lightning: { icon: "⚡", title: "Молния" },
        crystal: { icon: "💎", title: "Кристалл" }
      }
    },
    captureEffects: {
      title: "Эффекты захвата",
      equippedKey: "captureEffect",
      items: {
        default: { icon: "○", title: "Обычный" },
        stars: { icon: "✨", title: "Звёзды" },
        wave: { icon: "🌊", title: "Волна" }
      }
    }
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
  const LINE_GESTURE_DEAD_ZONE = 16;
  const LINE_GESTURE_TAP_MAX_MS = 220;
  const BALL_RADIUS = 11;
  const OBSTACLE_THICKNESS = 12;
  const BALL_SPEED_REFERENCE_SIZE = 360;
  const MAX_PENALTIES = 3;
  const WALL_SNAP_EPSILON = 4;
  const LINE_COLLISION_TOLERANCE = 6;
  const MIN_CAPTURE_AREA_RATIO = 0.005;
  const MIN_CAPTURE_CELLS = 20;
  const MIN_ACTIVE_AREA_SIZE = 20;
  const LEVEL_SPEEDS = {
    slow: 150,
    medium: 190,
    fast: 235
  };

  const createGeneratedLevelConfig = (level) => {
    const chapterIndex = Math.floor((level - 1) / 10);
    const chapterStep = (level - 1) % 10;
    const speedCycle = ["slow", "medium", "fast"];
    const maxGeneratedObstacles = level < 51 ? 2 : 3;
    const obstacleCount = Math.min(maxGeneratedObstacles, 1 + Math.floor(chapterStep / 4) + (chapterIndex >= 6 ? 1 : 0));
    const obstacles = [];
    let movingDangerCount = 0;

    for (let index = 0; index < obstacleCount; index += 1) {
      const vertical = (level + index) % 2 === 0;
      let moving = (level + index + chapterIndex) % 4 === 0;
      const safe = index === obstacleCount - 1 && (level + chapterIndex) % 4 === 0;
      if (moving && !safe && movingDangerCount >= (level < 61 ? 0 : 1)) {
        moving = false;
      }
      const center = 0.26 + ((chapterStep * 0.07 + index * 0.19 + chapterIndex * 0.03) % 0.48);
      const start = 0.16 + ((chapterIndex * 0.04 + index * 0.09) % 0.18);
      const end = 0.84 - ((chapterStep * 0.025 + index * 0.06) % 0.16);
      const obstacle = vertical
        ? { orientation: "vertical", x: center, y1: start, y2: Math.max(start + 0.28, end) }
        : { orientation: "horizontal", y: center, x1: start, x2: Math.max(start + 0.28, end) };

      obstacle.type = moving ? "moving" : "static";
      obstacle.safe = safe;
      obstacle.color = safe ? "rgba(173, 246, 255, 0.92)" : (index % 2 === 0 ? "#ff4e7a" : "#7c1d49");
      obstacle.blocksBall = true;

      if (moving) {
        if (!safe) {
          movingDangerCount += 1;
        }
        obstacle.axis = vertical ? "y" : "x";
        obstacle.amplitude = Math.min(0.16, 0.07 + chapterIndex * 0.008 + index * 0.018);
        obstacle.phase = ((chapterStep + index * 3) % 10) / 10;
      }

      obstacles.push(obstacle);
    }

    return {
      target: Math.min(90, 76 + Math.floor((level - 1) / 8)),
      balls: level < 46 ? 3 : 4,
      speed: speedCycle[(chapterIndex + chapterStep) % speedCycle.length],
      obstacles
    };
  };

  const generatedLevelConfigs = Object.fromEntries(
    Array.from({ length: TOTAL_LEVELS - 30 }, (_, index) => {
      const level = index + 31;
      return [level, createGeneratedLevelConfig(level)];
    })
  );

  const LEVEL_CONFIGS = {
    1: { target: 70, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-vertical-line" },
    2: { target: 71, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-switch-direction" },
    3: { target: 72, balls: 1, speed: "slow", obstacles: [], purpose: "tutorial-avoid-building-line" },
    4: { target: 74, balls: 1, speed: "medium", obstacles: [], purpose: "tutorial-capture-empty-side" },
    5: { target: 75, balls: 1, speed: "medium", obstacles: [], purpose: "tutorial-perfect-stars" },
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
    11: {
      target: 75,
      balls: 1,
      speed: "slow",
      obstacles: [{ orientation: "vertical", x: 0.5, y1: 0.18, y2: 0.82, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }],
      purpose: "soft-chapter-start"
    },
    12: {
      target: 75,
      balls: 1,
      speed: "medium",
      obstacles: [{ orientation: "vertical", x: 0.5, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "safe-danger-contrast"
    },
    13: {
      target: 76,
      balls: 2,
      speed: "slow",
      obstacles: [],
      purpose: "two-slow-balls"
    },
    14: {
      target: 76,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.18, x2: 0.82, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }],
      purpose: "use-safe-obstacle"
    },
    15: {
      target: 77,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.18, x2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "danger-obstacle-two-balls"
    },
    16: {
      target: 77,
      balls: 2,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.36, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.64, x1: 0.22, x2: 0.78, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
      ],
      purpose: "first-obstacle-combination"
    },
    17: {
      target: 78,
      balls: 2,
      speed: "fast",
      obstacles: [{ orientation: "vertical", x: 0.5, y1: 0.2, y2: 0.8, type: "moving", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true, axis: "x", amplitude: 0.14, phase: 0.2 }],
      purpose: "moving-without-penalty"
    },
    18: {
      target: 78,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.18, x2: 0.82, type: "moving", safe: false, color: "#8d2454", axis: "y", amplitude: 0.14, phase: 0.35 }],
      purpose: "moving-danger-risk"
    },
    19: {
      target: 79,
      balls: 2,
      speed: "fast",
      obstacles: [
        { orientation: "vertical", x: 0.62, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.38, x1: 0.2, x2: 0.8, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
      ],
      purpose: "boss-preparation"
    },
    20: {
      target: 80,
      balls: 3,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.5, y1: 0.18, y2: 0.82, type: "moving", safe: false, color: "#8d2454", axis: "x", amplitude: 0.13, phase: 0.15 },
        { orientation: "horizontal", y: 0.34, x1: 0.22, x2: 0.78, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true },
        { orientation: "horizontal", y: 0.68, x1: 0.18, x2: 0.82, type: "static", safe: false, color: "#ff4e7a" }
      ],
      purpose: "chapter-mini-boss"
    },
    21: {
      target: 76,
      balls: 2,
      speed: "slow",
      obstacles: [{ orientation: "vertical", x: 0.5, y1: 0.18, y2: 0.82, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }],
      purpose: "soft-chapter-entry"
    },
    22: {
      target: 76,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.18, x2: 0.82, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }],
      purpose: "build-near-safe-obstacle"
    },
    23: {
      target: 77,
      balls: 2,
      speed: "medium",
      obstacles: [{ orientation: "vertical", x: 0.42, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "danger-obstacle-return"
    },
    24: {
      target: 77,
      balls: 2,
      speed: "fast",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.2, x2: 0.8, type: "moving", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true, axis: "y", amplitude: 0.13, phase: 0.25 }],
      purpose: "moving-safe-low-punishment"
    },
    25: {
      target: 78,
      balls: 3,
      speed: "slow",
      obstacles: [],
      purpose: "first-three-balls-chapter"
    },
    26: {
      target: 78,
      balls: 3,
      speed: "medium",
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.18, x2: 0.82, type: "static", safe: false, color: "#ff4e7a" }],
      purpose: "three-balls-first-danger-wall"
    },
    27: {
      target: 79,
      balls: 3,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.35, y1: 0.18, y2: 0.82, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true },
        { orientation: "horizontal", y: 0.62, x1: 0.2, x2: 0.8, type: "static", safe: false, color: "#8d2454" }
      ],
      purpose: "safe-danger-combination"
    },
    28: {
      target: 79,
      balls: 3,
      speed: "fast",
      obstacles: [{ orientation: "vertical", x: 0.58, y1: 0.2, y2: 0.8, type: "moving", safe: false, color: "#8d2454", axis: "x", amplitude: 0.13, phase: 0.4 }],
      purpose: "moving-danger-reaction"
    },
    29: {
      target: 80,
      balls: 3,
      speed: "fast",
      obstacles: [
        { orientation: "vertical", x: 0.34, y1: 0.18, y2: 0.82, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.42, x1: 0.2, x2: 0.8, type: "static", safe: false, color: "#8d2454" },
        { orientation: "horizontal", y: 0.72, x1: 0.24, x2: 0.76, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
      ],
      purpose: "mini-boss-preparation"
    },
    30: {
      target: 78,
      balls: 3,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.5, y1: 0.22, y2: 0.78, type: "moving", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true, axis: "x", amplitude: 0.08, phase: 0.1 },
        { orientation: "horizontal", y: 0.66, x1: 0.24, x2: 0.76, type: "static", safe: false, color: "#ff4e7a" }
      ],
      purpose: "chapter-three-mini-boss"
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
    { id: 2, title: "Тихая деревня", slug: "quiet-village", icon: "♣" },
    { id: 3, title: "Золотые луга", slug: "golden-meadows", icon: "♦" },
    { id: 4, title: "Шепот реки", slug: "river-whisper", icon: "♜" },
    { id: 5, title: "Лазурный берег", slug: "cote-d-azur", icon: "▲" },
    { id: 6, title: "Тайна глубин", slug: "secret-of-the-depths", icon: "☁" },
    { id: 7, title: "Городские огни", slug: "city-lights", icon: "✦" },
    { id: 8, title: "Неоновый ритм", slug: "neon-rhythm", icon: "✹" },
    { id: 9, title: "Звёздный путь", slug: "star-trek", icon: "★" },
    { id: 10, title: "Врата света", slug: "gates-of-light", icon: "◈" }
  ];

  const SUPPORTED_LANGUAGES = ["ru"];
  const FALLBACK_LANGUAGE = "ru";
  const yandexState = {
    sdk: null,
    player: null,
    cloudSaveTimer: null,
    leaderboardSaveTimer: null,
    localSaveTimer: null,
    pausedByPlatform: false,
    completedSinceInterstitial: 0,
    lastInterstitialAt: 0,
    lang: "ru",
    readySent: false,
    gameplayActive: false
  };

  const messages = {
    ru: {
      pageTitle: "JezzBall",
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
      tutorialLevel1Hint: "Проведи пальцем вверх или вниз для вертикальной линии, влево или вправо — для горизонтальной.",
      tutorialLevel2Hint: "Направление линии задаётся движением: тяни вверх/вниз или влево/вправо.",
      tutorialLevel3Hint: "Избегай шара, пока линия строится.",
      tutorialLevel4Hint: "Захватывай сторону без шаров.",
      tutorialLevel5Hint: "Собери 3 звезды без штрафов.",
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
      penaltyProgress: "Штраф {count}/{max}",
      levelFailedTitle: "Попытка провалена",
      lineHitFailure: "Набран максимум штрафов. Попытка потеряна.",
      leaveTitle: "Выйти из уровня?",
      leaveMessage: "Прогресс текущей попытки не сохранится. Остаться в игре?",
      leaveAccept: "Выйти",
      restartLevel: "Играть уровень заново",
      restartTitle: "Сыграть заново?",
      restartMessage: "Текущая попытка начнется сначала.",
      replayTitle: "Уровень уже пройден",
      replayMessage: "Можно сыграть ещё раз и попробовать улучшить результат.",
      cancel: "Отмена",
      noLivesTitle: "Нет жизней",
      noLivesMessage: "Нужна жизнь для старта уровня. Подожди восстановления или получи жизнь за награду.",
      livesFull: "Жизни полные",
      ok: "Понятно",
      shopSummary: "У вас {coins} монет и {lives} жизней. Магазин с бустами будет подключен к этой экономике.",
      achievementSummary: "Звезд получено: {stars} из {total}. Проходите уровни без штрафов, чтобы собрать максимум.",
      obstacleDanger: "Яркая или темная линия - штраф при касании",
      obstacleSafe: "Пунктирная светлая линия - линия может закрепиться, мячи отскакивают"
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
    chapterChests: {},
    boosters: { ...DEFAULT_BOOSTERS },
    selectedBoosters: [...DEFAULT_SELECTED_BOOSTERS],
    cosmetics: {
      balls: [...DEFAULT_COSMETICS.balls],
      lines: [...DEFAULT_COSMETICS.lines],
      captureEffects: [...DEFAULT_COSMETICS.captureEffects]
    },
    equippedCosmetics: { ...DEFAULT_EQUIPPED_COSMETICS },
    gifts: [],
    inventoryTab: "chests",
    expandedChapters: new Set([1])
  };

  const levelState = {
    running: false,
    completed: false,
    failed: false,
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
    lineOrientation: "vertical",
    gestureStartPoint: null,
    gestureCurrentPoint: null,
    gestureLockedOrientation: null,
    gesturePointerId: null,
    draftPointer: null,
    aimPointer: null,
    keyboardAimPoint: null,
    ball: null,
    balls: [],
    animationId: null,
    drawRequestId: null,
    lastFrameAt: 0,
    pausedByModal: false,
    toastTimer: null,
    helperHintTimer: null,
    obstacleLegendTimer: null,
    lastCompletion: null,
    replayingCompleted: false
  };

  let confirmResolve = null;
  let lowPerformanceMode = false;
  let lowPerformanceToastShown = false;
  let lastCanvasPixelWidth = 0;
  let lastCanvasPixelHeight = 0;
  let lastCanvasPixelRatio = 1;
  let backgroundCacheCanvas = null;
  let staticLayerCanvas = null;
  let backgroundCacheDirty = true;
  let staticLayerDirty = true;
  let resizeRaf = null;
  let resizeTimer = null;
  const perfState = {
    overlay: null,
    frameTimes: [],
    frameWindow: [],
    lastOverlayAt: 0,
    drawCount: 0,
    drawRate: 0,
    drawWindowStartedAt: performance.now(),
    saveTimes: [],
    lowFpsStartedAt: 0
  };
  const modalFocusStack = [];
  const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  const getFocusableElements = (container) => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => !element.hidden && element.getClientRects().length > 0);

  const focusModalContent = (modal, initialFocus) => {
    const target = initialFocus || getFocusableElements(modal)[0] || modal;
    if (!target.hasAttribute("tabindex") && target === modal) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus({ preventScroll: true });
  };

  const activateModalFocus = (modal, options = {}) => {
    if (!modal) {
      return;
    }

    for (let index = modalFocusStack.length - 1; index >= 0; index -= 1) {
      if (modalFocusStack[index].modal === modal) {
        modalFocusStack.splice(index, 1);
      }
    }

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalFocusStack.push({
      modal,
      previousFocus,
      onEscape: options.onEscape || null
    });
    window.requestAnimationFrame(() => focusModalContent(modal, options.initialFocus));
  };

  const deactivateModalFocus = (modal) => {
    let index = -1;
    for (let currentIndex = modalFocusStack.length - 1; currentIndex >= 0; currentIndex -= 1) {
      if (modalFocusStack[currentIndex].modal === modal) {
        index = currentIndex;
        break;
      }
    }
    if (index < 0) {
      return;
    }

    const [trap] = modalFocusStack.splice(index, 1);
    const parentTrap = modalFocusStack[modalFocusStack.length - 1];
    if (parentTrap?.modal?.isConnected) {
      focusModalContent(parentTrap.modal);
      return;
    }

    if (trap.previousFocus?.isConnected) {
      trap.previousFocus.focus({ preventScroll: true });
    }
  };

  const handleModalKeydown = (event) => {
    const trap = modalFocusStack[modalFocusStack.length - 1];
    if (!trap?.modal?.isConnected) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      trap.onEscape?.();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = getFocusableElements(trap.modal);
    if (!focusable.length) {
      event.preventDefault();
      trap.modal.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  };

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

  const TUTORIAL_HINT_KEYS = {
    1: "tutorialLevel1Hint",
    2: "tutorialLevel2Hint",
    3: "tutorialLevel3Hint",
    4: "tutorialLevel4Hint",
    5: "tutorialLevel5Hint"
  };

  const getLevelHint = (level = state.selectedLevel) => {
    const hintKey = TUTORIAL_HINT_KEYS[level];
    return hintKey ? t(hintKey) : t("levelHint");
  };

  const syncLevelHint = (level = state.selectedLevel) => {
    setText(".level-helper-panel p", getLevelHint(level));
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
    setAttribute("#jezzCanvas", "aria-label", `${t("playfield")}. Проведи пальцем или мышью вверх или вниз для вертикальной линии, влево или вправо для горизонтальной. Стрелки перемещают прицел, Space или Enter ставят линию.`);
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
    syncLevelHint();
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

  const refreshProgressUi = () => {
    musicToggle.checked = state.music;
    soundToggle.checked = state.sound;
    updateLifeRestore();
    renderChapterScreens();
    syncResources();
  };

  const initYandexPlayer = async () => {
    if (!yandexState.sdk || typeof yandexState.sdk.getPlayer !== "function") {
      return null;
    }

    try {
      yandexState.player = await yandexState.sdk.getPlayer();
      return yandexState.player;
    } catch (_error) {
      yandexState.player = null;
      return null;
    }
  };

  const registerYandexPauseEvents = () => {
    if (!yandexState.sdk || typeof yandexState.sdk.on !== "function") {
      return;
    }

    try {
      yandexState.sdk.on("game_api_pause", pauseJezzLevelForPlatform);
      yandexState.sdk.on("game_api_resume", resumeJezzLevelFromPlatform);
    } catch (_error) {
      // Older SDK runtimes may not expose game API events.
    }
  };

  const initYandexSdk = async () => {
    if (!window.YaGames || typeof window.YaGames.init !== "function") {
      applyLanguage("ru");
      return;
    }

    try {
      yandexState.sdk = await window.YaGames.init();
      applyLanguage("ru");
      registerYandexPauseEvents();
      await initYandexPlayer();
      await loadCloudProgress();
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
  const getChapterStars = (chapterId) => {
    const chapterStart = getChapterLevelStart(chapterId);
    const chapterEnd = getChapterLevelEnd(chapterId);
    let stars = 0;

    for (let level = chapterStart; level <= chapterEnd; level += 1) {
      stars += Number(state.starsByLevel[level]) || 0;
    }

    return stars;
  };
  const getChapterChestTier = (chapterStars) => {
    if (chapterStars >= 27) {
      return CHEST_TIERS.large;
    }

    if (chapterStars >= 20) {
      return CHEST_TIERS.medium;
    }

    if (chapterStars >= 10) {
      return CHEST_TIERS.small;
    }

    return CHEST_TIERS.none;
  };
  const normalizeChestTier = (tier) => Math.max(CHEST_TIERS.none, Math.min(CHEST_TIERS.large, Math.round(Number(tier) || 0)));
  const ensureChapterChest = (chapterId) => {
    const safeChapterId = clampChapterId(chapterId);
    const chest = state.chapterChests[safeChapterId];

    if (!chest || typeof chest !== "object") {
      state.chapterChests[safeChapterId] = {
        earnedTier: CHEST_TIERS.none,
        claimedTier: CHEST_TIERS.none
      };
      return state.chapterChests[safeChapterId];
    }

    chest.earnedTier = normalizeChestTier(chest.earnedTier);
    chest.claimedTier = normalizeChestTier(chest.claimedTier);
    chest.claimedTier = Math.min(chest.claimedTier, chest.earnedTier);
    return chest;
  };
  const syncChapterChestProgress = (chapterId) => {
    const safeChapterId = clampChapterId(chapterId);
    const chest = ensureChapterChest(safeChapterId);
    const previousTier = chest.earnedTier;
    const chapterStars = getChapterStars(safeChapterId);
    const earnedTier = getChapterChestTier(chapterStars);
    const changed = earnedTier > previousTier;

    if (changed) {
      chest.earnedTier = earnedTier;
      saveProgress();
    }

    return {
      changed,
      chapterId: safeChapterId,
      chapterStars,
      previousTier,
      earnedTier: chest.earnedTier,
      claimedTier: chest.claimedTier,
      isUpgrade: chest.claimedTier > CHEST_TIERS.none
    };
  };
  const getPendingChestReward = (chapterId) => {
    const safeChapterId = clampChapterId(chapterId);
    const chest = ensureChapterChest(safeChapterId);

    if (chest.earnedTier <= chest.claimedTier) {
      return {
        hasReward: false,
        chapterId: safeChapterId,
        earnedTier: chest.earnedTier,
        claimedTier: chest.claimedTier,
        coins: 0,
        lives: 0
      };
    }

    const previousReward = CHAPTER_CHEST_REWARDS[chest.claimedTier] || CHAPTER_CHEST_REWARDS[CHEST_TIERS.none];
    const nextReward = CHAPTER_CHEST_REWARDS[chest.earnedTier] || CHAPTER_CHEST_REWARDS[CHEST_TIERS.none];

    return {
      hasReward: true,
      chapterId: safeChapterId,
      earnedTier: chest.earnedTier,
      claimedTier: chest.claimedTier,
      coins: nextReward.coins - previousReward.coins,
      lives: nextReward.lives - previousReward.lives,
      title: nextReward.title,
      previousTitle: previousReward.title,
      nextTitle: nextReward.title
    };
  };
  const getPendingChests = () => chapters
    .map((chapter) => getPendingChestReward(chapter.id))
    .filter((reward) => reward.hasReward);
  const getChapterChestStatusText = (chapterId) => {
    const chest = ensureChapterChest(chapterId);
    const stars = getChapterStars(chapterId);

    if (isChapterComplete(chapterId)) {
      return "Глава завершена";
    }

    if (chest.earnedTier > chest.claimedTier) {
      return "Сундук готов";
    }

    if (chest.claimedTier >= CHEST_TIERS.large) {
      return "Большой сундук открыт";
    }

    if (stars < 10) {
      return `До малого сундука: ${10 - stars}★`;
    }

    if (stars < 20) {
      return `До среднего сундука: ${20 - stars}★`;
    }

    if (stars < 27) {
      return `До большого сундука: ${27 - stars}★`;
    }

    return "Сундук готов";
  };
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
    const statusText = isUnlocked ? getChapterChestStatusText(chapter.id) : t("chapterComplete");

    return `
      <article class="chapter-card ${isExpanded ? "is-expanded" : ""} ${isUnlocked ? "is-unlocked" : "is-locked"} ${isCurrentChapter ? "is-current-chapter" : ""}" data-chapter-card="${chapter.id}">
        <div class="chapter-card-head">
          <span class="chapter-badge" aria-hidden="true"><span class="chapter-badge-icon">${chapter.icon}</span></span>
          <span class="chapter-card-copy">
            <span class="chapter-kicker">${t("chapter")} ${chapter.id}</span>
            <span class="chapter-card-title">${getChapterTitle(chapter.id)}</span>
            <span class="chapter-complete-status ${isUnlocked ? "is-visible" : ""}" data-chapter-status="${chapter.id}" aria-hidden="${isUnlocked ? "false" : "true"}">${statusText}</span>
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
        <button class="chapter-play-button" type="button" data-action="continue-play">
          <span aria-hidden="true">▶</span>${t("play")}
        </button>
        <nav class="chapter-action-bar" aria-label="${t("shopAndAchievements")}">
          <button type="button" data-action="shop"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14.26c-.75 0-1.41-.41-1.75-1.03L2 6.2V5h3.21l.94 2h12.9c.75 0 1.24.78.92 1.45l-2.42 5.05A2 2 0 0 1 15.74 14H8.1l-1.1 2h12v2H7c-1.52 0-2.48-1.63-1.75-2.96l1.03-1.86-.12-.24ZM7.1 9l1.42 3h7.22l1.44-3H7.1Z"/></svg>${t("shop")}</button>
          <button class="inventory-button" type="button" data-action="inventory"><svg class="inventory-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.7 6.2V5.4C8.7 3.5 10.15 2 12 2s3.3 1.5 3.3 3.4v.8h1.1c1.25 0 2.3.94 2.45 2.18l1.08 9.02A3.08 3.08 0 0 1 16.87 20.8H7.13a3.08 3.08 0 0 1-3.06-3.4l1.08-9.02A2.47 2.47 0 0 1 7.6 6.2h1.1Zm1.85 0h2.9v-.8c0-.88-.62-1.55-1.45-1.55s-1.45.67-1.45 1.55v.8Zm-2.88 2.05a.62.62 0 0 0-.61.55l-1.08 9.03c-.08.62.41 1.17 1.15 1.17h9.74c.74 0 1.23-.55 1.15-1.17L16.94 8.8a.62.62 0 0 0-.61-.55h-1.03v1.4a.93.93 0 0 1-1.85 0v-1.4h-2.9v1.4a.93.93 0 0 1-1.85 0v-1.4H7.67Z"/><path fill="currentColor" opacity=".66" d="M8.2 14.1c.8 1.2 2.18 1.96 3.8 1.96s3-.76 3.8-1.96c.28-.42.16-.98-.26-1.25a.9.9 0 0 0-1.25.25c-.45.67-1.28 1.1-2.29 1.1s-1.84-.43-2.29-1.1a.9.9 0 0 0-1.25-.25.9.9 0 0 0-.26 1.25Z"/></svg>Инвентарь<span class="inventory-badge" hidden>0</span></button>
          <button type="button" data-action="achievements"><span aria-hidden="true">★</span>${t("achievements")}</button>
        </nav>
      </div>
    `;
  };

  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  };

  const pressedFeedbackButtons = new WeakSet();

  const renderChapterScreens = () => {
    chapters.forEach(createChapterScreen);
    renderAllChapters();
    document.querySelectorAll("button").forEach(setPressedFeedback);
    updateInventoryBadge();
  };

  const setPressedFeedback = (button) => {
    if (pressedFeedbackButtons.has(button)) {
      return;
    }

    pressedFeedbackButtons.add(button);

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
    if (screenId !== "level-screen") {
      stopJezzLevel();
    }
    document.querySelectorAll(".screen").forEach((screen) => {
      const isActive = screen.id === screenId;
      screen.classList.toggle("is-active", isActive);
      screen.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  }

  const serializeChapterChests = () => Object.fromEntries(
    Object.entries(state.chapterChests || {}).map(([chapterId, chest]) => [
      chapterId,
      {
        earnedTier: normalizeChestTier(chest?.earnedTier),
        claimedTier: normalizeChestTier(chest?.claimedTier)
      }
    ])
  );

  const migrateChapterChests = (saved) => {
    const nextChests = {};
    const source = saved?.chapterChests;

    if (source && !Array.isArray(source) && typeof source === "object") {
      Object.entries(source).forEach(([chapterId, chest]) => {
        const safeChapterId = Number(chapterId);
        if (safeChapterId < 1 || safeChapterId > chapters.length) {
          return;
        }

        nextChests[safeChapterId] = {
          earnedTier: normalizeChestTier(chest?.earnedTier),
          claimedTier: normalizeChestTier(chest?.claimedTier)
        };
        nextChests[safeChapterId].claimedTier = Math.min(
          nextChests[safeChapterId].claimedTier,
          nextChests[safeChapterId].earnedTier
        );
      });
      return nextChests;
    }

    if (Array.isArray(source)) {
      source.map(Number).forEach((chapterId) => {
        if (chapterId >= 1 && chapterId <= chapters.length) {
          nextChests[chapterId] = {
            earnedTier: CHEST_TIERS.small,
            claimedTier: CHEST_TIERS.small
          };
        }
      });
    }

    if (Array.isArray(saved?.claimedChapterChests)) {
      saved.claimedChapterChests.map(Number).forEach((chapterId) => {
        if (chapterId >= 1 && chapterId <= chapters.length && !nextChests[chapterId]) {
          nextChests[chapterId] = {
            earnedTier: CHEST_TIERS.small,
            claimedTier: CHEST_TIERS.small
          };
        }
      });
    }

    return nextChests;
  };

  const normalizeBoosters = (savedBoosters = {}) => Object.fromEntries(
    Object.keys(DEFAULT_BOOSTERS).map((key) => [
      key,
      Math.max(0, Math.round(Number(savedBoosters?.[key]) || 0))
    ])
  );

  const normalizeStarsByLevel = (savedStars = {}) => {
    if (!savedStars || Array.isArray(savedStars) || typeof savedStars !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(savedStars).flatMap(([level, stars]) => {
        const safeLevel = Math.round(Number(level));
        const safeStars = Math.max(0, Math.min(3, Math.round(Number(stars) || 0)));

        return safeLevel >= 1 && safeLevel <= TOTAL_LEVELS && safeStars > 0
          ? [[safeLevel, safeStars]]
          : [];
      })
    );
  };

  const normalizeSelectedBoosters = (selectedBoosters) => {
    const source = Array.isArray(selectedBoosters) ? selectedBoosters : DEFAULT_SELECTED_BOOSTERS;
    const valid = source.filter((key) => Object.prototype.hasOwnProperty.call(DEFAULT_BOOSTERS, key));
    return valid.length ? Array.from(new Set(valid)) : [...DEFAULT_SELECTED_BOOSTERS];
  };

  const normalizeCosmetics = (savedCosmetics = {}) => {
    const cosmetics = {};
    Object.entries(DEFAULT_COSMETICS).forEach(([group, defaults]) => {
      const savedGroup = Array.isArray(savedCosmetics?.[group]) ? savedCosmetics[group] : [];
      cosmetics[group] = Array.from(new Set([...defaults, ...savedGroup].filter(Boolean)));
    });
    return cosmetics;
  };

  const normalizeEquippedCosmetics = (savedEquipped = {}, cosmetics = DEFAULT_COSMETICS) => {
    const equipped = { ...DEFAULT_EQUIPPED_COSMETICS };
    Object.entries(COSMETIC_GROUPS).forEach(([group, config]) => {
      const savedItem = savedEquipped?.[config.equippedKey];
      equipped[config.equippedKey] = cosmetics[group]?.includes(savedItem)
        ? savedItem
        : DEFAULT_EQUIPPED_COSMETICS[config.equippedKey];
    });
    return equipped;
  };

  const normalizeGifts = (savedGifts) => Array.isArray(savedGifts)
    ? savedGifts
      .filter((gift) => gift && typeof gift === "object" && gift.id)
      .map((gift) => ({
        id: String(gift.id),
        title: String(gift.title || "Подарок"),
        description: String(gift.description || ""),
        icon: String(gift.icon || "🎁"),
        coins: Math.max(0, Math.round(Number(gift.coins) || 0)),
        lives: Math.max(0, Math.round(Number(gift.lives) || 0)),
        boosters: normalizeBoosters(gift.boosters || {}),
        cosmetics: gift.cosmetics && typeof gift.cosmetics === "object" ? gift.cosmetics : null,
        claimed: gift.claimed === true
      }))
    : [];

  const serializeProgress = () => ({
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
    chapterChests: serializeChapterChests(),
    boosters: state.boosters,
    selectedBoosters: state.selectedBoosters,
    cosmetics: state.cosmetics,
    equippedCosmetics: state.equippedCosmetics,
    gifts: state.gifts,
    expandedChapters: Array.from(state.expandedChapters)
  });

  const getProgressScore = (saved = {}) => {
    const stars = Object.values(normalizeStarsByLevel(saved.starsByLevel)).reduce((sum, value) => sum + value, 0);
    const currentLevel = Math.max(1, Math.min(TOTAL_LEVELS + 1, Math.round(Number(saved.currentLevel) || 1)));
    return currentLevel * 1000 + stars;
  };

  const shouldUseIncomingProgress = (incoming) => (
    incoming && typeof incoming === "object" && getProgressScore(incoming) >= getProgressScore(serializeProgress())
  );

  const applySavedProgress = (saved) => {
    state.currentChapter = clampChapterId(Number(saved.currentChapter) || state.currentChapter);
    state.currentLevel = Math.max(1, Math.min(TOTAL_LEVELS + 1, Math.round(Number(saved.currentLevel) || state.currentLevel)));
    state.selectedLevel = Math.max(1, Math.min(TOTAL_LEVELS, Math.round(Number(saved.selectedLevel) || state.selectedLevel)));
    state.coins = Math.max(0, Math.round(Number(saved.coins) || 0));
    state.lives = Math.max(0, Math.min(MAX_LIVES, Math.round(Number(saved.lives) || 0)));
    state.nextLifeAt = Number.isFinite(Number(saved.nextLifeAt)) ? Number(saved.nextLifeAt) : null;
    state.music = saved.music !== false;
    state.sound = saved.sound !== false;
    state.starsByLevel = normalizeStarsByLevel(saved.starsByLevel);
    state.perfectChapters = new Set(
      Array.isArray(saved.perfectChapters)
        ? saved.perfectChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : []
    );
    state.chapterChests = migrateChapterChests(saved);
    state.boosters = normalizeBoosters(saved.boosters);
    state.selectedBoosters = normalizeSelectedBoosters(saved.selectedBoosters);
    state.cosmetics = normalizeCosmetics(saved.cosmetics);
    state.equippedCosmetics = normalizeEquippedCosmetics(saved.equippedCosmetics, state.cosmetics);
    state.gifts = normalizeGifts(saved.gifts);
    state.expandedChapters = new Set(
      Array.isArray(saved.expandedChapters)
        ? saved.expandedChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : [getChapterForLevel(state.currentLevel)]
    );
    state.expandedChapters.add(getChapterForLevel(state.currentLevel));
  };

  const saveCloudProgress = async (flush = false) => {
    if (!yandexState.player || typeof yandexState.player.setData !== "function") {
      return;
    }

    try {
      await yandexState.player.setData({ [CLOUD_SAVE_KEY]: serializeProgress() }, flush);
    } catch (_error) {
      // Cloud saves are best effort; localStorage remains the offline fallback.
    }
  };

  const scheduleCloudSave = (flush = false) => {
    if (!yandexState.player) {
      return;
    }

    window.clearTimeout(yandexState.cloudSaveTimer);
    yandexState.cloudSaveTimer = window.setTimeout(() => {
      yandexState.cloudSaveTimer = null;
      saveCloudProgress(flush);
    }, flush ? 0 : 700);
  };

  const loadCloudProgress = async () => {
    if (!yandexState.player || typeof yandexState.player.getData !== "function") {
      return;
    }

    try {
      const cloudData = await yandexState.player.getData([CLOUD_SAVE_KEY]);
      const cloudProgress = cloudData?.[CLOUD_SAVE_KEY];
      if (shouldUseIncomingProgress(cloudProgress)) {
        applySavedProgress(cloudProgress);
        saveProgress({ skipCloud: true });
        refreshProgressUi();
      } else {
        scheduleCloudSave(true);
      }
    } catch (_error) {
      // If player data is unavailable, keep the already loaded local progress.
    }
  };

  const markProgressSavedForPerf = () => {
    if (!IS_PERF) {
      return;
    }
    const now = performance.now();
    perfState.saveTimes.push(now);
    while (perfState.saveTimes.length && now - perfState.saveTimes[0] > 60000) {
      perfState.saveTimes.shift();
    }
  };

  const writeLocalProgress = () => {
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(serializeProgress()));
      markProgressSavedForPerf();
    } catch (_error) {
      // Some embedded browsers disable storage; the game still works for the session.
    }
  };

  const flushLocalProgress = () => {
    if (yandexState.localSaveTimer) {
      window.clearTimeout(yandexState.localSaveTimer);
      yandexState.localSaveTimer = null;
    }
    writeLocalProgress();
  };

  const saveProgress = ({ skipCloud = false, flushCloud = false, immediate = false } = {}) => {
    if (immediate || flushCloud) {
      flushLocalProgress();
    } else {
      window.clearTimeout(yandexState.localSaveTimer);
      yandexState.localSaveTimer = window.setTimeout(() => {
        yandexState.localSaveTimer = null;
        writeLocalProgress();
      }, 500);
    }

    if (!skipCloud) {
      if (flushCloud) {
        window.clearTimeout(yandexState.cloudSaveTimer);
        yandexState.cloudSaveTimer = null;
        saveCloudProgress(true);
      } else {
        scheduleCloudSave(false);
      }
    }

    scheduleLeaderboardScore();
  };

  const saveProgressDebounced = (options = {}) => saveProgress({ ...options, immediate: false });
  const saveProgressImmediate = (options = {}) => saveProgress({ ...options, immediate: true });

  const loadProgress = () => {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return;
      }

      const saved = JSON.parse(raw);
      applySavedProgress(saved);
    } catch (_error) {
      state.perfectChapters = new Set();
      state.chapterChests = {};
      state.boosters = { ...DEFAULT_BOOSTERS };
      state.selectedBoosters = [...DEFAULT_SELECTED_BOOSTERS];
      state.cosmetics = normalizeCosmetics();
      state.equippedCosmetics = normalizeEquippedCosmetics({}, state.cosmetics);
      state.gifts = [];
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
    if (levelState.running && levelScreen.classList.contains("is-active")) {
      levelState.running = false;
      levelState.pausedByModal = true;
      updateGameplayMarker(false);
      if (levelState.animationId) {
        window.cancelAnimationFrame(levelState.animationId);
        levelState.animationId = null;
      }
    }
    confirmModal.classList.add("is-open");
    confirmModal.setAttribute("aria-hidden", "false");
    activateModalFocus(confirmModal, {
      initialFocus: confirmAcceptButton,
      onEscape: () => closeConfirm(false)
    });

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
    deactivateModalFocus(confirmModal);
    if (levelState.pausedByModal && !levelState.completed && !levelState.failed && levelScreen.classList.contains("is-active")) {
      levelState.pausedByModal = false;
      levelState.running = true;
      levelState.lastFrameAt = performance.now();
      updateGameplayMarker(true);
      if (!levelState.animationId) {
        levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
      }
    } else {
      levelState.pausedByModal = false;
    }
    const resolve = confirmResolve;
    confirmResolve = null;
    resolve(result);
  };

  const getRewardLineMarkup = (reward) => `
    <div class="chapter-chest-reward-line"><span aria-hidden="true">●</span><strong>+${reward.coins}</strong> монет</div>
    ${reward.lives > 0 ? `<div class="chapter-chest-reward-line"><span aria-hidden="true">♥</span><strong>+${reward.lives}</strong> жизней</div>` : ""}
  `;

  const showChapterChestResult = (summary) => showConfirm({
    title: summary.title,
    message: summary.message,
    acceptText: t("ok"),
    cancelText: null
  });

  const showNoLivesPrompt = async () => {
    const canUseRewardedAd = Boolean(yandexState.sdk?.adv && typeof yandexState.sdk.adv.showRewardedVideo === "function");
    const shouldWatchAd = await showConfirm({
      title: t("noLivesTitle"),
      message: canUseRewardedAd
        ? `${t("noLivesMessage")} Можно посмотреть рекламу и получить 1 жизнь.`
        : t("noLivesMessage"),
      acceptText: canUseRewardedAd ? "Смотреть рекламу" : t("toChapters"),
      cancelText: canUseRewardedAd ? t("toChapters") : null
    });

    if (canUseRewardedAd && shouldWatchAd) {
      const rewarded = await showRewardedLifeAd();
      if (rewarded) {
        restoreLife();
        saveProgressImmediate({ flushCloud: true });
        syncResources();
        return true;
      }
    }

    stopJezzLevel();
    openProgressChapter();
    return false;
  };

  const showChapterChestPrompt = (chapterId) => new Promise((resolve) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      resolve(false);
      return;
    }

    const panel = document.createElement("div");
    panel.className = "chapter-chest-panel is-visible";
    panel.id = "chapterChestPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML = `
      <div class="chapter-chest-card">
        <div class="chapter-chest-icon" aria-hidden="true">🎁</div>
        <h2>${reward.claimedTier > CHEST_TIERS.none ? "Сундук главы улучшен!" : "Сундук главы готов!"}</h2>
        <p>Глава ${chapterId}</p>
        <div class="chapter-chest-type">
          ${reward.claimedTier > CHEST_TIERS.none
            ? `Было: ${reward.previousTitle}<br>Стало: ${reward.nextTitle}`
            : `Получен: ${reward.nextTitle}`}
        </div>
        <div class="chapter-chest-rewards">${getRewardLineMarkup(reward)}</div>
        <div class="chapter-chest-actions">
          <button class="menu-button map-reward-button compact-play" type="button" data-choice="later">Позже</button>
          <button class="menu-button play-button compact-play" type="button" data-choice="open">Открыть</button>
        </div>
      </div>
    `;

    const close = (shouldOpen) => {
      deactivateModalFocus(panel);
      panel.remove();
      resolve(shouldOpen);
    };

    panel.querySelector('[data-choice="later"]')?.addEventListener("click", () => close(false), { once: true });
    panel.querySelector('[data-choice="open"]')?.addEventListener("click", () => close(true), { once: true });
    root.append(panel);
    activateModalFocus(panel, {
      initialFocus: panel.querySelector('[data-choice="open"]'),
      onEscape: () => close(false)
    });
  });

  const showChapterChestClaimPanel = (chapterId) => new Promise((resolve) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      resolve(null);
      return;
    }

    const panel = document.createElement("div");
    panel.className = "chapter-chest-panel is-visible";
    panel.id = "chapterChestPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML = `
      <div class="chapter-chest-card">
        <div class="chapter-chest-icon" aria-hidden="true">🎁</div>
        <h2>${reward.claimedTier > CHEST_TIERS.none ? "Сундук улучшен!" : "Сундук главы!"}</h2>
        <p>Глава ${chapterId}</p>
        <div class="chapter-chest-stars">Собрано звёзд: ${getChapterStars(chapterId)} / 30</div>
        <div class="chapter-chest-type">
          ${reward.claimedTier > CHEST_TIERS.none
            ? `Было: ${reward.previousTitle}<br>Стало: ${reward.nextTitle}`
            : `Получен: ${reward.nextTitle}`}
        </div>
        <div class="chapter-chest-rewards">${getRewardLineMarkup(reward)}</div>
        <button class="menu-button play-button compact-play chapter-chest-claim" type="button">Забрать</button>
      </div>
    `;

    panel.querySelector(".chapter-chest-claim")?.addEventListener("click", async () => {
      const result = openChapterChest(chapterId, { silent: true });
      deactivateModalFocus(panel);
      panel.remove();
      if (result) {
        await showChapterChestResult({
          title: result.claimedTier > CHEST_TIERS.none ? "Апгрейд получен" : "Глава завершена",
          message: `Получено: +${result.coins} монет${result.gainedLives > 0 ? `, +${result.gainedLives} жизней` : ""}`
        });
      }
      resolve(result);
    }, { once: true });
    root.append(panel);
    activateModalFocus(panel, {
      initialFocus: panel.querySelector(".chapter-chest-claim"),
      onEscape: () => {
        deactivateModalFocus(panel);
        panel.remove();
        resolve(null);
      }
    });
  });

  const openChapterChest = (chapterId, options = {}) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      return null;
    }

    const previousLives = state.lives;
    state.coins += reward.coins;
    state.lives = Math.min(MAX_LIVES, state.lives + reward.lives);
    ensureChapterChest(chapterId).claimedTier = ensureChapterChest(chapterId).earnedTier;
    saveProgressImmediate();
    syncResources();
    renderChapterScreens();
    renderInventory();
    updateInventoryBadge();

    const result = {
      ...reward,
      gainedLives: state.lives - previousLives
    };

    if (!options.silent) {
      showChapterChestResult({
        title: reward.claimedTier > CHEST_TIERS.none ? "Апгрейд получен" : "Глава завершена",
        message: `Получено: +${reward.coins} монет${result.gainedLives > 0 ? `, +${result.gainedLives} жизней` : ""}`
      });
    }

    return result;
  };

  const openAllPendingChests = async () => {
    const pending = getPendingChests();
    if (!pending.length) {
      await showChapterChestResult({
        title: "Нет сундуков",
        message: "Собирай звёзды в главах, чтобы получать сундуки."
      });
      return;
    }

    const previousLives = state.lives;
    const totalCoins = pending.reduce((sum, reward) => sum + reward.coins, 0);
    const totalLives = pending.reduce((sum, reward) => sum + reward.lives, 0);
    state.coins += totalCoins;
    state.lives = Math.min(MAX_LIVES, state.lives + totalLives);
    pending.forEach((reward) => {
      ensureChapterChest(reward.chapterId).claimedTier = ensureChapterChest(reward.chapterId).earnedTier;
    });
    saveProgressImmediate();
    syncResources();
    renderChapterScreens();
    renderInventory();
    updateInventoryBadge();

    await showChapterChestResult({
      title: `Открыто сундуков: ${pending.length}`,
      message: `Получено: +${totalCoins} монет${state.lives - previousLives > 0 ? `, +${state.lives - previousLives} жизней` : ""}`
    });
  };

  const showChestsPanel = () => new Promise((resolve) => {
    const pending = getPendingChests();
    const panel = document.createElement("div");
    panel.className = "chapter-chest-panel chapter-chests-inventory is-visible";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML = `
      <div class="chapter-chest-card chapter-chests-card">
        <button class="reward-close chapter-chests-close" type="button" aria-label="Закрыть">×</button>
        <div class="chapter-chest-icon" aria-hidden="true">🎁</div>
        <h2>Сундуки</h2>
        ${pending.length > 1 ? `<button class="menu-button play-button compact-play chapter-open-all" type="button">Открыть все</button>` : ""}
        <div class="chapter-chests-list">
          ${pending.length
            ? pending.map((reward) => `
              <article class="chapter-chest-item">
                <h3>${reward.claimedTier > CHEST_TIERS.none ? `Апгрейд сундука главы ${reward.chapterId}` : `Глава ${reward.chapterId}`}</h3>
                <p>${reward.claimedTier > CHEST_TIERS.none
                  ? `Было: ${reward.previousTitle}<br>Стало: ${reward.nextTitle}`
                  : `Тип сундука: ${reward.nextTitle}`}</p>
                <p>Звёзды главы: ${getChapterStars(reward.chapterId)} / 30</p>
                <div class="chapter-chest-rewards">${getRewardLineMarkup(reward)}</div>
                <button class="menu-button play-button compact-play" type="button" data-open-chest="${reward.chapterId}">Открыть</button>
              </article>
            `).join("")
            : `
              <div class="chapter-empty-chests">
                <h3>Нет сундуков</h3>
                <p>Собирай звёзды в главах, чтобы получать сундуки.</p>
              </div>
            `}
        </div>
      </div>
    `;

    const close = () => {
      deactivateModalFocus(panel);
      panel.remove();
      resolve();
    };

    panel.querySelector(".chapter-chests-close")?.addEventListener("click", close, { once: true });
    panel.querySelector(".chapter-open-all")?.addEventListener("click", async () => {
      deactivateModalFocus(panel);
      panel.remove();
      await openAllPendingChests();
      resolve();
    }, { once: true });
    panel.querySelectorAll("[data-open-chest]").forEach((button) => {
      button.addEventListener("click", async () => {
        const chapterId = Number(button.dataset.openChest);
        deactivateModalFocus(panel);
        panel.remove();
        await showChapterChestClaimPanel(chapterId);
        resolve();
      }, { once: true });
    });
    root.append(panel);
    activateModalFocus(panel, {
      initialFocus: panel.querySelector(".chapter-chests-close"),
      onEscape: close
    });
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

  const applyLevelCompletionProgress = (completion) => {
    if (!completion || completion.applied) {
      return completion;
    }

    const completedLevel = completion.level || state.selectedLevel;
    const completedChapterId = getChapterForLevel(completedLevel);
    const completedNextChapterId = Math.min(chapters.length, completedChapterId + 1);
    const previousStars = state.starsByLevel[completedLevel] || 0;
    const improvedStars = completion.stars > previousStars;
    const reward = getRewardDelta(completion.stars, previousStars, completedLevel);
    const completedChapterFinal = isChapterFinalLevel(completedLevel);
    let chestProgress = null;

    if (improvedStars) {
      state.starsByLevel[completedLevel] = completion.stars;
      chestProgress = syncChapterChestProgress(completedChapterId);
    }

    if (!completion.replayingCompleted && completedLevel === state.currentLevel) {
      state.coins += reward.coins;
      if (reward.restoreLife) {
        restoreLife();
      }
      if (reward.perfectChapterId) {
        state.perfectChapters.add(reward.perfectChapterId);
      }
      state.currentLevel = Math.min(TOTAL_LEVELS + 1, state.currentLevel + 1);
      if (chestProgress?.changed && getPendingChestReward(completedChapterId).hasReward) {
        completion.chapterChestId = completedChapterId;
      }
      if (completedChapterFinal && completedLevel < TOTAL_LEVELS) {
        state.expandedChapters.add(completedNextChapterId);
        state.currentChapter = completedNextChapterId;
      }
      renderChapterScreens();
    } else if (improvedStars) {
      state.coins += reward.coins;
      if (reward.restoreLife) {
        restoreLife();
      }
      if (reward.perfectChapterId) {
        state.perfectChapters.add(reward.perfectChapterId);
      }
      completion.chapterChestId = chestProgress?.changed && getPendingChestReward(completedChapterId).hasReward
        ? completedChapterId
        : null;
      renderChapterScreens();
    } else {
      completion.chapterChestId = null;
    }

    completion.applied = true;
    completion.awardedStars = reward.stars;
    completion.coins = reward.coins;
    completion.restoreLife = reward.restoreLife;
    completion.lifeFull = reward.lifeFull;
    completion.perfectChapterId = reward.perfectChapterId;
    levelState.lastCompletion = completion;
    syncResources();
    scheduleLeaderboardScore();

    return completion;
  };

  const getEarnedStars = () => Object.values(state.starsByLevel).reduce((sum, stars) => sum + (Number(stars) || 0), 0);

  const submitLeaderboardScore = async () => {
    if (IS_DEBUG) {
      return;
    }

    if (!yandexState.sdk?.leaderboards || typeof yandexState.sdk.leaderboards.setScore !== "function") {
      return;
    }

    try {
      await yandexState.sdk.leaderboards.setScore(LEADERBOARD_NAME, getEarnedStars());
    } catch (_error) {
      // Leaderboards require console setup and authorization; gameplay should not depend on them.
    }
  };

  const scheduleLeaderboardScore = () => {
    window.clearTimeout(yandexState.leaderboardSaveTimer);
    yandexState.leaderboardSaveTimer = window.setTimeout(() => {
      yandexState.leaderboardSaveTimer = null;
      submitLeaderboardScore();
    }, 1000);
  };

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
      setTextIfChanged(node, text);
    });
  };

  const syncResources = () => {
    state.achievements = getEarnedStars();
    state.lives = Math.min(MAX_LIVES, Math.max(0, state.lives));
    state.coins = Math.max(0, state.coins);

    document.querySelectorAll('[data-resource="coins"]').forEach((node) => {
      setTextIfChanged(node, state.coins);
    });
    document.querySelectorAll('[data-resource="lives"]').forEach((node) => {
      setTextIfChanged(node, state.lives);
    });
    document.querySelectorAll('[data-resource="achievements"], [data-resource="total-stars"]').forEach((node) => {
      setTextIfChanged(node, state.achievements);
    });
    document.querySelectorAll('[data-resource="level-stars"]').forEach((node) => {
      setTextIfChanged(node, levelState.completed && levelState.lastCompletion
        ? levelState.lastCompletion.stars
        : (state.starsByLevel[state.selectedLevel] || 0));
    });
    Object.keys(DEFAULT_BOOSTERS).forEach((key) => {
      const count = Math.max(0, Math.round(Number(state.boosters[key]) || 0));
      document.querySelectorAll(`[data-booster-count="${key}"]`).forEach((node) => {
        setTextIfChanged(node, `x${count}`);
      });
      document.querySelectorAll(`[data-level-boost="${key}"]`).forEach((button) => {
        button.disabled = count <= 0;
        button.classList.toggle("is-empty", count <= 0);
      });
    });
    syncLifeRestoreTimer();
    updateInventoryBadge();
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
      const statusText = isChapterUnlocked(chapter.id) ? getChapterChestStatusText(chapter.id) : t("chapterComplete");

      ctas.forEach((cta) => {
        cta.classList.toggle("is-visible", showCta);
        cta.setAttribute("aria-hidden", showCta ? "false" : "true");
      });
      statuses.forEach((status) => {
        status.textContent = statusText;
        const showStatus = isChapterUnlocked(chapter.id) && !showCta;
        status.classList.toggle("is-visible", showStatus);
        status.setAttribute("aria-hidden", showStatus ? "false" : "true");
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

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const getChapterChestName = (chapterId, isUpgrade = false) => {
    const title = getChapterTitle(chapterId);
    return isUpgrade ? `Сундук ${title} улучшен!` : `Сундук ${title}`;
  };

  const formatRewardText = ({ coins = 0, lives = 0, boosters = {} }) => {
    const parts = [];
    if (coins > 0) {
      parts.push(`+${coins} монет`);
    }
    if (lives > 0) {
      parts.push(`+${lives} ${lives === 1 ? "жизнь" : "жизней"}`);
    }
    Object.entries(boosters || {}).forEach(([key, count]) => {
      const amount = Math.max(0, Math.round(Number(count) || 0));
      const booster = BOOSTER_ITEMS[key];
      if (booster && amount > 0) {
        parts.push(`${booster.icon} ${booster.title} x${amount}`);
      }
    });
    return parts.length ? parts.join(", ") : "Бонус";
  };

  const getPendingGifts = () => state.gifts.filter((gift) => gift.claimed !== true);

  const getInventoryBadgeCount = () => getPendingChests().length + getPendingGifts().length;

  const updateInventoryBadge = () => {
    const count = getInventoryBadgeCount();
    const hasPendingChests = getPendingChests().length > 0;
    document.querySelectorAll(".inventory-badge").forEach((badge) => {
      badge.hidden = count <= 0;
      setTextIfChanged(badge, count);
    });
    document.querySelectorAll(".inventory-button").forEach((button) => {
      button.classList.toggle("has-pending-chests", hasPendingChests);
    });
    document.querySelectorAll('[data-inventory-tab="chests"]').forEach((button) => {
      button.classList.toggle("has-pending-chests", hasPendingChests);
    });
    inventoryModal?.classList.toggle("has-pending-chests", hasPendingChests);
  };

  const renderInventoryChests = () => {
    const pending = getPendingChests();
    if (!pending.length) {
      return `
        <div class="inventory-empty">
          <h3>Сундуков пока нет</h3>
          <p>Собирай звёзды в главах, чтобы получать сундуки.</p>
        </div>
      `;
    }

    return `
      ${pending.length > 1 ? `<button class="menu-button play-button compact-play open-all-chests-button" type="button" data-inventory-action="open-all-chests">Открыть все</button>` : ""}
      <div class="inventory-card-list">
        ${pending.map((reward) => {
          const isUpgrade = reward.claimedTier > CHEST_TIERS.none;
          const actionText = isUpgrade ? "Забрать" : "Открыть";
          return `
            <article class="inventory-card chest-card">
              <div class="inventory-card-icon" aria-hidden="true">🎁</div>
              <div class="inventory-card-body">
                <h3>${escapeHtml(getChapterChestName(reward.chapterId, isUpgrade))}</h3>
                ${isUpgrade
                  ? `<p>Было: ${escapeHtml(reward.previousTitle)}</p><p>Стало: ${escapeHtml(reward.nextTitle)}</p>`
                  : `<p>${escapeHtml(reward.nextTitle)}</p>`}
                <p>Звёзды: ${getChapterStars(reward.chapterId)} / 30</p>
                <p>${isUpgrade ? "Доп. награда" : "Награда"}: ${escapeHtml(formatRewardText(reward))}</p>
              </div>
              <button class="menu-button play-button compact-play" type="button" data-inventory-action="open-chest" data-chapter-id="${reward.chapterId}">${actionText}</button>
            </article>
          `;
        }).join("")}
      </div>
    `;
  };

  const renderInventoryBoosts = () => `
    <div class="inventory-card-list">
      ${Object.entries(BOOSTER_ITEMS).map(([key, booster]) => {
        const count = Math.max(0, Math.round(Number(state.boosters[key]) || 0));
        return `
          <article class="inventory-card boost-card">
            <div class="inventory-card-icon" aria-hidden="true">${booster.icon}</div>
            <div class="inventory-card-body">
              <h3>${booster.title} x${count}</h3>
              <p>${booster.description}</p>
              ${count > 0 ? `<p class="inventory-status">Статус: в панели уровня</p>` : ""}
            </div>
            ${count <= 0 ? `<button class="menu-button map-reward-button compact-play" type="button" data-inventory-action="buy-boost">Купить</button>` : ""}
          </article>
        `;
      }).join("")}
    </div>
  `;

  const renderInventorySkins = () => Object.entries(COSMETIC_GROUPS).map(([group, config]) => `
    <section class="inventory-skin-group">
      <h3>${config.title}</h3>
      <div class="inventory-card-list">
        ${(state.cosmetics[group] || []).map((skinId) => {
          const skin = config.items[skinId] || { icon: "◆", title: skinId };
          const isEquipped = state.equippedCosmetics[config.equippedKey] === skinId;
          return `
            <article class="inventory-card skin-card">
              <div class="inventory-card-icon" aria-hidden="true">${skin.icon}</div>
              <div class="inventory-card-body">
                <h3>${escapeHtml(skin.title)}</h3>
                <p class="inventory-status">${isEquipped ? "Выбран" : "Куплен"}</p>
              </div>
              ${isEquipped ? "" : `<button class="menu-button play-button compact-play" type="button" data-inventory-action="equip-skin" data-cosmetic-group="${group}" data-skin-id="${escapeHtml(skinId)}">Выбрать</button>`}
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");

  const renderInventoryGifts = () => {
    const gifts = getPendingGifts();
    if (!gifts.length) {
      return `
        <div class="inventory-empty">
          <h3>Подарков пока нет</h3>
          <p>Заглядывай позже — здесь будут появляться бонусы.</p>
        </div>
      `;
    }

    return `
      <div class="inventory-card-list">
        ${gifts.map((gift) => `
          <article class="inventory-card gift-card">
            <div class="inventory-card-icon" aria-hidden="true">${escapeHtml(gift.icon || "🎁")}</div>
            <div class="inventory-card-body">
              <h3>${escapeHtml(gift.title)}</h3>
              ${gift.description ? `<p>${escapeHtml(gift.description)}</p>` : ""}
              <p>Награда: ${escapeHtml(formatRewardText(gift))}</p>
            </div>
            <button class="menu-button play-button compact-play" type="button" data-inventory-action="claim-gift" data-gift-id="${escapeHtml(gift.id)}">Забрать</button>
          </article>
        `).join("")}
      </div>
    `;
  };

  const renderInventory = () => {
    if (!inventoryContent) {
      return;
    }

    inventoryModal?.querySelectorAll("[data-inventory-tab]").forEach((button) => {
      const isActive = button.dataset.inventoryTab === state.inventoryTab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const renderers = {
      chests: renderInventoryChests,
      boosts: renderInventoryBoosts,
      skins: renderInventorySkins,
      gifts: renderInventoryGifts
    };
    inventoryContent.innerHTML = (renderers[state.inventoryTab] || renderInventoryChests)();
    updateInventoryBadge();
  };

  const setInventoryTab = (tab) => {
    if (!["chests", "boosts", "skins", "gifts"].includes(tab)) {
      return;
    }
    state.inventoryTab = tab;
    renderInventory();
  };

  const openInventoryModal = (tab = "chests") => {
    if (!inventoryModal) {
      return;
    }
    state.inventoryTab = tab;
    renderInventory();
    inventoryModal.classList.add("is-open");
    inventoryModal.setAttribute("aria-hidden", "false");
    activateModalFocus(inventoryModal, {
      initialFocus: inventoryCloseButton,
      onEscape: closeInventoryModal
    });
  };

  const closeInventoryModal = () => {
    inventoryModal?.classList.remove("is-open");
    inventoryModal?.setAttribute("aria-hidden", "true");
    deactivateModalFocus(inventoryModal);
  };

  const waitNextFrame = () => new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });

  const equipSkin = (group, skinId) => {
    const config = COSMETIC_GROUPS[group];
    if (!config || !state.cosmetics[group]?.includes(skinId)) {
      return;
    }
    state.equippedCosmetics[config.equippedKey] = skinId;
    saveProgress();
    renderInventory();
  };

  const addGiftCosmetics = (cosmetics) => {
    if (!cosmetics || typeof cosmetics !== "object") {
      return;
    }
    Object.entries(COSMETIC_GROUPS).forEach(([group]) => {
      const unlocked = Array.isArray(cosmetics[group]) ? cosmetics[group] : [];
      unlocked.forEach((skinId) => {
        if (skinId && !state.cosmetics[group].includes(skinId)) {
          state.cosmetics[group].push(skinId);
        }
      });
    });
  };

  const claimGift = (giftId) => {
    const gift = state.gifts.find((item) => item.id === giftId && item.claimed !== true);
    if (!gift) {
      return;
    }

    state.coins += gift.coins || 0;
    state.lives = Math.min(MAX_LIVES, state.lives + (gift.lives || 0));
    Object.entries(gift.boosters || {}).forEach(([key, count]) => {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_BOOSTERS, key)) {
        state.boosters[key] = Math.max(0, Math.round(Number(state.boosters[key]) || 0)) + Math.max(0, Math.round(Number(count) || 0));
      }
    });
    addGiftCosmetics(gift.cosmetics);
    gift.claimed = true;
    saveProgressImmediate();
    syncResources();
    renderInventory();
    updateInventoryBadge();
  };

  const setTextIfChanged = (element, value) => {
    const nextValue = String(value);
    if (element && element.textContent !== nextValue) {
      element.textContent = nextValue;
    }
  };

  const syncLevelHud = () => {
    const percent = Math.floor(getCaptureRatio() * 100);
    if (capturePercent) {
      setTextIfChanged(capturePercent, `${percent}%`);
    }
    if (penaltyCount) {
      setTextIfChanged(penaltyCount, `${levelState.penalties}/${MAX_PENALTIES}`);
    }
    if (targetPercent) {
      setTextIfChanged(targetPercent, `${levelState.target}%`);
    }
    if (helperTargetPercent) {
      setTextIfChanged(helperTargetPercent, `${levelState.target}%`);
    }
    if (obstacleLegend) {
      const hasObstacles = Boolean(levelState.obstacles && levelState.obstacles.length);
      obstacleLegend.hidden = !hasObstacles;
      if (!hasObstacles) {
        closeObstacleLegend();
      }
    }
  };

  const showObstacleLegendHint = () => {
    if (!obstacleLegend || !(levelState.obstacles && levelState.obstacles.length)) {
      return;
    }

    obstacleLegend.hidden = false;
    closeObstacleLegend();
  };

  const setObstacleLegendExpanded = (isExpanded) => {
    obstacleLegendToggle?.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  };

  const closeObstacleLegend = () => {
    if (!obstacleLegend) {
      return;
    }

    window.clearTimeout(levelState.obstacleLegendTimer);
    levelState.obstacleLegendTimer = null;
    obstacleLegend.classList.remove("is-visible");
    setObstacleLegendExpanded(false);
  };

  const openObstacleLegend = () => {
    if (!obstacleLegend || obstacleLegend.hidden) {
      return;
    }

    window.clearTimeout(levelState.obstacleLegendTimer);
    obstacleLegend.classList.add("is-visible");
    setObstacleLegendExpanded(true);
    levelState.obstacleLegendTimer = window.setTimeout(() => {
      closeObstacleLegend();
    }, 4000);
  };

  const showLevelHelperHint = () => {
    const panel = document.querySelector(".level-helper-panel");
    if (!panel) {
      return;
    }

    window.clearTimeout(levelState.helperHintTimer);
    closeObstacleLegend();
    panel.classList.remove("is-visible");
    void panel.offsetWidth;
    panel.classList.add("is-visible");
    levelState.helperHintTimer = window.setTimeout(() => {
      panel.classList.remove("is-visible");
    }, 4600);
  };

  obstacleLegendToggle?.addEventListener("click", () => {
    if (!obstacleLegend || obstacleLegend.hidden) {
      return;
    }

    if (obstacleLegend.classList.contains("is-visible")) {
      closeObstacleLegend();
    } else {
      openObstacleLegend();
    }
  });

  document.addEventListener("click", (event) => {
    if (!obstacleLegend?.classList.contains("is-visible") || obstacleLegend.contains(event.target)) {
      return;
    }

    closeObstacleLegend();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeObstacleLegend();
    }
  });

  const syncLineOrientationButtons = () => {
    lineOrientationButtons.forEach((button) => {
      const isActive = button.dataset.lineOrientation === levelState.lineOrientation;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const setLineOrientation = (orientation) => {
    if (orientation !== "vertical" && orientation !== "horizontal") {
      return;
    }
    levelState.lineOrientation = orientation;
    if (levelState.aimPointer) {
      levelState.aimPointer.orientation = orientation;
    }
    syncLineOrientationButtons();
    requestDrawJezzLevel();
  };

  const toggleLineOrientation = () => {
    setLineOrientation(levelState.lineOrientation === "vertical" ? "horizontal" : "vertical");
  };

  const isLikelyMobileDevice = () => (
    window.matchMedia?.("(pointer: coarse)").matches
    || Math.min(window.innerWidth || 0, window.innerHeight || 0) <= 540
  );

  const getCanvasPixelRatio = () => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    if (lowPerformanceMode) {
      return 1;
    }
    return Math.min(dpr, isLikelyMobileDevice() ? 1.25 : 1.5);
  };

  const resizeLayerCanvas = (canvas, width, height, pixelRatio) => {
    if (!canvas) {
      return;
    }
    const pixelWidth = Math.max(1, Math.round(width * pixelRatio));
    const pixelHeight = Math.max(1, Math.round(height * pixelRatio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const markCanvasCachesDirty = ({ background = true, staticLayer = true } = {}) => {
    if (background) {
      backgroundCacheDirty = true;
    }
    if (staticLayer) {
      staticLayerDirty = true;
    }
  };

  const resizeJezzCanvas = () => {
    if (!jezzCanvas) {
      return { width: 0, height: 0 };
    }

    const pixelRatio = getCanvasPixelRatio();
    const box = jezzCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(box.width));
    const height = Math.max(1, Math.round(box.height));
    const pixelWidth = Math.round(width * pixelRatio);
    const pixelHeight = Math.round(height * pixelRatio);
    const changed = pixelWidth !== lastCanvasPixelWidth
      || pixelHeight !== lastCanvasPixelHeight
      || pixelRatio !== lastCanvasPixelRatio;
    if (changed) {
      jezzCanvas.width = pixelWidth;
      jezzCanvas.height = pixelHeight;
      jezzCanvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      lastCanvasPixelWidth = pixelWidth;
      lastCanvasPixelHeight = pixelHeight;
      lastCanvasPixelRatio = pixelRatio;
      backgroundCacheCanvas = backgroundCacheCanvas || document.createElement("canvas");
      staticLayerCanvas = staticLayerCanvas || document.createElement("canvas");
      resizeLayerCanvas(backgroundCacheCanvas, width, height, pixelRatio);
      resizeLayerCanvas(staticLayerCanvas, width, height, pixelRatio);
      markCanvasCachesDirty();
    }
    return { width, height };
  };

  const getJezzPlayRect = (size) => {
    const width = Math.max(1, size.width);
    const height = Math.max(1, size.height);
    const desiredMargin = Math.max(12, Math.min(22, width * 0.03));
    const maxMargin = Math.max(0, Math.min(width, height) / 2 - 1);
    const margin = Math.min(desiredMargin, maxMargin);
    return {
      x: margin,
      y: margin,
      w: Math.max(1, width - margin * 2),
      h: Math.max(1, height - margin * 2)
    };
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

  const clampPointToRect = (point, rect, padding = 6) => ({
    x: Math.min(rect.x + rect.w - padding, Math.max(rect.x + padding, point.x)),
    y: Math.min(rect.y + rect.h - padding, Math.max(rect.y + padding, point.y))
  });

  const rectArea = (rect) => rect.w * rect.h;

  const getLevelConfig = (level) => LEVEL_CONFIGS[level] || LEVEL_CONFIGS[1];

  const getBallSpeedScale = (rect) => {
    const fieldSize = Math.max(1, Math.min(rect?.w || 1, rect?.h || 1));
    return fieldSize / BALL_SPEED_REFERENCE_SIZE;
  };

  const getSpeedValue = (speed, rect) => (LEVEL_SPEEDS[speed] || LEVEL_SPEEDS.medium) * getBallSpeedScale(rect);

  const normalizeObstacle = (obstacle) => {
    const type = obstacle.type || (obstacle.moving ? "moving" : "static");
    const isMoving = type === "moving";
    const isSafe = Boolean(obstacle.safe);
    return {
      ...obstacle,
      type,
      safe: isSafe,
      moving: isMoving,
      blocksBall: obstacle.blocksBall ?? true,
      blocksLine: obstacle.blocksLine ?? true,
      dangerForLine: obstacle.dangerForLine ?? !isSafe,
      solidForCapture: obstacle.solidForCapture ?? !isMoving
    };
  };

  const createObstacle = (definition, rect, index = 0) => {
    const normalized = normalizeObstacle(definition);
    const obstacle = {
      ...normalized,
      baseX: normalized.x,
      baseY: normalized.y,
      wRatio: normalized.w,
      hRatio: normalized.h,
      x1Ratio: normalized.x1,
      x2Ratio: normalized.x2,
      y1Ratio: normalized.y1,
      y2Ratio: normalized.y2,
      phase: normalized.phase || index * 0.27,
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

  const pointInCapturedRect = (point) => levelState.capturedRects.some((rect) => pointInRect(point, rect));

  const getActiveAreaAtPoint = (point) => (
    levelState.activeRects.find((rect) => pointInRect(point, rect))
    || null
  );

  const getPointerActiveRect = getActiveAreaAtPoint;

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
      ? { orientation: "vertical", x: line.x, y1: line.boundA ?? rect.y, y2: line.boundB ?? rect.y + rect.h }
      : { orientation: "horizontal", y: line.y, x1: line.boundA ?? rect.x, x2: line.boundB ?? rect.x + rect.w }
  );

  const snapValue = (value, targets, epsilon = WALL_SNAP_EPSILON) => {
    for (const target of targets) {
      if (Math.abs(value - target) <= epsilon) {
        return target;
      }
    }
    return value;
  };

  const getStaticObstacleSnapSegments = () => levelState.obstacles
    .filter((obstacle) => obstacle.type === "static" && obstacle.solidForCapture)
    .flatMap((obstacle) => {
      if (obstacle.w !== undefined && obstacle.h !== undefined) {
        return [
          { orientation: "vertical", x: obstacle.x, y1: obstacle.y, y2: obstacle.y + obstacle.h },
          { orientation: "vertical", x: obstacle.x + obstacle.w, y1: obstacle.y, y2: obstacle.y + obstacle.h },
          { orientation: "horizontal", y: obstacle.y, x1: obstacle.x, x2: obstacle.x + obstacle.w },
          { orientation: "horizontal", y: obstacle.y + obstacle.h, x1: obstacle.x, x2: obstacle.x + obstacle.w }
        ];
      }
      return [getObstacleCurrentSegment(obstacle)];
    });

  const getSnapTargetsForLine = (line, rect = line.rect || line.sourceRect || levelState.activeRect) => {
    const targets = line.orientation === "vertical"
      ? [rect?.y, rect ? rect.y + rect.h : null]
      : [rect?.x, rect ? rect.x + rect.w : null];
    const addTarget = (value) => {
      if (Number.isFinite(value)) {
        targets.push(value);
      }
    };

    levelState.walls.forEach((wall) => {
      if (line.orientation === "vertical" && wall.orientation === "horizontal" && line.x >= wall.x1 - LINE_COLLISION_TOLERANCE && line.x <= wall.x2 + LINE_COLLISION_TOLERANCE) {
        addTarget(wall.y);
      } else if (line.orientation === "horizontal" && wall.orientation === "vertical" && line.y >= wall.y1 - LINE_COLLISION_TOLERANCE && line.y <= wall.y2 + LINE_COLLISION_TOLERANCE) {
        addTarget(wall.x);
      }
    });

    getStaticObstacleSnapSegments().forEach((segment) => {
      if (line.orientation === "vertical" && segment.orientation === "horizontal" && line.x >= segment.x1 - LINE_COLLISION_TOLERANCE && line.x <= segment.x2 + LINE_COLLISION_TOLERANCE) {
        addTarget(segment.y);
      } else if (line.orientation === "horizontal" && segment.orientation === "vertical" && line.y >= segment.y1 - LINE_COLLISION_TOLERANCE && line.y <= segment.y2 + LINE_COLLISION_TOLERANCE) {
        addTarget(segment.x);
      }
    });

    return targets.filter(Number.isFinite);
  };

  const snapLineToBlockers = (line, rect = line.rect || line.sourceRect || levelState.activeRect) => {
    const targets = getSnapTargetsForLine(line, rect);
    if (line.orientation === "vertical") {
      return {
        ...line,
        y1: snapValue(line.y1, targets),
        y2: snapValue(line.y2, targets)
      };
    }
    return {
      ...line,
      x1: snapValue(line.x1, targets),
      x2: snapValue(line.x2, targets)
    };
  };

  const normalizeCompletedLine = (line, rect = line?.rect || line?.sourceRect || levelState.activeRect) => {
    if (!line || !rect) {
      return null;
    }

    const snapped = snapLineToBlockers(line, rect);
    if (snapped.orientation === "vertical") {
      const y1 = snapValue(Math.min(snapped.y1, snapped.y2), [rect.y, rect.y + rect.h]);
      const y2 = snapValue(Math.max(snapped.y1, snapped.y2), [rect.y, rect.y + rect.h]);
      const x = snapValue(snapped.x, [rect.x, rect.x + rect.w]);
      if (Math.abs(y2 - y1) < MIN_ACTIVE_AREA_SIZE) {
        return null;
      }
      return { ...snapped, x, y1, y2 };
    }

    const x1 = snapValue(Math.min(snapped.x1, snapped.x2), [rect.x, rect.x + rect.w]);
    const x2 = snapValue(Math.max(snapped.x1, snapped.x2), [rect.x, rect.x + rect.w]);
    const y = snapValue(snapped.y, [rect.y, rect.y + rect.h]);
    if (Math.abs(x2 - x1) < MIN_ACTIVE_AREA_SIZE) {
      return null;
    }
    return { ...snapped, y, x1, x2 };
  };

  const getObstacleCurrentSegment = (obstacle) => {
    if (!obstacle) {
      return null;
    }

    if (obstacle.w !== undefined && obstacle.h !== undefined) {
      return {
        orientation: "rect",
        x: obstacle.x,
        y: obstacle.y,
        w: obstacle.w,
        h: obstacle.h
      };
    }

    return obstacle.orientation === "vertical"
      ? { orientation: "vertical", x: obstacle.x, y1: obstacle.y1, y2: obstacle.y2 }
      : { orientation: "horizontal", y: obstacle.y, x1: obstacle.x1, x2: obstacle.x2 };
  };

  const getLineBlockers = (rect = levelState.activeRect) => {
    if (!rect) {
      return [];
    }

    return [
      { kind: "frame", orientation: "horizontal", y: rect.y, x1: rect.x, x2: rect.x + rect.w },
      { kind: "frame", orientation: "horizontal", y: rect.y + rect.h, x1: rect.x, x2: rect.x + rect.w },
      { kind: "frame", orientation: "vertical", x: rect.x, y1: rect.y, y2: rect.y + rect.h },
      { kind: "frame", orientation: "vertical", x: rect.x + rect.w, y1: rect.y, y2: rect.y + rect.h },
      ...levelState.walls.map((wall) => ({ kind: "wall", wall, ...wall })),
      ...levelState.obstacles
        .filter((obstacle) => obstacle.blocksLine !== false)
        .map((obstacle) => ({ kind: "obstacle", obstacle, ...getObstacleCurrentSegment(obstacle) })),
      ...levelState.balls.map((ball) => ({ kind: "ball", ball, x: ball.x, y: ball.y, r: ball.r }))
    ];
  };

  const classifyLineHit = (hit) => {
    if (!hit) {
      return null;
    }

    let type = "VALID_ANCHOR";
    if (hit.kind === "ball") {
      type = "DANGER_HIT";
    } else if (hit.kind === "obstacle") {
      const obstacle = hit.object || hit.obstacle;
      if (obstacle.dangerForLine) {
        type = "DANGER_HIT";
      } else if (obstacle.type === "moving" || obstacle.solidForCapture === false) {
        type = "TEMP_BLOCKER";
      } else if (obstacle.solidForCapture && obstacle.safe) {
        type = "VALID_ANCHOR";
      } else {
        type = "DANGER_HIT";
      }
    }

    return {
      ...hit,
      type,
      blockerType: type,
      object: hit.object || hit.obstacle || hit.wall || hit.ball || null,
      isValidAnchor: type === "VALID_ANCHOR",
      isDanger: type === "DANGER_HIT",
      isTemporaryBlocker: type === "TEMP_BLOCKER"
    };
  };

  const makeRayHit = (point, orientation, direction, blocker, coordinate) => {
    const delta = orientation === "vertical" ? coordinate - point.y : coordinate - point.x;
    if (delta * direction <= 0) {
      return null;
    }
    const distance = orientation === "vertical"
      ? Math.abs(delta)
      : Math.abs(delta);
    if (distance < 0.5) {
      return null;
    }

    return classifyLineHit({
      x: orientation === "vertical" ? point.x : coordinate,
      y: orientation === "vertical" ? coordinate : point.y,
      distance,
      direction,
      kind: blocker.kind,
      object: blocker.obstacle || blocker.wall || blocker.ball || blocker
    });
  };

  const castLineRay = (point, orientation, direction, blockers) => {
    let nearest = null;

    const consider = (blocker, coordinate) => {
      const hit = makeRayHit(point, orientation, direction, blocker, coordinate);
      if (!hit) {
        return;
      }
      if (!nearest || hit.distance < nearest.distance) {
        nearest = hit;
      }
    };

    blockers.forEach((blocker) => {
      const pad = blocker.kind === "frame"
        ? 0
        : blocker.kind === "obstacle"
          ? Math.max(LINE_COLLISION_TOLERANCE, (blocker.object?.thickness || blocker.obstacle?.thickness || OBSTACLE_THICKNESS) * 0.5)
          : LINE_COLLISION_TOLERANCE;
      if (orientation === "vertical") {
        if (blocker.kind === "ball") {
          if (Math.abs(point.x - blocker.x) <= blocker.r) {
            consider(blocker, blocker.y - direction * blocker.r);
          }
          return;
        }
        if (blocker.orientation === "rect") {
          if (point.x >= blocker.x - pad && point.x <= blocker.x + blocker.w + pad) {
            consider(blocker, direction < 0 ? blocker.y + blocker.h + pad : blocker.y - pad);
          }
          return;
        }
        if (blocker.orientation === "horizontal" && point.x >= blocker.x1 - pad && point.x <= blocker.x2 + pad) {
          consider(blocker, blocker.kind === "wall" || blocker.kind === "frame"
            ? blocker.y
            : blocker.y + (direction < 0 ? pad : -pad));
        }
        return;
      }

      if (blocker.kind === "ball") {
        if (Math.abs(point.y - blocker.y) <= blocker.r) {
          consider(blocker, blocker.x - direction * blocker.r);
        }
        return;
      }
      if (blocker.orientation === "rect") {
        if (point.y >= blocker.y - pad && point.y <= blocker.y + blocker.h + pad) {
          consider(blocker, direction < 0 ? blocker.x + blocker.w + pad : blocker.x - pad);
        }
        return;
      }
      if (blocker.orientation === "vertical" && point.y >= blocker.y1 - pad && point.y <= blocker.y2 + pad) {
        consider(blocker, blocker.kind === "wall" || blocker.kind === "frame"
          ? blocker.x
          : blocker.x + (direction < 0 ? pad : -pad));
      }
    });

    return nearest;
  };

  const pointHitsWall = (point) => levelState.walls.some((wall) => {
    const pad = LINE_COLLISION_TOLERANCE;
    return wall.orientation === "vertical"
      ? Math.abs(point.x - wall.x) <= pad && point.y >= wall.y1 - pad && point.y <= wall.y2 + pad
      : Math.abs(point.y - wall.y) <= pad && point.x >= wall.x1 - pad && point.x <= wall.x2 + pad;
  });

  const pointHitsBall = (point) => levelState.balls.some((ball) => {
    const dx = point.x - ball.x;
    const dy = point.y - ball.y;
    return (dx * dx) + (dy * dy) <= (ball.r + 3) ** 2;
  });

  const pointHitsLineBlocker = (point) => {
    const activeArea = getActiveAreaAtPoint(point);
    if (!point || !levelState.rect || !pointInRect(point, levelState.rect) || !activeArea || pointInCapturedRect(point)) {
      return true;
    }
    if (pointHitsWall(point) || pointHitsBall(point)) {
      return true;
    }
    return levelState.obstacles.some((obstacle) => {
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
  };

  const getLineCastResult = (point, orientation, rect = getPointerActiveRect(point)) => {
    if (!point || !rect || !pointInRect(point, rect) || pointHitsLineBlocker(point)) {
      return {
        orientation,
        startPoint: point,
        negativeHit: null,
        positiveHit: null,
        canBuild: false,
        failReason: "invalid-start",
        previewSegment: null,
        rect
      };
    }

    const blockers = getLineBlockers(rect);
    const negativeHit = castLineRay(point, orientation, -1, blockers);
    const positiveHit = castLineRay(point, orientation, 1, blockers);
    const canBuild = Boolean(negativeHit?.isValidAnchor && positiveHit?.isValidAnchor);
    const failReason = canBuild
      ? null
      : (negativeHit?.isDanger || positiveHit?.isDanger)
        ? "danger"
        : (negativeHit?.isTemporaryBlocker || positiveHit?.isTemporaryBlocker)
          ? "temporary-blocker"
          : "invalid-start";
    const previewSegment = orientation === "vertical" && negativeHit && positiveHit
      ? { x: point.x, y1: negativeHit.y, y2: positiveHit.y }
      : orientation === "horizontal" && negativeHit && positiveHit
        ? { y: point.y, x1: negativeHit.x, x2: positiveHit.x }
        : null;

    return {
      orientation,
      startPoint: point,
      negativeHit,
      positiveHit,
      canBuild,
      failReason,
      previewSegment,
      rect
    };
  };

  const canStartLineFromCast = (castResult) => Boolean(castResult?.canBuild);

  const lineHitsObstacle = (line, obstacle) => {
    const pad = Math.max(LINE_COLLISION_TOLERANCE, (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5);
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

  const sameRect = (a, b) => Boolean(a && b
    && Math.abs(a.x - b.x) < 0.5
    && Math.abs(a.y - b.y) < 0.5
    && Math.abs(a.w - b.w) < 0.5
    && Math.abs(a.h - b.h) < 0.5);

  const isPlayableRect = (rect) => rect.w >= MIN_ACTIVE_AREA_SIZE && rect.h >= MIN_ACTIVE_AREA_SIZE;

  const mergeConnectedWalls = (walls) => {
    const merged = [];
    walls.forEach((wall) => {
      const normalized = normalizeCompletedLine(wall, levelState.rect) || wall;
      const existing = merged.find((candidate) => {
        if (candidate.orientation !== normalized.orientation) {
          return false;
        }
        return normalized.orientation === "vertical"
          ? Math.abs(candidate.x - normalized.x) <= WALL_SNAP_EPSILON && Math.max(candidate.y1, normalized.y1) <= Math.min(candidate.y2, normalized.y2) + WALL_SNAP_EPSILON
          : Math.abs(candidate.y - normalized.y) <= WALL_SNAP_EPSILON && Math.max(candidate.x1, normalized.x1) <= Math.min(candidate.x2, normalized.x2) + WALL_SNAP_EPSILON;
      });

      if (!existing) {
        merged.push({ ...normalized });
        return;
      }

      if (existing.orientation === "vertical") {
        existing.x = snapValue(existing.x, [normalized.x]);
        existing.y1 = Math.min(existing.y1, normalized.y1);
        existing.y2 = Math.max(existing.y2, normalized.y2);
      } else {
        existing.y = snapValue(existing.y, [normalized.y]);
        existing.x1 = Math.min(existing.x1, normalized.x1);
        existing.x2 = Math.max(existing.x2, normalized.x2);
      }
    });
    return merged;
  };

  const removeTinyGaps = (walls) => mergeConnectedWalls(walls);

  const getCaptureObstacles = () => levelState.obstacles.filter((obstacle) => (
    obstacle.type === "static" && obstacle.solidForCapture
  ));

  const CAPTURE_FILL_CELL = 8;

  const segmentFromWall = (wall) => wall.orientation === "vertical"
    ? { orientation: "vertical", x: wall.x, y1: wall.y1, y2: wall.y2, pad: 2 }
    : { orientation: "horizontal", y: wall.y, x1: wall.x1, x2: wall.x2, pad: 2 };

  const getCaptureBoundarySegments = (completedLine) => {
    const segments = levelState.walls.map(segmentFromWall);
    if (completedLine && !levelState.walls.includes(completedLine)) {
      segments.push(segmentFromWall(completedLine));
    }

    getCaptureObstacles().forEach((obstacle) => {
      const pad = (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5;
      if (obstacle.w !== undefined && obstacle.h !== undefined) {
        segments.push({ orientation: "vertical", x: obstacle.x - pad, y1: obstacle.y - pad, y2: obstacle.y + obstacle.h + pad, pad: 1 });
        segments.push({ orientation: "vertical", x: obstacle.x + obstacle.w + pad, y1: obstacle.y - pad, y2: obstacle.y + obstacle.h + pad, pad: 1 });
        segments.push({ orientation: "horizontal", y: obstacle.y - pad, x1: obstacle.x - pad, x2: obstacle.x + obstacle.w + pad, pad: 1 });
        segments.push({ orientation: "horizontal", y: obstacle.y + obstacle.h + pad, x1: obstacle.x - pad, x2: obstacle.x + obstacle.w + pad, pad: 1 });
        return;
      }
      if (obstacle.orientation === "vertical") {
        segments.push({ orientation: "vertical", x: obstacle.x, y1: obstacle.y1 - pad, y2: obstacle.y2 + pad, pad });
      } else {
        segments.push({ orientation: "horizontal", y: obstacle.y, x1: obstacle.x1 - pad, x2: obstacle.x2 + pad, pad });
      }
    });

    return segments;
  };

  const isInsideStaticCaptureObstacle = (point) => getCaptureObstacles().some((obstacle) => {
    const pad = (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5;
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

  const isCaptureBoundary = (point, sourceRect, completedLine) => {
    if (!pointInRect(point, sourceRect) || pointInCapturedRect(point) || isInsideStaticCaptureObstacle(point)) {
      return true;
    }

    return getCaptureBoundarySegments(completedLine).some((segment) => {
      const pad = segment.pad ?? 2;
      return segment.orientation === "vertical"
        ? Math.abs(point.x - segment.x) <= pad && point.y >= segment.y1 - pad && point.y <= segment.y2 + pad
        : Math.abs(point.y - segment.y) <= pad && point.x >= segment.x1 - pad && point.x <= segment.x2 + pad;
    });
  };

  const crossesCaptureBoundary = (from, to, completedLine) => {
    const minX = Math.min(from.x, to.x);
    const maxX = Math.max(from.x, to.x);
    const minY = Math.min(from.y, to.y);
    const maxY = Math.max(from.y, to.y);

    return getCaptureBoundarySegments(completedLine).some((segment) => {
      const pad = segment.pad ?? 2;
      if (from.y === to.y && segment.orientation === "vertical") {
        return segment.x >= minX - pad
          && segment.x <= maxX + pad
          && from.y >= segment.y1 - pad
          && from.y <= segment.y2 + pad;
      }
      if (from.x === to.x && segment.orientation === "horizontal") {
        return segment.y >= minY - pad
          && segment.y <= maxY + pad
          && from.x >= segment.x1 - pad
          && from.x <= segment.x2 + pad;
      }
      return false;
    });
  };

  const getSeedsBesideLine = (completedLine) => {
    const offset = Math.max(CAPTURE_FILL_CELL * 0.75, LINE_COLLISION_TOLERANCE + 2);
    if (completedLine.orientation === "vertical") {
      const y = (completedLine.y1 + completedLine.y2) * 0.5;
      return [
        { side: "left", x: completedLine.x - offset, y },
        { side: "right", x: completedLine.x + offset, y }
      ];
    }

    const x = (completedLine.x1 + completedLine.x2) * 0.5;
    return [
      { side: "top", x, y: completedLine.y - offset },
      { side: "bottom", x, y: completedLine.y + offset }
    ];
  };

  const floodRunRectsFromCells = (cells, sourceRect, cellSize) => {
    if (!cells.size) {
      return [];
    }

    const rows = new Map();
    cells.forEach((key) => {
      const [cx, cy] = key.split(":").map(Number);
      if (!rows.has(cy)) {
        rows.set(cy, []);
      }
      rows.get(cy).push(cx);
    });

    const rects = [];
    rows.forEach((columns, cy) => {
      columns.sort((a, b) => a - b);
      let start = columns[0];
      let previous = columns[0];
      const pushRun = () => {
        const x = sourceRect.x + start * cellSize;
        const y = sourceRect.y + cy * cellSize;
        const x2 = Math.min(sourceRect.x + sourceRect.w, sourceRect.x + (previous + 1) * cellSize);
        const y2 = Math.min(sourceRect.y + sourceRect.h, y + cellSize);
        rects.push({ x, y, w: x2 - x, h: y2 - y });
      };
      for (let index = 1; index < columns.length; index += 1) {
        const column = columns[index];
        if (column === previous + 1) {
          previous = column;
        } else {
          pushRun();
          start = column;
          previous = column;
        }
      }
      pushRun();
    });

    return rects.filter((rect) => rect.w > 0 && rect.h > 0);
  };

  const floodRectsFromCells = (cells, sourceRect, cellSize) => {
    if (!cells.size) {
      return [];
    }

    let minColumn = Infinity;
    let maxColumn = -Infinity;
    let minRow = Infinity;
    let maxRow = -Infinity;
    cells.forEach((key) => {
      const [cx, cy] = key.split(":").map(Number);
      minColumn = Math.min(minColumn, cx);
      maxColumn = Math.max(maxColumn, cx);
      minRow = Math.min(minRow, cy);
      maxRow = Math.max(maxRow, cy);
    });

    const x = sourceRect.x + minColumn * cellSize;
    const y = sourceRect.y + minRow * cellSize;
    const x2 = Math.min(sourceRect.x + sourceRect.w, sourceRect.x + (maxColumn + 1) * cellSize);
    const y2 = Math.min(sourceRect.y + sourceRect.h, sourceRect.y + (maxRow + 1) * cellSize);
    const rect = { x, y, w: x2 - x, h: y2 - y };
    return isPlayableRect(rect) ? [rect] : [];
  };

  const floodFillFromSeed = (seed, { sourceRect, completedLine, blockedCells = new Set() }) => {
    const cellSize = CAPTURE_FILL_CELL;
    const columns = Math.ceil(sourceRect.w / cellSize);
    const rows = Math.ceil(sourceRect.h / cellSize);
    const toCell = (point) => ({
      cx: Math.max(0, Math.min(columns - 1, Math.floor((point.x - sourceRect.x) / cellSize))),
      cy: Math.max(0, Math.min(rows - 1, Math.floor((point.y - sourceRect.y) / cellSize)))
    });
    const cellCenter = (cx, cy) => ({
      x: Math.min(sourceRect.x + sourceRect.w - 0.5, sourceRect.x + cx * cellSize + cellSize * 0.5),
      y: Math.min(sourceRect.y + sourceRect.h - 0.5, sourceRect.y + cy * cellSize + cellSize * 0.5)
    });
    const start = toCell(seed);
    const startKey = `${start.cx}:${start.cy}`;
    if (blockedCells.has(startKey) || isCaptureBoundary(cellCenter(start.cx, start.cy), sourceRect, completedLine)) {
      return { side: seed.side, cells: new Set(), cellSize, sourceRect, fillRects: [], rects: [] };
    }

    const cells = new Set();
    const queue = [start];
    cells.add(startKey);
    blockedCells.add(startKey);

    while (queue.length) {
      const current = queue.shift();
      const from = cellCenter(current.cx, current.cy);
      [
        { cx: current.cx - 1, cy: current.cy },
        { cx: current.cx + 1, cy: current.cy },
        { cx: current.cx, cy: current.cy - 1 },
        { cx: current.cx, cy: current.cy + 1 }
      ].forEach((next) => {
        if (next.cx < 0 || next.cx >= columns || next.cy < 0 || next.cy >= rows) {
          return;
        }
        const key = `${next.cx}:${next.cy}`;
        const to = cellCenter(next.cx, next.cy);
        if (cells.has(key) || blockedCells.has(key) || isCaptureBoundary(to, sourceRect, completedLine) || crossesCaptureBoundary(from, to, completedLine)) {
          return;
        }
        cells.add(key);
        blockedCells.add(key);
        queue.push(next);
      });
    }

    return {
      side: seed.side,
      cells,
      cellSize,
      sourceRect,
      fillRects: floodRunRectsFromCells(cells, sourceRect, cellSize),
      rects: floodRectsFromCells(cells, sourceRect, cellSize)
    };
  };

  const getAreaBalls = (area) => {
    if (!area) {
      return [];
    }

    return levelState.balls
      .map((ball, index) => ({ ball, index }))
      .filter(({ ball }) => {
        if (area.cells?.size && area.cellSize && area.sourceRect) {
          if (!pointInRect(ball, area.sourceRect)) {
            return false;
          }
          const cx = Math.max(0, Math.floor((ball.x - area.sourceRect.x) / area.cellSize));
          const cy = Math.max(0, Math.floor((ball.y - area.sourceRect.y) / area.cellSize));
          return area.cells.has(`${cx}:${cy}`);
        }

        const rects = area.fillRects?.length ? area.fillRects : area.rects;
        return rects.some((rect) => pointInRect(ball, rect));
      });
  };

  const areaContainsBall = (area) => getAreaBalls(area).length > 0;

  const getAreaSize = (area) => area.cells?.size
    ? area.cells.size * (area.cellSize || CAPTURE_FILL_CELL) ** 2
    : area.rects.reduce((sum, rect) => sum + rectArea(rect), 0);

  const isAreaLargeEnoughToCapture = (area) => (
    (area.cells?.size || 0) >= MIN_CAPTURE_CELLS
    && getAreaSize(area) >= Math.max(1, rectArea(area.sourceRect || levelState.rect) * MIN_CAPTURE_AREA_RATIO)
  );

  const buildCompletedLineFromCast = (castResult) => {
    if (!castResult?.previewSegment || !castResult.rect) {
      return null;
    }

    const line = castResult.orientation === "vertical"
      ? {
        orientation: "vertical",
        x: castResult.previewSegment.x,
        y1: castResult.previewSegment.y1,
        y2: castResult.previewSegment.y2,
        sourceArea: castResult.rect,
        sourceRect: castResult.rect,
        rect: castResult.rect
      }
      : {
        orientation: "horizontal",
        y: castResult.previewSegment.y,
        x1: castResult.previewSegment.x1,
        x2: castResult.previewSegment.x2,
        sourceArea: castResult.rect,
        sourceRect: castResult.rect,
        rect: castResult.rect
      };
    return normalizeCompletedLine(line, castResult.rect);
  };

  const isLineRedundant = (line) => {
    if (!line) {
      return true;
    }

    const length = line.orientation === "vertical"
      ? Math.abs(line.y2 - line.y1)
      : Math.abs(line.x2 - line.x1);
    if (length < Math.max(BALL_RADIUS * 2, CAPTURE_FILL_CELL * 3)) {
      return true;
    }

    const overlapsParallel = (segment) => {
      if (line.orientation !== segment.orientation) {
        return false;
      }
      const pad = segment.pad ?? LINE_COLLISION_TOLERANCE;
      return line.orientation === "vertical"
        ? Math.abs(line.x - segment.x) <= pad && Math.max(line.y1, segment.y1) < Math.min(line.y2, segment.y2)
        : Math.abs(line.y - segment.y) <= pad && Math.max(line.x1, segment.x1) < Math.min(line.x2, segment.x2);
    };

    const wallSegments = levelState.walls
      .filter((wall) => wall !== line)
      .map(segmentFromWall);
    const obstacleSegments = [];
    getCaptureObstacles().forEach((obstacle) => {
      const pad = Math.max(LINE_COLLISION_TOLERANCE, (obstacle.thickness || OBSTACLE_THICKNESS) * 0.5);
      if (obstacle.w !== undefined && obstacle.h !== undefined) {
        obstacleSegments.push({ orientation: "vertical", x: obstacle.x - pad, y1: obstacle.y - pad, y2: obstacle.y + obstacle.h + pad, pad });
        obstacleSegments.push({ orientation: "vertical", x: obstacle.x + obstacle.w + pad, y1: obstacle.y - pad, y2: obstacle.y + obstacle.h + pad, pad });
        obstacleSegments.push({ orientation: "horizontal", y: obstacle.y - pad, x1: obstacle.x - pad, x2: obstacle.x + obstacle.w + pad, pad });
        obstacleSegments.push({ orientation: "horizontal", y: obstacle.y + obstacle.h + pad, x1: obstacle.x - pad, x2: obstacle.x + obstacle.w + pad, pad });
        return;
      }
      obstacleSegments.push(obstacle.orientation === "vertical"
        ? { orientation: "vertical", x: obstacle.x, y1: obstacle.y1 - pad, y2: obstacle.y2 + pad, pad }
        : { orientation: "horizontal", y: obstacle.y, x1: obstacle.x1 - pad, x2: obstacle.x2 + pad, pad });
    });

    return [...wallSegments, ...obstacleSegments].some(overlapsParallel);
  };

  const getPotentialSplitResultFromCompletedLine = (completedLine) => {
    const sourceRect = completedLine?.sourceArea || completedLine?.sourceRect || completedLine?.rect || levelState.activeRect;
    if (!completedLine || !sourceRect || isLineRedundant(completedLine)) {
      return {
        canSplit: false,
        canKeepLine: false,
        canCapture: false,
        capturableSide: null,
        capturableArea: 0,
        sourceRect,
        completedLine,
        areas: [],
        capturableAreas: [],
        activeAreas: [],
        separatedBalls: false,
        reason: "redundant-line"
      };
    }

    const blockedCells = new Set();
    const areas = getSeedsBesideLine(completedLine)
      .filter((seed) => pointInRect(seed, sourceRect))
      .map((seed) => floodFillFromSeed(seed, { sourceRect, completedLine, blockedCells }))
      .filter((area) => area.rects.length);
    const areasWithBalls = areas.map((area) => ({
      ...area,
      balls: getAreaBalls(area)
    }));
    const tooSmall = areasWithBalls.length > 0 && areasWithBalls.some((area) => !isAreaLargeEnoughToCapture(area));
    const capturableAreas = areasWithBalls.filter((area) => area.balls.length === 0 && isAreaLargeEnoughToCapture(area));
    const activeAreas = areasWithBalls.filter((area) => area.balls.length > 0 && isAreaLargeEnoughToCapture(area));
    const separatedBalls = activeAreas.filter((area) => area.balls.length > 0).length >= 2;
    const canSplit = areasWithBalls.length >= 2 && !tooSmall;
    const canKeepLine = canSplit && (capturableAreas.length > 0 || separatedBalls);

    if (!canSplit) {
      return {
        canSplit: false,
        canKeepLine: false,
        canCapture: false,
        capturableSide: null,
        capturableArea: 0,
        sourceRect,
        completedLine,
        areas: areasWithBalls,
        capturableAreas,
        activeAreas,
        separatedBalls,
        reason: tooSmall ? "too-small" : "no-split"
      };
    }

    return {
      canSplit: true,
      canKeepLine,
      canCapture: capturableAreas.length > 0,
      capturableSide: capturableAreas[0]?.side || null,
      capturableArea: capturableAreas[0] ? getAreaSize(capturableAreas[0]) : 0,
      sourceRect,
      completedLine,
      areas: areasWithBalls,
      capturableAreas,
      activeAreas,
      separatedBalls,
      reason: canKeepLine
        ? (capturableAreas.length > 0 ? "captured-area" : "split-balls")
        : "no-value"
    };
  };

  const getPotentialSplitResultFromCast = (castResult) => (
    getPotentialSplitResultFromCompletedLine(buildCompletedLineFromCast(castResult))
  );

  const getPotentialCaptureResultFromCompletedLine = getPotentialSplitResultFromCompletedLine;

  const getPotentialCaptureResult = getPotentialSplitResultFromCast;

  const handleInvalidSplitLine = (reason) => {
    if (reason === "no-value") {
      showLevelToast("Здесь линия не поможет");
      return;
    }

    const messages = {
      "redundant-line": "Слишком близко к стене",
      "too-small": "Слишком маленькая область",
      "invalid-seed": "Здесь линия не нужна",
      "no-split": "Здесь линия не нужна"
    };
    showLevelToast(messages[reason] || "Здесь линия не нужна");
  };

  const markAreaCaptured = (area) => {
    (area.fillRects?.length ? area.fillRects : area.rects).forEach((rect) => {
      levelState.capturedRects.push(rect);
      levelState.capturedArea += rectArea(rect);
    });
  };

  const applySplitResult = (splitResult) => {
    const sourceRect = splitResult.sourceRect;
    if (!sourceRect) {
      return false;
    }

    const sourceIndex = levelState.activeRects.findIndex((active) => active === sourceRect || sameRect(active, sourceRect));
    const nextActiveRects = levelState.activeRects.filter((active, index) => (
      index !== sourceIndex && !sameRect(active, sourceRect)
    ));

    splitResult.activeAreas.forEach((area) => {
      if (areaContainsBall(area) && isAreaLargeEnoughToCapture(area)) {
        nextActiveRects.push(...area.rects);
      }
    });
    splitResult.capturableAreas.forEach(markAreaCaptured);

    levelState.activeRects = nextActiveRects;
    const completedLine = splitResult.completedLine;
    levelState.activeRect = levelState.activeRects.find((active) => pointInRect({
      x: completedLine.orientation === "vertical" ? completedLine.x : (completedLine.x1 + completedLine.x2) * 0.5,
      y: completedLine.orientation === "horizontal" ? completedLine.y : (completedLine.y1 + completedLine.y2) * 0.5
    }, active)) || levelState.activeRects[0] || null;
    return true;
  };

  const captureAreasFromCompletedLine = (completedLine, splitResult = getPotentialSplitResultFromCompletedLine(completedLine)) => {
    if (!splitResult.canKeepLine) {
      return false;
    }

    return applySplitResult(splitResult);
  };

  const splitActiveRect = (line) => {
    const rect = line.sourceArea || line.sourceRect || line.rect || levelState.activeRect;
    if (!rect) {
      return;
    }

    const completedLine = normalizeCompletedLine({
      ...buildCompletedWall(line, rect),
      sourceArea: rect,
      sourceRect: rect,
      rect
    }, rect);
    if (!completedLine) {
      handleInvalidSplitLine("no-split");
      return;
    }
    const finalSplitResult = getPotentialSplitResultFromCompletedLine(completedLine);
    if (!finalSplitResult.canKeepLine) {
      handleInvalidSplitLine(finalSplitResult.reason);
      return;
    }
    levelState.walls.push(completedLine);
    levelState.walls = removeTinyGaps(levelState.walls);
    markCanvasCachesDirty({ background: false, staticLayer: true });
    captureAreasFromCompletedLine(completedLine, finalSplitResult);

    clampBallsToActiveRects();
    markCanvasCachesDirty({ background: false, staticLayer: true });
    syncLevelHud();

    if (getCaptureRatio() * 100 >= levelState.target) {
      finishJezzLevel();
    }
  };

  const failCurrentAttempt = async () => {
    if (levelState.failed || levelState.completed) {
      return;
    }

    levelState.failed = true;
    levelState.activeLine = null;
    levelState.gestureStartPoint = null;
    levelState.gestureCurrentPoint = null;
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = null;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    stopJezzLevel();
    syncLevelHud();

    const shouldRetry = await showConfirm({
      title: t("levelFailedTitle"),
      message: t("lineHitFailure"),
      acceptText: t("play"),
      cancelText: t("toChapters")
    });

    if (shouldRetry) {
      await openLevel(state.selectedLevel, { skipReplayConfirm: true });
      return;
    }

    openChapter(state.currentChapter);
  };

  const handleLinePenalty = () => {
    if (levelState.failed || levelState.completed) {
      return false;
    }

    levelState.activeLine = null;
    levelState.penalties = Math.min(MAX_PENALTIES, levelState.penalties + 1);
    syncLevelHud();
    showLevelToast(t("penaltyProgress", { count: levelState.penalties, max: MAX_PENALTIES }));

    if (levelState.penalties >= MAX_PENALTIES) {
      void failCurrentAttempt();
      return true;
    }

    return false;
  };

  const cancelActiveLine = (penalize = false) => {
    levelState.activeLine = null;
    if (penalize) {
      handleLinePenalty();
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

  const activeLineHitBall = (line, ball, previous = ball) => {
    if (!line || !ball || !previous) {
      return false;
    }

    const pad = ball.r + LINE_COLLISION_TOLERANCE;
    if (line.orientation === "vertical") {
      const minY = Math.min(line.endA, line.endB) - pad;
      const maxY = Math.max(line.endA, line.endB) + pad;
      const crossed = (previous.x - line.x) * (ball.x - line.x) <= 0
        || Math.abs(ball.x - line.x) <= pad
        || Math.abs(previous.x - line.x) <= pad;
      const pathMinY = Math.min(previous.y, ball.y);
      const pathMaxY = Math.max(previous.y, ball.y);
      return crossed && pathMaxY >= minY && pathMinY <= maxY;
    }

    const minX = Math.min(line.endA, line.endB) - pad;
    const maxX = Math.max(line.endA, line.endB) + pad;
    const crossed = (previous.y - line.y) * (ball.y - line.y) <= 0
      || Math.abs(ball.y - line.y) <= pad
      || Math.abs(previous.y - line.y) <= pad;
    const pathMinX = Math.min(previous.x, ball.x);
    const pathMaxX = Math.max(previous.x, ball.x);
    return crossed && pathMaxX >= minX && pathMinX <= maxX;
  };

  const getActiveLineCollision = () => {
    const line = levelState.activeLine;
    if (!line) {
      return null;
    }
    if (lineHitBall(line)) {
      return "ball";
    }
    return levelState.obstacles.some((obstacle) => (
      obstacle.dangerForLine && lineHitsObstacle(line, obstacle)
    )) ? "danger" : null;
  };

  const recalculateCapturedAreas = (line) => {
    splitActiveRect(line);
  };

  const completeActiveLine = (line) => {
    if (!line?.negativeHit?.isValidAnchor || !line?.positiveHit?.isValidAnchor) {
      cancelActiveLine(Boolean(line?.negativeHit?.isDanger || line?.positiveHit?.isDanger));
      return;
    }
    levelState.activeLine = null;
    recalculateCapturedAreas(line);
  };

  const updateActiveLine = (dt) => {
    const line = levelState.activeLine;
    const rect = line?.rect || levelState.activeRect;
    if (!line || !rect) {
      return;
    }

    const grow = LINE_GROW_SPEED * dt;
    if (line.orientation === "vertical") {
      const boundA = line.boundA ?? rect.y;
      const boundB = line.boundB ?? rect.y + rect.h;
      line.endA = Math.max(boundA, line.endA - grow);
      line.endB = Math.min(boundB, line.endB + grow);
      line.done = line.endA <= boundA && line.endB >= boundB;
    } else {
      const boundA = line.boundA ?? rect.x;
      const boundB = line.boundB ?? rect.x + rect.w;
      line.endA = Math.max(boundA, line.endA - grow);
      line.endB = Math.min(boundB, line.endB + grow);
      line.done = line.endA <= boundA && line.endB >= boundB;
    }

    const collision = getActiveLineCollision();
    if (collision === "ball") {
      handleLinePenalty();
      return;
    }
    if (collision) {
      cancelActiveLine(true);
      return;
    }

    if (line.done) {
      completeActiveLine(line);
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

  const bounceBallOffWall = (ball, wall, previous) => {
    if (!ball || !wall || !previous) {
      return;
    }

    const pad = 3;
    if (wall.orientation === "vertical") {
      const minY = Math.min(previous.y, ball.y) - ball.r;
      const maxY = Math.max(previous.y, ball.y) + ball.r;
      if (maxY < wall.y1 - pad || minY > wall.y2 + pad) {
        return;
      }

      const crossedFromLeft = previous.x + ball.r <= wall.x && ball.x + ball.r >= wall.x;
      const crossedFromRight = previous.x - ball.r >= wall.x && ball.x - ball.r <= wall.x;
      const overlapping = Math.abs(ball.x - wall.x) <= ball.r + pad && ball.y >= wall.y1 - ball.r && ball.y <= wall.y2 + ball.r;
      if (!crossedFromLeft && !crossedFromRight && !overlapping) {
        return;
      }

      const side = crossedFromLeft ? -1 : crossedFromRight ? 1 : (previous.x < wall.x ? -1 : 1);
      ball.vx = Math.abs(ball.vx) * side;
      ball.x = wall.x + side * (ball.r + pad);
      return;
    }

    const minX = Math.min(previous.x, ball.x) - ball.r;
    const maxX = Math.max(previous.x, ball.x) + ball.r;
    if (maxX < wall.x1 - pad || minX > wall.x2 + pad) {
      return;
    }

    const crossedFromTop = previous.y + ball.r <= wall.y && ball.y + ball.r >= wall.y;
    const crossedFromBottom = previous.y - ball.r >= wall.y && ball.y - ball.r <= wall.y;
    const overlapping = Math.abs(ball.y - wall.y) <= ball.r + pad && ball.x >= wall.x1 - ball.r && ball.x <= wall.x2 + ball.r;
    if (!crossedFromTop && !crossedFromBottom && !overlapping) {
      return;
    }

    const side = crossedFromTop ? -1 : crossedFromBottom ? 1 : (previous.y < wall.y ? -1 : 1);
    ball.vy = Math.abs(ball.vy) * side;
    ball.y = wall.y + side * (ball.r + pad);
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

      const previous = { x: ball.x, y: ball.y };
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

      if (levelState.activeLine && activeLineHitBall(levelState.activeLine, ball, previous)) {
        handleLinePenalty();
        return;
      }

      levelState.walls.forEach((wall) => bounceBallOffWall(ball, wall, previous));
      levelState.obstacles.forEach((obstacle) => bounceBallOffObstacle(ball, obstacle));
      clampBallToRect(ball, rect);
    });
  };

  const drawGestureDirectionHint = (ctx) => {
    if (!levelState.gestureStartPoint || !levelState.gestureCurrentPoint || levelState.activeLine) {
      return;
    }

    const start = levelState.gestureStartPoint;
    const current = levelState.gestureCurrentPoint;
    const dx = current.x - start.x;
    const dy = current.y - start.y;
    const distance = Math.hypot(dx, dy);

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(126, 220, 255, 0.62)";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = distance < LINE_GESTURE_DEAD_ZONE
      ? "rgba(255, 255, 255, 0.78)"
      : "rgba(126, 220, 255, 0.9)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.arc(start.x, start.y, distance < LINE_GESTURE_DEAD_ZONE ? 6 : 4, 0, Math.PI * 2);
    ctx.stroke();

    if (distance >= LINE_GESTURE_DEAD_ZONE) {
      const orientation = levelState.gestureLockedOrientation
        || (Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical");
      const sign = orientation === "horizontal"
        ? (dx < 0 ? -1 : 1)
        : (dy < 0 ? -1 : 1);
      const length = Math.min(44, Math.max(28, distance * 0.55));
      const end = orientation === "horizontal"
        ? { x: start.x + sign * length, y: start.y }
        : { x: start.x, y: start.y + sign * length };
      const head = 9;
      const wing = 6;

      ctx.strokeStyle = "rgba(126, 220, 255, 0.92)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      if (orientation === "horizontal") {
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - sign * head, end.y - wing);
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - sign * head, end.y + wing);
      } else {
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - wing, end.y - sign * head);
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x + wing, end.y - sign * head);
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(180, 120, 255, 0.65)";
      ctx.beginPath();
      ctx.arc(start.x, start.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const createPerfOverlay = () => {
    if (!IS_PERF || perfState.overlay) {
      return perfState.overlay;
    }
    const overlay = document.createElement("div");
    overlay.className = "perf-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
    perfState.overlay = overlay;
    return overlay;
  };

  const updateLowPerformanceMode = (avgFps, now) => {
    if (lowPerformanceMode) {
      return;
    }
    if (avgFps > 0 && avgFps < 45) {
      perfState.lowFpsStartedAt ||= now;
      if (now - perfState.lowFpsStartedAt >= 3000) {
        lowPerformanceMode = true;
        root?.classList.add("is-low-performance");
        markCanvasCachesDirty();
        lastCanvasPixelWidth = 0;
        lastCanvasPixelHeight = 0;
        resizeJezzCanvas();
        if (!lowPerformanceToastShown) {
          lowPerformanceToastShown = true;
          showLevelToast("Включён режим производительности");
        }
      }
    } else if (avgFps >= 48) {
      perfState.lowFpsStartedAt = 0;
    }
  };

  const trackFramePerformance = (time, dt) => {
    const frameMs = Math.max(0, dt * 1000);
    perfState.frameTimes.push(frameMs);
    if (perfState.frameTimes.length > 60) {
      perfState.frameTimes.shift();
    }
    perfState.frameWindow.push(time);
    while (perfState.frameWindow.length && time - perfState.frameWindow[0] > 2000) {
      perfState.frameWindow.shift();
    }
    if (time - perfState.drawWindowStartedAt >= 1000) {
      perfState.drawRate = perfState.drawCount / ((time - perfState.drawWindowStartedAt) / 1000);
      perfState.drawCount = 0;
      perfState.drawWindowStartedAt = time;
    }
    const fps = perfState.frameWindow.length > 1
      ? ((perfState.frameWindow.length - 1) * 1000) / (perfState.frameWindow[perfState.frameWindow.length - 1] - perfState.frameWindow[0])
      : 0;
    updateLowPerformanceMode(fps, time);
    if (!IS_PERF || time - perfState.lastOverlayAt < 500) {
      return;
    }
    perfState.lastOverlayAt = time;
    const overlay = createPerfOverlay();
    const avgFrame = perfState.frameTimes.length
      ? perfState.frameTimes.reduce((sum, value) => sum + value, 0) / perfState.frameTimes.length
      : 0;
    const maxFrame = perfState.frameTimes.length ? Math.max(...perfState.frameTimes) : 0;
    overlay.textContent = [
      `FPS: ${fps.toFixed(1)}`,
      `avg frame: ${avgFrame.toFixed(1)} ms`,
      `max/60: ${maxFrame.toFixed(1)} ms`,
      `balls: ${levelState.balls.length}`,
      `walls: ${levelState.walls.length}`,
      `obstacles: ${levelState.obstacles.length}`,
      `canvas: ${lastCanvasPixelWidth}x${lastCanvasPixelHeight}`,
      `DPR: ${(window.devicePixelRatio || 1).toFixed(2)} / render ${lastCanvasPixelRatio.toFixed(2)}`,
      `draw/s: ${perfState.drawRate.toFixed(1)}`,
      `save/min: ${perfState.saveTimes.length}`,
      `low: ${lowPerformanceMode ? "on" : "off"}`
    ].join("\n");
  };

  const drawObstacle = (ctx, obstacle) => {
    ctx.save();
    const obstacleColor = obstacle.color || (obstacle.safe ? "rgba(173, 246, 255, 0.92)" : (obstacle.moving ? "#8d2454" : "#ff4e7a"));
    ctx.strokeStyle = obstacleColor;
    ctx.fillStyle = obstacleColor;
    ctx.lineWidth = obstacle.safe ? Math.max(4, (obstacle.thickness || OBSTACLE_THICKNESS) * 0.48) : (obstacle.thickness || OBSTACLE_THICKNESS);
    ctx.lineCap = "round";
    ctx.shadowColor = obstacle.safe ? "rgba(106, 235, 255, 0.48)" : "rgba(255, 78, 122, 0.56)";
    ctx.shadowBlur = lowPerformanceMode ? 0 : (obstacle.safe ? 5 : 8);
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
  };

  const requestDrawJezzLevel = () => {
    if (levelState.drawRequestId) {
      return;
    }
    levelState.drawRequestId = window.requestAnimationFrame(() => {
      levelState.drawRequestId = null;
      drawJezzLevel();
    });
  };

  const renderBackgroundCache = (width, height, rect) => {
    if (!backgroundCacheCanvas || !backgroundCacheDirty) {
      return;
    }
    const ctx = backgroundCacheCanvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    const boardGradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
    boardGradient.addColorStop(0, "rgba(13, 10, 48, 0.94)");
    boardGradient.addColorStop(0.5, "rgba(11, 16, 55, 0.96)");
    boardGradient.addColorStop(1, "rgba(28, 10, 68, 0.94)");
    ctx.fillStyle = boardGradient;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    if (!lowPerformanceMode) {
      ctx.fillStyle = "rgba(177, 160, 255, 0.28)";
      for (let x = rect.x + 16; x < rect.x + rect.w; x += 26) {
        for (let y = rect.y + 16; y < rect.y + rect.h; y += 26) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.strokeStyle = "rgba(190, 177, 255, 0.92)";
    ctx.lineWidth = 4;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    backgroundCacheDirty = false;
  };

  const renderStaticLayerCache = (width, height) => {
    if (!staticLayerCanvas || !staticLayerDirty) {
      return;
    }
    const ctx = staticLayerCanvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
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
    levelState.obstacles.filter((obstacle) => !obstacle.moving).forEach((obstacle) => drawObstacle(ctx, obstacle));
    staticLayerDirty = false;
  };

  const drawJezzLevel = () => {
    if (!jezzCanvas) {
      return;
    }

    perfState.drawCount += 1;
    const ctx = jezzCanvas.getContext("2d");
    const width = jezzCanvas.clientWidth;
    const height = jezzCanvas.clientHeight;
    const rect = levelState.rect;
    ctx.clearRect(0, 0, width, height);

    if (!rect) {
      return;
    }

    renderBackgroundCache(width, height, rect);
    renderStaticLayerCache(width, height);
    if (backgroundCacheCanvas) {
      ctx.drawImage(backgroundCacheCanvas, 0, 0, width, height);
    }
    if (staticLayerCanvas) {
      ctx.drawImage(staticLayerCanvas, 0, 0, width, height);
    }

    levelState.obstacles.filter((obstacle) => obstacle.moving).forEach((obstacle) => drawObstacle(ctx, obstacle));

    const line = levelState.activeLine;
    if (line) {
      ctx.save();
      if (lowPerformanceMode) {
        ctx.strokeStyle = "rgba(126, 247, 255, 0.96)";
      } else {
        const lineGradient = line.orientation === "vertical"
          ? ctx.createLinearGradient(line.x, line.endA, line.x, line.endB)
          : ctx.createLinearGradient(line.endA, line.y, line.endB, line.y);
        lineGradient.addColorStop(0, "rgba(126, 247, 255, 0.96)");
        lineGradient.addColorStop(0.5, "rgba(255, 246, 145, 0.98)");
        lineGradient.addColorStop(1, "rgba(255, 91, 218, 0.96)");
        ctx.strokeStyle = lineGradient;
        ctx.shadowColor = "rgba(255, 237, 132, 0.45)";
        ctx.shadowBlur = 7;
      }
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (line.orientation === "vertical") {
        ctx.moveTo(line.x, line.endA);
        ctx.lineTo(line.x, line.endB);
      } else {
        ctx.moveTo(line.endA, line.y);
        ctx.lineTo(line.endB, line.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    drawGestureDirectionHint(ctx);

    levelState.balls.forEach((ball) => {
      if (lowPerformanceMode) {
        ctx.fillStyle = "#78eaff";
      } else {
        const gradient = ctx.createRadialGradient(ball.x - 4, ball.y - 5, 2, ball.x, ball.y, ball.r + 4);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.28, "#9ff7ff");
        gradient.addColorStop(1, "#3f46ff");
        ctx.fillStyle = gradient;
      }
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
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
    const completion = applyLevelCompletionProgress(levelState.lastCompletion);
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
      rewardCoins.textContent = `+${completion.coins}`;
    }
    if (rewardLife) {
      rewardLife.textContent = completion.restoreLife ? "+1" : (completion.lifeFull ? t("livesFull") : "0");
    }
    if (rewardLifePrize) {
      rewardLifePrize.hidden = !(completion.restoreLife || completion.lifeFull);
    }
    if (rewardPrizes) {
      rewardPrizes.dataset.prizeCount = completion.restoreLife || completion.lifeFull ? "2" : "1";
    }
    if (rewardStars) {
      rewardStars.dataset.stars = String(stars);
      rewardStars.querySelectorAll("[data-star]").forEach((star) => {
        star.classList.toggle("is-earned", Number(star.dataset.star) <= stars);
      });
    }
    levelCompletePanel?.classList.add("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "false");
    activateModalFocus(levelCompletePanel, {
      initialFocus: completeNextButton,
      onEscape: () => completeSelectedLevel("chapters")
    });
    syncResources();
    saveProgressImmediate({ flushCloud: true });
  }

  const tickJezzLevel = (time) => {
    levelState.animationId = null;
    if (!levelState.running || !levelScreen.classList.contains("is-active") || modalFocusStack.length) {
      return;
    }

    const dt = Math.min(0.033, Math.max(0, (time - levelState.lastFrameAt) / 1000 || 0));
    levelState.lastFrameAt = time;
    levelState.elapsed += dt;
    levelState.obstacles.forEach((obstacle) => {
      if (obstacle.moving) {
        updateObstacleGeometry(obstacle, levelState.rect, levelState.elapsed);
      }
    });
    updateBalls(dt);
    updateActiveLine(dt);
    drawJezzLevel();
    trackFramePerformance(time, dt);
    if (levelState.running && !levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

  const stopJezzLevel = () => {
    levelState.running = false;
    updateGameplayMarker(false);
    window.clearTimeout(levelState.helperHintTimer);
    document.querySelector(".level-helper-panel")?.classList.remove("is-visible");
    if (levelState.animationId) {
      window.cancelAnimationFrame(levelState.animationId);
      levelState.animationId = null;
    }
    if (levelState.drawRequestId) {
      window.cancelAnimationFrame(levelState.drawRequestId);
      levelState.drawRequestId = null;
    }
  };

  const pauseJezzLevelForPlatform = () => {
    if (!levelState.running || levelState.completed || levelState.failed) {
      updateGameplayMarker(false);
      return;
    }

    yandexState.pausedByPlatform = true;
    levelState.running = false;
    updateGameplayMarker(false);
    if (levelState.animationId) {
      window.cancelAnimationFrame(levelState.animationId);
      levelState.animationId = null;
    }
  };

  const resumeJezzLevelFromPlatform = () => {
    if (!yandexState.pausedByPlatform || levelState.completed || levelState.failed || !levelScreen.classList.contains("is-active")) {
      yandexState.pausedByPlatform = false;
      return;
    }

    yandexState.pausedByPlatform = false;
    levelState.running = true;
    levelState.lastFrameAt = performance.now();
    updateGameplayMarker(true);
    if (!levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

  const showFullscreenAd = () => new Promise((resolve) => {
    if (!yandexState.sdk?.adv || typeof yandexState.sdk.adv.showFullscreenAdv !== "function") {
      resolve(false);
      return;
    }

    try {
      yandexState.sdk.adv.showFullscreenAdv({
        callbacks: {
          onOpen: pauseJezzLevelForPlatform,
          onClose: (wasShown) => {
            resumeJezzLevelFromPlatform();
            resolve(Boolean(wasShown));
          },
          onError: () => {
            resumeJezzLevelFromPlatform();
            resolve(false);
          }
        }
      });
    } catch (_error) {
      resumeJezzLevelFromPlatform();
      resolve(false);
    }
  });

  const maybeShowInterstitialAd = async () => {
    yandexState.completedSinceInterstitial += 1;

    const now = Date.now();
    if (
      yandexState.completedSinceInterstitial < INTERSTITIAL_LEVEL_INTERVAL
      || now - yandexState.lastInterstitialAt < INTERSTITIAL_MIN_INTERVAL_MS
    ) {
      return false;
    }

    const wasShown = await showFullscreenAd();
    if (wasShown) {
      yandexState.completedSinceInterstitial = 0;
      yandexState.lastInterstitialAt = now;
    }
    return wasShown;
  };

  const showRewardedLifeAd = () => new Promise((resolve) => {
    if (!yandexState.sdk?.adv || typeof yandexState.sdk.adv.showRewardedVideo !== "function") {
      resolve(false);
      return;
    }

    let rewarded = false;

    try {
      yandexState.sdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: pauseJezzLevelForPlatform,
          onRewarded: () => {
            rewarded = true;
          },
          onClose: () => {
            resumeJezzLevelFromPlatform();
            resolve(rewarded);
          },
          onError: () => {
            resumeJezzLevelFromPlatform();
            resolve(false);
          }
        }
      });
    } catch (_error) {
      resumeJezzLevelFromPlatform();
      resolve(false);
    }
  });

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
    const nextRect = getJezzPlayRect(size);

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
    markCanvasCachesDirty();
    levelState.capturedArea = levelState.capturedRects.reduce((sum, rect) => sum + rectArea(rect), 0);
    levelState.totalArea = rectArea(nextRect);
    levelState.activeLine = null;
    levelState.gestureStartPoint = null;
    levelState.gestureCurrentPoint = null;
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = null;
    levelState.draftPointer = null;

    const speedRatio = getSpeedValue(levelState.config.speed, nextRect) / getSpeedValue(levelState.config.speed, oldRect);
    levelState.balls.forEach((ball) => {
      const nextBall = mapPointBetweenRects(ball, oldRect, nextRect);
      ball.x = nextBall.x;
      ball.y = nextBall.y;
      ball.vx *= speedRatio;
      ball.vy *= speedRatio;
    });
    levelState.ball = levelState.balls[0] || null;

    syncLevelHud();
    requestDrawJezzLevel();
  };

  const startJezzLevel = () => {
    stopJezzLevel();
    const size = resizeJezzCanvas();
    const rect = getJezzPlayRect(size);
    const config = getLevelConfig(state.selectedLevel);
    const speed = getSpeedValue(config.speed, rect);
    levelState.running = true;
    updateGameplayMarker(true);
    levelState.completed = false;
    levelState.failed = false;
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
    levelState.lineOrientation = "vertical";
    syncLineOrientationButtons();
    levelState.gestureStartPoint = null;
    levelState.gestureCurrentPoint = null;
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = null;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    levelState.keyboardAimPoint = {
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2
    };
    levelState.lastCompletion = null;
    levelState.balls = BALL_STARTS.slice(0, config.balls).map((start) => ({
      x: rect.x + rect.w * start.x,
      y: rect.y + rect.h * start.y,
      vx: speed * start.vx,
      vy: speed * start.vy,
      r: BALL_RADIUS
    }));
    markCanvasCachesDirty();
    levelState.ball = levelState.balls[0] || null;
    levelCompletePanel?.classList.remove("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "true");
    deactivateModalFocus(levelCompletePanel);
    syncLevelHud();
    showLevelHelperHint();
    showObstacleLegendHint();
    syncResources();
    levelState.lastFrameAt = performance.now();
    if (!levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

  const beginLineFromPointer = (event) => {
    if (!levelState.running || levelState.completed || levelState.activeLine || !levelState.activeRect) {
      return;
    }

    const point = getCanvasPoint(event);
    const rect = getPointerActiveRect(point);
    if (!rect || pointHitsLineBlocker(point)) {
      return;
    }

    event.preventDefault();
    jezzCanvas.setPointerCapture?.(event.pointerId);
    levelState.gestureStartPoint = {
      x: point.x,
      y: point.y,
      rect,
      startedAt: performance.now()
    };
    levelState.gestureCurrentPoint = {
      x: point.x,
      y: point.y,
      rect
    };
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = event.pointerId;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    requestDrawJezzLevel();
  };

  const isTouchLikePointer = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      return true;
    }

    return event.pointerType === "mouse"
      && window.matchMedia?.("(pointer: coarse)").matches;
  };

  const syncKeyboardAim = (point = levelState.keyboardAimPoint) => {
    const fallbackRect = levelState.activeRect;
    const sourcePoint = point || (fallbackRect
      ? { x: fallbackRect.x + fallbackRect.w / 2, y: fallbackRect.y + fallbackRect.h / 2 }
      : null);
    const rect = sourcePoint ? getPointerActiveRect(sourcePoint) || fallbackRect : fallbackRect;
    if (!sourcePoint || !rect) {
      return null;
    }

    const nextPoint = clampPointToRect(sourcePoint, rect);
    levelState.keyboardAimPoint = nextPoint;
    levelState.aimPointer = {
      x: nextPoint.x,
      y: nextPoint.y,
      orientation: levelState.lineOrientation || "vertical",
      rect
    };
    requestDrawJezzLevel();
    return levelState.aimPointer;
  };

  const moveKeyboardAim = (dx, dy) => {
    const rect = levelState.activeRect;
    if (!rect) {
      return;
    }

    const current = levelState.keyboardAimPoint || {
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2
    };
    const step = Math.max(8, Math.min(rect.w, rect.h) * 0.045);
    syncKeyboardAim({
      x: current.x + dx * step,
      y: current.y + dy * step
    });
  };

  const buildLineFromKeyboardAim = () => {
    if (!levelState.running || levelState.completed || levelState.activeLine) {
      return;
    }

    const aim = syncKeyboardAim();
    if (!aim) {
      return;
    }

    startActiveLine(aim, aim.orientation, aim.rect);
    jezzCanvas?.focus({ preventScroll: true });
  };

  const handleJezzCanvasKeydown = (event) => {
    if (modalFocusStack.length || !levelScreen.classList.contains("is-active")) {
      return;
    }

    const key = event.key;
    if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
      event.preventDefault();
      const dx = key === "ArrowLeft" ? -1 : key === "ArrowRight" ? 1 : 0;
      const dy = key === "ArrowUp" ? -1 : key === "ArrowDown" ? 1 : 0;
      moveKeyboardAim(dx, dy);
      return;
    }

    if (key === " " || key === "Enter") {
      event.preventDefault();
      buildLineFromKeyboardAim();
      return;
    }

    if (key === "Tab" || key.toLowerCase() === "q" || key.toLowerCase() === "e") {
      event.preventDefault();
      toggleLineOrientation();
      syncKeyboardAim();
    }
  };

  const startActiveLine = (point, orientation, rect = getPointerActiveRect(point)) => {
    if (!rect) {
      return;
    }
    const castResult = getLineCastResult(point, orientation, rect);
    if (castResult.failReason === "danger") {
      cancelActiveLine(true);
      return;
    }
    if (castResult.failReason === "temporary-blocker") {
      showLevelToast("Линия не закрепится на движущейся преграде");
      return;
    }
    if (!canStartLineFromCast(castResult)) {
      return;
    }
    const splitCheck = getPotentialSplitResultFromCast(castResult);
    if (!splitCheck.canKeepLine) {
      handleInvalidSplitLine(splitCheck.reason);
      return;
    }
    startActiveLineFromCast(castResult);
  };

  const startActiveLineFromCast = (castResult) => {
    const point = castResult.startPoint;
    const orientation = castResult.orientation;
    const rect = castResult.rect;
    const segment = castResult.previewSegment;
    levelState.activeRect = rect;
    levelState.activeLine = orientation === "vertical"
      ? {
        orientation,
        x: point.x,
        y: point.y,
        startX: point.x,
        startY: point.y,
        endA: point.y,
        endB: point.y,
        boundA: segment.y1,
        boundB: segment.y2,
        negativeTarget: castResult.negativeHit,
        positiveTarget: castResult.positiveHit,
        negativeHit: castResult.negativeHit,
        positiveHit: castResult.positiveHit,
        done: false,
        rect,
        sourceArea: rect,
        sourceRect: rect
      }
      : {
        orientation,
        x: point.x,
        y: point.y,
        startX: point.x,
        startY: point.y,
        endA: point.x,
        endB: point.x,
        boundA: segment.x1,
        boundB: segment.x2,
        negativeTarget: castResult.negativeHit,
        positiveTarget: castResult.positiveHit,
        negativeHit: castResult.negativeHit,
        positiveHit: castResult.positiveHit,
        done: false,
        rect,
        sourceArea: rect,
        sourceRect: rect
      };
    levelState.draftPointer = null;
    levelState.aimPointer = null;
  };

  const getBuildableTapOrientation = (point, rect) => {
    const preferred = levelState.lineOrientation || "vertical";
    const orientations = [preferred, preferred === "vertical" ? "horizontal" : "vertical"];

    return orientations.find((orientation) => {
      const castResult = getLineCastResult(point, orientation, rect);
      if (!canStartLineFromCast(castResult)) {
        return false;
      }
      return getPotentialSplitResultFromCast(castResult).canKeepLine;
    }) || null;
  };

  const clearLineGesture = () => {
    levelState.gestureStartPoint = null;
    levelState.gestureCurrentPoint = null;
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = null;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
  };

  const continueLineFromPointer = (event) => {
    if (!levelState.running || levelState.completed || levelState.activeLine || !levelState.activeRect) {
      return;
    }

    const point = getCanvasPoint(event);
    const rect = getPointerActiveRect(point);
    const isActiveGesture = levelState.gestureStartPoint
      && levelState.gesturePointerId === event.pointerId;

    if (isActiveGesture) {
      event.preventDefault();
      const start = levelState.gestureStartPoint;
      levelState.gestureCurrentPoint = {
        x: point.x,
        y: point.y,
        rect: rect || start.rect
      };
      const dx = point.x - start.x;
      const dy = point.y - start.y;
      const distance = Math.hypot(dx, dy);

      if (!levelState.gestureLockedOrientation) {
        if (distance < LINE_GESTURE_DEAD_ZONE) {
          requestDrawJezzLevel();
          return;
        }

        if (Math.abs(dx) === Math.abs(dy)) {
          return;
        }

        const orientation = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        levelState.gestureLockedOrientation = orientation;
        setLineOrientation(orientation);
        startActiveLine(start, orientation, start.rect);
      }
      if (!levelState.activeLine) {
        requestDrawJezzLevel();
      }
      return;
    }

    if (!rect || pointHitsLineBlocker(point)) {
      levelState.aimPointer = null;
      requestDrawJezzLevel();
      return;
    }

    event.preventDefault();
    const orientation = levelState.lineOrientation || "vertical";

    levelState.aimPointer = {
      x: point.x,
      y: point.y,
      orientation,
      rect
    };
    requestDrawJezzLevel();
  };

  const finishLinePointer = (event) => {
    if (levelState.gesturePointerId !== event.pointerId || !levelState.gestureStartPoint) {
      return;
    }

    const gestureStart = levelState.gestureStartPoint;
    const elapsed = performance.now() - gestureStart.startedAt;
    const point = getCanvasPoint(event);
    const rect = getPointerActiveRect(point) || gestureStart.rect;
    const canUseTapPoint = rect && pointInRect(point, rect) && !pointHitsLineBlocker(point);

    if (
      !levelState.activeLine
      && !levelState.gestureLockedOrientation
      && elapsed <= LINE_GESTURE_TAP_MAX_MS
      && canUseTapPoint
    ) {
      const orientation = getBuildableTapOrientation(point, rect);
      if (orientation) {
        setLineOrientation(orientation);
        startActiveLine(point, orientation, rect);
      }
    }

    event.preventDefault();
    jezzCanvas.releasePointerCapture?.(event.pointerId);
    clearLineGesture();
    requestDrawJezzLevel();
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

    const isReplay = isCompletedLevel(level);

    if (!options.skipReplayConfirm && isReplay) {
      const shouldReplay = await showConfirm({
        title: t("replayTitle"),
        message: t("replayMessage"),
        acceptText: t("play"),
        cancelText: t("cancel")
      });

      if (!shouldReplay) {
        return;
      }
    }

    if (!isReplay && !spendLife()) {
      if (await showNoLivesPrompt()) {
        await openLevel(level, options);
      }
      return;
    }

    const chapter = getChapter(getChapterForLevel(level));
    state.selectedLevel = level;
    state.currentChapter = chapter.id;
    setCompletionActions(isCompletedLevel(level));
    levelScreen.className = `level-screen screen chapter-${chapter.id}${chapter.id > 1 ? " has-learned-lines" : ""}`;
    levelChapterLabel.textContent = `${t("chapter")} ${chapter.id} - ${getChapterTitle(chapter.id)}`;
    levelTitle.textContent = `${t("level")} ${level}`;
    syncLevelHint(level);
    showScreen("level-screen");
    saveProgress();
    window.requestAnimationFrame(() => {
      startJezzLevel();
      jezzCanvas?.focus({ preventScroll: true });
      syncKeyboardAim();
    });
  };

  const completeSelectedLevel = async (destination = "chapters") => {
    const completedChapterId = getChapterForLevel(state.selectedLevel);
    const completedNextChapterId = Math.min(chapters.length, completedChapterId + 1);
    const completion = applyLevelCompletionProgress(levelState.lastCompletion || {
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
    });

    levelCompletePanel?.classList.remove("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "true");
    deactivateModalFocus(levelCompletePanel);
    stopJezzLevel();
    if (!completion.replayingCompleted && !completion.interstitialShown) {
      completion.interstitialShown = true;
      await maybeShowInterstitialAd();
    }

    const showCompletionChestNotice = async () => {
      if (!completion.chapterChestId) {
        return;
      }

      openChapter(completion.chapterChestId);
      const shouldOpenChest = await showChapterChestPrompt(completion.chapterChestId);
      if (shouldOpenChest) {
        await showChapterChestClaimPanel(completion.chapterChestId);
      }
    };

    if (destination === "next" && completion.replayingCompleted) {
      await showCompletionChestNotice();
      openChapter(completedChapterId);
      return;
    }

    if (destination === "stay") {
      await showCompletionChestNotice();
      return;
    }

    if (isChapterFinalLevel(completion.level) && !completion.replayingCompleted && completion.level < TOTAL_LEVELS) {
      await showCompletionChestNotice();
      openChapter(completedNextChapterId);
      return;
    }

    if (destination === "next" && state.currentLevel <= TOTAL_LEVELS) {
      await showCompletionChestNotice();
      openLevel(state.currentLevel, { skipReplayConfirm: true });
      return;
    }

    if (destination === "next") {
      await showCompletionChestNotice();
      showScreen("final-screen");
      return;
    }

    await showCompletionChestNotice();
    openChapter(completedChapterId);
  };

  const replayCompletedLevel = async () => {
    await completeSelectedLevel("stay");
    openLevel(state.selectedLevel, { skipReplayConfirm: true });
  };

  const loseSelectedLevel = () => {
    openChapter(state.currentChapter);
  };

  const toggleSettings = (isOpen) => {
    settingsModal.classList.toggle("is-open", isOpen);
    settingsModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (isOpen) {
      activateModalFocus(settingsModal, {
        initialFocus: settingsModal.querySelector(".settings-close"),
        onEscape: () => toggleSettings(false)
      });
    } else {
      deactivateModalFocus(settingsModal);
    }
  };

  const handleAction = async (event) => {
    const orientationButton = event.target.closest("[data-line-orientation]");
    if (orientationButton) {
      setLineOrientation(orientationButton.dataset.lineOrientation);
      return;
    }

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

    if (action === "continue-play") {
      if (state.currentLevel > TOTAL_LEVELS) {
        showScreen("final-screen");
        return;
      }
      await openLevel(state.currentLevel, { skipReplayConfirm: true });
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

    if (action === "inventory") {
      openInventoryModal();
      return;
    }

    if (action === "chests") {
      await showChestsPanel();
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
    if (event.type === "touchmove" && event.target.closest(".chapter-list, .inventory-content, .inventory-tabs")) {
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
  inventoryCloseButton?.addEventListener("click", closeInventoryModal);
  inventoryModal?.addEventListener("click", async (event) => {
    if (event.target === inventoryModal) {
      closeInventoryModal();
      return;
    }

    const tabButton = event.target.closest("[data-inventory-tab]");
    if (tabButton) {
      setInventoryTab(tabButton.dataset.inventoryTab);
      return;
    }

    const actionButton = event.target.closest("[data-inventory-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.inventoryAction;
    if (action === "open-chest") {
      const chapterId = Number(actionButton.dataset.chapterId);
      closeInventoryModal();
      await waitNextFrame();
      await openChapterChest(chapterId);
      return;
    }

    if (action === "open-all-chests") {
      closeInventoryModal();
      await waitNextFrame();
      await openAllPendingChests();
      return;
    }

    if (action === "claim-gift") {
      claimGift(actionButton.dataset.giftId);
      return;
    }

    if (action === "equip-skin") {
      equipSkin(actionButton.dataset.cosmeticGroup, actionButton.dataset.skinId);
      return;
    }

    if (action === "buy-boost") {
      await showConfirm({
        title: t("shop"),
        message: "Купи бусты в магазине",
        acceptText: t("ok"),
        cancelText: null
      });
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
  document.addEventListener("keydown", handleModalKeydown);
  document.addEventListener("click", handleAction);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });
  jezzCanvas?.addEventListener("pointerdown", beginLineFromPointer);
  jezzCanvas?.addEventListener("pointermove", continueLineFromPointer);
  jezzCanvas?.addEventListener("pointerup", finishLinePointer);
  jezzCanvas?.addEventListener("keydown", handleJezzCanvasKeydown);
  jezzCanvas?.addEventListener("pointercancel", () => {
    clearLineGesture();
    requestDrawJezzLevel();
  });
  jezzCanvas?.addEventListener("pointerleave", () => {
    if (levelState.gestureStartPoint) {
      return;
    }
    levelState.aimPointer = null;
    if (!levelState.draftPointer) {
      requestDrawJezzLevel();
    }
  });
  const scheduleResizeActiveLevel = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (resizeRaf || !levelScreen.classList.contains("is-active")) {
        return;
      }
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        resizeActiveJezzLevel();
      });
    }, 80);
  };

  window.addEventListener("resize", () => {
    syncViewportHeight();
    scheduleResizeActiveLevel();
  });
  window.addEventListener("orientationchange", () => {
    syncViewportHeight();
    scheduleResizeActiveLevel();
  });
  window.addEventListener("beforeunload", () => {
    saveProgressImmediate({ flushCloud: true });
    submitLeaderboardScore();
  });

  if (isLikelyMobileDevice() && (window.devicePixelRatio || 1) >= 2) {
    lowPerformanceMode = true;
    root?.classList.add("is-low-performance");
  }
  createPerfOverlay();
  loadProgress();
  musicToggle.checked = state.music;
  soundToggle.checked = state.sound;
  updateLifeRestore();
  syncViewportHeight();
  renderChapterScreens();
  initYandexSdk();

  if (IS_DEBUG) {
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
      getChapterStars,
      getChapterChestTier,
      getPendingChestReward,
      getPendingChests,
      openChapterChest,
      openAllPendingChests,
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
  }

  const initialChapterMatch = window.location.hash.match(/^#chapter-(\d+)-screen$/);
  if (initialChapterMatch) {
    openChapter(Number(initialChapterMatch[1]));
  }
})();
