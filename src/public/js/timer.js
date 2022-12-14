const timer = document.querySelector('.timer');

let minutes = 0;
let seconds = 0;
let milSeconds = 0;
let extraMilSeconds = 0;
let isRunning = false;

function startTimer() {
    isRunning = true;
    const timerInterval = setInterval(() => {
        extraMilSeconds++;
        if (isRunning === false) {
            clearInterval(timerInterval);
        }
        if (extraMilSeconds === 10) {
            extraMilSeconds = 0;
            milSeconds++;
        }
        if (milSeconds === 10) {
            milSeconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        minutes === 0 ?
            timer.textContent = `${seconds}:${milSeconds}${extraMilSeconds}`
            :
            timer.textContent = `${minutes}:${seconds}:${milSeconds}${extraMilSeconds}`
    }, 10)
}

addEventListener('keypress', (e) => {
    console.log(e.code);
    if (e.code == "Space") {
        isRunning ? isRunning = false : startTimer();
    }
})