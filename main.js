var gameBox = document.querySelector('.game-box');
var cells = document.querySelectorAll('.cell');
var playerStatus = document.querySelector('h2');
var resetButton = document.querySelector('.reset');

var winningCombinations  = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"]
];
var xScore = 0;
var oScore = 0;

var currentPlayer = "x";
var emptyCells = 9;

playerStatus.innerText = "Player X";

resetButton.addEventListener('click', resetGame);

gameBox.addEventListener('click', function(event) {
  var paragraph = event.target.querySelector('p');
  if (currentPlayer === "x") {
    if (event.target.classList.contains('cell') && paragraph.innerText === "") {
      paragraph.innerText = "x";
      emptyCells--;

      if (!checkWin(currentPlayer)) { // if not a win, continue the game
        currentPlayer = "o";
        playerStatus.innerText = "Player " + currentPlayer.toUpperCase();
      };
    }
  } else if (currentPlayer === "o") {
    if (event.target.classList.contains('cell') && paragraph.innerText === "") {
      paragraph.innerText = "o";
      emptyCells--;

      if (!checkWin(currentPlayer)) {
        currentPlayer = "x";
        playerStatus.innerText = "Player " + currentPlayer.toUpperCase();
      };
    }
  }
});

function cellText(cellNumber) {
  return gameBox.querySelector('.cell' + cellNumber).innerText
}

function checkWin(hand) {
  var win = false;
  winningCombinations.forEach(function(combo) {
    if (cellText(combo[0]) === hand && cellText(combo[1]) === hand && cellText(combo[2]) === hand) {
      win = true;
    }
  });

  if (win) {
    playerStatus.innerText = "Player " + currentPlayer.toUpperCase() + " wins!";
    if (currentPlayer === "x") {
      xScore++;
      document.querySelector(".x-score").innerText = "X: " + xScore;
    } else if (currentPlayer === "o") {
      oScore++;
      document.querySelector(".o-score").innerText = "O: " + oScore;
    }
    currentPlayer = "";
    resetButton.style.display = "block";
    return true;

  } else if (emptyCells === 0) { // case if draw
    playerStatus.innerText = "Draw!";
    resetButton.style.display = "block";
    return true;

  } else {
    return false;
  }
}

function resetGame() {
  cells.forEach(function(cell) {
    cell.querySelector('p').innerText = "";
  })
  currentPlayer = "x";
  playerStatus.innerText = "Player X";
  emptyCells = 9;
  resetButton.style.display = "none";
}
