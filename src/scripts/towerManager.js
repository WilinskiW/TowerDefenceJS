import { canvas } from "./main.js";
import {
    DAMAGE_UPGRADE_COST,
    gameMap,
    minCost,
    RANGE_UPGRADE_COST,
    ATTACK_SPEED_UPGRADE_COST,
    TILE_SIZE,
    TOWER_SIZE, NEW_TOWER_COST
} from "./config.js";
import { Tower } from "./tower.js";
import { goldCounter } from "./main.js";

/**
 * Funkcja wykonuję akcję wybrane przez użytkownik (Budowa nowej wieży, ulepszenie istniejącej)
 * @param e {MouseEvent} Informacje o event'cie
 * @param towers {Tower[]} Wszystkie wieże dostępne na mapie
 * @param selectedButton {HTMLButtonElement} Wciśnięty przycisk
 * @param goldSack {GoldSack} Stan złota gracza
 */
export function handleTowerActions(e, towers, selectedButton, goldSack) {
    if (!selectedButton || goldSack.amountOfGold < minCost()) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const col = Math.floor(mouseX / TILE_SIZE);
    const row = Math.floor(mouseY / TILE_SIZE);

    const x = col * TILE_SIZE + TILE_SIZE / 2;
    const y = row * TILE_SIZE + TILE_SIZE / 2;

    console.log(`X: ${mouseX}, Y: ${mouseY}`);

    if (selectedButton.id === "tower" && goldSack.amountOfGold >= NEW_TOWER_COST) {
        placeTower(x, y, towers, row, col, mouseX, mouseY, goldSack);
    } else {
        upgradeTower(x, y, towers, selectedButton.id, goldSack);
    }
}

/**
 * Funkcja umieszcza nową wieżę na mapie, jeśli jest miejsce i gracz ma wystarczająco złota
 * @param {number} x Pozycja x na planszy (środek kafelka)
 * @param {number} y Pozycja y na planszy (środek kafelka)
 * @param {Tower[]} towers Wszystkie wieże dostępne na mapie
 * @param {number} row Indeks wiersza w mapie gry
 * @param {number} col Indeks kolumny w mapie gry
 * @param {number} rawX Dokładna pozycja x kursora myszy
 * @param {number} rawY Dokładna pozycja y kursora myszy
 * @param {GoldSack} goldSack Stan złota gracza
 */
function placeTower(x, y, towers, row, col, rawX, rawY, goldSack) {
    if (findTowerByCoordinate(x, y, towers).length === 0 && gameMap[row][col] === 0) {
        towers.push(new Tower(rawX, rawY));
        spendGold(goldSack, NEW_TOWER_COST);
    }
}

/**
 * Funkcja ulepsza wybraną wieżę (uszkodzenia, zasięg, szybkość ataku), jeśli gracz ma wystarczająco złota
 * @param {number} x Pozycja x na planszy (środek kafelka)
 * @param {number} y Pozycja y na planszy (środek kafelka)
 * @param {Tower[]} towers Wszystkie wieże dostępne na mapie
 * @param {string} upgradeType Typ ulepszenia: "damage", "range" lub "speed"
 * @param {GoldSack} goldSack Stan złota gracza
 */
function upgradeTower(x, y, towers, upgradeType, goldSack) {
    const foundTower = findTowerByCoordinate(x, y, towers);
    if (foundTower.length === 1 && foundTower[0].tier <= 3) {
        const tower = foundTower[0];
        switch (upgradeType) {
            case "damage":
                if (goldSack.amountOfGold >= DAMAGE_UPGRADE_COST) {
                    tower.increaseDamage(0.5);
                    spendGold(goldSack, DAMAGE_UPGRADE_COST);
                }
                break;
            case "range":
                if (goldSack.amountOfGold >= RANGE_UPGRADE_COST) {
                    tower.increaseRange(TOWER_SIZE * 1.5);
                    spendGold(goldSack, RANGE_UPGRADE_COST);
                }
                break;
            case "speed":
                if (goldSack.amountOfGold >= ATTACK_SPEED_UPGRADE_COST) {
                    tower.increaseAttackSpeed(1);
                    spendGold(goldSack, ATTACK_SPEED_UPGRADE_COST);
                }
                break;
        }
        tower.tier++;
    }
}

/**
 * Funkcja zmniejsza ilość złota gracza i aktualizuje licznik na stronie
 * @param {GoldSack} goldSack Stan złota gracza, powinien mieć właściwość `amountOfGold`
 * @param {number} toTake Ilość złota do odjęcia
 */
function spendGold(goldSack, toTake){
    goldSack.amountOfGold -= toTake;
    goldCounter.textContent = goldSack.amountOfGold;
}

/**
 * Znajduje wieże na danej pozycji (x, y)
 * @param {number} x Pozycja x na planszy (środek kafelka)
 * @param {number} y Pozycja y na planszy (środek kafelka)
 * @param {Tower[]} towers Wszystkie wieże dostępne na mapie
 * @returns {Tower[]} Tablica wież znalezionych na podanej pozycji
 */
function findTowerByCoordinate(x, y, towers) {
    return towers.filter(tower => tower.x === x && tower.y === y);
}