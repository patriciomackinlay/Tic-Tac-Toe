// INTERNAL GAMEBOARD FUNCTIONS
// All of the markers that are set by the players are saved to boardArray. 
// Game interactivity and logic for the GUI version was adapted from the console version, but most of it was transfered from the gameboard module to the displayController module.

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

// DISPLAY CONTROLLER MODULE
// Most of the game logic ended up here, where the display controller module generates DOM manipulation and enables user interaction with the GUI
// The game logic ended up without needing player creation, as changing player is represented by the change in turn order


const displayController = (function () {

    const currentBoard = document.querySelector(".board-container");
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
        gameFlow.reset();
    });

    const showCurrentBoard = () => console.log(gameboard.getBoard());

    const renderBoard = () => {
        const board = gameboard.getBoard();
        clearBoard();
        createBoard(board, currentBoard);
    }

    function createBoard(board, boardContainer) {
        let turn = true;
        let cellIndex = 0;
        board.forEach(element => {
            const cell = document.createElement("div");
            cell.classList.add("cell"); 
            cell.setAttribute("id", cellIndex);
            cell.textContent = board[cellIndex];
            boardContainer.appendChild(cell);
            cellIndex++;
            cell.addEventListener("click", () => {
                if(turn === true && gameOver === false) {
                    fillCell(cell, "X");
                } else if (turn === false && gameOver === false) {
                    fillCell(cell, "O");
                }
                console.log(turn);
                if (gameboard.checkBoardForWin("X")){
                    displayResult("Game Over! Player X wins!");
                    gameOver = true;
                } else if (gameboard.checkBoardForWin("O")){
                    displayResult("Game Over! Player O wins!");
                    gameOver = true;
                } else {
                    if (gameboard.checkBoardForTie()) {
                        displayResult("Game Over! It's a tie!");
                        gameOver = true;
                    }
                }
                turn = !turn;
            });
        }
    )};

    function clearBoard() {
        while (currentBoard.hasChildNodes()) {
            currentBoard.removeChild(currentBoard.firstChild);
        }
    }

    function fillCell(cell, marker) {
        const cellNumber = cell.id;
        if (gameboard.getBoard()[cellNumber] !== "") {
            
        } else {
            gameboard.changeCell(cellNumber, marker);
            cell.textContent = marker;
        }
    }

    function displayResult(result) {
        const resultsDialog = document.querySelector("dialog");
        const closeResultButton = document.querySelector(".close-button");
        const playAgainButton = document.querySelector(".play-again-button")
        const roundResults = document.createElement("p");
        roundResults.classList.add("result-text");
        roundResults.textContent = result;
        resultsDialog.appendChild(roundResults);
        resultsDialog.showModal();

        closeResultButton.addEventListener("click", () => {
            resultsDialog.removeChild(roundResults);
            resultsDialog.close();
            
        })

        playAgainButton.addEventListener("click", () => {
            resultsDialog.removeChild(roundResults);
            gameFlow.reset();
            resultsDialog.close();
        });
    }
    
    return {showCurrentBoard, renderBoard, clearBoard}
})();

// GAME FLOW MODULE
// This module has functions for setting up a new game and resetting the game for playing again

const gameFlow = (function() {

    function playRound() {
        displayController.showCurrentBoard();
        displayController.renderBoard();
    }

    function reset() {
        displayController.clearBoard();
        gameboard.resetBoard();
        gameOver = false;
        newGame();
    }

    function newGame () {
        playRound();
    }

    return {playRound, reset, newGame};
})();

let gameOver = false;

gameFlow.newGame();