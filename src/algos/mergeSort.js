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

    array[i].status = 'comparing';
    array[j].status = 'comparing';

    while (i <= middle && j <= end) {
      if (array[i].value <= array[j].value) {
        history.push(copyData(array));

        array[i].status = 'unsorted';
        array[j].status = 'unsorted';

        i += 1;
      } else if (array[j].value < array[i].value) {
        const removed = array.splice(j, 1);
        array.splice(i, 0, ...removed);

        history.push(copyData(array));

        j += 1;
        i += 1;
        middle += 1;

        array[i].status = 'unsorted';
        array[i - 1].status = 'unsorted';
      }
    }
  };

  const mergeRecursive = (start, end) => {
    // start & end inclusive
    if (end - start === 1) {
      array[start].status = 'comparing';
      array[end].status = 'comparing';

      if (array[start].value > array[end].value) {
        [array[start], array[end]] = [array[end], array[start]];

        history.push(copyData(array));

        array[start].status = 'unsorted';
        array[end].status = 'unsorted';
      }
      return;
    }
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
