import { Enemy } from "./enemy.js";
import { ENEMY_DEFAULT_SPEED, SPAWN_INTERVAL_TIME_MS, WAVE_BREAK_TIME_MS } from "./config.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Klasa zarządzająca falami przeciwników w grze.
 * Generuje przeciwników, nadzoruje ich pojawianie się i informuje o zakończeniu fali.
 */
export class WaveManager {
    /**
     * Aktualna fala
     * @type {number}
     */
    #wave = 1;

    /**
     * Liczba dodanych przeciwników w aktualnej fali
     * @type {number}*/
    #addedEnemies = 0;

    /**
     * Czy fala aktualnie trwa
     * @type {boolean}
     * */
    #waveRunning = false;

    constructor() {}

    /**
     * Uruchamia fale przeciwników.
     * @param {Enemy[]} enemiesArray Tablica, do której dodawani są nowi przeciwnicy.
     * @param {(wave: number) => void} onWaveEnd Funkcja wywoływana po zakończeniu każdej fali.
     * @returns {Promise<void>}
     */
    async startEnemyWaves(enemiesArray, onWaveEnd) {
        if (this.#waveRunning) return;
        this.#waveRunning = true;

        try {
            const maxEnemies = this.#wave * 10;

            while (this.#addedEnemies < maxEnemies) {
                const newEnemy = new Enemy(
                    ENEMY_DEFAULT_SPEED + this.#wave / 2,
                    100 * this.#wave
                );
                enemiesArray.push(newEnemy);
                this.#addedEnemies++;

                await delay(1000);
            }

            while (enemiesArray.length > 0) {
                await delay(SPAWN_INTERVAL_TIME_MS);
            }

            this.#addedEnemies = 0;
            this.#wave++;
            this.#waveRunning = false;

            await delay(WAVE_BREAK_TIME_MS);
            onWaveEnd(this.#wave);

            this.startEnemyWaves(enemiesArray, onWaveEnd);
            
        } catch (err) {
            console.error("Błąd podczas uruchamiania fali:", err);
            this.#waveRunning = false;
        }
    }

    /**
     * Usuwa przeciwnika z tablicy.
     * @param {Enemy[]} enemies Tablica aktywnych przeciwników.
     * @param {Enemy} enemy Przeciwnik do usunięcia.
     */
    removeEnemy(enemies, enemy) {
        try {
            const updatedEnemies = enemies.filter(e => e !== enemy);
            enemies.splice(0, enemies.length, ...updatedEnemies);
        } catch (err) {
            console.error("Błąd podczas usuwania przeciwnika:", err);
        }
    }

    /**
     * Zwraca liczbę dodanych przeciwników w aktualnej fali.
     * @returns {number}
     */
    get addedEnemies() {
        return this.#addedEnemies;
    }

    /**
     * Ustawia liczbę dodanych przeciwników.
     * @param {number} value
     */
    set addedEnemies(value) {
        this.#addedEnemies = value;
    }

    /**
     * Zwraca numer aktualnej fali.
     * @returns {number}
     */
    get wave() {
        return this.#wave;
    }

    /**
     * Ustawia numer aktualnej fali.
     * @param {number} value
     */
    set wave(value) {
        this.#wave = value;
    }
}
