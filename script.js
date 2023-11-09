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
    const currentBoard = document.querySelector(".board-container");
    const allCells = document.querySelectorAll(".cell");

    const getAllCells = () => allCells;

    const showCurrentBoard = () => console.log(gameboard.getBoard());

    const renderBoard = (player) => {
        const board = gameboard.getBoard();
        clearBoard();
        createBoard(board, currentBoard);
    }
    
    function fillCell(cell, marker) {
        const cellNumber = cell.id;
        if (gameboard.getBoard()[cellNumber] !== "") {
            alert("Cell is already taken!");
        } else {
            gameboard.changeCell(cellNumber, marker);
            cell.textContent = marker;
        }
    }

    function createBoard(board, boardContainer) {
        let cellIndex = 0;
        board.forEach(element => {
            const cell = document.createElement("div");
            cell.classList.add("cell"); 
            cell.setAttribute("id", cellIndex);
            cell.textContent = board[cellIndex];
            boardContainer.appendChild(cell);
            cellIndex++;
            cell.addEventListener("click", (e) => {
                if(turn === true) {
                    fillCell(cell, "X");
                } else {
                    fillCell(cell, "O");
                }
                console.log(turn);
                turn = !turn;
                if (gameboard.checkBoardForWin("X")){
                    alert("Game Over! Player 1 wins!");
                    gameOver = true;
                }
                if (gameboard.checkBoardForTie()) {
                    alert("Game Over! It's a tie!");
                    gameOver = true;
                }
        })
        }
    )};

    function clearBoard() {
        while (currentBoard.hasChildNodes()) {
            currentBoard.removeChild(currentBoard.firstChild);
        }
    }

    
    return {showCurrentBoard, renderBoard}
})();

const gameFlow = (function() {
    function playerTurn(player) {
        displayController.showCurrentBoard();
        displayController.renderBoard();
    }

    function playRound(player1, player2) {
        playerTurn(player1)
        let gameOver = false;
    }


    return {playRound};
})();

function newGame () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    gameFlow.playRound(player1, player2);
}
let turn = true;
newGame();