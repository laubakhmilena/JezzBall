# 02 — Build Verification Report

## Result
- **JavaScript syntax:** PASS (`node --check`).
- **Formal build:** NOT_APPLICABLE — no package manifest/build script.
- **Direct launch of supplied package:** FAIL — required `script.js` and `style.css` names absent.
- **QA runtime-copy launch:** PASS — HTTP 200 and menu loaded in Chromium.
- **Resources:** FAIL — `objects/` absent; 39 observed 404 responses across scenarios.

## Durations
Static syntax check <1s. First local browser load measured externally at 0.374s; browser Navigation Timing load ~91ms. These are local instrumentation values, not performance requirements.

## Blocking issues
1. BUG-001: packaging filenames.
2. BUG-002: missing assets.
3. Platform certification/integration checks blocked without real Yandex environment.

## Warnings
No JS page errors in executed runtime-copy subset. Console errors are missing resources. The `/sdk.js` relative path is correct for Yandex-hosted/local proxy use per official documentation, but was stubbed locally and not validated against production SDK.

## Safe recommendation
Produce a clean archive with `index.html`, `script.js`, `style.css`, full `objects/` tree and no QA folder; then rerun BVT from an empty extraction directory.
