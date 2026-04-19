# Bout Basics

An interactive spectator guide to roller derby — explains how the game is played through animated track visualizations and step-by-step breakdowns of key plays, penalties, and rules.

**Live site:** https://mrdatawolf.github.io/Bout-Basics/

## What it does

- 24 plays covering Jamming, Blocking, Penalties, Power Jams, and Pack Rules
- Each card shows a live animated track diagram with color-coded team dots
- Click a card to step through a play scene-by-scene with captions and referee signals
- Filter by category to focus on a specific aspect of the game

## How it works

Single `index.html` file — no build step, no dependencies.

**Desktop:** clicking a card expands it inline (pushing cards below down with a smooth animation) while a side panel shows the interactive step-through. Click the track or use Back/Next to advance steps.

**Mobile:** the grid locks to a compact 4-column layout sized for phone screens. Tapping a card opens a full-screen bottom sheet with the same step-by-step detail.

Touch devices and phones are detected via `(hover: none) and (pointer: coarse)` so the mobile layout applies regardless of reported screen width.
