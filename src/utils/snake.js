import { gameOver } from "./menu";

const snakeWrapper = document.getElementById("snake-block");

const isPositionOcupied = (position, snakePart) => {
  const isOcupied =
    snakePart.position.x === position.x && snakePart.position.y === position.y;
  const nextSnakePart = snakePart.nextPart;
  return (
    isOcupied ||
    (nextSnakePart ? isPositionOcupied(position, nextSnakePart) : false)
  );
};

class SnakePart {
  constructor({ isHead, position }) {
    this.id = Math.round(Math.random() * 100000);
    this.direction = "up";

    if (isHead) {
      this.isHead = true;
      this.position = {
        x: 10,
        y: 10
      };
    }

    if (position) {
      this.position = {
        x: position.x,
        y: position.y + 1
      };
    }
  }

  getPosition() {
    return this.position;
  }

  setDependency(nextPart) {
    this.nextPart = nextPart;
  }

  changePositionStyle() {
    this.snakeDiv.style.top = `${this.position.y * 30}px`;
    this.snakeDiv.style.left = `${this.position.x * 30}px`;
  }

  setNewPosition(newPosition) {
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
    this.changePositionStyle();
  }

  placeOnTheArea() {
    const snakeDiv = document.createElement("div");
    this.snakeDiv = snakeDiv;
    snakeDiv.classList.add("snake-part");
    if (this.isHead) {
      snakeDiv.classList.add("snake-head");
    }
    this.changePositionStyle();
    snakeWrapper.appendChild(snakeDiv);

    if (this.nextPart) {
      this.nextPart.placeOnTheArea();
    }
  }

  move({ snake, newPosition }) {
    const oldPosition = {
      x: this.position.x,
      y: this.position.y
    };
    if (newPosition) {
      this.position = newPosition;
      this.changePositionStyle();
    } else if (this.isHead) {
      switch (this.direction) {
        case "up": {
          if (this.position.y) {
            this.position.y = this.position.y - 1;
          } else {
            this.position.y = 19;
          }
          break;
        }
        case "down": {
          if (this.position.y === 19) {
            this.position.y = 0;
          } else {
            this.position.y = this.position.y + 1;
          }
          break;
        }
        case "left": {
          if (this.position.x) {
            this.position.x = this.position.x - 1;
          } else {
            this.position.x = 19;
          }
          break;
        }
        case "right": {
          if (this.position.x === 19) {
            this.position.x = 0;
          } else {
            this.position.x = this.position.x + 1;
          }
          break;
        }
        default: {
          console.log("default");
        }
      }

      const isOcupied = isPositionOcupied(this.position, this.nextPart);

      if (isOcupied) {
        gameOver();
        return false;
      }

      if (
        this.isHead &&
        this.position.x === this.apple.position.x &&
        this.position.y === this.apple.position.y &&
        snake
      ) {
        console.log("eat apple");
        snake.addSnakePart();
        this.apple.move();
      }

      this.changePositionStyle();
    }

    if (this.nextPart) {
      this.nextPart.move({ newPosition: oldPosition });
    }

    return true;
  }

  setNewDirection(newDirection) {
    if (
      (["up", "down"].includes(this.direction) &&
        ["up", "down"].includes(newDirection)) ||
      (["left", "right"].includes(this.direction) &&
        ["left", "right"].includes(newDirection))
    ) {
      return;
    }
    this.direction = newDirection;
  }

  setApple(apple) {
    this.apple = apple;
  }
}

class Snake {
  constructor() {
    this.timer = null;
    this.timeOut = 500;
    this.snakeParts = [];
    this.snakeHead = new SnakePart({
      isHead: true
    });
    const snakeMiddlePart = new SnakePart({
      position: this.snakeHead.getPosition()
    });
    const snakeTail = new SnakePart({
      position: snakeMiddlePart.getPosition()
    });
    this.snakeHead.setDependency(snakeMiddlePart);
    snakeMiddlePart.setDependency(snakeTail);

    this.addSnakeParts(this.snakeHead, snakeMiddlePart, snakeTail);
  }

  addSnakeParts(...snakeParts) {
    this.snakeParts = [...this.snakeParts, ...snakeParts];
  }

  addSnakePart() {
    const snakeTail = this.snakeParts.at(-1);
    const newSnakeTail = new SnakePart({
      position: snakeTail.getPosition()
    });
    newSnakeTail.placeOnTheArea();

    snakeTail.setDependency(newSnakeTail);

    this.addSnakeParts(newSnakeTail);
  }

  setSnakeOnTheArea() {
    this.snakeHead.placeOnTheArea();
  }

  moveSnake() {
    const prevSize = this.snakeParts.length;
    const isSnakeMoved = this.snakeHead.move({ snake: this });

    if (isSnakeMoved) {
      const newSize = this.snakeParts.length;
      if (prevSize !== newSize && this.timeOut > 200) {
        this.timeOut = this.timeOut - 20;
      }

      this.move();
    } else {
      this.stop();
    }
  }

  move(withTimer = true) {
    if (withTimer) {
      this.timer = setTimeout(() => {
        this.moveSnake();
      }, this.timeOut);
    } else {
      clearTimeout(this.timer);
      this.moveSnake();
    }
  }

  stop() {
    clearTimeout(this.timer);
  }

  setNewDirection(newDirection) {
    this.snakeHead.setNewDirection(newDirection);
    this.move(false);
  }

  setApple(apple) {
    this.snakeHead.setApple(apple);
  }
}

export let SNAKE = null;

export function createSnake() {
  SNAKE = new Snake();

  SNAKE.setSnakeOnTheArea();
  SNAKE.move();

  return SNAKE;
}
