import { START_GOLD } from "./config.js";

export class GoldSack {
    #amountOfGold = START_GOLD;

    constructor() {}

    get amountOfGold() {
        return this.#amountOfGold;
    }

    set amountOfGold(value) {
        this.#amountOfGold = value;
    }
}