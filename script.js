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

    function checkBoardForWin(marker) {
        if(boardArray[0] === marker && boardArray[1] === marker && boardArray[2] === marker) {
            return true;
        } else if(boardArray[3] === marker && boardArray[4] === marker && boardArray[5] === marker) {
            return true;
        } else if(boardArray[6] === marker && boardArray[7] === marker && boardArray[8] === marker) {
            return true;
        } else if(boardArray[0] === marker && boardArray[4] === marker && boardArray[8] === marker) {
            return true;
        } else if(boardArray[1] === marker && boardArray[4] === marker && boardArray[7] === marker) {
            return true;
        } else if(boardArray[2] === marker && boardArray[4] === marker && boardArray[6] === marker) {
            return true;
        } else if(boardArray[0] === marker && boardArray[3] === marker && boardArray[6] === marker) {
            return true;
        } else if(boardArray[2] === marker && boardArray[5] === marker && boardArray[8] === marker) {
            return true;
        } 
        return false;
    }

    function checkBoardForTie () {
        if (boardArray.includes("")) {
            return false;
        }
        return true;
    }

    return {resetBoard, changeCell, getBoard, checkBoardForWin, checkBoardForTie}
})();

function createPlayer (name, marker) {
    const getMarker = () => marker;
    return {name, getMarker}
}

const displayController = (function () {
    const showCurrentBoard = () => console.log(gameboard.getBoard());

    const renderBoard = () => {
        const boardContainer = document.querySelector(".board-container");
        const board = gameboard.getBoard();
        board.forEach(element => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            boardContainer.appendChild(cell);
        });
    }

    

    
    return {showCurrentBoard, renderBoard}
})();

const gameFlow = (function() {
    function playerTurn(player) {
        displayController.showCurrentBoard();
        while (true) {
            let playerSelection = prompt("Enter cell number!");
            if (gameboard.getBoard()[playerSelection] !== "") {
                alert("Cell is already taken!");
                continue;
            } else {
                gameboard.changeCell(playerSelection, player.getMarker());
                break;
            }
        }
    }
    function playRound(player1, player2) {
        displayController.renderBoard;
        while(true) {
            playerTurn(player1);
            if (gameboard.checkBoardForWin(player1.getMarker())){
                alert("Game Over! Player 1 wins!")
                break;
            }
            if (gameboard.checkBoardForTie()) {
                alert("Game Over! It's a tie!")
                break;
            }
            playerTurn(player2);
            if (gameboard.checkBoardForWin(player2.getMarker())){
                alert("Game Over! Player 2 wins!")
                break;
            }
            if (gameboard.checkBoardForTie()) {
                alert("Game Over! It's a tie!")
                break;
            }
        }
    }

    return {playRound};
})();

function newGame () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    gameFlow.playRound(player1, player2);
}

newGame();