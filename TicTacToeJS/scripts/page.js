let playerToMove = 0; // 0 == x, 1 == o, 3 == game over
let winCondition = 3; // Number of marks in a row to win
let gameMatrix = [];

$(document).ready(function () {

    playerToMove = 0;
    let slider = document.getElementById("grid-size-slider");
    let output = document.getElementById("grid-size-label");
    output.innerHTML = slider.value;

    resize_grid(slider.value);

    slider.oninput = function () {
        output.innerHTML = this.value;
        resize_grid(this.value);
    }

})



function resize_grid(n) {
    if (n < 3 || n > 10) {
        return;
    }

    console.log(n);
    gameMatrix = [];
    for (let i = 0; i < n; i++) {
        let col = new Array(parseInt(n)).fill(3);
        gameMatrix.push(col);
    }
    console.log("Resized Matrix:");
    console.table(gameMatrix);

    let grid = $("#grid-container");

    grid.css("grid-template-columns", `repeat(${n}, 1fr)`);
    grid.css("grid-template-rows", `repeat(${n}, 1fr)`);

    grid.empty();

    for (let index = 0; index < n * n; index++) {
        grid.append(`<div class="cell-canvas" id=cell_${index}></div>`);
        $(`#cell_${index}`).click(cell_canvas_click);
    }
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

    // left
    while (y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y--;
        counter++;
        //console.log("Left ", `${y+1} -> ${y} Current Counter: ${counter}`);
    }
    x = row;
    y = col;
    // right
    counter--;
    while (y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y++;
        counter++;
        //console.log("Right ", `${y-1} -> ${y} Current Counter: ${counter}`);
    }
    x = row;
    y = col;
    console.log("Horizontal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);
    if (counter >= winCondition) {
        playerToMove = 3;
        //alert(`Player ${whoMoved} Won!`);
        return;
    }
    counter = 0;

    // up
    while (x >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        x--;
        counter++;
    }
    x = row;
    y = col;    

    // down
    counter--;
    while (x < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        x++;
        counter++;
    }
    x = row;
    y = col; 
    console.log("Vertical Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);   
    if (counter >= winCondition) {
        playerToMove = 3;
        //alert(`Player ${whoMoved} Won!`);
        return;
    }
    counter = 0;

    // left-up
    while (x >= 0 && y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y--;
        x--;
        counter++;
    }
    x = row;
    y = col;    

    // right-down
    counter--;
    while (x < gameMatrix.length && y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y++;
        x++;
        counter++;
    }
    x = row;
    y = col;    
    console.log("Left-Up Diagonal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);   
    if (counter >= winCondition) {
        playerToMove = 3;
        //alert(`Player ${whoMoved} Won!`);
        return;
    }
    counter = 0;

    // right-up
    while (x >= 0 && y < gameMatrix.length && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y++;
        x--;
        counter++;
    }
    x = row;
    y = col;    

    // left-down
    counter--;
    while (x < gameMatrix.length && y >= 0 && gameMatrix[x][y] == whoMoved && counter < winCondition) {
        y--;
        x++;
        counter++;
    }
    x = row;
    y = col;    
    console.log("Right-Up Diagonal Check: ", counter, "Who moved: ", whoMoved, "Win condition:", winCondition);   
    if (counter >= winCondition) {
        playerToMove = 3;
        //alert(`Player ${whoMoved} Won!`);
        return;
    }
}

function idToCoord(id) {
    let n = gameMatrix.length;
    let x = Math.floor(id / n);
    let y = id - x * n;
    console.log("Id=", id, " x=", x, " y=", y);
    return { x, y };
}