const buttons = document.querySelectorAll(".bubble");
const points = document.getElementById("points");
const resetScore = document.getElementById("resetScore");
const result = document.getElementById("result");
const startGame = document.getElementById("startGame");
const timer = document.getElementById("timer")
const INSTRUCTIONS_TEXT = "Click the white oval as many times as you can before the timer runs out!";


let timeLimit = 10000;
let timeoutId;
let intervalId;

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
  
  buttons.forEach(button => {
    button.removeEventListener("click", handleClick);
    button.style.backgroundColor = "black";
    if (["two", "five"].includes(button.getAttribute("id"))) {
      button.style.backgroundColor = "white"
    }

    // Show very important message
    const winnerBubble = document.getElementById("two");
    winnerBubble.style.backgroundImage = 'url("https://gateway.pinata.cloud/ipfs/QmexS9rTrrVxk4QAGceMLbAs2etfVgrBn61nDG9iLPUG25?_gl=1*nketmy*rs_ga*MDMwODZjN2QtZjEyYi00Mjk5LTkxOTctZDA4MGE1MjM1YjZl*rs_ga_5RMPXG14TE*MTY4MjIxNzYwNi41LjEuMTY4MjIxNzYyNS40MS4wLjA.")';
    winnerBubble.style.backgroundSize = "cover";
    winnerBubble.style.backgroundPosition = "center top";

    // Show the legend 
    if (button.getAttribute("id") === "five") {
      const legendBubble = document.getElementById("five");
      legendBubble.style.backgroundImage = 'none';
      legendBubble.style.backgroundColor = 'white';
      legendBubble.style.textAlign = 'center';
      legendBubble.style.display = 'flex';
      legendBubble.style.justifyContent = 'center';
      legendBubble.style.alignItems = 'center';
      legendBubble.innerHTML = '<div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"><h3 style="margin: 5px 0; font-style: italic;">(Legend below by master Clicker, Kiernan Richardson)</h3><p style="margin: 10px 0;">0-5 = Noob</p><p style="margin: 10px 0;">6-10 = Still Kind of a Noob</p><p style="margin: 10px 0;">11-15 = Ok, Ok, You have Skills</p><p style="margin: 10px 0;">16-20 = You put the game in a headlock</p><p style="margin: 10px 0;">21+ = You took the red pill.</p></div>';
    }

  });

  clearTimeout(timeoutId);
  timer.textContent = "";
  const score = parseInt(points.textContent);
};

const assignColors = () => {
  const shuffledColors = shuffleColors();
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = shuffledColors[i];
    buttons[i].style.backgroundImage = 'none';
    buttons[i].innerHTML = '';
    buttons[i].addEventListener("click", handleClick);
  };
}
const resetScoreFunction = () => {
  points.textContent = "0 points";
  assignColors();
  startGame.style.visibility = "visible";
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  remainingTime = timeLimit;
  timer.textContent = "";
  const score = parseInt(points.textContent);
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

   remainingTime = timeLimit;
  timeoutId = setTimeout(endGame, timeLimit);
   intervalId = setInterval(() => {
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

