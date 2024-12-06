const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

// Winning combinations
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],           // Diagonals
];

// Initialize board
function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.addEventListener("click", handleMove);
    board.appendChild(div);
  });
}

// Handle move
function handleMove(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");
    if (checkWinner(currentPlayer)) {
      updateStatus(`${currentPlayer} wins!`);
      scores[currentPlayer]++;
      updateScore();
      disableBoard();
    } else if (gameBoard.every(cell => cell !== "")) {
      updateStatus("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus(`Player ${currentPlayer}'s turn`);
    }
  }
}

// Check winner
function checkWinner(player) {
  return winningCombos.some(combo =>
    combo.every(index => gameBoard[index] === player)
  );
}

// Update status
function updateStatus(message) {
  status.textContent = message;
}

// Update score
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Disable board
function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.removeEventListener("click", handleMove);
  });
}

// Reset game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  updateStatus("Player X's turn");
  createBoard();
}

// Event listeners
resetButton.addEventListener("click", resetGame);

// Initialize game
createBoard();
