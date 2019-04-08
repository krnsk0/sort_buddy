import React from 'react';
import SortBar from './SortBar';
import FlipMove from 'react-flip-move';

const DURATION = 100;

class SortBox extends React.Component {
  render() {
    const pointer = this.props.pointer;
    const history = this.props.history;
    const array = history[pointer] || history[history.length - 1];

    return (
      <div className="sort-container-outer">
        <div className="sort-container-label">{this.props.displayName}</div>
        <div className="sort-container">
          {history.length && (
            <FlipMove typeName={null} duration={DURATION} enterAnimation="none">
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
