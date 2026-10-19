/* Yandex archive hosting provides /sdk.js. Local/file launches are offline.
   https://yandex.ru/dev/games/doc/ru/sdk/sdk-about */
(() => {
  "use strict";
  const host = location.hostname;
  const local = location.protocol === "file:" || host === "localhost"
    || host === "[::1]" || host === "::1" || /^127\./.test(host)
    || /^10\./.test(host) || /^192\.168\./.test(host)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
  window.jezzSdkLoaded = window.YaGames || local
    ? Promise.resolve(Boolean(window.YaGames))
    : new Promise((resolve) => {
      const sdk = document.createElement("script");
      sdk.src = "/sdk.js";
      sdk.async = true;
      sdk.onload = () => resolve(true);
      sdk.onerror = () => resolve(false);
      document.head.append(sdk);
    });
})();
