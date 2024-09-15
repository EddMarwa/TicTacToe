document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    // Adds score variables
    let playerXScore = 0;
    let playerOScore = 0;

    const clickSound = new Audio('click.mp3');
    const winSound = new Audio('win.mp3');
    const drawSound = new Audio('draw.mp3');

    // Create the game board
    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.textContent = board[i];
            cell.setAttribute('data-value', board[i]);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');
        if (board[index] === '' && isGameActive) {
            board[index] = currentPlayer;
            clickSound.play();
            createBoard();
            checkWinner();
            if (isGameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                highlightWinningCombination(combination);
                winSound.play();
                alert(`Player ${board[a]} wins!`);
                if (board[a] === 'X') playerXScore++;
                else playerOScore++;
                updateScoreboard();
                isGameActive = false;
                return;
            }
        }

        if (!board.includes('')) {
            drawSound.play();
            alert('It\'s a draw!');
            resetBoard();
        }
    }

    // Highlight the winning combination
    function highlightWinningCombination(combination) {
        combination.forEach(index => {
            document.querySelector(`[data-index="${index}"]`).classList.add('win');
        });
    }

    // Reset the board
    function resetBoard() {
        board.fill('');
        currentPlayer = 'X';
        isGameActive = true;
        createBoard();
    }

    // Update the scoreboard
    function updateScoreboard() {
        document.getElementById('playerXScore').textContent = `Player X: ${playerXScore}`;
        document.getElementById('playerOScore').textContent = `Player O: ${playerOScore}`;
    }

    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.classList.add('button', 'reset-button');
    resetButton.addEventListener('click', resetBoard);
    document.querySelector('.container').appendChild(resetButton);

    //  scoreboard
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');
    scoreboard.innerHTML = `
        <h2>Scoreboard</h2>
        <p id="playerXScore">Player X: ${playerXScore}</p>
        <p id="playerOScore">Player O: ${playerOScore}</p>
    `;
    document.querySelector('.container').appendChild(scoreboard);

    createBoard();
});
document.addEventListener('DOMContentLoaded', () => {
   

    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back(); 
    });

    createBoard();
});
