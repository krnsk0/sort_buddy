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
  bubbleSort: { history: [], pointer: 0 },
  selectionSort: { history: [], pointer: 0 },
  insertionSort: { history: [], pointer: 0 },
  mergeSort: { history: [], pointer: 0 },
  heapSort: { history: [], pointer: 0 },
  quickSort: { history: [], pointer: 0 }
};
const reducer = (state = initialState, action) => {
  if (action.type === RESET_ARRAY) {
    const shuffledArray = shuffledArrayFactory(action.size);
    return {
      bubbleSort: { history: bubbleSort(shuffledArray), pointer: 0 },
      selectionSort: { history: selectionSort(shuffledArray), pointer: 0 },
      insertionSort: { history: insertionSort(shuffledArray), pointer: 0 },
      mergeSort: { history: mergeSort(shuffledArray), pointer: 0 },
      heapSort: { history: heapSort(shuffledArray), pointer: 0 },
      quickSort: { history: quickSort(shuffledArray), pointer: 0 }
    };
  } else if (action.type === STEP) {
    return {
      bubbleSort: {
        history: state.bubbleSort.history,
        pointer: (state.bubbleSort.pointer += 1)
      },
      selectionSort: {
        history: state.selectionSort.history,
        pointer: (state.selectionSort.pointer += 1)
      },
      insertionSort: {
        history: state.insertionSort.history,
        pointer: (state.insertionSort.pointer += 1)
      },
      mergeSort: {
        history: state.mergeSort.history,
        pointer: (state.mergeSort.pointer += 1)
      },
      heapSort: {
        history: state.heapSort.history,
        pointer: (state.heapSort.pointer += 1)
      },
      quickSort: {
        history: state.quickSort.history,
        pointer: (state.quickSort.pointer += 1)
      }
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
