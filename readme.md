A simple steppable sorting algorithm visualizer built to learn ES6 generators

https://krnsk0.github.io/sort_buddy/

The sorts pause on each comparison, and the visualization shows three possible states for each element: 'unsorted,' 'sorted,' and 'comparing.' 

The bubblesort implementation quits early if it finds it hasn't made any swaps.

The merge sort implementation is recursive but sorts in place to make it easier to visualize the state of each element. An in-place merge sort requires a few extra comparisons relative to an implementation which is able to create scratch arrays on each recursive call, so I've chosen not to display these extra comparisons so that the visualization looks like what it would look like had the algorithm created scratch arrays. 
