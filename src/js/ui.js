import { Game } from "./game.js";

const optionsList = document.querySelector("ul");
const scoreBanner = document.querySelector(".statistics");
const pcScore = document.getElementById("pc");
const playerScore = document.getElementById("user");

const game = new Game();

const finishedGame = new CustomEvent("finishedGame", {
  detail: { message: "The game has finished" },
});

optionsList.addEventListener("click", (event) => {
  event.stopPropagation();
  const playStatus = game.play(event);
  alert(`${playStatus}`);
  scoreBanner.click();
});

scoreBanner.addEventListener("click", (event) => {
  event.stopPropagation();

  const score = game.getScore();
  pcScore.innerText = score.pcScore;
  playerScore.innerText = score.playerScore;

  if (score.playerScore == 5) end("player");
  if (score.pcScore == 5) end("computer");
});

scoreBanner.addEventListener("endGame", (event) => {
  alert(event.detail.message);
  location.reload();
});

function end(winner) {
  const endGame = new CustomEvent("endGame", {
    detail: { message: `The game is finished, ${winner} has won!` },
  });
  scoreBanner.dispatchEvent(endGame);
}
