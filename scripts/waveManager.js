import { Enemy } from "./enemy.js";
import { ENEMY_DEFAULT_SPEED, WAVE_BREAK_TIME } from "./config.js";

export let wave = 1;

export function startEnemyWaves(enemiesArray, wave, onWaveEnd) {
    let addedEnemies = 0;

    const spawnInterval = setInterval(() => {
        if (addedEnemies >= wave * 10) {
            clearInterval(spawnInterval);
            
            const checkIfWaveOver = setInterval(() => {
                if (enemiesArray.length === 0) {
                    clearInterval(checkIfWaveOver);
                    wave++;
                    setTimeout(() => {
                        onWaveEnd(wave);
                        startEnemyWaves(enemiesArray, wave, onWaveEnd);
                    }, WAVE_BREAK_TIME);
                }
            }, 500);

            return;
        }

        enemiesArray.push(new Enemy(ENEMY_DEFAULT_SPEED + wave/2, 100 * wave ));
        addedEnemies++;
    }, 1000); // spawn co 1s
}

export function removeEnemy(enemies, enemy){
    enemies.splice(0, enemies.length, ...enemies.filter(enemyEl => enemyEl !== enemy));
}