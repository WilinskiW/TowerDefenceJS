import { TILE_SIZE, TOWER_SIZE } from "./config.js";

export class Tower {
    #x;
    #y;
    #range = TOWER_SIZE * 4;
    #shootSpeed = 1;
    #target = null;

    constructor(x, y) {
        this.#x = this.#adjustX(x);
        this.#y = this.#adjustY(y);
    }

    findTarget(enemies) {
        enemies.forEach((enemy) => {
            if (this.#isInTheZone(enemy)) {
                if(!this.#target){
                    this.#target = enemy;
                }
            }
        });
    }

    shootEnemy() {
        if(this.target && this.#isInTheZone(this.target)){
            console.log(`TARGET: x: ${this.target.x}, y: ${this.target.y}`);
        }
        else {
            console.log("Lose sight of target");
            this.target = null;
        }
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

    get shootSpeed() {
        return this.#shootSpeed;
    }

    set shootSpeed(value) {
        this.#shootSpeed = value;
    }

    get target() {
        return this.#target;
    }

    set target(value) {
        this.#target = value;
    }
}