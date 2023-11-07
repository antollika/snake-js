const menu = document.getElementById("menu");
const gameOverElem = document.getElementById("game-over");

export function hideMenu() {
  menu.classList.add("hidden");
}

function showMenu() {
  menu.classList.remove("hidden");
  gameOverElem.classList.add("show");
}

export function gameOver() {
  showMenu();
}
