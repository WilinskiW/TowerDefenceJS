"use strict"

import { BASE_POS, gameMap, HEIGHT, SPAWN_POS, TILE_SIZE, WIDTH } from "./config.js";
import { moveEnemy } from "./enemy.js";
import { findPath } from "./pathfinding.js";
import { animateFps, drawEnemy, drawGrid, drawMap } from "./renderer.js";
import { startEnemyWaves, wave } from "./waveManager.js";


const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);
let enemies = [];

const app = document.getElementById("app");
const waveCounter = document.createElement("span");
waveCounter.textContent = `Wave: ${wave}`;
app.appendChild(waveCounter);

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
app.appendChild(canvas);
const ctx = canvas.getContext("2d");

startEnemyWaves(enemies, wave, (newWave) => refreshWaveCounter(waveCounter, newWave));

animateFps(() => drawScene(), 60);


function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, WIDTH, HEIGHT);
    drawMap(ctx, gameMap);

    enemies.forEach((enemy) => {
        if (enemy.x === BASE_POS.row * TILE_SIZE + TILE_SIZE / 2 && enemy.y === BASE_POS.col * TILE_SIZE + TILE_SIZE / 2) {
            enemies.splice(0, enemies.length, ...enemies.filter(enemyEl => enemyEl !== enemy));
        }
        moveEnemy(enemy, moves);
        drawEnemy(ctx, enemy.x, enemy.y);
    })
}


function refreshWaveCounter(waveCounter, wave){
    waveCounter.textContent = `Wave: ${wave}`;
}