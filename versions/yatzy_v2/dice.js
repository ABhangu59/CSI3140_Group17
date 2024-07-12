document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('rollButton').addEventListener('click', () => {
        fetch('./yatzy_server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'rollDice' })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            updateGameState(data);
        })
    });

    // Initial fetch to get the game state when the page loads
    // fetch('./yatzy_server.php')
    //     .then(response => {
    //         console.log('Initial fetch response status:', response.status);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Initial fetch response data:', data);
    //         updateGameState(data);
    //     })
    //     .catch(error => console.error('Error:', error));
});

function updateGameState(data) {
    console.log('Updating game state:', data);
}