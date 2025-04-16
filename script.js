const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const playerSelectionBox = document.getElementById("player-selection-box");
const computerSelectionBox = document.getElementById("computer-selection-box");
const playerChoiceElem = playerSelectionBox.querySelector("#player-choice");
const resetBtn = document.getElementById("reset");
const computerChoiceElem =
  computerSelectionBox.querySelector("#computer-choice");
const resultText = document.querySelector(".result-text");

let playerScore = 0;
let computerScore = 0;
let isPlaying = false;

const icons = {
  rock: {
    icon: "🪨",
    backgroundImage: "linear-gradient(135deg, #ff676c 0%, #fca289 100%)",
  },
  paper: {
    icon: "📜",
    backgroundImage: "linear-gradient(135deg, #3984fc 0%, #71d0fc 100%)",
  },
  scissor: {
    icon: "✂️",
    backgroundImage: "linear-gradient(135deg, #48a6a7 0%, #9acbd0 100%)",
  },
};

function setComputerChoice() {
  return new Promise((resolve, reject) => {
    const randomIndex = Math.floor(Math.random() * 3);
    const key = Object.keys(icons)[randomIndex];
    let countDown = 3;

    const intervalId = setInterval(() => {
      if (countDown === 0) {
        clearInterval(intervalId);
        computerChoiceElem.innerText = icons[key].icon;
        computerChoiceElem.style.backgroundImage = icons[key].backgroundImage;
        resolve(key);
      } else {
        computerChoiceElem.innerText = countDown;
        computerChoiceElem.style.backgroundImage = "";
        countDown--;
      }
    }, 600);
  });
}
function setUserChoice(e, choice) {
  playerChoiceElem.innerText = icons[choice].icon;
  playerChoiceElem.style.backgroundImage = icons[choice].backgroundImage;
}

function getWinner(userChoice, computerChoice) {
  if (userChoice === "rock") {
    if (computerChoice === "rock") {
      return "draw";
    } else if (computerChoice === "paper") {
      return "computer";
    } else if (computerChoice === "scissor") {
      return "user";
    }
  } else if (userChoice === "paper") {
    if (computerChoice === "rock") {
      return "user";
    } else if (computerChoice === "paper") {
      return "draw";
    } else if (computerChoice === "scissor") {
      return "computer";
    }
  } else if (userChoice === "scissor") {
    if (computerChoice === "rock") {
      return "computer";
    } else if (computerChoice === "paper") {
      return "user";
    } else if (computerChoice === "scissor") {
      return "draw";
    }
  }
}

function updateUI(winner) {
  if (winner === "user") {
    playerScoreElem.innerText = ++playerScore;
    playerSelectionBox.classList.add("winner");
  } else if (winner === "computer") {
    computerScoreElem.innerText = ++computerScore;
    computerSelectionBox.classList.add("winner");
  }
  resultText.innerText =
    winner === "draw" ? "Match Draw" : `${winner} wins 😍🎉`;
}

function resetGame() {
  playerChoiceElem.innerText = "❔";
  playerChoiceElem.style.backgroundImage = "";
  computerChoiceElem.innerText = "❔";
  computerChoiceElem.style.backgroundImage = "";
  playerSelectionBox.classList.remove("winner");
  computerSelectionBox.classList.remove("winner");
  resultText.innerText = "Choose your weapon!";
  isPlaying = false;
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElem.innerText = 0;
  computerScoreElem.innerText = 0;
  resetGame();
}
function startPlay(e, userChoice) {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  setUserChoice(e, userChoice);
  setComputerChoice().then((computerChoice) => {
    const winner = getWinner(userChoice, computerChoice);
    updateUI(winner);

    setTimeout(() => {
      resetGame();
    }, 1500);
  });
}

resetBtn.addEventListener("click", restartGame);
