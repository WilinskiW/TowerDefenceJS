"use strict"

const WIDTH = 1000;
const HEIGHT = 800;
const TILE_SIZE = 100;
const ENEMY_SIZE = 30;
const SPAWN_POS = {row: 1, col: 0};
const BASE_POS = {row: 0, col: 6};

// Game map for 10 x 8
/*
       col:
 row: index
*/
const gameMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0], // 2
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0], // 3
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 0], // 4
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 5
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0], // 6
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 0], // 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 8
]


const app = document.getElementById("app");

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

app.appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.save();
const enemy = {
    x: SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2,
    y: SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2,
    currentMoveIndex: 0
};

const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);
animateFps(() => drawScene(), 60);
moveEnemy(moves);

function animateFps(callbackFn, fps = 60) {
    let now;
    let then = Date.now();
    let delta = 0;
    let interval = 1000 / fps;

    const update = () => {
        requestAnimationFrame(update);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            callbackFn();
            then = now - (delta % interval);
        }
    }

    update();
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(WIDTH, HEIGHT);
    drawMap(gameMap);
    moveEnemy(moves); 
    drawEnemy(enemy.x, enemy.y);
}

function drawGrid(width, height) {
    ctx.strokeStyle = "black";
    for (let x = 0; x <= width; x += TILE_SIZE) {
        for (let y = 0; y <= height; y += TILE_SIZE) {
            ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    }
    ctx.restore();
}

function drawMap(gameMap) {
    ctx.globalCompositeOperation = "destination-over";
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            if (gameMap[row][col] === 0) {
                ctx.fillStyle = "#138510";
            } else {
                ctx.fillStyle = "#907830";
            }
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    ctx.restore();
}

function drawEnemy(xPos, yPos) {
    ctx.globalCompositeOperation = "source-over";
    moveEnemy(moves)

    ctx.beginPath();
    ctx.arc(xPos, yPos, ENEMY_SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.restore();
}

function moveEnemy(moves) {
    if (enemy.currentMoveIndex >= moves.length) return;

    const move = moves[enemy.currentMoveIndex];

    const targetX = move.col * TILE_SIZE + TILE_SIZE / 2;
    const targetY = move.row * TILE_SIZE + TILE_SIZE / 2;

    const speed = 1;

    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) {
        enemy.x = targetX;
        enemy.y = targetY;
        enemy.currentMoveIndex++;
    } else {
        enemy.x += (dx / distance) * speed;
        enemy.y += (dy / distance) * speed;
    }
}

function findPath(startRow, startCol) {
    const moves = [];

    if (gameMap[startRow][startCol] === 0) {
        throw new Error("Cant be placed at grass!");
    }

    const isReturnToPreviousMove = (previousMove, row, col) => {
        if (!previousMove) {
            return false;
        }
        return previousMove.col === col && previousMove.row === row;
    }

    let row = startRow;
    let col = startCol;
    let previousMove;
    let counter = 0;

    while (row !== BASE_POS.row || col !== BASE_POS.col) {
        previousMove = moves.at(-2);

        // Check NORTH
        if (row - 1 >= 0 && !isReturnToPreviousMove(previousMove, row - 1, col) && gameMap[row - 1][col] === 1) {
            row--;
            moves.push({row, col, xMove: 0, yMove: -TILE_SIZE});
        }
        // Check EAST
        else if (col + 1 < gameMap[0].length && !isReturnToPreviousMove(previousMove, row, col + 1) && gameMap[row][col + 1] === 1) {
            col++;
            moves.push({row, col, xMove: TILE_SIZE, yMove: 0});
        }
        // Check SOUTH
        else if (row + 1 < gameMap.length && !isReturnToPreviousMove(previousMove, row + 1, col) && gameMap[row + 1][col] === 1) {
            row++;
            moves.push({row, col, xMove: 0, yMove: TILE_SIZE});
        }
        // Check WEST 
        else if (col - 1 >= 0 && !isReturnToPreviousMove(previousMove, row, col - 1) && gameMap[row][col - 1] === 1) {
            col--;
            moves.push({row, col, xMove: -TILE_SIZE, yMove: 0});
        } else {
            break;
        }

        counter++;
        if (counter > 100) {
            console.warn("Pathfinding stopped after 100 moves.");
            break;
        }
    }

    console.log("Moves:", moves);

    return moves;
}