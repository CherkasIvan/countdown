const items = document.querySelectorAll(".countdown-item > h2");
const countDownEl = document.querySelector(".countdown");

const STORAGE_KEY = "countdownData";
const TIMER_KEY = "timerEnd";

function getCountdownData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : null;
}

function generateNewCountdownDate() {
  const now = new Date();
  const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const data = {
    generatedAt: now.getTime(),
    endAt: endDate.getTime(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function shouldGenerateNewDate(data) {
  if (!data) return true;

  const now = new Date().getTime();
  const timeSinceGeneration = now - data.generatedAt;

  return timeSinceGeneration > 24 * 60 * 60 * 1000 || now > data.endAt;
}

function updateCountdown() {
  let countdownData = getCountdownData();

  if (shouldGenerateNewDate(countdownData)) {
    countdownData = generateNewCountdownDate();
  }

  const countDownDate = countdownData.endAt;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(distance / oneDay);
    const hours = Math.floor((distance % oneDay) / oneHour);
    const minutes = Math.floor((distance % oneHour) / oneMinute);
    const seconds = Math.floor((distance % oneMinute) / 1000);

    items[0].textContent = days.toString().padStart(2, "0");
    items[1].textContent = hours.toString().padStart(2, "0");
    items[2].textContent = minutes.toString().padStart(2, "0");
    items[3].textContent = seconds.toString().padStart(2, "0");

    if (distance <= 0) {
      clearInterval(timerInterval);
      countDownEl.innerHTML = '<h4 class="expired">Время вышло</h4>';

      generateNewCountdownDate();
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

updateCountdown();
