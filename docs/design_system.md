# CSI3140 - Yatzy Design System

This document outlines the design choices that were made in the development of A&T's Yatzy, which will include a brief discussion on the different components of the UI and the code. 

> Developed by **Tolu Emoruwa & Ali Bhangu**

## Overview: 
Welcome to A&T's Yatzy, in our version of this game, you have 3 total rolls, one inital roll and two re-rolls. You can select from amongst the dice and keep the selected ones. 

<picture>
    <img src="../docs/assets/design_system//yatzy-dice.png">
</picture>

## Structural Component Breakdown 

### HTML  & CSS
Within our HTML file we display our 'game board', the 5 slots for our dice. The html page is coded to adapt to the 5 dice containers. It also has a write up defining the rules of the game for our player. There are also buttons and a header that we followed through from our portfolio site, which are used to return to the previous page or to then play the game. 

We have our header and the game section, we did not include an footer for our yatzy game as we felt it was redundant. 

- **Primary Font:** 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;


#### Header
Our header used is the same one we utilized in our assignment 1, to keep thematic consistencies especially after implementing the game within our projects of the portfolio. 

![Header](../docs/assets/design_system/header.png) 

##### Header Colors: 
- **Primary Colour:** #333 - Black 
- **Border Colour:** #77a0a2 - Weldon Blue

---

#### Game Board 
![GameBoard](/docs/assets/design_system/yatzy-game-board.png)


##### Colours
- **Primary Colour:** Azureish White
- **Primary Colour Hex Code:** #DAF6EA
- **Primary Color Usage:** Background Colour 

- **Roll Button Colour:** Green
- **Roll Button Colour Hex Code:** #37b33d
- **Roll Button Colour Usage :** Button used for rolling the Dice 

- **Back Button Colour:** Blue
- **Back Button Colour Hex Code:** #3089f5
- **Back Button Colour Usage :** Button used for the back button 

- **Accent Colour:** Orange - Red
- **Accent Colour Hex Code:** FF4500
- **Accent Colour Usage:** Used to highlight the borders of selected die

These colors are used because they appeal to the viewers eyes. We used complimenting colors to utilize color theory to help the flow of our website. 

---

### JavaScript

Our JavaScript implementation for A&T's Yatzy manages the core game logic, including dice rolls, score calculations, and UI interactions. Below is a summary of the main components and their functionalities:

#### 1. YatzyGame Class
- **Purpose:** Manages the state of the game, including the number of rolls, dice values, and which dice are kept.
- **Key Methods:**
  - `rollDice()`: Rolls the dice, allowing up to three rolls per turn.
  - `toggleKeepDice(index)`: Toggles whether a specific die is kept.
  - `newTurn()`: Resets the game state for a new turn.
  - `getState()`: Returns the current state of the game.

#### 2. Score Calculation Functions
- **Purpose:** Calculates scores based on the current dice values and the selected score category.
- **Key Functions:**
  - `calculateScore(game, scoreBox)`: Calculates the score for a specific category (e.g., ones, twos, full house).
  - `updateOverallScore(scores)`: Calculates the overall score, including any bonus points.

#### 3. UI Interaction and Updates
- **Purpose:** Manages the visual representation of the dice and updates the UI based on user interactions.
- **Key Functions:**
  - `showDiceNumber(dice, number)`: Displays the appropriate dots on a die based on its value.
  - `updateRollsLeftText()`: Updates the text indicating the number of rolls left.
  - `updateScoreBoard(overallScore, bonus)`: Updates the score display with the current overall score and any bonus points.

#### Event Listeners
- **Roll Button:** Handles dice rolls and updates the UI accordingly.
- **Dice Click:** Toggles the 'kept' status of a die when clicked, visually indicating which dice are held.

This structure ensures the game logic is well-organized and the UI is responsive to user interactions, providing an engaging and intuitive gameplay experience. Feel free to take a look at the JavaScript files in the yatzy folder. 
