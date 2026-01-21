import { TILE } from "./constants.js";

export function addToInventory(state, tileType) {
  if (tileType === TILE.EMPTY) return;

  const index = state.inventory.findIndex(i => i.type === tileType);
  if (index >= 0) state.inventory[index].count++;
  else state.inventory.push({ type: tileType, count: 1 });
}

export function removeFromInventory(state, tileType) {
  const index = state.inventory.findIndex(i => i.type === tileType);
  if (index < 0) return false;

  state.inventory[index].count--;
  if (state.inventory[index].count <= 0) state.inventory.splice(index, 1);
  return true;
}

export function clearInventory(state) {
  state.inventory = [];
  state.selectedInventoryItem = null;
}

export function setSelectedInventoryItem(state, typeOrNull) {
  state.selectedInventoryItem = typeOrNull;
}

export function renderInventory(invEl, state, onSelectItem) {
  invEl.innerHTML = "";

  const SLOTS = 10;
  const items = state.inventory.slice(0, SLOTS);

  for (let i = 0; i < SLOTS; i++) {
    const item = items[i];

    const btn = document.createElement("button");
    btn.type = "button";

    if (!item) {
      btn.className = "slot slot--empty";
      btn.disabled = true;
      invEl.appendChild(btn);
      continue;
    }

    btn.className =
      "slot tile tile--" + item.type +
      (state.selectedInventoryItem === item.type ? " slot--active" : "");

    btn.innerHTML = `<span class="count">${item.count}</span>`;
    btn.addEventListener("click", () => onSelectItem(item.type));
    invEl.appendChild(btn);
  }
}
