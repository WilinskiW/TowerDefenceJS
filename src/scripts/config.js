export const WIDTH = 1000;
export const HEIGHT = 800;
export const BASE_HEALTH = 100;
export const TILE_SIZE = 100;
export const ENEMY_SIZE = 30;
export const TOWER_SIZE = 30;
export const SPAWN_POS = {row: 1, col: 0};
export const BASE_POS = {row: 0, col: 6};
export const WAVE_BREAK_TIME_MS = 10000;
export const ENEMY_DEFAULT_SPEED = 1.5;
export const START_GOLD = 10;
export const NEW_TOWER_COST = 10;
export const DAMAGE_UPGRADE_COST = 5;
export const ATTACK_SPEED_UPGRADE_COST = 4;
export const RANGE_UPGRADE_COST = 3;
export const ENEMY_DAMAGE = 20;
export const SPAWN_INTERVAL_TIME_MS = 500;
export const AUTOSAVE_TIME_MS = 60000;

export function minCost(){
    return Math.min(NEW_TOWER_COST, DAMAGE_UPGRADE_COST, ATTACK_SPEED_UPGRADE_COST, RANGE_UPGRADE_COST);
}


// Game map for 10 x 8
export const gameMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0], // 2
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0], // 3
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 0], // 4
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 5
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0], // 6
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 0], // 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 8
];