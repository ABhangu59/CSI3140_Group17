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
let rollsLeft = 3;
let rollsDone = 1;

function updateRollsLeftText() {
    const rollContainer = document.querySelector('.rollsLeft');
    rollContainer.textContent = `Rolls left: ${rollsLeft}`;
}
function updateScoreBoard(overallScore, bonus){
    const scoreContainer = document.querySelector('.scorelist');
    var scoreRecord = document.createElement('div');
    scoreRecord.textContent = `Roll: ${rollsDone} Overall Score: ${overallScore}, Bonus: ${bonus}`
    scoreContainer.appendChild(scoreRecord);
}

document.getElementById('rollButton').addEventListener('click', function() {
    if (game.rollNumber < 3) {
        game.rollDice();

        for (let i = 1; i <= 5; i++) {
            let dice = document.getElementById('dice' + i);
            showDiceNumber(dice, game.diceValues[i - 1]);
        }

        console.log(game.getState());
        calculateAndUpdateScores();
        rollsLeft--;
        rollsDone++;
        updateRollsLeftText();
    } else {
        console.log("No more rolls left in this turn.");
    }
});

for (let i = 0; i < 5; i++) {
    const dice = document.getElementById('dice' + (i + 1));
    dice.addEventListener('click', function() {
        game.toggleKeepDice(i);
        if (game.keepDice[i]) {
            dice.classList.add('kept');
        } else {
            dice.classList.remove('kept');
        }
        console.log(game.getState());
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

function calculateAndUpdateScores() {
    const selectedScoreBox = 'ones'; // This can be dynamically set based on user selection
    const score = calculateScore(game, selectedScoreBox);
    console.log(`Score for ${selectedScoreBox}:`, score);

    const scores = {
        ones: calculateScore(game, 'ones'),
        twos: calculateScore(game, 'twos'),
        threes: calculateScore(game, 'threes'),
        fours: calculateScore(game, 'fours'),
        fives: calculateScore(game, 'fives'),
        sixes: calculateScore(game, 'sixes'),
        threeOfAKind: calculateScore(game, 'threeOfAKind'),
        fourOfAKind: calculateScore(game, 'fourOfAKind'),
        fullHouse: calculateScore(game, 'fullHouse'),
        smallStraight: calculateScore(game, 'smallStraight'),
        largeStraight: calculateScore(game, 'largeStraight'),
        yahtzee: calculateScore(game, 'yahtzee'),
        chance: calculateScore(game, 'chance')
    };

    const { overallScore, bonus } = updateOverallScore(scores);
    console.log(`Overall Score: ${overallScore}, Bonus: ${bonus}`);
    updateScoreBoard(overallScore, bonus)
}