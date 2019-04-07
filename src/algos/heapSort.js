import { copyData } from './utils';

const heapSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  const buildMaxHeap = () => {
    let i = Math.floor(array.length / 2 - 1);

    while (i >= 0) {
      heapify(i, array.length);
      i -= 1;
    }
  };

  const heapify = (i, max) => {
    while (i < max) {
      let index = i;
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;

      if (leftChild < max && array[leftChild].value > array[index].value) {
        index = leftChild;
      }
      if (rightChild < max && array[rightChild].value > array[index].value) {
        index = rightChild;
      }

      if (index === i) {
        return;
      }

      [array[i], array[index]] = [array[index], array[i]];

      history.push(copyData(array));

      i = index;
    }
  };

  const heapSortHelper = () => {
    buildMaxHeap();
    let lastElement = array.length - 1;

    while (lastElement > 0) {
      [array[0], array[lastElement]] = [array[lastElement], array[0]];
      history.push(copyData(array));
      heapify(0, lastElement);
      lastElement -= 1;
    }
  };

  heapSortHelper();

  history.push(copyData(array));
  return history;
};

export default heapSort;
