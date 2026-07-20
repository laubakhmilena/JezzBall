# 16 — Performance and Compatibility

## Actual measurements
| Scene | Build | Environment | Method | Duration | Min/Avg/Max | Result/limits |
|---|---|---|---|---|---|---|
| Initial navigation | SRC-20260717-4409e8e0-13a792df-8f215fa7 | Chromium 144 local | external monotonic + NavigationTiming | one load | 0.374s external; browser load ~91ms | Instrumentation only; assets missing and localhost invalidate production comparison |
| Levels 1/10/50/100 audit | SRC-20260717-4409e8e0-13a792df-8f215fa7 | Chromium debug | geometry scan | one call | validStarts 44–230 | Not FPS/playability |

No reliable FPS, frame-time, CPU/GPU or memory series were collected. They remain NOT_TESTED.

## Compatibility executed
- 1440×900 desktop: limited flow PASS.
- 390×844 DPR2 touch emulation: menu→chapter PASS.
- 320×240: too-small overlay PASS.

## Future matrix
Chrome/Edge/Firefox/Safari; Windows/macOS/Linux; physical Android/iOS; portrait/landscape; DPR1–3; 4:3/16:9/19.5:9/ultrawide; resize/fullscreen/Alt+Tab; mouse/keyboard/touch. Controller is NOT_APPLICABLE unless scope changes.

## Recommended thresholds (not requirements)
Aim for responsive input and visually stable 60fps on typical devices, with 30fps low-performance fallback; investigate sustained frame times >33ms, visible input lag, growth across a 60-minute soak, and load stalls. Final thresholds require target device definition.
