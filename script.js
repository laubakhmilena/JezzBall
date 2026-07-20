<<<<<<< HEAD
(() => {
  const root = document.getElementById("gameRoot");
=======
(() => {
  const root = document.getElementById("gameRoot");
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const playButton = document.getElementById("playButton");
  const levelScreen = document.getElementById("level-screen");
  const levelPlayfield = document.getElementById("levelPlayfield");
  const viewportTooSmallOverlay = document.getElementById("viewportTooSmallOverlay");
  const levelChapterLabel = document.getElementById("levelChapterLabel");
<<<<<<< HEAD
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
  const confirmModal = document.getElementById("confirmModal");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmCancelButton = document.getElementById("confirmCancelButton");
  const confirmAcceptButton = document.getElementById("confirmAcceptButton");
  const inventoryModal = document.getElementById("inventoryModal");
  const inventoryCloseButton = document.getElementById("inventoryCloseButton");
  const inventoryContent = document.getElementById("inventoryContent");
  const SAVE_KEY = "jezzball-progress-v1";
  const IS_LOCAL_HOST = ["localhost", "127.0.0.1", "::1", ""].includes(location.hostname);
  const IS_PERF = IS_LOCAL_HOST && new URLSearchParams(location.search).has("perf");
  const IS_DEBUG = IS_LOCAL_HOST && new URLSearchParams(location.search).has("debug");
  const CLOUD_SAVE_KEY = "progress";
  const LEADERBOARD_NAME = "stars";
=======
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
  const confirmModal = document.getElementById("confirmModal");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmCancelButton = document.getElementById("confirmCancelButton");
  const confirmAcceptButton = document.getElementById("confirmAcceptButton");
  const inventoryModal = document.getElementById("inventoryModal");
  const inventoryCloseButton = document.getElementById("inventoryCloseButton");
  const inventoryContent = document.getElementById("inventoryContent");
  const SAVE_KEY = "jezzball-progress-v1";
  const IS_LOCAL_HOST = ["localhost", "127.0.0.1", "::1", ""].includes(location.hostname);
  const IS_PERF = IS_LOCAL_HOST && new URLSearchParams(location.search).has("perf");
  const IS_DEBUG = IS_LOCAL_HOST && new URLSearchParams(location.search).has("debug");
  const CLOUD_SAVE_KEY = "progress";
  const LEADERBOARD_NAME = "stars";
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const INTERSTITIAL_LEVEL_INTERVAL = 3;
  const INTERSTITIAL_MIN_INTERVAL_MS = 180 * 1000;
  const USER_PAUSE_AD_MIN_INTERVAL_MS = 90 * 1000;
  const MAX_PROCESSED_IAP_PURCHASE_TOKENS = 100;
  const MAX_LIVES = 5;
  const LIFE_RESTORE_MS = 3 * 60 * 1000;
  const TOTAL_LEVELS = 100;
  const LEVEL_ONE_TARGET = 70;
  const FAST_LINE_MULTIPLIER = 1.75;
  const SLOW_BALLS_DURATION_MS = 6000;
  const SLOW_BALLS_MULTIPLIER = 0.42;
  const LINE_SHIELD_GRACE_MS = 420;
  const TARGET_EASE_PERCENT = 5;
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const CHEST_TIERS = {
    none: 0,
    small: 1,
    medium: 2,
    large: 3
  };
  const SHOP_TABS = ["recommended", "boosts", "lives", "skins", "chests", "coins"];
  const SHOP_BOOSTER_PRICES = {
    fastLine: 180,
    slowBalls: 220,
    lineShield: 260,
    targetEase: 300,
    penaltyRepair: 240
  };
  const SHOP_LIFE_ITEMS = {
    life_1: { title: "+1 жизнь", icon: "♥", price: 180, lives: 1 },
    life_3: { title: "+3 жизни", icon: "♥♥♥", price: 480, lives: 3 },
    life_full: { title: "Полное восстановление", icon: "♥♥♥♥♥", price: 650, fullRestore: true }
  };
  const SHOP_CHEST_ITEMS = {
    small_chest: {
      title: "Малый сундук",
      icon: "▣",
      price: 520,
      drops: [
        { chance: 45, reward: { coins: 220 }, oddsLabel: "монеты" },
        { chance: 30, reward: { coins: 120, boosters: { fastLine: 1 } }, oddsLabel: "монеты + Линия" },
        { chance: 20, reward: { boosters: { slowBalls: 1 } }, oddsLabel: "Пауза" },
        { chance: 5, reward: { coins: 180, boosters: { lineShield: 1 } }, oddsLabel: "редкая награда" }
      ]
    },
    medium_chest: {
      title: "Средний сундук",
      icon: "▣",
      price: 900,
      drops: [
        { chance: 35, reward: { coins: 450 }, oddsLabel: "монеты" },
        { chance: 30, reward: { coins: 220, boosters: { slowBalls: 1 } }, oddsLabel: "монеты + Пауза" },
        { chance: 20, reward: { boosters: { fastLine: 1, lineShield: 1 } }, oddsLabel: "Линия + Щит" },
        { chance: 10, reward: { coins: 300, lives: 1 }, oddsLabel: "жизнь + монеты" },
        { chance: 5, reward: { boosters: { fastLine: 2, slowBalls: 1, lineShield: 1, penaltyRepair: 1 } }, oddsLabel: "много бустеров" }
      ]
    },
    big_chest: {
      title: "Большой сундук",
      icon: "▣",
      price: 1400,
      recommended: true,
      drops: [
        { chance: 30, reward: { coins: 850 }, oddsLabel: "монеты" },
        { chance: 25, reward: { coins: 500, boosters: { fastLine: 2 } }, oddsLabel: "монеты + Линия" },
        { chance: 20, reward: { coins: 400, lives: 2 }, oddsLabel: "жизни + монеты" },
        { chance: 15, reward: { boosters: { slowBalls: 2, lineShield: 2 } }, oddsLabel: "Пауза + Щит" },
        { chance: 8, reward: { coins: 900, boosters: { fastLine: 1, slowBalls: 1, lineShield: 1, targetEase: 1, penaltyRepair: 1 } }, oddsLabel: "монеты + все бустеры" },
        { chance: 2, reward: { coins: 1400, lives: 2, boosters: { fastLine: 2, slowBalls: 2, lineShield: 2, targetEase: 2, penaltyRepair: 2 } }, oddsLabel: "джекпот" }
      ]
    }
  };
  const SHOP_SKIN_PRICES = {
    balls: { neon: 700, ice: 800, shadow: 750, plasma: 850, sun: 900, fire: 950 },
    lines: { lightning: 650, pulse: 780, crystal: 950, aurora: 900 },
    captureEffects: { stars: 700, ripple: 780, wave: 900, comet: 950 }
  };
  const SHOP_AD_REWARDS = {
    ad_life_1: {
      title: "+1 жизнь за рекламу",
      icon: "♥",
      description: "Посмотри короткое видео и получи жизнь.",
      reward: { lives: 1 }
    },
    ad_random_booster: {
      title: "Случайный бустер",
      icon: "⚡",
      description: "Посмотри короткое видео и получи один бустер.",
      randomBooster: true
    }
  };
  const SHOP_IAP_REWARDS = {
    coins_1000: {
      title: "1000 монет",
      icon: "●",
      description: "+1000 монет для магазина.",
      meta: "Монеты",
      reward: { coins: 1000 }
    },
    coins_2500: {
      title: "2500 монет",
      icon: "●",
      description: "+2500 монет. Выгоднее базового пакета.",
      meta: "Выгодно",
      reward: { coins: 2500 }
    },
    coins_6500: {
      title: "6500 монет",
      icon: "●",
      description: "+6500 монет для скинов, жизней и сундуков.",
      meta: "Много монет",
      reward: { coins: 6500 }
    },
    starter_pack: {
      title: "Стартовый набор",
      icon: "★",
      description: "1500 монет, по 2 каждого бустера, полные жизни.",
      meta: "Лучший старт",
      reward: { coins: 1500, lives: MAX_LIVES, boosters: { fastLine: 2, slowBalls: 2, lineShield: 2, targetEase: 2, penaltyRepair: 2 } }
    },
    booster_pack: {
      title: "Большой набор бустеров",
      icon: "⚡",
      description: "3000 монет, Линия x8, Пауза x6, Щит x5, Фокус x4, Откат x4.",
      meta: "Выгодно",
      reward: { coins: 3000, boosters: { fastLine: 8, slowBalls: 6, lineShield: 5, targetEase: 4, penaltyRepair: 4 } }
    },
    mega_pack: {
      title: "Мега-набор",
      icon: "▣",
      description: "7700 монет, 7 жизней и все бустеры x6+.",
      meta: "Много монет",
      reward: { coins: 7700, lives: 7, boosters: { fastLine: 7, slowBalls: 6, lineShield: 6, targetEase: 6, penaltyRepair: 6 } }
    }
  };
  const CHAPTER_CHEST_REWARDS = {
<<<<<<< HEAD
    0: {
      type: "none",
      title: "Нет сундука",
      coins: 0,
      lives: 0
    },
=======
    0: {
      type: "none",
      title: "Нет сундука",
      coins: 0,
      lives: 0
    },
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    1: {
      type: "small",
      title: "Сундук тропы",
      coins: 200,
      lives: 0
    },
    2: {
      type: "medium",
      title: "Сундук деревни",
      coins: 400,
      lives: 1
    },
    3: {
      type: "large",
      title: "Сундук главы",
      coins: 700,
      lives: 2
    }
  };
  const ACHIEVEMENTS = [
    { id: "first_cut", category: "progress", icon: "✦", title: "Первый разрез", description: "Пройди уровень 1.", rewardCoins: 50, target: 1, getValue: () => (isCompletedLevel(1) ? 1 : 0) },
    { id: "sunny_glade", category: "progress", icon: "☀", title: "Солнечная поляна", description: "Пройди главу 1.", rewardCoins: 120, target: 1, getValue: () => (isChapterComplete(1) ? 1 : 0) },
    { id: "quiet_village", category: "progress", icon: "♣", title: "Тихая деревня", description: "Пройди главу 2.", rewardCoins: 140, target: 1, getValue: () => (isChapterComplete(2) ? 1 : 0) },
    { id: "halfway", category: "progress", icon: "◆", title: "Полпути", description: "Открой уровень 51.", rewardCoins: 300, target: 51, getValue: () => Math.min(51, state.currentLevel) },
    { id: "final_light", category: "progress", icon: "◈", title: "Финал света", description: "Пройди уровень 100.", rewardCoins: 700, target: 1, getValue: () => (isCompletedLevel(100) ? 1 : 0) },
    { id: "stars_10", category: "stars", icon: "★", title: "10 звёзд", description: "Собери 10 звёзд.", rewardCoins: 80, target: 10, getValue: () => getEarnedStars() },
    { id: "stars_50", category: "stars", icon: "★", title: "50 звёзд", description: "Собери 50 звёзд.", rewardCoins: 160, target: 50, getValue: () => getEarnedStars() },
    { id: "stars_100", category: "stars", icon: "★", title: "100 звёзд", description: "Собери 100 звёзд.", rewardCoins: 260, target: 100, getValue: () => getEarnedStars() },
    { id: "stars_200", category: "stars", icon: "★", title: "200 звёзд", description: "Собери 200 звёзд.", rewardCoins: 450, target: 200, getValue: () => getEarnedStars() },
    { id: "stars_300", category: "stars", icon: "★", title: "Все 300 звёзд", description: "Собери 300 звёзд.", rewardCoins: 900, target: 300, getValue: () => getEarnedStars() },
    { id: "clean_win", category: "perfect", icon: "☆", title: "Чистая победа", description: "Получи 3 звезды на любом уровне.", rewardCoins: 100, target: 1, getValue: () => Math.min(1, getPerfectLevelCount()) },
    { id: "perfect_10", category: "perfect", icon: "☆", title: "Десять идеалов", description: "Получи 3 звезды на 10 уровнях.", rewardCoins: 220, target: 10, getValue: () => getPerfectLevelCount() },
    { id: "perfect_50", category: "perfect", icon: "☆", title: "Пятьдесят идеалов", description: "Получи 3 звезды на 50 уровнях.", rewardCoins: 600, target: 50, getValue: () => getPerfectLevelCount() },
    { id: "perfect_chapter", category: "perfect", icon: "✧", title: "Идеальная глава", description: "Закрой любую главу на 30/30 звёзд.", rewardCoins: 350, target: 1, getValue: () => Math.min(1, getPerfectChapterCount()) },
    { id: "perfect_game", category: "perfect", icon: "✧", title: "Идеальная игра", description: "Закрой все 10 глав на 30/30 звёзд.", rewardCoins: 1200, target: 10, getValue: () => getPerfectChapterCount() },
    { id: "first_chapter_chest", category: "chest", icon: "▣", title: "Первый сундук главы", description: "Получи любой сундук главы.", rewardCoins: 120, target: 1, getValue: () => Math.min(1, getClaimedChapterChestCount()) },
    { id: "chest_keeper", category: "chest", icon: "▣", title: "Хранитель сундуков", description: "Получи сундуки во всех 10 главах.", rewardCoins: 500, target: 10, getValue: () => getClaimedChapterChestCount() },
    { id: "first_style", category: "style", icon: "●", title: "Первый стиль", description: "Купи любой скин.", rewardCoins: 120, target: 1, getValue: () => Math.min(1, getPaidCosmeticCount()) },
    { id: "collector", category: "style", icon: "●", title: "Коллекционер", description: "Открой 5 платных скинов.", rewardCoins: 350, target: 5, getValue: () => getPaidCosmeticCount() },
    { id: "booster_stock", category: "booster", icon: "⚡", title: "Запас бустеров", description: "Имей 10 любых бустеров одновременно.", rewardCoins: 250, target: 10, getValue: () => getTotalBoosterCount() }
  ];
  const ACHIEVEMENT_IDS = new Set(ACHIEVEMENTS.map((achievement) => achievement.id));
  const BOOSTER_ITEMS = {
    fastLine: {
      icon: "⚡",
      title: "Линия",
      description: "Следующая линия строится быстрее."
    },
    slowBalls: {
      icon: "❄",
      title: "Пауза",
      description: "Шары замедляются на 6 секунд."
    },
    lineShield: {
      icon: "🛡",
      title: "Щит",
      description: "Один удар по строящейся линии не ломает её."
    },
    targetEase: {
      icon: "◎",
      title: "Фокус",
      description: "Цель уровня снижается на 5% в текущей попытке."
    },
    penaltyRepair: {
      icon: "↩",
      title: "Откат",
      description: "Убирает один штраф в текущей попытке."
    }
  };
  const DEFAULT_BOOSTERS = {
    fastLine: 0,
    slowBalls: 0,
    lineShield: 0,
    targetEase: 0,
    penaltyRepair: 0
  };
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      items: {
        default: { icon: "●", title: "Обычный" },
        neon: { icon: "🟣", title: "Неоновый" },
        shadow: { icon: "●", title: "Теневой" },
        plasma: { icon: "✦", title: "Плазма" },
        sun: { icon: "☀", title: "Солнечный" },
        fire: { icon: "🔥", title: "Огненный" }
      }
<<<<<<< HEAD
    },
    lines: {
      title: "Линии",
      equippedKey: "line",
=======
    },
    lines: {
      title: "Линии",
      equippedKey: "line",
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      items: {
        default: { icon: "─", title: "Обычная" },
        lightning: { icon: "⚡", title: "Молния" },
        pulse: { icon: "═", title: "Импульс" },
        crystal: { icon: "💎", title: "Кристалл" },
        aurora: { icon: "≈", title: "Аврора" }
      }
<<<<<<< HEAD
    },
    captureEffects: {
      title: "Эффекты захвата",
      equippedKey: "captureEffect",
=======
    },
    captureEffects: {
      title: "Эффекты захвата",
      equippedKey: "captureEffect",
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      items: {
        default: { icon: "○", title: "Обычный" },
        stars: { icon: "✨", title: "Звёзды" },
        ripple: { icon: "◌", title: "Рябь" },
        wave: { icon: "🌊", title: "Волна" },
        comet: { icon: "✹", title: "Комета" }
      }
<<<<<<< HEAD
    }
=======
    }
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  };
  COSMETIC_GROUPS.balls.items.default.image = "objects/game-objects/ordinary-ball-small.png";
  COSMETIC_GROUPS.balls.items.neon.image = "objects/game-objects/neon-ball-small.png";
  COSMETIC_GROUPS.balls.items.ice = {
    icon: "❄",
    image: "objects/game-objects/ice-ball-small.png",
    title: "Ледяной"
  };
  const LEVEL_REWARDS = {
<<<<<<< HEAD
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
  const LOW_PERFORMANCE_FRAME_INTERVAL = 1000 / 30;
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

=======
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
  const LOW_PERFORMANCE_FRAME_INTERVAL = 1000 / 30;
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const SAFE_OBSTACLE_COLOR = "rgba(173, 246, 255, 0.92)";
  const DANGER_OBSTACLE_COLORS = ["#ff4e7a", "#8d2454", "#7c1d49"];

  const obstacleColor = (safe, colorIndex = 0) => (
    safe ? SAFE_OBSTACLE_COLOR : DANGER_OBSTACLE_COLORS[colorIndex % DANGER_OBSTACLE_COLORS.length]
  );

  const level = (target, balls, speed, obstacles, purpose) => ({
    target,
    balls,
    speed,
    obstacles,
    purpose
  });

  const obstacleLine = (orientation, coordinate, start, end, safe, colorIndex = 0) => ({
    orientation,
    ...(orientation === "vertical"
      ? { x: coordinate, y1: start, y2: end }
      : { y: coordinate, x1: start, x2: end }),
    type: "static",
    safe,
    color: obstacleColor(safe, colorIndex),
    blocksBall: true
  });

  const movingObstacleLine = (orientation, coordinate, start, end, safe, axis, amplitude, phase, colorIndex = 0) => ({
    ...obstacleLine(orientation, coordinate, start, end, safe, colorIndex),
    type: "moving",
    axis,
    amplitude,
    phase
  });

  const safeV = (x, y1, y2) => obstacleLine("vertical", x, y1, y2, true);
  const safeH = (y, x1, x2) => obstacleLine("horizontal", y, x1, x2, true);
  const dangerV = (x, y1, y2, colorIndex = 0) => obstacleLine("vertical", x, y1, y2, false, colorIndex);
  const dangerH = (y, x1, x2, colorIndex = 0) => obstacleLine("horizontal", y, x1, x2, false, colorIndex);
  const movingSafeV = (x, y1, y2, axis = "x", amplitude = 0.1, phase = 0) => (
    movingObstacleLine("vertical", x, y1, y2, true, axis, amplitude, phase)
  );
  const movingSafeH = (y, x1, x2, axis = "y", amplitude = 0.1, phase = 0) => (
    movingObstacleLine("horizontal", y, x1, x2, true, axis, amplitude, phase)
  );
  const movingDangerV = (x, y1, y2, axis = "x", amplitude = 0.1, phase = 0, colorIndex = 0) => (
    movingObstacleLine("vertical", x, y1, y2, false, axis, amplitude, phase, colorIndex)
  );
  const movingDangerH = (y, x1, x2, axis = "y", amplitude = 0.1, phase = 0, colorIndex = 0) => (
    movingObstacleLine("horizontal", y, x1, x2, false, axis, amplitude, phase, colorIndex)
  );

  const curatedProgressionLevelConfigs = {
    31: level(79, 3, "medium", [dangerV(0.42, 0.18, 0.82), dangerH(0.58, 0.18, 0.82, 1), safeH(0.78, 0.22, 0.78)], "pressure-cross-lines"),
    32: level(79, 3, "medium", [movingDangerV(0.54, 0.2, 0.78, "x", 0.09, 0.15), safeH(0.34, 0.22, 0.78)], "pressure-vertical-timing"),
    33: level(80, 4, "slow", [], "pressure-pure-chaos"),
    34: level(80, 3, "medium", [safeV(0.34, 0.16, 0.84), safeV(0.66, 0.16, 0.84), dangerH(0.5, 0.36, 0.64)], "pressure-safe-corridor"),
    35: level(82, 4, "medium", [movingDangerV(0.5, 0.18, 0.82, "x", 0.1, 0.2), movingDangerH(0.5, 0.18, 0.82, "y", 0.1, 0.65, 1), safeH(0.28, 0.22, 0.78)], "pressure-mini-boss"),
    36: level(81, 3, "fast", [safeV(0.28, 0.18, 0.84), safeV(0.72, 0.16, 0.82), dangerH(0.54, 0.3, 0.7)], "pressure-narrow-lanes"),
    37: level(81, 4, "medium", [safeH(0.38, 0.18, 0.82), dangerV(0.62, 0.24, 0.78), dangerH(0.72, 0.2, 0.64, 1)], "pressure-safe-danger-combo"),
    38: level(82, 4, "medium", [movingSafeV(0.35, 0.18, 0.82, "x", 0.08, 0.1), movingDangerH(0.63, 0.2, 0.8, "y", 0.1, 0.55), dangerV(0.74, 0.24, 0.74, 1)], "pressure-dual-moving"),
    39: level(82, 4, "fast", [safeH(0.28, 0.18, 0.82), safeH(0.72, 0.18, 0.82), dangerV(0.5, 0.34, 0.66)], "pressure-precision-corridor"),
    40: level(83, 4, "fast", [movingSafeV(0.3, 0.16, 0.84, "x", 0.08, 0), movingDangerH(0.5, 0.18, 0.82, "y", 0.1, 0.3), dangerV(0.68, 0.2, 0.78, 1), safeH(0.78, 0.2, 0.7)], "pressure-boss"),

    41: level(82, 3, "medium", [dangerH(0.48, 0.14, 0.86), safeH(0.36, 0.22, 0.78)], "precision-thin-gap"),
    42: level(82, 3, "medium", [movingSafeH(0.42, 0.18, 0.82, "y", 0.08, 0.15), movingSafeH(0.66, 0.2, 0.8, "y", 0.07, 0.65), dangerV(0.52, 0.22, 0.76)], "precision-temporary-walls"),
    43: level(82, 3, "medium", [safeV(0.28, 0.16, 0.72), dangerH(0.62, 0.28, 0.88), dangerV(0.72, 0.28, 0.84, 1)], "precision-asymmetric-field"),
    44: level(83, 4, "medium", [dangerV(0.38, 0.2, 0.82), dangerV(0.66, 0.16, 0.78, 1), safeH(0.5, 0.2, 0.8)], "precision-safe-pockets"),
    45: level(83, 4, "fast", [dangerH(0.42, 0.18, 0.84), movingDangerV(0.6, 0.22, 0.8, "x", 0.08, 0.35, 1), safeV(0.25, 0.18, 0.72)], "precision-mini-boss"),
    46: level(83, 4, "medium", [safeV(0.5, 0.14, 0.86), safeH(0.5, 0.14, 0.86), dangerH(0.28, 0.34, 0.8), dangerV(0.74, 0.24, 0.66, 1)], "precision-split-islands"),
    47: level(83, 4, "medium", [movingDangerV(0.35, 0.2, 0.82, "x", 0.09, 0.1), movingSafeH(0.66, 0.18, 0.82, "y", 0.09, 0.55), dangerH(0.34, 0.24, 0.76, 1)], "precision-double-moving"),
    48: level(84, 4, "medium", [movingSafeV(0.68, 0.16, 0.84, "x", 0.09, 0.25), movingDangerH(0.46, 0.18, 0.82, "y", 0.08, 0.75), safeH(0.78, 0.24, 0.72)], "precision-moving-combo"),
    49: level(84, 4, "fast", [safeV(0.24, 0.18, 0.84), safeV(0.76, 0.16, 0.82), dangerH(0.38, 0.26, 0.74), dangerH(0.66, 0.26, 0.74, 1)], "precision-corridors"),
    50: level(84, 4, "fast", [dangerV(0.36, 0.16, 0.84), dangerH(0.5, 0.16, 0.84, 1), movingDangerV(0.66, 0.22, 0.78, "x", 0.09, 0.4, 2), safeH(0.26, 0.2, 0.8), safeV(0.82, 0.3, 0.74)], "precision-chapter-boss"),

    51: level(83, 3, "fast", [movingDangerH(0.4, 0.16, 0.84, "y", 0.1, 0.1), safeV(0.28, 0.22, 0.82)], "speed-fast-sweeps"),
    52: level(83, 3, "fast", [movingDangerV(0.44, 0.18, 0.84, "x", 0.1, 0), movingDangerH(0.66, 0.18, 0.82, "y", 0.09, 0.5, 1), safeV(0.78, 0.22, 0.78)], "speed-cross-blockers"),
    53: level(83, 4, "medium", [safeH(0.3, 0.18, 0.82), dangerV(0.5, 0.2, 0.82), safeV(0.72, 0.18, 0.74), dangerH(0.68, 0.22, 0.78, 1)], "speed-alternating-layout"),
    54: level(84, 4, "fast", [movingSafeV(0.5, 0.14, 0.86, "x", 0.13, 0.2), dangerH(0.54, 0.2, 0.8), dangerV(0.78, 0.28, 0.74, 1)], "speed-unstable-wall"),
    55: level(84, 4, "fast", [movingDangerH(0.36, 0.16, 0.84, "y", 0.11, 0.15), movingDangerV(0.64, 0.18, 0.82, "x", 0.1, 0.65, 1), safeH(0.76, 0.22, 0.78)], "speed-mini-boss"),
    56: level(84, 4, "fast", [dangerV(0.32, 0.14, 0.7), dangerV(0.68, 0.3, 0.86, 1), safeH(0.5, 0.18, 0.82), dangerH(0.82, 0.22, 0.62, 2)], "speed-split-sectors"),
    57: level(84, 4, "medium", [safeV(0.2, 0.18, 0.44), safeH(0.24, 0.22, 0.5), safeV(0.8, 0.56, 0.84), safeH(0.76, 0.5, 0.78), dangerV(0.5, 0.22, 0.78)], "speed-safe-anchors"),
    58: level(85, 4, "fast", [movingSafeH(0.34, 0.18, 0.82, "y", 0.08, 0.1), movingDangerV(0.5, 0.16, 0.84, "x", 0.09, 0.5), movingSafeH(0.7, 0.18, 0.82, "y", 0.08, 0.8)], "speed-moving-maze"),
    59: level(85, 4, "fast", [safeV(0.3, 0.16, 0.84), movingDangerH(0.5, 0.18, 0.82, "y", 0.1, 0.25), dangerV(0.7, 0.2, 0.8, 1), safeH(0.74, 0.24, 0.78)], "speed-combo-challenge"),
    60: level(85, 4, "fast", [movingDangerV(0.32, 0.16, 0.84, "x", 0.09, 0), movingDangerH(0.52, 0.18, 0.82, "y", 0.1, 0.4, 1), movingSafeV(0.72, 0.16, 0.84, "x", 0.08, 0.7), safeH(0.26, 0.2, 0.78)], "speed-boss"),

    61: level(84, 3, "medium", [safeV(0.38, 0.16, 0.84), dangerH(0.62, 0.4, 0.86), dangerV(0.76, 0.24, 0.78, 1)], "mind-games-bait-left"),
    62: level(84, 3, "medium", [safeH(0.48, 0.14, 0.86), dangerV(0.32, 0.2, 0.78), dangerV(0.68, 0.24, 0.82, 1)], "mind-games-anchor-wall"),
    63: level(84, 4, "medium", [safeV(0.45, 0.18, 0.84), safeH(0.64, 0.18, 0.82), dangerH(0.34, 0.24, 0.76)], "mind-games-two-stage-capture"),
    64: level(85, 4, "medium", [dangerV(0.28, 0.18, 0.74), dangerH(0.3, 0.28, 0.8, 1), dangerV(0.72, 0.28, 0.84, 2), safeH(0.78, 0.24, 0.72)], "mind-games-trap-routes"),
    65: level(85, 4, "fast", [safeV(0.52, 0.14, 0.86), movingDangerH(0.5, 0.18, 0.82, "y", 0.09, 0.2), dangerV(0.76, 0.24, 0.78, 1), safeH(0.28, 0.22, 0.68)], "mind-games-mini-boss"),
    66: level(85, 4, "medium", [dangerH(0.28, 0.18, 0.82), dangerV(0.48, 0.2, 0.8, 1), dangerH(0.72, 0.18, 0.82, 2), safeV(0.82, 0.24, 0.78)], "mind-games-alternating-danger"),
    67: level(85, 4, "medium", [safeV(0.34, 0.16, 0.84), safeH(0.5, 0.18, 0.82), dangerV(0.58, 0.28, 0.78), dangerH(0.68, 0.34, 0.84, 1)], "mind-games-fake-corridor"),
    68: level(86, 4, "medium", [movingDangerV(0.5, 0.16, 0.84, "x", 0.11, 0.15), movingSafeH(0.5, 0.18, 0.82, "y", 0.09, 0.65), safeV(0.22, 0.22, 0.78)], "mind-games-timing-puzzle"),
    69: level(86, 4, "fast", [dangerV(0.3, 0.16, 0.84), dangerH(0.42, 0.2, 0.82, 1), safeV(0.58, 0.2, 0.78), dangerH(0.74, 0.24, 0.76, 2)], "mind-games-dense-fair"),
    70: level(86, 4, "fast", [safeH(0.28, 0.16, 0.84), movingDangerV(0.42, 0.18, 0.82, "x", 0.09, 0.1), safeV(0.62, 0.16, 0.84), movingDangerH(0.68, 0.18, 0.82, "y", 0.1, 0.55, 1)], "mind-games-puzzle-boss"),

    71: level(85, 3, "medium", [safeV(0.5, 0.18, 0.82)], "mastery-high-target-clean"),
    72: level(85, 4, "medium", [movingSafeV(0.36, 0.16, 0.84, "x", 0.1, 0), movingSafeV(0.68, 0.16, 0.84, "x", 0.1, 0.5), dangerH(0.5, 0.24, 0.76)], "mastery-pulsing-safe-walls"),
    73: level(85, 4, "fast", [safeH(0.32, 0.18, 0.82), safeH(0.7, 0.18, 0.82), dangerV(0.42, 0.34, 0.66), dangerV(0.62, 0.34, 0.66, 1)], "mastery-narrow-openings"),
    74: level(86, 4, "fast", [], "mastery-clean-chaos"),
    75: level(86, 4, "fast", [movingDangerH(0.42, 0.16, 0.84, "y", 0.1, 0.2), safeV(0.52, 0.16, 0.84), dangerV(0.76, 0.22, 0.8, 1), safeH(0.76, 0.2, 0.72)], "mastery-mini-boss"),
    76: level(86, 4, "medium", [safeV(0.33, 0.14, 0.86), safeV(0.67, 0.14, 0.86), dangerH(0.52, 0.34, 0.66)], "mastery-safe-divide"),
    77: level(86, 4, "fast", [dangerH(0.36, 0.16, 0.84), movingDangerV(0.5, 0.2, 0.8, "x", 0.09, 0.45), dangerH(0.7, 0.16, 0.84, 1), safeV(0.82, 0.22, 0.78)], "mastery-timing-forced"),
    78: level(87, 4, "fast", [safeV(0.26, 0.16, 0.84), dangerV(0.44, 0.18, 0.82), safeV(0.62, 0.16, 0.84), dangerV(0.8, 0.2, 0.78, 1)], "mastery-multi-lane"),
    79: level(87, 4, "fast", [dangerH(0.28, 0.18, 0.82), safeV(0.36, 0.18, 0.84), movingDangerH(0.54, 0.18, 0.82, "y", 0.08, 0.3), safeV(0.72, 0.16, 0.82), dangerH(0.78, 0.24, 0.76, 1)], "mastery-pre-boss"),
    80: level(87, 4, "fast", [movingDangerV(0.34, 0.16, 0.84, "x", 0.1, 0), movingSafeH(0.5, 0.18, 0.82, "y", 0.09, 0.35), movingDangerV(0.68, 0.16, 0.84, "x", 0.1, 0.7, 1), safeH(0.78, 0.2, 0.8)], "mastery-boss"),

    81: level(86, 4, "medium", [dangerV(0.26, 0.16, 0.84), dangerH(0.38, 0.18, 0.82, 1), safeV(0.54, 0.2, 0.8), dangerH(0.7, 0.2, 0.82, 2)], "endgame-dense-neon"),
    82: level(86, 4, "fast", [movingDangerH(0.36, 0.16, 0.84, "y", 0.09, 0.1), movingDangerH(0.68, 0.16, 0.84, "y", 0.09, 0.6, 1), safeV(0.52, 0.18, 0.82)], "endgame-moving-pairs"),
    83: level(86, 4, "medium", [safeH(0.26, 0.16, 0.84), dangerV(0.38, 0.18, 0.82), safeH(0.5, 0.18, 0.82), dangerV(0.66, 0.18, 0.82, 1), safeH(0.76, 0.16, 0.84)], "endgame-layered-chain"),
    84: level(87, 4, "fast", [], "endgame-high-speed-clean"),
    85: level(87, 4, "fast", [movingDangerV(0.32, 0.16, 0.84, "x", 0.11, 0.15), dangerH(0.46, 0.18, 0.82, 1), movingSafeV(0.68, 0.16, 0.84, "x", 0.08, 0.6), safeH(0.78, 0.2, 0.76)], "endgame-mini-boss"),
    86: level(87, 4, "medium", [safeV(0.24, 0.16, 0.84), dangerH(0.34, 0.26, 0.82), safeH(0.52, 0.18, 0.76), dangerV(0.72, 0.2, 0.84, 1), safeV(0.84, 0.28, 0.76)], "endgame-safe-danger-maze"),
    87: level(87, 4, "fast", [dangerV(0.34, 0.16, 0.84), dangerV(0.66, 0.16, 0.84, 1), dangerH(0.5, 0.24, 0.76, 2), safeH(0.28, 0.2, 0.8), safeH(0.74, 0.2, 0.8)], "endgame-bounce-chamber"),
    88: level(88, 4, "fast", [safeV(0.28, 0.16, 0.84), movingDangerH(0.42, 0.18, 0.82, "y", 0.09, 0.25), dangerV(0.58, 0.2, 0.8, 1), safeH(0.74, 0.22, 0.78)], "endgame-precision-speed"),
    89: level(88, 4, "fast", [safeH(0.24, 0.16, 0.84), dangerV(0.36, 0.18, 0.84), movingDangerV(0.58, 0.18, 0.82, "x", 0.08, 0.4, 1), dangerH(0.72, 0.18, 0.82, 2), safeV(0.78, 0.22, 0.78)], "endgame-final-prep"),
    90: level(88, 4, "fast", [movingDangerH(0.32, 0.16, 0.84, "y", 0.1, 0), movingDangerV(0.5, 0.16, 0.84, "x", 0.1, 0.35, 1), movingSafeH(0.66, 0.18, 0.82, "y", 0.08, 0.7), dangerV(0.78, 0.22, 0.78, 2), safeV(0.22, 0.22, 0.78)], "endgame-boss"),

    91: level(87, 4, "fast", [movingSafeV(0.3, 0.16, 0.84, "x", 0.08, 0.15), dangerH(0.48, 0.18, 0.82), movingDangerV(0.68, 0.2, 0.8, "x", 0.09, 0.55, 1)], "final-remix-pressure"),
    92: level(87, 4, "medium", [safeH(0.32, 0.16, 0.84), dangerV(0.42, 0.28, 0.72), safeV(0.62, 0.16, 0.84), dangerH(0.7, 0.24, 0.76, 1)], "final-remix-precision"),
    93: level(87, 4, "fast", [movingDangerH(0.38, 0.16, 0.84, "y", 0.1, 0.1), safeV(0.52, 0.18, 0.82), movingDangerH(0.72, 0.16, 0.84, "y", 0.09, 0.6, 1)], "final-remix-speed"),
    94: level(88, 4, "medium", [safeV(0.38, 0.16, 0.84), dangerH(0.36, 0.34, 0.86), safeH(0.58, 0.18, 0.72), dangerV(0.76, 0.22, 0.82, 1)], "final-remix-mind-games"),
    95: level(88, 4, "fast", [movingDangerV(0.34, 0.16, 0.84, "x", 0.1, 0), safeH(0.5, 0.18, 0.82), movingDangerH(0.66, 0.18, 0.82, "y", 0.09, 0.45, 1), safeV(0.82, 0.24, 0.78)], "final-mini-boss"),
    96: level(88, 4, "fast", [safeV(0.5, 0.16, 0.84), dangerH(0.32, 0.18, 0.82), dangerH(0.72, 0.18, 0.82, 1)], "final-high-speed-arena"),
    97: level(88, 4, "fast", [dangerV(0.28, 0.16, 0.84), movingDangerH(0.42, 0.18, 0.82, "y", 0.09, 0.2, 1), safeV(0.54, 0.16, 0.84), movingDangerV(0.76, 0.18, 0.82, "x", 0.08, 0.6, 2)], "final-boss-rush"),
    98: level(88, 4, "fast", [safeH(0.24, 0.16, 0.84), dangerV(0.36, 0.22, 0.78), safeH(0.5, 0.18, 0.82), dangerV(0.64, 0.22, 0.78, 1), safeH(0.76, 0.16, 0.84)], "final-precision-gauntlet"),
    99: level(88, 4, "fast", [movingSafeV(0.28, 0.16, 0.84, "x", 0.08, 0.15), movingDangerH(0.38, 0.16, 0.84, "y", 0.09, 0.35), dangerV(0.58, 0.18, 0.82, 1), movingDangerV(0.76, 0.2, 0.8, "x", 0.08, 0.75, 2), safeH(0.78, 0.2, 0.76)], "final-fake-finale"),
    100: level(88, 4, "fast", [movingSafeV(0.24, 0.16, 0.84, "x", 0.08, 0), movingDangerH(0.34, 0.16, 0.84, "y", 0.1, 0.2), dangerV(0.48, 0.18, 0.82, 1), movingSafeH(0.58, 0.18, 0.82, "y", 0.08, 0.55), movingDangerV(0.72, 0.16, 0.84, "x", 0.1, 0.75, 2), safeH(0.82, 0.18, 0.82)], "final-boss-core-collapse")
  };
<<<<<<< HEAD

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
        { orientation: "vertical", x: 0.36, y1: 0.34, y2: 0.66, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.64, x1: 0.25, x2: 0.75, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
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
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.34, x2: 0.66, type: "moving", safe: false, color: "#8d2454", axis: "y", amplitude: 0.14, phase: 0.35 }],
      purpose: "moving-danger-risk"
    },
    19: {
      target: 79,
      balls: 2,
      speed: "fast",
      obstacles: [
        { orientation: "vertical", x: 0.62, y1: 0.34, y2: 0.66, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.38, x1: 0.35, x2: 0.65, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
      ],
      purpose: "boss-preparation"
    },
    20: {
      target: 80,
      balls: 3,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.5, y1: 0.34, y2: 0.66, type: "moving", safe: false, color: "#8d2454", axis: "x", amplitude: 0.13, phase: 0.15 },
        { orientation: "horizontal", y: 0.34, x1: 0.36, x2: 0.64, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true },
        { orientation: "horizontal", y: 0.68, x1: 0.34, x2: 0.66, type: "static", safe: false, color: "#ff4e7a" }
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
=======

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
        { orientation: "vertical", x: 0.36, y1: 0.34, y2: 0.66, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.64, x1: 0.25, x2: 0.75, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
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
      obstacles: [{ orientation: "horizontal", y: 0.5, x1: 0.34, x2: 0.66, type: "moving", safe: false, color: "#8d2454", axis: "y", amplitude: 0.14, phase: 0.35 }],
      purpose: "moving-danger-risk"
    },
    19: {
      target: 79,
      balls: 2,
      speed: "fast",
      obstacles: [
        { orientation: "vertical", x: 0.62, y1: 0.34, y2: 0.66, type: "static", safe: false, color: "#ff4e7a" },
        { orientation: "horizontal", y: 0.38, x1: 0.35, x2: 0.65, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true }
      ],
      purpose: "boss-preparation"
    },
    20: {
      target: 80,
      balls: 3,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.5, y1: 0.34, y2: 0.66, type: "moving", safe: false, color: "#8d2454", axis: "x", amplitude: 0.13, phase: 0.15 },
        { orientation: "horizontal", y: 0.34, x1: 0.36, x2: 0.64, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true },
        { orientation: "horizontal", y: 0.68, x1: 0.34, x2: 0.66, type: "static", safe: false, color: "#ff4e7a" }
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    27: {
      target: 79,
      balls: 2,
      speed: "medium",
      obstacles: [
        { orientation: "vertical", x: 0.35, y1: 0.26, y2: 0.74, type: "static", safe: true, color: "rgba(173, 246, 255, 0.92)", blocksBall: true },
        { orientation: "horizontal", y: 0.62, x1: 0.2, x2: 0.8, type: "static", safe: false, color: "#8d2454" }
      ],
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    30: {
      target: 78,
      balls: 3,
      speed: "medium",
      obstacles: [
        movingSafeV(0.5, 0.32, 0.68, "x", 0.08, 0.1),
        dangerH(0.66, 0.34, 0.66)
      ],
      purpose: "chapter-three-mini-boss"
    },
    ...curatedProgressionLevelConfigs
  };
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    sdk: null,
    player: null,
    payments: null,
    catalog: {},
    paymentsReady: false,
    paymentsLoading: false,
    cloudSaveTimer: null,
    leaderboardSaveTimer: null,
    localSaveTimer: null,
    initPromise: null,
    readyPromise: null,
    pausedByPlatform: false,
    completedSinceInterstitial: 0,
    lastInterstitialAt: 0,
    lastUserPauseAdAt: 0,
    lang: "ru",
    readySent: false,
    gameplayActive: false,
    stickyBannerVisible: false,
    stickyBannerTimer: null,
    adShowing: false
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      levelFailedTitle: "Попытка провалена",
      lineHitFailure: "Набран максимум штрафов. Попытка потеряна.",
      failedRewardRetry: "Смотреть рекламу и сыграть еще раз",
      failedRewardRetryHint: "Можно посмотреть рекламу и сыграть еще раз без дополнительной жизни.",
      leaveTitle: "Выйти из уровня?",
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    equippedCosmetics: { ...DEFAULT_EQUIPPED_COSMETICS },
    gifts: [],
    unlockedAchievements: new Set(),
    claimedAchievements: new Set(),
    processedIapPurchaseTokens: new Set(),
    inventoryTab: "recommended",
    expandedChapters: new Set([1])
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    toastTimer: null,
    helperHintTimer: null,
    obstacleLegendTimer: null,
    lastCompletion: null,
    replayingCompleted: false,
    pausedByViewport: false,
    fastLineArmed: false,
    lineShieldArmed: false,
    slowBallsUntil: 0,
    targetEaseUsed: false
  };
