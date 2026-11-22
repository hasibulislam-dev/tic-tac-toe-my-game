
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

let xScore = 0;
let oScore = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();
}

function checkWinner() {
    let won = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;

        if (currentPlayer === "X") {
            xScore++;
            scoreX.textContent = xScore;
        } else {
            oScore++;
            scoreO.textContent = oScore;
        }

        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "Game Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
