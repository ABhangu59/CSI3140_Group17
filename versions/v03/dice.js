var highestScores = new Array();
highestScores.push({name: "Tolu", score: 270},{name: "Ali", score: 254})
console.log(highestScores);

document.addEventListener('DOMContentLoaded', () => {
    var rollsLeftText = document.querySelector('.rollsLeft').textContent;
    var rolls = parseInt(rollsLeftText.slice(-1));
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

            if (rolls == 0) {
                document.getElementById('rollButton').disabled = true;
                var rollerBox = document.getElementById('rollLeftText');
                rollerBox.textContent = `Rolls Left: 0`;
            } else {
                var rollerBox = document.getElementById('rollLeftText');
                rollerBox.textContent = `Rolls Left: ${rolls}`;
            }
        });
    });

    highestScores.push({name: 'Mustafa', score: 230 }, {name: 'Aydin', score: '210'})
    var dices = document.getElementsByClassName('dice');
    console.log(dices.item(0));
    console.log(typeof dices);
    highestScores.push({name: 'Justin', score: 240 }, {name: 'Erik', score: '100'}, {name: 'Kalonji', score: 87})

    for (let i = 0; i < 5; i++) {
        dices.item(i).addEventListener('click', () => {
            fetch('./yatzy_server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'keepDice', index: i })
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
            });

            dices.item(i).style.outline = '2px solid red';
        });
    }

    fetch('./yatzy_server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'start_game' })
    })
    .then(response => response.json())
    .then(data => {
        updateGameState(data);
    });

    // document.getElementById('saveScoreButton').addEventListener('click', () => {
    //     const playerName = document.getElementById('playerNameInput').value;
    //     fetch('./yatzy_server.php', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ action: 'save_score', player_name: playerName, score: getCurrentScore() })
    //     })
    //     .then(response => {
    //         console.log('Response status:', response.status);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Score saved:', data);
    //         updateLeaderboard();
    //     });
    // });

    // updateLeaderboard();
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

    if (!data.game) {
        console.error('Game data is not available.');
        return;
    }

    const currentScore = data.game.score.total;
    const playerName = document.getElementById('playerNameInput').value;
    console.log({name: playerName, score: currentScore})
    highestScores.push({name: playerName, score: currentScore})
    highestScores.sort((a, b) => b.score - a.score).splice(10);

    data.game.diceValues.forEach((value, index) => {
        let dice = document.getElementById('dice' + (index + 1));
        showDiceNumber(dice, value);
    });
 
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML ='';
    highestScores.forEach(score => {
        if (score !== null) {
            const listItem = document.createElement('li');
            listItem.textContent = `${score.name} : ${score.score}`;
            leaderboard.appendChild(listItem);
        }
    });

    console.log(highestScores)
}

function getCurrentScore() {
    return highestScores[0]; // Replace with actual current score if different
}
