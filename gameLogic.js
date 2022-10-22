const gameFlow = (() => {
    const Players = (name) => {
        const player = name || 'John Doe';
        // const marker = 'hi' || document.querySelector(`.cells.board-cell-${$}`);
        const gameStat = []; // to add wins and loses


        const sayHello = function () {
            console.log("hi")
        }
        return {player, gameStat, sayHello};
    }

    const gameBoard = (() => {
        const _board = ['x', 'x', 'o', 'o', null, 'o', 'x', 'o', 'o'];

        const addMarker = (marker) => {
            console.log(marker)
        }

        return {_board};
    })();

    const displayController = (() => {
        console.log('hi');
    })();


    const _choosePlayer = function (e) { // choose player vs player or player vs AI
        const chosenPlayer = e.target || 'Johnny'; // select player buttons
        console.log('choosing game mode...')
        if (chosenPlayer.textContent === 'play') return; // OR if button play game is clicked
        player1 = Players(chosenPlayer.textContent);
        // same logic for second player
        return {player1} // return players to parent scope
    };

    const _isOver = () => { // checks if game is finished after each step
        if (!gameBoard._board.includes(null)) return;
        console.log(gameBoard._board);
    }

    const _addMarker = (e) => { // adds marker to the board, if it is available
        if (e.target === e.currentTarget) return;
        const chosenCell = e.target;
        console.log(chosenCell);
    }

    const _gameFlowLogic = () => {
        const button = document.querySelector('.buttonz');
        const cells = document.querySelector('.board');

        button.addEventListener('click', _choosePlayer);
        cells.addEventListener('click', _addMarker);
        // _addMarker();
    }

    _gameFlowLogic();
})();
    
