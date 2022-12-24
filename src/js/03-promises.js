import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector ('[name = delay]');
const stepDelay = document.querySelector ('[name = step]');
const amountPromises = document.querySelector ('[name = amount]');
const btnCreatPromises = document.querySelector('button');

btnCreatPromises.addEventListener('click', (event => {
  event.preventDefault();
    for (let i = 0; i < amountPromises.value; i += 1){
      let delay = Number(firstDelay.value) + i * Number(stepDelay.value)
      createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }}
));

function createPromise(position, delay) {
  const promise = new Promise ((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        res({position, delay})
      } else {
        rej({position, delay})
      } 
    }, delay)
  })
  return promise
}
