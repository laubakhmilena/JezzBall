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
  const LEVEL_ONE_TARGET = 75;
  const STAR_REWARDS = {
    1: { coins: 80, restoreLife: false },
    2: { coins: 120, restoreLife: false },
    3: { coins: 180, restoreLife: true }
  };
  const LINE_GROW_SPEED = 420;
  const BALL_RADIUS = 11;

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

  const SUPPORTED_LANGUAGES = ["ru", "en", "it"];
  const FALLBACK_LANGUAGE = "en";
  const yandexState = {
    sdk: null,
    lang: "ru",
    readySent: false
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
      replayTitle: "Пройти уровень заново?",
      replayMessage: "",
      cancel: "Отмена",
      noLivesTitle: "Нет жизней",
      noLivesMessage: "Нужна жизнь для старта уровня. Подожди восстановления или получи жизнь за награду.",
      ok: "Понятно"
    },
    en: {
      pageTitle: "JezzBall - chapter map",
      gameRoot: "JezzBall game screen",
      subtitleStart: "Draw a line. ",
      subtitleAccent: "Claim the space.",
      mainMenu: "Main menu",
      play: "Play",
      levelScreen: "Level screen",
      topPanel: "Top panel",
      backToChapter: "Back to chapter",
      resources: "Resources",
      coins: "Coins",
      lives: "Lives",
      levelStars: "Level stars",
      totalStars: "Total stars",
      settings: "Settings",
      levelGoal: "Level goal",
      chapter: "Chapter",
      level: "Level",
      target: "Goal",
      captured: "Captured",
      penalties: "Penalties",
      playfield: "JezzBall playfield",
      toChapters: "To chapters",
      levelComplete: "Level complete!",
      earnedStars: "Earned stars",
      capturedField: "You captured {percent}% of the field!",
      rewards: "Rewards",
      replay: "Play again",
      nextLevel: "Next level",
      levelHintPanel: "Level hint",
      levelHint: "Draw lines and close areas to capture space.",
      toGoal: "to goal",
      final: "Final",
      finalUnlocked: "Final unlocked",
      finalTitle: "The Gates of Light are complete",
      toMenu: "Menu",
      closeSettings: "Close settings",
      music: "Music",
      sounds: "Sounds",
      confirm: "Confirmation",
      continue: "Continue?",
      stay: "Stay",
      yes: "Yes",
      shop: "Shop",
      achievements: "Achievements",
      chapterSelect: "Chapter select",
      chapterSelectHint: "Complete levels and unlock new chapters",
      shopAndAchievements: "Shop and achievements",
      stars: "Stars",
      nextChapter: "Go to the next chapter",
      toFinal: "Go to the final",
      collapseChapter: "Collapse chapter",
      expandChapter: "Expand chapter",
      currentLevel: "Current level {level}",
      completedLevel: "Completed level {level}, stars: {stars}",
      lockedLevel: "Level {level} locked",
      tooClose: "Too close to the edge",
      penalty: "Penalty",
      leaveTitle: "Leave the level?",
      leaveMessage: "Progress in the current attempt will not be saved. Stay in the game?",
      leaveAccept: "Leave",
      replayTitle: "Replay this level?",
      replayMessage: "Level {level} is already complete. Start it again?",
      cancel: "Cancel",
      noLivesTitle: "No lives",
      noLivesMessage: "You need a life to start a level. Wait for recovery or earn one as a reward.",
      ok: "OK"
    },
    it: {
      pageTitle: "JezzBall - mappa dei capitoli",
      gameRoot: "Schermata di gioco JezzBall",
      subtitleStart: "Disegna una linea. ",
      subtitleAccent: "Conquista lo spazio.",
      mainMenu: "Menu principale",
      play: "Gioca",
      levelScreen: "Schermata livello",
      topPanel: "Pannello superiore",
      backToChapter: "Torna al capitolo",
      resources: "Risorse",
      coins: "Monete",
      lives: "Vite",
      levelStars: "Stelle del livello",
      totalStars: "Stelle totali",
      settings: "Impostazioni",
      levelGoal: "Obiettivo del livello",
      chapter: "Capitolo",
      level: "Livello",
      target: "Obiettivo",
      captured: "Conquistato",
      penalties: "Penalita",
      playfield: "Campo di gioco JezzBall",
      toChapters: "Ai capitoli",
      levelComplete: "Livello completato!",
      earnedStars: "Stelle ottenute",
      capturedField: "Hai conquistato il {percent}% del campo!",
      rewards: "Ricompense",
      replay: "Gioca ancora",
      nextLevel: "Livello successivo",
      levelHintPanel: "Suggerimento livello",
      levelHint: "Disegna linee e chiudi aree per conquistare spazio.",
      toGoal: "all'obiettivo",
      final: "Finale",
      finalUnlocked: "Finale sbloccato",
      finalTitle: "Le Porte della Luce sono completate",
      toMenu: "Menu",
      closeSettings: "Chiudi impostazioni",
      music: "Musica",
      sounds: "Suoni",
      confirm: "Conferma",
      continue: "Continuare?",
      stay: "Resta",
      yes: "Si",
      shop: "Negozio",
      achievements: "Traguardi",
      chapterSelect: "Seleziona capitolo",
      chapterSelectHint: "Completa i livelli e sblocca nuovi capitoli",
      shopAndAchievements: "Negozio e traguardi",
      stars: "Stelle",
      nextChapter: "Vai al capitolo successivo",
      toFinal: "Vai al finale",
      collapseChapter: "Comprimi capitolo",
      expandChapter: "Espandi capitolo",
      currentLevel: "Livello attuale {level}",
      completedLevel: "Livello {level} completato, stelle: {stars}",
      lockedLevel: "Livello {level} bloccato",
      tooClose: "Troppo vicino al bordo",
      penalty: "Penalita",
      leaveTitle: "Uscire dal livello?",
      leaveMessage: "I progressi del tentativo attuale non saranno salvati. Restare in gioco?",
      leaveAccept: "Esci",
      replayTitle: "Rigiocare il livello?",
      replayMessage: "Il livello {level} e gia completato. Iniziarlo di nuovo?",
      cancel: "Annulla",
      noLivesTitle: "Nessuna vita",
      noLivesMessage: "Serve una vita per iniziare un livello. Attendi il recupero o ottienine una come ricompensa.",
      ok: "OK"
    }
  };

  const chapterTitles = {
    en: ["Sunny Glade", "Mysterious Forest", "Crystal Caves", "Forgotten Tower", "Fiery Peaks", "Sky Islands", "City Lights", "Neon Rhythm", "Star Path", "Gates of Light"],
    it: ["Radura soleggiata", "Foresta misteriosa", "Grotte di cristallo", "Torre dimenticata", "Cime infuocate", "Isole del cielo", "Luci della citta", "Ritmo neon", "Sentiero stellare", "Porte della Luce"]
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
    expandedChapters: new Set([1])
  };

  const levelState = {
    running: false,
    completed: false,
    target: LEVEL_ONE_TARGET,
    capturedArea: 0,
    totalArea: 1,
    penalties: 0,
    rect: null,
    activeRect: null,
    capturedRects: [],
    walls: [],
    activeLine: null,
    draftPointer: null,
    aimPointer: null,
    ball: null,
    animationId: null,
    lastFrameAt: 0,
    toastTimer: null,
    lastCompletion: null
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
    const titles = chapterTitles[yandexState.lang];
    return titles ? titles[chapter.id - 1] : chapter.title;
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
    setAttribute("#completeCloseButton", "aria-label", t("toChapters"));
    setText("#rewardTitle", t("levelComplete"));
    setAttribute("#rewardStars", "aria-label", t("earnedStars"));
    if (levelCompleteScore) {
      const percent = levelCompleteScore.textContent.replace("%", "") || "75";
      const [before, after] = t("capturedField", { percent }).split(`${percent}%`);
      document.querySelector(".reward-capture")?.replaceChildren(before || "", levelCompleteScore, after || "");
    }
    setText(".reward-prizes h3", t("rewards"));
    setText("#completeReplayButton", t("replay"));
    setText("#completeNextButton", t("nextLevel"));
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
      applyLanguage(yandexState.sdk?.environment?.i18n?.lang || navigator.language);
      renderChapterScreens();
      yandexState.sdk?.features?.LoadingAPI?.ready?.();
      yandexState.readySent = true;
    } catch (_error) {
      applyLanguage("ru");
    }
  };

  const clampChapterId = (chapterId) => Math.min(chapters.length, Math.max(1, chapterId));
  const getChapter = (chapterId) => chapters[clampChapterId(chapterId) - 1];
  const getChapterScreenId = (chapterId) => `chapter-${clampChapterId(chapterId)}-screen`;
  const getChapterForLevel = (level) => Math.min(chapters.length, Math.max(1, Math.ceil(level / 10)));
  const getChapterLevelStart = (chapterId) => (chapterId - 1) * 10 + 1;
  const getChapterLevelEnd = (chapterId) => chapterId * 10;
  const getStarReward = (stars) => STAR_REWARDS[Math.max(1, Math.min(3, stars))] || STAR_REWARDS[1];
  const getLevelCoinReward = (_level, stars = 1) => getStarReward(stars).coins;
  const getRewardDelta = (stars, previousStars = 0) => {
    const bestStars = Math.max(0, Math.min(3, previousStars));
    const nextStars = Math.max(0, Math.min(3, stars));
    if (nextStars <= bestStars) {
      return { stars: 0, coins: 0, restoreLife: false };
    }

    return {
      stars: nextStars - bestStars,
      coins: getStarReward(nextStars).coins - (bestStars > 0 ? getStarReward(bestStars).coins : 0),
      restoreLife: nextStars >= 3 && bestStars < 3
    };
  };

  const getStarsForResult = (percent, penalties) => {
    if (percent >= 90 && penalties === 0) {
      return 3;
    }

    if (percent >= 80 && penalties <= 1) {
      return 2;
    }

    return percent >= LEVEL_ONE_TARGET ? 1 : 0;
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

    return `
      <article class="chapter-card ${isExpanded ? "is-expanded" : ""} ${isUnlocked ? "is-unlocked" : "is-locked"} ${isCurrentChapter ? "is-current-chapter" : ""}" data-chapter-card="${chapter.id}">
        <div class="chapter-card-head">
          <span class="chapter-badge" aria-hidden="true"><span class="chapter-badge-icon">${chapter.icon}</span></span>
          <span class="chapter-card-copy">
            <span class="chapter-kicker">${t("chapter")} ${chapter.id}</span>
            <span class="chapter-card-title">${getChapterTitle(chapter.id)}</span>
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
      state.currentLevel = Math.max(1, Math.min(101, Math.round(Number(saved.currentLevel) || state.currentLevel)));
      state.selectedLevel = Math.max(1, Math.min(100, Math.round(Number(saved.selectedLevel) || state.selectedLevel)));
      state.coins = Math.max(0, Math.round(Number(saved.coins) || 0));
      state.lives = Math.max(0, Math.min(MAX_LIVES, Math.round(Number(saved.lives) || 0)));
      state.nextLifeAt = Number.isFinite(Number(saved.nextLifeAt)) ? Number(saved.nextLifeAt) : null;
      state.music = saved.music !== false;
      state.sound = saved.sound !== false;
      state.starsByLevel = saved.starsByLevel && typeof saved.starsByLevel === "object" ? saved.starsByLevel : {};
      state.expandedChapters = new Set(
        Array.isArray(saved.expandedChapters)
          ? saved.expandedChapters.map(Number).filter((chapterId) => chapterId >= 1 && chapterId <= chapters.length)
          : [getChapterForLevel(state.currentLevel)]
      );
      state.expandedChapters.add(getChapterForLevel(state.currentLevel));
    } catch (_error) {
      state.expandedChapters = new Set([getChapterForLevel(state.currentLevel)]);
    }
  };

  const showConfirm = ({ title, message, acceptText = t("yes"), cancelText = t("stay") }) => {
    if (!confirmModal) {
      return Promise.resolve(true);
    }

    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmAcceptButton.textContent = acceptText;
    confirmCancelButton.textContent = cancelText;
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

  const isCompletedLevel = (level) => level < state.currentLevel || (state.starsByLevel[level] || 0) > 0;

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
      const isChapterComplete = state.currentLevel > getChapterLevelEnd(chapter.id);
      ctas.forEach((cta) => {
        cta.classList.toggle("is-visible", isChapterComplete);
        cta.setAttribute("aria-hidden", isChapterComplete ? "false" : "true");
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

  const clampBallToActiveRect = () => {
    const ball = levelState.ball;
    const rect = levelState.activeRect;
    if (!ball || !rect) {
      return;
    }

    ball.x = Math.min(rect.x + rect.w - ball.r, Math.max(rect.x + ball.r, ball.x));
    ball.y = Math.min(rect.y + rect.h - ball.r, Math.max(rect.y + ball.r, ball.y));
  };

  const buildCompletedWall = (line, rect) => (
    line.orientation === "vertical"
      ? { orientation: "vertical", x: line.x, y1: rect.y, y2: rect.y + rect.h }
      : { orientation: "horizontal", y: line.y, x1: rect.x, x2: rect.x + rect.w }
  );

  const splitActiveRect = (line) => {
    const rect = levelState.activeRect;
    const ball = levelState.ball;
    if (!rect || !ball) {
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

    const ballRect = pointInRect(ball, first) ? first : second;
    const capturedRect = ballRect === first ? second : first;
    levelState.activeRect = ballRect;
    levelState.capturedRects.push(capturedRect);
    levelState.capturedArea += rectArea(capturedRect);
    levelState.walls.push(buildCompletedWall(line, rect));
    clampBallToActiveRect();
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
    const ball = levelState.ball;
    if (!line || !ball) {
      return false;
    }

    if (line.orientation === "vertical") {
      const minY = Math.min(line.y, line.endA, line.endB);
      const maxY = Math.max(line.y, line.endA, line.endB);
      return Math.abs(ball.x - line.x) <= ball.r && ball.y >= minY - ball.r && ball.y <= maxY + ball.r;
    }

    const minX = Math.min(line.x, line.endA, line.endB);
    const maxX = Math.max(line.x, line.endA, line.endB);
    return Math.abs(ball.y - line.y) <= ball.r && ball.x >= minX - ball.r && ball.x <= maxX + ball.r;
  };

  const updateActiveLine = (dt) => {
    const line = levelState.activeLine;
    const rect = levelState.activeRect;
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

    if (lineHitBall(line)) {
      cancelActiveLine(true);
      return;
    }

    if (line.done) {
      levelState.activeLine = null;
      splitActiveRect(line);
    }
  };

  const updateBall = (dt) => {
    const ball = levelState.ball;
    const rect = levelState.activeRect;
    if (!ball || !rect || levelState.completed) {
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

    const line = levelState.activeLine;
    if (line) {
      ctx.strokeStyle = "rgba(255, 72, 184, 0.96)";
      ctx.lineWidth = 6;
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
    if (aim && !line && levelState.activeRect) {
      const orientation = aim.orientation || getFallbackLineOrientation(aim, levelState.activeRect);
      ctx.save();
      ctx.strokeStyle = "rgba(255, 246, 145, 0.94)";
      ctx.lineWidth = levelState.draftPointer ? 4 : 3;
      ctx.lineCap = "round";
      ctx.setLineDash(levelState.draftPointer ? [14, 10] : [8, 9]);
      ctx.shadowColor = "rgba(255, 219, 76, 0.82)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      if (orientation === "vertical") {
        ctx.moveTo(aim.x, levelState.activeRect.y + 8);
        ctx.lineTo(aim.x, levelState.activeRect.y + levelState.activeRect.h - 8);
      } else {
        ctx.moveTo(levelState.activeRect.x + 8, aim.y);
        ctx.lineTo(levelState.activeRect.x + levelState.activeRect.w - 8, aim.y);
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

    const ball = levelState.ball;
    if (ball) {
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
    }
    ctx.restore();
  };

  function finishJezzLevel() {
    if (levelState.completed) {
      return;
    }

    levelState.completed = true;
    levelState.running = false;
    levelState.activeLine = null;
    const percent = Math.floor(getCaptureRatio() * 100);
    const stars = getStarsForResult(percent, levelState.penalties);
    const previousStars = state.starsByLevel[state.selectedLevel] || 0;
    const reward = getRewardDelta(stars, previousStars);
    levelState.lastCompletion = {
      level: state.selectedLevel,
      percent,
      penalties: levelState.penalties,
      stars,
      awardedStars: reward.stars,
      coins: reward.coins,
      restoreLife: reward.restoreLife,
      applied: false
    };
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
      rewardLife.textContent = reward.restoreLife ? "+1" : "0";
    }
    if (rewardLifePrize) {
      rewardLifePrize.hidden = !reward.restoreLife;
    }
    if (rewardPrizes) {
      rewardPrizes.dataset.prizeCount = reward.restoreLife ? "2" : "1";
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
    updateBall(dt);
    updateActiveLine(dt);
    drawJezzLevel();
    levelState.animationId = window.requestAnimationFrame(tickJezzLevel);
  };

  const stopJezzLevel = () => {
    levelState.running = false;
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
    levelState.capturedRects = levelState.capturedRects.map((rect) => mapRectBetweenRects(rect, oldRect, nextRect));
    levelState.walls = levelState.walls.map((wall) => mapWallBetweenRects(wall, oldRect, nextRect));
    levelState.capturedArea = levelState.capturedRects.reduce((sum, rect) => sum + rectArea(rect), 0);
    levelState.totalArea = rectArea(nextRect);
    levelState.activeLine = null;
    levelState.draftPointer = null;

    if (levelState.ball) {
      const nextBall = mapPointBetweenRects(levelState.ball, oldRect, nextRect);
      levelState.ball.x = nextBall.x;
      levelState.ball.y = nextBall.y;
    }

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
    const speed = 190;
    levelState.running = true;
    levelState.completed = false;
    levelState.target = LEVEL_ONE_TARGET;
    levelState.capturedArea = 0;
    levelState.totalArea = rectArea(rect);
    levelState.penalties = 0;
    levelState.rect = rect;
    levelState.activeRect = { ...rect };
    levelState.capturedRects = [];
    levelState.walls = [];
    levelState.activeLine = null;
    levelState.draftPointer = null;
    levelState.aimPointer = null;
    levelState.lastCompletion = null;
    levelState.ball = {
      x: rect.x + rect.w * 0.64,
      y: rect.y + rect.h * 0.42,
      vx: speed * 0.78,
      vy: speed * 0.62,
      r: BALL_RADIUS
    };
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
    const rect = levelState.activeRect;
    if (!pointInRect(point, rect)) {
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
        orientation
      };
      drawJezzLevel();
      return;
    }

    startActiveLine(point, orientation);
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

  const startActiveLine = (point, orientation) => {
    levelState.activeLine = orientation === "vertical"
      ? { orientation, x: point.x, y: point.y, endA: point.y, endB: point.y, done: false }
      : { orientation, x: point.x, y: point.y, endA: point.x, endB: point.x, done: false };
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
    if (!pointInRect(point, levelState.activeRect)) {
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
      : getFallbackLineOrientation(point, levelState.activeRect);

    if (levelState.draftPointer) {
      levelState.draftPointer = {
        x: point.x,
        y: point.y,
        orientation
      };
      drawJezzLevel();
      return;
    }

    levelState.aimPointer = {
      x: point.x,
      y: point.y,
      orientation
    };
    drawJezzLevel();
  };

  const finishLinePointer = (event) => {
    if (levelState.draftPointer && levelState.running && !levelState.completed && !levelState.activeLine && levelState.activeRect) {
      const point = getCanvasPoint(event);
      const draft = pointInRect(point, levelState.activeRect)
        ? {
          x: point.x,
          y: point.y,
          orientation: levelState.draftPointer.orientation
        }
        : levelState.draftPointer;
      levelState.draftPointer = null;
      levelState.aimPointer = null;
      event.preventDefault();
      startActiveLine(draft, draft.orientation);
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

  const openLevel = async (level, options = {}) => {
    if (level > state.currentLevel) {
      return;
    }

    if (!options.skipReplayConfirm && isCompletedLevel(level)) {
      const shouldReplay = await showConfirm({
        title: "Пройти уровень заново?",
        message: "",
        acceptText: "Играть",
        cancelText: "Отмена"
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
        cancelText: t("closeSettings")
      });
      return;
    }

    const chapter = getChapter(getChapterForLevel(level));
    state.selectedLevel = level;
    state.currentChapter = chapter.id;
    levelScreen.className = `level-screen screen chapter-${chapter.id}`;
    levelChapterLabel.textContent = `${t("chapter")} ${chapter.id} · ${getChapterTitle(chapter.id)}`;
    levelTitle.textContent = `${t("level")} ${level}`;
    showScreen("level-screen");
    saveProgress();
    window.requestAnimationFrame(startJezzLevel);
  };

  const completeSelectedLevel = (destination = "chapters") => {
    const completedChapterId = getChapterForLevel(state.selectedLevel);
    const completion = levelState.lastCompletion || {
      level: state.selectedLevel,
      stars: 1,
      awardedStars: 1,
      coins: getRewardDelta(1, state.starsByLevel[state.selectedLevel] || 0).coins,
      restoreLife: false,
      applied: false
    };

    if (!completion.applied) {
      const previousStars = state.starsByLevel[state.selectedLevel] || 0;
      const improvedStars = completion.stars > previousStars;
      const reward = getRewardDelta(completion.stars, previousStars);

      if (improvedStars) {
        state.starsByLevel[state.selectedLevel] = completion.stars;
      }

      if (state.selectedLevel === state.currentLevel) {
        state.coins += reward.coins;
        if (reward.restoreLife) {
          restoreLife();
        }
        state.currentLevel = Math.min(101, state.currentLevel + 1);
        completion.applied = true;
        completion.awardedStars = reward.stars;
        completion.coins = reward.coins;
        completion.restoreLife = reward.restoreLife;
        levelState.lastCompletion = completion;
        renderChapterScreens();
      } else if (improvedStars) {
        state.coins += reward.coins;
        if (reward.restoreLife) {
          restoreLife();
        }
        completion.applied = true;
        completion.awardedStars = reward.stars;
        completion.coins = reward.coins;
        completion.restoreLife = reward.restoreLife;
        levelState.lastCompletion = completion;
        renderChapterScreens();
      } else {
        completion.applied = true;
        completion.awardedStars = 0;
        completion.coins = 0;
        completion.restoreLife = false;
        levelState.lastCompletion = completion;
      }
    }

    if (destination === "next" && state.currentLevel <= 100) {
      openLevel(state.currentLevel, { skipReplayConfirm: true });
      return;
    }

    if (destination === "next") {
      showScreen("final-screen");
      return;
    }

    if (destination === "stay") {
      return;
    }

    openChapter(completedChapterId);
  };

  const replayCompletedLevel = () => {
    completeSelectedLevel("stay");
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
        completeSelectedLevel("stay");
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
        completeSelectedLevel("stay");
      }
      openChapter(state.currentChapter);
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
  completeNextButton?.addEventListener("click", () => completeSelectedLevel("next"));
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

      state.currentLevel = Math.max(1, Math.min(101, Math.round(parsedLevel)));
      renderChapterScreens();
      openChapter(getChapterForLevel(state.currentLevel));
    }
  };

  const initialChapterMatch = window.location.hash.match(/^#chapter-(\d+)-screen$/);
  if (initialChapterMatch) {
    openChapter(Number(initialChapterMatch[1]));
  }
})();
