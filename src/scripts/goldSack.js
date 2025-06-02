import { START_GOLD } from "./config.js";

/**
 * Reprezentuje ilość złota posiadana przez gracza
 */
export class GoldSack {
    /**
     * Ilość aktualnego złota
     * @type {number}
     * @default Domyślna wartość Golda z konfiguracji
     */
    #amountOfGold = START_GOLD;

    constructor() {}

    /**
     * Ilość aktualnego złota
     * @returns {number}
     */
    get amountOfGold() {
        return this.#amountOfGold;
    }

    set amountOfGold(value) {
        this.#amountOfGold = value;
    }
}