import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import shuffledArrayFactory from '../algos/shuffledArrayFactory';
import bubbleSort from '../algos/bubbleSort';

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
      bubbleSort: { history: [[...shuffledArray]], pointer: 0 },
      selectionSort: { history: [[...shuffledArray]], pointer: 0 },
      insertionSort: { history: [[...shuffledArray]], pointer: 0 },
      mergeSort: { history: [[...shuffledArray]], pointer: 0 },
      heapSort: { history: [[...shuffledArray]], pointer: 0 },
      quickSort: { history: [[...shuffledArray]], pointer: 0 }
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
