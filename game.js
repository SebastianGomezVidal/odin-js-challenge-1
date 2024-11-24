function getComputerChoice() {
  const random = Math.random();

  if (random < 0.33) {
    return "paper";
  } else if (random >= 0.33 && random < 0.66) {
    return "scissors";
  } else {
    return "rock";
  }
}

function getHumanChoice() {
  const options = ["paper", "scissors", "rock"];

  // Create a formatted string for options
  const optionsList = options
    .map((option, index) => `${index + 1}. ${option}`)
    .join("\n");

  // Prompt the user for input
  let response = window.prompt(
    `Please type-in your selection:
    \n${optionsList}`
  );

  if (response !== null && response !== "") {
    response = response.toLowerCase();
    if (options.includes(response)) return response;
  }

  alert("Invalid choice. Please try again.");
  getHumanChoice();
}

function getGameScore(rounds, computerScore, humanScore) {
  console.log(
    `     *******************************************
     * Welcome to Game Rock - Scissors - Paper * 
     *******************************************
     
     Round # ${rounds + 1}
     
     Current score:
        machine score: ${computerScore} 
         player score: ${humanScore} \n\n`
  );
}

function playRound() {
  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();

  if (humanSelection === computerSelection) return "tie";
  else if (
    (humanSelection === "rock" && computerSelection === "scissors") ||
    (humanSelection === "scissors" && computerSelection === "paper") ||
    (humanSelection === "paper" && computerSelection === "rock")
  )
    return "human";
  else return "computer";
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let rounds = 0; rounds < 5; rounds++) {
    const result = playRound();
    if (result === "human") {
      humanScore++;
      alert("User has won!");
    } else if (result === "computer") {
      computerScore++;
      alert("Computer has won!");
    } else {
      alert("It is a tie!");
    }
    getGameScore(rounds, computerScore, humanScore);
  }
}

playGame();