<<<<<<< HEAD

  let confirmResolve = null;
  let lowPerformanceMode = false;
  let lowPerformanceToastShown = false;
  let lastCanvasPixelWidth = 0;
  let lastCanvasPixelHeight = 0;
  let lastCanvasPixelRatio = 1;
  let backgroundCacheCanvas = null;
=======

  let confirmResolve = null;
  let lowPerformanceMode = false;
  let lowPerformanceToastShown = false;
  let lastCanvasPixelWidth = 0;
  let lastCanvasPixelHeight = 0;
  let lastCanvasPixelRatio = 1;
  let backgroundCacheCanvas = null;
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  let staticLayerCanvas = null;
  let backgroundCacheDirty = true;
  let staticLayerDirty = true;
  const ballSkinImageCache = new Map();
  let layoutRaf = null;
  let layoutObserver = null;
  let lastViewportTooSmall = false;
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    modalFocusStack.push({
      modal,
      previousFocus,
      onEscape: options.onEscape || null
    });
    scheduleStickyBannerSync();
    window.requestAnimationFrame(() => focusModalContent(modal, options.initialFocus));
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (trap.previousFocus?.isConnected) {
      trap.previousFocus.focus({ preventScroll: true });
    }
    scheduleStickyBannerSync();
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const localizeStaticDom = () => {
    document.documentElement.lang = yandexState.lang;
    document.title = t("pageTitle");
    setAttribute("#gameRoot", "aria-label", t("gameRoot"));
    setText(".game-subtitle", t("subtitleStart"));
    const subtitle = document.querySelector(".game-subtitle");
    if (subtitle) {
      const accent = document.createElement("span");
      accent.textContent = t("subtitleAccent");
      subtitle.replaceChildren(document.createTextNode(t("subtitleStart")), accent);
    }
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    setText(".final-card span", t("finalUnlocked"));
    setText(".final-card h2", t("finalTitle"));
    setText(".final-card [data-action='main-menu']", t("toMenu"));
    setText("#confirmTitle", t("confirm"));
    setText("#confirmMessage", t("continue"));
    setText("#confirmCancelButton", t("stay"));
    setText("#confirmAcceptButton", t("yes"));
    setText("#inventoryTitle", t("shop"));
    setAttribute("#inventoryCloseButton", "aria-label", "Закрыть магазин");
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const applyLanguage = (lang) => {
    yandexState.lang = normalizeLanguage(lang);
    localizeStaticDom();
  };

  const getYandexLanguage = () => yandexState.sdk?.environment?.i18n?.lang || FALLBACK_LANGUAGE;

  const waitForWindowReady = () => {
    if (document.readyState === "complete") {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      window.addEventListener("load", resolve, { once: true });
    });
  };

  const waitForImageAsset = (src) => new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const done = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    image.onload = done;
    image.onerror = done;
    image.src = src;
    if (image.complete) {
      done();
      return;
    }
    window.setTimeout(done, 2500);
  });

  const getInitialMenuBackgroundSrc = () => {
    if (window.matchMedia?.("(max-width: 680px) and (orientation: portrait)")?.matches) {
      return "objects/fone/fone_menu_two-mobile.jpg";
    }

    if (isLikelyMobileDevice()) {
      return "objects/fone/fone_menu-mobile.jpg";
    }

    return "objects/fone/fone_menu.png";
  };

  const getBallSkinImageSrc = (skinId) => COSMETIC_GROUPS.balls.items[skinId]?.image || "";

  const getCachedBallSkinImage = (skinId) => {
    const src = getBallSkinImageSrc(skinId);
    if (!src) {
      return null;
    }

    let record = ballSkinImageCache.get(src);
    if (!record) {
      const image = new Image();
      record = { image, loaded: false, failed: false };
      image.onload = () => {
        record.loaded = true;
        if (state.equippedCosmetics.ball === skinId) {
          requestDrawJezzLevel();
        }
      };
      image.onerror = () => {
        record.failed = true;
      };
      image.src = src;
      ballSkinImageCache.set(src, record);
    }

    return record.loaded && !record.failed ? record.image : null;
  };

  const waitForCriticalAssets = () => Promise.all([
    waitForImageAsset(getInitialMenuBackgroundSrc()),
    document.fonts?.ready?.catch?.(() => null) || Promise.resolve()
  ]);

  const markYandexGameReady = async () => {
    if (yandexState.readySent) {
      return;
    }

    if (!yandexState.readyPromise) {
      yandexState.readyPromise = Promise.all([
        waitForWindowReady(),
        waitForCriticalAssets()
      ])
        .then(() => {
          if (yandexState.readySent) {
            return;
          }

          yandexState.sdk?.features?.LoadingAPI?.ready?.();
          yandexState.readySent = true;
        })
        .catch(() => {
          if (yandexState.readySent) {
            return;
          }

          yandexState.sdk?.features?.LoadingAPI?.ready?.();
          yandexState.readySent = true;
        });
    }

    await yandexState.readyPromise;
  };
