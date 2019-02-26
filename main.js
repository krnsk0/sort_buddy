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
  let sortContainer = document.querySelector('.sort_container');
  sortContainer.innerHTML = '';

  // render each bar and add it
  array.forEach(arrayElement => {
    // create the element
    let sortBarElement = document.createElement('div');
    sortBarElement.classList.add('sort_bar');

    // add height
    let height = 300 * (arrayElement.value / LENGTH);
    sortBarElement.style.height = `${height}px`;

    // add color
    let colors = {
      unsorted: 'black',
      comparing: 'darkred',
      swapping: 'red',
      sorted: 'green'
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

// initialize an unsorted array
const LENGTH = 10;
let array = sortedArrayFactory(LENGTH);
array = shuffleArray(array);
let generator = bubbleSort(array);
drawBars(array, LENGTH);

// event handler to step through the array
let stepButton = document.querySelector('#step');
stepButton.addEventListener('click', _ => {
  let genOutput = generator.next();

  // if generator unfinished, draw
  if (!genOutput.done) {
    drawBars(genOutput.value, LENGTH);

    // if generator finished, draw and disable button
  } else {
    stepButton.disabled = true;
    drawBars(genOutput.value, LENGTH);
  }
});
