const cardsArray = [
  {
    name: 'monster01',
    img: 'images/monster-01.svg',
  },
  {
    name: 'monster02',
    img: 'images/monster-02.svg',
  },
  {
    name: 'monster03',
    img: 'images/monster-03.svg',
  },
  {
    name: 'monster04',
    img: 'images/monster-04.svg',
  },
  {
    name: 'monster05',
    img: 'images/monster-05.svg',
  },
  {
    name: 'monster06',
    img: 'images/monster-06.svg',
  },
];

// Grab the div with an id of root
const game = document.getElementById('game');
const message = document.getElementById('message');

//Only allow two cards to be selected at a time
let count = 0;
let countMatch = 0;

//if two selected cards are a match and hide them
let firstGuess = '';
let secondGuess = '';

let previousTarget = null;

//Add delay
let delay = 800;

// Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

// Append the grid section to the game div
game.appendChild(grid);

// Duplicate array
let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());

gameGrid.map(card => {
  //create card element
  const item = document.createElement('div');
  item.classList.add('card');
  item.dataset.name = card.name;

  //create front of card
  const front = document.createElement('div');
  front.classList.add('front');

  //create back of card
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${card.img})`;

  grid.appendChild(item);
  item.appendChild(front);
  item.appendChild(back);
});

const match = () => {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
  countMatch++;

  if(countMatch === gameGrid.length / 2) {
    gameFinished();
  }
};

// Add event listener to grid
grid.addEventListener('click', function(event) {
  let clicked = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return
  }

  if(count < 2) {
    count++;

    if(count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if(firstGuess !== '' && secondGuess !== '') {
      if(firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }

    // Set previous target to clicked
    previousTarget = clicked;
  }
});

const gameReset = () => {
  message.innerHTML = 'Find the matching pairs';
  var matched = document.querySelectorAll('.match');
  matched.forEach(card => {
    card.classList.remove('match');
  });
}


//Reset guess count after 2
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
}

const gameFinished = () => {
  countMatch = 0;
  const reset = document.createElement('button');
  reset.setAttribute('class', 'reset');
  reset.innerHTML = 'Play Again';
  message.innerHTML = '';

  message.appendChild(reset);
  reset.addEventListener('click', function() {
    gameReset();
  });
}