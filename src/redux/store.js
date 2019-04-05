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
export const STEP_FORWARD = 'STEP_FORWARD';
export const STEP_BACK = 'STEP_BACK';

// action creators
export const resetArray = size => {
  return {
    type: RESET_ARRAY,
    size
  };
};
export const stepForward = () => {
  return {
    type: STEP_FORWARD
  };
};
export const stepBack = () => {
  return {
    type: STEP_BACK
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
  } else if (action.type === STEP_FORWARD) {
    return {
      ...state,
      pointer: state.pointer + 1
    };
  } else if (action.type === STEP_BACK) {
    return {
      ...state,
      pointer: state.pointer - 1 >= 0 ? state.pointer - 1 : 0
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
