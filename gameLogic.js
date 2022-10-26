const Players = (name, marker) => {
    const player = name || 'John Doe';
    // const marker = marker || null;
    return {player, marker};
}

const gameBoard = (() => {
    const _board = [null, null, null, null, null, null, null, null, null];

    const getBoard = () => [..._board];
    const addMarker = (position, marker) => {_board[position] = marker, console.log(_board)};
    const isDraw = () => _board.every((cell) => cell !== null);
    const isWin = (marker) => {
        if (_board[0] === marker && _board[1] === marker && _board[2] === marker 
            || _board[3] === marker && _board[4] === marker && _board[5] === marker
            || _board[6] === marker && _board[7] === marker && _board[8] === marker) return true;
        if (_board[0] === marker && _board[3] === marker && _board[6] === marker 
            || _board[1] === marker && _board[4] === marker && _board[7] === marker
            || _board[2] === marker && _board[5] === marker && _board[8] === marker) return true;
        if (_board[2] === marker && _board[4] === marker && _board[6] === marker) return true;
        if (_board[0] === marker && _board[4] === marker && _board[8] === marker) return true;
        };
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
    let player1; // initialize players 
    let player2;
    let counter = 0; // counter for player turns
    const gameStat = []; // to add wins and loses

    const choosePlayerHandler = function (e) { // choose player vs player or player vs AI
        const chosenPlayer = e.target || null; // select player buttons
        console.log('choosing game mode...')
        if (chosenPlayer === null || chosenPlayer.className === 'play') return; // OR if button play game is clicked
        // const player1 = Players('user', 'x');
        // const player2 = Players(chosenPlayer.textContent, 'o');
        player1 = Players('user', 'x');
        player2 = Players(chosenPlayer.textContent, 'o');
        console.log(player1, player2);
        // return {player1, player2}
    };

    const changeTurn = (position) => {
        if (checkForBusy(position)) return;
        let currentMarker; 
        console.log(counter % 2 === 0);
        counter % 2 === 0 ? currentMarker = player1.marker : currentMarker = player2.marker;
        counter++;
        return currentMarker;
    }

    const checkForDraw = () => gameBoard.isDraw() ? gameBoard.cleanBoard() && displayControl.cleanBoard() : false;
    const checkForWin = (marker) => gameBoard.isWin(marker) ? gameBoard.cleanBoard() && displayControl.cleanBoard() : false;
    const checkForBusy = (position) => gameBoard.isBusy(position) ? true : false;
    const addMarker = (e, position=Number(e.target.className.at(-1)), marker=changeTurn(position)) => {
        if (checkForBusy(position)) return;
        gameBoard.addMarker(position, marker);
        displayControl.showMarker(e, marker);
        if (checkForWin(marker)) return;
        if (checkForDraw()) return;
    };
    return {choosePlayerHandler, checkForDraw, checkForWin, checkForBusy, addMarker};
})(Players, gameBoard, displayControl);

const eventListenerz =(() => {
    const buttons = document.querySelector('.buttonz');
    const cells = document.querySelector('.board');

    buttons.addEventListener('click', gameFlowLogic.choosePlayerHandler);
    cells.addEventListener('click', gameFlowLogic.addMarker);
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

// const cleanBoard = () => {
    //     console.log('hi')
    //     // if (!checkForWin(marker)) return;
    //     // // if (!checkForDraw()) return;
    //     // gameBoard.cleanBoard();
    //     // displayControl.cleanBoard();
    // }