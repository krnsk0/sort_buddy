import { copyData } from './utils';

const selectionSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  // outer loop from start to end
  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;

    // loop from start to outer loop index
    // and store the index of the smallest element
    for (let j = i + 1; j < array.length; j += 1) {
      // mark elements as comparing
      // store old minIndex to allow unmarking
      array[j].status = 'comparing';
      array[minIndex].status = 'comparing';
      let oldMinIndex = minIndex;

      // do the comparison
      if (array[j].value < array[minIndex].value) {
        minIndex = j;
      }

      // pause
      history.push(copyData(array));

      // mark elements as unsorted
      array[j].status = 'unsorted';
      array[minIndex].status = 'unsorted';
      array[oldMinIndex].status = 'unsorted';
    }

    // if we found a new minumum
    // swap with the outer loop index
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    // set the top element as sorted
    array[i].status = 'sorted';
  }
  history.push(copyData(array));
  return history;
};

export default selectionSort;
