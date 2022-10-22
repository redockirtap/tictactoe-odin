const Players = (name) => {
    const player = name || 'John Doe';
    // const marker = 'hi' || document.querySelector(`.cells.board-cell-${$}`);
    const gameStat = []; // to add wins and loses
    return {player, gameStat};
}

const gameBoard = (() => {
    const _board = ['x', 'x', 'o', 'o', null, 'o', 'x', 'o', 'o'];

    const _addMarker = (e) => { // adds marker to the board, if it is available
        if (e.target === e.currentTarget) return;
        const chosenCell = e.target;
        console.log(chosenCell);
    }


    const _isOver = () => { // checks if game is finished after each step
        if (!_board.includes(null)) return;
        console.log(gameBoard._board);
    }

    return {_board, _addMarker, _isOver};
})();

const displayController = (() => {
    console.log('hi');
})();

const _gameFlow = (() => {
    const _button = document.querySelector('.buttonz');
    const _cells = document.querySelector('.board');

    const _choosePlayer = function (e) { // choose player vs player or player vs AI
        const chosenPlayer = e.target || 'Johnny'; // select player buttons
        console.log('choosing game mode...')
        if (chosenPlayer.textContent === 'play') return; // OR if button play game is clicked
        const player1 = Players(chosenPlayer.textContent);
        // same logic for second player
        return {player1} // return players to parent scope
    };

    

    _button.addEventListener('click', _choosePlayer);
    _cells.addEventListener('click', gameBoard._addMarker);
    // _addMarker();

    return {player1};
})();

