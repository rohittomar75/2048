let board;
let score = 0;
let rows = 4, columns = 4;
let ok = false;

window.onload = () => {
    setGame();
}

function setGame() {
    board = [
        [1024, 1024, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // board = [
    //     [1024, 1024, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // creating a div element
            // <div id="r-c"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, board[r][c]);
            document.getElementById("board").appendChild(tile);
        }
    }

    setTwo();
    setTwo();
}

// update a tile with number num
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("tile" + num.toString());
        }
        else {
            tile.classList.add("tile8192")
        }
    }
}

// randomly set 2's on the board
function setTwo() {
    let found = false;
    let num = (Math.random() < 0.9) ? 2 : 4; // 90% of time 2, 10% of time 4
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = num;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, num);
            found = true;
        }
    }
}

// check if game is over
function gameOver(board) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) return false;
        }
    }
    // check if we can slide the tiles to the left or not
    // similarly check for the right, up and down moves
    for (let r = 0; r < rows; r++) {
        for (let c = 1; c < columns; c++) {
            if (board[r][c] == board[r][c - 1]) return false;
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 1; r < rows; r++) {
            if (board[r][c] == board[r - 1][c]) return false;
        }
    }
    return true;
}

// listen for events
document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        ok = false;
        slideLeft();
        if (gameOver(board)) {
            alert("Game Over");
            location.reload();
        }
        if (ok) setTwo();
    }
    else if (event.code == "ArrowRight") {
        ok = false;
        slideRight();
        if (gameOver(board)) {
            alert("Game Over");
            location.reload();
        }
        if (ok) setTwo();
    }
    else if (event.code == "ArrowUp") {
        ok = false;
        slideUp();
        if (gameOver(board)) {
            alert("Game Over");
            location.reload();
        }
        if (ok) setTwo();
    }
    else if (event.code == "ArrowDown") {
        ok = false;
        slideDown();
        if (gameOver(board)) {
            alert("Game Over");
            location.reload();
        }
        if (ok) setTwo();
    }
    // update score
    document.getElementById("score").innerText = score;
});

function boardEqual(board, oldBoard) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != oldBoard[r][c]) return false;
        }
    }
    return true;
}

// when the user clicks the left arrow-key
function slideLeft() {
    let oldBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            oldBoard[r][c] = board[r][c];
        }
    }
    for (let r = 0; r < rows; r++) {
        let arr = [];
        for (let c = 0; c < columns; c++) {
            if (board[r][c] > 0) arr.push(board[r][c]);
        }
        while (arr.length != 4) arr.push(0);
        for (let c = 0; c < columns; c++) {
            board[r][c] = arr[c];
        }
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] == 0) continue;
            if (board[r][c] == board[r][c + 1]) {
                board[r][c] += board[r][c];
                board[r][c + 1] = 0;
                score += board[r][c];
            }
        }
        let curRow = [];
        for (let c = 0; c < columns; c++) {
            if (board[r][c] > 0) curRow.push(board[r][c]);
        }
        while (curRow.length != 4) curRow.push(0);
        board[r] = curRow;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
    if (!boardEqual(board, oldBoard)) ok = true;
}

// when the user clicks the right arrow-key
function slideRight() {
    let oldBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            oldBoard[r][c] = board[r][c];
        }
    }
    for (let r = 0; r < rows; r++) {
        let arr = [];
        for (let c = 0; c < columns; c++) {
            if (board[r][c] > 0) arr.push(board[r][c]);
        }
        while (arr.length != 4) {
            arr.unshift(0);
        }
        for (let c = 0; c < columns; c++) {
            board[r][c] = arr[c];
        }
        for (let c = columns - 1; c >= 1; c--) {
            if (board[r][c] == 0) continue;
            if (board[r][c] == board[r][c - 1]) {
                board[r][c] += board[r][c];
                board[r][c - 1] = 0;
                score += board[r][c];
            }
        }
        let curRow = [];
        for (let c = columns - 1; c >= 0; c--) {
            if (board[r][c] > 0) curRow.push(board[r][c]);
        }
        while (curRow.length != 4) curRow.push(0);
        board[r] = curRow.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
    if (!boardEqual(board, oldBoard)) ok = true;
}

// when the user clicks the up arrow-key
function slideUp() {
    let oldBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            oldBoard[r][c] = board[r][c];
        }
    }
    for (let c = 0; c < columns; c++) {
        let arr = [];
        for (let r = 0; r < rows; r++) {
            if (board[r][c] > 0) arr.push(board[r][c]);
        }
        while (arr.length != 4) {
            arr.push(0);
        }
        for (let r = 0; r < rows; r++) {
            board[r][c] = arr[r];
        }
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] == 0) continue;
            if (board[r][c] == board[r + 1][c]) {
                board[r][c] += board[r][c];
                board[r + 1][c] = 0;
                score += board[r][c];
            }
        }
        let curCol = [];
        for (let r = 0; r < rows; r++) {
            if (board[r][c] > 0) {
                curCol.push(board[r][c]);
            }
        }
        while (curCol.length != 4) curCol.push(0);
        for (let r = 0; r < rows; r++) {
            board[r][c] = curCol[r];
        }
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
    if (!boardEqual(board, oldBoard)) ok = true;
}

// when the user clicks the down arrow-key
function slideDown() {
    let oldBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            oldBoard[r][c] = board[r][c];
        }
    }
    for (let c = 0; c < columns; c++) {
        let arr = [];
        for (let r = 0; r < rows; r++) {
            if (board[r][c] > 0) arr.push(board[r][c]);
        }
        while (arr.length != 4) {
            arr.unshift(0);
        }
        for (let r = 0; r < rows; r++) {
            board[r][c] = arr[r];
        }
        for (let r = rows - 1; r >= 1; r--) {
            if (board[r][c] == 0) continue;
            if (board[r][c] == board[r - 1][c]) {
                board[r][c] += board[r][c];
                board[r - 1][c] = 0;
                score += board[r][c];
            }
        }
        let curCol = [];
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][c] > 0) {
                curCol.push(board[r][c]);
            }
        }
        while (curCol.length != 4) curCol.push(0);
        for (let r = rows - 1; r >= 0; r--) {
            board[r][c] = curCol[rows - r - 1];
        }
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
    if (!boardEqual(board, oldBoard)) ok = true;
}