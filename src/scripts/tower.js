import { TILE_SIZE, TOWER_SIZE } from "./config.js";

/**
 * Klasa reprezentuje wieżę
 */
export class Tower {
    /**
     * Pozycja X wieży w pikselach.
     * @private
     * @type {number}
     */
    #x;

    /**
     * Pozycja Y wieży w pikselach.
     * @private
     * @type {number}
     */
    #y;

    /**
     * Zasięg wieży określająca wykrywanie przeciwników.
     * @private
     * @type {number}
     */
    #range = TOWER_SIZE * 4;

    /**
     * Prędkość ataku.
     * @private
     * @type {number}
     */
    #attackSpeed = 0.25;

    /**
     * Zadawane obrażenia wrogom
     * @private
     * @type {number}
     */
    #damage = 1;

    /**
     * Poziom ulepszenie wieży. Maksymalnie można ulepszyć do 3 razy.
     * @private
     * @type {number}
     */
    #tier = 1;

    /**
     * Obecny ostrzeliwany wróg
     * @private
     * @type {Enemy | null}
     */
    #target = null;

    constructor(x, y) {
        this.#x = this.#adjustX(x);
        this.#y = this.#adjustY(y);
    }

    /**
     * Znajdź przeciwnika w zasięgu
     * @param {Enemy[]} enemies Tablica wszystkich przeciwnków na mapie
     */
    findTarget(enemies) {
        enemies.forEach((enemy) => {
            if (this.#isInTheZone(enemy) && !this.#target) {
                this.#target = enemy;
            }
        });
    }

    /**
     * Zaatakuj obecny cel.
     */
    shootEnemy() {
        if (this.target && this.#isInTheZone(this.target) && this.target.health > 0) {
            this.target.health -= this.damage;
        } else {
            this.target = null;
        }
    }

    /**
     * Zwiększ siłę ataku
     * @param value Wartość dodawana do obecnej
     */
    increaseDamage(value) {
        this.damage += value;
    }

    /**
     * Zwiększ zasięg
     * @param value Wartość dodawana do obecnej
     */
    increaseRange(value) {
        this.range += value;
    }

    /**
     * Zwiększ prędkość ataku
     * @param value Wartość dodawana do obecnej
     */
    increaseAttackSpeed(value) {
        this.#attackSpeed += value;
    }

    /**
     * Funkcja sprawdza czy przeciwnik jest w strefie wieży
     * @param enemy {Enemy} Sprawdzany przeciwnik
     */
    #isInTheZone(enemy) {
        return enemy.x <= this.x + this.range &&
            enemy.x >= this.x - this.range &&
            enemy.y <= this.y + this.range &&
            enemy.y >= this.y - this.range;
    }

    /**
     * Dostosuj x tak, aby był na środku osi X na polu siatki
     * @param x Pozycja x
     * @returns {number} Wyśrodkowana pozycja X na polu siatki
     */
    #adjustX(x) {
        const col = Math.floor(x / TILE_SIZE);
        return col * TILE_SIZE + TILE_SIZE / 2;
    }

    /**
     * Dostosuj y tak, aby był na środku osi Y na polu siatki
     * @param y Pozycja y
     * @returns {number} Wyśrodkowana pozycja Y na polu siatki
     */
    #adjustY(y) {
        const row = Math.floor(y / TILE_SIZE);
        return row * TILE_SIZE + TILE_SIZE / 2;
    }

    /**
     * Pozycja X wieży
     * @returns {number}
     */
    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = this.#adjustX(value);
    }

    /**
     * Pozycja Y wieży
     * @returns {number}
     */
    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = this.#adjustY(value);
    }

    /**
     * Zasięg wieży
     * @returns {number}
     */
    get range() {
        return this.#range;
    }

    set range(value) {
        this.#range = value;
    }

    /**
     * Prędkość ataku wieży
     * @returns {number}
     */
    get attackSpeed() {
        return this.#attackSpeed;
    }

    set attackSpeed(value) {
        this.#attackSpeed = value;
    }

    /**
     * Aktualny cel
     * @returns {number}
     */
    get target() {
        return this.#target;
    }

    set target(value) {
        this.#target = value;
    }


    /**
     * Obrażenia zadawane wrogom
     * @returns {number}
     */
    get damage() {
        return this.#damage + this.#attackSpeed;
    }

    set damage(value) {
        this.#damage = value;
    }

    /**
     * Poziom ulepszenia
     * @returns {number}
     */
    get tier() {
        return this.#tier;
    }

    set tier(value) {
        this.#tier = value;
    }
}