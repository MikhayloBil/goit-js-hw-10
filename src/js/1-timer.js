import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let userSelectedDate = null;
const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate > new Date()) {
      startButton.disabled = false;
    } else {
            startButton.disabled = true;
        iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
    }
  },
});
let timerInterval;
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");
const startButton = document.querySelector("[data-start]");

startButton.addEventListener("click", function() {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

function addLeadingZero(value) {
  return value < 10 ? "0" + value : value;
}
function updateTimer() {
  const now = new Date();
    const difference = userSelectedDate - now;
     if (difference <= 0) {
    clearInterval(timerInterval);
    startButton.disabled = true;
    iziToast.success({
      title: "Success",
      message: "Timer finished",
      position: "topRight",
    });
    return;
    }
     
  const { days, hours, minutes, seconds } = convertMs(difference);

  
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}