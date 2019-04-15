/* eslint-disable no-duplicate-imports */
/* eslint-disable no-return-assign */
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import shuffledArrayFactory from '../algos/shuffledArrayFactory';
import bubbleSort from '../algos/bubbleSort';
import selectionSort from '../algos/selectionSort';
import insertionSort from '../algos/insertionSort';
import mergeSort from '../algos/mergeSort';
import heapSort from '../algos/heapSort';
import quickSort from '../algos/quickSort';

// constants
const INITIAL_SIZE = 16;

// action types
export const RESET_ARRAY = 'RESET_ARRAY';
export const STEP_FORWARD = 'STEP_FORWARD';
export const STEP_BACK = 'STEP_BACK';
export const TOGGLE_POPUP = 'TOGGLE_POPUP';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';

// action creators
export const resetArray = size => ({ type: RESET_ARRAY, size });
export const stepForward = () => ({ type: STEP_FORWARD });
export const stepBack = () => ({ type: STEP_BACK });
export const togglePopup = () => ({ type: TOGGLE_POPUP });
export const togglePlaying = () => ({ type: TOGGLE_PLAYING });

// selectors
export const selectSorts = state => state.sorts;
export const selectMaxLength = state =>
  Object.values(selectSorts(state))
    .map(sort => sort.length)
    .sort((a, b) => a - b)
    .reverse()[0];

// state initialization
const buildSortState = unsortedArray => ({
  bubble: bubbleSort(unsortedArray),
  selection: selectionSort(unsortedArray),
  insertion: insertionSort(unsortedArray),
  merge: mergeSort(unsortedArray),
  heap: heapSort(unsortedArray),
  quick: quickSort(unsortedArray)
});
const buildInitialState = () => {
  const unsortedArray = shuffledArrayFactory(INITIAL_SIZE);
  return {
    playing: false,
    popup: true,
    pointer: 0,
    sorts: buildSortState(unsortedArray),
    size: INITIAL_SIZE
  };
};

const reducer = (state = buildInitialState(), action) => {
  // not pure due to Math.random(), oh well
  if (action.type === RESET_ARRAY) {
    const { size } = action;
    const unsortedArray = shuffledArrayFactory(size);
    return {
      ...state,
      pointer: 0,
      playing: false,
      size,
      sorts: buildSortState(unsortedArray)
    };
  } else if (action.type === STEP_FORWARD) {
    return {
      ...state,
      pointer: Math.min(state.pointer + 1, selectMaxLength(state))
    };
  } else if (action.type === STEP_BACK) {
    return {
      ...state,
      pointer: Math.max(state.pointer - 1, 0)
    };
  } else if (action.type === TOGGLE_POPUP) {
    return {
      ...state,
      popup: !state.popup
    };
  } else if (action.type === TOGGLE_PLAYING) {
    return {
      ...state,
      playing: !state.playing
    };
  } else {
    return state;
  }
};

// create store
export default createStore(
  reducer,
  applyMiddleware(createLogger({ collapsed: true }))
);
