import React from 'react';
import SortBar from './SortBar';
import FlipMove from 'react-flip-move';

class SortBox extends React.Component {
  render() {
    const array = this.props.arrays[this.props.name];
    return (
      <div className="sort-container">
        <FlipMove typeName={null}>
          {array.map(el => (
            <SortBar key={el.value} value={el.value} status={el.status} />
          ))}
        </FlipMove>
      </div>
    );
  }
}

export default SortBox;
