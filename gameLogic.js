const Players = (name) => {
    const player = name || 'John Doe';
    const sayHello = function () {
        console.log("hi")
    }
    return {player, sayHello};
}

const gameBoard = (() => {
    const _board = [x, x, o, o, x, o, x, o, o];

    const addMarker = (marker) => {
        console.log(marker)
    }
})();

const player1 = Players('xxx');
player1.sayHello();
console.log(player1.player);