import React from 'react';
import SortBar from './SortBar';
import FlipMove from 'react-flip-move';

const DURATION = 100;

const SortBox = ({ displayName, pointer, history }) => {
  const array = history[pointer] || history[history.length - 1];

  return (
    <div className="sort-container-outer">
      <div className="sort-container-label">{displayName}</div>
      <div className="sort-container">
        {history.length && (
          // typeName={null} sets FlipMove to "wrapperless mode"
          // https://github.com/joshwcomeau/react-flip-move
          // enterAnimation="none" turns off animation of new bars that are added on a size change
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
};

export default SortBox;
