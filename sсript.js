(() => {
  const root = document.getElementById("gameRoot");
  const interactiveButtons = document.querySelectorAll(".menu-button");

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
      button.classList.add("is-pressed");
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        button.classList.remove("is-pressed");
      });
    });
  });

  document.getElementById("playButton").addEventListener("click", () => {
    console.log("Start game");
  });

  document.getElementById("settingsButton").addEventListener("click", () => {
    console.log("Open settings");
  });
})();
