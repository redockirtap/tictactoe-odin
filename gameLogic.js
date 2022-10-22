const gameFlow = (() => {
    const button = document.querySelector('button[class="me"]');
    console.log(button)
    const Players = (name) => {
        const player = name || 'John Doe';
        const marker = 'hi' || document.querySelector(`.cells.board-cell-${$}`);


        const sayHello = function () {
            console.log("hi")
        }
        return {player, marker, sayHello};
    }

    const gameBoard = (() => {
        const _board = ['x', 'x', 'o', 'o', 'x', 'o', 'x', 'o', 'o'];

        const addMarker = (marker) => {
            console.log(marker)
        }
    })();

    const displayController = (() => {
        console.log('hi');
    })();


    const _choosePlayer = function () { // choose player vs player or player vs AI
        console.log('choosing game mode...')
        // if (player1 && player2) return; // OR if button play game is clicked
        const chosenPlayer = 'Johnny' || document.querySelector('button'); // select player buttons
        player1 = Players(chosenPlayer);
        // same logic for second player
        return {player1} // return players to parent scope
    };

    const _isOver = () => { // checks if game is finished after each step
        console.log('checking if game is over')
    }

    const _addMarker = () => { // adds marker to the board, if it is available
        console.log('adding a marker')
    }


    button.addEventListener('click', _choosePlayer);
    // player1.sayHello();

})();
    
