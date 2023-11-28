console.log('main.js');
const container = document.querySelector('.container');
let direzione = 'left';
let rowsNumber = 10;
let columnsNumber = 10;

createGrid();

let position = Math.floor( Math.random() * (100) + 1 );
console.log(position);

document.querySelector('#cell-' + position).classList.add('active');

function createGrid() {
    for(let i = 0; i < 100; i++) {
        let cell = document.createElement('div');
        let position = Math.floor( Math.random() * (100) + 1 );
        console.log(cell);
        cell.classList.add('single-cell');
        cell.id = 'cell-' + (i + 1);
        container.appendChild(cell);
    }
}

setInterval(function() {
    document.querySelector('#cell-' + position).classList.remove('active');
    position = newPosition('right', position, columnsNumber);
    document.querySelector('#cell-' + position).classList.add('active');
}, 1000);

function newPosition(direction, position, columns) {

    switch(direction) {

        case 'right':
            position += 1;
        break;

        case 'left':
            position -= 1;
        break;

        case 'top':
            position -= columns;
        break;

        case 'bottom':
            position += columns;
        break;

    }

    return position;

}

document.addEventListener('keydown', function(event) {
    switch(event.code) {
        
        case "ArrowLeft":
            direzione = 'left'
        break;

        case "ArrowUp":
            direzione = 'top'
        break;

        case "ArrowDown":
            direzione = 'bottom'
        break;

        case "ArrowRight":
            direzione = 'right'   
        break;

    }

})



