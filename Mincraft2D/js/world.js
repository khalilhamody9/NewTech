import { TILE, WORLD_COLS, WORLD_ROWS } from "./constants.js";

function deepCopy2D(arr) {
  return arr.map(row => row.slice());
}

export function createInitialWorld() {
  const rows = WORLD_ROWS;
  const cols = WORLD_COLS;

  const map = Array.from({ length: rows }, () => Array.from({ length: cols }, () => TILE.EMPTY));

  for (let c = 0; c < cols; c++) {
    map[8][c] = TILE.GRASS;
    map[9][c] = TILE.DIRT;
    map[10][c] = TILE.DIRT;
    map[11][c] = TILE.ROCK;
  }

  addTree(map, 3, 5);
  addTree(map, 8, 6);
  addTree(map, 14, 5);
  addTree(map, 17, 6);

  map[7][6] = TILE.ROCK;
  map[7][12] = TILE.ROCK;
  map[6][10] = TILE.ROCK;

  return map;
}

function addTree(map, x, topY) {
  map[topY][x] = TILE.WOOD;
  map[topY + 1][x] = TILE.WOOD;
  map[topY + 2][x] = TILE.WOOD;
}

export function renderWorld(worldEl, worldMap) {
  worldEl.style.setProperty("--cols", worldMap[0].length);
  worldEl.style.setProperty("--rows", worldMap.length);

  worldEl.innerHTML = "";

  for (let r = 0; r < worldMap.length; r++) {
    for (let c = 0; c < worldMap[0].length; c++) {
      const type = worldMap[r][c];
      const tile = document.createElement("div");
      tile.className = `tile tile--${type}`;
      tile.dataset.row = String(r);
      tile.dataset.col = String(c);
      tile.dataset.type = type;
      worldEl.appendChild(tile);
    }
  }
}

export function resetWorld(state) {
  state.worldMap = deepCopy2D(state.initialWorldMap);
}

export function getTileType(state, row, col) {
  return state.worldMap[row][col];
}

export function setTileType(state, row, col, type) {
  state.worldMap[row][col] = type;
}
