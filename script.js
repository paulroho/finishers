let startTime = null;
let timerInterval = null;
let finishers = [];

const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const stopButton = document.getElementById('stopButton');
const showDataButton = document.getElementById('showDataButton');
const timerDisplay = document.getElementById('timer');
const resultsBody = document.getElementById('resultsBody');

const stopOverlay = document.getElementById('stopOverlay');
const dataOverlay = document.getElementById('dataOverlay');
const stopInput = document.getElementById('stopInput');
const confirmStopButton = document.getElementById('confirmStopButton');
const csvData = document.getElementById('csvData');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateTimer() {
  const now = Date.now();
  const elapsed = now - startTime;
  timerDisplay.textContent = formatTime(elapsed);
}

function saveToLocalStorage() {
  localStorage.setItem('finishers', JSON.stringify(finishers));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('finishers');
  if (data) {
    finishers = JSON.parse(data);
    finishers.forEach((entry, index) => {
      addRow(index + 1, entry.time, entry.comment);
    });
  }
}

function addRow(number, time, comment = '') {
  const row = document.createElement('tr');

  const numberCell = document.createElement('td');
  numberCell.textContent = number;

  const timeCell = document.createElement('td');
  timeCell.textContent = time;

  const commentCell = document.createElement('td');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = comment;
  input.addEventListener('input', () => {
    finishers[number - 1].comment = input.value;
    saveToLocalStorage();
  });
  commentCell.appendChild(input);

  row.appendChild(numberCell);
  row.appendChild(timeCell);
  row.appendChild(commentCell);

  resultsBody.appendChild(row);
}

// TIMER CONTROL
startButton.addEventListener('click', () => {
  startTime = Date.now();
  localStorage.setItem('startTime', startTime.toString());
  timerInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  captureButton.disabled = false;
  stopButton.disabled = false;
});

captureButton.addEventListener('click', () => {
  const now = Date.now();
  const elapsed = now - startTime;
  const timeStr = formatTime(elapsed);
  const finisher = { time: timeStr, comment: '' };
  finishers.push(finisher);
  addRow(finishers.length, timeStr);
  saveToLocalStorage();
});

// STOP OVERLAY
stopButton.addEventListener('click', () => {
  stopOverlay.classList.remove('hidden');
  stopInput.value = '';
  confirmStopButton.disabled = true;
});

stopInput.addEventListener('input', () => {
  confirmStopButton.disabled = (stopInput.value !== 'STOP');
});

confirmStopButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  localStorage.removeItem('startTime');
  captureButton.disabled = true;
  stopButton.disabled = true;
  stopOverlay.classList.add('hidden');
});

function closeStopOverlay() {
  stopOverlay.classList.add('hidden');
}

// SHOW DATA
showDataButton.addEventListener('click', () => {
  const lines = finishers.map((f, i) =>
    `${i + 1},"${f.time}","${(f.comment || '').replace(/"/g, '""')}"`
  );
  csvData.textContent = "No.,Time,Comment\n" + lines.join('\n');
  dataOverlay.classList.remove('hidden');
});

function closeDataOverlay() {
  dataOverlay.classList.add('hidden');
}

// INIT
loadFromLocalStorage();

// Restore timer state if previously started
const savedStart = localStorage.getItem('startTime');
if (savedStart) {
  startTime = parseInt(savedStart, 10);
  timerInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  captureButton.disabled = false;
  stopButton.disabled = false;
  updateTimer();
}
