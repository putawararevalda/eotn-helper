/**
 * Empires of the North — Solo Companion Web Application
 * Core Game Engine, State Machine, and Rules Enforcement
 */

const SCENARIOS = {
  winter: {
    id: 'winter',
    name: 'Winter is Coming',
    threshold: 30,
    locationName: 'Buried Pantry',
    locationText: 'Action: Spend 1 Stone 🪨, 1 Wood 🪵, and 1 Fish 🐟 to gain 4 VP ⭐.',
    setupText: 'Take 3 Fish 🐟 in addition to the resources shown on your Basic Fields.',
    defaultResources: { fish: 3, workers: 5, ships: 2 },
    events: {
      1: { title: 'FROSTBITE', text: 'Spend 1 Food 🍎 (or lose 2 VP ⭐).' },
      2: { title: 'FEED THE TRAVELERS', text: 'You may spend 1 Fish 🐟 or 1 Sheep 🐑 to gain 2 Gold 🪙.' },
      3: { title: 'FROZEN LAND', text: 'Exhaust 1 Field Location in your Empire. Unexhaust it during Cleanup.' },
      4: { title: 'COLD', text: 'Discard 1 card from your hand if possible.' },
      5: { title: 'COLD NIGHTS', text: 'Spend 1 Wood 🪵 OR Exhaust 1 Field Location (unexhausts during Cleanup).' }
    }
  },
  outpost: {
    id: 'outpost',
    name: 'Outpost',
    threshold: 40,
    locationName: 'Outpost Headquarters',
    locationText: 'Action: Assign 1 Worker 🧑 to EXPLORE.',
    setupText: 'Draw 5 cards from an unused Clan deck face down in front of you as Building Sites.',
    defaultResources: { workers: 5, ships: 2 },
    events: {
      1: { title: "KING'S SUPPORT", text: 'Gain 2 Fish 🐟.' },
      2: { title: 'NEW HORIZONS', text: 'You may spend 2 Wood 🪵 to gain 2 Building Sites.' },
      3: { title: 'OLD GUARDHOUSE SITE', text: 'Gain 1 Stone 🪨 and draw 1 Card 🃏.' },
      4: { title: 'LOCAL HELP', text: 'Perform the EXPLORE action immediately.' },
      5: { title: 'OUTPOST SUPPORT', text: 'Gain 1 Wood 🪵, 1 Stone 🪨, 1 Food 🍎, and 1 Sheep 🐑.' }
    }
  },
  pirates: {
    id: 'pirates',
    name: "Pirate's Den",
    threshold: 45,
    locationName: "Pirate's Academy",
    locationText: 'Action: Spend 1 Gold 🪙 and 1 Wood 🪵 to POPULATE.',
    setupText: 'Draw 2 Nearby Islands from top of deck and add them to your Empire as Conquered Islands. Take 1 extra Worker (start with 6 workers total).',
    defaultResources: { workers: 6, ships: 2 },
    events: {
      1: { title: 'VOYAGE', text: 'Secure the Den. Additionally, draw 1 Nearby Island.' },
      2: { title: 'MAPS', text: 'Secure the Den. Additionally, reveal 1 extra card from both Island decks.' },
      3: { title: 'DRIFTING SHIP', text: 'Secure the Den. Additionally, gain 1 Raze 🪓 or 1 Sheep 🐑.' },
      4: { title: 'RAIDERS RETURN', text: 'Secure the Den. Additionally, search your discard pile for any card into hand.' },
      5: { title: 'OUTPOST SUPPORT', text: 'Secure the Den. Discard 1 card from Empire (non-field/non-island) and draw 1 Nearby Island.' }
    }
  },
  war: {
    id: 'war',
    name: 'Kingdom at War',
    threshold: 35,
    locationName: 'Battle!',
    locationText: 'Feature: To use an Invaded Location, spend 1 Raze 🪓 (instead of 1 Food/Fish) to gain 2 VP ⭐.',
    setupText: 'Search deck for 1 card providing Raze 🪓 and 1 card providing Stone 🪨 and add to Empire (resolve bonuses).',
    defaultResources: { workers: 5, ships: 2 },
    events: {
      1: { title: "WE CAN'T ALLOW IT", text: 'Invasion. Additionally, gain 2 Fish 🐟 for current round (remove during Cleanup).' },
      2: { title: 'OUR PANTRY IS FALLING', text: 'Invasion. Additionally, discard 2 Resources of any type.' },
      3: { title: "LET'S PUSH THEM BACK", text: 'Invasion. Additionally, gain 1 Raze 🪓 and 1 Stone 🪨.' },
      4: { title: 'MORALE DOWN', text: 'Invasion. Additionally, spend 2 Food 🍎.' },
      5: { title: 'SECRET WEAPON', text: 'Invasion. Additionally, gain 2 Raze 🪓.' }
    }
  }
};