<<<<<<< HEAD

  const refreshProgressUi = () => {
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

=======

  const refreshProgressUi = () => {
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const initYandexSdk = async () => {
    if (yandexState.sdk) {
      return yandexState.sdk;
    }
    if (yandexState.initPromise) {
      return yandexState.initPromise;
    }
    if (!window.YaGames || typeof window.YaGames.init !== "function") {
      applyLanguage("ru");
      return null;
    }

    yandexState.initPromise = (async () => {
      yandexState.sdk = await window.YaGames.init();
      applyLanguage(getYandexLanguage());
      registerYandexPauseEvents();
      updateLifeRestore();
      renderChapterScreens();
      syncViewportLayoutNow({ resizeLevel: false });
      await markYandexGameReady();
      await initYandexPlayer();
      await initYandexPayments();
      await loadCloudProgress();
      await processPendingYandexPurchases();
      scheduleStickyBannerSync();
      return yandexState.sdk;
    })();

    try {
      return await yandexState.initPromise;
    } catch (_error) {
      yandexState.sdk = null;
      yandexState.initPromise = null;
      applyLanguage("ru");
      return null;
    }
  };

  const initYandexPayments = async () => {
    if (!yandexState.sdk || yandexState.paymentsLoading) {
      return yandexState.payments;
    }
    if (yandexState.payments) {
      return yandexState.payments;
    }
    if (typeof yandexState.sdk.getPayments !== "function") {
      return null;
    }

    yandexState.paymentsLoading = true;
    try {
      const payments = await yandexState.sdk.getPayments();
      yandexState.payments = payments;
      if (typeof payments.getCatalog === "function") {
        const catalog = await payments.getCatalog();
        yandexState.catalog = Object.fromEntries(
          (Array.isArray(catalog) ? catalog : []).map((product) => [product.id, product])
        );
      }
      yandexState.paymentsReady = true;
      return payments;
    } catch (_error) {
      yandexState.payments = null;
      yandexState.catalog = {};
      yandexState.paymentsReady = false;
      return null;
    } finally {
      yandexState.paymentsLoading = false;
    }
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const updateGameplayMarker = (isActive) => {
    if (yandexState.gameplayActive === isActive) {
      return;
    }

<<<<<<< HEAD
    yandexState.gameplayActive = isActive;
    const gameplayApi = yandexState.sdk?.features?.GameplayAPI;
    const method = isActive ? "start" : "stop";

    try {
      gameplayApi?.[method]?.();
    } catch (_error) {
=======
    yandexState.gameplayActive = isActive;
    const gameplayApi = yandexState.sdk?.features?.GameplayAPI;
    const method = isActive ? "start" : "stop";

    try {
      gameplayApi?.[method]?.();
    } catch (_error) {
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      // SDK marker failures should never interrupt the playable loop.
    }
  };

  function setStickyBannerReserve(isVisible) {
    yandexState.stickyBannerVisible = Boolean(isVisible);
    root?.style.setProperty("--sticky-banner-reserve", isVisible ? "56px" : "0px");
    root?.classList.toggle("has-sticky-banner", Boolean(isVisible));
  }

  const isStickyBannerStatusVisible = (status) => Boolean(
    status?.stickyAdvIsShowing
      || status?.bannerAdvIsShowing
      || status?.isShowing
      || status?.visible
  );

  const canShowStickyBanner = () => {
    const activeScreen = document.querySelector(".screen.is-active");
    const activeScreenId = activeScreen?.id || "";
    const allowedScreen = activeScreenId === "main-menu"
      || activeScreenId === "final-screen"
      || activeScreenId.startsWith("chapter-");
    const allowedModal = inventoryModal?.classList.contains("is-open")
      || Boolean(activeAchievementsPanel);

    return (allowedModal || (allowedScreen && !levelScreen.classList.contains("is-active")))
      && !yandexState.adShowing
      && !lastViewportTooSmall;
  };

  async function syncStickyBannerVisibility() {
    const adv = yandexState.sdk?.adv;
    const hasBannerApi = adv
      && typeof adv.showBannerAdv === "function"
      && typeof adv.hideBannerAdv === "function";
    if (!hasBannerApi) {
      setStickyBannerReserve(false);
      return;
    }

    const shouldShow = canShowStickyBanner();
    try {
      if (shouldShow) {
        await adv.showBannerAdv();
        if (typeof adv.getBannerAdvStatus === "function") {
          const status = await adv.getBannerAdvStatus();
          setStickyBannerReserve(isStickyBannerStatusVisible(status));
        } else {
          setStickyBannerReserve(true);
        }
        return;
      }

      await adv.hideBannerAdv();
      setStickyBannerReserve(false);
    } catch (_error) {
      setStickyBannerReserve(false);
    }
  }

  function scheduleStickyBannerSync() {
    window.clearTimeout(yandexState.stickyBannerTimer);
    yandexState.stickyBannerTimer = window.setTimeout(() => {
      yandexState.stickyBannerTimer = null;
      void syncStickyBannerVisibility();
    }, 0);
  }

  const clampChapterId = (chapterId) => Math.min(chapters.length, Math.max(1, chapterId));
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      <div class="resource-strip" aria-label="${t("resources")}">
        <div class="resource-pill resource-counter lives-pill" aria-label="${t("lives")}"><span class="resource-icon" aria-hidden="true">♥</span><span data-resource="lives">5</span><span class="life-restore-timer" data-life-timer hidden>3:00</span></div>
        <div class="resource-pill resource-counter coins-pill" aria-label="${t("coins")}"><span class="resource-icon" aria-hidden="true">●</span><span data-resource="coins">0</span></div>
        <div class="resource-pill resource-counter achievement-button" aria-label="${t("stars")}"><span class="resource-icon" aria-hidden="true">★</span><span data-resource="total-stars">0</span></div>
      </div>
    </header>
  `;
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const createChapterScreen = (chapter) => {
    const screen = document.getElementById(getChapterScreenId(chapter.id));

    screen.setAttribute("aria-label", `${t("chapter")} ${chapter.id} ${getChapterTitle(chapter.id)}`);
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
        <nav class="chapter-action-bar" aria-label="${t("shopAndAchievements")}">
          <button class="shop-button" type="button" data-action="shop"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14.26c-.75 0-1.41-.41-1.75-1.03L2 6.2V5h3.21l.94 2h12.9c.75 0 1.24.78.92 1.45l-2.42 5.05A2 2 0 0 1 15.74 14H8.1l-1.1 2h12v2H7c-1.52 0-2.48-1.63-1.75-2.96l1.03-1.86-.12-.24ZM7.1 9l1.42 3h7.22l1.44-3H7.1Z"/></svg>${t("shop")}<span class="inventory-badge shop-badge" hidden>0</span></button>
          <button type="button" data-action="achievements"><span aria-hidden="true">★</span>${t("achievements")}</button>
        </nav>
      </div>
    `;
    screen.dataset.rendered = "true";
  };

  const renderChapterScreen = (chapterId, { force = false } = {}) => {
    const chapter = getChapter(chapterId);
    const screen = chapter ? document.getElementById(getChapterScreenId(chapter.id)) : null;

    if (!chapter || !screen) {
      return;
    }

    if (force || screen.dataset.rendered !== "true") {
      createChapterScreen(chapter);
    }
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const getViewportSize = () => {
    const viewport = window.visualViewport;
    return {
      width: Math.max(1, Math.round(viewport?.width || window.innerWidth || document.documentElement.clientWidth || 1)),
      height: Math.max(1, Math.round(viewport?.height || window.innerHeight || document.documentElement.clientHeight || 1))
    };
  };

  const syncViewportVars = () => {
    const { width, height } = getViewportSize();
    document.documentElement.style.setProperty("--viewport-width", `${width}px`);
    document.documentElement.style.setProperty("--viewport-height", `${height}px`);
    root.style.setProperty("--viewport-width", `${width}px`);
    root.style.setProperty("--viewport-height", `${height}px`);
    return { width, height };
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const pressedFeedbackButtons = new WeakSet();

  const syncLevelBoostButtons = () => {
    Object.entries(BOOSTER_ITEMS).forEach(([key, booster]) => {
      document.querySelectorAll(`[data-level-boost="${key}"]`).forEach((button) => {
        const icon = button.querySelector(".boost-icon");
        const label = button.querySelector(".boost-label");
        if (icon) {
          icon.textContent = booster.icon;
        }
        if (label) {
          label.textContent = booster.title;
          label.dataset.fullLabel = booster.title;
        }
        button.setAttribute("aria-label", `${booster.title}. ${booster.description}`);
      });
    });
  };

  const renderChapterScreens = () => {
    renderChapterScreen(state.currentChapter || getChapterForLevel(state.currentLevel), { force: true });
    renderAllChapters();
    syncLevelBoostButtons();
    document.querySelectorAll("button").forEach(setPressedFeedback);
    updateInventoryBadge();
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    document.querySelectorAll(".screen").forEach((screen) => {
      const isActive = screen.id === screenId;
      screen.classList.toggle("is-active", isActive);
      screen.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
    scheduleStickyBannerSync();
  }
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      }))
    : [];

  const normalizeAchievementIds = (savedIds) => new Set(
    (Array.isArray(savedIds) ? savedIds : [])
      .map((id) => String(id))
      .filter((id) => ACHIEVEMENT_IDS.has(id))
  );

  const normalizeIapPurchaseTokens = (savedTokens) => new Set(
    (Array.isArray(savedTokens) ? savedTokens : [])
      .map((token) => String(token || "").trim())
      .filter(Boolean)
      .slice(-MAX_PROCESSED_IAP_PURCHASE_TOKENS)
  );

  const serializeProgress = () => ({
<<<<<<< HEAD
    currentChapter: state.currentChapter,
    currentLevel: state.currentLevel,
    selectedLevel: state.selectedLevel,
=======
    currentChapter: state.currentChapter,
    currentLevel: state.currentLevel,
    selectedLevel: state.selectedLevel,
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    coins: state.coins,
    lives: state.lives,
    nextLifeAt: state.nextLifeAt,
    starsByLevel: state.starsByLevel,
<<<<<<< HEAD
    perfectChapters: Array.from(state.perfectChapters),
    chapterChests: serializeChapterChests(),
    boosters: state.boosters,
    selectedBoosters: state.selectedBoosters,
=======
    perfectChapters: Array.from(state.perfectChapters),
    chapterChests: serializeChapterChests(),
    boosters: state.boosters,
    selectedBoosters: state.selectedBoosters,
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    cosmetics: state.cosmetics,
    equippedCosmetics: state.equippedCosmetics,
    gifts: state.gifts,
    unlockedAchievements: Array.from(state.unlockedAchievements),
    claimedAchievements: Array.from(state.claimedAchievements),
    processedIapPurchaseTokens: Array.from(state.processedIapPurchaseTokens).slice(-MAX_PROCESSED_IAP_PURCHASE_TOKENS),
    expandedChapters: Array.from(state.expandedChapters)
  });
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    state.coins = Math.max(0, Math.round(Number(saved.coins) || 0));
    state.lives = Math.max(0, Math.min(MAX_LIVES, Math.round(Number(saved.lives) || 0)));
    state.nextLifeAt = Number.isFinite(Number(saved.nextLifeAt)) ? Number(saved.nextLifeAt) : null;
    state.starsByLevel = normalizeStarsByLevel(saved.starsByLevel);
<<<<<<< HEAD
    state.perfectChapters = new Set(
      Array.isArray(saved.perfectChapters)
        ? saved.perfectChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : []
    );
    state.chapterChests = migrateChapterChests(saved);
    state.boosters = normalizeBoosters(saved.boosters);
    state.selectedBoosters = normalizeSelectedBoosters(saved.selectedBoosters);
    state.cosmetics = normalizeCosmetics(saved.cosmetics);
=======
    state.perfectChapters = new Set(
      Array.isArray(saved.perfectChapters)
        ? saved.perfectChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : []
    );
    state.chapterChests = migrateChapterChests(saved);
    state.boosters = normalizeBoosters(saved.boosters);
    state.selectedBoosters = normalizeSelectedBoosters(saved.selectedBoosters);
    state.cosmetics = normalizeCosmetics(saved.cosmetics);
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    state.equippedCosmetics = normalizeEquippedCosmetics(saved.equippedCosmetics, state.cosmetics);
    state.gifts = normalizeGifts(saved.gifts);
    state.unlockedAchievements = normalizeAchievementIds(saved.unlockedAchievements);
    state.claimedAchievements = normalizeAchievementIds(saved.claimedAchievements);
    state.processedIapPurchaseTokens = normalizeIapPurchaseTokens(saved.processedIapPurchaseTokens);
    state.expandedChapters = new Set(
<<<<<<< HEAD
      Array.isArray(saved.expandedChapters)
        ? saved.expandedChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : [getChapterForLevel(state.currentLevel)]
=======
      Array.isArray(saved.expandedChapters)
        ? saved.expandedChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
        : [getChapterForLevel(state.currentLevel)]
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    );
    state.expandedChapters.add(getChapterForLevel(state.currentLevel));
    evaluateAchievements();
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      state.selectedBoosters = [...DEFAULT_SELECTED_BOOSTERS];
      state.cosmetics = normalizeCosmetics();
      state.equippedCosmetics = normalizeEquippedCosmetics({}, state.cosmetics);
      state.gifts = [];
      state.processedIapPurchaseTokens = new Set();
      state.expandedChapters = new Set([getChapterForLevel(state.currentLevel)]);
    }
  };

  const pauseJezzLevelForModal = () => {
    if (levelState.running && levelScreen.classList.contains("is-active")) {
      levelState.running = false;
      levelState.pausedByModal = true;
      updateGameplayMarker(false);
      if (levelState.animationId) {
        window.cancelAnimationFrame(levelState.animationId);
        levelState.animationId = null;
      }
    }
  };

  const resumeJezzLevelFromModal = () => {
    if (levelState.pausedByModal && !levelState.completed && !levelState.failed && levelScreen.classList.contains("is-active") && !lastViewportTooSmall && !yandexState.pausedByPlatform && !modalFocusStack.length) {
      levelState.pausedByModal = false;
      levelState.running = true;
      levelState.lastFrameAt = performance.now();
      updateGameplayMarker(true);
      if (!levelState.animationId) {
        levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
      }
      return;
    }

    levelState.pausedByModal = false;
  };

  const showConfirm = ({ title, message, acceptText = t("yes"), cancelText = t("stay") }) => {
<<<<<<< HEAD
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
    pauseJezzLevelForModal();
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
    resumeJezzLevelFromModal();
    const resolve = confirmResolve;
    confirmResolve = null;
    resolve(result);
  };

  const getRewardLineMarkup = (reward) => `
    <div class="chapter-chest-reward-line chapter-chest-reward-line-coin"><span aria-hidden="true">●</span><strong>+${reward.coins}</strong> монет</div>
    ${reward.lives > 0 ? `<div class="chapter-chest-reward-line chapter-chest-reward-line-life"><span aria-hidden="true">♥</span><strong>+${reward.lives}</strong> жизней</div>` : ""}
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

=======
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
    pauseJezzLevelForModal();
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
    resumeJezzLevelFromModal();
    const resolve = confirmResolve;
    confirmResolve = null;
    resolve(result);
  };

  const getRewardLineMarkup = (reward) => `
    <div class="chapter-chest-reward-line chapter-chest-reward-line-coin"><span aria-hidden="true">●</span><strong>+${reward.coins}</strong> монет</div>
    ${reward.lives > 0 ? `<div class="chapter-chest-reward-line chapter-chest-reward-line-life"><span aria-hidden="true">♥</span><strong>+${reward.lives}</strong> жизней</div>` : ""}
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const showChapterChestClaimPanel = (chapterId) => new Promise((resolve) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      resolve(null);
      return;
    }

    const panel = document.createElement("div");
    panel.className = "chapter-chest-panel chapter-chest-reward-panel is-visible";
    panel.id = "chapterChestPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    let result = null;
    panel.innerHTML = `
      <div class="chapter-chest-card chapter-chest-reward-card">
        <button class="reward-close chapter-chest-reward-close" type="button" aria-label="Закрыть">×</button>
        <div class="chapter-chest-icon" aria-hidden="true">🎁</div>
        <h2>Ваша награда</h2>
        <p>Глава ${chapterId}</p>
        <div class="chapter-chest-rewards">${getRewardLineMarkup(reward)}</div>
        <button class="menu-button play-button compact-play chapter-chest-claim" type="button">Получить</button>
      </div>
    `;

    const close = () => {
      deactivateModalFocus(panel);
      panel.remove();
      resolve(result);
    };

    panel.querySelector(".chapter-chest-claim")?.addEventListener("click", () => {
      result = openChapterChest(chapterId, { silent: true });
      const claimButton = panel.querySelector(".chapter-chest-claim");
      if (claimButton) {
        claimButton.textContent = "Награда получена";
        claimButton.disabled = true;
        claimButton.classList.add("is-claimed");
      }
    }, { once: true });
    panel.querySelector(".chapter-chest-reward-close")?.addEventListener("click", close, { once: true });
    root.append(panel);
    activateModalFocus(panel, {
      initialFocus: panel.querySelector(".chapter-chest-claim")
    });
  });
