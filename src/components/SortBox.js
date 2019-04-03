import React from 'react';
import SortBar from './SortBar';

class SortBox extends React.Component {
  render() {
    const array = this.props.arrays[this.props.name];
    return (
      <div className="sort-container">
        {array.map(el => (
          <SortBar key={el.value} value={el.value} status={el.status} />
        ))}
      </div>
    );
  }
}

export default SortBox;
