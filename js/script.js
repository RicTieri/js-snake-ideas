// board and import 
const play_btn = document.getElementById('play');
const reset_btn = document.getElementById('reset');
const score_out = document.getElementById('scoreboard');
const gameBoard = document.getElementById('game_box');
let sideLength = 600;
let mapTile = 25;
let ctx = gameBoard.getContext('2d');
gameBoard.width = sideLength;
gameBoard.height = sideLength;

// dafult setting
let snakeHead = { x: random(), y: random(), speedX: 1, speedY: 0, color: 'lime' };
let snakeBody = [];
let fruit = { x: 0, y: 0, color: 'red' };
let game;
let score = 0;
let play = false;
let gameOver = false;

// start game
window.addEventListener('keydown', direction);
play_btn.addEventListener('click', () => {
    if (play) {
        play = false;
        clearInterval(game)
    } else {
        play = true
        startGame();
    }
    if (gameOver) {
        gameOver = false;
        snakeHead = { x: random(), y: random(), speedX: 1, speedY: 0, color: 'lime' };
        snakeBody = [];
        startGame();
    }
});

reset_btn.addEventListener('click', () => {
    clearInterval(game);
    setTimeout(() => {
        gameOver = false;
        snakeHead = { x: random(), y: random(), speedX: 1, speedY: 0, color: 'lime' };
        snakeBody = [];
        play = true;
        startGame();
    }, 3000)
});

// function
function startGame() {
    game = setInterval(() => {
        score_out.innerHTML = score;
        gameover();
        if (gameOver) {
            drawBoard(ctx);
            clearInterval(game);
            return
        }

        drawBoard(ctx)
        drawGrid(ctx, mapTile, sideLength);

        ctx.fillStyle = fruit.color;
        ctx.fillRect(fruit.x, fruit.y, mapTile, mapTile);
        if (snakeHead.x == fruit.x && snakeHead.y == fruit.y) {
            snakeBody.push({ x: fruit.x, y: fruit.y })
            placeFruit(fruit, mapTile, sideLength);
            score += 100
        }

        drawSnake(snakeBody, snakeHead, ctx);
    }, 100);
    placeFruit(fruit, mapTile, sideLength);
};

function placeFruit(fruit, mapTile, sideLength) {
    fruit.x = Math.floor(Math.random() * (sideLength / mapTile)) * mapTile;
    fruit.y = Math.floor(Math.random() * (sideLength / mapTile)) * mapTile;
};

function random() {
    return Math.floor(Math.random() * (sideLength / 2 / mapTile)) * mapTile;
};

function drawSnake(snakeBody, snakeHead, ctx) {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    };

    if (snakeBody.length) {
        snakeBody[0] = { x: snakeHead.x, y: snakeHead.y };
    }

    ctx.fillStyle = snakeHead.color;
    snakeHead.x += snakeHead.speedX * mapTile;
    snakeHead.y += snakeHead.speedY * mapTile;
    ctx.fillRect(snakeHead.x, snakeHead.y, mapTile, mapTile);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, mapTile, mapTile)
    }
};

function gameover() {
    if (snakeHead.x < 0 || snakeHead.x > sideLength || snakeHead.y < 0 || snakeHead.y > sideLength) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeHead.x == snakeBody[i].x && snakeHead.y == snakeBody[i].y) {
            gameOver = true;
        }
    }
    return gameOver
};


function direction(e) {
    switch (e.code) {
        case 'ArrowUp':
            if (snakeHead.speedY !== 1) {
                snakeHead.speedX = 0;
                snakeHead.speedY = -1;
            }
            break;
        case 'ArrowRight':
            if (snakeHead.speedX !== -1) {
                snakeHead.speedX = 1;
                snakeHead.speedY = 0;
            }
            break;
        case 'ArrowDown':
            if (snakeHead.speedY !== -1) {
                snakeHead.speedX = 0;
                snakeHead.speedY = 1;
            }
            break;
        case 'ArrowLeft':
            if (snakeHead.speedX !== 1) {
                snakeHead.speedX = -1;
                snakeHead.speedY = 0;
            }
            break;
    }
};

function drawBoard(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, sideLength, sideLength);
};

function drawGrid(ctx, unit, maxSize) {
    ctx.strokeStyle = 'white';
    for (let i = 0; i < maxSize; i = i + unit) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(sideLength, i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, sideLength);
        ctx.stroke();
    }
};

