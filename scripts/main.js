"use strict"

import { BASE_HEALTH, gameMap, HEIGHT, SPAWN_POS, START_GOLD, WIDTH } from "./config.js";
import { moveEnemy, reachBase } from "./enemy.js";
import { findPath } from "./pathfinding.js";
import { animateFps, drawEnemy, drawGameOver, drawGrid, drawMap, drawTower, drawTowerBullets } from "./renderer.js";
import { WaveManager } from "./waveManager.js";
import { handleTowerActions } from "./towerManager.js";
import { GoldSack } from "./goldSack.js";

let goldSack = new GoldSack();
let waveManager = new WaveManager();
let baseHealth = BASE_HEALTH;

const waveCounter = document.getElementById("wave");
waveCounter.textContent = waveManager.wave;

export const goldCounter = document.getElementById("gold");
goldCounter.textContent = goldSack.amountOfGold;

const baseHealthEl = document.getElementById("base");
baseHealthEl.textContent = baseHealth;

const buttons = document.getElementById("actions");
let selectedButton;
buttons.childNodes.forEach(btn => {
    btn.addEventListener("click", () => selectedButton = btn);
})

const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");

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
let animationController;
let enemies = [];
let towers = [];

startGame();

function startGame(){
    waveManager.startEnemyWaves(enemies, (newWave) => waveCounter.textContent = newWave);
    animationController = animateFps(() => drawScene(), 60);
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundCanvas, 0, 0); 

    if (baseHealth > 0) {
        enemies.forEach((enemy) => {
            if (reachBase(enemy)) {
                waveManager.removeEnemy(enemies, enemy);
                baseHealth -= 20;
                baseHealthEl.textContent = baseHealth;
            }

            if (enemy.health <= 0) {
                waveManager.removeEnemy(enemies, enemy);
                goldSack.amountOfGold++;
                goldCounter.textContent = goldSack.amountOfGold;
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

function resetGame(){
    goldSack.amountOfGold = START_GOLD;
    baseHealth = BASE_HEALTH;
    animationController.stop();
    waveManager.wave = 1;
    enemies = [];
    towers = [];
    waveCounter.textContent = waveManager.wave;
    baseHealthEl.textContent = baseHealth;
    startGame();
}

// debounce click
let debounceClick;
canvas.addEventListener("click", (e) => {
    clearTimeout(debounceClick);
    debounceClick = setTimeout(() => handleTowerActions(e, towers, selectedButton, goldSack), 200); // 200ms
});

resetBtn.addEventListener("click", () => resetGame());