let currentPlayer = 'player-1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let player1Name = '';
let player2Name = '';
let gameActive = false;

document.getElementById('submit').addEventListener('click', function () {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;
    
    if (!player1Name || !player2Name) {
        alert('Please enter both player names!');
        return;
    }

    document.getElementById('player-names').style.display = 'none';
    document.getElementById('board').style.display = 'block';
    document.querySelector('.message').innerText = `${player1Name}, you're up!`;

    gameActive = true;
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        if (!gameActive || gameBoard[cell.id - 1]) return;

        gameBoard[cell.id - 1] = currentPlayer === 'player-1' ? 'X' : 'O';
        cell.innerText = gameBoard[cell.id - 1];

        if (checkWinner()) {
            document.querySelector('.message').innerText = `${currentPlayer === 'player1' ? player1Name : player2Name}, congratulations you won!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'player-1' ? 'player-2' : 'player-1';
        document.querySelector('.message').innerText = `${currentPlayer === 'player-1' ? player1Name : player2Name}, you're up!`;
    });
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}
