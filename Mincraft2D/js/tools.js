import { TOOL, TOOL_LABEL } from "./constants.js";

const TOOL_EMOJI = {
  [TOOL.AXE]: "🪓",
  [TOOL.PICKAXE]: "⛏",
  [TOOL.SHOVEL]: "🧹",
};

export function renderTools(toolsEl, state, onSelectTool) {
  const tools = [TOOL.AXE, TOOL.PICKAXE, TOOL.SHOVEL];
  toolsEl.innerHTML = "";

  tools.forEach((tool) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toolCard" + (state.selectedTool === tool ? " toolCard--active" : "");
    btn.dataset.tool = tool;

    btn.innerHTML = `<span class="toolIcon">${TOOL_EMOJI[tool] || TOOL_LABEL[tool]}</span>`;

    btn.addEventListener("click", () => onSelectTool(tool));
    toolsEl.appendChild(btn);
  });
}

export function setSelectedTool(state, tool) {
  state.selectedTool = tool;
}
