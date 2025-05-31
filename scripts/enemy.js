import { TILE_SIZE, SPAWN_POS, ENEMY_DEFAULT_SPEED, BASE_POS } from "./config.js";

export class Enemy {
    #x = SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2;
    #y = SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2;
    #currentMoveIndex = 0
    #speed = ENEMY_DEFAULT_SPEED;
    #health = 100;

    constructor(speed, health) {
        this.#speed = speed;
        this.#health = health;
    }

    moveToBase(moves){
        if (this.currentMoveIndex >= moves.length) return;

        const move = moves[this.currentMoveIndex];

        const targetX = move.col * TILE_SIZE + TILE_SIZE / 2;
        const targetY = move.row * TILE_SIZE + TILE_SIZE / 2;

        const dx = targetX - this.x;
        const dy = targetY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.x = targetX;
            this.y = targetY;
            this.#currentMoveIndex++;
        } else {
            this.#x += (dx / distance) * this.speed;
            this.#y += (dy / distance) * this.speed;
        }
    }

    hasReachBase(){
        return this.x === BASE_POS.row * TILE_SIZE + TILE_SIZE / 2 && this.y === BASE_POS.col * TILE_SIZE + TILE_SIZE / 2;
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    get currentMoveIndex() {
        return this.#currentMoveIndex;
    }

    set currentMoveIndex(value) {
        this.#currentMoveIndex = value;
    }

    get speed() {
        return this.#speed;
    }

    set speed(value) {
        this.#speed = value;
    }

    get health() {
        return this.#health;
    }

    set health(value) {
        this.#health = value;
    }
}