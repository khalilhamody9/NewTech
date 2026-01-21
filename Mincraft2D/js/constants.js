export const TILE = {
  EMPTY: "empty",
  GRASS: "grass",
  DIRT: "dirt",
  ROCK: "rock",
  WOOD: "wood",
};

export const TOOL = {
  AXE: "axe",
  PICKAXE: "pickaxe",
  SHOVEL: "shovel",
};

export const TOOL_LABEL = {
  [TOOL.AXE]: "🪓 Axe",
  [TOOL.PICKAXE]: "⛏ Pickaxe",
  [TOOL.SHOVEL]: "🧹 Shovel",
};

export const TOOL_RULES = {
  [TOOL.AXE]: [TILE.WOOD],
  [TOOL.PICKAXE]: [TILE.ROCK],
  [TOOL.SHOVEL]: [TILE.DIRT, TILE.GRASS],
};

export const WORLD_COLS = 20;
export const WORLD_ROWS = 12;
