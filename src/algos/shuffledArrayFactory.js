/*
Function for generating a shuffled array object of a given size
Returned array has shape:

[
  {value: 0, status: 'unsorted'},
  {value: 1, status: 'unsorted'},
  ...
  {value: n, status: 'unsorted'}
]

*/

const sortedArrayFactory = length => {
  return Array.from({ length: length }, (_, i) => {
    return { value: i + 1, status: 'unsorted' };
  });
};

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledArrayFactory = size => shuffleArray(sortedArrayFactory(size));
export default shuffledArrayFactory;
