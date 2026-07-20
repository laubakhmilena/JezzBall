# 15 — Accessibility Report

No claim of full accessibility is made.

| Area | Applicability | Result | Evidence | Impact | Recommendation | Effort | Solo priority |
|---|---|---|---|---|---|---|---|
| Text/readability | Applicable | PARTIAL | Screenshots/CSS | High | Test 200% zoom and small devices | Low | P1 |
| Keyboard UI | Applicable | PARTIAL PASS | TC-INPUT-001 | High | Run full keyboard flow | Medium | P1 |
| Keyboard gameplay | Applicable | NOT_RUN | Canvas aria/code | High | Test arrows+Space across levels | Medium | P1 |
| Focus visibility/trap | Applicable | PARTIAL | CSS/code; achievements Escape observed | High | Execute Tab/Shift+Tab all modals | Low | P1 |
| Color dependence | Applicable | RISK | Safe/danger use color and line style/text legend | High | Ensure persistent non-color shapes/icons and contrast | Medium | P1 |
| Audio/subtitles | No speech/audio found | NOT_APPLICABLE | Static scan | Low | Confirm design | Low | P3 |
| Timing/difficulty | Applicable | RISK | Real-time balls; boosters but no global difficulty | High | Consider reduced speed/practice mode | High | P2 |
| Motion/flashing | Applicable | NOT_RUN | Glow/transitions/moving obstacles | Medium | Photosensitivity review, reduce motion option | Medium | P2 |
| Touch target | Applicable | PARTIAL | Screenshots/CSS | Medium | Physical device check | Low | P2 |
| Error/help text | Applicable | PARTIAL | Toasts/hints/confirm dialogs | Medium | First-player exploratory session | Low | P2 |

## Quick wins
Persistent keyboard help near canvas, full focus test, retain non-color obstacle patterns, verify 200% zoom, add reduced-motion preference, and document controls on first level.

## Standards/reference
WCAG 2.2 is used as a web accessibility oracle; game-specific real-time difficulty remains a product recommendation, not WCAG conformance. Checked 2026-07-17: https://www.w3.org/TR/WCAG22/
