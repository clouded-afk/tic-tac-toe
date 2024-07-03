function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const generateBoard = function() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }
    };

    const getBoard = () => board;


    return { generateBoard, getBoard }
}


function Cell() {
    let value = "";

    const placeMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { placeMarker, getValue };
};
