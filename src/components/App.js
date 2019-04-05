import React from 'react';
import Topbar from './Topbar';
import SortBox from './SortBox';
import { connect } from 'react-redux';

class disconnectedApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Topbar reset={() => this.props.reset(10)} />
        <div className="body-column-container">
          <div className="body-column">
            <SortBox
              displayName="bubble_sort"
              data={this.props.bubbleSortData}
            />
            <SortBox
              displayName="selection_sort"
              data={this.props.selectionSortData}
            />
            <SortBox
              displayName="insertion_sort"
              data={this.props.insertionSortData}
            />
          </div>
          <div className="body-column">
            <SortBox displayName="quick_sort" data={this.props.quickSortData} />
            <SortBox displayName="merge_sort" data={this.props.mergeSortData} />
            <SortBox displayName="heap_sort" data={this.props.heapSortData} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bubbleSortData: state.bubbleSort,
    selectionSortData: state.selectionSort,
    insertionSortData: state.insertionSort,
    mergeSortData: state.mergeSort,
    heapSortData: state.heapSort,
    quickSortData: state.quickSort
  };
};

export default connect(
  mapStateToProps,
  null
)(disconnectedApp);
