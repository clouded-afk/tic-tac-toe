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
        console.log(boardWithCellValues);
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

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ]

    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`Placed ${getCurrentPlayer().name}'s marker in row ${row}, column ${column}`);
        board.placeMarker(row, column, getCurrentPlayer().marker);

        if (board.checkForWinner(getCurrentPlayer().marker)) {
            console.log(`${getCurrentPlayer().name} wins!`)
            board.printBoard()
            return;
        }

        if (board.checkForDraw()) {
            console.log("Draw!")
            board.printBoard()
            return;
        }

        switchPlayerTurn();
        printNewRound();
    } 

    printNewRound();

    return {
        playRound,
        getCurrentPlayer
    };
};


const game = GameController();


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
// game.playRound(1,1)
// game.playRound(0,0)
// game.playRound(2,1)
// game.playRound(1,0)
// game.playRound(1,2)
// game.playRound(2,0)


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