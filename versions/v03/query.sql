CREATE DATABASE yatzy;

USE yatzy;

CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    score INT NOT NULL
);

INSERT INTO leaderboard (player_name, score) VALUES
    ('Tolu', 270),
    ('Ali', 250,),
    ('Justin', 240),
    ('Mustafa', 230),
    ('Aydin', 210),
    ('Erik', 100,),
    ('Kalonji', 87,),
    ('Drake', 69,),
    ('Kendrick', 55,),
    ('Tupac', 50,);
