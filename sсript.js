(() => {
  const root = document.getElementById("gameRoot");
  const startScreen = document.getElementById("start-screen");
  const mapScreen = document.getElementById("map-screen");
  const playButton = document.getElementById("playButton");
  const settingsButton = document.getElementById("settingsButton");
  const interactiveButtons = document.querySelectorAll(".menu-button");
  const playPopDuration = 220;
  let isStarting = false;

  // Keep the page behaving like a game surface inside mobile browsers.
  const blockBrowserGesture = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  document.addEventListener("contextmenu", blockBrowserGesture);
  document.addEventListener("selectstart", blockBrowserGesture);
  document.addEventListener("dragstart", blockBrowserGesture);
  document.addEventListener("touchmove", blockBrowserGesture, { passive: false });

  // Mobile browsers can change viewport height when browser chrome appears.
  const syncViewportHeight = () => {
    root.style.setProperty("--viewport-height", `${window.innerHeight}px`);
  };

  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("orientationchange", syncViewportHeight);
  syncViewportHeight();

  // A tiny pressed state gives touch devices the same feedback as hover users.
  interactiveButtons.forEach((button) => {
    button.addEventListener("pointerdown", () => {
      if (button.disabled) {
        return;
      }

      button.classList.add("is-pressed");
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        button.classList.remove("is-pressed");
      });
    });
  });

  const showMapScreen = () => {
    // requestAnimationFrame lets the button animation finish before changing screens.
    requestAnimationFrame(() => {
      startScreen.classList.remove("is-active");
      startScreen.classList.add("is-exiting");
      startScreen.setAttribute("aria-hidden", "true");
      mapScreen.classList.add("is-active");
      mapScreen.setAttribute("aria-hidden", "false");
    });
  };

  playButton.addEventListener("click", () => {
    if (isStarting) {
      return;
    }

    // Lock the menu while the transition is running, including repeated taps.
    isStarting = true;
    interactiveButtons.forEach((button) => {
      button.disabled = true;
      button.classList.remove("is-pressed");
    });

    playButton.classList.add("is-starting");
    window.setTimeout(showMapScreen, playPopDuration);
  });

  settingsButton.addEventListener("click", () => {
    console.log("Open settings");
  });
})();
