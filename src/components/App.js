import React from 'react';
import Topbar from './Topbar';
import SortBox from './SortBox';
import Popup from './Popup';
import { connect } from 'react-redux';

class disconnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    console.log('toggling popup');
  }

  render() {
    return (
      <div className="app">
        <Topbar reset={() => this.props.reset(10)} />
        <div className="body-column-container">
          <div className="body-column">
            <SortBox
              displayName="bubble_sort"
              history={this.props.bubbleSortData}
              pointer={this.props.pointer}
            />
            <SortBox
              displayName="selection_sort"
              history={this.props.selectionSortData}
              pointer={this.props.pointer}
            />
            <SortBox
              displayName="insertion_sort"
              history={this.props.insertionSortData}
              pointer={this.props.pointer}
            />
          </div>
          <div className="body-column">
            <SortBox
              displayName="quick_sort"
              history={this.props.quickSortData}
              pointer={this.props.pointer}
            />
            <SortBox
              displayName="merge_sort"
              history={this.props.mergeSortData}
              pointer={this.props.pointer}
            />
            <SortBox
              displayName="heap_sort"
              history={this.props.heapSortData}
              pointer={this.props.pointer}
            />
          </div>
        </div>
        <Popup togglePopup={this.togglePopup} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pointer: state.pointer,
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
