import { createApple } from "./utils/apple";
import changeSnakePosition from "./utils/changeSnakeDirection";
import { hideMenu } from "./utils/menu";
import { createSnake } from "./utils/snake";

function startGame() {
  const snake = createSnake();

  changeSnakePosition(snake);
  const apple = createApple(snake);
  snake.setApple(apple);
  hideMenu();
}

const startGameButton = document.getElementById("start-game");

startGameButton.addEventListener("click", startGame);
