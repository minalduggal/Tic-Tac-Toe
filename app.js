let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");
let scoreText = document.querySelector("#score");

let turn0 = true;
let count = 0;
let lastWinner = "";
let gameStarter = true; // Tracks who started the CURRENT game (true = O, false = X)

let Oscore = 0;
let Xscore = 0;
let drawScore = 0;

const winnerPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const updateScoreboard = () => {
  scoreText.innerText = `O: ${Oscore} | X: ${Xscore} | Draws: ${drawScore}`;
};

const updateTurnText = () => {
  turnText.innerText = `${turn0 ? "O" : "X"}'s Turn`;
};

const resetGame = () => {
  count = 0;

  if (lastWinner === "O") {
    turn0 = true;
    gameStarter = true;
  } else if (lastWinner === "X") {
    turn0 = false;
    gameStarter = false;
  } else {
    // Draw case: strictly swap who starts based on who started the match that just tied
    gameStarter = !gameStarter;
    turn0 = gameStarter;
  }

  updateTurnText();
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turn0) {
      box.classList.add("O");
      box.innerText = "O";
    } else {
      box.classList.add("X");
      box.innerText = "X";
    }

    count++;
    box.disabled = true;

    let winnerFound = checkWinner();

    if (!winnerFound) {
      if (!checkDraw()) {
        turn0 = !turn0;
        updateTurnText();
      }
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("O", "X");
  }
};

const checkDraw = () => {
  if (count === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();

    drawScore++;
    lastWinner = "";
    updateScoreboard();

    return true;
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations ${winner} is the winner`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  lastWinner = winner;

  if (winner === "O") {
    Oscore++;
  } else {
    Xscore++;
  }

  updateScoreboard();
};

const checkWinner = () => {
  for (let patterns of winnerPatterns) {
    let pos1val = boxes[patterns[0]].innerText;
    let pos2val = boxes[patterns[1]].innerText;
    let pos3val = boxes[patterns[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize display elements on first page load
updateTurnText();
updateScoreboard();
