let playerToMove = 0; // 0 == x, 1 == o

$(document).ready(function () {
    
    let slider = document.getElementById("grid-size-slider");
    let output = document.getElementById("grid-size-label");
    output.innerHTML = slider.value;
  
    resize_grid(slider.value);

    slider.oninput = function () {
      output.innerHTML = this.value;
      resize_grid(this.value);
    }

})



function resize_grid(n){
    if (n < 3 || n > 10){
        return;
    }

    let grid = $("#grid-container");

    grid.css("grid-template-columns", `repeat(${n}, 1fr)`);
    grid.css("grid-template-rows", `repeat(${n}, 1fr)`);

    grid.empty();

    for (let index = 0; index < n*n; index++) {
        grid.append(`<div class="cell-canvas" id=cell_${index}></div>`);
        $(`#cell_${index}`).click(cell_canvas_click);
    }
}

function cell_canvas_click(){
    //console.log(this.id, " was clicked");

    if(this.hasChildNodes())
    {
        //console.log("Cell Occupied!")
        return;
    }

    let cssWidth = window.getComputedStyle(this).getPropertyValue("width");
    let cssHeight = window.getComputedStyle(this).getPropertyValue("height");
    //console.log(cssWidth, cssHeight);
    let img = document.createElement("img");
    img.classList.add('cell-canvas');
    if(playerToMove == 0){
        img.setAttribute("src", "src/cross.png");
        playerToMove = 1;
    }
    else if (playerToMove == 1){
        img.setAttribute("src", "src/circle.png");
        playerToMove = 0;
    }
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
    this.appendChild(img);

}