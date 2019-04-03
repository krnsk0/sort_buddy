import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// utilities
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
const createNewArray = size => shuffleArray(sortedArrayFactory(size));

// action types
export const RESET_ARRAY = 'RESET_ARRAY';
export const STEP = 'STEP';

// action creators
export const resetArray = size => {
  return {
    type: RESET_ARRAY,
    size
  };
};
export const step = () => {
  return {
    type: STEP
  };
};
// reducer
const array = createNewArray(10);
const initialState = {
  bubbleSort: [...array],
  selectionSort: [...array],
  insertionSort: [...array],
  mergeSort: [...array],
  heapSort: [...array],
  quickSort: [...array]
};
const reducer = (state = initialState, action) => {
  if (action.type === RESET_ARRAY) {
    const newArray = createNewArray(action.size);
    return {
      bubbleSort: [...newArray],
      selectionSort: [...newArray],
      insertionSort: [...newArray],
      mergeSort: [...newArray],
      heapSort: [...newArray],
      quickSort: [...newArray]
    };
  } else {
    return state;
  }
};

// create store
export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
