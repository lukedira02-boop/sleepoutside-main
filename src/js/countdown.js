const countdownDisplay = document.getElementById('countdown');
const timerForm = document.getElementById('timerForm');
const startTimeInput = document.getElementById('startTime');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerStatus = document.getElementById('timerStatus');

let remainingSeconds = Number(startTimeInput.value);
let intervalId;
let isPaused = false;
let endTime = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function renderTime() {
  countdownDisplay.textContent = formatTime(remainingSeconds);
}

function stopTimers() {
  window.clearInterval(intervalId);
  intervalId = undefined;
}

function finishCountdown() {
  stopTimers();
  remainingSeconds = 0;
  isPaused = false;
  renderTime();
  timerStatus.textContent = 'Time\'s up!';
  startButton.disabled = false;
  pauseButton.disabled = true;
  pauseButton.textContent = 'Pause';
}

function runCountdown() {
  if (remainingSeconds <= 0) {
    finishCountdown();
    return;
  }

  isPaused = false;
  endTime = Date.now() + remainingSeconds * 1000;
  timerStatus.textContent = 'Countdown in progress.';
  startButton.disabled = true;
  pauseButton.disabled = false;
  pauseButton.textContent = 'Pause';

  intervalId = window.setInterval(() => {
    const nextRemaining = Math.max(
      0,
      Math.ceil((endTime - Date.now()) / 1000),
    );

    if (nextRemaining !== remainingSeconds) {
      remainingSeconds = nextRemaining;
      renderTime();
    }

    if (remainingSeconds === 0) {
      finishCountdown();
    }
  }, 250);
}

timerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  stopTimers();

  if (!timerForm.reportValidity()) {
    return;
  }

  remainingSeconds = Math.trunc(Number(startTimeInput.value));
  if (!Number.isInteger(remainingSeconds) ||
      remainingSeconds < 1 ||
      remainingSeconds > 3600) {
    timerStatus.textContent = 'Enter a whole number from 1 to 3600.';
    return;
  }
  renderTime();
  runCountdown();
});

pauseButton.addEventListener('click', () => {
  if (pauseButton.disabled) {
    return;
  }

  if (!isPaused && endTime !== null) {
    remainingSeconds = Math.max(
      0,
      Math.ceil((endTime - Date.now()) / 1000),
    );
    renderTime();
  }

  stopTimers();
  isPaused = !isPaused;

  if (isPaused) {
    timerStatus.textContent = 'Countdown paused.';
    pauseButton.textContent = 'Resume';
    return;
  }

  runCountdown();
});

resetButton.addEventListener('click', () => {
  stopTimers();
  isPaused = false;
  remainingSeconds = Number(startTimeInput.value);
  renderTime();
  timerStatus.textContent = 'Ready when you are.';
  startButton.disabled = false;
  pauseButton.disabled = true;
  pauseButton.textContent = 'Pause';
});
