# 14 — Bug Reports

Confirmed defects: 2.

## BUG-001

| Field | Value |
|---|---|
| Bug ID | BUG-001 |
| Title | Поставленный HTML ссылается на отсутствующие script.js и style.css |
| Confirmation | CONFIRMED |
| Component | Packaging/Bootstrap |
| Build | SRC-20260717-4409e8e0-13a792df-8f215fa7 |
| Environment | Supplied files |
| Preconditions | Files unchanged |
| Steps | 1. Serve/extract supplied files. 2. Open index(2).html. 3. Inspect paths/existence. |
| Actual | Required JS/CSS filenames do not exist; functional game cannot initialize directly. |
| Expected | All runtime files referenced by HTML exist. |
| Frequency | Always |
| Severity | S1 — Blocker |
| Priority | P0 |
| Player Impact | No direct playable build |
| Workaround | Temporarily rename copies, not acceptable for release |
| Regression/New | New |
| Related Tests | TC-BUILD-001 |
| Related Features | FEAT-BOOT-001 |
| Evidence | QA/logs/build.log |
| Logs |  |
| Additional | HTML tail and directory listing |
| Suspected Code Area | Packaging/file naming |
| Cause Confidence | High |

## BUG-002

| Field | Value |
|---|---|
| Bug ID | BUG-002 |
| Title | Каталог objects отсутствует, графические ресурсы отвечают 404 |
| Confirmation | CONFIRMED |
| Component | Assets/UI |
| Build | SRC-20260717-4409e8e0-13a792df-8f215fa7 |
| Environment | Chromium 144; runtime-copy |
| Preconditions | Runtime-copy with normalized source names |
| Steps | 1. Launch. 2. Visit menu/chapter/level/mobile. 3. Inspect network. |
| Actual | 39 404 responses across scenarios; backgrounds/ball images absent, fallback gradients visible. |
| Expected | All referenced assets return 200 and intended visuals render. |
| Frequency | Always |
| Severity | S3 — Major |
| Priority | P1 |
| Player Impact | Degraded visuals and unavailable skins |
| Workaround | CSS gradients keep core visible |
| Regression/New | New |
| Related Tests | TC-ASSET-001 |
| Related Features | FEAT-RESP-001; FEAT-SHOP-001 |
| Evidence | QA/evidence/BVT-001_main-menu_desktop.png |
| Logs | QA/logs/run.log |
| Additional | 36 concrete image paths absent |
| Suspected Code Area | Archive content/asset paths |
| Cause Confidence | High |

## Potential Defects Requiring Runtime Confirmation
- Reward/life clamping for IAP packages that declare more than `MAX_LIVES` requires a real purchase/state test.
- Cloud conflict selection and duplicate purchase token recovery require platform sandbox confirmation.
- Level 100 high target and moving obstacles may be balance/softlock risk; debug audit alone does not prove playability.
- Hardcoded Russian strings outside `messages` may complicate future localization; not a defect while ru-only is intended.
