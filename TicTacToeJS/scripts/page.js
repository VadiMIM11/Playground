$(document).ready(function () {

    let slider = document.getElementById("grid-size-slider");
    let output = document.getElementById("grid-size-label");
    output.innerHTML = slider.value;
  
    slider.oninput = function () {
      output.innerHTML = this.value;
      resize_grid(this.value);
    }
})


function resize_grid(n){
    if (n < 3 || n > 10){
        return;
    }

    let grid = document.getElementById("grid-container");

    let grid_template_string = "";
    for (let index = 0; index < n; index++) {
        grid_template_string += "auto ";
    }

    grid.style.gridTemplateColumns = grid_template_string;

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let index = 0; index < n*n; index++) {
        
        let cell = document.createElement("div");
        cell.textContent = index + 1;
        grid.appendChild(cell);
    }
}