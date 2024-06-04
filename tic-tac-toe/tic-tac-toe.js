const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
var userTurn = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
var numberOfPlayerWins = 0;
var numberOfComputerWins = 0;


const win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

squares.forEach(square => {
    square.addEventListener('click', function() {
        if(userTurn){
            const child = this.querySelector('.X');
            const xIndex = this.id;
            if (child) {
                child.classList.add('active');
                gameBoard[xIndex-1] = "X";
            }
        } 
        userTurn = false;

        computerTurn();
        if (checkWinner(gameBoard, "X")) {
            alert("Player wins!");
            numberOfPlayerWins++;
            console.log(numberOfPlayerWins)
            resetGame();
        } else if (gameBoard.every(cell => cell !== "")) {
            alert("It's a draw!");
            resetGame();
        } 
        
        console.log(gameBoard);
    });
});

function computerTurn() {
    let emptySquares = gameBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptySquares.length > 0) {
        let randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        gameBoard[randomIndex] = "O";
        squares[randomIndex].textContent = "O";
        if (checkWinner(gameBoard, "O")) {
            alert("Computer wins!");
            numberOfComputerWins++;
            console.log(numberOfComputerWins)
            resetGame();
        } else if (gameBoard.every(cell => cell !== "")) {
            alert("It's a draw!");
            resetGame();
        } else {
            userTurn = true;
        }
    }
}

function checkWinner(board, player) {
    return win_combos.some(combo => {
        return combo.every(index => {
            return board[index] === player;
        });
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    squares.forEach(square => {

        const child = square.querySelector('.X');;
        console.log(child)
    });
    userTurn = true;
}