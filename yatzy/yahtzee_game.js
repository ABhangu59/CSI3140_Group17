// script.js
const wordList = ['apple', 'bread', 'crane', 'doubt', 'earth']; // Example words
const validWords = ['apple', 'bread', 'crane', 'doubt', 'earth', 'about', 'above', 'actor']; // Add more valid words
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentGuess = '';
let currentRow = 0;

const game = document.getElementById('game');
const keyboard = document.getElementById('keyboard');

// Initialize game grid
for (let i = 0; i < 30; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    game.appendChild(tile);
}

// Initialize keyboard
const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
keys.forEach(key => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.textContent = key;
    keyElement.onclick = () => handleKeyPress(key.toLowerCase());
    keyboard.appendChild(keyElement);
});

// Handle key press
function handleKeyPress(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateGrid();
    }
}

function updateGrid() {
    const tiles = document.querySelectorAll('.tile');
    for (let i = 0; i < 5; i++) {
        const tileIndex = currentRow * 5 + i;
        tiles[tileIndex].textContent = currentGuess[i] || '';
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keys.includes(key.toUpperCase())) {
        handleKeyPress(key);
    } else if (event.key === 'Enter') {
        if (currentGuess.length === 5) {
            if (isValidWord(currentGuess)) {
                checkGuess();
            } else {
                alert('Invalid word!');
                currentGuess = '';
                updateGrid();
            }
        }
    } else if (event.key === 'Backspace') {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    }
});

function isValidWord(word) {
    return validWords.includes(word);
}

function checkGuess() {
    const tiles = document.querySelectorAll('.tile');
    let guessResult = '';

    for (let i = 0; i < 5; i++) {
        const tileIndex = currentRow * 5 + i;
        const letter = currentGuess[i];

        if (letter === secretWord[i]) {
            tiles[tileIndex].classList.add('correct');
            guessResult += 'correct';
        } else if (secretWord.includes(letter)) {
            tiles[tileIndex].classList.add('present');
            guessResult += 'present';
        } else {
            tiles[tileIndex].classList.add('absent');
            guessResult += 'absent';
        }
    }

    if (currentGuess === secretWord) {
        setTimeout(() => alert('Congratulations! You guessed the word!'), 100);
    } else if (currentRow === 5) {
        setTimeout(() => alert(`Game Over! The word was ${secretWord}.`), 100);
    } else {
        currentRow++;
        currentGuess = '';
    }
}
