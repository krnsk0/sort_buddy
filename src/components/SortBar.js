import React from 'react';

// this has to be a class component for react-flip-move to be able to animate it
class SortBar extends React.Component {
  render() {
    const height = 100 * (this.props.value / 10);
    const divStyle = {
      height: `${height}%`
    };
    return (
      <div className="sort-bar-container">
        <div className="sort-bar" style={divStyle} />
      </div>
    );
  }
}

export default SortBar;
