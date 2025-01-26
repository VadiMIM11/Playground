let playerToMove = 0; // 0 == x, 1 == o, 3 == game over
let winCondition = 3; // Number of marks in a row to win
let gameMatrix = [];

$(document).ready(function () {

    playerToMove = 0;
    let slider = document.getElementById("grid-size-slider");
    let output = document.getElementById("grid-size-label");
    output.innerHTML = slider.value;

    resize_grid(parseInt(slider.value));

    slider.oninput = function () {
        output.innerHTML = this.value;
        resize_grid(parseInt(this.value));
    }
    $(".reset-button").click(reset);

    $("#win-condition").change(function () { winCondition = parseInt(this.value) });
})



function resize_grid(n) {
    if (n < 3 || n > 10) {
        return;
    }

    console.log(n);
    gameMatrix = [];
    for (let i = 0; i < n; i++) {
        let col = new Array(n).fill(3);
        gameMatrix.push(col);
    }
    console.log("Resized Matrix:");
    console.table(gameMatrix);

    let grid = $("#grid-container");

    grid.css("grid-template-columns", `repeat(${n}, 1fr)`);
    //grid.css("grid-template-rows", `repeat(${n}, 1fr)`);

    grid.empty();

    for (let index = 0; index < n * n; index++) {
        grid.append(`<div class="cell-canvas" id=cell_${index}></div>`);
        $(`#cell_${index}`).click(cell_canvas_click);
    }
}

function reset() {
    resize_grid(gameMatrix.length);
    playerToMove = 0;
}

function cell_canvas_click() {
    //console.log(this.id, " was clicked");

    if (this.hasChildNodes()) {
        //console.log("Cell Occupied!")
        return;
    }

    if (playerToMove == 3) {
        console.log("Game Over!")
        return;
    }
    console.clear();
    console.log("Current player's turn: ", playerToMove);
    let id = parseInt(this.id.slice(5));
    let pair = idToCoord(id);
    let row = pair.x;
    let col = pair.y;
    //console.log("Trying to set", row, col, typeof(row), typeof(col));
    gameMatrix[row][col] = playerToMove;
    console.table(gameMatrix);


    let img = document.createElement("img");
    img.classList.add('cell-canvas');
    if (playerToMove == 0) {
        img.setAttribute("src", "src/cross.png");
        playerToMove = 1;
    }
    else if (playerToMove == 1) {
        img.setAttribute("src", "src/circle.png");
        playerToMove = 0;
    }
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
    this.appendChild(img);

    checkWinCondition(row, col);
}

function checkWinCondition(row, col) {

    let counter = 0;
    let whoMoved = (playerToMove + 1) % 2;
    let x = row;
    let y = col;
    let victoryChainIds = [];

    // left
    while (y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y--;
        counter++;
    }
    x = row;
    y = col;
    // right
    counter--;
    victoryChainIds.shift();
    while (y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y++;
        counter++;
    }
    x = row;
    y = col;
    console.log("Horizontal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);
    if (checkWinCounter(counter, victoryChainIds)) { return; }
    counter = 0;
    victoryChainIds = [];

    // up
    while (x >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        x--;
        counter++;
    }
    x = row;
    y = col;

    // down
    counter--;
    victoryChainIds.shift();
    while (x < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        x++;
        counter++;
    }
    x = row;
    y = col;
    console.log("Vertical Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);
    if (checkWinCounter(counter, victoryChainIds)) { return; }
    counter = 0;
    victoryChainIds = [];

    // left-up
    while (x >= 0 && y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y--;
        x--;
        counter++;
    }
    x = row;
    y = col;

    // right-down
    counter--;
    victoryChainIds.shift();
    while (x < gameMatrix.length && y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y++;
        x++;
        counter++;
    }
    x = row;
    y = col;
    console.log("Left-Up Diagonal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);
    if (checkWinCounter(counter, victoryChainIds)) { return; }
    counter = 0;
    victoryChainIds = [];

    // right-up
    while (x >= 0 && y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y++;
        x--;
        counter++;
    }
    x = row;
    y = col;

    // left-down
    counter--;
    victoryChainIds.shift();
    while (x < gameMatrix.length && y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        victoryChainIds.push(coordToId(x, y));
        y--;
        x++;
        counter++;
    }
    x = row;
    y = col;
    console.log("Right-Up Diagonal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);
    if (checkWinCounter(counter, victoryChainIds)) { return; }
}

function checkWinCounter(counter, victoryChainIds) {
    if (counter >= winCondition) {
        playerToMove = 3;
        console.log("Victory Chain: ", victoryChainIds);
        victoryChainIds.forEach(element => {
            $(`#cell_${element}`).css("background", "Moccasin");
        });
        
        return true;
    }
    return false;
}

function idToCoord(id) {
    let n = gameMatrix.length;
    let x = Math.floor(id / n);
    let y = id - x * n;
    console.log("Id to Coord: Id=", id, " x=", x, " y=", y);
    return { x, y };
}
function coordToId(x, y) {
    let n = gameMatrix.length;
    let id = x * n + y;
    console.log("Coord to ID: Id=", id, " x=", x, " y=", y);
    return id;
}