<<<<<<< HEAD

  const openChapterChest = (chapterId, options = {}) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      return null;
    }

=======

  const openChapterChest = (chapterId, options = {}) => {
    const reward = getPendingChestReward(chapterId);
    if (!reward.hasReward) {
      return null;
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const previousLives = state.lives;
    state.coins += reward.coins;
    state.lives = Math.min(MAX_LIVES, state.lives + reward.lives);
    ensureChapterChest(chapterId).claimedTier = ensureChapterChest(chapterId).earnedTier;
    evaluateAchievements();
    saveProgressImmediate();
    syncResources();
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const totalLives = pending.reduce((sum, reward) => sum + reward.lives, 0);
    state.coins += totalCoins;
    state.lives = Math.min(MAX_LIVES, state.lives + totalLives);
    pending.forEach((reward) => {
      ensureChapterChest(reward.chapterId).claimedTier = ensureChapterChest(reward.chapterId).earnedTier;
    });
    evaluateAchievements();
    saveProgressImmediate();
    syncResources();
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
        ${pending.length > 1 ? `<button class="menu-button play-button compact-play chapter-open-all" type="button">Получить все</button>` : ""}
        <div class="chapter-chests-list">
          ${pending.length
            ? pending.map((reward) => `
              <article class="chapter-chest-item">
                <h3>${reward.claimedTier > CHEST_TIERS.none ? `Апгрейд сундука главы ${reward.chapterId}` : `Глава ${reward.chapterId}`}</h3>
                <p>${reward.claimedTier > CHEST_TIERS.none
                  ? `Улучшен до: ${reward.nextTitle}`
                  : `Награда: ${reward.nextTitle}`}</p>
                <p>Звёзды главы: ${getChapterStars(reward.chapterId)} / 30</p>
                <button class="menu-button play-button compact-play" type="button" data-open-chest="${reward.chapterId}">Получить</button>
              </article>
            `).join("")
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      if (completedChapterFinal && completedLevel < TOTAL_LEVELS) {
        if (completedChapterId === 2) {
          state.expandedChapters.delete(completedChapterId);
        }
        state.expandedChapters.add(completedNextChapterId);
        state.currentChapter = completedNextChapterId;
      }
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const getEarnedStars = () => Object.values(state.starsByLevel).reduce((sum, stars) => sum + (Number(stars) || 0), 0);

  const getPerfectLevelCount = () => Object.values(state.starsByLevel)
    .filter((stars) => Number(stars) >= 3)
    .length;

  const getPerfectChapterCount = () => chapters.reduce((count, chapter) => (
    getChapterStars(chapter.id) >= 30 ? count + 1 : count
  ), 0);

  const getClaimedChapterChestCount = () => chapters.reduce((count, chapter) => {
    const chest = state.chapterChests[chapter.id];
    return count + (Number(chest?.claimedTier) > CHEST_TIERS.none ? 1 : 0);
  }, 0);

  const getPaidCosmeticCount = () => Object.entries(COSMETIC_GROUPS).reduce((count, [group]) => {
    const owned = Array.isArray(state.cosmetics[group]) ? state.cosmetics[group] : [];
    const defaults = new Set(DEFAULT_COSMETICS[group] || []);
    return count + owned.filter((skinId) => !defaults.has(skinId)).length;
  }, 0);

  const getTotalBoosterCount = () => Object.values(state.boosters).reduce((sum, count) => (
    sum + Math.max(0, Math.round(Number(count) || 0))
  ), 0);

  const getAchievementProgress = (achievement) => {
    const target = Math.max(1, Math.round(Number(achievement.target) || 1));
    const rawValue = Math.max(0, Math.round(Number(achievement.getValue?.() || 0)));
    const value = Math.min(target, rawValue);
    const claimed = state.claimedAchievements.has(achievement.id);
    const unlocked = claimed || state.unlockedAchievements.has(achievement.id) || value >= target;
    return {
      value,
      target,
      percent: Math.min(100, Math.round((value / target) * 100)),
      unlocked,
      claimed,
      ready: unlocked && !claimed
    };
  };

  const evaluateAchievements = (options = {}) => {
    let changed = false;
    ACHIEVEMENTS.forEach((achievement) => {
      const progress = getAchievementProgress(achievement);
      if (progress.unlocked && !state.unlockedAchievements.has(achievement.id)) {
        state.unlockedAchievements.add(achievement.id);
        changed = true;
      }
    });

    if (changed && options.save) {
      saveProgress();
    }
    return changed;
  };

  const getClaimableAchievementCount = () => {
    evaluateAchievements();
    return ACHIEVEMENTS.reduce((count, achievement) => (
      count + (state.unlockedAchievements.has(achievement.id) && !state.claimedAchievements.has(achievement.id) ? 1 : 0)
    ), 0);
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const formatLifeRestoreTime = (ms) => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const getTrustedNow = () => {
    if (yandexState.sdk && typeof yandexState.sdk.serverTime === "function") {
      try {
        const serverNow = Number(yandexState.sdk.serverTime());
        if (Number.isFinite(serverNow)) {
          return serverNow;
        }
      } catch (_error) {
        // Local development and older SDK mocks can safely fall back to device time.
      }
    }

    return Date.now();
  };
<<<<<<< HEAD

  const syncLifeRestoreTimer = () => {
    const showTimer = Boolean(state.nextLifeAt && state.lives < MAX_LIVES);
    const text = showTimer ? formatLifeRestoreTime(state.nextLifeAt - getTrustedNow()) : "";

    document.querySelectorAll("[data-life-timer]").forEach((node) => {
      node.hidden = !showTimer;
      setTextIfChanged(node, text);
    });
  };

=======

  const syncLifeRestoreTimer = () => {
    const showTimer = Boolean(state.nextLifeAt && state.lives < MAX_LIVES);
    const text = showTimer ? formatLifeRestoreTime(state.nextLifeAt - getTrustedNow()) : "";

    document.querySelectorAll("[data-life-timer]").forEach((node) => {
      node.hidden = !showTimer;
      setTextIfChanged(node, text);
    });
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const syncResources = () => {
    state.achievements = getEarnedStars();
    state.lives = Math.min(MAX_LIVES, Math.max(0, state.lives));
    state.coins = Math.max(0, state.coins);
    evaluateAchievements();
    const slowActive = getTrustedNow() < levelState.slowBallsUntil;

    document.querySelectorAll('[data-resource="coins"]').forEach((node) => {
      setTextIfChanged(node, state.coins);
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    });
    Object.keys(DEFAULT_BOOSTERS).forEach((key) => {
      const count = Math.max(0, Math.round(Number(state.boosters[key]) || 0));
      const isArmed = (key === "fastLine" && levelState.fastLineArmed) || (key === "lineShield" && levelState.lineShieldArmed);
      const isActive = (key === "slowBalls" && slowActive) || (key === "targetEase" && levelState.targetEaseUsed);
      document.querySelectorAll(`[data-booster-count="${key}"]`).forEach((node) => {
        setTextIfChanged(node, `x${count}`);
      });
      document.querySelectorAll(`[data-level-boost="${key}"]`).forEach((button) => {
        button.disabled = count <= 0 && !isArmed && !isActive;
        button.classList.toggle("is-empty", count <= 0);
        button.classList.toggle("is-armed", isArmed);
        button.classList.toggle("is-active", isActive);
      });
    });
    syncLevelBoostButtons();
    syncLifeRestoreTimer();
<<<<<<< HEAD
    updateInventoryBadge();
    saveProgress();
  };

  const restoreLife = () => {
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncResources();
      return;
    }

=======
    updateInventoryBadge();
    saveProgress();
  };

  const restoreLife = () => {
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncResources();
      return;
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    state.lives += 1;
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
    } else if (!state.nextLifeAt) {
      state.nextLifeAt = getTrustedNow() + LIFE_RESTORE_MS;
<<<<<<< HEAD
    }
    syncResources();
  };

  const updateLifeRestore = () => {
    if (!state.nextLifeAt || state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncLifeRestoreTimer();
      return;
    }

    const now = getTrustedNow();
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
      state.nextLifeAt = getTrustedNow() + LIFE_RESTORE_MS;
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

=======
    }
    syncResources();
  };

  const updateLifeRestore = () => {
    if (!state.nextLifeAt || state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncLifeRestoreTimer();
      return;
    }

    const now = getTrustedNow();
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
      state.nextLifeAt = getTrustedNow() + LIFE_RESTORE_MS;
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const showLevelToast = (message) => {
    if (!levelToast) {
      return;
    }
<<<<<<< HEAD

    levelToast.textContent = message;
    levelToast.classList.add("is-visible");
    window.clearTimeout(levelState.toastTimer);
    levelState.toastTimer = window.setTimeout(() => {
      levelToast.classList.remove("is-visible");
=======

    levelToast.textContent = message;
    levelToast.classList.add("is-visible");
    window.clearTimeout(levelState.toastTimer);
    levelState.toastTimer = window.setTimeout(() => {
      levelToast.classList.remove("is-visible");
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    }, 1100);
  };

  const escapeHtml = (value) => String(value)
<<<<<<< HEAD
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const getChapterChestName = (chapterId, isUpgrade = false) => {
    const title = getChapterTitle(chapterId);
    return isUpgrade ? `Сундук ${title} улучшен!` : `Сундук ${title}`;
  };

=======
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const getChapterChestName = (chapterId, isUpgrade = false) => {
    const title = getChapterTitle(chapterId);
    return isUpgrade ? `Сундук ${title} улучшен!` : `Сундук ${title}`;
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const formatRewardText = ({ coins = 0, lives = 0, boosters = {} }) => {
    const parts = [];
    if (coins > 0) {
      parts.push(`+${coins} монет`);
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    });
    return parts.length ? parts.join(", ") : "Бонус";
  };

  const cloneShopReward = (reward = {}) => ({
    coins: Math.max(0, Math.round(Number(reward.coins) || 0)),
    lives: Math.max(0, Math.round(Number(reward.lives) || 0)),
    boosters: { ...(reward.boosters || {}) },
    cosmetics: reward.cosmetics ? { ...reward.cosmetics } : undefined
  });

  const rollShopChestReward = (chestId) => {
    const chest = SHOP_CHEST_ITEMS[chestId];
    const drops = Array.isArray(chest?.drops) ? chest.drops : [];
    const totalChance = drops.reduce((sum, drop) => sum + Math.max(0, Number(drop.chance) || 0), 0);
    if (!chest || !totalChance) {
      return null;
    }

    let roll = Math.random() * totalChance;
    const selectedDrop = drops.find((drop) => {
      roll -= Math.max(0, Number(drop.chance) || 0);
      return roll < 0;
    }) || drops[drops.length - 1];

    const reward = cloneShopReward(selectedDrop.reward);
    return {
      chestId,
      chestTitle: chest.title,
      icon: chest.icon,
      chance: selectedDrop.chance,
      reward,
      rewardText: formatRewardText(reward)
    };
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
    document.querySelectorAll(".shop-button").forEach((button) => {
      button.classList.toggle("has-pending-chests", hasPendingChests);
    });
    document.querySelectorAll('[data-inventory-tab="chests"]').forEach((button) => {
      button.classList.toggle("has-pending-chests", hasPendingChests);
    });
    inventoryModal?.classList.toggle("has-pending-chests", hasPendingChests);
  };

  const SHOP_NOT_ENOUGH_COINS_TEXT = "Не хватает монет";

  const formatPrice = (price) => `<span class="shop-price"><span aria-hidden="true">●</span>${price}</span>`;

  const canAffordShopItem = (price) => state.coins >= Math.max(0, Math.round(Number(price) || 0));

  const getCoinPurchaseButtonText = (price) => (
    canAffordShopItem(price) ? formatPrice(price) : SHOP_NOT_ENOUGH_COINS_TEXT
  );

  const canUseRewardedAd = () => Boolean(yandexState.sdk?.adv && typeof yandexState.sdk.adv.showRewardedVideo === "function");

  const getShopProduct = (id) => yandexState.catalog?.[id] || null;

  const hasAvailableIapCatalog = () => (
    yandexState.paymentsReady
    && Object.keys(SHOP_IAP_REWARDS).some((id) => Boolean(getShopProduct(id)))
  );

  const getVisibleShopTabs = () => SHOP_TABS.filter((tab) => tab !== "coins" || hasAvailableIapCatalog());

  const resolveShopTab = (tab) => (getVisibleShopTabs().includes(tab) ? tab : "recommended");

  const getProductPriceMarkup = (id) => {
    const product = getShopProduct(id);
    if (!product) {
      return "Скоро";
    }
    const image = typeof product.getPriceCurrencyImage === "function"
      ? product.getPriceCurrencyImage("small")
      : "";
    return `
      ${image ? `<img class="shop-yan-icon" src="${escapeHtml(image)}" alt="" aria-hidden="true">` : ""}
      ${escapeHtml(product.price || product.priceValue || "Купить")}
    `;
  };

  const addBoosters = (boosters = {}) => {
    Object.entries(boosters || {}).forEach(([key, count]) => {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_BOOSTERS, key)) {
        state.boosters[key] = Math.max(0, Math.round(Number(state.boosters[key]) || 0))
          + Math.max(0, Math.round(Number(count) || 0));
      }
    });
  };

  const grantShopReward = (reward = {}) => {
    state.coins += Math.max(0, Math.round(Number(reward.coins) || 0));
    state.lives = Math.min(MAX_LIVES, state.lives + Math.max(0, Math.round(Number(reward.lives) || 0)));
    addBoosters(reward.boosters);
    addGiftCosmetics(reward.cosmetics);
    syncResources();
    saveProgressImmediate({ flushCloud: true });
    renderInventory();
  };

  let activeShopChestResultPanel = null;

  const closeShopChestResult = () => {
    if (!activeShopChestResultPanel) {
      return;
    }
    const panel = activeShopChestResultPanel;
    activeShopChestResultPanel = null;
    deactivateModalFocus(panel);
    panel.remove();
  };

  const grantRolledChestReward = (rolledReward = {}) => {
    grantShopReward(rolledReward.reward || rolledReward);
  };

  const showShopChestResult = (rolledReward) => {
    if (!rolledReward || activeShopChestResultPanel) {
      return;
    }

    const panel = document.createElement("div");
    panel.className = "shop-chest-result-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Результат сундука");
    panel.innerHTML = `
      <div class="shop-chest-result-card">
        <div class="shop-chest-result-icon" aria-hidden="true">${escapeHtml(rolledReward.icon || "▣")}</div>
        <p class="shop-chest-result-kicker">Выпало из сундука</p>
        <h3>${escapeHtml(rolledReward.chestTitle || "Сундук")}</h3>
        <div class="shop-chest-result-reward">${escapeHtml(rolledReward.rewardText || formatRewardText(rolledReward.reward || {}))}</div>
        <button class="menu-button play-button compact-play shop-chest-result-claim" type="button">Забрать</button>
      </div>
    `;

    const claimButton = panel.querySelector(".shop-chest-result-claim");
    claimButton?.addEventListener("click", () => {
      if (claimButton.disabled) {
        return;
      }
      claimButton.disabled = true;
      grantRolledChestReward(rolledReward);
      closeShopChestResult();
    }, { once: true });

    activeShopChestResultPanel = panel;
    (inventoryModal || document.body).append(panel);
    activateModalFocus(panel, {
      initialFocus: claimButton
    });
  };

  const showShopNotice = (message) => {
    showConfirm({
      title: t("shop"),
      message,
      acceptText: t("ok"),
      cancelText: null
    });
  };

  const spendCoins = (price) => {
    if (!canAffordShopItem(price)) {
      return false;
    }
    state.coins -= Math.max(0, Math.round(Number(price) || 0));
    return true;
  };

  const buyBooster = (key) => {
    const price = SHOP_BOOSTER_PRICES[key];
    if (!price || !spendCoins(price)) {
      return;
    }
    addBoosters({ [key]: 1 });
    syncResources();
    saveProgressImmediate({ flushCloud: true });
    renderInventory();
  };

  const getMissingLives = () => Math.max(0, MAX_LIVES - state.lives);

  const isLifeItemUseful = (item) => {
    const missingLives = getMissingLives();
    if (missingLives <= 0) {
      return false;
    }
    if (item.fullRestore) {
      return missingLives >= 4;
    }
    return Math.max(0, Math.round(Number(item.lives) || 0)) <= missingLives;
  };

  const buyLifeItem = (id) => {
    const item = SHOP_LIFE_ITEMS[id];
    if (!item) {
      return;
    }
    const missingLives = getMissingLives();
    if (missingLives <= 0) {
      showShopNotice(t("livesFull"));
      return;
    }
    if (!isLifeItemUseful(item)) {
      showShopNotice("Выберите меньший набор жизней.");
      return;
    }
    if (!spendCoins(item.price)) {
      return;
    }
    state.lives = item.fullRestore ? MAX_LIVES : Math.min(MAX_LIVES, state.lives + item.lives);
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
    }
    syncResources();
    saveProgressImmediate({ flushCloud: true });
    renderInventory();
  };

  const buyShopChest = (id) => {
    const item = SHOP_CHEST_ITEMS[id];
    if (!item || activeShopChestResultPanel || !spendCoins(item.price)) {
      return;
    }
    const rolledReward = rollShopChestReward(id);
    if (!rolledReward) {
      state.coins += item.price;
      syncResources();
      showShopNotice("Сундук временно недоступен.");
      return;
    }
    syncResources();
    renderInventory();
    showShopChestResult(rolledReward);
  };

  const buySkin = (group, skinId) => {
    const config = COSMETIC_GROUPS[group];
    const price = SHOP_SKIN_PRICES[group]?.[skinId];
    if (!config || !price) {
      return;
    }
    if (state.cosmetics[group]?.includes(skinId)) {
      equipSkin(group, skinId);
      return;
    }
    if (!spendCoins(price)) {
      return;
    }
    state.cosmetics[group].push(skinId);
    state.equippedCosmetics[config.equippedKey] = skinId;
    syncResources();
    saveProgressImmediate({ flushCloud: true });
    staticLayerDirty = true;
    requestDrawJezzLevel();
    renderInventory();
  };

  const spendBooster = (key) => {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_BOOSTERS, key)) {
      return false;
    }
    const count = Math.max(0, Math.round(Number(state.boosters[key]) || 0));
    if (count <= 0) {
      showLevelToast("Этот буст закончился");
      syncResources();
      return false;
    }
    state.boosters[key] = count - 1;
    saveProgressImmediate({ flushCloud: true });
    return true;
  };

  const useLevelBooster = (key) => {
    if (!levelScreen.classList.contains("is-active") || !levelState.running || levelState.completed || levelState.failed) {
      return;
    }

    if (key === "fastLine") {
      if (levelState.fastLineArmed) {
        showLevelToast("Быстрая линия уже готова");
        return;
      }
      if (!spendBooster(key)) {
        return;
      }
      levelState.fastLineArmed = true;
      showLevelToast("Следующая линия будет быстрее");
    } else if (key === "slowBalls") {
      if (getTrustedNow() < levelState.slowBallsUntil && Math.max(0, Math.round(Number(state.boosters[key]) || 0)) <= 0) {
        showLevelToast("Шары уже замедлены");
        return;
      }
      if (!spendBooster(key)) {
        return;
      }
      levelState.slowBallsUntil = Math.max(levelState.slowBallsUntil, getTrustedNow()) + SLOW_BALLS_DURATION_MS;
      showLevelToast("Шары замедлены на 6 секунд");
    } else if (key === "lineShield") {
      if (levelState.lineShieldArmed) {
        showLevelToast("Щит уже готов");
        return;
      }
      if (!spendBooster(key)) {
        return;
      }
      levelState.lineShieldArmed = true;
      showLevelToast("Щит защитит следующую линию");
    } else if (key === "targetEase") {
      if (levelState.targetEaseUsed) {
        showLevelToast("Фокус уже применён");
        return;
      }
      if (!spendBooster(key)) {
        return;
      }
      levelState.target = Math.max(50, levelState.target - TARGET_EASE_PERCENT);
      levelState.targetEaseUsed = true;
      syncLevelHud();
      showLevelToast(`Цель снижена до ${levelState.target}%`);
      if (getCaptureRatio() * 100 >= levelState.target) {
        finishJezzLevel();
      }
    } else if (key === "penaltyRepair") {
      if (levelState.penalties <= 0) {
        showLevelToast("Штрафов пока нет");
        return;
      }
      if (!spendBooster(key)) {
        return;
      }
      levelState.penalties = Math.max(0, levelState.penalties - 1);
      syncLevelHud();
      showLevelToast("Один штраф убран");
    }

    syncResources();
    requestDrawJezzLevel();
  };

  const getYandexPurchaseProductId = (purchase) => purchase?.productID || purchase?.productId || purchase?.id || "";

  const getYandexPurchaseToken = (purchase) => String(purchase?.purchaseToken || "").trim();

  const isIapPurchaseTokenProcessed = (token) => Boolean(token && state.processedIapPurchaseTokens.has(token));

  const markIapPurchaseTokenProcessed = (token) => {
    if (!token) {
      return;
    }

    state.processedIapPurchaseTokens.add(token);
    while (state.processedIapPurchaseTokens.size > MAX_PROCESSED_IAP_PURCHASE_TOKENS) {
      const oldestToken = state.processedIapPurchaseTokens.values().next().value;
      state.processedIapPurchaseTokens.delete(oldestToken);
    }
  };

  const grantIapPurchase = async (productId, purchaseToken = "") => {
    const config = SHOP_IAP_REWARDS[productId];
    if (!config) {
      return false;
    }
    if (isIapPurchaseTokenProcessed(purchaseToken)) {
      return true;
    }
    markIapPurchaseTokenProcessed(purchaseToken);
    grantShopReward(config.reward);
    return true;
  };

  const consumeYandexPurchase = async (purchase) => {
    const token = getYandexPurchaseToken(purchase);
    if (!token || !yandexState.payments || typeof yandexState.payments.consumePurchase !== "function") {
      return false;
    }

    try {
      await yandexState.payments.consumePurchase(token);
      return true;
    } catch (_error) {
      // The purchase will be retried by getPurchases() on the next launch.
      return false;
    }
  };

  const processPendingYandexPurchases = async () => {
    const payments = yandexState.payments || await initYandexPayments();
    if (!payments || typeof payments.getPurchases !== "function") {
      return;
    }

    try {
      const purchases = await payments.getPurchases();
      for (const purchase of Array.isArray(purchases) ? purchases : []) {
        const purchaseToken = getYandexPurchaseToken(purchase);
        if (isIapPurchaseTokenProcessed(purchaseToken)) {
          await consumeYandexPurchase(purchase);
          continue;
        }

        const productId = getYandexPurchaseProductId(purchase);
        if (await grantIapPurchase(productId, purchaseToken)) {
          await consumeYandexPurchase(purchase);
        }
      }
    } catch (_error) {
      // Payment recovery is best effort and must not block the game launch.
    }
  };

  const buyIapProduct = async (productId) => {
    const product = getShopProduct(productId);
    const payments = yandexState.payments || await initYandexPayments();
    if (!product || !payments || typeof payments.purchase !== "function") {
      showShopNotice("Покупка пока недоступна.");
      renderInventory();
      return;
    }

    try {
      const purchase = await payments.purchase({ id: productId });
      if (await grantIapPurchase(productId, getYandexPurchaseToken(purchase))) {
        await consumeYandexPurchase(purchase);
        renderInventory();
      }
    } catch (_error) {
      showShopNotice("Покупка не завершена.");
    }
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const renderShopCard = ({
    classes = "",
    image = "",
    icon = "◆",
    title,
    description,
    meta = "",
    action = "",
    disabled = false,
    featured = false,
    buttonText = ""
  }) => `
    <article class="inventory-card shop-card ${classes} ${featured ? "is-featured" : ""}">
      <div class="inventory-card-icon shop-card-icon" aria-hidden="true">${image ? `<img class="shop-card-image" src="${escapeHtml(image)}" alt="">` : icon}</div>
      <div class="inventory-card-body">
        <h3>${title}</h3>
        ${description ? `<p>${description}</p>` : ""}
        ${meta ? `<p class="inventory-status">${meta}</p>` : ""}
      </div>
      ${action ? `<button class="menu-button play-button compact-play shop-buy-button" type="button" ${disabled ? "disabled" : ""} ${action}>${buttonText || (disabled ? "Недоступно" : "")}</button>` : ""}
    </article>
  `;

  const renderCoinButton = (action, price, disabled = false) => {
    const isDisabled = disabled || !canAffordShopItem(price);
    return `<button class="menu-button play-button compact-play shop-buy-button" type="button" ${isDisabled ? "disabled" : ""} ${action}>${disabled ? "Недоступно" : getCoinPurchaseButtonText(price)}</button>`;
  };

  const renderInventoryChests = () => {
    const pending = getPendingChests();
    const shopChests = `
      <div class="shop-section-title"><span aria-hidden="true">★</span><h3>Сундуки магазина</h3></div>
      <div class="inventory-card-list shop-grid">
        ${Object.entries(SHOP_CHEST_ITEMS).map(([id, item]) => renderShopCard({
          classes: `chest-card chest-${id}`,
          icon: item.icon,
          title: escapeHtml(item.title),
          description: "Случайная награда",
          meta: item.recommended ? "Рекомендуем" : "",
          featured: item.recommended,
          action: `data-inventory-action="buy-chest" data-chest-id="${id}"`,
          disabled: !canAffordShopItem(item.price),
          buttonText: getCoinPurchaseButtonText(item.price)
        })).join("")}
      </div>
    `;

    if (!pending.length) {
      return `
        ${shopChests}
        <div class="inventory-empty">
          <h3>Сундуков за главы пока нет</h3>
          <p>Собирай звёзды в главах, чтобы получать бесплатные сундуки.</p>
        </div>
      `;
    }

    return `
      ${shopChests}
      <div class="shop-section-title"><span aria-hidden="true">▣</span><h3>Сундуки за главы</h3></div>
      ${pending.length > 1 ? `<button class="menu-button play-button compact-play open-all-chests-button" type="button" data-inventory-action="open-all-chests">Получить все</button>` : ""}
      <div class="inventory-card-list">
        ${pending.map((reward) => {
          const isUpgrade = reward.claimedTier > CHEST_TIERS.none;
          return `
            <article class="inventory-card chest-card">
              <div class="inventory-card-icon" aria-hidden="true">🎁</div>
              <div class="inventory-card-body">
                <h3>${escapeHtml(getChapterChestName(reward.chapterId, isUpgrade))}</h3>
                <p>${isUpgrade
                  ? `Улучшен до: ${escapeHtml(reward.nextTitle)}`
                  : `Награда: ${escapeHtml(reward.nextTitle)}`}</p>
                <p>Звёзды: ${getChapterStars(reward.chapterId)} / 30</p>
              </div>
              <button class="menu-button play-button compact-play" type="button" data-inventory-action="open-chest" data-chapter-id="${reward.chapterId}">Получить</button>
            </article>
          `;
        }).join("")}
      </div>
<<<<<<< HEAD
    `;
=======
    `;
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  };

  const renderInventoryBoosts = () => `
    <div class="inventory-card-list shop-grid">
      ${Object.entries(BOOSTER_ITEMS).map(([key, booster]) => {
        const count = Math.max(0, Math.round(Number(state.boosters[key]) || 0));
        const price = SHOP_BOOSTER_PRICES[key];
        return renderShopCard({
          classes: `boost-card boost-${key}`,
          icon: booster.icon,
          title: `${booster.title} x${count}`,
          description: booster.description,
          meta: count > 0 ? "Есть в панели уровня" : "",
          action: `data-inventory-action="buy-booster" data-booster-id="${key}"`,
          disabled: !canAffordShopItem(price),
          buttonText: getCoinPurchaseButtonText(price)
        });
      }).join("")}
      ${Object.entries(SHOP_AD_REWARDS)
        .filter(([, item]) => item.randomBooster)
        .map(([id, item]) => renderShopCard({
          classes: "ad-card boost-card ad-random-booster",
          icon: item.icon,
          title: escapeHtml(item.title),
          description: escapeHtml(item.description),
          meta: canUseRewardedAd() ? "Rewarded video" : "Реклама недоступна",
          action: `data-inventory-action="watch-ad" data-ad-id="${id}"`,
          disabled: !canUseRewardedAd(),
          buttonText: canUseRewardedAd() ? "Смотреть" : "Недоступно"
        })).join("")}
    </div>
  `;

  const renderInventoryLives = () => `
    <div class="inventory-card-list shop-grid">
      ${Object.entries(SHOP_LIFE_ITEMS).map(([id, item]) => {
        const disabled = state.lives >= MAX_LIVES || !canAffordShopItem(item.price);
        return renderShopCard({
          classes: `life-card life-${id}`,
          icon: item.icon,
          title: escapeHtml(item.title),
          description: item.fullRestore ? "Восстановить все жизни до максимума." : `Добавить ${item.lives} ${item.lives === 1 ? "жизнь" : "жизни"}.`,
          meta: state.lives >= MAX_LIVES ? t("livesFull") : `Сейчас: ${state.lives}/${MAX_LIVES}`,
          action: `data-inventory-action="buy-life" data-life-id="${id}"`,
          disabled,
          buttonText: state.lives >= MAX_LIVES ? "Недоступно" : getCoinPurchaseButtonText(item.price)
        });
      }).join("")}
      ${Object.entries(SHOP_AD_REWARDS).map(([id, item]) => renderShopCard({
        classes: "ad-card",
        icon: item.icon,
        title: escapeHtml(item.title),
        description: escapeHtml(item.description),
        meta: canUseRewardedAd() ? "Rewarded video" : "Реклама недоступна",
        action: `data-inventory-action="watch-ad" data-ad-id="${id}"`,
        disabled: !canUseRewardedAd()
      }).replace("></button>", ">Смотреть</button>")).join("")}
    </div>
  `;

  const renderSmartInventoryLives = () => {
    const missingLives = getMissingLives();
    const usefulLifeCards = Object.entries(SHOP_LIFE_ITEMS)
      .filter(([, item]) => isLifeItemUseful(item))
      .map(([id, item]) => renderShopCard({
        classes: `life-card life-${id}`,
        icon: item.icon,
        title: escapeHtml(item.title),
        description: item.fullRestore ? "Восстановить все жизни до максимума." : `Добавить ${item.lives} ${item.lives === 1 ? "жизнь" : "жизни"}.`,
        meta: `Не хватает: ${missingLives}/${MAX_LIVES}`,
        action: `data-inventory-action="buy-life" data-life-id="${id}"`,
        disabled: !canAffordShopItem(item.price),
        buttonText: getCoinPurchaseButtonText(item.price)
      }));
    const adCards = missingLives > 0
      ? Object.entries(SHOP_AD_REWARDS)
        .filter(([, item]) => item.reward?.lives)
        .map(([id, item]) => renderShopCard({
        classes: "ad-card ad-life",
        icon: item.icon,
        title: escapeHtml(item.title),
        description: escapeHtml(item.description),
        meta: canUseRewardedAd() ? `Не хватает: ${missingLives}/${MAX_LIVES}` : "Реклама недоступна",
        action: `data-inventory-action="watch-ad" data-ad-id="${id}"`,
        disabled: !canUseRewardedAd(),
        buttonText: canUseRewardedAd() ? "Смотреть" : "Недоступно"
      }))
      : [];
    const cards = [...usefulLifeCards, ...adCards];
    if (!cards.length) {
      return `
        <div class="inventory-empty">
          <h3>${escapeHtml(t("livesFull"))}</h3>
          <p>Сейчас: ${state.lives}/${MAX_LIVES}. Покупки жизней появятся, когда они понадобятся.</p>
        </div>
      `;
    }
    return `<div class="inventory-card-list shop-grid">${cards.join("")}</div>`;
  };

  const renderInventorySkins = () => Object.entries(COSMETIC_GROUPS).map(([group, config]) => `
    <section class="inventory-skin-group">
      <h3>${config.title}</h3>
      <div class="inventory-card-list shop-grid">
        ${Object.entries(config.items).map(([skinId, skin]) => {
          const itemSkin = skin || { icon: "◆", title: skinId };
          const isDefault = skinId === "default";
          const price = SHOP_SKIN_PRICES[group]?.[skinId] || 0;
          const owned = state.cosmetics[group]?.includes(skinId);
          const isEquipped = state.equippedCosmetics[config.equippedKey] === skinId;
          const needsCoins = !owned && !isDefault;
          const buttonText = isEquipped ? "Выбран" : (owned || isDefault ? "Выбрать" : getCoinPurchaseButtonText(price));
          return renderShopCard({
            classes: `skin-card skin-${group} skin-${skinId}`,
            icon: itemSkin.icon,
            image: itemSkin.image || "",
            title: escapeHtml(itemSkin.title),
            description: isDefault ? "Базовый стиль." : "Косметический стиль для игры.",
            meta: isEquipped ? "Выбран" : (owned || isDefault ? "Куплен" : "Новый стиль"),
            action: `data-inventory-action="${owned || isDefault ? "equip-skin" : "buy-skin"}" data-cosmetic-group="${group}" data-skin-id="${escapeHtml(skinId)}"`,
            disabled: isEquipped || (needsCoins && !canAffordShopItem(price)),
            buttonText
          });
        }).join("")}
      </div>
    </section>
  `).join("");

  const renderInventoryGifts = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    `;
  };

  const renderInventoryCoins = () => `
    <div class="inventory-card-list shop-grid">
      ${Object.entries(SHOP_IAP_REWARDS).map(([id, item]) => {
        const product = getShopProduct(id);
        return renderShopCard({
          classes: `iap-card iap-${id}`,
          icon: item.icon,
          title: escapeHtml(product?.title || item.title),
          description: escapeHtml(product?.description || item.description || formatRewardText(item.reward)),
          meta: product ? escapeHtml(item.meta || "Покупка через Яндекс Игры") : "Добавьте товар в Консоли Яндекс Игр",
          action: `data-inventory-action="buy-iap" data-product-id="${id}"`,
          disabled: !product,
          buttonText: getProductPriceMarkup(id)
        });
      }).join("")}
    </div>
  `;

  const renderInventoryRecommended = () => `
    <div class="shop-recommendation">
      ${renderInventoryBoosts()}
      <div class="shop-feature-card chest-card chest-big_chest">
        <div>
          <span class="shop-feature-kicker">★ Рекомендуем ★</span>
          <h3>${SHOP_CHEST_ITEMS.big_chest.title}</h3>
          <p>Случайная награда</p>
        </div>
        <div class="shop-feature-icon" aria-hidden="true">▣</div>
        ${renderCoinButton(`data-inventory-action="buy-chest" data-chest-id="big_chest"`, SHOP_CHEST_ITEMS.big_chest.price, false)}
      </div>
      <div class="shop-section-title"><span aria-hidden="true">♥</span><h3>Быстрые награды</h3></div>
      ${renderSmartInventoryLives()}
      ${getPendingGifts().length ? `<div class="shop-section-title"><span aria-hidden="true">★</span><h3>Подарки</h3></div>${renderInventoryGifts()}` : ""}
    </div>
  `;

  const renderInventory = () => {
    if (!inventoryContent) {
      return;
    }
    state.inventoryTab = resolveShopTab(state.inventoryTab);
    const visibleTabs = getVisibleShopTabs();

    inventoryModal?.querySelectorAll("[data-inventory-tab]").forEach((button) => {
      const isVisible = visibleTabs.includes(button.dataset.inventoryTab);
      const isActive = isVisible && button.dataset.inventoryTab === state.inventoryTab;
      button.hidden = !isVisible;
      button.setAttribute("aria-hidden", isVisible ? "false" : "true");
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const renderers = {
      recommended: renderInventoryRecommended,
      chests: renderInventoryChests,
      boosts: renderInventoryBoosts,
      lives: renderSmartInventoryLives,
      skins: renderInventorySkins,
      gifts: renderInventoryGifts,
      coins: renderInventoryCoins
    };
    inventoryContent.innerHTML = (renderers[state.inventoryTab] || renderInventoryRecommended)();
    updateInventoryBadge();
  };

  const setInventoryTab = (tab) => {
    if (!getVisibleShopTabs().includes(tab)) {
      return;
    }
    state.inventoryTab = tab;
    renderInventory();
<<<<<<< HEAD
  };

=======
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const openInventoryModal = (tab = "recommended") => {
    if (!inventoryModal) {
      return;
    }
    pauseJezzLevelForModal();
    state.inventoryTab = resolveShopTab(tab);
    renderInventory();
    inventoryModal.classList.add("is-open");
    inventoryModal.setAttribute("aria-hidden", "false");
    activateModalFocus(inventoryModal, {
      initialFocus: inventoryCloseButton,
      onEscape: closeInventoryModal
    });
<<<<<<< HEAD
  };

=======
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const closeInventoryModal = () => {
    if (activeShopChestResultPanel) {
      return;
    }
    inventoryModal?.classList.remove("is-open");
    inventoryModal?.setAttribute("aria-hidden", "true");
    deactivateModalFocus(inventoryModal);
    resumeJezzLevelFromModal();
  };

  let activeAchievementsPanel = null;

  const closeAchievementsPanel = () => {
    if (!activeAchievementsPanel) {
      return;
    }
    const panel = activeAchievementsPanel;
    activeAchievementsPanel = null;
    panel.removeEventListener("click", handleAchievementsPanelClick);
    deactivateModalFocus(panel);
    panel.remove();
    resumeJezzLevelFromModal();
  };

  const getAchievementStatusText = (progress) => {
    if (progress.claimed) {
      return "Получено";
    }
    if (progress.ready) {
      return "Готово";
    }
    return `${progress.value}/${progress.target}`;
  };

  const renderAchievementItem = (achievement) => {
    const progress = getAchievementProgress(achievement);
    const categoryClass = `achievement-${String(achievement.category || "progress").replace(/[^a-z0-9_-]/gi, "")}`;
    const buttonText = progress.claimed ? "Получено" : (progress.ready ? "Забрать" : "Не готово");
    const classes = [
      "achievement-item",
      categoryClass,
      progress.ready ? "is-ready" : "",
      progress.claimed ? "is-claimed" : "",
      !progress.unlocked ? "is-locked" : ""
    ].filter(Boolean).join(" ");

    return `
      <article class="${classes}">
        <div class="achievement-icon" aria-hidden="true">${escapeHtml(achievement.icon || "★")}</div>
        <div class="achievement-body">
          <div class="achievement-title-row">
            <h3>${escapeHtml(achievement.title)}</h3>
            <span class="achievement-status">${getAchievementStatusText(progress)}</span>
          </div>
          <p>${escapeHtml(achievement.description)}</p>
          <div class="achievement-meter" aria-label="Прогресс ${progress.value} из ${progress.target}">
            <span style="width: ${progress.percent}%"></span>
          </div>
        </div>
        <div class="achievement-reward">
          <strong>+${achievement.rewardCoins}</strong>
          <span>монет</span>
        </div>
        <button
          class="menu-button play-button compact-play achievement-claim"
          type="button"
          data-achievement-claim="${escapeHtml(achievement.id)}"
          ${progress.ready ? "" : "disabled"}
        >${buttonText}</button>
      </article>
    `;
  };

  const getSortedAchievements = () => ACHIEVEMENTS
    .map((achievement, index) => ({
      achievement,
      progress: getAchievementProgress(achievement),
      index
    }))
    .sort((left, right) => {
      const getGroup = (item) => {
        if (item.progress.ready) {
          return 0;
        }
        return item.progress.claimed ? 2 : 1;
      };
      return getGroup(left) - getGroup(right) || left.index - right.index;
    })
    .map((item) => item.achievement);

  const renderAchievementsPanel = () => {
    if (!activeAchievementsPanel) {
      return;
    }
    evaluateAchievements();
    const claimedCount = state.claimedAchievements.size;
    const readyCount = getClaimableAchievementCount();
    const list = activeAchievementsPanel.querySelector(".achievements-list");
    const summary = activeAchievementsPanel.querySelector(".achievements-summary");
    if (summary) {
      summary.textContent = readyCount > 0
        ? `Готово к получению: ${readyCount}. Получено: ${claimedCount}/${ACHIEVEMENTS.length}.`
        : `Получено: ${claimedCount}/${ACHIEVEMENTS.length}.`;
    }
    if (list) {
      list.innerHTML = getSortedAchievements().map(renderAchievementItem).join("");
    }
  };

  const claimAchievement = (achievementId) => {
    const achievement = ACHIEVEMENTS.find((item) => item.id === achievementId);
    if (!achievement) {
      return;
    }
    evaluateAchievements();
    if (!state.unlockedAchievements.has(achievement.id) || state.claimedAchievements.has(achievement.id)) {
      return;
    }

    state.claimedAchievements.add(achievement.id);
    state.coins += Math.max(0, Math.round(Number(achievement.rewardCoins) || 0));
    syncResources();
    saveProgressImmediate({ flushCloud: true });
    renderAchievementsPanel();
  };

  function handleAchievementsPanelClick(event) {
    const closeButton = event.target.closest("[data-achievements-close]");
    if (closeButton) {
      closeAchievementsPanel();
      return;
    }

    const claimButton = event.target.closest("[data-achievement-claim]");
    if (!claimButton || claimButton.disabled) {
      return;
    }
    claimAchievement(claimButton.dataset.achievementClaim);
  }

  const openAchievementsPanel = () => {
    if (activeAchievementsPanel) {
      renderAchievementsPanel();
      return;
    }
    evaluateAchievements();
    pauseJezzLevelForModal();

    const panel = document.createElement("div");
    panel.className = "achievements-panel is-open";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", t("achievements"));
    panel.innerHTML = `
      <div class="achievements-card">
        <header class="achievements-header">
          <div>
            <h2>${t("achievements")}</h2>
            <p class="achievements-summary"></p>
          </div>
          <button class="inventory-close" type="button" aria-label="Закрыть" data-achievements-close>×</button>
        </header>
        <div class="achievements-list"></div>
      </div>
    `;
    panel.addEventListener("click", handleAchievementsPanelClick);
    activeAchievementsPanel = panel;
    root.append(panel);
    renderAchievementsPanel();
    activateModalFocus(panel, {
      initialFocus: panel.querySelector("[data-achievements-close]"),
      onEscape: closeAchievementsPanel
    });
  };

  const waitNextFrame = () => new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
<<<<<<< HEAD

  const equipSkin = (group, skinId) => {
    const config = COSMETIC_GROUPS[group];
=======

  const equipSkin = (group, skinId) => {
    const config = COSMETIC_GROUPS[group];
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (!config || !state.cosmetics[group]?.includes(skinId)) {
      return;
    }
    state.equippedCosmetics[config.equippedKey] = skinId;
    saveProgressImmediate({ flushCloud: true });
    renderInventory();
    staticLayerDirty = true;
    requestDrawJezzLevel();
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    });
    addGiftCosmetics(gift.cosmetics);
    gift.claimed = true;
    evaluateAchievements();
    saveProgressImmediate();
    syncResources();
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const getJezzPlayRect = (size) => {
    const width = Math.max(1, size.width);
    const height = Math.max(1, size.height);
    const desiredMargin = Math.max(8, Math.min(18, width * 0.025));
    const maxMargin = Math.max(0, Math.min(width, height) / 2 - 1);
    const margin = Math.min(desiredMargin, maxMargin);
    return {
<<<<<<< HEAD
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
      solidForCapture: obstacle.solidForCapture ?? (isSafe && !isMoving)
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
=======
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
      solidForCapture: obstacle.solidForCapture ?? (isSafe && !isMoving)
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const tooSmallBallArea = areasWithBalls.length > 0 && areasWithBalls.some((area) => (
      area.balls.length > 0 && !isAreaLargeEnoughToCapture(area)
    ));
    const capturableAreas = areasWithBalls.filter((area) => area.balls.length === 0);
    const activeAreas = areasWithBalls.filter((area) => area.balls.length > 0 && isAreaLargeEnoughToCapture(area));
    const separatedBalls = activeAreas.filter((area) => area.balls.length > 0).length >= 2;
    const canSplit = areasWithBalls.length >= 2 && !tooSmallBallArea;
    const canKeepLine = canSplit && (capturableAreas.length > 0 || separatedBalls);
<<<<<<< HEAD

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
        reason: tooSmallBallArea ? "too-small" : "no-split"
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
=======

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
        reason: tooSmallBallArea ? "too-small" : "no-split"
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    levelState.activeLine = null;
    levelState.gestureStartPoint = null;
    levelState.gestureCurrentPoint = null;
    levelState.gestureLockedOrientation = null;
    levelState.gesturePointerId = null;
    levelState.draftPointer = null;
    levelState.fastLineArmed = false;
    levelState.lineShieldArmed = false;
    levelState.targetEaseUsed = false;
    levelState.aimPointer = null;
    stopJezzLevel();
<<<<<<< HEAD
    syncLevelHud();

=======
    syncLevelHud();

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const canUseRewardedAd = Boolean(yandexState.sdk?.adv && typeof yandexState.sdk.adv.showRewardedVideo === "function");
    const shouldRetry = await showConfirm({
      title: t("levelFailedTitle"),
      message: canUseRewardedAd
        ? `${t("lineHitFailure")} ${t("failedRewardRetryHint")}`
        : t("lineHitFailure"),
      acceptText: canUseRewardedAd ? t("failedRewardRetry") : t("play"),
      cancelText: t("toChapters")
    });

    if (shouldRetry) {
      if (canUseRewardedAd) {
        const rewarded = await showRewardedLifeAd();
        if (!rewarded) {
          openChapter(state.currentChapter);
          return;
        }
        restoreLife();
        saveProgressImmediate({ flushCloud: true });
        syncResources();
      }
      await openLevel(state.selectedLevel, { skipReplayConfirm: true });
      return;
<<<<<<< HEAD
    }

    openChapter(state.currentChapter);
  };

=======
    }

    openChapter(state.currentChapter);
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const handleLinePenalty = (message = null) => {
    if (levelState.failed || levelState.completed) {
      return false;
    }

    levelState.activeLine = null;
    levelState.penalties = Math.min(MAX_PENALTIES, levelState.penalties + 1);
    syncLevelHud();
    showLevelToast(message || t("penaltyProgress", { count: levelState.penalties, max: MAX_PENALTIES }));
<<<<<<< HEAD

    if (levelState.penalties >= MAX_PENALTIES) {
      void failCurrentAttempt();
      return true;
    }

=======

    if (levelState.penalties >= MAX_PENALTIES) {
      void failCurrentAttempt();
      return true;
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    return false;
  };

  const absorbLineHitWithShield = () => {
    const line = levelState.activeLine;
    if (!line?.shielded) {
      return false;
    }
    line.shielded = false;
    line.shieldGraceUntil = performance.now() + LINE_SHIELD_GRACE_MS;
    showLevelToast("Щит поглотил удар");
    return true;
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const cancelActiveLine = (penalize = false, message = null) => {
    levelState.activeLine = null;
    if (penalize) {
      handleLinePenalty(message);
    }
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const line = levelState.activeLine;
    if (!line) {
      return null;
    }
    const shieldGrace = Number(line.shieldGraceUntil) || 0;
    if (performance.now() >= shieldGrace && lineHitBall(line)) {
      return "ball";
    }
<<<<<<< HEAD
    return levelState.obstacles.some((obstacle) => (
      obstacle.dangerForLine && lineHitsObstacle(line, obstacle)
    )) ? "danger" : null;
  };

  const recalculateCapturedAreas = (line) => {
    splitActiveRect(line);
  };

=======
    return levelState.obstacles.some((obstacle) => (
      obstacle.dangerForLine && lineHitsObstacle(line, obstacle)
    )) ? "danger" : null;
  };

  const recalculateCapturedAreas = (line) => {
    splitActiveRect(line);
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const completeActiveLine = (line) => {
    if (!line?.negativeHit?.isValidAnchor || !line?.positiveHit?.isValidAnchor) {
      const hitDanger = Boolean(line?.negativeHit?.isDanger || line?.positiveHit?.isDanger);
      cancelActiveLine(hitDanger);
      return;
    }
<<<<<<< HEAD
    levelState.activeLine = null;
    recalculateCapturedAreas(line);
  };

  const updateActiveLine = (dt) => {
    const line = levelState.activeLine;
    const rect = line?.rect || levelState.activeRect;
    if (!line || !rect) {
      return;
    }

    const grow = LINE_GROW_SPEED * (line.fastLine ? FAST_LINE_MULTIPLIER : 1) * dt;
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

=======
    levelState.activeLine = null;
    recalculateCapturedAreas(line);
  };

  const updateActiveLine = (dt) => {
    const line = levelState.activeLine;
    const rect = line?.rect || levelState.activeRect;
    if (!line || !rect) {
      return;
    }

    const grow = LINE_GROW_SPEED * (line.fastLine ? FAST_LINE_MULTIPLIER : 1) * dt;
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const collision = getActiveLineCollision();
    if (collision === "ball") {
      if (absorbLineHitWithShield()) {
        return;
      }
      handleLinePenalty();
      return;
    }
    if (collision) {
      cancelActiveLine(true);
      return;
    }
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      if (
        levelState.activeLine
        && performance.now() >= (Number(levelState.activeLine.shieldGraceUntil) || 0)
        && activeLineHitBall(levelState.activeLine, ball, previous)
      ) {
        if (absorbLineHitWithShield()) {
          return;
        }
        handleLinePenalty();
        return;
      }
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    ctx.clearRect(0, 0, width, height);
    levelState.capturedRects.forEach((captured) => {
      const captureColors = getCaptureGradientColors();
      const capturedGradient = ctx.createLinearGradient(captured.x, captured.y, captured.x + captured.w, captured.y + captured.h);
      capturedGradient.addColorStop(0, captureColors[0]);
      capturedGradient.addColorStop(1, captureColors[1]);
      ctx.fillStyle = capturedGradient;
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    staticLayerDirty = false;
  };

  const getEquippedLineColors = () => {
    if (state.equippedCosmetics.line === "lightning") {
      return ["rgba(121, 238, 255, 0.98)", "rgba(255, 244, 113, 0.98)", "rgba(101, 102, 255, 0.98)"];
    }
    if (state.equippedCosmetics.line === "pulse") {
      return ["rgba(255, 255, 255, 0.98)", "rgba(255, 117, 199, 0.98)", "rgba(77, 231, 255, 0.98)"];
    }
    if (state.equippedCosmetics.line === "crystal") {
      return ["rgba(195, 250, 255, 0.98)", "rgba(164, 115, 255, 0.98)", "rgba(255, 118, 231, 0.98)"];
    }
    if (state.equippedCosmetics.line === "aurora") {
      return ["rgba(206, 255, 190, 0.98)", "rgba(91, 231, 255, 0.98)", "rgba(255, 142, 236, 0.98)"];
    }
    return ["rgba(126, 247, 255, 0.96)", "rgba(255, 246, 145, 0.98)", "rgba(255, 91, 218, 0.96)"];
  };

  const getEquippedBallColors = () => {
    if (state.equippedCosmetics.ball === "fire") {
      return ["#ffffff", "#ffd25e", "#ff4f7a"];
    }
    if (state.equippedCosmetics.ball === "shadow") {
      return ["#d7ccff", "#7758d8", "#1b123d"];
    }
    if (state.equippedCosmetics.ball === "plasma") {
      return ["#ffffff", "#6ff2ff", "#ff5fd7"];
    }
    if (state.equippedCosmetics.ball === "sun") {
      return ["#ffffff", "#ffe15c", "#ff8b2f"];
    }
    if (state.equippedCosmetics.ball === "neon") {
      return ["#ffffff", "#ff7cff", "#6b4cff"];
    }
    if (state.equippedCosmetics.ball === "ice") {
      return ["#ffffff", "#b8f6ff", "#57a9ff"];
    }
    return ["#ffffff", "#9ff7ff", "#3f46ff"];
  };

  const getCaptureGradientColors = () => {
    if (state.equippedCosmetics.captureEffect === "stars") {
      return ["rgba(255, 241, 128, 0.76)", "rgba(165, 109, 255, 0.54)"];
    }
    if (state.equippedCosmetics.captureEffect === "ripple") {
      return ["rgba(159, 247, 255, 0.7)", "rgba(109, 255, 188, 0.46)"];
    }
    if (state.equippedCosmetics.captureEffect === "wave") {
      return ["rgba(113, 235, 255, 0.7)", "rgba(72, 109, 255, 0.5)"];
    }
    if (state.equippedCosmetics.captureEffect === "comet") {
      return ["rgba(255, 216, 106, 0.74)", "rgba(255, 91, 170, 0.52)"];
    }
    return ["rgba(255, 211, 91, 0.7)", "rgba(255, 78, 211, 0.48)"];
  };

  const drawJezzLevel = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      if (lowPerformanceMode) {
        ctx.strokeStyle = "rgba(126, 247, 255, 0.96)";
      } else {
        const lineColors = getEquippedLineColors();
        const lineGradient = line.orientation === "vertical"
          ? ctx.createLinearGradient(line.x, line.endA, line.x, line.endB)
          : ctx.createLinearGradient(line.endA, line.y, line.endB, line.y);
        lineGradient.addColorStop(0, lineColors[0]);
        lineGradient.addColorStop(0.5, lineColors[1]);
        lineGradient.addColorStop(1, lineColors[2]);
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    levelState.balls.forEach((ball) => {
      const ballSkinImage = lowPerformanceMode ? null : getCachedBallSkinImage(state.equippedCosmetics.ball);
      if (ballSkinImage) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(ballSkinImage, ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
        ctx.restore();
      } else if (lowPerformanceMode) {
        ctx.fillStyle = "#78eaff";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const ballColors = getEquippedBallColors();
        const gradient = ctx.createRadialGradient(ball.x - 4, ball.y - 5, 2, ball.x, ball.y, ball.r + 4);
        gradient.addColorStop(0, ballColors[0]);
        gradient.addColorStop(0.28, ballColors[1]);
        gradient.addColorStop(1, ballColors[2]);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
<<<<<<< HEAD
    });
  };

  function finishJezzLevel() {
    if (levelState.completed) {
      return;
    }

=======
    });
  };

  function finishJezzLevel() {
    if (levelState.completed) {
      return;
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    levelState.completed = true;
    levelState.running = false;
    levelState.pausedByViewport = false;
    updateGameplayMarker(false);
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const tickJezzLevel = (time) => {
    levelState.animationId = null;
    if (!levelState.running || !levelScreen.classList.contains("is-active") || modalFocusStack.length) {
      return;
    }

    if (lowPerformanceMode && levelState.lastFrameAt && time - levelState.lastFrameAt < LOW_PERFORMANCE_FRAME_INTERVAL) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
      return;
    }

    const dt = Math.min(0.033, Math.max(0, (time - levelState.lastFrameAt) / 1000 || 0));
    levelState.lastFrameAt = time;
    levelState.elapsed += dt;
    if (levelState.slowBallsUntil && getTrustedNow() >= levelState.slowBallsUntil) {
      levelState.slowBallsUntil = 0;
      syncResources();
    }
    levelState.obstacles.forEach((obstacle) => {
      if (obstacle.moving) {
        updateObstacleGeometry(obstacle, levelState.rect, levelState.elapsed);
      }
    });
    const ballDt = getTrustedNow() < levelState.slowBallsUntil ? dt * SLOW_BALLS_MULTIPLIER : dt;
    updateBalls(ballDt);
    updateActiveLine(dt);
    drawJezzLevel();
<<<<<<< HEAD
    trackFramePerformance(time, dt);
    if (levelState.running && !levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

=======
    trackFramePerformance(time, dt);
    if (levelState.running && !levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const stopJezzLevel = () => {
    levelState.running = false;
    levelState.pausedByViewport = false;
    updateGameplayMarker(false);
    window.clearTimeout(levelState.helperHintTimer);
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const pauseJezzLevelForPlatform = () => {
    yandexState.pausedByPlatform = true;
    if (!levelState.running || levelState.completed || levelState.failed) {
      updateGameplayMarker(false);
      return;
    }

    levelState.running = false;
    updateGameplayMarker(false);
    if (levelState.animationId) {
<<<<<<< HEAD
      window.cancelAnimationFrame(levelState.animationId);
      levelState.animationId = null;
    }
  };
=======
      window.cancelAnimationFrame(levelState.animationId);
      levelState.animationId = null;
    }
  };
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098

  const resumeJezzLevelFromPlatform = () => {
    if (!yandexState.pausedByPlatform) {
      return;
    }

    if (levelState.completed || levelState.failed || !levelScreen.classList.contains("is-active") || lastViewportTooSmall || modalFocusStack.length) {
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

  const pauseJezzLevelForViewport = () => {
    if (levelState.completed || levelState.failed || !levelScreen.classList.contains("is-active")) {
      levelState.pausedByViewport = false;
      return;
    }

    if (levelState.running) {
      levelState.pausedByViewport = true;
      levelState.running = false;
      updateGameplayMarker(false);
      if (levelState.animationId) {
        window.cancelAnimationFrame(levelState.animationId);
        levelState.animationId = null;
      }
    }
  };

  const resumeJezzLevelFromViewport = () => {
    if (!levelState.pausedByViewport) {
      return;
    }

    if (levelState.completed || levelState.failed || !levelScreen.classList.contains("is-active") || modalFocusStack.length || yandexState.pausedByPlatform) {
      return;
    }

    levelState.pausedByViewport = false;
    levelState.running = true;
    levelState.lastFrameAt = performance.now();
    updateGameplayMarker(true);
    if (!levelState.animationId) {
      levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
    }
  };

  const applyViewportTooSmallState = (isTooSmall) => {
    const changed = lastViewportTooSmall !== isTooSmall;
    lastViewportTooSmall = isTooSmall;
    if (changed) {
      root?.classList.toggle("is-viewport-too-small", isTooSmall);
      viewportTooSmallOverlay?.setAttribute("aria-hidden", isTooSmall ? "false" : "true");
      scheduleStickyBannerSync();
    }
    if (isTooSmall) {
      pauseJezzLevelForViewport();
    } else {
      resumeJezzLevelFromViewport();
    }
  };

  const syncViewportLayoutNow = ({ resizeLevel = true } = {}) => {
    const { width, height } = syncViewportVars();
    const isTooSmall = width < 320 || height < 360;
    applyViewportTooSmallState(isTooSmall);
    if (resizeLevel && levelScreen.classList.contains("is-active") && !isTooSmall) {
      resizeActiveJezzLevel();
    }
  };

  const syncViewportLayout = (options = {}) => {
    if (layoutRaf) {
      return;
    }

    layoutRaf = window.requestAnimationFrame(() => {
      layoutRaf = null;
      syncViewportLayoutNow(options);
    });
  };
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const showFullscreenAd = () => new Promise((resolve) => {
    if (!yandexState.sdk?.adv || typeof yandexState.sdk.adv.showFullscreenAdv !== "function") {
      resolve(false);
      return;
<<<<<<< HEAD
    }

=======
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    try {
      yandexState.sdk.adv.showFullscreenAdv({
        callbacks: {
          onOpen: () => {
            yandexState.adShowing = true;
            scheduleStickyBannerSync();
            pauseJezzLevelForPlatform();
          },
          onClose: (wasShown) => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(Boolean(wasShown));
          },
          onError: () => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(false);
          }
        }
      });
    } catch (_error) {
      yandexState.adShowing = false;
      resumeJezzLevelFromPlatform();
      scheduleStickyBannerSync();
      resolve(false);
    }
  });

  const showFullscreenAdForUserPause = async () => {
    stopJezzLevel();
    if (yandexState.adShowing) {
      return false;
    }
    const now = getTrustedNow();
    if (now - yandexState.lastUserPauseAdAt < USER_PAUSE_AD_MIN_INTERVAL_MS) {
      return false;
    }
    const wasShown = await showFullscreenAd();
    if (wasShown) {
      yandexState.lastUserPauseAdAt = now;
    }
    return wasShown;
  };

  const maybeShowInterstitialAd = async () => {
<<<<<<< HEAD
    yandexState.completedSinceInterstitial += 1;

    const now = getTrustedNow();
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

=======
    yandexState.completedSinceInterstitial += 1;

    const now = getTrustedNow();
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    try {
      yandexState.sdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: () => {
            yandexState.adShowing = true;
            scheduleStickyBannerSync();
            pauseJezzLevelForPlatform();
          },
          onRewarded: () => {
            rewarded = true;
          },
          onClose: () => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(rewarded);
          },
          onError: () => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(false);
          }
        }
      });
    } catch (_error) {
      yandexState.adShowing = false;
      resumeJezzLevelFromPlatform();
      scheduleStickyBannerSync();
      resolve(false);
    }
  });

  const showRewardedShopAd = (item) => new Promise((resolve) => {
    if (!canUseRewardedAd()) {
      resolve(false);
      return;
    }

    let rewarded = false;

    try {
      yandexState.sdk.adv.showRewardedVideo({
        callbacks: {
          onOpen: () => {
            yandexState.adShowing = true;
            scheduleStickyBannerSync();
            pauseJezzLevelForPlatform();
          },
          onRewarded: () => {
            rewarded = true;
            if (item.randomBooster) {
              const keys = Object.keys(DEFAULT_BOOSTERS);
              const key = keys[Math.floor(Math.random() * keys.length)] || keys[0];
              grantShopReward({ boosters: { [key]: 1 } });
            } else {
              grantShopReward(item.reward);
            }
          },
          onClose: () => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(rewarded);
          },
          onError: () => {
            yandexState.adShowing = false;
            resumeJezzLevelFromPlatform();
            scheduleStickyBannerSync();
            resolve(false);
          }
        }
      });
    } catch (_error) {
      yandexState.adShowing = false;
      resumeJezzLevelFromPlatform();
      scheduleStickyBannerSync();
      resolve(false);
    }
  });
<<<<<<< HEAD

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
    levelState.pausedByViewport = false;
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
=======

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
    levelState.pausedByViewport = false;
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    levelState.elapsed = 0;
    levelState.activeLine = null;
    levelState.lineOrientation = "vertical";
    levelState.fastLineArmed = false;
    levelState.lineShieldArmed = false;
    levelState.slowBallsUntil = 0;
    levelState.targetEaseUsed = false;
    syncLineOrientationButtons();
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    levelState.aimPointer = {
      x: nextPoint.x,
      y: nextPoint.y,
      orientation: levelState.lineOrientation || "vertical",
      rect
    };
    requestDrawJezzLevel();
    return levelState.aimPointer;
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    }
    const castResult = getLineCastResult(point, orientation, rect);
    if (castResult.failReason === "danger") {
      cancelActiveLine(true);
      return;
    }
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const startActiveLineFromCast = (castResult) => {
    const point = castResult.startPoint;
    const orientation = castResult.orientation;
    const rect = castResult.rect;
    const segment = castResult.previewSegment;
    const fastLine = levelState.fastLineArmed;
    const shielded = levelState.lineShieldArmed;
    levelState.fastLineArmed = false;
    levelState.lineShieldArmed = false;
    levelState.activeRect = rect;
    levelState.activeLine = orientation === "vertical"
      ? {
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
        done: false,
        fastLine,
        shielded,
        shieldGraceUntil: 0,
        rect,
        sourceArea: rect,
        sourceRect: rect
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
        done: false,
        fastLine,
        shielded,
        shieldGraceUntil: 0,
        rect,
        sourceArea: rect,
        sourceRect: rect
      };
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    syncResources();
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    event.preventDefault();
    const orientation = levelState.lineOrientation || "vertical";
    levelState.aimPointer = {
      x: point.x,
      y: point.y,
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
      const orientation = getBuildableTapOrientation(point, rect);
      if (orientation) {
        setLineOrientation(orientation);
        startActiveLine(point, orientation, rect);
      }
    }
<<<<<<< HEAD

    event.preventDefault();
    jezzCanvas.releasePointerCapture?.(event.pointerId);
=======

    event.preventDefault();
    jezzCanvas.releasePointerCapture?.(event.pointerId);
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    clearLineGesture();
    requestDrawJezzLevel();
  };

  const runDevLevelAudit = (levels = Array.from({ length: TOTAL_LEVELS }, (_, index) => index + 1)) => {
    const auditRect = { x: 0, y: 0, w: 480, h: 640 };
    const stateKeys = [
      "config",
      "target",
      "capturedArea",
      "totalArea",
      "penalties",
      "rect",
      "activeRect",
      "activeRects",
      "capturedRects",
      "walls",
      "obstacles",
      "elapsed",
      "activeLine",
      "balls",
      "ball"
    ];
    const previous = {};
    stateKeys.forEach((key) => {
      previous[key] = levelState[key];
    });

    const scanLevel = (levelNumber) => {
      const config = getLevelConfig(levelNumber);
      const speed = getSpeedValue(config.speed, auditRect);
      levelState.config = config;
      levelState.target = config.target;
      levelState.capturedArea = 0;
      levelState.totalArea = rectArea(auditRect);
      levelState.penalties = 0;
      levelState.rect = auditRect;
      levelState.activeRect = auditRect;
      levelState.activeRects = [auditRect];
      levelState.capturedRects = [];
      levelState.walls = [];
      levelState.obstacles = (config.obstacles || []).map((obstacle, index) => createObstacle(obstacle, auditRect, index));
      levelState.elapsed = 0;
      levelState.activeLine = null;
      levelState.balls = BALL_STARTS.slice(0, config.balls).map((start) => ({
        x: auditRect.x + auditRect.w * start.x,
        y: auditRect.y + auditRect.h * start.y,
        vx: speed * start.vx,
        vy: speed * start.vy,
        r: BALL_RADIUS
      }));
      levelState.ball = levelState.balls[0] || null;

      let validStarts = 0;
      let verticalStarts = 0;
      let horizontalStarts = 0;
      let maxFirstCapture = 0;
      const columns = 11;
      const rows = 11;
      for (let column = 1; column <= columns; column += 1) {
        for (let row = 1; row <= rows; row += 1) {
          const point = {
            x: auditRect.x + (auditRect.w * column) / (columns + 1),
            y: auditRect.y + (auditRect.h * row) / (rows + 1)
          };
          ["vertical", "horizontal"].forEach((orientation) => {
            const castResult = getLineCastResult(point, orientation, auditRect);
            if (!castResult.canBuild) {
              return;
            }
            const splitResult = getPotentialSplitResultFromCast(castResult);
            if (!splitResult.canKeepLine) {
              return;
            }

            validStarts += 1;
            if (orientation === "vertical") {
              verticalStarts += 1;
            } else {
              horizontalStarts += 1;
            }
            maxFirstCapture = Math.max(
              maxFirstCapture,
              (splitResult.capturableArea / Math.max(1, rectArea(auditRect))) * 100
            );
          });
        }
      }

      const dangerObstacles = levelState.obstacles.filter((obstacle) => obstacle.dangerForLine).length;
      const captureObstacles = getCaptureObstacles().length;
      const movingObstacles = levelState.obstacles.filter((obstacle) => obstacle.moving).length;
      const riskFlags = [
        config.target >= 86 ? "high-target" : null,
        config.balls >= 4 ? "four-balls" : null,
        config.speed === "fast" ? "fast" : null,
        dangerObstacles >= 2 ? "many-danger" : null,
        movingObstacles >= 2 ? "many-moving" : null,
        validStarts < 6 ? "few-openers" : null,
        maxFirstCapture < 6 ? "low-first-capture" : null
      ].filter(Boolean);

      return {
        level: levelNumber,
        target: config.target,
        balls: config.balls,
        speed: config.speed,
        obstacles: levelState.obstacles.length,
        dangerObstacles,
        captureObstacles,
        movingObstacles,
        validStarts,
        verticalStarts,
        horizontalStarts,
        maxFirstCapture: Math.round(maxFirstCapture * 10) / 10,
        risk: riskFlags.join(", ")
      };
    };

    const selectedLevels = (Array.isArray(levels) ? levels : [levels])
      .map((levelNumber) => Math.max(1, Math.min(TOTAL_LEVELS, Math.round(Number(levelNumber)))))
      .filter((levelNumber, index, list) => Number.isFinite(levelNumber) && list.indexOf(levelNumber) === index);
    let report = [];
    try {
      report = selectedLevels.map(scanLevel);
    } finally {
      stateKeys.forEach((key) => {
        levelState[key] = previous[key];
      });
    }

    console.table(report);
    return report;
  };

  const openChapter = (chapterId) => {
    stopJezzLevel();
    const nextChapterId = clampChapterId(chapterId);
    state.currentChapter = nextChapterId;
    renderChapterScreen(nextChapterId, { force: true });
    renderAllChapters();
    syncLevelBoostButtons();
    document.querySelectorAll("button").forEach(setPressedFeedback);
    updateInventoryBadge();
    showScreen(getChapterScreenId(nextChapterId));
    saveProgress();
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (!shouldRestart) {
      return;
    }

    setCompletionActions(isCompletedLevel(state.selectedLevel));
    stopJezzLevel();
    await showFullscreenAdForUserPause();
    window.requestAnimationFrame(startJezzLevel);
  };
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    window.requestAnimationFrame(() => {
      startJezzLevel();
      syncViewportLayoutNow();
      jezzCanvas?.focus({ preventScroll: true });
      syncKeyboardAim();
    });
  };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const showCompletionChestNotice = async () => {
      if (!completion.chapterChestId) {
        return;
      }

      renderInventory();
      updateInventoryBadge();
    };
