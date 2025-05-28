import { TILE_SIZE, SPAWN_POS, ENEMY_DEFAULT_SPEED } from "./config.js";

export class Enemy {
    #x = SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2;
    #y = SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2;
    #currentMoveIndex = 0
    #speed = ENEMY_DEFAULT_SPEED;

    constructor() {
    }

    set x(value) {
        this.#x = value;
    }

    set y(value) {
        this.#y = value;
    }

    set currentMoveIndex(value) {
        this.#currentMoveIndex = value;
    }

    set speed(value) {
        this.#speed = value;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get speed() {
        return this.#speed;
    }

    get currentMoveIndex() {
        return this.#currentMoveIndex;
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