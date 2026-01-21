import { createInitialWorld, renderWorld, resetWorld } from "./world.js";
import { renderTools, setSelectedTool } from "./tools.js";
import { renderInventory, setSelectedInventoryItem, clearInventory } from "./inventory.js";
import { handleWorldClick } from "./events.js";

function qs(sel) { return document.querySelector(sel); }

const landingEl = qs("#landing");
const gameEl = qs("#game");

const startBtn = qs("#startBtn");
const resetBtn = qs("#resetBtn");
const homeBtn  = qs("#homeBtn"); 

const worldEl = qs("#world");
const toolsEl = qs("#tools");
const inventoryEl = qs("#inventory");

const selectedToolLabel = qs("#selectedToolLabel");
const selectedItemLabel = qs("#selectedItemLabel");
console.log("main.js loaded ✅");

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

function syncLabels() {
  if (selectedToolLabel) {
    selectedToolLabel.textContent = state.selectedTool ? state.selectedTool : "None";
  }
  if (selectedItemLabel) {
    selectedItemLabel.textContent = state.selectedInventoryItem ? state.selectedInventoryItem : "None";
  }
}

function renderAll() {
  renderWorld(worldEl, state.worldMap);

  renderTools(toolsEl, state, (tool) => {
    setSelectedInventoryItem(state, null);
    setSelectedTool(state, tool);
    renderAll();
  });

  renderInventory(inventoryEl, state, (type) => {
    setSelectedInventoryItem(state, type);
    renderAll();
  });

  syncLabels();
}

function initGame() {
  state.worldMap = state.initialWorldMap.map(r => r.slice());
  clearInventory(state);
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
  console.log("START CLICK ✅");
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
