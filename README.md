# Empires of the North — Solo Companion Web App ⛵⚔️

A modern, responsive web application and digital companion for playing **Imperial Settlers: Empires of the North** in **Solo Mode**.

---

## 🌟 Features

- **All 4 Official Solo Scenarios:**
  - ❄️ **Winter is Coming:** Tracks rations, 2-Fish VP conversion, and end-game worker feeding penalty.
  - 🏰 **Outpost:** Manages building site limits, building-over mechanics (+1 Wood / 2 VP), and island bonuses.
  - 🏴‍☠️ **Pirate's Den:** Tracks *Secure the Den* wood requirements, bonus starting workers, and conquered islands.
  - ⚔️ **Kingdom at War:** Tracks barbarian *Invasion* raze tokens and end-game Worker + Raze supply pairs.
- **Automated Round & Phase Progression:**
  - Guides through the 4 rounds and 4 phases (Lookout, Action, Expedition, Cleanup).
  - **Random Event Drawer (Tokens 1–5):** Draws scenario events with full descriptions and a 1-click `-2 VP` penalty button.
- **Solo Action Tile Flipper:**
  - Automatically calculates which action tiles have pawns and flips them to the *Solo Variant Only* (+cost) side during Cleanup, flipping unvisited solo tiles back to Standard side.
- **Resource, Goods & Pawn Management:**
  - Tracks Active vs. Spent Workers on the Clan tile.
  - Real-time counters for Food, Wood, Stone, Sheep, Fish, Gold, Raze, Ships, and Victory Points.
  - Interactive Action Pawns (Tile placement, 1-Food adjacent moves & exhaustion).
- **Expedition Board Queue:**
  - Launch ships with Fish (for Distant Islands) and Raze (for Conquering).
  - Resolve Pillage or Conquer with proper ship returns.
- **Interactive Solo Scoring Calculator:**
  - Automatically calculates score based on scenario-specific scoring formulas and determines victory or defeat against the scenario VP threshold.
- **Zero Dependencies & Offline Capable:**
  - Built with pure HTML5, CSS3, and modern Vanilla JS.
  - Automatically saves state to `localStorage`.

---

## 🚀 Running with Docker Compose

The app is containerized using a lightweight Nginx image and runs on custom port **`28492`**:

```bash
docker compose up -d
```

Once running, open your browser and navigate to:
```
http://localhost:28492
```

To stop the container:
```bash
docker compose down
```

---

## 📖 Rules Reference

For full rules, timing, errata v1.3 clarifications, and solo scenario tables, see [FLOW_OF_PLAY.md](FLOW_OF_PLAY.md).
