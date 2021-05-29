const grid = document.querySelector('.sketch-box');
const colorCircle = document.querySelector('.color-circle')
const colorSelect = document.querySelector('.selection');
const clearGrid = document.querySelector('.clear');
const sizeSelect = document.querySelector('.size');
const randomBtn = document.querySelector('.random')
const greyScaleBtn = document.querySelector('.greyscale');
const eraseBtn = document.querySelector('.erase');

//initialization of grid when page loaded for the first time
let size = sizeSelect.value;
let area = size * size;
let color = colorSelect.value;
let cells = document.querySelectorAll('.cell');
sizeSelected();
let randomColor = false;
let greyScaleColor = false;
let eraser = false;
let isDrawing = false;

//event for changing select node for color
function colorSelected() {
    colorCircle.style.backgroundColor = this.value;
    color = this.value;
}

//funct for changing grid size
function sizeSelected() {
    //clears previous grid if exists
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
    size = sizeSelect.value;
    area = size * size;
    grid.style['grid-template-columns'] = `repeat(${size}, 1fr)`;
    for (let i = 0; i < area; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }
    addCellListener();
}

//add event listener to each cell after each initialisation of new grid
function addCellListener() {
    //gather all cells under a selector again
    cells = document.querySelectorAll('.cell');
    //initialization of color when page loaded for first time
    color = colorSelect.value;
    cells.forEach(cell => cell.addEventListener('mouseover', changeCellColor));
}

//event function for changing cell color after event.
function changeCellColor() {
    if (!isDrawing) return;

    if (greyScaleColor) {
        this.style.backgroundColor = greyScale(this.style.backgroundColor);
        console.log(this.style.backgroundColor);
    } else if (randomColor) {
        this.style.backgroundColor = `rgb(${randomRgbNum()}, ${randomRgbNum()}, ${randomRgbNum()})`
    } else if (eraser){
        this.style.backgroundColor = 'rgb(247, 247, 247)';
    } else {
        this.style.backgroundColor = color;
    }
}

function eraserSelect() {
    if (eraser == false) {
        eraser = true;
        if (randomColor == true) {
            randomColor = false;
            randomBtn.classList.remove('random-color');
        }
        if (greyScaleColor == true) {
            greyScaleColor = false;
            greyScaleBtn.classList.remove('greyscale-color');
        }
    } else {
        eraser = false;
    }
    eraseBtn.classList.toggle('eraser');
}

//clear grid - reset to original color;
function resetGrid() {
    cells.forEach(cell => cell.style.backgroundColor = 'rgb(247, 247, 247)');
}

//toggle random-color class, and enable random color change.
function randomColorSelect() {
    if (randomColor == false) {
        randomColor = true;
        if (eraser == true) {
            eraser = false;
            eraseBtn.classList.remove('eraser');
        }
        if (greyScaleColor == true) {
            greyScaleColor = false;
            greyScaleBtn.classList.remove('greyscale-color');
        }
    } else {
        randomColor = false;
    }
    randomBtn.classList.toggle('random-color');
}

function greyScaleColorSelect() {
    if (greyScaleColor == false) {
        greyScaleColor = true;
        if (eraser == true) {
            eraser = false;
            eraseBtn.classList.remove('eraser');
        }
        if (randomColor == true) {
            randomColor = false;
            randomBtn.classList.remove('random-color');
        }
    } else {
        greyScaleColor = false;
    }
    greyScaleBtn.classList.toggle('greyscale-color');
}

function randomRgbNum() {
    return Math.floor(Math.random() * 256);
}

function greyScale(color) {
    switch (color) {
        case 'rgb(238, 238, 238)':
            return 'rgb(204, 204, 204)';
            break;

        case 'rgb(204, 204, 204)':
            return 'rgb(153, 153, 153)';
            break;

        case 'rgb(153, 153, 153)':
            return 'rgb(102, 102, 102)';
            break;

        case 'rgb(102, 102, 102)':
            return 'rgb(51, 51, 51)';
            break;

        case 'rgb(51, 51, 51)':
            return 'rgb(0, 0, 0';
            break;

        case 'rgb(0, 0, 0)':
            break;
        
        default:
            return 'rgb(238, 238, 238)';
            break;
    }
}

function toggleDrawing(e) {
    if (e.code == 'KeyD') {
        if (!isDrawing) {
            isDrawing = true;
        } else {
            isDrawing = false;
        }
    }
}

cells.forEach(cell => cell.addEventListener('mouseover', changeCellColor));
colorSelect.addEventListener('change', colorSelected);
sizeSelect.addEventListener('change', sizeSelected);
clearGrid.addEventListener('click', resetGrid);
randomBtn.addEventListener('click', randomColorSelect);
greyScaleBtn.addEventListener('click', greyScaleColorSelect);
eraseBtn.addEventListener('click', eraserSelect);
window.addEventListener('keypress', toggleDrawing);