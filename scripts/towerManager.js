import { canvas } from "./main.js";
import { gameMap, TILE_SIZE, TOWER_SIZE } from "./config.js";
import { Tower } from "./tower.js";

export function handleTowerActions(e, towers, selectedButton) {
    if (!selectedButton) return;

    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    const col = Math.floor(mouseX / TILE_SIZE);
    const row = Math.floor(mouseY / TILE_SIZE);

    const x = col * TILE_SIZE + TILE_SIZE / 2;
    const y = row * TILE_SIZE + TILE_SIZE / 2;

    if (selectedButton.id === "tower") {
        placeTower(x, y, towers, row, col, mouseX, mouseY);
    } else {
        upgradeTower(x, y, towers, selectedButton.id);
    }
}

function placeTower(x, y, towers, row, col, rawX, rawY) {
    if (findTowerByCoordinate(x, y, towers).length === 0 && gameMap[row][col] === 0) {
        towers.push(new Tower(rawX, rawY));
    }
}

function upgradeTower(x, y, towers, upgradeType) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        const tower = foundTower[0];
        switch (upgradeType) {
            case "damage":
                tower.increaseDamage(0.5);
                break;
            case "range":
                tower.increaseRange(TOWER_SIZE * 1.5);
                break;
            case "speed":
                tower.increaseAttackSpeed(1);
                break;
        }
        tower.tier++;
    }
}


function findTowerByCoordinate(x, y, towers) {
    return towers.filter(tower => tower.x === x && tower.y === y);
}