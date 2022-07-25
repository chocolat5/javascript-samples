const sampleArray = [
  {
    name: 'Memory Game',
    url: '/memory-game/',
  },
  {
    name: 'Guessing Game',
    url: '/guessing-game/',
  },
  {
    name: 'Color Picking Game',
    url: '/color-picking-game/',
  },
]

const contents = document.getElementById('main');

const cardList = document.createElement('ul');
cardList.setAttribute('class', 'list');

contents.appendChild(cardList)


const getColor1 = () => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 35 * Math.random()) + '%,' + 
             (75 + 10 * Math.random()) + '%)'
}

const getColor2 = () => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (60 + 35 * Math.random()) + '%,' + 
             (75 + 10 * Math.random()) + '%)'
}

const createGrid = () => {
  sampleArray.map(card => {
    const item = document.createElement('li');
    item.classList.add('item');
    item.dataset.name = card.name;

    const itemLink = document.createElement('a');
    itemLink.setAttribute('href', `/javascript-samples${card.url}`);
    itemLink.style.cssText = `
      background-image:
        radial-gradient(at 0% 0%, ${getColor1()}, transparent),
        radial-gradient(at 60% 100%, ${getColor2()}, transparent);
    `
    itemLink.innerHTML = card.name;

    item.appendChild(itemLink);
    cardList.appendChild(item);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  createGrid();
})