# Imperial Settlers: Empires of the North — Flow of Play & Rules Reference

Comprehensive rules reference and flow-of-play specification based on the official rulebook, FAQ v1.3 / errata, and solo mode guidelines. This document serves as the game rule basis and data model for building a web/HTML companion app.

---

## 1. Game Overview & Goal

- **Players:** 1–4 players
- **Theme:** Nordic empires (Scots, Vikings, Inuits) expanding lands, sailing to unexplored islands, harvesting resources, building structures, and pillaging or conquering new territory.
- **Victory Condition:** The player with the most **Victory Points (VP / ⭐)** at the end of the game wins.
- **End-Game Trigger:** When any player reaches or passes **25 Victory Points** during the **Action Phase**, the final round is triggered. The game finishes at the end of the current round (specifically after completing the Expedition Phase; the Cleanup Phase is skipped in the final round).
  *(Note: If 25+ VP is reached during the Expedition Phase instead, the subsequent round will be the final round).*

---

## 2. Components & Economy

### Types of Goods
The term **Goods** encompasses all items players can acquire, spend, or assign:
- **Cards (Clan / Hand / Empire):** Clan deck (30 cards) + 3 Basic Fields (or starting locations).
- **Workers (People):** Used during Lookout Phase to keep cards, and for specific card costs. Spent workers go to the Clan Tile and return during Cleanup.
- **Victory Points (⭐):** Tracked on the Scoreboard.
- **Ships (Clan / Common):** Used on the Expedition Board to Sail.
- **Raze Tokens (Axes):** Used to Conquer islands or Raid opponent Action cards.
- **Gold Tokens:** Universal currency. 1 Gold can substitute for any 1 Resource (Food, Wood, Stone, Sheep, Fish) for building, activating actions, sailing, or moving action pawns.
  - *Restrictions:* Gold is not a Resource itself; cannot be assigned to cards requiring a specific named resource (e.g., Storage cards).
- **Resources:**
  - 🍎 **Food:** Used to move/exhaust Clan action pawns and activate actions.
  - 🪵 **Wood:** Construction material for buildings.
  - 🪨 **Stone:** Construction material for advanced buildings.
  - 🐑 **Sheep:** Livestock used for special Clan and building actions.
  - 🐟 **Fish:** Provisions needed to reach Distant Islands.

*Rule: Unlimited Goods.* General supply tokens and ships are not limited. Use multiplier tokens (x5) or common replacements if supply runs low.

---

## 3. Game Setup

1. **Scoreboard:** Place in view of all players. Place Clan score markers on `0`.
2. **Expedition Board:** Place in the middle of the table.
3. **Island Decks:**
   - Shuffle **Distant Island** deck and place face down on its slot.
   - Shuffle **Nearby Island** deck and place face down on its slot.
   - Reveal **2 cards** from each deck and place face up in designated spaces.
4. **Action Tiles:** Shuffle the 5 Action tiles (Explore, Populate, Construct, Harvest, Sail) and arrange them in a random circle (using the 2–4 player side, unless playing Solo).
5. **Player Components:**
   - Choose Clan (Glenn, Ulaf, Panuk, Heidel, Nanurjuk, Mackinnon).
   - Place 3 Clan **Basic Fields** face up in front of the player (the starting "Empire").
   - Take Clan deck (30 cards), shuffle, place face down.
   - Take 2 Clan Ship tokens.
   - Choose player color: take Clan tile and 2 Clan action pawns (stickers on one side for exhausted `X`).
6. **General Supply:** Stock Wood, Stone, Food, Sheep, Fish, Workers, Gold, Raze tokens, Multipliers.
7. **Starting Resources & Hand:**
   - Each player takes goods depicted on their 3 Basic Fields into their supply.
   - Each player takes **5 Workers**.
   - Draw **5 cards** from Clan deck: keep **3 cards**, discard 2 to personal discard pile.
8. **First Player:** Randomly select first player and give them the First Player marker.

---

## 4. Round Structure (Flow of Play)

Each round consists of **4 Phases** played in sequence:

```
[ Phase 1: LOOKOUT PHASE ]
       │
       ▼
[ Phase 2: ACTION PHASE ]  <-- (25 VP trigger check)
       │
       ▼
[ Phase 3: EXPEDITION PHASE ]
       │
       ▼
[ Phase 4: CLEANUP PHASE ] (Skipped if final round)
```

---

### Phase 1: Lookout Phase (Acquire Cards)

