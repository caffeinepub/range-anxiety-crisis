# Specification

## Summary
**Goal:** Simplify the landing hero by removing the car, bus, and charging-station visuals and their related animations/UI.

**Planned changes:**
- Remove rendering/usage of the car sprite and bus sprite from the landing hero scene.
- Remove the charging station element and any “Charging…” label/progress UI/animation from the landing hero.
- Delete any now-unused CSS keyframes/classes and component state/effects/refs used only for the removed hero animations so the frontend compiles cleanly.

**User-visible outcome:** The landing hero displays without the animated car/bus traffic elements and without the charging station or charging sequence UI.
