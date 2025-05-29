import { ENEMY_SIZE, TILE_SIZE, TOWER_SIZE } from "./config.js";

let bulletSpeed = 1
export function drawGrid(ctx) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.strokeStyle = "black";
    for (let x = 0; x <= ctx.canvas.width; x += TILE_SIZE) {
        for (let y = 0; y <= ctx.canvas.height; y += TILE_SIZE) {
            ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    }
    ctx.restore();
}

export function drawMap(ctx, gameMap) {
    ctx.globalCompositeOperation = "destination-over";
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            if (gameMap[row][col] === 0) {
                ctx.fillStyle = "#138510";
            } else {
                ctx.fillStyle = "#907830";
            }
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    ctx.restore();
}

export function drawEnemy(ctx, xPos, yPos) {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(xPos, yPos, ENEMY_SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.restore();
}

export function drawTower(ctx, xPos, yPos, range,showRadius) {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(xPos, yPos, TOWER_SIZE, 0, 2 * Math.PI);
    ctx.arc(xPos, yPos, TOWER_SIZE / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    if (showRadius) {
        drawTowerRadius(ctx, xPos, yPos, range);
    }

    ctx.restore();
}

export function drawTowerRadius(ctx, xPos, yPos, range) {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(xPos, yPos, range, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255 165 0 / 15%)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 10]);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
}

export function drawTowerBullets(ctx, xSource, ySource, xDestination, yDestination, speed){
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.setLineDash([bulletSpeed, 15]);

    bulletSpeed += speed;
    
    bulletSpeed = bulletSpeed > 5 ? bulletSpeed = 0 : bulletSpeed;

    ctx.moveTo(xSource, ySource);
    ctx.lineTo(xDestination, yDestination);
    ctx.stroke();

    ctx.setLineDash([]);
}

export function drawGameOver(ctx) {
    const { width, height } = ctx.canvas;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "red";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Game Over", width / 2, height / 2);
    
    ctx.restore();
}

export function animateFps(callbackFn, fps = 60) {
    let now, then = Date.now(), delta = 0;
    const interval = 1000 / fps;

    function update() {
        requestAnimationFrame(update);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            callbackFn();
            then = now - (delta % interval);
        }
    }

    update();
}