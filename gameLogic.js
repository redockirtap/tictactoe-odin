const Players = (name, marker) => {
    const player = name || 'John Doe';
    // const marker = marker || null;
    return {player, marker};
};

const gameBoard = (() => {
    const _board = [null, null, null, null, null, null, null, null, null];
    let currentMovesX = [];
    let currentMovesO = [];   

    const getBoard = () => [..._board];
    const addMarker = (position, marker) => {_board[position] = marker, console.log(_board)};
    const isDraw = () => _board.every((cell) => cell !== null);
    const isWin = (player1, player2, marker, position) => {
        const winConditionsHorizontal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const winConditionsVertical = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const winConditionsDiagonal = [[2, 4, 6], [0, 4, 8]];
        const AllCombos = winConditionsHorizontal.concat(winConditionsVertical, winConditionsDiagonal); // concat all winning combos
        // const winCount = []; 
        marker === player1.marker ? currentMovesX.push(position) : currentMovesO.push(position); //where to push marker
        if (AllCombos.some(combo => combo.every(cell => currentMovesX.includes(cell)))
        || AllCombos.some(combo => combo.every(cell => currentMovesO.includes(cell)))) {
            currentMovesX = [];
            currentMovesO = [];
            console.log('yoo')
            return true;
        }
        return false;
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
        counter % 2 === 0 ? currentMarker = player1.marker : currentMarker = player2.marker;
        counter++;
        return currentMarker;
    }

    const checkForDraw = () => gameBoard.isDraw() ? gameBoard.cleanBoard() && displayControl.cleanBoard() : false;
    const checkForWin = (player1, player2, marker, position) => gameBoard.isWin(player1, player2, marker, position) ? gameBoard.cleanBoard() && displayControl.cleanBoard() : false;
    const checkForBusy = (position) => gameBoard.isBusy(position) ? true : false;
    const addMarkerHandler = (e, position=Number(e.target.className.at(-1)), marker=changeTurn(position)) => {
        if (checkForBusy(position)) return; // check if cell is busy
        gameBoard.addMarker(position, marker); // store marker to the board array
        displayControl.showMarker(e, marker); // display the marker on the screen
        if (checkForWin(player1, player2, marker, position)) return; // check if there is a win
        if (checkForDraw()) return; // check if the game is over due to draw
    };
    return {choosePlayerHandler, checkForDraw, checkForWin, checkForBusy, addMarkerHandler};
})(Players, gameBoard, displayControl);

const eventListenerz =(() => {
    const buttons = document.querySelector('.buttonz');
    const cells = document.querySelector('.board');

    buttons.addEventListener('click', gameFlowLogic.choosePlayerHandler);
    cells.addEventListener('click', gameFlowLogic.addMarkerHandler);
})();


// marker === player1.marker ? currentMarker = player1.marker : currentMarker = player2.marker;
        // let winCombo = a;
        // let winArr = _board.filter()
        // winConditionsHorizontal.forEach(array => array.every((position, index) => position === currentMovesX[index]))
        // winConditionsHorizontal.forEach(array => console.log(!array.some((position, index) => position === currentMovesX[index])))
        // console.log(currentMovesX.filter((position, index) => winConditionsHorizontal[index].flat() === position))

        // const combo2 = [[_board[0], _board[3], _board[6]], [_board[1], _board[4], _board[7]], [_board[2], _board[5], _board[8]]]
        // const combo3 = [_board[2], _board[4], _board[6]]
        // const combo4 = [_board[0], _board[4], _board[8]]

        // if (_board[0] === marker && _board[1] === marker && _board[2] === marker 
        //     || _board[3] === marker && _board[4] === marker && _board[5] === marker
        //     || _board[6] === marker && _board[7] === marker && _board[8] === marker) {
                
        //         return true
        //     };
        // if (_board[0] === marker && _board[3] === marker && _board[6] === marker 
        //     || _board[1] === marker && _board[4] === marker && _board[7] === marker
        //     || _board[2] === marker && _board[5] === marker && _board[8] === marker) return true;
        // if (_board[2] === marker && _board[4] === marker && _board[6] === marker) return true;
        // if (_board[0] === marker && _board[4] === marker && _board[8] === marker) return true;







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