/* eslint-disable no-unused-vars */

// make a sorted array from 1 to length
const sortedArrayFactory = length => {
  return Array.from({ length: length }, (_, i) => {
    return { value: i + 1, state: 'unsorted' };
  });
};

// shuffle using fisher-yates
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const copyState = array => {
  let output = [];
  for (let el of array) {
    output.push({ ...el });
  }
  return output;
};
