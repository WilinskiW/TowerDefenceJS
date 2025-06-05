import { TILE_SIZE, SPAWN_POS, ENEMY_DEFAULT_SPEED, BASE_POS } from "./config.js";

/**
 * Reprezentuje przeciwnika na mapie
 */
export class Enemy {
    /**
     * Pozycja X przeciwnika w pikselach.
     * @private
     * @type {number}
     */
    #x = SPAWN_POS.col * TILE_SIZE + TILE_SIZE / 2;

    /**
     * Pozycja Y przeciwnika w pikselach.
     * @private
     * @type {number}
     */
    #y = SPAWN_POS.row * TILE_SIZE + TILE_SIZE / 2;

    /**
     * Aktualny indeks ruchu na ścieżce.
     * @private
     * @type {number}
     */
    #currentMoveIndex = 0;

    /**
     * Prędkość ruchu przeciwnika.
     * @private
     * @type {number}
     */
    #speed = ENEMY_DEFAULT_SPEED;

    /**
     * Aktualne zdrowie przeciwnika.
     * @private
     * @type {number}
     */
    #health = 100;

    /**
     * Tworzy nowego przeciwnika.
     * @param {number} speed Prędkość przeciwnika.
     * @param {number} health Zdrowie przeciwnika.
     */
    constructor(speed, health) {
        this.#speed = speed;
        this.#health = health;
    }

    /**
     * Przesuwa przeciwnika do bazy zgodnie z podaną ścieżką ruchu.
     * @param {Array<{row: number, col: number}>} moves - Tablica kroków ścieżki.
     */
    moveToBase(moves) {
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

    /**
     * Sprawdza, czy przeciwnik dotarł do bazy.
     * @returns {boolean} `true` jeśli przeciwnik jest na pozycji bazy, `false` w przeciwnym wypadku.
     */
    hasReachBase() {
        return this.x === BASE_POS.row * TILE_SIZE + TILE_SIZE / 2 && this.y === BASE_POS.col * TILE_SIZE + TILE_SIZE / 2;
    }

    /**
     * Pozycja X przeciwnika.
     * @type {number}
     */
    get x() {
        return this.#x;
    }
    set x(value) {
        this.#x = value;
    }

    /**
     * Pozycja Y przeciwnika.
     * @type {number}
     */
    get y() {
        return this.#y;
    }
    set y(value) {
        this.#y = value;
    }

    /**
     * Aktualny indeks ruchu na ścieżce.
     * @type {number}
     */
    get currentMoveIndex() {
        return this.#currentMoveIndex;
    }
    set currentMoveIndex(value) {
        this.#currentMoveIndex = value;
    }

    /**
     * Prędkość przeciwnika.
     * @type {number}
     */
    get speed() {
        return this.#speed;
    }
    set speed(value) {
        this.#speed = value;
    }

    /**
     * Zdrowie przeciwnika.
     * @type {number}
     */
    get health() {
        return this.#health;
    }
    set health(value) {
        this.#health = value;
    }
}
