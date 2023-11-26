const gameBoard = document.getElementById('game_box');
let sideLength = 600;
let mapTile = 25;
let ctx = gameBoard.getContext('2d');

gameBoard.width = sideLength;
gameBoard.height = sideLength;

let snakeHead = { x: 50, y: 50, speedX: 0, speedY: 0, color: 'lime' };
const snakeBody = [];
const fruit = { x: 0, y: 0, color: 'red' };
let gameOver = false;



window.addEventListener('keydown', direction);
setInterval(update, 100);
placeFruit();

function update() {
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sideLength, sideLength);
        return
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, sideLength, sideLength);
    ctx.strokeStyle = 'white';
    drawGrid(mapTile, sideLength);

    ctx.fillStyle = fruit.color;
    ctx.fillRect(fruit.x, fruit.y, mapTile, mapTile);
    if (snakeHead.x == fruit.x && snakeHead.y == fruit.y) {
        snakeBody.push({ x: fruit.x, y: fruit.y })
        placeFruit();
    }

    drawSnake();
    gameover();
}


function placeFruit() {
    fruit.x = Math.floor(Math.random() * (sideLength / mapTile)) * mapTile;
    fruit.y = Math.floor(Math.random() * (sideLength / mapTile)) * mapTile;
}

function drawSnake() {
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
}

function gameover() {
    if (snakeHead.x < 0 || snakeHead.x > sideLength || snakeHead.y < 0 || snakeHead.y > sideLength) {
        gameOver = true;
    } else{
        gameOver = false;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeHead.x == snakeBody[i].x && snakeHead.y == snakeBody[i].y) {
            gameOver = true;
        } else{
            gameOver = false;
        }
    }
    return gameOver
}

function direction(event) {
    switch (event.code) {
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
}

function drawGrid(unit, maxSize) {
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
}

