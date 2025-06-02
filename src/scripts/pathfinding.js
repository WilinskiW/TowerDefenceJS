import { BASE_POS, gameMap, TILE_SIZE } from "./config.js";

export function findPath(startRow, startCol) {
    const moves = [];

    if (gameMap[startRow][startCol] === 0) {
        throw new Error("Cant be placed at grass!");
    }

    const isReturnToPreviousMove = (previousMove, row, col) => {
        if (!previousMove) {
            return false;
        }
        return previousMove.col === col && previousMove.row === row;
    };

    let row = startRow;
    let col = startCol;
    let previousMove;
    let counter = 0;

    while (row !== BASE_POS.row || col !== BASE_POS.col) {
        previousMove = moves.at(-2);

        // Check NORTH
        if (row - 1 >= 0 && !isReturnToPreviousMove(previousMove, row - 1, col) && gameMap[row - 1][col] === 1) {
            row--;
            moves.push({row, col, xMove: 0, yMove: -TILE_SIZE});
        }
        // Check EAST
        else if (col + 1 < gameMap[0].length && !isReturnToPreviousMove(previousMove, row, col + 1) && gameMap[row][col + 1] === 1) {
            col++;
            moves.push({row, col, xMove: TILE_SIZE, yMove: 0});
        }
        // Check SOUTH
        else if (row + 1 < gameMap.length && !isReturnToPreviousMove(previousMove, row + 1, col) && gameMap[row + 1][col] === 1) {
            row++;
            moves.push({row, col, xMove: 0, yMove: TILE_SIZE});
        }
        // Check WEST
        else if (col - 1 >= 0 && !isReturnToPreviousMove(previousMove, row, col - 1) && gameMap[row][col - 1] === 1) {
            col--;
            moves.push({row, col, xMove: -TILE_SIZE, yMove: 0});
        } else {
            break;
        }

        counter++;
        if (counter > 100) {
            console.warn("Pathfinding stopped after 100 moves.");
            break;
        }
    }

    return moves;
}