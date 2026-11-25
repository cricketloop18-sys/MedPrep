// DAILY TASK CHECKLIST
const tasks = document.querySelectorAll(".task");
const progress = document.getElementById("taskProgress");

tasks.forEach((task, index) => {
  task.checked = localStorage.getItem("task" + index) === "true";

  task.addEventListener("change", () => {
    localStorage.setItem("task" + index, task.checked);
    updateProgress();
  });
});

function updateProgress() {
  const completed = [...tasks].filter(t => t.checked).length;
  progress.textContent = completed + "/" + tasks.length;
}

updateProgress();

// FOCUS TIMER
let timeLeft = 25 * 60;
let timerInterval = null;
let running = false;
let studiedSeconds = 0;

const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("timerStatus");
const startBtn = document.getElementById("startBtn");

function displayTime() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startBtn.textContent = "Resume";
    statusDisplay.textContent = "Timer paused";
    return;
  }

  running = true;
  startBtn.textContent = "Pause";
  statusDisplay.textContent = "Focus mode ON 🔥";

  timerInterval = setInterval(() => {
    timeLeft--;
    studiedSeconds++;

    displayTime();

    document.getElementById("studyHours").textContent =
      Math.floor(studiedSeconds / 60) + " min";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      running = false;
      timeLeft = 25 * 60;
      displayTime();
      startBtn.textContent = "Start";
      statusDisplay.textContent = "Session completed! Take a break 🎉";
      alert("25 minutes completed! Take a short break.");
    }
  }, 1000);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  running = false;
  timeLeft = 25 * 60;
  displayTime();
  startBtn.textContent = "Start";
  statusDisplay.textContent = "Ready to focus?";
});

// MOCK TEST TRACKER
document.getElementById("saveScore").addEventListener("click", () => {
  const p = Number(document.getElementById("physicsScore").value);
  const c = Number(document.getElementById("chemistryScore").value);
  const b = Number(document.getElementById("biologyScore").value);

  const total = p + c + b;

  if (p < 0 || c < 0 || b < 0 || p > 180 || c > 180 || b > 360) {
    alert("Please enter valid subject marks.");
    return;
  }

  document.getElementById("totalScore").textContent =
    "Total Score: " + total + " / 720";
});
