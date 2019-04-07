/* eslint-disable complexity */
/* eslint-disable no-return-assign */
import { copyData } from './utils';

const mergeSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  const merge = (start, middle, end) => {
    let i = start;
    let j = middle + 1;

    for (let x = start; x <= end; x += 1) {
      array[x].status = 'unsorted';
    }

    while (i <= middle && j <= end) {
      if (array[i].value <= array[j].value) {
        array[i].status = 'comparing';
        array[j].status = 'comparing';

        history.push(copyData(array));

        array[i].status = 'sorted';
        array[j].status = 'unsorted';

        i += 1;
      } else if (array[j].value < array[i].value) {
        array[i].status = 'comparing';
        array[j].status = 'comparing';

        history.push(copyData(array));

        const removed = array.splice(j, 1);
        array.splice(i, 0, ...removed);

        array[i].status = 'sorted';
        array[i + 1].status = 'unsorted';

        j += 1;
        i += 1;
        middle += 1;
      }
    }

    for (let x = start; x <= end; x += 1) {
      array[x].status = 'sorted';
    }
    history.push(copyData(array));
  };

  const mergeRecursive = (start, end) => {
    if (end === start) return;

    const middle = Math.floor(start + (end - start) / 2);

    mergeRecursive(start, middle);
    mergeRecursive(middle + 1, end);

    merge(start, middle, end);
  };

  mergeRecursive(0, array.length - 1);
  array.forEach(el => (el.status = 'sorted'));
  history.push(copyData(array));

  return history;
};

export default mergeSort;
