/* eslint-disable no-undef */
// https://www.toptal.com/developers/sorting-algorithms
'use strict';
const algos = ['bubble', 'insertion', 'quick', 'selection', 'merge', 'heap'];

// make a sorted array from 1 to length
const sortedArrayFactory = length => {
  return Array.from({ length: length }, (_, i) => {
    return { value: i + 1, state: 'unsorted' };
  });
};

// shuffle using fisher-yates
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// render the bars
const drawBars = (array, LENGTH) => {
  // loop through sort containers
  const containers = document.querySelectorAll('.sort_container');
  containers.forEach(function(container) {
    // clear the container
    this.innerHTML = '';

    // render each bar and add it
    array.forEach(arrayElement => {
      // create the element
      let sortBarElement = document.createElement('div');
      sortBarElement.classList.add('sort_bar');

      // add height
      let height = 250 * (arrayElement.value / LENGTH);
      sortBarElement.style.height = `${height}px`;

      // add color
      let colors = {
        unsorted: 'black',
        comparing: 'CornflowerBlue',
        swapping: 'CornflowerBlue',
        sorted: 'DeepSkyBlue'
      };
      sortBarElement.style.backgroundColor = colors[arrayElement.state];

      // append
      sortContainer.appendChild(sortBarElement);
    });
  });
};

// get the buttons
const stepButton = document.querySelector('#step');
const resetButton = document.querySelector('#reset');

// initialize everything
const LENGTH = 20;
let array = sortedArrayFactory(LENGTH);
array = shuffleArray(array);
drawBars(array, LENGTH);
stepButton.disabled = false;
let generator = bubbleSort(array);

// step function
const step = () => {
  // advance the generator by one step
  let genOutput = generator.next();

  // if generator unfinished, draw
  if (!genOutput.done) {
    drawBars(genOutput.value, LENGTH);

    // if generator finished, draw and disable button
  } else {
    stepButton.disabled = true;
    drawBars(genOutput.value, LENGTH);
  }
};

// spacebar
document.addEventListener('keypress', event => {
  if (event.keyCode === 32 && stepButton.disabled === false) {
    step();
  }
});

// event handler for step button click
stepButton.addEventListener('click', _ => {
  step();
});

// event handler for reset button click
resetButton.addEventListener('click', _ => {
  array = sortedArrayFactory(LENGTH);
  array = shuffleArray(array);
  drawBars(array, LENGTH);
  stepButton.disabled = false;
  generator = bubbleSort(array);
});
