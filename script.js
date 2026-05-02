(() => {
  const root = document.getElementById("gameRoot");
  const playButton = document.getElementById("playButton");
  const levelScreen = document.getElementById("level-screen");
  const levelChapterLabel = document.getElementById("levelChapterLabel");
  const levelTitle = document.getElementById("levelTitle");
  const completeLevelButton = document.getElementById("completeLevelButton");
  const jezzCanvas = document.getElementById("jezzCanvas");
  const capturePercent = document.getElementById("capturePercent");
  const penaltyCount = document.getElementById("penaltyCount");
  const targetPercent = document.getElementById("targetPercent");
  const levelToast = document.getElementById("levelToast");
  const levelCompletePanel = document.getElementById("levelCompletePanel");
  const levelCompleteScore = document.getElementById("levelCompleteScore");
  const settingsModal = document.getElementById("settingsModal");
  const musicToggle = document.getElementById("musicToggle");
  const soundToggle = document.getElementById("soundToggle");
  const MAX_LIVES = 5;
  const LIFE_RESTORE_MS = 10 * 60 * 1000;
  const BASE_LEVEL_COIN_REWARD = 80;
  const LEVEL_ONE_TARGET = 60;
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
    ball: null,
    animationId: null,
    lastFrameAt: 0,
    toastTimer: null
  };

  const clampChapterId = (chapterId) => Math.min(chapters.length, Math.max(1, chapterId));
  const getChapter = (chapterId) => chapters[clampChapterId(chapterId) - 1];
  const getChapterScreenId = (chapterId) => `chapter-${clampChapterId(chapterId)}-screen`;
  const getChapterForLevel = (level) => Math.min(chapters.length, Math.max(1, Math.ceil(level / 10)));
  const getChapterLevelStart = (chapterId) => (chapterId - 1) * 10 + 1;
  const getChapterLevelEnd = (chapterId) => chapterId * 10;
  const getLevelCoinReward = (level) => BASE_LEVEL_COIN_REWARD + Math.max(0, getChapterForLevel(level) - 1) * 10;

  const createIconButton = (action, label, path, extraClass = "") => `
    <button class="icon-button ${extraClass}" type="button" data-action="${action}" aria-label="${label}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>
    </button>
  `;

  const createTopUi = () => `
    <header class="top-ui" aria-label="Верхняя панель">
      ${createIconButton("main-menu", "В меню", "M14.7 5.3a1 1 0 0 1 0 1.4L10.41 11H20a1 1 0 1 1 0 2h-9.59l4.3 4.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 0Z", "chapter-top-back")}
      <div class="resource-strip" aria-label="Ресурсы">
        <div class="resource-pill resource-counter lives-pill" aria-label="Жизни"><span class="resource-icon" aria-hidden="true">♥</span><span data-resource="lives">5</span></div>
        <div class="resource-pill resource-counter coins-pill" aria-label="Монеты"><span class="resource-icon" aria-hidden="true">●</span><span data-resource="coins">0</span></div>
      </div>
      ${createIconButton("settings", "Настройки", "M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.3 7.3 0 0 0-1.69-.98L14.5 2.42A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.49.42L9.13 5.07c-.61.24-1.18.56-1.69.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65a7.9 7.9 0 0 0 0 1.96l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46c.13.23.4.32.64.22l2.49-1c.51.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.24 1.18-.56 1.69-.98l2.49 1c.24.1.51.01.64-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.18-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z", "settings-button")}
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
      button.setAttribute("aria-label", `Текущий уровень ${level}`);
    } else if (isCompleted) {
      button.classList.add("is-completed");
      button.setAttribute("aria-label", `Пройденный уровень ${level}, звёзд: ${stars}`);
    } else {
      button.classList.add("is-locked");
      button.disabled = true;
      button.setAttribute("aria-label", `Уровень ${level} заблокирован`);
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
    const nextText = chapter.id === chapters.length ? "Перейти в финал" : "Перейти в следующую главу";
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
            <span class="chapter-kicker">Глава ${chapter.id}</span>
            <span class="chapter-card-title">${chapter.title}</span>
          </span>
          <button class="chapter-toggle" type="button" data-action="toggle-chapter" data-chapter-id="${chapter.id}" aria-expanded="${isExpanded ? "true" : "false"}" aria-label="${isExpanded ? "Свернуть главу" : "Раскрыть главу"}">
            <span class="chapter-chevron" aria-hidden="true">${isExpanded ? "⌃" : "⌄"}</span>
          </button>
        </div>
        ${levelsMarkup}
      </article>
    `;
  };

  const createChapterScreen = (chapter) => {
    const screen = document.getElementById(getChapterScreenId(chapter.id));

    screen.setAttribute("aria-label", `Глава ${chapter.id} ${chapter.title}`);
    screen.innerHTML = `
      <div class="chapter-scene">
        ${createTopUi()}
        <div class="chapter-select">
          <div class="chapter-select-title">
            <h2><span aria-hidden="true">✦</span>Выбор главы<span aria-hidden="true">✦</span></h2>
            <p>Проходите уровни и открывайте новые главы</p>
          </div>
          <div class="chapter-list">
            ${chapters.map((item) => createChapterItem(item)).join("")}
          </div>
        </div>
        <nav class="chapter-action-bar" aria-label="Магазин и достижения">
          <button type="button" data-action="shop"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14.26c-.75 0-1.41-.41-1.75-1.03L2 6.2V5h3.21l.94 2h12.9c.75 0 1.24.78.92 1.45l-2.42 5.05A2 2 0 0 1 15.74 14H8.1l-1.1 2h12v2H7c-1.52 0-2.48-1.63-1.75-2.96l1.03-1.86-.12-.24ZM7.1 9l1.42 3h7.22l1.44-3H7.1Z"/></svg>Магазин</button>
          <button type="button" data-action="achievements"><span aria-hidden="true">★</span>Достижения</button>
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

  const getEarnedStars = () => Object.values(state.starsByLevel).reduce((sum, stars) => sum + stars, 0);

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
    document.querySelectorAll('[data-resource="achievements"]').forEach((node) => {
      node.textContent = state.achievements;
    });
  };

  const restoreLife = () => {
    if (state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      syncResources();
      return;
    }

    state.lives += 1;
    state.nextLifeAt = state.lives < MAX_LIVES ? Date.now() + LIFE_RESTORE_MS : null;
    syncResources();
  };

  const updateLifeRestore = () => {
    if (!state.nextLifeAt || state.lives >= MAX_LIVES) {
      state.nextLifeAt = null;
      return;
    }

    if (Date.now() >= state.nextLifeAt) {
      restoreLife();
    }
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
      toggle?.setAttribute("aria-label", isExpanded ? "Свернуть главу" : "Раскрыть главу");
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
      showLevelToast("Слишком близко к краю");
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
      showLevelToast("Штраф");
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
    ctx.fillStyle = "rgba(20, 92, 94, 0.52)";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.88)";
    ctx.lineWidth = 4;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

    levelState.capturedRects.forEach((captured) => {
      ctx.fillStyle = "rgba(255, 210, 86, 0.62)";
      ctx.fillRect(captured.x, captured.y, captured.w, captured.h);
      ctx.strokeStyle = "rgba(255, 246, 188, 0.72)";
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
    if (levelCompleteScore) {
      levelCompleteScore.textContent = `${percent}%`;
    }
    levelCompletePanel?.classList.add("is-visible");
    levelCompletePanel?.setAttribute("aria-hidden", "false");
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
    levelState.draftPointer = {
      id: event.pointerId,
      x: point.x,
      y: point.y
    };
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
  };

  const continueLineFromPointer = (event) => {
    const draft = levelState.draftPointer;
    if (!draft || draft.id !== event.pointerId || levelState.activeLine) {
      return;
    }

    const point = getCanvasPoint(event);
    const dx = point.x - draft.x;
    const dy = point.y - draft.y;
    if (Math.hypot(dx, dy) < 8) {
      return;
    }

    event.preventDefault();
    startActiveLine(draft, Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical");
  };

  const finishLinePointer = (event) => {
    const draft = levelState.draftPointer;
    if (!draft || draft.id !== event.pointerId || levelState.activeLine || !levelState.activeRect) {
      return;
    }

    event.preventDefault();
    startActiveLine(draft, getFallbackLineOrientation(draft, levelState.activeRect));
  };

  const openChapter = (chapterId) => {
    stopJezzLevel();
    const nextChapterId = clampChapterId(chapterId);
    state.currentChapter = nextChapterId;
    showScreen(getChapterScreenId(nextChapterId));
  };

  const openProgressChapter = () => {
    openChapter(getChapterForLevel(state.currentLevel));
  };

  const openLevel = (level) => {
    if (level > state.currentLevel) {
      return;
    }

    if (state.lives <= 0) {
      syncResources();
      return;
    }

    const chapter = getChapter(getChapterForLevel(level));
    state.selectedLevel = level;
    state.currentChapter = chapter.id;
    levelScreen.className = `level-screen screen chapter-${chapter.id}`;
    levelChapterLabel.textContent = `Глава ${chapter.id} · ${chapter.title}`;
    levelTitle.textContent = `Уровень ${level}`;
    showScreen("level-screen");
    window.requestAnimationFrame(startJezzLevel);
  };

  const completeSelectedLevel = () => {
    const completedChapterId = getChapterForLevel(state.selectedLevel);

    if (state.selectedLevel === state.currentLevel) {
      state.starsByLevel[state.selectedLevel] = 3;
      state.coins += getLevelCoinReward(state.selectedLevel);
      state.currentLevel = Math.min(101, state.currentLevel + 1);
      renderChapterScreens();
    }

    openChapter(completedChapterId);
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

  const handleAction = (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const screen = button.closest(".chapter-screen");
    const chapterId = screen ? Number(screen.dataset.chapter) : state.currentChapter;

    if (action === "main-menu") {
      stopJezzLevel();
      showScreen("main-menu");
      playButton.disabled = false;
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

  completeLevelButton.addEventListener("click", completeSelectedLevel);
  musicToggle.addEventListener("change", () => {
    state.music = musicToggle.checked;
  });
  soundToggle.addEventListener("change", () => {
    state.sound = soundToggle.checked;
  });
  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      toggleSettings(false);
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
  });
  window.addEventListener("resize", () => {
    syncViewportHeight();
    if (levelScreen.classList.contains("is-active")) {
      window.requestAnimationFrame(startJezzLevel);
    }
  });
  window.addEventListener("orientationchange", () => {
    syncViewportHeight();
    if (levelScreen.classList.contains("is-active")) {
      window.requestAnimationFrame(startJezzLevel);
    }
  });

  syncViewportHeight();
  renderChapterScreens();

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
