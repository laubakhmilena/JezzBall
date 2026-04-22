(() => {
  const root = document.getElementById("gameRoot");
  const startScreen = document.getElementById("start-screen");
  const mapScreen = document.getElementById("map-screen");
  const playButton = document.getElementById("playButton");
  const settingsButton = document.getElementById("settingsButton");
  const mapViewport = document.getElementById("mapViewport");
  const chapterLayer = document.getElementById("chapterLayer");
  const levelLayer = document.getElementById("levelLayer");
  const roadShadow = document.getElementById("roadShadow");
  const roadMain = document.getElementById("roadMain");
  const roadEdge = document.getElementById("roadEdge");
  const roadCenter = document.getElementById("roadCenter");
  const menuButtons = document.querySelectorAll(".menu-button");
  const playPopDuration = 220;
  const trackHeight = 12000;
  const sceneWidth = 720;
  const chapterHeight = trackHeight / 10;
  const activeLevel = 1;
  let isStarting = false;

  const chapterTitles = [
    "Мягкий мир",
    "Деревня",
    "Поля и животные",
    "Река и мосты",
    "Морской берег",
    "Затонувшие корабли",
    "Город",
    "Неоновый город",
    "Космос",
    "Финальный мир"
  ];

  const chapterStyles = [
    { text: "#456a40", panel: "rgba(255, 250, 231, 0.86)", border: "rgba(118, 164, 101, 0.38)", levelA: "#fff7b8", levelB: "#a8df81", levelInk: "#4f7240" },
    { text: "#80533c", panel: "rgba(255, 241, 219, 0.86)", border: "rgba(208, 138, 85, 0.34)", levelA: "#ffe2a8", levelB: "#f0ad70", levelInk: "#7b4d33" },
    { text: "#5a6c2f", panel: "rgba(255, 248, 196, 0.86)", border: "rgba(143, 178, 64, 0.36)", levelA: "#f8e98e", levelB: "#9fcb63", levelInk: "#53672e" },
    { text: "#276d79", panel: "rgba(225, 250, 252, 0.86)", border: "rgba(75, 162, 174, 0.34)", levelA: "#d4f6ff", levelB: "#75cad1", levelInk: "#276975" },
    { text: "#755f3e", panel: "rgba(255, 242, 211, 0.86)", border: "rgba(92, 179, 183, 0.34)", levelA: "#d9fbff", levelB: "#d8bb75", levelInk: "#6d593a" },
    { text: "#dbfbff", panel: "rgba(18, 84, 112, 0.78)", border: "rgba(151, 238, 255, 0.28)", levelA: "#6ed6df", levelB: "#167ca3", levelInk: "#eefcff" },
    { text: "#55516f", panel: "rgba(245, 245, 249, 0.86)", border: "rgba(121, 124, 145, 0.28)", levelA: "#f4f0ea", levelB: "#aeb9bf", levelInk: "#55566a" },
    { text: "#e8fbff", panel: "rgba(24, 23, 68, 0.8)", border: "rgba(106, 236, 255, 0.32)", levelA: "#52f1ff", levelB: "#b55cff", levelInk: "#f6fdff" },
    { text: "#f8f1ff", panel: "rgba(13, 16, 50, 0.82)", border: "rgba(196, 178, 255, 0.3)", levelA: "#8c96ff", levelB: "#53327e", levelInk: "#ffffff" },
    { text: "#715000", panel: "rgba(255, 246, 219, 0.88)", border: "rgba(255, 184, 214, 0.42)", levelA: "#fff18e", levelB: "#87dce8", levelInk: "#6a5541" }
  ];

  const blockBrowserGesture = (event) => {
    if (event.type === "touchmove" && event.target.closest(".map-viewport")) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }
  };

  // document.addEventListener("contextmenu", blockBrowserGesture);
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

    for (let y = trackHeight + 160; y >= -160; y -= 96) {
      points.push([pathX(y), y]);
    }

    return points
      .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
  };

  const createChapterBands = () => {
    const fragment = document.createDocumentFragment();

    chapterTitles.forEach((chapterTitle, index) => {
      const band = document.createElement("div");
      const marker = document.createElement("div");
      const title = document.createElement("span");
      const theme = chapterStyles[index];
      const markerY = trackHeight - (index + 1) * chapterHeight + 92;
      const roadX = pathX(markerY + 78);
      const isLeftSide = roadX > sceneWidth / 2;
      const markerX = isLeftSide
        ? Math.max(122, roadX - 214)
        : Math.min(sceneWidth - 122, roadX + 214);

      band.className = `chapter-band chapter-band-${index + 1}`;
      band.style.top = `${trackHeight - (index + 1) * chapterHeight - 90}px`;
      fragment.append(band);

      title.className = "chapter-marker__name";
      title.textContent = chapterTitle;

      marker.className = "chapter-marker";
      marker.classList.add(isLeftSide ? "chapter-marker-left" : "chapter-marker-right");
      marker.style.setProperty("--marker-x", xPercent(markerX));
      marker.style.setProperty("--marker-y", `${markerY}px`);
      marker.style.setProperty("--marker-color", theme.text);
      marker.style.setProperty("--marker-panel", theme.panel);
      marker.style.setProperty("--marker-border", theme.border);
      marker.append(title);
      fragment.append(marker);
    });

    chapterLayer.append(fragment);
  };

  const createLevels = () => {
    const fragment = document.createDocumentFragment();

    for (let level = 1; level <= 100; level += 1) {
      const chapterIndex = Math.floor((level - 1) / 10);
      const indexInChapter = (level - 1) % 10;
      const y = trackHeight - (chapterIndex * chapterHeight + 150 + indexInChapter * 102);
      const x = pathX(y);
      const button = document.createElement("button");
      const theme = chapterStyles[chapterIndex];
      const isActive = level === activeLevel;
      const isCompleted = level < activeLevel;

      button.className = `level-button chapter-level-${chapterIndex + 1} ${isCompleted ? "is-completed" : isActive ? "is-active" : "is-locked"}`;
      button.type = "button";
      button.style.setProperty("--x", xPercent(x));
      button.style.setProperty("--y", `${y}px`);
      button.style.setProperty("--scale", levelScale(y));
      button.style.setProperty("--level-a", theme.levelA);
      button.style.setProperty("--level-b", theme.levelB);
      button.style.setProperty("--level-ink", theme.levelInk);
      button.style.zIndex = String(Math.round(y));
      button.dataset.level = String(level);

      if (isActive || isCompleted) {
        button.textContent = String(level);
        button.setAttribute("aria-label", isCompleted ? `Уровень ${level} пройден` : `Уровень ${level}`);
        button.addEventListener("click", () => {
          console.log(`Start level ${level}`);
        });
        setPressedFeedback(button);
      } else {
        button.disabled = true;
        button.setAttribute("aria-label", `Уровень ${level} заблокирован`);
        button.textContent = String(level);
      }

      fragment.append(button);
    }

    levelLayer.append(fragment);
  };

  const buildMap = () => {
    const roadPath = buildRoadPath();
    [roadShadow, roadMain, roadEdge, roadCenter].forEach((roadPart) => {
      roadPart.setAttribute("d", roadPath);
    });
    createChapterBands();
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
