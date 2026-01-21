import { createInitialWorld, renderWorld, resetWorld } from "./world.js";
import { renderTools, setSelectedTool } from "./tools.js";
import { renderInventory, setSelectedInventoryItem, clearInventory } from "./inventory.js";
import { handleWorldClick } from "./events.js";

// DOM
const landingEl = document.getElementById("landing");
const gameEl = document.getElementById("game");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const homeBtn = document.getElementById("homeBtn");

const worldEl = document.getElementById("world");
const toolsEl = document.getElementById("tools");
const inventoryEl = document.getElementById("inventory");

const state = {
  initialWorldMap: createInitialWorld(),
  worldMap: [],
  inventory: [],
  selectedTool: null,
  selectedInventoryItem: null,
};

function showLanding() {
  landingEl.classList.add("page--active");
  gameEl.classList.remove("page--active");
}

function showGame() {
  landingEl.classList.remove("page--active");
  gameEl.classList.add("page--active");
}

function renderAll() {
  renderWorld(worldEl, state.worldMap);

  renderTools(toolsEl, state, (tool) => {
    state.selectedTool = tool;
    state.selectedInventoryItem = null;
    renderAll();
  });

  renderInventory(inventoryEl, state, (type) => {
    state.selectedInventoryItem = type;
    renderAll();
  });
}

function initGame() {
  state.worldMap = state.initialWorldMap.map(row => row.slice());
  state.inventory = [];
  state.selectedTool = null;
  state.selectedInventoryItem = null;
  renderAll();
}

worldEl.addEventListener("click", (e) => {
  const tile = e.target.closest(".tile");
  if (!tile) return;

  const row = Number(tile.dataset.row);
  const col = Number(tile.dataset.col);

  handleWorldClick(state, row, col);
  renderAll();
});

startBtn.addEventListener("click", () => {
  initGame();
  showGame();
});

homeBtn.addEventListener("click", () => {
  showLanding();
});

resetBtn.addEventListener("click", () => {
  resetWorld(state);
  clearInventory(state);
  state.selectedTool = null;
  state.selectedInventoryItem = null;
  renderAll();
});

showLanding();
