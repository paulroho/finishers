let startTime = null;
let timerInterval = null;
let finishers = [];

const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const timerDisplay = document.getElementById('timer');
const resultsBody = document.getElementById('resultsBody');

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

startButton.addEventListener('click', () => {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  captureButton.disabled = false;
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

// Initialize
loadFromLocalStorage();
