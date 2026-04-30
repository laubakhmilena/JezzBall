(() => {
  const root = document.getElementById("gameRoot");
  const screens = Array.from(document.querySelectorAll(".screen"));
  const playButton = document.getElementById("playButton");
  const levelScreen = document.getElementById("level-screen");
  const levelChapterLabel = document.getElementById("levelChapterLabel");
  const levelTitle = document.getElementById("levelTitle");
  const completeLevelButton = document.getElementById("completeLevelButton");
  const playPopDuration = 220;

  const chapters = [
    { id: 1, ru: "Солнечная поляна", en: "Sunny Glade" },
    { id: 2, ru: "Тихая деревушка", en: "A quiet village" },
    { id: 3, ru: "Золотые луга", en: "Golden Meadows" },
    { id: 4, ru: "Шёпот реки", en: "The whisper of the river" },
    { id: 5, ru: "Лазурный берег", en: "The Cote d'Azur" },
    { id: 6, ru: "Тайна глубин", en: "The Mystery of the Depths" },
    { id: 7, ru: "Огни города", en: "City Lights" },
    { id: 8, ru: "Неоновый ритм", en: "Neon rhythm" },
    { id: 9, ru: "Звёздный путь", en: "Star Trek" },
    { id: 10, ru: "Врата света", en: "The Gate of Light" }
  ];

  const state = {
    currentChapter: 1,
    currentLevel: 1,
    selectedLevel: 1,
    coins: 1280,
    lives: 5,
    achievements: 24
  };

  const levelPositions = [
    { x: 46, y: 87 },
    { x: 60, y: 78 },
    { x: 44, y: 69 },
    { x: 58, y: 60 },
    { x: 42, y: 51 },
    { x: 55, y: 42 },
    { x: 41, y: 33 },
    { x: 60, y: 26 },
    { x: 45, y: 18 },
    { x: 62, y: 11 }
  ];

  const clampChapterId = (chapterId) => ((chapterId - 1 + chapters.length) % chapters.length) + 1;
  const getChapter = (chapterId) => chapters[clampChapterId(chapterId) - 1];
  const getChapterScreenId = (chapterId) => `chapter-screen-${clampChapterId(chapterId)}`;
  const getChapterForLevel = (level) => Math.min(chapters.length, Math.max(1, Math.ceil(level / 10)));

  const blockBrowserGesture = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
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

  const showScreen = (screenId) => {
    screens.forEach((screen) => {
      const isActive = screen.id === screenId;
      screen.classList.toggle("is-active", isActive);
      screen.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  };

  const syncResources = () => {
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

  const createLevelButton = (chapterId, index) => {
    const level = (chapterId - 1) * 10 + index + 1;
    const position = levelPositions[index];
    const isUnlocked = level <= state.currentLevel;
    const isActive = level === state.currentLevel;
    const isCompleted = level < state.currentLevel;
    const button = document.createElement("button");

    button.className = "level-button";
    button.type = "button";
    button.textContent = String(index + 1);
    button.style.setProperty("--level-x", `${position.x}%`);
    button.style.setProperty("--level-y", `${position.y}%`);
    button.dataset.level = String(level);

    if (isActive) {
      button.classList.add("is-active");
      button.setAttribute("aria-label", `Текущий уровень ${level}`);
    } else if (isCompleted) {
      button.classList.add("is-completed");
      button.setAttribute("aria-label", `Открытый уровень ${level}`);
    } else {
      button.classList.add("is-locked");
      button.disabled = true;
      button.setAttribute("aria-label", `Уровень ${level} заблокирован`);
    }

    if (isUnlocked) {
      button.addEventListener("click", () => openLevel(level));
      setPressedFeedback(button);
    }

    return button;
  };

  const renderChapterLevels = (chapterId) => {
    const screen = document.getElementById(getChapterScreenId(chapterId));
    const layer = screen.querySelector("[data-level-layer]");
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 10; index += 1) {
      fragment.append(createLevelButton(chapterId, index));
    }

    layer.replaceChildren(fragment);
  };

  const renderAllChapters = () => {
    chapters.forEach((chapter) => renderChapterLevels(chapter.id));
    syncResources();
  };

  const openChapter = (chapterId) => {
    const nextChapterId = clampChapterId(chapterId);
    state.currentChapter = nextChapterId;
    showScreen(getChapterScreenId(nextChapterId));
  };

  const openNextProgressChapter = () => {
    openChapter(getChapterForLevel(state.currentLevel));
  };

  const openLevel = (level) => {
    if (level > state.currentLevel) {
      return;
    }

    const chapter = getChapter(getChapterForLevel(level));
    state.selectedLevel = level;
    state.currentChapter = chapter.id;
    levelScreen.className = `level-screen screen chapter-${chapter.id}`;
    levelChapterLabel.textContent = `Глава ${chapter.id} · ${chapter.ru}`;
    levelTitle.textContent = `Уровень ${level}`;
    showScreen("level-screen");
  };

  const completeSelectedLevel = () => {
    if (state.selectedLevel === state.currentLevel) {
      state.currentLevel = Math.min(101, state.currentLevel + 1);
      renderAllChapters();
    }

    openChapter(getChapterForLevel(state.currentLevel));
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
      showScreen("main-menu");
      playButton.classList.remove("is-starting");
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

    if (action === "return-chapter") {
      openChapter(state.currentChapter);
    }
  };

  playButton.addEventListener("click", () => {
    playButton.classList.add("is-starting");
    window.setTimeout(() => {
      playButton.classList.remove("is-starting");
      openNextProgressChapter();
    }, playPopDuration);
  });

  completeLevelButton.addEventListener("click", completeSelectedLevel);
  document.addEventListener("click", handleAction);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });
  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("orientationchange", syncViewportHeight);

  document.querySelectorAll("button").forEach(setPressedFeedback);

  window.showScreen = showScreen;
  window.JezzBallChapterMap = {
    chapters,
    state,
    openChapter,
    openLevel,
    renderAllChapters,
    setCurrentLevel(level) {
      const parsedLevel = Number(level);
      if (!Number.isFinite(parsedLevel)) {
        return;
      }

      state.currentLevel = Math.max(1, Math.min(101, Math.round(parsedLevel)));
      renderAllChapters();
      openChapter(getChapterForLevel(state.currentLevel));
    }
  };

  syncViewportHeight();
  playButton.disabled = false;
  playButton.setAttribute("aria-disabled", "false");
  renderAllChapters();

  const initialChapterMatch = window.location.hash.match(/^#chapter-screen-(\d+)$/);
  if (initialChapterMatch) {
    openChapter(Number(initialChapterMatch[1]));
  }
})();
