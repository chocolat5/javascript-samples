//create form and other element
const app = document.getElementById('app');

const p = document.createElement('p');
p.textContent = `We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.`;

const form = document.createElement('form');
const label = document.createElement('label');
label.setAttribute('for', 'guessField');
label.textContent = `Enter a guess: `;

const guessField = document.createElement('input');
guessField.setAttribute('id', 'guessField');
guessField.setAttribute('type', 'number');

const guessSubmit = document.createElement('input');
guessSubmit.setAttribute('id', 'guessField');
guessSubmit.setAttribute('value', 'Submit guess');
guessSubmit.setAttribute('type', 'submit');
guessSubmit.setAttribute('class', 'guessSubmit');

form.appendChild(label);
form.appendChild(guessField);
form.appendChild(guessSubmit);

const result = document.createElement('div');
result.setAttribute('class', 'resultParas');
const guesses = document.createElement('p');
guesses.setAttribute('class', 'guesses');
const lastResult = document.createElement('p');
lastResult.setAttribute('class', 'lastResult');
const lowOrHi = document.createElement('p');
lowOrHi.setAttribute('class', 'lowOrHi');
const errorMsg = document.createElement('p');

result.appendChild(guesses);
result.appendChild(lastResult);
result.appendChild(lowOrHi);
result.appendChild(errorMsg);

app.appendChild(p);
app.appendChild(form);
app.appendChild(result);

//count number of player guessing
let guessCount = 1;
let randomNumber;
let resetButton;

//correct number
const setRandomNumber = () => {
  randomNumber = 1 + Math.floor(Math.random() * 100);
};

const checkGuess = (event) => {
  event.preventDefault();

  if(!guessField.value) {
    errorMsg.textContent= 'Please enter the number';
    errorMsg.style.color = '#F05F5A';
    return false;
  }

  errorMsg.textContent = '';

  //入力された数値を格納
  let userGuess = Number(guessField.value);

  //1回目の入力
  if(guessCount === 1) {
    guesses.textContent = `前回の予想: `;
  }

  //入力された数値を表示
  guesses.textContent += userGuess + ', ';

  //入力された数値をチェック
  if(userGuess === randomNumber) {
    lastResult.textContent= 'Congratulations!';
    lastResult.style.color = '#64D7D7';
    guesses.textContent = '';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent= 'Game Over...';
    guesses.textContent = '';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent= 'Wrong';
    lastResult.style.color = '#F05F5A';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = `too low`;
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = `too high`;
    }
  }

  //submitをクリックする度にユーザーが予想した回数を増やす
  guessCount++;

  //submitをクリックしたらinputを空にする
  guessField.value = '';

  guessField.focus();
}

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = `Play Again`;
  app.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

const resetGame = () => {
  guessCount = 1;

  let resetParas = document.querySelectorAll('.resultParas p');
  resetParas.forEach((paras, index) => {
    paras.textContent = '';
  });
  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  setRandomNumber();
}


document.addEventListener('DOMContentLoaded', setRandomNumber);

guessSubmit.addEventListener('click', checkGuess);