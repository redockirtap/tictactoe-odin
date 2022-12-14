const Players = (name, marker) => {
    const player = name || 'John Doe';
    return {player, marker};
};
//  test
const gameBoard = (() => {
    const _board = [null, null, null, null, null, null, null, null, null];
    let currentMovesX = [];
    let currentMovesO = [];

    const getBoard = () => [..._board];
    const addMarker = (position, marker) => {_board[position] = marker};
    const isBusy = (position) => _board[position] !== null;
    const isDraw = () => _board.every((cell) => cell !== null);

    const isWin = (player1, marker, position) => {
        const winConditionsHorizontal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const winConditionsVertical = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const winConditionsDiagonal = [[2, 4, 6], [0, 4, 8]];
        const AllCombos = winConditionsHorizontal.concat(winConditionsVertical, winConditionsDiagonal); // concat all winning combos
        marker === player1.marker ? currentMovesX.push(position) : currentMovesO.push(position); //where to push marker
        if (AllCombos.some(combo => combo.every(cell => currentMovesX.includes(cell)))
        || AllCombos.some(combo => combo.every(cell => currentMovesO.includes(cell)))) {
            console.log(`${marker} won`);
            return true;
        }
        return false;
    };

    const cleanBoard = () => {
        currentMovesX = [];
        currentMovesO = [];
        return _board.fill(null);
    }
    
    return {getBoard, addMarker, isDraw, isWin, isBusy, cleanBoard};
})();

const displayControl = (() => {
    
    const showMarker = (e, marker) => {
        const chosenCell = e.target;
        chosenCell.textContent = marker;
    }
    const cleanBoard = () => {
        const display = document.querySelectorAll('.cells');
        for (let i = 0; i < 9; i++) {
            display[i].textContent = '';
        }
    }
    const hideMenu = () => {
        const menu = document.querySelector('dialog');
        const board = document.querySelector('main');
        menu.style.display = "none";
        board.style.display = "flex";
    }

    const showMenu = () => {
        const menu = document.querySelector('dialog');
        const board = document.querySelector('main');
        menu.style.display = "flex";
        board.style.display = "none";
    }

    const togglePlayButton = (player2) => {
        const playButton = document.querySelector('#play');
        if (player2 && playButton.hasAttribute("disabled")) playButton.removeAttribute('disabled');
        if (!player2 && !(playButton.hasAttribute("disabled"))) playButton.setAttribute('disabled', '');
    }

    let counterX = 0;
    let counterO = 0;
    const showScore = (gameScore) => {
        const window = document.querySelector('main');
        let scoreDisplay = document.querySelector('.score');

        if (scoreDisplay === null) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.className = 'score';
        }

        if (gameScore.at(-1) === 'tie') {
            scoreDisplay.textContent = `It's a tie! Score: ${counterX} - ${counterO}`;
            window.insertBefore(scoreDisplay, window.firstChild);
        } else if (gameScore.at(-1) === 'x') {
            scoreDisplay.textContent = `X won! Score: ${++counterX} - ${counterO}`;
            window.insertBefore(scoreDisplay, window.firstChild);
        } else {
            scoreDisplay.textContent = `O won! Score: ${counterX} - ${++counterO}`;
            window.insertBefore(scoreDisplay, window.firstChild);
        }
        return {scoreDisplay}
    }
    
    const resetScore = () => {
        let scoreDisplay = document.querySelector('.score');
        counterX = 0;
        counterO = 0;
        scoreDisplay.textContent = "";
    }
    return {showMarker, cleanBoard, hideMenu, showMenu, togglePlayButton, showScore, resetScore};
})();

const gameFlowLogic = (() => {
    let player1; // initialize players 
    let player2;
    let counter = 0; // counter for player turns
    let gameScore = [];   

    // START AND END GAME LOGIC
    const choosePlayer = function (e) { // choose player vs player or player vs AI
        const chosenButton = e.target || null; // select player buttons
        if (chosenButton.className !== "players-vs-ai") return; // OR if button play game is clicked
        player1 = Players('user', 'x');
        player2 = Players(chosenButton.textContent, 'o');
    };

    const startGame = function (e) { // choose player vs player or player vs AI
        const chosenButton = e.target || null; // select player buttons
        if (player2) displayControl.togglePlayButton(player2);
        if (chosenButton.className === 'play' && player2) displayControl.hideMenu();
    };

    const resetGame = (e) => {
        const chosenButton = e.target || null;
        if (chosenButton.className === 'reset') {
            player2 = undefined;
            gameBoard.cleanBoard();
            displayControl.cleanBoard();
            displayControl.togglePlayButton();
            displayControl.resetScore();
            displayControl.showMenu();
        }; 
    }

    const startGameHandler = (e) => {
        e.stopPropagation();
        choosePlayer(e);
        resetGame(e);
        startGame(e);
    }

    // GAME FLOW LOGIC

    const addGameScore = (marker='tie') => {
        gameScore.push(marker);
        displayControl.showScore(gameScore);
        return true;
    }

    const changeTurn = (position) => {
        if (checkForBusy(position)) return;
        let currentMarker; 
        counter % 2 === 0 ? currentMarker = player1.marker : currentMarker = player2.marker;
        counter++;
        return currentMarker;
    }
    const checkForDraw = () => gameBoard.isDraw() ? gameBoard.cleanBoard() && addGameScore() && displayControl.cleanBoard() : false;
    const checkForWin = (player1, marker, position) => gameBoard.isWin(player1, marker, position) ? gameBoard.cleanBoard()
                                                                                                    && addGameScore(marker) 
                                                                                                    && displayControl.cleanBoard() : false;
    const checkForBusy = (position) => gameBoard.isBusy(position) ? true : false;
    
    const addMarkerHandler = (e) => {
        const position = Number(e.target.className.at(-1));
        const marker = changeTurn(position);
        if (checkForBusy(position)) return; // check if cell is busy
        gameBoard.addMarker(position, marker); // store marker to the board array
        displayControl.showMarker(e, marker); // display the marker on the screen
        if (checkForWin(player1, marker, position)) return; // check if there is a win
        if (checkForDraw()) return; // check if the game is over due to draw
    };
    return {player2, startGameHandler, checkForDraw, checkForWin, checkForBusy, addMarkerHandler};
})(Players, gameBoard, displayControl);

const eventListenerz =(() => {
    const buttons = document.querySelectorAll('.buttonz');
    const cells = document.querySelector('.board');

    [...buttons].forEach(button => addEventListener('click', gameFlowLogic.startGameHandler));
    cells.addEventListener('click', gameFlowLogic.addMarkerHandler);
})();

