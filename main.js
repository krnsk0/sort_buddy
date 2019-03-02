'use strict';
/* eslint-disable no-undef */
// https://www.toptal.com/developers/sorting-algorithms

// store some references to elements as globals
const stepButton = document.querySelector('#step');
const resetButton = document.querySelector('#reset');

// set up an iterable state array
// that contains objects representing the state of each
// sorting algo and its corresopnding data
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

    // clear the container
    container.innerHTML = '';

    stateObj.array.forEach(arrayElement => {
      // create the element
      let sortBarElement = document.createElement('div');
      sortBarElement.classList.add('sort_bar');

      // add height
      let height = 250 * (arrayElement.value / stateObj.array.length);
      sortBarElement.style.height = `${height}px`;

      // add color
      let colors = {
        unsorted: 'DarkSlateBlue',
        comparing: 'CornflowerBlue',
        swapping: 'CornflowerBlue',
        sorted: 'DeepSkyBlue'
      };
      sortBarElement.style.backgroundColor = colors[arrayElement.state];

      // append
      container.appendChild(sortBarElement);
    });
  });
};

// the initialize function
const initialize = () => {
  // create an unsorted array
  const LENGTH = 20;
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
    let genOutputObject = stateObj.generator.next();

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
