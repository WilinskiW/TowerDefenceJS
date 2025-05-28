export const WIDTH = 1000;
export const HEIGHT = 800;
export const TILE_SIZE = 100;
export const ENEMY_SIZE = 30;
export const TOWER_SIZE = 30;
export const SPAWN_POS = {row: 1, col: 0};
export const BASE_POS = {row: 0, col: 6};
export const WAVE_BREAK_TIME = 30000; //ms
export const ENEMY_DEFAULT_SPEED = 1.5;


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
]