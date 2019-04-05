import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import bubbleSort from '../algos/bubbleSort';
import sortedArrayFactory from '../algos/shuffledArrayFactory';

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
const initialState = {
  bubbleSort: [],
  selectionSort: [],
  insertionSort: [],
  mergeSort: [],
  heapSort: [],
  quickSort: []
};
const reducer = (state = initialState, action) => {
  if (action.type === RESET_ARRAY) {
    const newArray = sortedArrayFactory(action.size);
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
