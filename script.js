const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

// initialize current player
let currentPlayer = 'X';

function cellClicked(e) {

    // if gamemode has been selected
    if (gameModeSelected === true) {

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

            // if single player game
            if (singlePlayer === true && currentPlayer === 'O' && hasWinner === false) {
                // computer plays
                computerPlay();
            }
        }
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

        // if there is no winner
        else if (cells[0].textContent !== ' ' && cells[1].textContent !== ' ' && cells[2].textContent !== ' ' && cells[3].textContent !== ' ' && cells[4].textContent !== ' ' && cells[5].textContent !== ' ' && cells[6].textContent !== ' ' && cells[7].textContent !== ' ' && cells[8].textContent !== ' ') {
            hasWinner = true;
            document.getElementById('current-player').textContent = `It's a tie!`;
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

    // promt user to select gamemode
    gameModeSelected = false;
    document.getElementById("popup").style.display = "block";
});

// cant click on cells if gamemode has not been selected
let gameModeSelected = false;

// show popup when the page loads
window.onload = function () {
    document.getElementById("popup").style.display = "block";
}

// hide popup when the user clicks on the button
function hidePopup() {
    document.getElementById("popup").style.display = "none";
    gameModeSelected = true;
}

// if single player button is clicked
function singlePlayerButton() {
    hidePopup();
    singlePlayer = true;
}

// if two player button is clicked
function twoPlayerButton() {
    hidePopup();
    singlePlayer = false;
}

// computer plays randomly
function computerPlay () {

    if (singlePlayer === true) {
        // wait for 1 second before computer plays
        setInterval(() => {
            if (currentPlayer === 'O' && hasWinner === false) {
                // randomly select a cell that is not filled
                let randomCell = Math.floor(Math.random() * 9);
                while (cells[randomCell].textContent !== ' ' && singlePlayer === true) {
                    randomCell = Math.floor(Math.random() * 9);
                }
                if (singlePlayer === true) {
                    cells[randomCell].textContent = currentPlayer;
                    currentPlayer = 'X'
                    document.getElementById('current-player').textContent = "Current Player: " + currentPlayer;
                    checkWinner();
                }
            }
        }, 1000);
    }
}