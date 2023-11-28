
const container = document.querySelector('.container');
let score = 0;
let direzione = 'right';
let columnsNumber = 20;
let head = {};
let body = [];
let food = { point: 0 };
let game;
let game_run = true;




document.querySelector('button#pause').addEventListener('click', () => {
    if (game_run) {
        clearInterval(game);
        game_run = false;
    } else {
        start_game();
        game_run = true;
    }
})

document.querySelector('button#reset').addEventListener('click', () => {
    reset();
    start_game();
})

document.querySelector('button#start').addEventListener('click', () => {
    reset();
    start_game();
})




// ===========================================FUNZIONI=========================================

function reset(){
    clearInterval(game);
    container.innerHTML = '';
    container.classList.remove('bg-black');
    createGrid(container, columnsNumber);
    food = { point: 0 };
    body = [];
    let position = Math.floor(Math.random() * (100) + 1);
    head.point = position;
    score = 0;
    document.getElementById('score').innerHTML = score
    game_run = true;
};

function start_game() {
    game = setInterval(function () {
        document.querySelector('#cell-' + head.point).classList.add('active');
        document.querySelector('#cell-' + head.point).classList.remove('active');
        body.forEach((element) => {
            document.querySelector('#cell-' + element).classList.remove('active');
        })

        if (body.length) {
            body.push(head.point);
            body.shift();
        };


        for (let i = 0; i < body.length; i++) {
            document.querySelector('#cell-' + body[i]).classList.add('active');
        };

        head.point = newPosition(direzione, head.point, columnsNumber);
        document.querySelector('#cell-' + head.point).classList.add('active');


        if (head.point == food.point) {
            document.querySelector('#cell-' + food.point).classList.remove('food')
            body.push(head.point);
            food.point = 0;
            score++;
            document.getElementById('score').innerHTML = score;
        };

        if (food.point == 0) {
            placeFood(1, 100, food);
            document.querySelector('#cell-' + food.point).classList.add('food');
        };

        

    }, 200);
}


function newPosition(direction, position, columns) {

    switch (direction) {

        case 'right':
            position += 1;
            if (position % columns == 0) gameOver();
            break;

        case 'left':
            position -= 1;
            if (position % columns == 1) gameOver();
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

document.addEventListener('keydown', function (event) {
    switch (event.code) {

        case "ArrowLeft":
            if(direzione !== 'right') direzione = 'left';
            break;

        case "ArrowUp":
            if(direzione !== 'bottom') direzione = 'top'
            break;

        case "ArrowDown":
            if(direzione !== 'top') direzione = 'bottom'
            break;

        case "ArrowRight":
            if(direzione !== 'left') direzione = 'right'
            break;

    }

});

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

function placeFood(min, max, fruit) {
    fruit.point = Math.floor(Math.random() * (max - min)) + min;
};

function gameOver() {
    container.classList.add('bg-black');
    clearInterval(game);
};



