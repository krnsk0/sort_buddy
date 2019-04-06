import { copyData } from './utils';

const insertionSort = input => {
  // put a copy of the input in the history array
  const history = [];
  history.push(copyData(input));

  // make a working copy of the array we'll use in the sort
  const array = copyData(input);

  for (let i = 0; i < array.length; i += 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      array[j].status = 'comparing';
      array[j + 1].status = 'comparing';
      history.push(copyData(array));

      // if i is smaller swap
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // turn off display comparison
        array[j].status = 'sorted';
        array[j + 1].status = 'sorted';
      } else {
        // turn off display comparison
        array[j].status = 'sorted';
        array[j + 1].status = 'sorted';
        break;
      }
    }
  }
  array.forEach(element => {
    element.status = 'sorted';
  });
  history.push(copyData(array));
  return history;
};

export default insertionSort;
