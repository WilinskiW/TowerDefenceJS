"use strict"

import { BASE_HEALTH, gameMap, HEIGHT, SPAWN_POS, WIDTH } from "./config.js";
import { moveEnemy, reachBase } from "./enemy.js";
import { findPath } from "./pathfinding.js";
import { animateFps, drawEnemy, drawGameOver, drawGrid, drawMap, drawTower, drawTowerBullets } from "./renderer.js";
import { removeEnemy, startEnemyWaves, wave } from "./waveManager.js";
import { handleTowerActions } from "./towerManager.js";

let gold = 0;
let baseHealth = BASE_HEALTH;

const waveCounter = document.getElementById("wave");
waveCounter.textContent = wave;

const goldCounter = document.getElementById("gold");
goldCounter.textContent = gold;

const baseHealthEl = document.getElementById("base");
baseHealthEl.textContent = baseHealth;

const buttons = document.getElementById("actions");
let selectedButton;
buttons.childNodes.forEach(btn => {
    btn.addEventListener("click", () => selectedButton = btn);
})

// Prepare static grid and map
const backgroundCanvas = document.createElement("canvas");
backgroundCanvas.width = WIDTH;
backgroundCanvas.height = HEIGHT;
const bgCtx = backgroundCanvas.getContext("2d");

drawGrid(bgCtx);
drawMap(bgCtx, gameMap);

// Prepare scene

export const canvas = document.getElementById("scene");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");

const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);
let enemies = [];

startEnemyWaves(enemies, wave, (newWave) => waveCounter.textContent = newWave);

animateFps(() => drawScene(), 60);

let towers = [];

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundCanvas, 0, 0); 

    if (baseHealth > 0) {
        enemies.forEach((enemy) => {
            if (reachBase(enemy)) {
                removeEnemy(enemies, enemy);
                baseHealth -= 20;
                baseHealthEl.textContent = baseHealth;
            }

            if (enemy.health <= 0) {
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
                if (tower.target)
                    drawTowerBullets(ctx, tower.x, tower.y, tower.target.x, tower.target.y, tower.attackSpeed);
            } else {
                tower.findTarget(enemies);
            }
            drawTower(ctx, tower.x, tower.y, tower.range, true);
        });
    } else {
        drawGameOver(ctx);
    }
}

// debounce click
let debounceClick;
canvas.addEventListener("click", (e) => {
    clearTimeout(debounceClick);
    debounceClick = setTimeout(() => handleTowerActions(e, towers, selectedButton), 200); // 200ms
});