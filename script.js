function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const generateBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }
    };

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        const cell = board[row][column];

        if (cell.getValue() === "") {
            cell.addMarker(player)
            return true; 
        }
        return false;
    }

    const printBoard = () => {
        const boardWithCellValues =  board.map((row) => row.map((cell) => cell.getValue()));
    }

    const checkForWinner = (marker) => {
        for (let row = 0; row < rows; row++) {
            if (board[row].every((cell) => cell.getValue() === marker)) {
                return true;
            }
          }

        for (let col = 0; col < columns; col++) {
            if (board.every((row) => row[col].getValue() === marker)) {
                return true;
            }
        }

        if ((board[0][0].getValue() === marker && board[1][1].getValue() === marker && board[2][2].getValue() === marker) || (board[0][2].getValue() === marker && board[1][1].getValue() === marker && board[2][0].getValue() === marker)) {
            return true;
        }
        return false;
    }

    const checkForDraw = () => {
        return board.every((row)=> row.every((cell) => cell.getValue() !== ""))
    }

    generateBoard();

    return {
        getBoard,
        placeMarker,
        printBoard,
        checkForDraw,
        checkForWinner
    };
};

function Cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };
};


const CreatePlayer = (name, marker) => {
    return {name, marker}
}

function GameController() {
    const board = Gameboard();
    let players = []
    let currentPlayer;

    const startGame = (playerOneName, playerTwoName) => {
        players = [ CreatePlayer(playerOneName, "X"), CreatePlayer(playerTwoName, "O")];
        currentPlayer = players[0];
    }

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    const printNewRound = () => {
        board.printBoard();
    };

    printNewRound();

    return {
        switchPlayerTurn,
        getCurrentPlayer,
        startGame
    };
};

function DisplayController() {
    const startButton = document.getElementById("start-button")
    const playerOneValue = document.getElementById("player-one")
    const playerTwoValue = document.getElementById("player-two")
    const gameContainer = document.querySelector(".game")
    const infoContainer = document.querySelector(".info-container")
    const info = document.querySelector(".info")

    const displayBoard = () => {
        gameContainer.style.display = "grid"
        infoContainer.style.display = "flex"
        info.style.display = "flex"

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const boardCell = document.createElement("div");
                boardCell.classList.add("board-cell")
                gameContainer.appendChild(boardCell)
            }
        }

    }

    startButton.addEventListener("click", () => {
        const playerOneName = playerOneValue.value || "Player One";
        const playerTwoName = playerTwoValue.value || "Player Two";
        const inputContainer = document.querySelector(".name-input-container")
        GameController().startGame(playerOneName, playerTwoName)
        inputContainer.remove();
        displayBoard();
    })


}

const game = GameController();


DisplayController();


//draw
// game.playRound(0,0)
// game.playRound(2,0)
// game.playRound(1,0)
// game.playRound(0,1)
// game.playRound(2,1)
// game.playRound(1,1)
// game.playRound(0,2)
// game.playRound(2,2)
// game.playRound(1,2)

//row
// game.playRound(1,0)
// game.playRound(2,0)
// game.playRound(1,1)
// game.playRound(0,2)
// game.playRound(1,2)

//column
//game.playRound(1,1)
//game.playRound(0,0)
//game.playRound(2,1)
//game.playRound(1,0)
//game.playRound(1,2)
//game.playRound(2,0)


//left diagonal
// game.playRound(0,0)
// game.playRound(1,2)
// game.playRound(1,1)
// game.playRound(0,1)
// game.playRound(2,2)


//right diagonal
// game.playRound(0,0)
// game.playRound(0,2)
// game.playRound(2,1)
// game.playRound(1,1)
// game.playRound(1,0)
// game.playRound(2,0)