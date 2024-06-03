// script.js

// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display clock immediately

// Stopwatch
let timer;
let running = false;
let elapsedTime = 0;
let laps = [];

function startStopwatch() {
    if (!running) {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById('display').innerText = timeToString(elapsedTime);
        }, 10); // Update every 10 milliseconds
        running = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
    }
}

function stopStopwatch() {
    clearInterval(timer);
    running = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

function lapStopwatch() {
    laps.push(elapsedTime);
    displayLaps();
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    document.getElementById('display').innerText = '00:00:00.000';
    document.getElementById('laps').innerText = '';
    running = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
}

function timeToString(time) {
    const hrs = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
    const mins = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const secs = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
    const millis = String(Math.floor((time % 1000))).padStart(3, '0');
    return `${hrs}:${mins}:${secs}.${millis}`;
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = `Lap ${index + 1}: ${timeToString(lap)}`;
        lapsContainer.appendChild(lapElement);
    });
}

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('stopBtn').addEventListener('click', stopStopwatch);
document.getElementById('lapBtn').addEventListener('click', lapStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
