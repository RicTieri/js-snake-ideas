
const container = document.querySelector('.container');
let score = 0;
let direzione = 'right';
let position;
let columnsNumber = 20;
let head;
let body;
let food;
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
    food = 0;
    body = [];
    position = Math.floor(Math.random() * (100) + 1);
    head = position;
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
        document.querySelector('#cell-' + head).classList.remove('active');
        head = newPosition(direzione, head, columnsNumber);
        if (head % columnsNumber == 1 || head % columnsNumber == 0 || head < 0 || head > columnsNumber*columnsNumber) gameOver();
        body.forEach((element) => document.querySelector('#cell-' + element).classList.remove('active'));
        // draw body with condition
        
        if (body.length) {
            body.push(head);
            body.shift();
            for (let i = 0; i < body.length - 1; i++) {
                if(body[i] == head) gameOver();
            };
        };
        
        body.forEach((element) => document.querySelector('#cell-' + element).classList.add('active'));
        document.querySelector('#cell-' + head).classList.add('active');
        // food interaction
        if (head == food) {
            document.querySelector('#cell-' + food).classList.remove('food')
            body.push(head);
            if(body.length == 1) body.push(head);
            food = 0;
            score++;
            document.getElementById('score').innerHTML = score;
        };

        if (food == 0) {
            while (food == 0) {
                let num = placeFood(1, columnsNumber*columnsNumber);
                if (num !== head && !body.includes(num)) food = num;
            }
            document.querySelector('#cell-' + food).classList.add('food');
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
function placeFood(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * function to stop the game
 */
function gameOver() {
    game_over = true;
    container.classList.add('bg-gameov');
    clearInterval(game);
};



