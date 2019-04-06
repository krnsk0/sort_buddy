import React from 'react';

// this has to be a class component for react-flip-move to be able to animate it
class SortBar extends React.Component {
  render() {
    const colors = {
      unsorted: 'lightgray',
      comparing: 'IndianRed',
      sorted: 'firebrick'
    };
    const height = 100 * (this.props.value / this.props.arrayLength) - 2;
    const sortBarStyle = {
      height: `${height}%`,
      backgroundColor: colors[this.props.status]
    };
    const sortBarContainerStyle = {
      width: `${100 / this.props.arrayLength}%`
    };

    return (
      <div className="sort-bar-container" style={sortBarContainerStyle}>
        <div className="sort-bar" style={sortBarStyle} />
      </div>
    );
  }
}

export default SortBar;
