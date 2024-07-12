document.addEventListener('DOMContentLoaded', () => {

    var rollsLeftText = document.querySelector('.rollsLeft').textContent;
    var rolls = parseInt(rollsLeftText.slice(-1))
    console.log(rolls);

    document.getElementById('rollButton').addEventListener('click', () => {
        fetch('./yatzy_server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'rollDice', timesLeft: rolls })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            updateGameState(data);
            rolls--;

            if(rolls == 0) {
               document.getElementById('rollButton').disabled = true;
            }
        })
    });

});
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
function updateGameState(data) {
    console.log('Updating game state:', data);
    data.game.diceValues.forEach(
        function(value, index){
            let dice = document.getElementById('dice' + (index+1));
            showDiceNumber(dice,value);
        }
    )
    
}