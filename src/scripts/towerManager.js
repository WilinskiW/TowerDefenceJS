import { canvas } from "./main.js";
import {
    DAMAGE_UPGRADE_COST,
    gameMap,
    minCost,
    RANGE_UPGRADE_COST,
    ATTACK_SPEED_UPGRADE_COST,
    TILE_SIZE,
    TOWER_SIZE, NEW_TOWER_COST
} from "./config.js";
import { Tower } from "./tower.js";
import { goldCounter } from "./main.js";

export function handleTowerActions(e, towers, selectedButton, goldSack) {
    if (!selectedButton || goldSack.amountOfGold < minCost()) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const col = Math.floor(mouseX / TILE_SIZE);
    const row = Math.floor(mouseY / TILE_SIZE);

    const x = col * TILE_SIZE + TILE_SIZE / 2;
    const y = row * TILE_SIZE + TILE_SIZE / 2;

    console.log(`X: ${mouseX}, Y: ${mouseY}`);

    if (selectedButton.id === "tower" && goldSack.amountOfGold >= NEW_TOWER_COST) {
        placeTower(x, y, towers, row, col, mouseX, mouseY, goldSack);
    } else {
        upgradeTower(x, y, towers, selectedButton.id, goldSack);
    }
}

function placeTower(x, y, towers, row, col, rawX, rawY, goldSack) {
    if (findTowerByCoordinate(x, y, towers).length === 0 && gameMap[row][col] === 0) {
        towers.push(new Tower(rawX, rawY));
        spendGold(goldSack, NEW_TOWER_COST);
    }
}

function upgradeTower(x, y, towers, upgradeType, goldSack) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        const tower = foundTower[0];
        switch (upgradeType) {
            case "damage":
                if (goldSack.amountOfGold >= DAMAGE_UPGRADE_COST) {
                    tower.increaseDamage(0.5);
                    spendGold(goldSack, DAMAGE_UPGRADE_COST);
                }
                break;
            case "range":
                if (goldSack.amountOfGold >= RANGE_UPGRADE_COST) {
                    tower.increaseRange(TOWER_SIZE * 1.5);
                    spendGold(goldSack, RANGE_UPGRADE_COST);
                }
                break;
            case "speed":
                if (goldSack.amountOfGold >= ATTACK_SPEED_UPGRADE_COST) {
                    tower.increaseAttackSpeed(1);
                    spendGold(goldSack, ATTACK_SPEED_UPGRADE_COST);
                }
                break;
        }
        tower.tier++;
    }
}

function spendGold(goldSack, toTake){
    goldSack.amountOfGold -= toTake;
    goldCounter.textContent = goldSack.amountOfGold;
}

function findTowerByCoordinate(x, y, towers) {
    return towers.filter(tower => tower.x === x && tower.y === y);
}