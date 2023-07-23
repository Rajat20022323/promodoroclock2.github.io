document.addEventListener('DOMContentLoaded', function () {
    const clickSound = new Audio('click.mp3');
    const alarmSound = new Audio('alarm.mp3');
  
    let timerInterval;
    let timeLeft;
    let isPaused = true;
  
    function playClickSound() {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  
    function playAlarmSound() {
      alarmSound.currentTime = 0;
      alarmSound.play();
    }
  
    function updateTimerDisplay(minutes, seconds) {
      document.getElementById('pomodoro-minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('pomodoro-seconds').textContent = seconds.toString().padStart(2, '0');
  
      document.getElementById('popup-minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('popup-seconds').textContent = seconds.toString().padStart(2, '0');
    }
  
    function startTimer() {
      if (isPaused) {
        if (!timerInterval) {
          const targetTime = Date.now() + timeLeft;
          timerInterval = setInterval(function () {
            const currentTime = Date.now();
            timeLeft = targetTime - currentTime;
  
            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              timerInterval = null;
              updateTimerDisplay(0, 0);
              playAlarmSound();
              openCountdownPopup();
            } else {
              const minutes = Math.floor(timeLeft / 60000);
              const seconds = Math.floor((timeLeft % 60000) / 1000);
              updateTimerDisplay(minutes, seconds);
            }
          }, 1000);
        }
  
        isPaused = false;
        playClickSound();
      }
    }
  
    function pauseTimer() {
      if (!isPaused) {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;
        playClickSound();
      }
    }
  
    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 25 * 60 * 1000; // 25 minutes in milliseconds
      updateTimerDisplay(25, 0);
      isPaused = true;
      playClickSound();
    }
  
    function openCountdownPopup() {
      document.getElementById('countdown-popup').style.display = 'flex';
      document.getElementById('countdown-popup-timer').style.display = 'block';
    }
  
    function closeCountdownPopup() {
      document.getElementById('countdown-popup').style.display = 'none';
      document.getElementById('countdown-popup-timer').style.display = 'none';
    }
  
    document.getElementById('countdown-popup').addEventListener('click', function (event) {
      if (event.target === this) {
        closeCountdownPopup();
      }
    });
  
    // Initial setup
    resetTimer();
  });
  