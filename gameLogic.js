const Players = (name) => {
    const player = name || 'John Doe';
    const gameStat = []; // to add wins and loses
    return {player, gameStat};
}

const gameBoard = (() => {
    const _board = [null, null, null, null, null, null, null, null, null];
    return {_board};
})();

const displayControl = (() => {
    console.log('hi');
})();

const _gameFlow = (() => {
    const _button = document.querySelector('.buttonz');
    const _cells = document.querySelector('.board');

    const _choosePlayer = function (e) { // choose player vs player or player vs AI
        const chosenPlayer = e.target || null; // select player buttons
        console.log('choosing game mode...')
        if (chosenPlayer === null || chosenPlayer.className === 'play') return; // OR if button play game is clicked
        const player1 = Players('user');
        const player2 = Players(chosenPlayer.textContent);
        console.log(player1, player2);
    };

    const _addMarker = (e) => { // adds marker to the board, if it is available
        const chosenCell = e.target;
        const cellIndex = Number(chosenCell.className.at(-1));
        if (chosenCell === e.currentTarget) return;
        if (chosenCell.textContent) return;
        gameBoard._board[cellIndex] = 'x';
        chosenCell.textContent = 'x';
        console.log(chosenCell, gameBoard._board);
    }

    const _isOver = () => { // checks if game is finished after each step
        if (!_board.includes(null)) return;
        console.log(gameBoard._board);
    }

    _button.addEventListener('click', _choosePlayer);
    _cells.addEventListener('click', _addMarker);
})();
