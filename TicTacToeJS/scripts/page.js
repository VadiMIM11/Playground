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

    // let grid_template_string = "";
    // for (let index = 0; index < n; index++) {
    //     grid_template_string += "auto ";
    // }

    grid.css("grid-template-columns", `repeat(${n}, 1fr)`);
    grid.css("grid-template-rows", `repeat(${n}, 1fr)`);

    grid.empty();

    for (let index = 0; index < n*n; index++) {
        //grid.append(`<div><canvas class="cell-canvas" id=cell_${index}></canvas></div>`);
        grid.append(`<div class="cell-canvas" id=cell_${index}></div>`);
        $(`#cell_${index}`).click(cell_canvas_click);
    }
}

function cell_canvas_click(){
    console.log(this.id, " was clicked");
    // let ctx = this.getContext('2d');
    // let cssWidth = window.getComputedStyle(this).getPropertyValue("width");
    // let cssHeight = window.getComputedStyle(this).getPropertyValue("height");
    // this.width = parseFloat(cssWidth);
    // this.height = parseFloat(cssHeight);
    // console.log(cssWidth, cssHeight, this.width, this.height);
    // let x = this.width / 2.0;
    // let y = this.height / 2.0;
    // let radius = this.width / 2.0;
    // let startAngle = 0;
    // let endAngle = 2 * Math.PI;

    // ctx.beginPath();
    // ctx.arc(x,y,radius,startAngle,endAngle);
    // //ctx.fillStyle = 'blue';
    // //ctx.fill();
    // ctx.stroke();

    let cssWidth = window.getComputedStyle(this).getPropertyValue("width");
    let cssHeight = window.getComputedStyle(this).getPropertyValue("height");
    console.log(cssWidth, cssHeight);
    let img = document.createElement("img");
    img.classList.add('cell-canvas');
    img.setAttribute("src", "src/circle.png");
    // img.setAttribute("width", cssWidth);
    // img.setAttribute("height", cssHeight);
    this.appendChild(img);

}