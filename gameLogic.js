const Players = (name, marker) => {
    const player = name || 'John Doe';
    // const marker = marker || null;
    const gameStat = []; // to add wins and loses
    return {player, gameStat, marker};
}

const gameBoard = (() => {
    const _board = [null, null, null, null, null, null, null, null, null];

    const getBoard = () => [..._board];
    const addMarker = (position, marker) => {_board[position] = marker, console.log(_board)};
    const isDraw = () => _board.every((cell) => cell !== null);
    const isWin = (marker) => {console.log("is Win?")};
    const isBusy = (position) => _board[position] !== null;
    const cleanBoard = () => _board.fill(null);
    
    return {getBoard, addMarker, isDraw, isWin, isBusy, cleanBoard};
})();

const displayControl = (() => {

    const showMarker = (e, marker) => {
        const chosenCell = e.target
        chosenCell.textContent = marker;
    }
    const cleanBoard = () => {
        const display = document.querySelectorAll('.cells');
        for (let i = 0; i < 9; i++) {
            display[i].textContent = '';
        }
    }
    return {showMarker, cleanBoard};
})();

const gameFlowLogic = (() => {
    const choosePlayer = function (e) { // choose player vs player or player vs AI
        const chosenPlayer = e.target || null; // select player buttons
        console.log('choosing game mode...')
        if (chosenPlayer === null || chosenPlayer.className === 'play') return; // OR if button play game is clicked
        const player1 = Players('user', 'x');
        const player2 = Players(chosenPlayer.textContent, 'o');
        console.log(player1, player2);
        return {player1, player2}
    };
    const checkForDraw = () => gameBoard.isDraw() ? gameBoard.cleanBoard() : false;
    const checkForWin = () => gameBoard.isWin() ? gameBoard.cleanBoard() : false;
    const checkForBusy = (position) => gameBoard.isBusy(position) ? true : false;
    const addMarker = (e, position=Number(e.target.className.at(-1)), marker='x') => {
        if (checkForBusy(position)) return;
        if (checkForWin()) return;
        if (checkForDraw()) return;
        gameBoard.addMarker(position, marker);
        displayControl.showMarker(e, marker)
    };
    const cleanBoard = () => {
        // if (!checkForWin()) return;
        if (!checkForDraw()) return;
        gameBoard.cleanBoard();
        displayControl.cleanBoard();
    }
    return {choosePlayer, checkForDraw, checkForWin, checkForBusy, addMarker, cleanBoard};
})(Players, gameBoard, displayControl);

const eventListenerz =(() => {
    const buttons = document.querySelector('.buttonz');
    const cells = document.querySelector('.board');

    buttons.addEventListener('click', gameFlowLogic.choosePlayer);
    cells.addEventListener('click', gameFlowLogic.addMarker);
    cells.addEventListener('click', gameFlowLogic.cleanBoard);
})();




// const _isOver = () => { // checks if game is finished after each step
//     if (!_board.includes(null)) return;
//     console.log(gameBoard._board);
// }


// const _addMarker = (e) => { // adds marker to the board, if it is available
//     const chosenCell = e.target;
//     const cellIndex = Number(chosenCell.className.at(-1));
//     if (chosenCell === e.currentTarget) return;
//     if (gameBoard.getBoard()[cellIndex] !== null) return;
//     gameBoard.getBoard()[cellIndex] = 'x';
//     chosenCell.textContent = 'x';
//     console.log(gameBoard.getBoard())
// }