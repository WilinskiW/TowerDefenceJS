import { Enemy } from "./enemy.js";
import { ENEMY_DEFAULT_SPEED, WAVE_BREAK_TIME } from "./config.js";

export class WaveManager {
    #wave = 1;
    
    constructor() {}

    startEnemyWaves(enemiesArray, onWaveEnd) {
        let addedEnemies = 0;

        const spawnInterval = setInterval(() => {
            console.log(this.wave)
            if (addedEnemies >= this.#wave * 10) {
                clearInterval(spawnInterval);

                const checkIfWaveOver = setInterval(() => {
                    if (enemiesArray.length === 0) {
                        clearInterval(checkIfWaveOver);
                        this.#wave++; 
                        setTimeout(() => {
                            onWaveEnd(this.#wave);
                            this.startEnemyWaves(enemiesArray, onWaveEnd); 
                        }, WAVE_BREAK_TIME);
                    }
                }, 500);

                return;
            }

            enemiesArray.push(new Enemy(ENEMY_DEFAULT_SPEED + this.#wave / 2, 100 * this.#wave));
            addedEnemies++;
        }, 1000);
    }

    removeEnemy(enemies, enemy){
        enemies.splice(0, enemies.length, ...enemies.filter(enemyEl => enemyEl !== enemy));
    }

    get wave() {
        return this.#wave;
    }

    set wave(value) {
        this.#wave = value;
    }
}