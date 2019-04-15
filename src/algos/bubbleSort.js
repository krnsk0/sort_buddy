import { copyData } from './utils';

const bubbleSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  for (let i = array.length - 1; i > 0; i -= 1) {
    let swapFlag = false;
    for (let j = 0; j < i; j += 1) {
      array[j].status = 'comparing';
      array[j + 1].status = 'comparing';

      // where the swap happens
      if (array[j].value > array[j + 1].value) {
        swapFlag = true;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }

      history.push(copyData(array));
      array[j].status = 'unsorted';
      array[j + 1].status = 'unsorted';
    }

    // set the top element status; "edge case"
    array[i].status = 'sorted';

    // quit if no swaps
    if (!swapFlag) {
      for (let x = 0; x < array.length; x += 1) {
        array[x].status = 'sorted';
      }
      break;
    }
  }
  history.push(copyData(array));
  return history;
};

export default bubbleSort;
