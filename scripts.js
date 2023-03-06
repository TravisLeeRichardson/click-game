let buttons = document.getElementsByTagName("div");
let points = document.getElementById("points");
let resetScore = document.getElementById("resetScore");
let result = document.getElementById("result");
let startGame = document.getElementById("startGame");

let timeLimit = 10000;

const endGame = () => {
  Array.from(buttons).forEach((button) => {
    button.removeEventListener("click", handleClick);
    button.style.backgroundColor = "black";
  });
}

const shuffleColors = () => {
  let colors = ["red", "blue", "black", "orange", "yellow", "green"];
  let currentIndex = colors.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [colors[currentIndex], colors[randomIndex]] = [
      colors[randomIndex],
      colors[currentIndex],
    ];
  }
  return colors;
}


const resetScoreFunction = () => {
  points.textContent = 0;
  endGame();
}
resetScore.addEventListener("click", resetScoreFunction);

function handleClick() {
  let style = window.getComputedStyle(this);
  let color = style.backgroundColor;
  if (color === "rgb(0, 0, 0)") {
    let currentPoints = parseInt(points.textContent);
    points.textContent = currentPoints + 1;
  }
  let colors = shuffleColors();
  Array.from(buttons).forEach((button, i) => {
    button.style.backgroundColor = colors[i];
  });
}

const startGameFunction = () => {
  points.textContent = 0;
  let colors = shuffleColors();
  Array.from(buttons).forEach((button, i) => {
    button.style.backgroundColor = colors[i];
    button.addEventListener("click", handleClick);
  });

  setTimeout(() => {
    endGame();
  }, timeLimit);
}
startGame.addEventListener("click", startGameFunction)

