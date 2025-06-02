import { Enemy } from "./enemy.js";
import { ENEMY_DEFAULT_SPEED, SPAWN_INTERVAL_TIME_MS, WAVE_BREAK_TIME_MS } from "./config.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export class WaveManager {
    #wave = 1;
    #addedEnemies = 0;
    #waveRunning = false;

    constructor() {}

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

    removeEnemy(enemies, enemy) {
        try {
            const updatedEnemies = enemies.filter(e => e !== enemy);
            enemies.splice(0, enemies.length, ...updatedEnemies);
        } catch (err) {
            console.error("Błąd podczas usuwania przeciwnika:", err);
        }
    }

    get addedEnemies() {
        return this.#addedEnemies;
    }

    set addedEnemies(value) {
        this.#addedEnemies = value;
    }

    get wave() {
        return this.#wave;
    }

    set wave(value) {
        this.#wave = value;
    }
}
