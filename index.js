const startButton = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['red', 'OrangeRed', 'GreenYellow', 'LightSeaGreen', 'Aqua', 'green', 'blue','HotPink', 'Gold', 'white', 'purple', 'peru', 'pink', 'lawngreen'];
let timerTime = 0;
let score = 0;

function changeScreen(index) {
  screens[index].classList.add('up');
};

function getRandomColor(){
  return colors[Math.floor(Math.random() * colors.length)];
}

function setTime(value) {
  timer.innerHTML = `00:${value}`
}

function decreaseTime() {
  if (timerTime === 0) {
    finishGame();
  } else {
    let current = --timerTime;
      if(current < 10) {
        current = `0${current}`
      }
    setTime(current);
  }
};

function startGame() {
  createCircle();
  setTime(timerTime);
  setInterval(decreaseTime, 1000);
}

function finishGame() {
  timer.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: ${score}</h1>`
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function createCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10,60);
  const color = getRandomColor();
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${color}`;
  board.append(circle);
}

startButton.addEventListener('click', evt => {
  evt.preventDefault();
  changeScreen(0);
});

timeList.addEventListener('click', evt => {
  if(evt.target.classList.contains('time-btn')){
    timerTime = parseInt(evt.target.getAttribute('data-time'));
    changeScreen(1);
    startGame()
  }
})

board.addEventListener('click', evt => {
  if(evt.target.classList.contains('circle')) {
    score++;
    evt.target.remove();
    createCircle();
  }
})
