'use strict';

const backButton = document.querySelector('.back-button');

backButton.addEventListener('click', function () {
    window.location.href = 'index.html';
});

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll-dice');
const btnNew = document.querySelector('.btn-new-game');
const btnHold = document.querySelector('.btn-hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, currentScore, activePlayer, isPlaying;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    //starting conditions
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
    document.querySelector(`#name--0 .winner`).classList.add('hidden');
    document.querySelector(`#name--1 .winner`).classList.add('hidden');
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
    diceEl.classList.remove('hidden');
}

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        //generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/dice-${dice}.svg`;

        //check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (isPlaying) {
        //add current score to active player's score 
        //scores[1] = scores[1] + currentScore;
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        //check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //finish the game
            isPlaying = false;
            const winner = document.querySelector(`#name--${activePlayer} .winner`);
            winner.classList.remove('hidden');
            btnHold.classList.add('hidden');
            btnRoll.classList.add('hidden');
            diceEl.classList.add('hidden');
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);