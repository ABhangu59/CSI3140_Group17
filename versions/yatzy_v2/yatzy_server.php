<?php 

session_start();

class YatzyGame {
    public $rollNumber;
    public $score;
    public $keepDice; 
    public $diceValues; 

    public $scoreValues; 


    
    public function __construct(){
        $this->rollNumber = 0;
        $this->diceValues = [1, 1, 1, 1, 1];
        $this->score = [
            'ones' => 0, 'twos' => 0, 'threes' => 0, 'fours' => 0, 'fives' => 0, 'sixes' => 0,
            'threeOfAKind' => 0, 'fourOfAKind' => 0, 'fullHouse' => 0,
            'smallStraight' => 0, 'largeStraight' => 0, 'yahtzee' => 0,'total' => 0
        ];
        $this->keepDice = [false, false, false, false, false];
        $this->scoreValues = [];
    }


    public function rollDice() {
        if ($this->rollNumber < 3) {
            for($i = 0; $i < 5; $i++ ) {
                if(!$this -> keepDice[$i]) {
                    $this -> diceValues[$i] = rand(1,6);
                }
            }
            $this->rollNumber++;
            $this->calculateScore();
        }   
        
        else {
            echo '<script>console.log("No more rolls left in this turn.");</script>';
        }

    }

    public function toggleKeepDice($index){
        if($index >= 0 && $index < 5){
            $this->keepDice[$index] = !$this->keepDice[$index];
        }
        else{
            echo '<script>console.log("Invalid Dice Index.")</script>';
        }
    }

    public function newTurn(){
        $this->rollNumber = 0;
        $this->diceValues = [1, 1, 1, 1, 1];
        $this->keepDice = [false, false, false, false, false];
    }

    
    public function calculateScore(){
        // foreach($this->diceValues as $value){
            
        // }
        $counts = array_count_values($this->diceValues);
        $this->score['ones'] = $counts[1] ?? 0;
        $this->score['twos'] = ($counts[2] ?? 0) * 2;
        $this->score['threes'] = ($counts[3] ?? 0) * 3;
        $this->score['fours'] = ($counts[4] ?? 0) * 4;
        $this->score['fives'] = ($counts[5] ?? 0) * 5;
        $this->score['sixes'] = ($counts[6] ?? 0) * 6;
        $this->score['threeOfAKind'] = in_array(3, $counts) ? array_sum($this->diceValues) : 0;
        $this->score['fourOfAKind'] = in_array(4, $counts) ? array_sum($this->diceValues) : 0;
        $this->score['fullHouse'] = in_array(3, $counts) && in_array(2, $counts) ? 25 : 0;
        $this->score['smallStraight'] = (count(array_intersect([1, 2, 3, 4], $this->diceValues)) == 4 || count(array_intersect([2, 3, 4, 5], $this->diceValues)) == 4 || count(array_intersect([3, 4, 5, 6], $this->diceValues)) == 4) ? 30 : 0;
        $this->score['largeStraight'] = (count(array_intersect([1, 2, 3, 4, 5], $this->diceValues)) == 5 || count(array_intersect([2, 3, 4, 5, 6], $this->diceValues)) == 5) ? 40 : 0;
        $this->score['yatzy'] = in_array(5, $counts) ? 50 : 0;
        $this->score['total'] = array_sum($this->score);
    }

    public function addScore($score) {
        array_push($this->scoreValues, $score);
        // Keep only top 10 scores for example
        arsort($this->scoreValues);
        $this->scoreValues = array_slice($this->scoreValues, 0, 10);
    }

}


if (!isset($_SESSION['game'])) {
    $_SESSION['game'] = new YatzyGame();
}

$game = $_SESSION['game'];

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data['action'] === 'start_game') {
        $game = new YatzyGame();
        $_SESSION['game'] = $game;
    } elseif ($data['action'] == 'rollDice' && $data['timesLeft'] > 0) {
        $game->rollDice();
    } elseif ($data['action'] == 'keepDice'){
        $game->toggleKeepDice($data['index']);
    }

    echo json_encode(['game' => $game]);
    exit;
}

echo json_encode(['message' => 'Invalid request method']);

?> 