class YatzyGame {
    constructor() {
        this.rollNumber = 0; 
        this.diceValues = [1, 1, 1, 1, 1];
        this.keepDice = [false, false, false, false, false]; 
    }

    rollDice() {
        if (this.rollNumber < 3) {
            for (let i = 0; i < 5; i++) {
                if (!this.keepDice[i]) {
                    this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
                }
            }
            this.rollNumber++;
        } else {
            console.log("No more rolls left in this turn.");
        }
    }

    toggleKeepDice(index) {
        if (index >= 0 && index < 5) {
            this.keepDice[index] = !this.keepDice[index];
        } else {
            console.log("Invalid dice index.");
        }
    }

    newTurn() {
        this.rollNumber = 0;
        this.diceValues = [1, 1, 1, 1, 1];
        this.keepDice = [false, false, false, false, false];
    }

    getState() {
        return {
            rollNumber: this.rollNumber,
            diceValues: this.diceValues,
            keepDice: this.keepDice
        };
    }
}
window.YatzyGame = YatzyGame;