(() => {
  const root = document.getElementById("gameRoot");
  const startScreen = document.getElementById("start-screen");
  const mapScreen = document.getElementById("map-screen");
  const mapScene = document.getElementById("mapScene");
  const playButton = document.getElementById("playButton");
  const settingsButton = document.getElementById("settingsButton");
  const backButton = document.getElementById("backButton");
  const achievementButton = document.getElementById("achievementButton");
  const prevChapterButton = document.getElementById("prevChapterButton");
  const nextChapterButton = document.getElementById("nextChapterButton");
  const chapterCompleteButton = document.getElementById("chapterCompleteButton");
  const chapterTitle = document.getElementById("chapterTitle");
  const chapterKicker = document.getElementById("chapterKicker");
  const transition = document.getElementById("chapterTransition");
  const transitionKicker = document.getElementById("transitionKicker");
  const transitionTitle = document.getElementById("transitionTitle");
  const levelLayer = document.getElementById("levelLayer");
  const finalPortal = document.getElementById("finalPortal");
  const roadShadow = document.getElementById("roadShadow");
  const roadRim = document.getElementById("roadRim");
  const roadMain = document.getElementById("roadMain");
  const roadHighlight = document.getElementById("roadHighlight");
  const roadEdge = document.getElementById("roadEdge");
  const roadCenter = document.getElementById("roadCenter");
  const menuButtons = document.querySelectorAll(".menu-button");
  const playPopDuration = 220;
  const transitionDuration = 720;

  let isStarting = false;
  let isTransitioning = false;

  const chapters = [
    {
      id: 1,
      name: "Солнечная поляна",
      theme: "nature",
      colors: {
        ink: "#3f6740",
        muted: "rgba(63, 103, 64, 0.72)",
        panel: "rgba(255, 252, 232, 0.86)",
        panelBorder: "rgba(130, 176, 94, 0.28)",
        levelA: "#fff4a6",
        levelB: "#86ce66",
        levelInk: "#3e6634",
        levelGlow: "rgba(255, 238, 129, 0.46)",
        ctaA: "#ffe88a",
        ctaB: "#75c968",
        portalA: "#fff6a8",
        portalB: "#8fe0c1"
      },
      backgroundStyle:
        "radial-gradient(circle at 17% 18%, rgba(255,255,255,.46) 0 10%, transparent 28%), radial-gradient(circle at 77% 17%, rgba(255,228,129,.34) 0 12%, transparent 31%), linear-gradient(180deg, #fff2c0 0%, #c7ec92 100%)",
      roadStyle: { main: "#dfb571", edge: "rgba(120, 87, 47, 0.36)", center: "rgba(101, 83, 56, 0.35)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 2,
      name: "Тихая деревушка",
      theme: "village",
      colors: {
        ink: "#7a4e35",
        muted: "rgba(122, 78, 53, 0.72)",
        panel: "rgba(255, 240, 216, 0.88)",
        panelBorder: "rgba(190, 119, 72, 0.3)",
        levelA: "#ffe1a4",
        levelB: "#d99462",
        levelInk: "#70452f",
        levelGlow: "rgba(255, 186, 111, 0.44)",
        ctaA: "#ffd79a",
        ctaB: "#e39267",
        portalA: "#ffe3a3",
        portalB: "#f0a46e"
      },
      backgroundStyle:
        "radial-gradient(circle at 72% 20%, rgba(255,221,137,.4) 0 12%, transparent 30%), linear-gradient(120deg, transparent 0 46%, rgba(210,143,89,.18) 47% 53%, transparent 54% 100%), linear-gradient(180deg, #ffd6ba 0%, #ffe5bd 48%, #cfe7ac 100%)",
      roadStyle: { main: "#c78955", edge: "rgba(111, 74, 43, 0.42)", center: "rgba(92, 63, 39, 0.34)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 3,
      name: "Золотые луга",
      theme: "meadows",
      colors: {
        ink: "#62712e",
        muted: "rgba(98, 113, 46, 0.72)",
        panel: "rgba(255, 249, 202, 0.88)",
        panelBorder: "rgba(154, 173, 64, 0.32)",
        levelA: "#fff08a",
        levelB: "#abc85c",
        levelInk: "#59672d",
        levelGlow: "rgba(255, 229, 99, 0.46)",
        ctaA: "#ffe873",
        ctaB: "#a7c95e",
        portalA: "#fff2a0",
        portalB: "#bde079"
      },
      backgroundStyle:
        "linear-gradient(105deg, transparent 0 23%, rgba(239,222,112,.24) 24% 32%, transparent 33% 100%), linear-gradient(78deg, transparent 0 57%, rgba(142,194,79,.23) 58% 66%, transparent 67% 100%), radial-gradient(circle at 72% 18%, rgba(255,238,129,.38) 0 12%, transparent 31%), linear-gradient(180deg, #fff4aa 0%, #e4ea9a 42%, #b9d979 100%)",
      roadStyle: { main: "#d4c15d", edge: "rgba(112, 111, 45, 0.36)", center: "rgba(101, 94, 42, 0.34)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 4,
      name: "Шёпот реки",
      theme: "river",
      colors: {
        ink: "#26707a",
        muted: "rgba(38, 112, 122, 0.72)",
        panel: "rgba(225, 250, 252, 0.88)",
        panelBorder: "rgba(67, 161, 176, 0.3)",
        levelA: "#d8f8ff",
        levelB: "#6fc4cd",
        levelInk: "#246773",
        levelGlow: "rgba(113, 213, 226, 0.44)",
        ctaA: "#cdf8ff",
        ctaB: "#69c4cf",
        portalA: "#e2fbff",
        portalB: "#86d6da"
      },
      backgroundStyle:
        "radial-gradient(ellipse at 30% 63%, rgba(111,207,222,.38) 0 16%, transparent 36%), radial-gradient(ellipse at 70% 72%, rgba(161,224,218,.35) 0 14%, transparent 33%), linear-gradient(128deg, transparent 0 42%, rgba(234,224,195,.35) 43% 49%, transparent 50% 100%), linear-gradient(180deg, #dff8ff 0%, #c9efd8 48%, #a9d9c0 100%)",
      roadStyle: { main: "#d8cfad", edge: "rgba(83, 127, 116, 0.34)", center: "rgba(72, 111, 109, 0.34)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 5,
      name: "Лазурный берег",
      theme: "sea",
      colors: {
        ink: "#725c3a",
        muted: "rgba(114, 92, 58, 0.72)",
        panel: "rgba(255, 244, 218, 0.88)",
        panelBorder: "rgba(68, 173, 183, 0.3)",
        levelA: "#d8fbff",
        levelB: "#d6bb75",
        levelInk: "#6b5738",
        levelGlow: "rgba(119, 222, 226, 0.42)",
        ctaA: "#bdf7ff",
        ctaB: "#e7c982",
        portalA: "#e8fdff",
        portalB: "#e6ca86"
      },
      backgroundStyle:
        "radial-gradient(ellipse at 78% 58%, rgba(77,198,217,.48) 0 20%, transparent 42%), radial-gradient(ellipse at 24% 86%, rgba(238,211,150,.68) 0 24%, transparent 48%), radial-gradient(ellipse at 82% 18%, rgba(255,231,165,.34) 0 11%, transparent 30%), linear-gradient(180deg, #d5f6ff 0%, #87dfdb 50%, #f2d49c 100%)",
      roadStyle: { main: "#e0c381", edge: "rgba(133, 106, 56, 0.36)", center: "rgba(113, 95, 57, 0.33)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 6,
      name: "Тайна глубин",
      theme: "deep",
      colors: {
        ink: "#e8fdff",
        muted: "rgba(232, 253, 255, 0.72)",
        panel: "rgba(16, 81, 109, 0.76)",
        panelBorder: "rgba(148, 238, 255, 0.28)",
        levelA: "#74dde4",
        levelB: "#147fa7",
        levelInk: "#f2feff",
        levelGlow: "rgba(99, 224, 233, 0.46)",
        ctaA: "#69dfea",
        ctaB: "#1583ab",
        portalA: "#dffcff",
        portalB: "#2ab2c4"
      },
      backgroundStyle:
        "radial-gradient(ellipse at 28% 24%, rgba(169,246,255,.22) 0 11%, transparent 32%), radial-gradient(ellipse at 72% 52%, rgba(116,220,218,.18) 0 15%, transparent 36%), radial-gradient(ellipse at 42% 82%, rgba(33,111,143,.32) 0 24%, transparent 50%), linear-gradient(180deg, #54c6d2 0%, #1582a8 48%, #0c496d 100%)",
      roadStyle: { main: "#53b6c7", edge: "rgba(196, 247, 255, 0.32)", center: "rgba(230, 255, 255, 0.44)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 7,
      name: "Огни города",
      theme: "city",
      colors: {
        ink: "#55566a",
        muted: "rgba(85, 86, 106, 0.72)",
        panel: "rgba(245, 245, 249, 0.88)",
        panelBorder: "rgba(121, 124, 145, 0.28)",
        levelA: "#f4f0ea",
        levelB: "#aeb9bf",
        levelInk: "#55566a",
        levelGlow: "rgba(244, 240, 234, 0.46)",
        ctaA: "#f4efe4",
        ctaB: "#a7b5bf",
        portalA: "#ffffff",
        portalB: "#c9d1df"
      },
      backgroundStyle:
        "linear-gradient(90deg, transparent 0 14%, rgba(142,138,159,.2) 15% 20%, transparent 21% 100%), linear-gradient(90deg, transparent 0 58%, rgba(122,128,151,.22) 59% 66%, transparent 67% 100%), radial-gradient(ellipse at 50% 20%, rgba(255,255,255,.28) 0 15%, transparent 42%), linear-gradient(180deg, #dce4ef 0%, #d8d1df 48%, #b8c3c9 100%)",
      roadStyle: { main: "#8e98a0", edge: "rgba(75, 79, 91, 0.4)", center: "rgba(255, 255, 255, 0.58)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 8,
      name: "Неоновый ритм",
      theme: "neon",
      colors: {
        ink: "#e8fbff",
        muted: "rgba(232, 251, 255, 0.72)",
        panel: "rgba(24, 23, 68, 0.8)",
        panelBorder: "rgba(106, 236, 255, 0.32)",
        levelA: "#52f1ff",
        levelB: "#b55cff",
        levelInk: "#f6fdff",
        levelGlow: "rgba(82, 241, 255, 0.58)",
        ctaA: "#53f2ff",
        ctaB: "#bd5cff",
        portalA: "#77f9ff",
        portalB: "#ff78dd"
      },
      backgroundStyle:
        "radial-gradient(circle at 24% 26%, rgba(245,65,198,.28) 0 10%, transparent 27%), radial-gradient(circle at 75% 38%, rgba(69,229,255,.26) 0 9%, transparent 28%), linear-gradient(102deg, transparent 0 44%, rgba(113,255,237,.18) 45% 47%, transparent 48% 100%), linear-gradient(180deg, #15183f 0%, #27205d 46%, #4e2375 100%)",
      roadStyle: { main: "#54ecff", edge: "rgba(255, 96, 219, 0.5)", center: "rgba(255, 255, 255, 0.68)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 9,
      name: "Звёздный путь",
      theme: "space",
      colors: {
        ink: "#f8f1ff",
        muted: "rgba(248, 241, 255, 0.72)",
        panel: "rgba(13, 16, 50, 0.82)",
        panelBorder: "rgba(196, 178, 255, 0.3)",
        levelA: "#8c96ff",
        levelB: "#53327e",
        levelInk: "#ffffff",
        levelGlow: "rgba(142, 150, 255, 0.55)",
        ctaA: "#9fa6ff",
        ctaB: "#6b45a8",
        portalA: "#ffffff",
        portalB: "#9aa3ff"
      },
      backgroundStyle:
        "radial-gradient(circle at 18% 22%, rgba(255,255,255,.75) 0 1px, transparent 2px), radial-gradient(circle at 64% 18%, rgba(255,255,255,.6) 0 1px, transparent 2px), radial-gradient(circle at 82% 68%, rgba(255,255,255,.7) 0 1px, transparent 2px), radial-gradient(ellipse at 30% 46%, rgba(116,115,230,.24) 0 16%, transparent 44%), linear-gradient(180deg, #090d2b 0%, #16295c 48%, #321050 100%)",
      roadStyle: { main: "#828dff", edge: "rgba(217, 198, 255, 0.44)", center: "rgba(255, 255, 255, 0.72)" },
      levelStyle: { shape: "round" }
    },
    {
      id: 10,
      name: "Врата света",
      theme: "final",
      colors: {
        ink: "#68553c",
        muted: "rgba(104, 85, 60, 0.72)",
        panel: "rgba(255, 247, 223, 0.9)",
        panelBorder: "rgba(255, 184, 214, 0.42)",
        levelA: "#fff18e",
        levelB: "#87dce8",
        levelInk: "#67523f",
        levelGlow: "rgba(255, 241, 142, 0.54)",
        ctaA: "#fff18e",
        ctaB: "#90dfe9",
        portalA: "#fff6b6",
        portalB: "#c1b5ff"
      },
      backgroundStyle:
        "radial-gradient(circle at 28% 28%, rgba(255,246,152,.34) 0 11%, transparent 30%), radial-gradient(circle at 72% 32%, rgba(132,230,255,.3) 0 10%, transparent 30%), radial-gradient(circle at 52% 74%, rgba(255,146,206,.25) 0 14%, transparent 36%), linear-gradient(135deg, rgba(202,236,165,.44), transparent 42%), linear-gradient(180deg, #fff2bb 0%, #aee9f2 34%, #d8c7ff 68%, #ffd0df 100%)",
      roadStyle: { main: "#f2e790", edge: "rgba(255, 151, 204, 0.42)", center: "rgba(107, 93, 83, 0.34)" },
      levelStyle: { shape: "round" }
    }
  ];

  const state = {
    currentChapter: 1,
    currentLevel: 1
  };

  const levelPositions = [
    { x: 49, y: 91 },
    { x: 43, y: 82 },
    { x: 50, y: 73 },
    { x: 54, y: 64 },
    { x: 46, y: 55 },
    { x: 43, y: 46 },
    { x: 51, y: 37 },
    { x: 57, y: 28 },
    { x: 51, y: 19 },
    { x: 55, y: 10 }
  ];

  const routeEndPosition = { x: 56, y: 5 };

  const setPressedFeedback = (button) => {
    button.addEventListener("pointerdown", () => {
      if (!button.disabled) {
        button.classList.add("is-pressed");
      }
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        button.classList.remove("is-pressed");
      });
    });
  };

  const blockBrowserGesture = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  };

  const getChapter = (chapterId) => chapters[chapterId - 1] || chapters[0];

  const setTheme = (chapter) => {
    const { colors, roadStyle } = chapter;

    mapScene.style.setProperty("--scene-bg", chapter.backgroundStyle);
    mapScene.style.setProperty("--scene-ink", colors.ink);
    mapScene.style.setProperty("--scene-muted", colors.muted);
    mapScene.style.setProperty("--panel", colors.panel);
    mapScene.style.setProperty("--panel-border", colors.panelBorder);
    mapScene.style.setProperty("--level-a", colors.levelA);
    mapScene.style.setProperty("--level-b", colors.levelB);
    mapScene.style.setProperty("--level-ink", colors.levelInk);
    mapScene.style.setProperty("--level-glow", colors.levelGlow);
    mapScene.style.setProperty("--cta-a", colors.ctaA);
    mapScene.style.setProperty("--cta-b", colors.ctaB);
    mapScene.style.setProperty("--portal-a", colors.portalA);
    mapScene.style.setProperty("--portal-b", colors.portalB);
    mapScene.style.setProperty("--road-main", roadStyle.main);
    mapScene.style.setProperty("--road-rim", roadStyle.rim || `${roadStyle.edge}`);
    mapScene.style.setProperty("--road-highlight", roadStyle.highlight || "rgba(255, 255, 255, 0.36)");
    mapScene.style.setProperty("--road-edge", roadStyle.edge);
    mapScene.style.setProperty("--road-center", roadStyle.center);
  };

  const setRoadShape = (chapterId) => {
    const shapes = [
      "M254 944 C 216 858, 212 810, 260 738 S 305 612, 238 520 S 229 394, 292 306 S 296 176, 286 46",
      "M252 944 C 208 858, 214 808, 258 736 S 298 612, 236 520 S 224 396, 292 306 S 298 176, 286 46",
      "M256 944 C 218 858, 214 810, 264 738 S 304 612, 240 520 S 226 396, 286 306 S 292 176, 284 46",
      "M252 944 C 210 856, 216 808, 260 736 S 306 612, 238 520 S 222 396, 290 306 S 298 176, 286 46",
      "M258 944 C 220 858, 216 810, 262 738 S 300 612, 240 520 S 228 396, 292 306 S 294 176, 284 46",
      "M254 944 C 208 856, 214 808, 258 736 S 304 612, 236 520 S 222 396, 294 306 S 300 176, 288 46",
      "M256 944 C 214 858, 216 810, 262 738 S 300 612, 238 520 S 226 396, 288 306 S 292 176, 284 46",
      "M252 944 C 218 856, 216 808, 264 736 S 306 612, 240 520 S 222 396, 292 306 S 298 176, 286 46",
      "M256 944 C 210 856, 214 808, 260 736 S 302 612, 240 520 S 224 396, 290 306 S 296 176, 286 46",
      "M254 944 C 220 858, 218 810, 264 738 S 304 612, 238 520 S 226 396, 292 306 S 296 176, 286 46"
    ];
    const shape = shapes[chapterId - 1];

    [roadShadow, roadRim, roadMain, roadHighlight, roadEdge, roadCenter].forEach((part) => {
      part.setAttribute("d", shape);
    });
  };

  const createLevelButton = (level, indexInChapter, chapter) => {
    const button = document.createElement("button");
    const position = levelPositions[indexInChapter];
    const isActive = level === state.currentLevel;
    const isCompleted = level < state.currentLevel;

    button.className = "level-button";
    button.classList.add(isActive ? "is-active" : isCompleted ? "is-completed" : "is-locked");
    button.type = "button";
    button.textContent = String(level);
    button.style.setProperty("--level-x", `${position.x}%`);
    button.style.setProperty("--level-y", `${position.y}%`);
    button.style.setProperty("--level-a", chapter.colors.levelA);
    button.style.setProperty("--level-b", chapter.colors.levelB);
    button.style.setProperty("--level-ink", chapter.colors.levelInk);
    button.style.setProperty("--level-glow", chapter.colors.levelGlow);

    if (isActive) {
      button.setAttribute("aria-label", `Уровень ${level}`);
      button.addEventListener("click", () => {
        console.log(`Start level ${level}`);
      });
      setPressedFeedback(button);
      return button;
    }

    button.disabled = true;
    button.setAttribute("aria-label", isCompleted ? `Уровень ${level} пройден` : `Уровень ${level} заблокирован`);
    return button;
  };

  const updateChapterControls = () => {
    prevChapterButton.disabled = false;
    nextChapterButton.disabled = false;
    prevChapterButton.setAttribute("aria-label", state.currentChapter === 1 ? "Перейти к главе 10" : "Предыдущая глава");
    nextChapterButton.setAttribute("aria-label", state.currentChapter === 10 ? "Перейти к главе 1" : "Следующая глава");
  };

  const updateCompletionElements = () => {
    const chapterEndLevel = state.currentChapter * 10;
    const canGoNextByProgress = state.currentLevel > chapterEndLevel && state.currentChapter < chapters.length;
    const showPortal = state.currentChapter === chapters.length && state.currentLevel > 100;

    chapterCompleteButton.style.setProperty("--level-x", `${routeEndPosition.x}%`);
    chapterCompleteButton.style.setProperty("--level-y", `${routeEndPosition.y}%`);
    finalPortal.style.setProperty("--level-x", `${routeEndPosition.x}%`);
    finalPortal.style.setProperty("--level-y", `${routeEndPosition.y}%`);
    chapterCompleteButton.classList.toggle("is-visible", canGoNextByProgress);
    chapterCompleteButton.disabled = !canGoNextByProgress;
    finalPortal.classList.toggle("is-visible", showPortal);
    finalPortal.setAttribute("aria-hidden", showPortal ? "false" : "true");
  };

  const renderChapter = (chapterId) => {
    const boundedChapterId = ((chapterId - 1 + chapters.length) % chapters.length) + 1;
    const chapter = getChapter(boundedChapterId);
    const firstLevel = (boundedChapterId - 1) * 10 + 1;

    state.currentChapter = boundedChapterId;
    setTheme(chapter);
    setRoadShape(boundedChapterId);

    chapterKicker.textContent = `Глава ${boundedChapterId}`;
    chapterTitle.textContent = chapter.name;
    levelLayer.replaceChildren();

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 10; index += 1) {
      fragment.append(createLevelButton(firstLevel + index, index, chapter));
    }
    levelLayer.append(fragment);

    updateChapterControls();
    updateCompletionElements();
  };

  const showTransition = (nextChapter) => {
    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    transitionKicker.textContent = `Глава ${nextChapter.id}`;
    transitionTitle.textContent = nextChapter.name;
    transition.classList.add("is-visible");
    mapScene.classList.add("is-changing");

    window.setTimeout(() => {
      renderChapter(nextChapter.id);
    }, 230);

    window.setTimeout(() => {
      transition.classList.remove("is-visible");
      mapScene.classList.remove("is-changing");
      isTransitioning = false;
    }, transitionDuration);
  };

  const goToChapter = (chapterId, useTransition = true) => {
    const boundedChapterId = ((chapterId - 1 + chapters.length) % chapters.length) + 1;
    const nextChapter = getChapter(boundedChapterId);

    if (boundedChapterId === state.currentChapter) {
      return;
    }

    if (useTransition) {
      showTransition(nextChapter);
      return;
    }

    renderChapter(boundedChapterId);
  };

  const goToNextChapter = () => {
    goToChapter(state.currentChapter + 1);
  };

  const showMapScreen = () => {
    requestAnimationFrame(() => {
      startScreen.classList.remove("is-active");
      startScreen.classList.add("is-exiting");
      startScreen.setAttribute("aria-hidden", "true");
      mapScreen.classList.add("is-active");
      mapScreen.setAttribute("aria-hidden", "false");
    });
  };

  const showStartScreen = () => {
    mapScreen.classList.remove("is-active");
    mapScreen.setAttribute("aria-hidden", "true");
    startScreen.classList.remove("is-exiting");
    startScreen.classList.add("is-active");
    startScreen.setAttribute("aria-hidden", "false");
    playButton.classList.remove("is-starting");
    isStarting = false;

    menuButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("is-pressed");
    });
  };

  const setCurrentLevel = (level) => {
    const parsedLevel = Number(level);

    if (!Number.isFinite(parsedLevel)) {
      return;
    }

    state.currentLevel = Math.max(1, Math.min(101, Math.round(parsedLevel)));
    renderChapter(state.currentChapter);
  };

  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });
  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("orientationchange", syncViewportHeight);

  [...menuButtons, backButton, achievementButton, prevChapterButton, nextChapterButton, chapterCompleteButton].forEach(setPressedFeedback);

  playButton.addEventListener("click", () => {
    if (isStarting) {
      return;
    }

    isStarting = true;
    menuButtons.forEach((button) => {
      button.disabled = true;
      button.classList.remove("is-pressed");
    });

    playButton.classList.add("is-starting");
    window.setTimeout(showMapScreen, playPopDuration);
  });

  settingsButton.addEventListener("click", () => {
    console.log("Open settings");
  });

  backButton.addEventListener("click", showStartScreen);
  achievementButton.addEventListener("click", () => {
    console.log("Open achievements");
  });
  prevChapterButton.addEventListener("click", () => goToChapter(state.currentChapter - 1));
  nextChapterButton.addEventListener("click", () => goToChapter(state.currentChapter + 1));
  chapterCompleteButton.addEventListener("click", goToNextChapter);

  window.JezzBallChapterMap = {
    chapters,
    state,
    renderChapter,
    goToNextChapter,
    showTransition,
    setCurrentLevel
  };

  syncViewportHeight();
  renderChapter(state.currentChapter);
})();
