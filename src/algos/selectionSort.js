import { copyData } from './utils';

const selectionSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j += 1) {
      // store old minIndex to allow unmarking
      array[j].status = 'comparing';
      array[minIndex].status = 'comparing';
      let oldMinIndex = minIndex;

      if (array[j].value < array[minIndex].value) {
        minIndex = j;
      }

      history.push(copyData(array));

      array[j].status = 'unsorted';
      array[minIndex].status = 'unsorted';
      array[oldMinIndex].status = 'unsorted';
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    // set the top element as sorted; "edge case"
    array[i].status = 'sorted';
  }
  history.push(copyData(array));
  return history;
};

export default selectionSort;
