import { copyData } from './utils';

const bubbleSort = array => {
  // copy the array
  array = copyData(array);

  // put the initial state in the array
  const history = [];

  for (let i = array.length - 1; i > 0; i -= 1) {
    for (let j = 0; j < i; j += 1) {
      // mark elements as comparing
      array[j].status = 'comparing';
      array[j + 1].status = 'comparing';

      // swap if needed
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }

      // push a copy to the history
      history.push(copyData(array));

      // clear comparing state
      array[j].status = 'unsorted';
      array[j + 1].status = 'unsorted';
    }
  }

  return history;
};

export default bubbleSort;
