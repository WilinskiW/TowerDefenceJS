import { TILE_SIZE, SPAWN_POS, ENEMY_DEFAULT_SPEED, BASE_POS } from "./config.js";

export class Enemy {
    #x = SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2;
    #y = SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2;
    #currentMoveIndex = 0
    #speed = ENEMY_DEFAULT_SPEED;
    #health = 100;

    constructor() {
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

export function moveEnemy(enemy, moves) {
    if (enemy.currentMoveIndex >= moves.length) return;

    const move = moves[enemy.currentMoveIndex];

    const targetX = move.col * TILE_SIZE + TILE_SIZE / 2;
    const targetY = move.row * TILE_SIZE + TILE_SIZE / 2;
    
    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < enemy.speed) {
        enemy.x = targetX;
        enemy.y = targetY;
        enemy.currentMoveIndex++;
    } else {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
    }
}

export function reachBase(enemy){
    return enemy.x === BASE_POS.row * TILE_SIZE + TILE_SIZE / 2 && enemy.y === BASE_POS.col * TILE_SIZE + TILE_SIZE / 2;
}