<<<<<<< HEAD

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

=======

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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const handleAction = async (event) => {
    const orientationButton = event.target.closest("[data-line-orientation]");
    if (orientationButton) {
      setLineOrientation(orientationButton.dataset.lineOrientation);
      return;
    }

    const button = event.target.closest("[data-action]");
<<<<<<< HEAD
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const screen = button.closest(".chapter-screen");
    const chapterId = screen ? Number(screen.dataset.chapter) : state.currentChapter;

=======
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const screen = button.closest(".chapter-screen");
    const chapterId = screen ? Number(screen.dataset.chapter) : state.currentChapter;

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (action === "main-menu") {
      if (!(await confirmLeaveLevel())) {
        return;
      }
      const shouldShowExitAd = levelScreen.classList.contains("is-active") && !levelState.completed;
      if (levelState.completed) {
        await completeSelectedLevel("stay");
      }
      if (shouldShowExitAd) {
        await showFullscreenAdForUserPause();
      } else {
        stopJezzLevel();
      }
      showScreen("main-menu");
      playButton.disabled = false;
      saveProgress();
<<<<<<< HEAD
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

=======
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

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (action === "return-chapter") {
      if (!(await confirmLeaveLevel())) {
        return;
      }
      const shouldShowExitAd = levelScreen.classList.contains("is-active") && !levelState.completed;
      if (levelState.completed) {
        await completeSelectedLevel("stay");
      }
      if (shouldShowExitAd) {
        await showFullscreenAdForUserPause();
      }
      openChapter(state.currentChapter);
      return;
    }
<<<<<<< HEAD

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
=======

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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    }

    if (action === "achievements") {
      openAchievementsPanel();
      return;
    }
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (action === "shop") {
      openInventoryModal("recommended");
      return;
    }
<<<<<<< HEAD

    if (action === "inventory") {
      openInventoryModal();
      return;
    }

    if (action === "chests") {
      await showChestsPanel();
      return;
    }

=======

    if (action === "inventory") {
      openInventoryModal();
      return;
    }

    if (action === "chests") {
      await showChestsPanel();
      return;
    }

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  };

  const handleLevelBoostClick = (event) => {
    const boostButton = event.target.closest("[data-level-boost]");
    if (!boostButton || boostButton.disabled) {
      return;
    }
    useLevelBooster(boostButton.dataset.levelBoost);
  };

  const blockBrowserGesture = (event) => {
    if (event.type === "touchmove" && event.target.closest(".chapter-list, .inventory-content, .inventory-tabs, .achievements-list")) {
      return;
    }
<<<<<<< HEAD

    if (event.cancelable) {
      event.preventDefault();
    }
  };

