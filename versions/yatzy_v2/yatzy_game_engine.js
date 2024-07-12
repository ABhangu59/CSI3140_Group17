function calculateScore(game, scoreBox) {
    const counts = Array(6).fill(0);
    game.diceValues.forEach(value => {
        counts[value - 1]++;
    });

    switch (scoreBox) {
        case 'ones':
            return counts[0] * 1;
        case 'twos':
            return counts[1] * 2;
        case 'threes':
            return counts[2] * 3;
        case 'fours':
            return counts[3] * 4;
        case 'fives':
            return counts[4] * 5;
        case 'sixes':
            return counts[5] * 6;
        case 'threeOfAKind':
            for (let i = 0; i < 6; i++) {
                if (counts[i] >= 3){
                    console.log('yes')
                    return game.diceValues.reduce((a, b) => a + b, 0);
                } 
            }
            return 0;
        case 'fourOfAKind':
            for (let i = 0; i < 6; i++) {
                if (counts[i] >= 4){
                    return game.diceValues.reduce((a, b) => a + b, 0);
                } 
            }
            return 0;
        case 'fullHouse':
            if (counts.includes(3) && counts.includes(2)){ 
                return 25;
            }
            return 0;
        case 'smallStraight':
            if ((counts[0] && counts[1] && counts[2] && counts[3]) || 
                (counts[1] && counts[2] && counts[3] && counts[4]) || 
                (counts[2] && counts[3] && counts[4] && counts[5])) {
                    return 30;
                }
            return 0;
        case 'largeStraight':
            if ((counts[0] && counts[1] && counts[2] && counts[3] && counts[4]) || 
                (counts[1] && counts[2] && counts[3] && counts[4] && counts[5])) {
                    return 40;
                }
            return 0;
        case 'yahtzee':
            if (counts.includes(5)) {
                return 50;
            }
            return 0;
        case 'chance':
            return game.diceValues.reduce((a, b) => a + b, 0);
        default:
            console.log("Invalid score box.");
            return 0;
    }
}

function updateOverallScore(scores) {
    let upperSectionScore = 0;
    let overallScore = 0;

    for (let box in scores) {
        const score = scores[box];
        if (['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(box)) {
            upperSectionScore += score;
        }
        overallScore += score;
    }

    const bonus = upperSectionScore >= 63 ? 35 : 0;
    overallScore += bonus;

    return {
        overallScore: overallScore,
        bonus: bonus
    };
}