1. **Set aside** current hand cards temporarily.
2. **Draw 4 cards** from personal Clan deck.
3. **Choose which cards to keep:**
   - For every card kept, **Spend 1 Worker** (move Worker from supply to Clan tile).
   - Discard unchosen cards to personal Clan discard pile.
   - You may keep 0 to 4 cards.
4. **Retrieve** set-aside hand cards. No maximum hand limit.
5. **Storage Effects Resolution:** Resolve any **Storage** abilities on cards in your Empire (e.g., cards generating goods based on assigned resources) at the end of the Lookout Phase, before starting the Action Phase.

*(Note: There is no automatic production phase like original Imperial Settlers; resources must be gained via Harvest or card abilities).*

---

### Phase 2: Action Phase (Core Engine)

Players take turns in clockwise order starting with the First Player. On your turn, perform **ONE action** or **PASS**.

#### The 4 Types of Actions:

1. **Use a Clan Action Pawn (Action Tile):**
   - **First use:** Place an unexhausted Clan action pawn on one of the 5 Action tiles.
   - **Second use:** Spend **1 Food** (or 1 Gold) to move an unexhausted pawn already on a tile to an **adjacent** Action tile in the circle, flip pawn to **Exhausted (X)**, and activate that adjacent tile.
   - Each pawn can thus be used twice per round (first placement, then 1-food move & exhaust).

   **The 5 Action Tiles:**
   - **EXPLORE:** Draw 1 card from your Clan deck into your hand.
   - **POPULATE:** Take 1 Worker from general supply into your supply (permanent increase for current and future rounds).
   - **CONSTRUCT:** Build 1 Location card from your hand that has a goods cost for **free** (without paying its goods cost). *Exception: Cannot build Field cards with Construct.*
   - **HARVEST:** Choose 1 Field in your Empire; gain the Goods shown on that Field (including all upgrade cards attached to it).
   - **SAIL:** Place 1 Ship on the Expedition Board queue (first ship goes on arrow, subsequent ships line up below). Immediately decide whether to assign:
     - 🐟 **Fish:** Required to sail to Distant Islands.
     - 🪓 **Raze token:** Required to Conquer an island during the Expedition Phase.

   > **Boost Cards & Field Timing:**
   > When declaring an action from an Action tile (or card action printed in CAPITAL LETTERS):
   > 1. Declare the action.
   > 2. *(Optional)* Play a **single Boost card** OR build a **single Field card** that names that action in its top-left corner.
   > 3. Resolve the declared action.

2. **Build a Location (from Hand):**
   - Choose a Location card from hand.
   - Pay depicted cost (Wood, Stone, Sheep, Fish, Workers, etc.) to general supply. (Workers go to Clan tile).
   - Place card face up in your Empire unexhausted (ready to be used this round).
   - If card has a **Building Bonus**, resolve it immediately.
   - **Field Locations / Upgrades:**
     - Field cards do not have resource costs; they require an action to be declared (like Boosts) and provide resources immediately when built.
     - Field Upgrades slide under an existing Field of the same resource type, providing only the upgrade's resources upon placement and adding to all future Harvests of that Field.

3. **Use an Action from a Location in your Empire:**
   - Choose an unexhausted Action Location in your Empire.
   - Pay any activation cost printed on the card.
   - Resolve the card's effect.
   - Rotate the card 90° clockwise to **Exhausted**.

4. **Raid an Opponent:**
   - Spend **1 Raze token** to general supply.
   - Choose an unexhausted Action Location belonging to an opponent who has **not passed**.
   - Rotate that card 90° to **Exhausted** (they cannot use it this round).
   - *Restrictions:* Cannot raid players who have already passed; cannot raid Fields or Feature locations.

#### Passing in the Action Phase:
- When a player cannot or chooses not to take further actions, they **Pass**.
- Once passed, that player cannot take more actions in the current round.
- **Protection:** A passed player cannot be targeted by opponents (e.g., cannot be Raided, cannot have cards manipulated).
- The Action Phase continues until **all players have passed**.

#### End-Game Trigger Check:
- If any player reaches or exceeds **25 VP** during this phase, this round is designated as the **Final Round**.

---

### Phase 3: Expedition Phase (Resolve Ships)

Resolve Ships placed on the Expedition board queue from top to bottom (arrow first):

1. **Turn Order:** Player owning the top Ship resolves their expedition first.
2. **Choose an Island:**
   - **No Fish assigned:** Choose any face-up Nearby Island, or draw the top face-down card of Nearby Island deck.
   - **Fish assigned:** May choose any face-up or top deck card from **Nearby OR Distant Islands**.
