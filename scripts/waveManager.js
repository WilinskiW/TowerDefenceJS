import {Enemy} from "./enemy.js";

export function startEnemyWaves(enemiesArray, wave, onLimitReached, interval = 1000) {
    let addedEnemies = 1;

    const intervalId = setInterval(() => {
        enemiesArray.push(new Enemy());
        addedEnemies++;

        if (addedEnemies > wave * 10) {
            clearInterval(intervalId);
            onLimitReached();
        }
    }, interval);

    return { intervalId, getAddedEnemies: () => addedEnemies };
}