'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let current = 0;
let activePlayer = 0;
let playing = true;

const setCurrentScore = function (score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};

const toggleActivePlayer = function () {
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const updateTotalScores = function () {
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const diceRoll = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceRoll}.png`;

  if (diceRoll === 1) {
    current = 0;
    setCurrentScore(current);
    toggleActivePlayer();
  } else {
    current += diceRoll;
    setCurrentScore(current);
  }
});

btnNew.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  current = 0;
  playing = true;
  setCurrentScore(current);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  updateTotalScores();
  diceEl.classList.add('hidden');
});

btnHold.addEventListener('click', function () {
  if (!playing) return;

  // Update total score
  scores[activePlayer] += current;

  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    diceEl.classList.add('hidden');
  } else {
    // Reset values
    current = 0;
    setCurrentScore(current);

    updateTotalScores();
    toggleActivePlayer();
  }
});