3. **Choose Pillage or Conquer:**
   - **Pillage (Default):** Take the Goods listed in the red banner ("Pillage to gain"). Discard the Island card to its discard pile.
   - **Conquer (Requires Raze Token):** If a Raze token was assigned to this Ship, you may Conquer the Island. Place the card into your Empire as a Location (provides its action/feature, counts as 1 VP at game end, triggers any Building Bonus).
4. **Ship Cleanup:** Return the Ship to player's supply. Discard any assigned Fish or Raze tokens to general supply (even if unused).
5. **Next in Queue:** Proceed to the next Ship in the queue until all Ships are resolved.

---

### Phase 4: Cleanup Phase (Reset for Next Round)

*(Skip this phase entirely if the final round was triggered during the Action Phase).*

1. **Workers:** Retrieve all spent Workers from your Clan tile back to your active supply.
2. **Cards:** Unexhaust all exhausted Locations and Conquered Islands in your Empire (rotate upright).
3. **Action Pawns:** Retrieve all Clan action pawns from Action tiles back to your personal supply.
4. **Island Market:** Discard all remaining face-up Nearby and Distant Island cards. Deal 2 new face-up cards to each deck market.
5. **First Player Marker:** Pass clockwise to the next player.
6. **Check Round Continuation:**
   - If no one reached 25 VP, start Phase 1 of next round.
   - *(If someone reached 25 VP during Expedition Phase, the upcoming round is played as the final round).*

*Important:* **Goods, resources, and cards in hand are NEVER discarded** at the end of a round. They roll over.

---

## 5. Game End & Final Scoring

At the conclusion of the final round, calculate the final score:

| Category | Points Awarded |
| :--- | :--- |
| **Scoreboard VP** | Current score accumulated during play |
| **Empire Cards** | **+1 VP** per card in Empire (Basic Fields, Upgrades, built Locations, Conquered Islands) |
| **Remaining Resources** | **+1 VP** per every **2 Resources** left in personal supply (Food, Wood, Stone, Sheep, Fish) |
| **Remaining Gold** | **+1 VP** per every **1 Gold** left in personal supply |

*Note:* Resources and Gold assigned onto cards (e.g., storage/bank cards) do **not** count for end-of-game remaining supply VP unless released prior to game end.

### Tiebreakers:
1. Most total Locations in Empire.
2. Most remaining Workers in supply.
3. Most cards left in hand.
4. Shared victory if still tied.

---

## 6. Solo Mode Complete Specification & Scenarios

### General Solo Engine Rules:
- **Game Length:** Exactly **4 rounds**.
- **Round Tracker:** Unused clan score marker on space 1–4 of the Scoreboard.
- **Phase 1: Lookout Phase:**
  1. Draw 4 Clan cards; spend 1 Worker per kept card (discard rest, return set-aside hand).
  2. Resolve Storage abilities.
  3. **Solo Event Draw:** Shuffle number tokens (1–5), draw one token, and immediately resolve the corresponding event on the Scenario Event Table. Return the token to the pool.
  4. **Penalty:** If you cannot pay the required goods for an event, you lose **2 VP** (mark immediately on scoreboard).
- **Phase 2: Action Phase:**
  - Take consecutive actions until passing (Pawn placements, Pawn moves for 1 Food, Location activations, etc.).
  - **Scenario Location:** Each scenario features a unique Scenario Location available for use. If it is an Action location, exhaust it after use (e.g., cover with First Player marker). Scenario locations do **not** award 1 VP at game end.
- **Phase 3: Expedition Phase:**
  - Standard expedition resolution (Nearby vs Distant via Fish, Pillage vs Conquer via Raze).
- **Phase 4: Cleanup Phase:**
  - **Solo Action Tile Flipping:** Before retrieving pawns:
    - Action tiles with your pawns flip to the **Solo Variant Only side** (showing increased cost).
    - If already on Solo Variant Only side with a pawn, it remains on that side.
    - If on Solo Variant Only side with **no pawn**, it flips back to the standard side.
  - Advance the round marker. After Round 4 ends, proceed immediately to Final Scoring.

---

### The 4 Official Solo Scenarios:

#### Scenario 1: Winter is Coming
- **VP Threshold to Beat:** 30 VP
- **Theme:** Harshest winter is approaching; rations and warmth are vital.
- **Setup Changes:** Take **3 Fish** in addition to the resources shown on your Basic Fields.
- **Special Action Rule:**
  - `Action: Spend 2 Fish to gain 1 VP.` *(May be activated any number of times per round).*
