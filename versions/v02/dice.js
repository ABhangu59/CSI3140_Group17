var highestScores = new Array(10);
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
                var rollerBox = document.getElementById('rollLeftText');
                rollerBox.textContent = `Rolls Left: 0`; // Update text content
            }
            else {
                var rollerBox = document.getElementById('rollLeftText');
                rollerBox.textContent = `Rolls Left: ${rolls}`; // Update text content
            }
        })
    });

    var dices = document.getElementsByClassName('dice')
    console.log(dices.item(0))
    console.log(typeof dices)

    for(let i = 0; i < 5; i++){
        dices.item(i).addEventListener('click', () => {
            fetch('./yatzy_server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'keepDice', index: i})
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
            })

            dices.item(i).style.outline = '2px solid red';            
        })
    }

    fetch('./yatzy_server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'start_game'})
    })
    .then(response => response.json())
    .then(data => {
        updateGameState(data);
    })

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
    console.log(data.game.score.total);

    
    var containsNull = highestScores.every(function(v) {return v=== null})

    if(containsNull){
        highestScores.push(data.game.score.total)
        highestScores.sort()
        console.log(highestScores);
    }
    else if (highestScores[0] < data.game.score.total){
        highestScores.push(data.game.score.total)
        highestScores.sort((a, b) => b - a);        
        console.log(highestScores);
    }
    console.log(highestScores);


    data.game.diceValues.forEach(
        function(value, index){
            let dice = document.getElementById('dice' + (index+1));
            showDiceNumber(dice,value);
        }
    )



    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = '';
    // Create and append list items for each score in highestScores

     highestScores.forEach(function(score) {
        if(score !== 0) {
            const listItem = document.createElement('li');
        listItem.textContent = score;
        leaderboard.appendChild(listItem);
        }
    }); 
    
    
}