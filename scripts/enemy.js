import { TILE_SIZE, SPAWN_POS } from "./config.js";

export class Enemy {
    #x = SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2;
    #y = SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2;
    #currentMoveIndex = 0

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

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
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

    const speed = 2;

    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) {
        enemy.x = targetX;
        enemy.y = targetY;
        enemy.currentMoveIndex++;
    } else {
        enemy.x += (dx / distance) * speed;
        enemy.y += (dy / distance) * speed;
    }
}