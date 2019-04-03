import React from 'react';
import Topbar from './Topbar';
import SortBox from './SortBox';
import { connect } from 'react-redux';

class disconnectedApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Topbar />
        <div className="body-column-container">
          <div className="body-column">
            <SortBox name="bubbleSort" arrays={this.props.arrays} />
            <SortBox name="selectionSort" arrays={this.props.arrays} />
            <SortBox name="insertionSort" arrays={this.props.arrays} />
          </div>
          <div className="body-column" arrays={this.props.arrays}>
            <SortBox name="quickSort" arrays={this.props.arrays} />
            <SortBox name="mergeSort" arrays={this.props.arrays} />
            <SortBox name="heapSort" arrays={this.props.arrays} />
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
