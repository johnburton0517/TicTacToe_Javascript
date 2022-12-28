const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

// initialize current player
let currentPlayer = 'X';

function cellClicked(e) {
    if (e.target.textContent !== ' ') {
        alert('This cell is already filled');
    }

    else if (hasWinner === false) {
        // Fill the cell with the current player X or O
        e.target.textContent = currentPlayer;

        // Change the current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Change the current player on game info
        document.getElementById('current-player').textContent = "Current Player: " + currentPlayer;

        // Check if the game is over
        checkWinner();
    }
}
  
var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var hasWinner = false;

// check if there is a winner
function checkWinner() {
    // winner if there is a match in the winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent !== ' ') {
            hasWinner = true;
            // animateWinningCells();
            animateWinningCells(a, b, c);

            // change current-player to "Player X" or "Player O won"
            document.getElementById('current-player').textContent = `Player ${cells[a].textContent} won!`;
            break;
        }
        else {
            hasWinner = false;
        }
    }
}

// animate on the winning cells
function animateWinningCells(a, b, c) {
    let i = 0;
    const intervalId = setInterval(() => {
        if (i >= 3) {
        clearInterval(intervalId);
        cells[a].classList.add('green');
        cells[b].classList.add('green');
        cells[c].classList.add('green');
        return;
        }
        cells[a + (b - a) * i].classList.add('green');
        i++;
    }, 500);
  }
  


// Reset the game
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
    for (const cell of cells) {
        cell.textContent = ' ';
        cell.classList.remove('green');
    }

    // Reset other game state variables
    currentPlayer = 'X';
    document.getElementById('current-player').textContent = "Current Player: " + 'X';
    hasWinner = false;
});

