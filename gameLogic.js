const gameFlow = (() => {
    const Players = (name) => {
        const player = name || 'John Doe';
        const marker = document.querySelector(`${cell-$}`);


        const sayHello = function () {
            console.log("hi")
        }
        return {player, marker, sayHello};
    }

    const gameBoard = (() => {
        const _board = [x, x, o, o, x, o, x, o, o];

        const addMarker = (marker) => {
            console.log(marker)
        }
    })();

    const displayController = (() => {
        console.log('hi');
    })();
})();
    
const player1 = Players('xxx');
player1.sayHello();
console.log(player1.player);