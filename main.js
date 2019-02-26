// make a sorted array from 1 to length
const sortedArrayFactory = length => {
  return Array.from({ length: length }, (_, i) => i + 1);
};

// shuffle using fisher-yates
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// nearly sorted shuffle
const barelyShuffleArray = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let randomness = Math.floor(array.length / 10);
    let min = i - randomness;
    let delta = i + 1 - min;
    let j = Math.floor(Math.random() * delta) + min;
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
    let sortBarElement = document.createElement('div');
    sortBarElement.classList.add('sort_bar');
    let height = 300 * (arrayElement / LENGTH);
    sortBarElement.style.height = `${height}px`;
    sortContainer.appendChild(sortBarElement);
  });
};

function* bubbleSort(array) {
  // outer loop from end to start
  for (let i = array.length; i >= 0; i -= 1) {
    // a flag to track whether we've swapped on this loop
    let swap = false;

    // inner loop that does the comparison
    for (let j = 0; j <= i; j += 1) {
      // check if we need to swap and do it
      if (array[j] > array[j + 1]) {
        swap = true;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }

    // quit outer loop if we didn't do any swaps
    if (!swap) {
      break;
    }

    // return the array
    yield array;
  }
}

// initialize an unsorted array
const LENGTH = 10;
let array = sortedArrayFactory(LENGTH);
array = shuffleArray(array);
let generator = bubbleSort(array);
drawBars(array, LENGTH);

// event to step through the array
let stepButton = document.querySelector('#step');
stepButton.addEventListener('click', _ => {
  let genOutput = generator.next();
  if (!genOutput.done) {
    drawBars(genOutput.value, LENGTH);
  }
});
