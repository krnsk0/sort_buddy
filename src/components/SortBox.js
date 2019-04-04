import React from 'react';
import SortBar from './SortBar';
import FlipMove from 'react-flip-move';

class SortBox extends React.Component {
  render() {
    const array = this.props.arrays[this.props.name];
    return (
      <div className="sort-container-outer">
        <div className="sort-container-label">{this.props.displayName}</div>
        <div className="sort-container">
          <FlipMove typeName={null} duration={250}>
            {array.map(el => (
              <SortBar key={el.value} value={el.value} status={el.status} />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default SortBox;
