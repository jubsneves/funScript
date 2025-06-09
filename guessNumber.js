'use strict';

const checkNumber = document.querySelector('.check-number');
const guessNumber = document.querySelector('.guess-number');
const btnBack = document.querySelector('.back-button');
let score = 20;
const cardImg = document.querySelector('.card-image');
const card = document.querySelector('.card-number');
let highscore = 0;

btnBack.addEventListener('click', function () {
    window.location.href = 'index.html';
});

const newSecretNumber = function () {
    return Math.trunc(Math.random() * 20) + 1;
}

let secretNumber = newSecretNumber();

const displayMesage = function (message) {
    document.querySelector('.message').textContent = message;
}

//Try again and reset the game
const tryAgain = document.querySelector('.try-again').addEventListener('click', function () {
    score = 20;
    secretNumber = newSecretNumber();
    displayMesage('Start guessing...');
    document.querySelector('.score').textContent = score;
    guessNumber.value = '';
    document.querySelector('.secret-number').textContent = '?';
    document.querySelector('body').style.backgroundColor = 'rgb(17, 24, 39)';
    cardImg.src = 'assets/default-guess.svg';
});



//Check number button
const checkGuess = function () {
    const guess = Number(guessNumber.value);
    guessNumber.value = '';

    //When there is no number
    if (!guess) {
        displayMesage('Guess a number to start');
    }

    //Win
    else if (guess === secretNumber) {
        displayMesage('Congratulations, you got it! 🥳');
        document.querySelector('.secret-number').textContent = secretNumber;
        cardImg.src = 'assets/success-guess.svg';
        card.classList.remove('animate-shake');
        void card.offsetWidth;
        card.classList.add('animate-shake');
        document.querySelector('body').style.backgroundColor = 'rgb(0, 42, 0)';
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }
    //Wrong number 
    else if (guess !== secretNumber) {
        if (score > 1) {
            displayMesage(guess > secretNumber ? `📈 ${guess} too high!` : `📉 ${guess} is too low!`);
            score--;
            document.querySelector('.score').textContent = score;
            card.classList.remove('animate-shake');
            void card.offsetWidth;
            card.classList.add('animate-shake');
            cardImg.src = 'assets/wrong-guess.svg';
            setTimeout(() => {
                cardImg.src = 'assets/default-guess.svg';
            }, 600);
        } else { //Lost the game
            displayMesage('Oh no, you lost the game! 😭');
            document.querySelector('.score').textContent = 0;
        }
    }
};

checkNumber.addEventListener('click', checkGuess);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});