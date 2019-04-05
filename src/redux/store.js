/* eslint-disable no-return-assign */
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import shuffledArrayFactory from '../algos/shuffledArrayFactory';
import bubbleSort from '../algos/bubbleSort';
import selectionSort from '../algos/selectionSort';
import insertionSort from '../algos/insertionSort';
import mergeSort from '../algos/mergeSort';
import heapSort from '../algos/heapSort';
import quickSort from '../algos/quickSort';

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
  pointer: 0,
  bubbleSort: [],
  selectionSort: [],
  insertionSort: [],
  mergeSort: [],
  heapSort: [],
  quickSort: []
};
const reducer = (state = initialState, action) => {
  if (action.type === RESET_ARRAY) {
    const shuffledArray = shuffledArrayFactory(action.size);
    return {
      pointer: 0,
      bubbleSort: bubbleSort(shuffledArray),
      selectionSort: selectionSort(shuffledArray),
      insertionSort: insertionSort(shuffledArray),
      mergeSort: mergeSort(shuffledArray),
      heapSort: heapSort(shuffledArray),
      quickSort: quickSort(shuffledArray)
    };
  } else if (action.type === STEP) {
    return {
      ...state,
      pointer: state.pointer + 1
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
