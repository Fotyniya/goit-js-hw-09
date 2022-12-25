import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputTime = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
};
let timeInterval;

btnStart.setAttribute('disabled', 'disabled');

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', 'disabled');
    timeInterval = setInterval(() => {
        onCountdown();
    }, 1000);
});

const calendar = flatpickr("#datetime-picker", {options});

inputTime.addEventListener('change', onReadyCountdown)

function onReadyCountdown() {
    if (Date.parse(inputTime.value) <= Date.now()){
        btnStart.setAttribute('disabled', 'disabled');
        Notify.warning("Please choose a date in the future");
        timerDays.textContent = addLeadingZero(0);
        timerHours.textContent = addLeadingZero(0);
        timerMinutes.textContent = addLeadingZero(0);
        timerSeconds.textContent = addLeadingZero(0);
        clearInterval(timeInterval);
    } else {
        Notify.success('You can start the countdown. Click START')
        btnStart.removeAttribute('disabled');
    } 
};

function onCountdown () {
        const currentDate = new Date();
        const choosenDate = new Date(inputTime.value) 
        const ms = Date.parse(choosenDate) - Date.parse(currentDate);
    if (ms >= 0){
        timerDays.textContent = addLeadingZero(convertMs(ms).days);
        timerHours.textContent = addLeadingZero(convertMs(ms).hours);
        timerMinutes.textContent = addLeadingZero(convertMs(ms).minutes);
        timerSeconds.textContent = addLeadingZero(convertMs(ms).seconds);
    } 
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
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
};

function addLeadingZero(data) {
    const valueAddZero = data.toString().padStart(2, 0);
    return valueAddZero;
};
  