const events = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

function onKeyDown(snake) {
  return (event) => {
    const newDirection = events[event.keyCode];
    snake.setNewDirection(newDirection);
  };
}

export default function changeSnakePosition(snake) {
  const onKeyDownMethod = onKeyDown(snake);
  document.addEventListener("keydown", onKeyDownMethod);
}
