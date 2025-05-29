let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

function measureFPS() {
    const now = performance.now();
    frameCount++;

    if (now - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = now;

        console.log("FPS:", fps);
    }

    requestAnimationFrame(measureFPS);
}

measureFPS();