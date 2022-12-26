function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

const body = document.querySelector('body');
const btnStartChangeColor = document.querySelector('[data-start]');
const btnStopChangeColor = document.querySelector('[data-stop]');
let timeInterval = null;

btnStartChangeColor.addEventListener('click', () => {
    timeInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    onReplaceAttribute (btnStartChangeColor, btnStopChangeColor, "disabled");
  });
  
btnStopChangeColor.addEventListener('click', () => {
    clearInterval(timeInterval);
    onReplaceAttribute (btnStopChangeColor, btnStartChangeColor, "disabled");
});

function onReplaceAttribute (elemSetAtt, elemRemoveAtt, attName) {
  elemSetAtt.setAttribute(attName, attName)
  elemRemoveAtt.removeAttribute(attName)
}
    
