const WIDTH = 1000;
const HEIGHT = 800;
const TILE_SIZE = 100;

// Game map for 10 x 8
const gameMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0], // 2
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0], // 3
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 0], // 4
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 5
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0], // 6
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 0], // 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 8
]


const app = document.getElementById("app");

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

app.appendChild(canvas);

const ctx = canvas.getContext("2d");

drawGrid(WIDTH, HEIGHT);
drawMap();

function drawGrid(width, height) {
    ctx.strokeStyle = "black";
    for (let x = 0; x <= width; x += TILE_SIZE) {
        for (let y = 0; y <= height; y += TILE_SIZE) {
            ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    }
}

function drawMap() {
    ctx.globalCompositeOperation = "destination-over";
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            if (gameMap[row][col] === 0) {
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "saddlebrown";
            }
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}
