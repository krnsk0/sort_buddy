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
              name="bubbleSort"
              displayName="bubble_sort"
              arrays={this.props.arrays}
            />
            <SortBox
              name="selectionSort"
              displayName="selection_sort"
              arrays={this.props.arrays}
            />
            <SortBox
              name="insertionSort"
              displayName="insertion_sort"
              arrays={this.props.arrays}
            />
          </div>
          <div className="body-column" arrays={this.props.arrays}>
            <SortBox
              name="quickSort"
              displayName="quick_sort"
              arrays={this.props.arrays}
            />
            <SortBox
              name="mergeSort"
              displayName="merge_sort"
              arrays={this.props.arrays}
            />
            <SortBox
              name="heapSort"
              displayName="heap_sort"
              arrays={this.props.arrays}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    arrays: state
  };
};

export default connect(
  mapStateToProps,
  null
)(disconnectedApp);
