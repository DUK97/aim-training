const startButton = document.querySelector('.start');
const screenMain = document.querySelector('.screen--main');
const screenSelectTime = document.querySelector('.screen--time-choosing');
const timeList = document.querySelector('.time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0;
let score = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault()
    screenMain.classList.add('up')
})

timeList.addEventListener('click', ({target}) => {
    if (target.classList.contains('time__button')) {
        time = parseInt(target.dataset.time);
        startGame();
    }
})

board.addEventListener('click', ({target}) => {
    if (target.classList.contains('circle')) {
        score++;
        target.remove();
        createRandomCircle();
    }
})

function startGame() {
    screenSelectTime.classList.add('up')
    timeElement.parentNode.style.display = 'block';

    createRandomCircle()
    setTime(time)
    setInterval(decreaseTime, 1000)
}


function decreaseTime() {
    let currentTime = --time
    if (currentTime === 0) {
        finishGame();
    } else {
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }


}

function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    timeElement.parentNode.style.display = 'none';
    board.innerHTML =
        `<div class="board__after-finish">
        <h1> Cчет: <span class="primary">${score}</span> </h1> 
        <button class="start" id="restart">Начать игру заново</button></div>`;

    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', onRestartButtonClick)
}

function createRandomCircle() {
    const circle = document.createElement('div');
    setCircleStyles(circle)
    circle.classList.add('circle');
    board.append(circle);
}


function setCircleStyles(circle) {
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const circleBackgroundColor = getRandomColor();
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = `#${circleBackgroundColor}`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)

}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function onRestartButtonClick() {
    screenSelectTime.classList.remove('up');
    screenMain.classList.remove('up');
    resetScore()
    clearBoard()
}

function clearBoard() {
    board.innerHTML = '';

}

function resetScore() {
    score = 0
}