import { Enemy } from "./enemy.js";
import { ENEMY_DEFAULT_SPEED, SPAWN_INTERVAL_TIME_MS, WAVE_BREAK_TIME_MS } from "./config.js";

export class WaveManager {
    #wave = 1;
    #addedEnemies = 0;
    
    constructor() {}

    startEnemyWaves(enemiesArray, onWaveEnd) {
        if(this.#addedEnemies === this.#wave * 10) return

        const spawnInterval = setInterval(() => {
            if (this.#addedEnemies >= this.#wave * 10) {
                clearInterval(spawnInterval);

                const checkIfWaveOver = setInterval(() => {
                    if (enemiesArray.length === 0) {
                        clearInterval(checkIfWaveOver);
                        this.#addedEnemies++;
                        this.#wave++; 
                        setTimeout(() => {
                            onWaveEnd(this.#wave);
                            this.startEnemyWaves(enemiesArray, onWaveEnd);
                            this.#addedEnemies = 0;
                        }, WAVE_BREAK_TIME_MS);
                    }
                }, SPAWN_INTERVAL_TIME_MS);

                return;
            }

            enemiesArray.push(new Enemy(ENEMY_DEFAULT_SPEED + this.#wave / 2, 100 * this.#wave));
            this.#addedEnemies++;
        }, 1000);
    }

    removeEnemy(enemies, enemy){
        enemies.splice(0, enemies.length, ...enemies.filter(enemyEl => enemyEl !== enemy));
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