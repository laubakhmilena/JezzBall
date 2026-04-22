(() => {
  const root = document.getElementById("gameRoot");
  const startScreen = document.getElementById("start-screen");
  const mapScreen = document.getElementById("map-screen");
  const playButton = document.getElementById("playButton");
  const settingsButton = document.getElementById("settingsButton");
  const backButton = document.getElementById("backButton");
  const mapViewport = document.getElementById("mapViewport");
  const chapterLayer = document.getElementById("chapterLayer");
  const decorBack = document.getElementById("decorBack");
  const decorFront = document.getElementById("decorFront");
  const levelLayer = document.getElementById("levelLayer");
  const roadMain = document.getElementById("roadMain");
  const roadShadow = document.getElementById("roadShadow");
  const roadHighlight = document.getElementById("roadHighlight");
  const menuButtons = document.querySelectorAll(".menu-button");
  const playPopDuration = 220;
  const trackHeight = 12000;
  const sceneWidth = 720;
  const chapterHeight = trackHeight / 10;
  const activeLevel = 1;
  let isStarting = false;

  const chapterThemes = [
    {
      tint: "linear-gradient(180deg, rgba(255, 252, 205, 0.42), rgba(175, 229, 156, 0.45))",
      decor: ["hill", "tree", "flower"],
      colors: ["#bfe88c", "#7fcf8f", "#ffe680", "#ff9fb7"]
    },
    {
      tint: "linear-gradient(180deg, rgba(255, 221, 201, 0.48), rgba(255, 174, 198, 0.42))",
      decor: ["tree", "flower", "hill"],
      colors: ["#ffb39c", "#ff80b4", "#ffd46e", "#bce38b"]
    },
    {
      tint: "linear-gradient(180deg, rgba(218, 205, 255, 0.5), rgba(184, 213, 255, 0.36))",
      decor: ["hill", "crystal", "flower"],
      colors: ["#bca8ff", "#8fa8ff", "#d8b6ff", "#fff0a3"]
    },
    {
      tint: "linear-gradient(180deg, rgba(207, 255, 231, 0.44), rgba(111, 208, 156, 0.42))",
      decor: ["tree", "hill", "flower"],
      colors: ["#86dfad", "#48b98b", "#baf3cf", "#fff08d"]
    },
    {
      tint: "linear-gradient(180deg, rgba(204, 246, 255, 0.5), rgba(113, 198, 246, 0.42))",
      decor: ["pond", "hill", "flower"],
      colors: ["#8de4ff", "#57b7ef", "#c8f6ff", "#7fdca8"]
    },
    {
      tint: "linear-gradient(180deg, rgba(142, 237, 255, 0.44), rgba(76, 183, 226, 0.48))",
      decor: ["shell", "pond", "crystal"],
      colors: ["#84e4ff", "#3ca7d8", "#ffd7a9", "#ff9cc7"]
    },
    {
      tint: "linear-gradient(180deg, rgba(121, 130, 255, 0.46), rgba(52, 44, 130, 0.46))",
      decor: ["crystal", "star", "orbit"],
      colors: ["#7dfff4", "#ff8dff", "#ffe66e", "#87a2ff"]
    },
    {
      tint: "linear-gradient(180deg, rgba(39, 44, 114, 0.46), rgba(136, 94, 218, 0.4))",
      decor: ["star", "orbit", "crystal"],
      colors: ["#fff07a", "#a9b7ff", "#d796ff", "#6ef1ff"]
    },
    {
      tint: "linear-gradient(180deg, rgba(255, 179, 112, 0.46), rgba(255, 119, 145, 0.36))",
      decor: ["hill", "tree", "star"],
      colors: ["#ffbd73", "#ff7e8d", "#ffe37f", "#b9d48a"]
    },
    {
      tint: "linear-gradient(180deg, rgba(255, 245, 124, 0.42), rgba(136, 238, 255, 0.48))",
      decor: ["rainbow", "star", "flower"],
      colors: ["#fff16d", "#ff84b8", "#8ee9ff", "#9ff08e"]
    }
  ];

  const blockBrowserGesture = (event) => {
    if (event.type === "touchmove" && event.target.closest(".map-viewport")) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }
  };

  document.addEventListener("contextmenu", blockBrowserGesture);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });

  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  };

  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("orientationchange", syncViewportHeight);
  syncViewportHeight();

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

  menuButtons.forEach(setPressedFeedback);
  setPressedFeedback(backButton);

  const pathX = (y) => {
    const progress = 1 - y / trackHeight;
    const wave = Math.sin(y / 470) * 92 + Math.sin(y / 1320 + 0.7) * 46;
    const drift = Math.sin(progress * Math.PI * 2.4) * 54;
    return Math.max(145, Math.min(575, 360 + wave + drift));
  };

  const levelScale = (y) => {
    const normalized = y / trackHeight;
    return (0.82 + normalized * 0.42).toFixed(3);
  };

  const xPercent = (x) => `${((x / sceneWidth) * 100).toFixed(3)}%`;

  const buildRoadPath = () => {
    const points = [];

    for (let y = trackHeight + 140; y >= -180; y -= 120) {
      points.push([pathX(y), y]);
    }

    return points
      .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
  };

  const createSvgLock = () => {
    const lock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    lock.setAttribute("class", "level-lock");
    lock.setAttribute("viewBox", "0 0 24 24");
    lock.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M7 10V8a5 5 0 0 1 10 0v2h1.1c.5 0 .9.4.9.9v8.2c0 .5-.4.9-.9.9H5.9a.9.9 0 0 1-.9-.9v-8.2c0-.5.4-.9.9-.9H7Zm2 0h6V8a3 3 0 1 0-6 0v2Z");
    lock.append(path);

    return lock;
  };

  const createChapterBands = () => {
    const fragment = document.createDocumentFragment();

    chapterThemes.forEach((theme, index) => {
      const band = document.createElement("div");
      band.className = "chapter-band";
      band.style.top = `${trackHeight - (index + 1) * chapterHeight}px`;
      band.style.setProperty("--chapter-tint", theme.tint);
      fragment.append(band);
    });

    chapterLayer.append(fragment);
  };

  const createDecor = (theme, chapterIndex, localIndex, frontLayer) => {
    const type = theme.decor[localIndex % theme.decor.length];
    const item = document.createElement("div");
    const baseY = trackHeight - (chapterIndex * chapterHeight + 120 + localIndex * 142);
    const y = Math.max(70, Math.min(trackHeight - 70, baseY + Math.sin((chapterIndex + 1) * (localIndex + 2)) * 42));
    const roadX = pathX(y);
    const side = localIndex % 2 === 0 ? -1 : 1;
    const spread = frontLayer ? 162 : 220;
    const x = Math.max(62, Math.min(658, roadX + side * (spread + Math.cos(localIndex * 1.4) * 62)));
    const farFromBottom = 1 - y / trackHeight;
    const size = frontLayer
      ? 62 + (localIndex % 4) * 15
      : 86 + (localIndex % 5) * 22;
    const primary = theme.colors[localIndex % theme.colors.length];
    const secondary = theme.colors[(localIndex + 1) % theme.colors.length];

    item.className = `decor decor-${type}`;
    item.style.setProperty("--x", xPercent(x));
    item.style.setProperty("--y", `${y.toFixed(1)}px`);
    item.style.setProperty("--size", `${size}px`);
    item.style.setProperty("--scale", frontLayer ? (1 - farFromBottom * 0.22).toFixed(2) : (0.88 - farFromBottom * 0.18).toFixed(2));
    item.style.setProperty("--opacity", frontLayer ? "0.92" : "0.7");
    item.style.setProperty("--a", primary);
    item.style.setProperty("--b", secondary);
    item.style.setProperty("--float-time", `${6 + ((chapterIndex + localIndex) % 5)}s`);
    item.style.setProperty("--float-delay", `${-((chapterIndex * 0.27 + localIndex * 0.19) % 3).toFixed(2)}s`);

    return item;
  };

  const createDecorations = () => {
    const backFragment = document.createDocumentFragment();
    const frontFragment = document.createDocumentFragment();

    chapterThemes.forEach((theme, chapterIndex) => {
      for (let i = 0; i < 7; i += 1) {
        backFragment.append(createDecor(theme, chapterIndex, i, false));
      }

      for (let i = 0; i < 5; i += 1) {
        frontFragment.append(createDecor(theme, chapterIndex, i + 7, true));
      }
    });

    decorBack.append(backFragment);
    decorFront.append(frontFragment);
  };

  const createLevels = () => {
    const fragment = document.createDocumentFragment();

    for (let level = 1; level <= 100; level += 1) {
      const chapterIndex = Math.floor((level - 1) / 10);
      const indexInChapter = (level - 1) % 10;
      const y = trackHeight - (chapterIndex * chapterHeight + 150 + indexInChapter * 102);
      const x = pathX(y);
      const button = document.createElement("button");
      const isActive = level === activeLevel;

      button.className = `level-button ${isActive ? "is-active" : "is-locked"}`;
      button.type = "button";
      button.style.setProperty("--x", xPercent(x));
      button.style.setProperty("--y", `${y}px`);
      button.style.setProperty("--scale", levelScale(y));
      button.style.zIndex = String(Math.round(y));
      button.dataset.level = String(level);

      if (isActive) {
        button.textContent = String(level);
        button.setAttribute("aria-label", `Уровень ${level}`);
        button.addEventListener("click", () => {
          console.log(`Start level ${level}`);
        });
        setPressedFeedback(button);
      } else {
        button.disabled = true;
        button.setAttribute("aria-label", `Уровень ${level} заблокирован`);
        button.append(createSvgLock());
      }

      fragment.append(button);
    }

    levelLayer.append(fragment);
  };

  const buildMap = () => {
    const roadPath = buildRoadPath();
    roadMain.setAttribute("d", roadPath);
    roadShadow.setAttribute("d", roadPath);
    roadHighlight.setAttribute("d", roadPath);
    createChapterBands();
    createDecorations();
    createLevels();
  };

  const showMapScreen = () => {
    requestAnimationFrame(() => {
      startScreen.classList.remove("is-active");
      startScreen.classList.add("is-exiting");
      startScreen.setAttribute("aria-hidden", "true");
      mapScreen.classList.add("is-active");
      mapScreen.setAttribute("aria-hidden", "false");
      mapViewport.scrollTop = mapViewport.scrollHeight - mapViewport.clientHeight;
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

  backButton.addEventListener("click", showStartScreen);

  settingsButton.addEventListener("click", () => {
    console.log("Open settings");
  });

  const setupMapDragScroll = () => {
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    mapViewport.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) {
        return;
      }

      isDragging = true;
      startY = event.clientY;
      startScrollTop = mapViewport.scrollTop;
      mapViewport.classList.add("is-dragging");
      mapViewport.setPointerCapture(event.pointerId);
    });

    mapViewport.addEventListener("pointermove", (event) => {
      if (!isDragging) {
        return;
      }

      const deltaY = event.clientY - startY;
      mapViewport.scrollTop = startScrollTop - deltaY;
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      mapViewport.addEventListener(eventName, (event) => {
        if (!isDragging) {
          return;
        }

        isDragging = false;
        mapViewport.classList.remove("is-dragging");

        if (mapViewport.hasPointerCapture(event.pointerId)) {
          mapViewport.releasePointerCapture(event.pointerId);
        }
      });
    });

    mapViewport.addEventListener(
      "wheel",
      (event) => {
        if (!mapScreen.classList.contains("is-active")) {
          return;
        }

        const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        mapViewport.scrollTop += delta;

        if (event.cancelable) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  };

  buildMap();
  setupMapDragScroll();
})();