const CLANS = {
  glenn: { name: 'The Glenn Clan', desc: 'Difficulty: 1 - Teamwork & Sets' },
  ulaf: { name: 'The Ulaf Clan', desc: 'Difficulty: 3 - Viking Raids & Ships' },
  panuk: { name: 'The Panuk Clan', desc: 'Difficulty: 3 - Inuit Synergy & Order' },
  heidel: { name: 'The Heidel Clan', desc: 'Difficulty: 5 - Drinking & Feasts' },
  nanurjuk: { name: 'The Nanurjuk Clan', desc: 'Difficulty: 7 - Nomadic Survival' },
  mackinnon: { name: 'The Mackinnon Clan', desc: 'Difficulty: 8 - Wealth & Investment' }
};

const PHASES = ['LOOKOUT', 'ACTION', 'EXPEDITION', 'CLEANUP'];

class EotnSoloApp {
  constructor() {
    this.state = this.loadState() || this.createInitialState();
    this.initDOM();
    this.render();
  }

  createInitialState(scenarioId = 'winter', clanId = 'glenn') {
    const scenario = SCENARIOS[scenarioId] || SCENARIOS.winter;
    const resources = {
      workers: 5,
      spentWorkers: 0,
      food: 0,
      wood: 0,
      stone: 0,
      sheep: 0,
      fish: 0,
      gold: 0,
      raze: 0,
      ships: 2,
      ...(scenario.defaultResources || {})
    };

    return {
      scenarioId,
      clanId,
      round: 1,
      phaseIndex: 0,
      vp: 0,
      resources,
      locationExhausted: false,
      pawns: {
        1: { tile: '', exhausted: false },
        2: { tile: '', exhausted: false }
      },
      actionTiles: {
        explore: 'standard',
        populate: 'standard',
        construct: 'standard',
        harvest: 'standard',
        sail: 'standard'
      },
      expeditionQueue: [],
      lastEvent: null,
      scenarioVariables: {
        buildingSites: 5,
        builtOverCards: 0,
        invasionTokens: 0,
        unfedWorkers: 0,
        hqWorkers: 0
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem('eotn_solo_companion_state', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Unable to save state to localStorage:', e);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('eotn_solo_companion_state');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  /* -------------------------------------------------------------
     DOM Initializer & Event Listeners
     ------------------------------------------------------------- */
  initDOM() {
    // Header controls
    document.getElementById('btn-new-game').addEventListener('click', () => this.openSetupModal());
    document.getElementById('btn-quick-rules').addEventListener('click', () => this.toggleModal('modal-rules', true));
    document.getElementById('btn-close-rules').addEventListener('click', () => this.toggleModal('modal-rules', false));
    document.getElementById('btn-dismiss-rules').addEventListener('click', () => this.toggleModal('modal-rules', false));

    // Round / Phase controls
    document.getElementById('btn-next-phase').addEventListener('click', () => this.advancePhase());
    document.querySelectorAll('.phase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const phase = e.currentTarget.getAttribute('data-phase');
        const idx = PHASES.indexOf(phase);
        if (idx !== -1) {
          this.state.phaseIndex = idx;
          this.saveState();
          this.render();
        }
      });
    });

    // VP controls
    document.getElementById('btn-vp-plus').addEventListener('click', () => this.updateVP(1));
    document.getElementById('btn-vp-minus').addEventListener('click', () => this.updateVP(-1));

    // Pawn tracking
    document.getElementById('pawn-1-tile').addEventListener('change', (e) => {
      this.state.pawns[1].tile = e.target.value;
      this.saveState();
      this.renderPawns();
    });
    document.getElementById('pawn-2-tile').addEventListener('change', (e) => {
      this.state.pawns[2].tile = e.target.value;
      this.saveState();
      this.renderPawns();
    });
    document.getElementById('btn-pawn-1-exhaust').addEventListener('click', () => this.togglePawnExhaust(1));
    document.getElementById('btn-pawn-2-exhaust').addEventListener('click', () => this.togglePawnExhaust(2));

    // Scenario Location
    document.getElementById('btn-toggle-location').addEventListener('click', () => {
      this.state.locationExhausted = !this.state.locationExhausted;
      this.saveState();
      this.renderLocationState();
    });

    // Reset supplies
    document.getElementById('btn-reset-supplies').addEventListener('click', () => {
      if (confirm('Reset resources to starting scenario amounts?')) {
        const scenario = SCENARIOS[this.state.scenarioId];
        this.state.resources = {
          workers: 5,
          spentWorkers: 0,
          food: 0,
          wood: 0,
          stone: 0,
          sheep: 0,
          fish: 0,
          gold: 0,
          raze: 0,
          ships: 2,
          ...(scenario.defaultResources || {})
        };
        this.saveState();
        this.renderResources();
      }
    });

    // Expedition Ship Modal
    document.getElementById('btn-add-ship-to-queue').addEventListener('click', () => {
      if (this.state.resources.ships <= 0) {
        if (!confirm('You have 0 ships in your personal supply! Place a common/replacement ship anyway?')) {
          return;
        }
      }
      this.toggleModal('modal-ship', true);
    });
    document.getElementById('btn-cancel-ship').addEventListener('click', () => this.toggleModal('modal-ship', false));
    document.getElementById('btn-confirm-ship').addEventListener('click', () => this.confirmAddShip());

    // Setup Modal
    document.querySelectorAll('.scenario-choice').forEach(choice => {
      choice.addEventListener('click', (e) => {
        document.querySelectorAll('.scenario-choice').forEach(c => c.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const radio = target.querySelector('input');
        radio.checked = true;
        this.updateSetupModalInstructions(radio.value);
      });
    });
    document.getElementById('btn-cancel-setup').addEventListener('click', () => this.toggleModal('modal-setup', false));
    document.getElementById('btn-confirm-setup').addEventListener('click', () => this.confirmNewGame());

    // Final Scorer Modal
    document.getElementById('btn-open-scorer').addEventListener('click', () => this.openFinalScorer());
    document.getElementById('btn-close-scorer').addEventListener('click', () => this.toggleModal('modal-scorer', false));
    document.getElementById('btn-back-to-game').addEventListener('click', () => this.toggleModal('modal-scorer', false));

    // Dynamic Scorer inputs auto-calculate
    ['calc-board-vp', 'calc-empire-cards', 'calc-resources', 'calc-gold'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.recalculateFinalScore());
    });
  }

