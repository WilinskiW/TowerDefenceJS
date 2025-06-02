"use strict";

import {
    AUTOSAVE_TIME_MS,
    BASE_HEALTH,
    ENEMY_DAMAGE,
    gameMap,
    HEIGHT,
    SPAWN_POS,
    START_GOLD,
    TILE_SIZE,
    WIDTH
} from "./config.js";
import { Enemy } from "./enemy.js";
import { findPath } from "./pathfinding.js";
import { animateFps, drawEnemy, drawGameOver, drawGrid, drawMap, drawTower, drawTowerBullets } from "./renderer.js";
import { WaveManager } from "./waveManager.js";
import { handleTowerActions } from "./towerManager.js";
import { GoldSack } from "./goldSack.js";
import { Tower } from "./tower.js";

const goldSack = new GoldSack();
let waveManager = new WaveManager();
let baseHealth = BASE_HEALTH;
let enemies = [];
let towers = [];
let showRadius = true;
const moves = findPath(SPAWN_POS.row, SPAWN_POS.col);

const saved = localStorage.getItem("save");
if (saved) {
    const data = JSON.parse(saved);
    goldSack.amountOfGold = data.gold;
    baseHealth = data.baseHealth;
    waveManager.wave = data.wave;
    waveManager.addedEnemies = data.addedEnemies;

    enemies = data.enemies.map(e => {
        const enemy = new Enemy(e.speed, e.health);
        enemy.currentMoveIndex = e.currentMoveIndex;

        const currentMove = moves[e.currentMoveIndex];
        if (currentMove) {
            enemy.x = currentMove.col * TILE_SIZE + TILE_SIZE / 2;
            enemy.y = currentMove.row * TILE_SIZE + TILE_SIZE / 2;
        }

        return enemy;
    });

    towers = data.towers.map(t => {
        const tower = new Tower(t.x, t.y);
        tower.range = t.range;
        tower.attackSpeed = t.attackSpeed;
        tower.damage = t.damage;
        tower.tier = t.tier;
        return tower;
    });
}

const waveCounter = document.getElementById("wave");
waveCounter.textContent = waveManager.wave;

export const goldCounter = document.getElementById("gold");
goldCounter.textContent = goldSack.amountOfGold;

const baseHealthEl = document.getElementById("base");
baseHealthEl.textContent = baseHealth;

const buttons = document.getElementById("actions");
let selectedButton;
buttons.childNodes.forEach(btn => {
    if (btn.nodeType === Node.ELEMENT_NODE) { // Ensure it's an element node
        btn.addEventListener("click", () => {
            buttons.childNodes.forEach(b => {
                if (b.nodeType === Node.ELEMENT_NODE) b.classList.remove("selected");
            });

            btn.classList.add("selected");

            selectedButton = btn;
        });
    }
});

const resetBtn = document.getElementById("reset");

const saveBtn = document.getElementById("save");
const saveBtnContent = saveBtn.innerHTML;

const radiusBtn = document.getElementById("radius");

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

let animationController;

startGame();

function startGame() {
    waveManager.startEnemyWaves(enemies, (newWave) => waveCounter.textContent = newWave);
    animationController = animateFps(() => drawScene(), 60);
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundCanvas, 0, 0);

    if (baseHealth > 0) {
        enemies.forEach((enemy) => {
            if (enemy.hasReachBase()) {
                waveManager.removeEnemy(enemies, enemy);
                baseHealth -= ENEMY_DAMAGE;
                baseHealthEl.textContent = baseHealth;
            }

            if (enemy.health <= 0) {
                waveManager.removeEnemy(enemies, enemy);
                goldSack.amountOfGold++;
                goldCounter.textContent = goldSack.amountOfGold;
            }

            enemy.moveToBase(moves);
            drawEnemy(ctx, enemy.x, enemy.y);
        });

        towers.forEach((tower) => {
            if (tower.target) {
                tower.shootEnemy();
                if (tower.target) // Double "if" because tower can lose sight of the target, because enemy is consistently moving
                    drawTowerBullets(ctx, tower.x, tower.y, tower.target.x, tower.target.y, tower.attackSpeed);
            } else {
                tower.findTarget(enemies);
            }
            drawTower(ctx, tower.x, tower.y, tower.range, showRadius);
        });
    } else {
        drawGameOver(ctx);
    }
}

setInterval(() => saveGame(), AUTOSAVE_TIME_MS);

function resetGame() {
    localStorage.removeItem("save");
    goldSack.amountOfGold = START_GOLD;
    baseHealth = BASE_HEALTH;
    animationController.stop();
    waveManager = new WaveManager();
    enemies = [];
    towers = [];
    goldCounter.textContent = goldSack.amountOfGold;
    waveCounter.textContent = waveManager.wave;
    baseHealthEl.textContent = baseHealth;
    startGame();
}

function saveGame() {
    const gameData = {
        gold: goldSack.amountOfGold,
        baseHealth: baseHealth,
        wave: waveManager.wave,
        addedEnemies: waveManager.addedEnemies,
        enemies: enemies.map(e => ({
            x: e.x,
            y: e.y,
            currentMoveIndex: e.currentMoveIndex,
            speed: e.speed,
            health: e.health


        })),
        towers: towers.map((t) => ({
            x: t.x,
            y: t.y,
            range: t.range,
            attackSpeed: t.attackSpeed,
            damage: t.damage,
            tier: t.tier
        })),
    };

    localStorage.setItem("save", JSON.stringify(gameData));
}

// debounce click
let canvasDebounceClick;
canvas.addEventListener("click", (e) => {
    clearTimeout(canvasDebounceClick);
    canvasDebounceClick = setTimeout(() => {
        handleTowerActions(e, towers, selectedButton, goldSack);
        selectedButton.classList.remove("selected");
        selectedButton = undefined;
    }, 200); // 200ms
});

resetBtn.addEventListener("click", () => resetGame());

radiusBtn.addEventListener("click", () => showRadius = !showRadius);

let saveDebounceClick;
saveBtn.addEventListener("click", () => {
    saveBtn.textContent = "Zapisano...";
    clearTimeout(saveDebounceClick);
    saveDebounceClick = setTimeout(() => {
        saveGame();
        saveBtn.innerHTML = saveBtnContent;
    }, 500);
});
