/* eslint-disable no-undef */
'use strict';
// preferences
const COLORS = {
  unsorted: 'DarkSlateBlue',
  comparing: 'CornflowerBlue',
  sorted: 'DeepSkyBlue'
};
const LENGTH = 25;

// store some references to elements as globals
const stepButton = document.querySelector('#step');
const resetButton = document.querySelector('#reset');

// set up an iterable state array
const algos = ['bubble', 'insertion', 'quick', 'selection', 'merge', 'heap'];
const state = [];
algos.forEach(algoName => {
  state.push({ name: algoName, array: [], generator: null });
});

// render the bars for each sort container
const drawBars = () => {
  // loop through the state object
  state.forEach(stateObj => {
    // get the container for this algo
    let container = document.querySelector(`#${stateObj.name}`);

    // delete old bars
    let bars = container.querySelectorAll('div');
    bars.forEach(element => element.parentNode.removeChild(element));

    // get container height and width
    const containerWidth = window.getComputedStyle(container).width;

    // loop through the data array for this sorting algo
    stateObj.array.forEach((arrayElement, positionIndex) => {
      // create a bar div element
      let sortBarElement = document.createElement('div');
      sortBarElement.classList.add('sort_bar');
      sortBarElement.classList.add(stateObj.name);
      sortBarElement.classList.add('_' + arrayElement.value);

      // add height property
      let heightPercentage = 100 * (arrayElement.value / stateObj.array.length);
      sortBarElement.style.height = `${heightPercentage}%`;

      // add width
      let numberOfElements = stateObj.array.length;
      let widthPercentage = 100 * (1 / numberOfElements);
      sortBarElement.style.width = `${widthPercentage}%`;

      // left start point - broken
      // let startPosition = containerWidth * positionIndex;
      // sortBarElement.style.left = `${startPosition}px`;

      // add color, append
      sortBarElement.style.backgroundColor = COLORS[arrayElement.state];
      container.appendChild(sortBarElement);
    });
  });
};

// this is called on page load and on reset button click
const initialize = () => {
  // create an unsorted array
  let unsortedArray = shuffleArray(sortedArrayFactory(LENGTH));

  // store a copy in each state object
  state.forEach(stateObj => {
    stateObj.array = copyState(unsortedArray);
  });

  // set up generator functions for each state object
  // pass in each generator's corresponding data array
  state.forEach(stateObj => {
    stateObj.generator = window[stateObj.name](stateObj.array);
  });

  // draw everything
  drawBars();
};

// step function
const step = () => {
  // loop through the state object
  state.forEach(stateObj => {
    // call this generator's next()
    stateObj.generator.next();

    // call draw
    drawBars();
  });
};

// event handler for step button click
stepButton.addEventListener('click', _ => {
  step();
});

// event handler for reset button click
resetButton.addEventListener('click', _ => {
  initialize();
});

// start your engines!
initialize();

/*
action: {
  type: 'SWAP', 'COMPARE', 'CLEAR', 'SORT'
  key1: number
  key2: number
  algo: algoName
}
*/

const swapElements = (algoName, key1, key2) => {
  const div1 = document.querySelector(`.${algoName}._${key1}`);
  const div1left = div1.getClientRects()[0].left;

  const div2 = document.querySelector(`.${algoName}._${key1}`);
  const div2left = div2.getClientRects()[0].left;

  return div1;
};
// let d = swapElements('bubble', 2, 15);