=======

    if (event.cancelable) {
      event.preventDefault();
    }
  };

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  playButton.addEventListener("click", () => {
    playButton.classList.add("is-starting");
    window.setTimeout(() => {
      playButton.classList.remove("is-starting");
      openProgressChapter();
    }, 220);
  });

  completeCloseButton?.addEventListener("click", () => {
    completeSelectedLevel("chapters");
  });
  completeReplayButton?.addEventListener("click", () => {
    replayCompletedLevel();
  });
  completeNextButton?.addEventListener("click", () => {
    completeSelectedLevel(completeNextButton.dataset.destination || "next");
  });
  inventoryCloseButton?.addEventListener("click", () => {
    closeInventoryModal();
  });
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
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    const actionButton = event.target.closest("[data-inventory-action]");
    if (!actionButton) {
      return;
    }
    if (actionButton.disabled || actionButton.getAttribute("aria-disabled") === "true") {
      return;
    }

    const action = actionButton.dataset.inventoryAction;
    if (action === "open-chest") {
      const chapterId = Number(actionButton.dataset.chapterId);
      closeInventoryModal();
      await waitNextFrame();
      await showChapterChestClaimPanel(chapterId);
      return;
    }
<<<<<<< HEAD

=======

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
    if (action === "open-all-chests") {
      closeInventoryModal();
      await waitNextFrame();
      await openAllPendingChests();
      return;
    }

    if (action === "buy-booster") {
      buyBooster(actionButton.dataset.boosterId);
      return;
    }

    if (action === "buy-life") {
      buyLifeItem(actionButton.dataset.lifeId);
      return;
    }

    if (action === "buy-chest") {
      buyShopChest(actionButton.dataset.chestId);
      return;
    }

    if (action === "buy-skin") {
      buySkin(actionButton.dataset.cosmeticGroup, actionButton.dataset.skinId);
      return;
    }

    if (action === "watch-ad") {
      const adItem = SHOP_AD_REWARDS[actionButton.dataset.adId];
      if (adItem?.reward?.lives && getMissingLives() <= 0) {
        showShopNotice(t("livesFull"));
        renderInventory();
        return;
      }
      if (adItem) {
        await showRewardedShopAd(adItem);
      }
      return;
    }

    if (action === "buy-iap") {
      await buyIapProduct(actionButton.dataset.productId);
      return;
    }

    if (action === "claim-gift") {
      claimGift(actionButton.dataset.giftId);
<<<<<<< HEAD
      return;
    }

    if (action === "equip-skin") {
      equipSkin(actionButton.dataset.cosmeticGroup, actionButton.dataset.skinId);
      return;
    }

  });
  confirmCancelButton?.addEventListener("click", () => closeConfirm(false));
  confirmAcceptButton?.addEventListener("click", () => closeConfirm(true));
  confirmModal?.addEventListener("click", (event) => {
    if (event.target === confirmModal) {
      closeConfirm(false);
    }
  });
