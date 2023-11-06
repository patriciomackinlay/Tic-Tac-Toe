const gameboard = (function() {
    let boardArray = [
        "","","",
        "","","",
        "","",""];

    function resetBoard() {
        boardArray = [
            "","","",
            "","","",
            "","",""];
    }

    function changeCell(cellNumber, marker) {
        boardArray.splice(cellNumber, 1, marker);
    }

    function getBoard() {
        return boardArray;
    }

    return {resetBoard, changeCell, getBoard}
})();

function createPlayer (name, marker) {
    const getMarker = () => marker;
    return {name, getMarker}
}

const displayController = (function () {
    const showCurrentBoard = () => console.log(gameboard.getBoard());
    return {showCurrentBoard}
})();

const gameFlow = (function() {
    function playRound (gameboard, player) {
        displayController.showCurrentBoard();
        let playerSelection = prompt("Enter cell number!");
        gameboard.changeCell(playerSelection, player.getMarker());
    }
    return {playRound};
})();

function newGame (gameboard) {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    for (let i = 0; i < 10; i++) {
        gameFlow.playRound(gameboard, player1);
    }
}

newGame(gameboard);