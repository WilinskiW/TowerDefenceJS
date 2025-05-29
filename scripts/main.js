"use strict"

import { gameMap, HEIGHT, SPAWN_POS, TILE_SIZE, WIDTH } from "./config.js";
import { moveEnemy, reachBase } from "./enemy.js";
import { findPath } from "./pathfinding.js";
import { animateFps, drawEnemy, drawGrid, drawMap, drawTower, drawTowerBullets } from "./renderer.js";
import { startEnemyWaves, wave } from "./waveManager.js";
import { Tower } from "./tower.js";


const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);
let enemies = [];
let gold = 0;

const waveCounter = document.getElementById("wave");
waveCounter.textContent = wave;

const goldCounter = document.getElementById("gold");
goldCounter.textContent = gold;

const canvas = document.getElementById("scene");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");

startEnemyWaves(enemies, wave, (newWave) => waveCounter.textContent = newWave);

animateFps(() => drawScene(), 60);

let towers = [];

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, WIDTH, HEIGHT);
    drawMap(ctx, gameMap);

    enemies.forEach((enemy) => {
        if (reachBase(enemy)) {
            removeEnemy(enemies, enemy)
            console.log("Dotarłem do bazy!!!")
        }

        if(enemy.health <= 0){
            removeEnemy(enemies, enemy);
            gold++;
            goldCounter.textContent = gold;
        }
        
        moveEnemy(enemy, moves);
        drawEnemy(ctx, enemy.x, enemy.y);
    });

    towers.forEach((tower) => {
        if (tower.target) {
            tower.shootEnemy();
            if(tower.target) drawTowerBullets(ctx, tower.x, tower.y, tower.target.x, tower.target.y); // again null check
        }
        else{
            tower.findTarget(enemies);
        }
        drawTower(ctx, tower.x, tower.y, true);
    })
}

function removeEnemy(enemies, enemy){
    enemies.splice(0, enemies.length, ...enemies.filter(enemyEl => enemyEl !== enemy));
}

let mouseX;
let mouseY;

canvas.addEventListener("click", (e) => {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;

    const col = Math.floor(mouseX / TILE_SIZE);
    const x = col * TILE_SIZE + TILE_SIZE / 2;

    const row = Math.floor(mouseY /  TILE_SIZE);
    const y= row * TILE_SIZE + TILE_SIZE / 2;
    
    const tileFree = towers.filter(tower => tower.x === x && tower.y === y).length === 0;
    
    if(tileFree && gameMap[row][col] === 0){
        towers.push(new Tower(mouseX, mouseY));    
    }
});