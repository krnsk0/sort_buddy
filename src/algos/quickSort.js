import { copyData } from './utils';

const quickSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  const pivotFunc = (start, end) => {
    const pivot = array[start].value;
    array[start].status = 'comparing';

    let pivotIndex = start;

    for (let i = start + 1; i <= end; i += 1) {
      array[i].status = 'comparing';
      history.push(copyData(array));
      array[i].status = 'unsorted';

      if (pivot > array[i].value) {
        pivotIndex += 1;
        // do the swap
        [array[pivotIndex], array[i]] = [array[i], array[pivotIndex]];
      }
    }

    array[start].status = 'unsorted';

    // do the swap
    [array[pivotIndex], array[start]] = [array[start], array[pivotIndex]];

    array[pivotIndex].status = 'sorted';

    return pivotIndex;
  };

  const quickSortRecursive = (left, right) => {
    if (left === right) {
      array[left].status = 'sorted';
    }

    if (left < right) {
      let pivotIndex = pivotFunc(left, right);
      history.push(copyData(array));

      quickSortRecursive(left, pivotIndex - 1);
      quickSortRecursive(pivotIndex + 1, right);
    }
  };

  quickSortRecursive(0, array.length - 1);
  history.push(copyData(array));
  return history;
};

export default quickSort;
