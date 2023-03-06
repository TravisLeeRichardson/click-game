const buttons = document.querySelectorAll(".bubble");
const points = document.getElementById("points");
const resetScore = document.getElementById("resetScore");
const result = document.getElementById("result");
const startGame = document.getElementById("startGame");
const timer = document.getElementById("timer")

let timeLimit = 10000;

const shuffleColors = () => {
  const colors = ["red", "blue", "white", "orange", "yellow", "green"];
  const currentIndex = colors.length;
  return colors.reduce((acc, _, i) => {
    const randomIndex = Math.floor(Math.random() * (currentIndex - i)) + i;
    [acc[i], acc[randomIndex]] = [acc[randomIndex], acc[i]];
    return acc;
  }, colors.slice());
}

const endGame = () => {
  startGame.style.visibility = "visible";
  buttons.forEach(button => {
    button.removeEventListener("click", handleClick);
    button.style.backgroundColor = "black";
  });
  clearTimeout(timeoutId);
  timer.textContent = "";
};


const resetScoreFunction = () => {
  points.textContent = "0 points";
  endGame();
}

const handleClick = (event) => {
  const bubbleColor = window.getComputedStyle(event.target).backgroundColor;
  if (bubbleColor === "rgb(255, 255, 255)") {
    let currentPoints = parseInt(points.textContent);
    let newPoints = currentPoints + 1;
    points.textContent = `${newPoints} points`;
  }
  const shuffledColors = shuffleColors();
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = shuffledColors[i];
  };
}

const startGameFunction = () => {
  startGame.style.visibility = "hidden";
  points.textContent = "0 points";
  const shuffledColors = shuffleColors();
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = shuffledColors[i];
    buttons[i].addEventListener("click", handleClick);
  };

  let remainingTime = timeLimit;
  timeoutId = setTimeout(endGame, timeLimit);
  const intervalId = setInterval(() => {
    remainingTime -= 10;
    const seconds = Math.floor(remainingTime / 1000);
    const milliseconds = (remainingTime % 1000)
      .toString()
      .padStart(3, "0")
      .slice(0, 2);
    timer.textContent = `${seconds}.${milliseconds} seconds`;
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      endGame();
    }
  }, 10);
};


resetScore.addEventListener("click", resetScoreFunction);
startGame.addEventListener("click", startGameFunction)

