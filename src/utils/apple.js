import { generateRandom } from "./generateRandom";

const snakeWrapper = document.getElementById("snake-block");

class Apple {
  constructor() {
    this.createApple();
  }

  createApple() {
    const apple = document.createElement("div");
    this.apple = apple;
    apple.classList.add("apple");
    snakeWrapper.appendChild(this.apple);
  }

  setApplePosition(newPosition) {
    this.position = newPosition;
  }

  setApplePositionStyle() {
    this.apple.style.top = `${this.position.y * 30}px`;
    this.apple.style.left = `${this.position.x * 30}px`;
  }

  setAppleToArea(snake) {
    if (!this.snake && snake) {
      this.snake = snake;
    }

    const allSnakePositions = this.snake.snakeParts.map((snakePart) =>
      snakePart.getPosition()
    );

    const matrix = Array.from({ length: 19 }, () =>
      Array.from({ length: 19 }, () => 0)
    );

    allSnakePositions.forEach((position) => {
      matrix[position.y][position.x] = 1;
    });

    const emptyMatrixPositions = matrix.reduce((acc, matrixLine, y) => {
      matrixLine.forEach((elem, x) => {
        if (!elem) {
          acc.push({
            x,
            y
          });
        }
      });

      return acc;
    });

    const randomPositionIndex = generateRandom(
      0,
      emptyMatrixPositions.length - 1
    );

    this.setApplePosition(emptyMatrixPositions[randomPositionIndex]);

    this.setApplePositionStyle();
  }

  move() {
    this.setAppleToArea();
  }
}

export function createApple(snake) {
  const apple = new Apple();
  apple.setAppleToArea(snake);

  return apple;
}
