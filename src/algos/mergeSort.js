/* eslint-disable no-return-assign */
import { copyData } from './utils';

const mergeSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  const merge = (start, middle, end) => {
    // mark all as unsorted
    array.forEach(el => (el.status = 'unsorted'));

    let i = start;
    let j = middle + 1;

    while (i <= middle && j <= end) {
      if (array[i].value <= array[j].value) {
        history.push(copyData(array));

        i += 1;
      } else if (array[j].value < array[i].value) {
        const removed = array.splice(j, 1);
        array.splice(i, 0, ...removed);

        history.push(copyData(array));

        j += 1;
        i += 1;
        middle += 1;
      }
    }
  };

  const mergeRecursive = (start, end) => {
    if (end === start) return;

    const middle = Math.floor(start + (end - start) / 2);

    mergeRecursive(start, middle);
    mergeRecursive(middle + 1, end);

    merge(start, middle, end);
  };

  mergeRecursive(0, array.length - 1);

  return history;
};

export default mergeSort;
