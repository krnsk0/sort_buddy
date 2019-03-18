// eslint-disable-next-line no-unused-vars
function* insertion(array) {
  // outer loop, all below i sorted
  for (let i = 0; i < array.length; i += 1) {
    // inner loop goes backwards from i to zero
    for (let j = i - 1; j >= 0; j -= 1) {
      console.log(i, j);
      // display comparison
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';

      yield;

      // if i is smaller swap
      if (array[j].value > array[j + 1].value) {
        swap(array, j + 1, j);

        // turn off display comparison
        array[j].state = 'unsorted';
        array[j + 1].state = 'unsorted';
      } else {
        // turn off display comparison
        array[j].state = 'unsorted';
        array[j + 1].state = 'unsorted';
        break;
      }
    }
  }
  array.forEach(element => {
    element.state = 'sorted';
  });
}
