import React from 'react';

// this has to be a class component for react-flip-move to be able to animate it
class SortBar extends React.Component {
  render() {
    const { value, arrayLength, status } = this.props;

    const height = 100 * (value / arrayLength) - 2;
    const sortBarStyle = {
      height: `${height}%`
    };
    const sortBarContainerStyle = {
      width: `${100 / arrayLength}%`
    };

    return (
      <div className="sort-bar-container" style={sortBarContainerStyle}>
        <div className={`sort-bar ${status}`} style={sortBarStyle} />
      </div>
    );
  }
}

export default SortBar;
