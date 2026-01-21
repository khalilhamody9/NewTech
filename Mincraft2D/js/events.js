import { TILE, TOOL_RULES } from "./constants.js";
import { addToInventory, removeFromInventory } from "./inventory.js";
import { getTileType, setTileType } from "./world.js";

export function handleWorldClick(state, row, col) {
  const current = getTileType(state, row, col);

  if (state.selectedInventoryItem) {
    if (current !== TILE.EMPTY) return;

    const ok = removeFromInventory(state, state.selectedInventoryItem);
    if (!ok) return;

    setTileType(state, row, col, state.selectedInventoryItem);

    const stillExists = state.inventory.some(i => i.type === state.selectedInventoryItem);
    if (!stillExists) state.selectedInventoryItem = null;

    return;
  }

  if (!state.selectedTool) return;
  if (current === TILE.EMPTY) return;

  const allowed = TOOL_RULES[state.selectedTool] || [];
  if (!allowed.includes(current)) return; 

  setTileType(state, row, col, TILE.EMPTY);

  addToInventory(state, current);
}
