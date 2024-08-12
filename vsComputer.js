// In vsComputer.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
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
            if (isGameActive && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); // 500ms delay before the computer makes its move
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player only if the game is still active
            }
        }
    }

  
    function makeComputerMove() {
        const availableCells = board.map((value, index) => value === '' ? index : null).filter(value => value !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = currentPlayer;
        createBoard();
        checkWinner();
        if (isGameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player after the computer's move
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
   

   
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back(); 
    });

    createBoard();
});