- **Scenario Location: BURIED PANTRY**
  - `Action: Spend 1 Stone, 1 Wood, and 1 Fish to gain 4 VP.`
- **Scoring Changes (Food Check):**
  - *Before* scoring Buildings and Food at game end, you must feed **all your Workers**:
  - Spend **1 Food or 1 Fish** for each Worker in your Empire (in supply, spent, and assigned).
  - For each Worker you cannot feed, you **lose 3 VP**.
- **Event Table (1–5):**
  1. **FROSTBITE:** Spend 1 Food.
  2. **FEED THE TRAVELERS:** You may spend 1 Fish or 1 Sheep to gain 2 Gold.
  3. **FROZEN LAND:** Exhaust 1 Field Location (unexhausts during Cleanup).
  4. **COLD:** Discard 1 card from hand if possible.
  5. **COLD NIGHTS:** Spend 1 Wood OR Exhaust 1 Field Location (unexhausts during Cleanup).

---

#### Scenario 2: Outpost
- **VP Threshold to Beat:** 40 VP
- **Theme:** Restricted island grounds requiring building sites and vertical construction.
- **Setup Changes:** Take an unused Clan deck, draw **5 cards** face down in front of you as **Building Sites**.
- **Special Rules:**
  - You are strictly limited to a number of Action Locations equal to your current Building Sites. Each Action Location must be placed on top of an empty Building Site. *(Conquered Islands do NOT use building sites).*
  - **Building Over:** You may build an Action Location over an existing Action Location by adding **+1 Wood** to its normal cost. The card underneath is covered and its ability is no longer accessible.
  - **Expand Sites:** Each time you take the **EXPLORE** action, you may spend **1 Fish** to gain 1 additional Building Site (draw 1 face-down card from the set-aside clan deck).
- **Scenario Location: OUTPOST HEADQUARTERS**
  - `Action: Assign 1 Worker to EXPLORE.`
- **Scoring Changes:**
  - Each Action Location that was built over (underneath) is worth **2 VP** at game end (top locations are worth 1 VP).
  - Each Conquered Island in your Empire is worth **2 VP** instead of 1 VP.
  - Each Worker assigned to Outpost Headquarters is worth **1 VP**.
- **Event Table (1–5):**
  1. **KING'S SUPPORT:** Gain 2 Fish.
  2. **NEW HORIZONS:** You may spend 2 Wood to gain 2 Building Sites.
  3. **OLD GUARDHOUSE SITE:** Gain 1 Stone and 1 Card.
  4. **LOCAL HELP:** Perform EXPLORE action immediately.
  5. **OUTPOST SUPPORT:** Gain 1 Wood, 1 Stone, 1 Food, and 1 Sheep.

---

#### Scenario 3: Pirate's Den
- **VP Threshold to Beat:** 45 VP
- **Theme:** Taking over pirate coves; securing the den from raiders.
- **Setup Changes:**
  - Draw **2 Nearby Islands** from top of deck and immediately add to Empire as Conquered Islands (no building bonus gained during setup).
  - Take **1 extra Worker** (start with 6 workers instead of 5).
- **Special Rules:**
  - **"Secure the Den" Trigger:** Whenever an event triggers "Secure the Den", you must **Spend 1 Wood for each Location** (excluding Fields and Islands) in your Empire, or **discard that Location**.
  - You may build any Island card directly from your hand as if its cost were: `Spend 1 Wood to build`.
  - Each time you Pillage an island, shuffle it into your Clan deck instead of discarding it.
- **Scenario Location: PIRATE'S ACADEMY**
  - `Action: Spend 1 Gold and 1 Wood to POPULATE.`
- **Scoring Changes:**
  - Each Conquered Island in your Empire is worth **2 VP** instead of 1 VP.
- **Event Table (1–5):**
  1. **VOYAGE:** Secure the Den. Additionally, draw 1 Nearby Island.
  2. **MAPS:** Secure the Den. Additionally, reveal 1 additional card from both Island decks.
  3. **DRIFTING SHIP:** Secure the Den. Additionally, gain 1 Raze or 1 Sheep.
  4. **RAIDERS RETURN:** Secure the Den. Additionally, search your discard pile for any card and place it into hand.
  5. **OUTPOST SUPPORT:** Secure the Den. Additionally, discard 1 card from your Empire (excluding Fields and Islands) and draw 1 Nearby Island.

---

