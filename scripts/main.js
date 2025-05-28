"use strict"

import {BASE_POS, gameMap, HEIGHT, SPAWN_POS, TILE_SIZE, WIDTH} from "./config.js";
import {Enemy, moveEnemy} from "./enemy.js";
import {findPath} from "./pathfinding.js";
import {animateFps, drawEnemy, drawGrid, drawMap} from "./renderer.js";
import {startEnemyWaves} from "./waveManager.js";


const app = document.getElementById("app");
const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
app.appendChild(canvas);
const ctx = canvas.getContext("2d");

const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);
let enemies = [new Enemy()];
let wave = 1;

startEnemyWaves(enemies, wave, () => {
    console.log("Koniec fali");
}, 1000) // 1s


animateFps(() => drawScene(), 60);


function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, WIDTH, HEIGHT);
    drawMap(ctx, gameMap);

    enemies.forEach((enemy) => {
        if (enemy.x === BASE_POS.row * TILE_SIZE + TILE_SIZE / 2 && enemy.y === BASE_POS.col * TILE_SIZE + TILE_SIZE / 2) {
            enemies = enemies.filter(enemyEl => enemyEl !== enemy);
        }
        moveEnemy(enemy, moves);
        drawEnemy(ctx, enemy.x, enemy.y);
    })
}