  /* -------------------------------------------------------------
     Core Render Engine
     ------------------------------------------------------------- */
  render() {
    const scenario = SCENARIOS[this.state.scenarioId];
    const clan = CLANS[this.state.clanId];

    // Header info
    document.getElementById('active-scenario-name').textContent = scenario.name;
    document.getElementById('active-scenario-target').textContent = `Target: ${scenario.threshold} VP`;
    document.getElementById('active-clan-name').textContent = clan.name;

    // Round Stepper
    document.querySelectorAll('.round-pip').forEach(pip => {
      const r = parseInt(pip.getAttribute('data-round'), 10);
      pip.classList.remove('active', 'past');
      if (r === this.state.round) pip.classList.add('active');
      else if (r < this.state.round) pip.classList.add('past');
    });
    document.getElementById('round-status-text').textContent = `Round ${this.state.round} of 4`;

    // Phase Stepper
    const currentPhase = PHASES[this.state.phaseIndex];
    document.querySelectorAll('.phase-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-phase') === currentPhase);
    });

    // VP Display
    document.getElementById('vp-display').textContent = this.state.vp;

    // Render Components
    this.renderPhaseCard(currentPhase);
    this.renderScenarioCard(scenario);
    this.renderPawns();
    this.renderActionTiles();
    this.renderResources();
    this.renderExpeditionQueue();
    this.renderLocationState();
  }

  /* -------------------------------------------------------------
     Phase Workflow Card Rendering
     ------------------------------------------------------------- */
  renderPhaseCard(phase) {
    const titleEl = document.getElementById('phase-card-title');
    const bodyEl = document.getElementById('phase-card-body');
    const nextBtn = document.getElementById('btn-next-phase');

    if (phase === 'LOOKOUT') {
      titleEl.textContent = `Round ${this.state.round} — Phase 1: Lookout Phase`;
      nextBtn.textContent = 'Go to Action Phase ➔';
      bodyEl.innerHTML = `
        <div class="phase-step-list">
          <div class="step-item">
            <div class="step-header">
              <span class="step-title">1. Set Aside Hand & Draw 4 Clan Cards</span>
            </div>
            <p class="step-desc">
              Draw 4 cards from your Clan deck. For every card you choose to keep into your hand, <strong>Spend 1 Worker</strong> (moves to Clan tile). Discard unkept cards, then retrieve set-aside hand.
            </p>
            <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
              <button class="btn btn-sm btn-outline" onclick="app.spendWorkerForLookout()">Spend 1 🧑 for Card</button>
              <small class="label">(Quickly shifts 1 worker from Active to Spent)</small>
            </div>
          </div>

          <div class="step-item">
            <div class="step-header">
              <span class="step-title">2. Storage Cards Resolution</span>
            </div>
            <p class="step-desc">
              If you have any cards with a <strong>STORAGE</strong> ability in your Empire, gain their goods now before taking actions.
            </p>
          </div>

          <div class="step-item highlight">
            <div class="step-header">
              <span class="step-title">3. Solo Scenario Event Token (1–5)</span>
              <button class="btn btn-sm btn-warning" onclick="app.drawEventToken()">🎲 Draw Event Token</button>
            </div>
            <p class="step-desc">
              Draw 1 Number Token (1–5). If you cannot pay the required goods for the event, you lose <strong>2 VP ⭐</strong>.
            </p>
            <div id="event-display-container">
              ${this.renderEventBox()}
            </div>
          </div>
        </div>
      `;
    } else if (phase === 'ACTION') {
      titleEl.textContent = `Round ${this.state.round} — Phase 2: Action Phase`;
      nextBtn.textContent = 'Go to Expedition Phase ➔';
      bodyEl.innerHTML = `
        <div class="phase-step-list">
          <div class="step-item highlight">
            <div class="step-header">
              <span class="step-title">Take Consecutive Actions</span>
            </div>
            <p class="step-desc">
              In Solo mode, you take one action after another until you choose to pass:
            </p>
            <ul style="padding-left: 1.25rem; font-size: 0.85rem; margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <li><strong>Place Clan Action Pawn:</strong> Place unexhausted pawn on an Action Tile.</li>
              <li><strong>Pawn Move & Exhaust:</strong> Spend 1 Food 🍎 (or Gold 🪙) to move pawn to an adjacent tile, flip to Exhausted (X), and activate it.</li>
              <li><strong>Build Location:</strong> Pay resource cost from hand; place unexhausted in Empire. (Fields require declared action).</li>
              <li><strong>Activate Action Location:</strong> Exhaust card (rotate 90°), pay cost, gain benefits.</li>
              <li><strong>Scenario Location:</strong> Activate scenario location below (exhaust with First Player marker).</li>
            </ul>
          </div>
          <div class="step-item">
            <div class="step-header">
              <span class="step-title">Declaring Actions & Boost Cards</span>
            </div>
            <p class="step-desc">
              When declaring an action from an Action tile: (1) Declare the action, (2) Optionally play a single Boost card OR build a single Field card, (3) Resolve the declared action.
            </p>
          </div>
        </div>
      `;
    } else if (phase === 'EXPEDITION') {
      titleEl.textContent = `Round ${this.state.round} — Phase 3: Expedition Phase`;
      nextBtn.textContent = 'Go to Cleanup Phase ➔';
      bodyEl.innerHTML = `
        <div class="phase-step-list">
          <div class="step-item highlight">
            <div class="step-header">
              <span class="step-title">Resolve Expedition Queue</span>
            </div>
            <p class="step-desc">
              Resolve ships placed on the Expedition Board from top to bottom:
            </p>
            <ul style="padding-left: 1.25rem; font-size: 0.85rem; margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <li><strong>Nearby Island:</strong> Available with any ship (no fish needed).</li>
              <li><strong>Distant Island:</strong> Ship must have 1 Fish 🐟 assigned.</li>
              <li><strong>Pillage:</strong> Gain goods in red banner; discard island.</li>
              <li><strong>Conquer:</strong> Requires 1 Raze 🪓 assigned; island becomes a location in your Empire (1 VP at end + card ability).</li>
            </ul>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--accent-cyan);">
              Use the Expedition Board Queue controls on the right panel to resolve each ship.
            </p>
          </div>
        </div>
      `;
    } else if (phase === 'CLEANUP') {
      const isFinalRound = this.state.round === 4;
      titleEl.textContent = `Round ${this.state.round} — Phase 4: Cleanup Phase`;
      nextBtn.textContent = isFinalRound ? 'Complete Game & Score 📊' : `Start Round ${this.state.round + 1} ➔`;
      bodyEl.innerHTML = `
        <div class="phase-step-list">
          <div class="step-item highlight">
            <div class="step-header">
              <span class="step-title">Solo Action Tile Flipping & Round Refresh</span>
              <button class="btn btn-sm btn-primary" onclick="app.executeCleanupAutomation()">⚡ Auto-Apply Cleanup</button>
            </div>
            <p class="step-desc">
              Follow these official solo cleanup steps:
            </p>
            <ol style="padding-left: 1.25rem; font-size: 0.85rem; margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.3rem;">
              <li><strong>Flip Action Tiles:</strong> Any tile that has your pawn flips to the <em>Solo Variant Only</em> side (increased cost). Any tile already on Solo side that has <em>no pawns</em> flips back to standard!</li>
              <li><strong>Retrieve Pawns:</strong> Return both Clan action pawns to your supply unexhausted.</li>
              <li><strong>Retrieve Workers:</strong> Move all spent workers from Clan tile back to active supply.</li>
              <li><strong>Unexhaust Cards:</strong> Unexhaust all locations, conquered islands, and the Scenario location.</li>
              <li><strong>Refresh Islands:</strong> Discard face-up Nearby & Distant Islands and reveal 2 new cards each.</li>
            </ol>
          </div>
        </div>
      `;
    }
  }

  renderEventBox() {
    if (!this.state.lastEvent) {
      return `
        <div class="event-roll-box">
          <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
            No event drawn yet for this round. Click "Draw Event Token" above.
          </span>
        </div>
      `;
    }

    const { token, title, text } = this.state.lastEvent;
    return `
      <div class="event-roll-box">
        <div class="event-token-display">
          <div class="event-token-circle">${token}</div>
          <div class="event-details">
            <div class="event-title">Event #${token}: ${title}</div>
            <div class="event-text">${text}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; align-items: center;">
          <small class="label">Cannot pay required goods?</small>
          <button class="btn btn-xs btn-danger" onclick="app.applyEventPenalty()">Apply -2 VP Penalty</button>
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     Scenario Details & Custom Widgets
     ------------------------------------------------------------- */
  renderScenarioCard(scenario) {
    document.getElementById('scenario-location-title').textContent = scenario.locationName;
    document.getElementById('scenario-location-effect').innerHTML = `<strong>Ability:</strong> ${scenario.locationText}`;

    const widgetEl = document.getElementById('scenario-special-widget');
    if (scenario.id === 'winter') {
      widgetEl.innerHTML = `
        <div class="scenario-action-pill">
          <span>Special Rule:</span>
          <button class="btn btn-xs btn-outline" onclick="app.activateWinterAction()">Spend 2 🐟 ➔ Gain 1 ⭐</button>
        </div>
      `;
    } else if (scenario.id === 'outpost') {
      widgetEl.innerHTML = `
        <div class="scenario-action-pill">
          <span>Building Sites: <strong>${this.state.scenarioVariables.buildingSites}</strong></span>
          <button class="btn btn-xs btn-outline" onclick="app.addBuildingSite()">+1 Site (Spend 1 🐟 on Explore)</button>
        </div>
      `;
    } else if (scenario.id === 'pirates') {
      widgetEl.innerHTML = `
        <div class="scenario-action-pill">
          <span>Secure the Den:</span>
          <small>Spend 1 🪵 per non-Field/non-Island building or discard it upon events.</small>
        </div>
      `;
    } else if (scenario.id === 'war') {
      widgetEl.innerHTML = `
        <div class="scenario-action-pill">
          <span>Invasion Raze Tokens: <strong>${this.state.scenarioVariables.invasionTokens}</strong></span>
          <button class="btn btn-xs btn-danger" onclick="app.addInvasionToken()">+1 Invaded Location</button>
          <button class="btn btn-xs btn-outline" onclick="app.removeInvasionToken()">Clear 1 Invaded</button>
        </div>
      `;
    }
  }

  renderLocationState() {
    const isExhausted = this.state.locationExhausted;
    const btn = document.getElementById('btn-toggle-location');
    const icon = document.getElementById('loc-status-icon');
    const text = document.getElementById('loc-status-text');

    if (isExhausted) {
      btn.className = 'btn btn-sm btn-exhaust exhausted';
      icon.textContent = '🔴';
      text.textContent = 'Exhausted';
    } else {
      btn.className = 'btn btn-sm btn-exhaust';
      icon.textContent = '⚪';
      text.textContent = 'Ready';
    }
  }

  /* -------------------------------------------------------------
     Pawns & Action Tiles
     ------------------------------------------------------------- */
  renderPawns() {
    [1, 2].forEach(pawnNum => {
      const pawn = this.state.pawns[pawnNum];
      const box = document.getElementById(`pawn-${pawnNum}-box`);
      const tag = document.getElementById(`pawn-${pawnNum}-tag`);
      const select = document.getElementById(`pawn-${pawnNum}-tile`);
      const btn = document.getElementById(`btn-pawn-${pawnNum}-exhaust`);

      select.value = pawn.tile || '';

      box.classList.toggle('exhausted', pawn.exhausted);
      if (pawn.exhausted) {
        tag.textContent = 'Exhausted (X)';
        tag.style.color = '#fca5a5';
        btn.textContent = 'Pawn Exhausted';
        btn.disabled = true;
      } else if (pawn.tile) {
        tag.textContent = `On ${pawn.tile.toUpperCase()}`;
        tag.style.color = '#93c5fd';
        btn.textContent = '1 🍎 Move & Exhaust';
        btn.disabled = false;
      } else {
        tag.textContent = 'Available';
        tag.style.color = '#86efac';
        btn.textContent = '1 🍎 Move & Exhaust';
        btn.disabled = true;
      }
    });
  }

  togglePawnExhaust(pawnNum) {
    const pawn = this.state.pawns[pawnNum];
    if (!pawn.tile) {
      alert('Pawn must first be placed on an Action tile before moving and exhausting.');
      return;
    }
    if (this.state.resources.food < 1 && this.state.resources.gold < 1) {
      if (!confirm('You have no Food (or Gold substitute) to pay the 1 Food cost! Proceed anyway?')) {
        return;
      }
    } else {
      if (this.state.resources.food >= 1) {
        this.updateResource('food', -1);
      } else {
        this.updateResource('gold', -1);
      }
    }
    pawn.exhausted = true;
    this.saveState();
    this.render();
  }

  renderActionTiles() {
    ['explore', 'populate', 'construct', 'harvest', 'sail'].forEach(tileId => {
      const side = this.state.actionTiles[tileId] || 'standard';
      const badge = document.getElementById(`badge-tile-${tileId}`);
      if (badge) {
        badge.className = `tile-side-badge ${side === 'standard' ? 'standard' : 'solo-side'}`;
        badge.textContent = side === 'standard' ? 'Standard Side' : 'Solo (+Cost)';
      }
    });
  }

  /* -------------------------------------------------------------
     Resources & Goods
     ------------------------------------------------------------- */
  renderResources() {
    const res = this.state.resources;
    document.getElementById('count-workers').textContent = res.workers;
    document.getElementById('count-spentWorkers').textContent = res.spentWorkers;
    document.getElementById('count-food').textContent = res.food;
    document.getElementById('count-wood').textContent = res.wood;
    document.getElementById('count-stone').textContent = res.stone;
    document.getElementById('count-sheep').textContent = res.sheep;
    document.getElementById('count-fish').textContent = res.fish;
    document.getElementById('count-gold').textContent = res.gold;
    document.getElementById('count-raze').textContent = res.raze;
    document.getElementById('count-ships').textContent = res.ships;
  }

  updateResource(type, delta) {
    const current = this.state.resources[type] || 0;
    const updated = Math.max(0, current + delta);
    this.state.resources[type] = updated;
    this.saveState();
    this.renderResources();
  }

  updateVP(delta) {
    this.state.vp = Math.max(0, this.state.vp + delta);
    this.saveState();
    document.getElementById('vp-display').textContent = this.state.vp;
  }

  spendWorkerForLookout() {
    if (this.state.resources.workers <= 0) {
      alert('No active workers available to spend!');
      return;
    }
    this.state.resources.workers -= 1;
    this.state.resources.spentWorkers += 1;
    this.saveState();
    this.renderResources();
  }

  /* -------------------------------------------------------------
     Expedition Queue
     ------------------------------------------------------------- */
  renderExpeditionQueue() {
    const container = document.getElementById('expedition-queue-container');
    const queue = this.state.expeditionQueue;

    if (queue.length === 0) {
      container.innerHTML = '<p class="empty-hint">No Ships currently queued on the Expedition Board. Use Sail action to launch an expedition.</p>';
      return;
    }

    container.innerHTML = queue.map((ship, index) => `
      <div class="queue-ship-item">
        <div class="ship-info">
          <span class="ship-index-badge">#${index + 1}</span>
          <div class="ship-tags">
            <span class="tag-badge ${ship.hasFish ? 'distant' : ''}">
              ${ship.hasFish ? '🐟 Distant Enabled' : 'Nearby Only'}
            </span>
            <span class="tag-badge ${ship.hasRaze ? 'conquer' : ''}">
              ${ship.hasRaze ? '🪓 Conquer Ready' : 'Pillage Only'}
            </span>
          </div>
        </div>
        <div class="ship-actions">
          <button class="btn btn-xs btn-outline" onclick="app.resolveExpeditionShip(${index}, 'pillage')">Pillage</button>
          ${ship.hasRaze ? `<button class="btn btn-xs btn-danger" onclick="app.resolveExpeditionShip(${index}, 'conquer')">Conquer</button>` : ''}
          <button class="btn btn-xs btn-outline" title="Cancel Ship" onclick="app.cancelShip(${index})">&times;</button>
        </div>
      </div>
    `).join('');
  }

  confirmAddShip() {
    const hasFish = document.getElementById('ship-assign-fish').checked;
    const hasRaze = document.getElementById('ship-assign-raze').checked;

    if (hasFish && this.state.resources.fish < 1 && this.state.resources.gold < 1) {
      if (!confirm('You do not have a Fish (or Gold) to assign! Launch anyway?')) return;
    } else if (hasFish) {
      if (this.state.resources.fish >= 1) this.updateResource('fish', -1);
      else this.updateResource('gold', -1);
    }

    if (hasRaze && this.state.resources.raze < 1) {
      if (!confirm('You do not have a Raze token to assign! Launch anyway?')) return;
    } else if (hasRaze) {
      this.updateResource('raze', -1);
    }

    // Deduct ship from supply if available
    if (this.state.resources.ships > 0) {
      this.state.resources.ships -= 1;
    }

    this.state.expeditionQueue.push({ hasFish, hasRaze });
    this.saveState();
    this.toggleModal('modal-ship', false);
    document.getElementById('ship-assign-fish').checked = false;
    document.getElementById('ship-assign-raze').checked = false;
    this.render();
  }

  resolveExpeditionShip(index, mode) {
    if (index < 0 || index >= this.state.expeditionQueue.length) return;
    this.state.expeditionQueue.splice(index, 1);
    // Return ship to supply
    this.state.resources.ships += 1;
    this.saveState();
    this.render();
    if (mode === 'conquer') {
      alert('Island Conquered! Add the Island card to your Empire (provides 1 VP at game end + immediate card abilities).');
    } else {
      alert('Island Pillaged! Take goods indicated in red banner and discard the Island.');
    }
  }

  cancelShip(index) {
    if (confirm('Cancel this ship and return it to your supply?')) {
      this.state.expeditionQueue.splice(index, 1);
      this.state.resources.ships += 1;
      this.saveState();
      this.render();
    }
  }

  /* -------------------------------------------------------------
     Scenario Actions & Events
     ------------------------------------------------------------- */
  drawEventToken() {
    const scenario = SCENARIOS[this.state.scenarioId];
    const token = Math.floor(Math.random() * 5) + 1;
    const eventData = scenario.events[token];
    this.state.lastEvent = {
      token,
      title: eventData.title,
      text: eventData.text
    };
    this.saveState();
    document.getElementById('event-display-container').innerHTML = this.renderEventBox();
  }

  applyEventPenalty() {
    this.updateVP(-2);
    alert('Applied -2 VP penalty for failing the scenario event cost.');
  }

  activateWinterAction() {
    if (this.state.resources.fish < 2 && (this.state.resources.fish + this.state.resources.gold < 2)) {
      alert('You need at least 2 Fish (or Gold substitute) to activate this action!');
      return;
    }
    // Deduct 2 fish (substituting gold if necessary)
    let needed = 2;
    if (this.state.resources.fish >= needed) {
      this.updateResource('fish', -needed);
    } else {
      needed -= this.state.resources.fish;
      this.state.resources.fish = 0;
      this.updateResource('gold', -needed);
    }
    this.updateVP(1);
  }

  addBuildingSite() {
    if (this.state.resources.fish < 1 && this.state.resources.gold < 1) {
      if (!confirm('You do not have 1 Fish to spend! Add site anyway?')) return;
    } else {
      if (this.state.resources.fish >= 1) this.updateResource('fish', -1);
      else this.updateResource('gold', -1);
    }
    this.state.scenarioVariables.buildingSites += 1;
    this.saveState();
    this.renderScenarioCard(SCENARIOS[this.state.scenarioId]);
  }

  addInvasionToken() {
    this.state.scenarioVariables.invasionTokens += 1;
    this.saveState();
    this.renderScenarioCard(SCENARIOS[this.state.scenarioId]);
  }

  removeInvasionToken() {
    this.state.scenarioVariables.invasionTokens = Math.max(0, this.state.scenarioVariables.invasionTokens - 1);
    this.saveState();
    this.renderScenarioCard(SCENARIOS[this.state.scenarioId]);
  }

  /* -------------------------------------------------------------
     Cleanup Automation & Phase Advancement
     ------------------------------------------------------------- */
  executeCleanupAutomation() {
    // 1. Flip action tiles: tiles with pawns -> Solo side; tiles without pawns that are on Solo side -> Standard side
    const tilesWithPawns = new Set([this.state.pawns[1].tile, this.state.pawns[2].tile].filter(Boolean));

    Object.keys(this.state.actionTiles).forEach(tileId => {
      if (tilesWithPawns.has(tileId)) {
        this.state.actionTiles[tileId] = 'solo';
      } else if (this.state.actionTiles[tileId] === 'solo') {
        this.state.actionTiles[tileId] = 'standard';
      }
    });

    // 2. Retrieve pawns
    this.state.pawns[1] = { tile: '', exhausted: false };
    this.state.pawns[2] = { tile: '', exhausted: false };

    // 3. Retrieve spent workers
    this.state.resources.workers += this.state.resources.spentWorkers;
    this.state.resources.spentWorkers = 0;

    // 4. Reset location exhaustion
    this.state.locationExhausted = false;

    // 5. Reset event for next round
    this.state.lastEvent = null;

    this.saveState();
    this.render();
    alert('Cleanup complete! Spent workers retrieved, pawns reset, and solo action tile sides updated.');
  }

  advancePhase() {
    if (this.state.phaseIndex === 3) {
      // End of Cleanup
      if (this.state.round >= 4) {
        this.openFinalScorer();
        return;
      }
      this.state.round += 1;
      this.state.phaseIndex = 0;
    } else {
      this.state.phaseIndex += 1;
    }
    this.saveState();
    this.render();
  }

  /* -------------------------------------------------------------
     Setup Modal & New Game
     ------------------------------------------------------------- */
  openSetupModal() {
    this.updateSetupModalInstructions(this.state.scenarioId);
    this.toggleModal('modal-setup', true);
  }

  updateSetupModalInstructions(scenarioId) {
    const sc = SCENARIOS[scenarioId];
    const box = document.getElementById('setup-instructions-box');
    box.innerHTML = `
      <h4>${sc.name} — Setup Rules</h4>
      <ul>
        <li>${sc.setupText}</li>
        <li>Starting hand: Draw 5 Clan cards, keep 3, discard 2.</li>
        <li>Scoreboard target: Reach <strong>${sc.threshold} VP</strong> over 4 rounds.</li>
      </ul>
    `;
  }

  confirmNewGame() {
    const scenarioRadio = document.querySelector('input[name="scenario-radio"]:checked');
    const scenarioId = scenarioRadio ? scenarioRadio.value : 'winter';
    const clanId = document.getElementById('select-clan').value;

    this.state = this.createInitialState(scenarioId, clanId);
    this.saveState();
    this.toggleModal('modal-setup', false);
    this.render();
  }

  /* -------------------------------------------------------------
     Final Scoring Modal
     ------------------------------------------------------------- */
  openFinalScorer() {
    const scenario = SCENARIOS[this.state.scenarioId];
    document.getElementById('summary-target').textContent = scenario.threshold;
    document.getElementById('calc-board-vp').value = this.state.vp;
    document.getElementById('calc-resources').value =
      this.state.resources.food +
      this.state.resources.wood +
      this.state.resources.stone +
      this.state.resources.sheep +
      this.state.resources.fish;
    document.getElementById('calc-gold').value = this.state.resources.gold;

    const extraBox = document.getElementById('scenario-scoring-fields');
    if (scenario.id === 'winter') {
      extraBox.innerHTML = `
        <div class="scoring-field">
          <label>Unfed Workers (-3 VP each):</label>
          <input type="number" id="calc-winter-unfed" class="form-control" value="0" min="0">
          <small>Workers in Empire (active, spent, assigned) without 1 Food/Fish</small>
        </div>
      `;
    } else if (scenario.id === 'outpost') {
      extraBox.innerHTML = `
        <div class="scoring-field">
          <label>Built-Over Action Locations (2 VP each):</label>
          <input type="number" id="calc-outpost-builtover" class="form-control" value="0" min="0">
        </div>
        <div class="scoring-field">
          <label>Conquered Islands in Empire (+1 VP bonus each):</label>
          <input type="number" id="calc-outpost-islands" class="form-control" value="0" min="0">
          <small>Outpost gives +1 extra VP per Island (total 2 VP)</small>
        </div>
        <div class="scoring-field">
          <label>Workers in Outpost HQ (1 VP each):</label>
          <input type="number" id="calc-outpost-hq" class="form-control" value="0" min="0">
        </div>
      `;
    } else if (scenario.id === 'pirates') {
      extraBox.innerHTML = `
        <div class="scoring-field">
          <label>Conquered Islands in Empire (+1 VP bonus each):</label>
          <input type="number" id="calc-pirate-islands" class="form-control" value="2" min="0">
          <small>Pirate's Den gives +1 extra VP per Island (total 2 VP)</small>
        </div>
      `;
    } else if (scenario.id === 'war') {
      extraBox.innerHTML = `
        <div class="scoring-field">
          <label>Matched Worker + Raze Supply Pairs (2 VP per pair):</label>
          <input type="number" id="calc-war-pairs" class="form-control" value="0" min="0">
          <small>Each pair of 1 Worker (anywhere) & 1 Raze in supply</small>
        </div>
      `;
    } else {
      extraBox.innerHTML = '';
    }

    // Attach listeners to newly injected scenario inputs
    extraBox.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => this.recalculateFinalScore());
    });

    this.recalculateFinalScore();
    this.toggleModal('modal-scorer', true);
  }

  recalculateFinalScore() {
    const scenario = SCENARIOS[this.state.scenarioId];
    const boardVp = parseInt(document.getElementById('calc-board-vp').value, 10) || 0;
    const cards = parseInt(document.getElementById('calc-empire-cards').value, 10) || 0;
    const resources = parseInt(document.getElementById('calc-resources').value, 10) || 0;
    const gold = parseInt(document.getElementById('calc-gold').value, 10) || 0;

    let total = boardVp + cards + Math.floor(resources / 2) + gold;

    if (scenario.id === 'winter') {
      const unfed = parseInt(document.getElementById('calc-winter-unfed')?.value, 10) || 0;
      total -= unfed * 3;
    } else if (scenario.id === 'outpost') {
      const builtover = parseInt(document.getElementById('calc-outpost-builtover')?.value, 10) || 0;
      const islands = parseInt(document.getElementById('calc-outpost-islands')?.value, 10) || 0;
      const hq = parseInt(document.getElementById('calc-outpost-hq')?.value, 10) || 0;
      total += (builtover * 2) + islands + hq;
    } else if (scenario.id === 'pirates') {
      const islands = parseInt(document.getElementById('calc-pirate-islands')?.value, 10) || 0;
      total += islands;
    } else if (scenario.id === 'war') {
      const pairs = parseInt(document.getElementById('calc-war-pairs')?.value, 10) || 0;
      total += pairs * 2;
    }

    document.getElementById('final-score-val').textContent = total;

    const banner = document.getElementById('outcome-banner');
    if (total >= scenario.threshold) {
      banner.className = 'outcome-banner victory';
      banner.textContent = `🏆 VICTORY! You beat the ${scenario.threshold} VP threshold by ${total - scenario.threshold} points!`;
    } else {
      banner.className = 'outcome-banner defeat';
      banner.textContent = `❌ DEFEAT: You scored ${total} VP (Target: ${scenario.threshold} VP. Needed ${scenario.threshold - total} more).`;
    }
  }

  toggleModal(id, show) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.toggle('active', show);
    }
  }
}

// Instantiate global app instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new EotnSoloApp();
});
