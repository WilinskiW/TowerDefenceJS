import { TILE_SIZE, TOWER_SIZE } from "./config.js";

export class Tower {
    #x;
    #y;
    #range = TOWER_SIZE * 4;
    #shootSpeed = 1;


    constructor(x, y) {
        this.#x = this.#adjustX(x);
        this.#y = this.#adjustY(y);
    }
    
    #adjustX(x){
        const col = Math.floor(x / TILE_SIZE);
        return col * TILE_SIZE + TILE_SIZE / 2;
    }

    #adjustY(y){
        const row = Math.floor(y / TILE_SIZE);
        return row * TILE_SIZE + TILE_SIZE / 2;
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = this.#adjustX(value);
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = this.#adjustY(value);
    }

    get range() {
        return this.#range;
    }

    set range(value) {
        this.#range = value;
    }

    get shootSpeed() {
        return this.#shootSpeed;
    }

    set shootSpeed(value) {
        this.#shootSpeed = value;
    }
}

