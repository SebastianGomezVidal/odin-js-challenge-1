import { Game } from "./game.js";

// Element Locators
const optionsListUl = document.querySelector("ul");
const scoreBoardP = document.querySelector(".statistics-board");
const pcScoreSpan = document.getElementById("pc");
const playerScoreSpan = document.getElementById("user");

// Data dependencies
const winningSound = new Audio("./assets/cheering-crowd.wav");
const game = new Game();

//Custom event
const updateScoreEvent = new CustomEvent("updateScoreEvent");
const checkGameWinner = new CustomEvent("checkGameWinner");

//Listeners
optionsListUl.addEventListener("click", async (event) => {
  event.stopPropagation();

  const playStatus = await game.play(event);
  alert(`${playStatus}`);

  await new Promise((resolve) => {
    scoreBoardP.dispatchEvent(updateScoreEvent);
    resolve();
  });
});

scoreBoardP.addEventListener("updateScoreEvent", async (event) => {
  event.stopPropagation();

  await updateScore();

  await new Promise((resolve) => {
    scoreBoardP.dispatchEvent(checkGameWinner);
    resolve();
  });
});

scoreBoardP.addEventListener("checkGameWinner", async (event) => {
  event.stopPropagation();

  const score = game.getScore();
  if (score.playerScore == 5) await endGame("player");
  else if (score.pcScore == 5) await endGame("computer");
});

//Utilities
async function updateScore() {
  const score = game.getScore();
  pcScoreSpan.innerText = score.pcScore;
  playerScoreSpan.innerText = score.playerScore;
}

async function endGame(winner) {
  winningSound.play();
  alert(`The ${winner} has won!`);
  game.resetScore();
  winningSound.onended = () => {
    scoreBoardP.dispatchEvent(updateScoreEvent);
    resolve();
  };
}
