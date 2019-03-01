'use strict';

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
  // grab and clear the container
  let sortContainer = document.querySelector('.sort_container#bubble');
  sortContainer.innerHTML = '';

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
};

function* bubbleSort(array) {
  // outer loop from end to start
  for (let i = array.length - 1; i >= 0; i -= 1) {
    // a flag to track whether we've swapped on this loop
    let swap = false;

    // inner loop that does the comparison
    for (let j = 0; j < i; j += 1) {
      // mark elements as comparing
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';

      // check if we need to swap and do it
      if (array[j].value > array[j + 1].value) {
        // set swap to true
        swap = true;

        // mark elements as swapping
        array[j].state = 'swapping';
        array[j + 1].state = 'swapping';

        // do the swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }

      // yield the array for drawing & pause
      yield array;

      // clear the element state
      array[j].state = 'unsorted';
      array[j + 1].state = 'unsorted';
    }

    // set the top element as sorted
    array[i].state = 'sorted';

    // quit outer loop if we didn't do any swaps
    if (!swap) {
      // mark all states as sorted
      for (let x = 0; x < array.length; x += 1) {
        array[x].state = 'sorted';
      }

      // quit
      return array;
    }
  }
}

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
  if (event.keyCode === 32) {
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
