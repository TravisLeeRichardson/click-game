let buttons = document.getElementsByTagName("div");
let points = document.getElementById("points")
let clear = document.getElementById("clear")


clear.addEventListener("click", () => {
  points.textContent = 0
})

Array.from(buttons).forEach((b) => {
  b.addEventListener("click", () => {
      let style = window.getComputedStyle(b);
      let color = style.backgroundColor;
      if (color === "rgb(0, 0, 0)") {
        let currentPoints = parseInt(points.textContent);
        points.textContent = currentPoints + 1;
      } 
    let colors = randomize();
    Array.from(buttons).forEach((button, i) => {
      button.style.backgroundColor = colors[i]
    });
  });
});

function randomize() {
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

console.log(randomize());
