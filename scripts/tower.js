import { gameMap, TILE_SIZE, TOWER_SIZE } from "./config.js";
import { canvas } from "./main.js";

let mouseX;
let mouseY;

export class Tower {
    #x;
    #y;
    #range = TOWER_SIZE * 4;
    #attackSpeed = 0.25;
    #damage = 1.25;
    #tier = 1;
    #target = null;

    constructor(x, y) {
        this.#x = this.#adjustX(x);
        this.#y = this.#adjustY(y);
    }

    findTarget(enemies) {
        enemies.forEach((enemy) => {
            if (this.#isInTheZone(enemy)) {
                if (!this.#target) {
                    this.#target = enemy;
                }
            }
        });
    }

    shootEnemy() {
        if (this.target && this.#isInTheZone(this.target) && this.target.health > 0) {
            this.target.health -= this.damage;
        } else {
            this.target = null;
        }
    }

    increaseDamage(value) {
        this.damage += value;
    }

    increaseRange(value) {
        this.range += value;
    }

    increaseAttackSpeed(value) {
        this.#attackSpeed += value;
    }

    #isInTheZone(enemy) {
        return enemy.x <= this.x + this.range &&
            enemy.x >= this.x - this.range &&
            enemy.y <= this.y + this.range &&
            enemy.y >= this.y - this.range
    }

    #adjustX(x) {
        const col = Math.floor(x / TILE_SIZE);
        return col * TILE_SIZE + TILE_SIZE / 2;
    }

    #adjustY(y) {
        const row = Math.floor(y / TILE_SIZE);
        return row * TILE_SIZE + TILE_SIZE / 2;
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = this.#adjustX(value);
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = this.#adjustY(value);
    }

    get range() {
        return this.#range;
    }

    set range(value) {
        this.#range = value;
    }

    get attackSpeed() {
        return this.#attackSpeed;
    }

    set attackSpeed(value) {
        this.#attackSpeed = value;
    }

    get target() {
        return this.#target;
    }

    set target(value) {
        this.#target = value;
    }


    get damage() {
        return this.#damage;
    }

    set damage(value) {
        this.#damage = value;
    }


    get tier() {
        return this.#tier;
    }

    set tier(value) {
        this.#tier = value;
    }
}

export function handleTowerActions(e, towers, selectedButton) {
    console.log("selected button! ", selectedButton)
    if (!selectedButton) return;

    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;

    const col = Math.floor(mouseX / TILE_SIZE);
    const x = col * TILE_SIZE + TILE_SIZE / 2;

    const row = Math.floor(mouseY / TILE_SIZE);
    const y = row * TILE_SIZE + TILE_SIZE / 2;

    switch (selectedButton.id) {
        case "tower":
            placeTower(x, y, towers, row, col);
            break;
        case "damage":
            upgradeDamage(x, y, towers);
            break;
        case "range":
            upgradeRange(x, y, towers);
            break;
        case "speed":
            upgradeAttackSpeed(x, y, towers);
            break;
    }
}

function placeTower(x, y, towers, row, col) {
    if (findTowerByCoordinate(x, y, towers).length === 0 && gameMap[row][col] === 0) {
        towers.push(new Tower(mouseX, mouseY));
    }
}

function upgradeDamage(x, y, towers) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        foundTower[0].increaseDamage(0.5);
        foundTower[0].tier++;
    }
}

function upgradeRange(x, y, towers) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        foundTower[0].increaseRange(TOWER_SIZE * 1.5);
        foundTower[0].tier++;
    }
}

function upgradeAttackSpeed(x, y, towers) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        foundTower[0].increaseAttackSpeed(1);
        foundTower[0].tier++;
    }
}


function findTowerByCoordinate(x, y, towers) {
    return towers.filter(tower => tower.x === x && tower.y === y);
}