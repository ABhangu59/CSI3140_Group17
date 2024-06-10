function clearDots(dice) {
    while (dice.firstChild) {
        dice.removeChild(dice.firstChild);
    }
}

function addDot(dice, className) {
    const dot = document.createElement('div');
    dot.className = 'dot ' + className;
    dice.appendChild(dot);
}

function showDiceNumber(dice, number) {
    clearDots(dice);
    if (number === 1) {
        addDot(dice, 'dot4');
    } else if (number === 2) {
        addDot(dice, 'dot1');
        addDot(dice, 'dot7');
    } else if (number === 3) {
        addDot(dice, 'dot1');
        addDot(dice, 'dot4');
        addDot(dice, 'dot7');
    } else if (number === 4) {
        addDot(dice, 'dot2');
        addDot(dice, 'dot1');
        addDot(dice, 'dot6');
        addDot(dice, 'dot7');
    } else if (number === 5) {
        addDot(dice, 'dot1');
        addDot(dice, 'dot2');
        addDot(dice, 'dot4');
        addDot(dice, 'dot6');
        addDot(dice, 'dot7');
    } else if (number === 6) {
        addDot(dice, 'dot2');
        addDot(dice, 'dot3');
        addDot(dice, 'dot1');
        addDot(dice, 'dot5');
        addDot(dice, 'dot6');
        addDot(dice, 'dot7');
    }
}
const game = new YatzyGame();

document.getElementById('rollButton').addEventListener('click', function() {
    if (game.rollNumber < 3) {
        let newDiceValues = [];
        for (let i = 0; i < 5; i++) {
            newDiceValues.push(Math.floor(Math.random() * 6) + 1);
        }
        game.updateDiceValues(newDiceValues);

        for (let i = 1; i <= 5; i++) {
            let dice = document.getElementById('dice' + i);
            showDiceNumber(dice, game.diceValues[i - 1]);
        }

        console.log(game.getState()); 
    } else {
        console.log("No more rolls left in this turn.");
    }
});

function toggleKeep(index) {
    game.toggleKeepDice(index);
    const dice = document.getElementById('dice' + (index + 1));
    if (game.keepDice[index]) {
        dice.classList.add('kept');
    } else {
        dice.classList.remove('kept');
    }
    console.log(game.getState());
}

for (let i = 0; i < 5; i++) {
    const dice = document.getElementById('dice' + (i + 1));
    dice.addEventListener('click', function() {
        toggleKeep(i);
    });
}
function startNewTurn() {
    game.newTurn();
    for (let i = 1; i <= 5; i++) {
        let dice = document.getElementById('dice' + i);
        clearDots(dice);
        showDiceNumber(dice, game.diceValues[i - 1]);
        dice.classList.remove('kept'); 
    }
    console.log("New turn started:", game.getState());
}