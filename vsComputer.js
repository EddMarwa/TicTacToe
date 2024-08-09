document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X'; // Player X starts
    let isGameActive = true;

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
                currentPlayer = 'O'; // Switch to computer
                computerPlay();
            }
        }
    }

    // Computer's turn
    function computerPlay() {
        let emptyCells = board.map((cell, index) => (cell === '') ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            board[emptyCells[randomIndex]] = currentPlayer;
            createBoard();
            checkWinner();
            currentPlayer = 'X'; // Switch back to player
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

    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.classList.add('button', 'reset-button');
    resetButton.addEventListener('click', resetBoard);
    document.querySelector('.container').appendChild(resetButton);

    createBoard();
});
