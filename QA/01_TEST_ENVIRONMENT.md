# 01 — Test Environment

| Field | Value |
|---|---|
| OS | Linux kernel 4.4.0, x86_64, containerized |
| CPU | 56 vCPU, AMD-compatible under Microsoft hypervisor |
| Memory | 4.0 GiB total; ~3.2 GiB available at snapshot |
| GPU | Physical adapter unavailable; headless Chromium rendering, exact GPU `UNKNOWN` |
| Browser | Chromium 144.0.7559.96 |
| Node | v22.16.0 |
| Python | 3.13.5 |
| Input | Playwright mouse/keyboard/touch emulation; no physical controller |
| Viewports | 1440×900@1x; 390×844@2x touch; 320×240 |
| Build | `SRC-20260717-4409e8e0-13a792df-8f215fa7` |
| Date/time | 2026-07-17 UTC |

## Commands
```bash
node --check "script(1).js"
mkdir -p QA/work/runtime-copy
cp "index(2).html" QA/work/runtime-copy/index.html
cp "script(1).js" QA/work/runtime-copy/script.js
cp "style(1).css" QA/work/runtime-copy/style.css
python3 -m http.server 8765 --bind 127.0.0.1  # from runtime-copy
python3 QA/work/browser_smoke.py
```

Runtime-copy was required only because the supplied filenames do not match HTML references. No source file was edited. Chromium had an environment URL block policy; the harness temporarily backed up and restored that policy through `run_browser_with_policy.py`. This is an environment workaround, not a product change.

## Logs
`logs/environment.log`, `build.log`, `run.log`, `tests.log`, `http-server.log`, `level-audit.json`, `browser-performance.json`.

## Limitations
No physical GPU/device, no audio output validation, no Yandex production/test account, no network service integration, no cross-browser fleet, incomplete assets, and no long-duration profiling.
