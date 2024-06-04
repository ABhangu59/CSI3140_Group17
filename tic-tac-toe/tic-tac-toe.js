const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
var userTurn = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];


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
        const child = this.querySelector('.X');
        if (child) {
            child.classList.add('active');
        }
        console.log(this.id);
    });
});