// eslint-disable-next-line no-unused-vars
function* bubble(array) {
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
      yield;

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
      return;
    }
  }
}
