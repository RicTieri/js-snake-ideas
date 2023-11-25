const gameBoard = document.getElementById('game_box');
let direzione = 'left';
let rowTile = 25;
let mapTile = Math.pow(rowTile, 2);

createGrid(rowTile)
let position = Math.floor( Math.random() * (mapTile) + 1 );
document.querySelector('.x-' + position).classList.add('active');
setInterval(function() {
    document.querySelector('.x-' + position).classList.remove('active');
    position = newPosition(direzione, position, rowTile);
    document.querySelector('.x-' + position).classList.add('active');
}, 1000);









function createGrid(row) {
        for(let i = 0; i < Math.pow(row, 2); i++) {
            let tile = document.createElement('div');
            tile.style.width = `calc(100% / ${rowTile})`;
            tile.style.height = `calc(100% / ${rowTile})`;
            tile.classList.add('x-' + (i + 1));
            gameBoard.appendChild(tile);
        }
}

function newPosition(direction, position, row) {
    switch(direction) {
        case 'right':
            position += 1;
            if(position % row === 1){
              position -= row;
            }
        break;

        case 'left':
            position -= 1;
            if(position % row === 0){
              position += row;
            }
        break;

        case 'top':
            position -= row;
            if(position < 0){
              position += Math.pow(row, 2);
            }
        break;

        case 'bottom':
            position += row;
            if(position > Math.pow(row, 2)){
              position -= Math.pow(row, 2);
            }
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


































function getRandomBetween(min, max, exception){
  let num = Math.floor(Math.random()*(max-min + 1) + min);
  if(!exception.includes(num)){
    return num
  }
}