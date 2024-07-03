const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restart-button");
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    changePlayer();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            highlightWin(winCondition[i]);
            running = false;
            return;
        }
    }
    if (!options.includes("")) {
        statusText.textContent = "It's a draw!";
        running = false;
    }
}

function highlightWin(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = "#c7ffc7";
    });
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#fff";
    });
    statusText.textContent = `${currentPlayer}'s turn`;
}

initializeGame();