=======
      return;
    }

    if (action === "equip-skin") {
      equipSkin(actionButton.dataset.cosmeticGroup, actionButton.dataset.skinId);
      return;
    }

  });
  confirmCancelButton?.addEventListener("click", () => closeConfirm(false));
  confirmAcceptButton?.addEventListener("click", () => closeConfirm(true));
  confirmModal?.addEventListener("click", (event) => {
    if (event.target === confirmModal) {
      closeConfirm(false);
    }
  });
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  window.setInterval(updateLifeRestore, 1000);
  document.addEventListener("keydown", handleModalKeydown);
  document.addEventListener("click", handleLevelBoostClick);
  document.addEventListener("click", handleAction);
  document.addEventListener("contextmenu", blockBrowserGesture);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  const observeViewportLayout = () => {
    if (!("ResizeObserver" in window) || layoutObserver) {
      return;
    }

    layoutObserver = new ResizeObserver(() => syncViewportLayout());
    [root, levelPlayfield, jezzCanvas].forEach((element) => {
      if (element) {
        layoutObserver.observe(element);
      }
    });
  };

  window.addEventListener("resize", () => syncViewportLayout());
  window.addEventListener("orientationchange", () => syncViewportLayout());
  window.visualViewport?.addEventListener("resize", () => syncViewportLayout());
  window.visualViewport?.addEventListener("scroll", () => syncViewportLayout());
  document.addEventListener("fullscreenchange", () => syncViewportLayout());
  document.addEventListener("webkitfullscreenchange", () => syncViewportLayout());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseJezzLevelForPlatform();
    } else {
      resumeJezzLevelFromPlatform();
    }
    syncViewportLayout();
  });
<<<<<<< HEAD
  window.addEventListener("beforeunload", () => {
    saveProgressImmediate({ flushCloud: true });
    submitLeaderboardScore();
  });

=======
  window.addEventListener("beforeunload", () => {
    saveProgressImmediate({ flushCloud: true });
    submitLeaderboardScore();
  });

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  if (isLikelyMobileDevice()) {
    lowPerformanceMode = true;
    root?.classList.add("is-low-performance");
  }
  createPerfOverlay();
  loadProgress();
  updateLifeRestore();
  observeViewportLayout();
  syncViewportLayoutNow({ resizeLevel: false });
  renderChapterScreens();
<<<<<<< HEAD
  initYandexSdk();

=======
  initYandexSdk();

>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
  if (IS_DEBUG) {
    window.showScreen = showScreen;
    window.auditJezzBallLevels = runDevLevelAudit;
    window.JezzBallChapterMap = {
      chapters,
      state,
      auditLevels: runDevLevelAudit,
      openChapter,
      openLevel,
<<<<<<< HEAD
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
=======
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
>>>>>>> 6a9cc0cf46cd716e8056eab7d87af6f6ff409098