#### Scenario 4: Kingdom at War
- **VP Threshold to Beat:** 35 VP
- **Theme:** Barbarian invasions; clearing invaders with axes and supplies.
- **Setup Changes:** Search Clan deck for 1 card providing Raze (Field or Action) and 1 card providing Stone (Field or Action) and add them to Empire immediately (gain initial bonuses).
- **Special Rules:**
  - **"Invasion" Mechanic:** Take 1 Raze token from supply and place it on an uninvaded Action Location in your Empire (max 1 Raze per card). That location is now **Invaded**.
  - **Clearing / Using Invaded Locations:** To use an Invaded Location, you must pay **1 Food or 1 Fish** first.
- **Scenario Location: BATTLE!**
  - `Feature: To use an Invaded Location, spend 1 Raze token (instead of 1 Food/Fish) to gain 2 VP.`
- **Scoring Changes:**
  - Each pair of **1 Worker and 1 Raze token** in your Empire is worth **2 VP** at end of game *(Workers include all in supply, spent, or assigned; Raze tokens only count those in personal supply)*.
- **Event Table (1–5):**
  1. **WE CAN'T ALLOW IT:** Invasion. Additionally, gain 2 Fish for the current round (remove during Cleanup; place on Clan tile as reminder).
  2. **OUR PANTRY IS FALLING:** Invasion. Additionally, discard 2 Resources of any type.
  3. **LET'S PUSH THEM BACK:** Invasion. Additionally, gain 1 Raze and 1 Stone.
  4. **MORALE DOWN:** Invasion. Additionally, spend 2 Food.
  5. **SECRET WEAPON:** Invasion. Additionally, gain 2 Raze.

---

## 7. Official FAQ & Clarifications Summary

1. **Goods vs. Resources:**
   - Goods = Cards, Workers, VPs, Ships, Raze, Gold, Resources.
   - Resources = Food, Wood, Stone, Sheep, Fish only.
2. **Gold Rules:**
   - Can substitute for any 1 Resource to build, activate, sail, or move pawns.
   - Cannot satisfy card requirements requiring an assigned specific Resource.
   - Worth 1 VP each at game end (unassigned).
3. **Action Pawn Moves vs. Activations:**
   - Moving a pawn via card effects (e.g., Drinking Competition, Reading Future) changes the pawn's tile position, but does **not** trigger the action of that tile.
4. **Boost Cards & Field Cards Timing:**
   - Declaring the action comes first.
   - Boost or Field card played before action resolves.
   - Declared action must still be legally resolved.
5. **Conquered Islands:**
   - Count as Empire locations. Can be unexhausted by effects affecting Empire locations.
6. **Harvest vs. Special Gain:**
   - Effects that allow choosing fields to gain resources (e.g., Homestead) are **not** Harvest actions; upgrade cards on the chosen field do not provide additional goods unless explicitly specified.

---

## 8. App State & Architecture Blueprint (For Web Companion)

To build a Dockerized HTML/JS web companion to manage or guide play, the following state structure is recommended:

```json
{
  "gameState": {
    "round": 1,
    "maxRounds": null,
    "currentPhase": "LOOKOUT",
    "activePlayerIndex": 0,
    "firstPlayerIndex": 0,
    "finalRoundTriggered": false,
    "mode": "multiplayer"
  },
  "expeditionQueue": [
    {
      "shipId": "ship_1",
      "playerId": 0,
      "hasFish": true,
      "hasRaze": true
    }
  ],
  "actionTiles": [
    { "id": "explore", "adjacentTo": ["sail", "populate"] },
    { "id": "populate", "adjacentTo": ["explore", "construct"] },
    { "id": "construct", "adjacentTo": ["populate", "harvest"] },
    { "id": "harvest", "adjacentTo": ["construct", "sail"] },
    { "id": "sail", "adjacentTo": ["harvest", "explore"] }
  ],
  "players": [
    {
      "id": 0,
      "name": "Player 1",
      "clan": "Ulaf",
      "vp": 0,
      "passed": false,
      "supply": {
        "workers": 5,
        "spentWorkers": 0,
        "food": 0,
        "wood": 0,
        "stone": 0,
        "sheep": 0,
        "fish": 0,
        "gold": 0,
        "raze": 0,
        "shipsAvailable": 2
      },
      "pawns": [
        { "id": 1, "location": null, "isExhausted": false },
        { "id": 2, "location": null, "isExhausted": false }
      ],
      "hand": [],
      "empire": [],
      "discard": []
    }
  ]
}
```
