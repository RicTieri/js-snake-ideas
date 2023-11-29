
const container = document.querySelector('.container');
let score = 0;
let direzione = 'right';
let position;
let columnsNumber = 20;
let head = {};
let body = [];
let food = { point: 0 };
let game;
let game_run = true;
let game_over = false;




// ====================================EVENT_LISTENER=========================================

document.querySelector('button#reset').addEventListener('click', () => {
    reset();
    start_game();
});

document.querySelector('button#start').addEventListener('click', () => {
    reset();
    start_game();
});

document.querySelector('button#pause').addEventListener('click', () => {
    if(!game_over){
        if (game_run) {
            clearInterval(game);
            game_run = false;
        } else {
            start_game();
            game_run = true;
        }
    }
});

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case "ArrowLeft":
            if(direzione !== 'right') direzione = 'left';
            break;
        case "ArrowUp":
            if(direzione !== 'bottom') direzione = 'top';
            break;
        case "ArrowDown":
            if(direzione !== 'top') direzione = 'bottom';
            break;
        case "ArrowRight":
            if(direzione !== 'left') direzione = 'right';
            break;
    }
});




// ===========================================FUNZIONI=========================================
/**
 * function to reset variables to start point
 */
function reset(){
    clearInterval(game);
    game_over = false;
    container.innerHTML = '';
    container.classList.remove('bg-gameover');
    createGrid(container, columnsNumber);
    direzione = 'right';
    food = { point: 0 };
    body = [];
    position = Math.floor(Math.random() * (100) + 1);
    head.point = position;
    score = 0;
    document.getElementById('score').innerHTML = score
    game_run = true;
};

 /**
  * function to draw game object
  */
function start_game() {
    game = setInterval(function () {
        // draw head
        document.querySelector('#cell-' + head.point).classList.remove('active');
        head.point = newPosition(direzione, head.point, columnsNumber);
        document.querySelector('#cell-' + head.point).classList.add('active');
        // draw body with condition
        body.forEach((element) => document.querySelector('#cell-' + element).classList.remove('active'));

        if (body.length) {
            body.push(head.point);
            body.shift();
            for (let i = 0; i < body.length - 1; i++) {
                if(body[i] == head.point) gameOver();
            };
        };

        body.forEach((element) => document.querySelector('#cell-' + element).classList.add('active'));
        // food interaction
        if (head.point == food.point) {
            document.querySelector('#cell-' + food.point).classList.remove('food')
            body.push(head.point);
            if(body.length == 1) body.push(head.point);
            food.point = 0;
            score++;
            document.getElementById('score').innerHTML = score;
        };

        if (food.point == 0) {
            placeFood(1, columnsNumber*columnsNumber, food);
            document.querySelector('#cell-' + food.point).classList.add('food');
        };
    }, 200);
}

/**
 * function to update grid position based on event listener output
 * @param {*} direction 
 * @param {*} position 
 * @param {*} columns 
 * @returns 
 */
function newPosition(direction, position, columns) {

    switch (direction) {

        case 'right':
            position += 1;
            if (position % columns == 1) gameOver();
            break;

        case 'left':
            position -= 1;
            if (position % columns == 0) gameOver();
            break;

        case 'top':
            position -= columns;
            if (position < 0) gameOver();
            break;

        case 'bottom':
            position += columns;
            if (position > columns*columns) gameOver();
            break;

    }

    return position;

};

/**
 * function to draw the basis of the game's box
 * @param {*} container 
 * @param {*} columns 
 */
function createGrid(container, columns) {
    for (let i = 0; i < columns*columns; i++) {
        let cell = document.createElement('div');
        cell.classList.add('single-cell');
        cell.id = 'cell-' + (i + 1);
        cell.style.width = `calc(100% / ${columns} )`;
        cell.style.height = `calc(100% / ${columns} )`;
        container.appendChild(cell);
    }
};

/**
 * function to set random position to food
 * @param {*} min 
 * @param {*} max 
 * @param {*} fruit 
 */
function placeFood(min, max, fruit) {
    fruit.point = Math.floor(Math.random() * (max - min)) + min;
};

/**
 * function to stop the game
 */
function gameOver() {
    game_over = true;
    container.classList.add('bg-gameover');
    clearInterval(game);
};



