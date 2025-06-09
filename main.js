const btnOpenGuessGame = document.querySelector('.open-modal--guess-number');
const modalGuessNumber = document.querySelector('.modal--guess-number');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnLevelEasy = document.querySelector('.level-easy');

const openModal = function () {
    modalGuessNumber.classList.remove('hidden');
    modalGuessNumber.classList.add('flex');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
};

const closeModal = function () {
    modalGuessNumber.classList.add('hidden');
    modalGuessNumber.classList.remove('flex');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}

btnOpenGuessGame.addEventListener('click', function () {
    openModal();
});

btnCloseModal.addEventListener('click', function () {
    closeModal();
});

overlay.addEventListener('click', function () {
    closeModal();
});

btnLevelEasy.addEventListener('click', function () {
    window.location.href = 'guessNumber.html';
});