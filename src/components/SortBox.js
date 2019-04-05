import React from 'react';
import SortBar from './SortBar';
import FlipMove from 'react-flip-move';

class SortBox extends React.Component {
  render() {
    const pointer = this.props.data.pointer;
    const history = this.props.data.history;
    const array = history[pointer] || history[history.length - 1];

    return (
      <div className="sort-container-outer">
        <div className="sort-container-label">{this.props.displayName}</div>
        <div className="sort-container">
          {history.length && (
            <FlipMove typeName={null} duration={250} enterAnimation="none">
              {array.map(el => (
                <SortBar
                  key={el.value}
                  value={el.value}
                  status={el.status}
                  arrayLength={array.length}
                />
              ))}
            </FlipMove>
          )}
        </div>
      </div>
    );
  }
}

export default SortBox;
