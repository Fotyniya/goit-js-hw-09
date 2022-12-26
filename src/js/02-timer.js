import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputTime: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector('[data-start]'),
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
    timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]'),
}

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

refs.btnStart.setAttribute('disabled', 'disabled');

refs.btnStart.addEventListener('click', () => {
    refs.btnStart.setAttribute('disabled', 'disabled');
    timeInterval = setInterval(() => {
        onCountdown();
    }, 1000);
});

flatpickr("#datetime-picker", options);

refs.inputTime.addEventListener('change', onReadyCountdown)

function onReadyCountdown() {
    if (Date.parse(refs.inputTime.value) <= Date.now()){
        refs.btnStart.setAttribute('disabled', 'disabled');
        
        Notify.warning("Please choose a date in the future");
        updateTimerFields({days: 0, hours: 0, minutes: 0, seconds: 0})
        clearInterval(timeInterval);
    } else {
        Notify.success('You can start the countdown. Click START')
        refs.btnStart.removeAttribute('disabled');
    } 
};

function onCountdown () {
        const currentDate = new Date();
        const choosenDate = new Date(refs.inputTime.value) 
        const ms = Date.parse(choosenDate) - Date.parse(currentDate);
    if (ms >= 0){
        updateTimerFields(convertMs(ms))
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
    return data.toString().padStart(2, 0);
};

function updateTimerFields(param) {
    refs.timerDays.textContent = addLeadingZero(param.days);
    refs.timerHours.textContent = addLeadingZero(param.hours);
    refs.timerMinutes.textContent = addLeadingZero(param.minutes);
    refs.timerSeconds.textContent = addLeadingZero(param.seconds);
}
