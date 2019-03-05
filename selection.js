/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function* selection(array) {
  // outer loop from start to end
  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;

    // loop from start to outer loop index
    // and store the index of the smallest element
    for (let j = i + 1; j < array.length; j += 1) {
      // mark elements as comparing
      // store old minIndex to allow unmarking
      array[j].state = 'comparing';
      array[minIndex].state = 'comparing';
      let oldMinIndex = minIndex;

      // do the comparison
      if (array[j].value < array[minIndex].value) {
        minIndex = j;
      }

      // pause
      yield;

      // mark elements as unsorted
      array[j].state = 'unsorted';
      array[minIndex].state = 'unsorted';
      array[oldMinIndex].state = 'unsorted';
    }

    // if we found a new minumum
    // swap with the outer loop index
    if (minIndex !== i) {
      swap(array, minIndex, i);
    }
    // set the top element as sorted
    array[i].state = 'sorted';
  }
}
