/*
Copyright 2019 chocolat
*/


let numSqueares = 6;
let colors = [];
let pickedColor;
let pickedNum;

/**
 * create html element
 */
const app = document.getElementById('app');

const p = document.createElement('p');
p.textContent = `Select the correct color tip from below.`;

const colorDisplay = document.createElement('p');
colorDisplay.setAttribute('class', 'color_display');

const message = document.createElement('p');
message.setAttribute('class', 'message');

//create buttons
const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button_container');

const resetButton = document.createElement('button');
resetButton.textContent = 'New Color';
resetButton.setAttribute('id', 'reset');
resetButton.setAttribute('class', 'reset');

const modeButtonWrap = document.createElement('div');
modeButtonWrap.setAttribute('class', 'mode_btn_wrap');

const  modeButtonEasy = document.createElement('button');
modeButtonEasy.textContent = 'EASY';
modeButtonEasy.setAttribute('class', 'mode');

const modeButtonHard = document.createElement('button');
modeButtonHard.textContent = 'HARD';
modeButtonHard.setAttribute('class', 'mode selected');

modeButtonWrap.appendChild(modeButtonEasy);
modeButtonWrap.appendChild(modeButtonHard);

buttonContainer.appendChild(resetButton);
buttonContainer.appendChild(modeButtonWrap);

const colorTipsContainer = document.createElement('div');
colorTipsContainer.setAttribute('id', 'container');
colorTipsContainer.setAttribute('class', 'color_tips_container');


//add app
app.appendChild(p);
app.appendChild(colorDisplay);
app.appendChild(message);
app.appendChild(buttonContainer);
app.appendChild(colorTipsContainer);



/**
 * generate random color
 */
const generateRandomColors = () => {
  const _generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  for(let i = 0; i < numSqueares; i++) {
    colors.push(_generateRandomColor());
  }
}



/**
 * generate color tips
 */
const generateColorTips = () => {
  colors.map(color => {
    const item = document.createElement('div');
    item.setAttribute('class', 'square');
    item.style.backgroundColor = color;

    colorTipsContainer.appendChild(item);

    item.addEventListener('click', () => {
      if(item.classList.contains('disabled')) {
        return false;
      } else {
        checkColor(color, item);
      }
    });
  })
};



/**
 * picked color
 */
const pickColor = () => {
  pickedNum = Math.floor(Math.random() * colors.length);
  colorDisplay.textContent = colors[pickedNum].toUpperCase();
}


/**
 * checking the color is correct or not
 */
const checkColor = (color, choice) => {
  pickedColor = colors[pickedNum];

  if(pickedColor === color) {
    //正解
    message.textContent = `Correct`;
    resetButton.textContent = `Play Again?`;
    choice.classList.add('disabled');
    colorDisplay.style.color = pickedColor;
    changeColors(pickedColor);
  } else {
    //不正解
    choice.style.backgroundColor = '#f3f3f3';
    choice.classList.add('disabled');
    message.textContent = `Try Again`;
    
  }
}


/**
 * change color tips to correct color
 */
const changeColors = (pickedColor) => {
  const colorTips = document.querySelectorAll('.square');
  colorTips.forEach(tip => {
    tip.style.backgroundColor = pickedColor;
    tip.classList.add('disabled');
  })
}


/**
 * reset
 */
const resetGame = () => {
  while(colorTipsContainer.firstChild) {
    colorTipsContainer.removeChild(colorTipsContainer.firstChild);
  }
  colors = [];
  generateRandomColors();
  generateColorTips();
  pickColor();
  message.textContent = '';
  colorDisplay.style.color = '#444';
  resetButton.textContent = 'New Color';
}


/**
 * switch mode
 */
const switchMode = (button) => {
  const current = document.querySelector('.selected');
  current.classList.remove('selected');
  button.classList.add('selected');
  numSqueares = button.textContent === 'EASY' ? 3 : 6;
  resetGame();
}

resetButton.addEventListener('click', resetGame);

modeButtonEasy.addEventListener('click', () => {
  switchMode(modeButtonEasy);
});
modeButtonHard.addEventListener('click', () => {
  switchMode(modeButtonHard);
});

const init = () => {
  generateRandomColors();
  generateColorTips();
  pickColor();
}

init();