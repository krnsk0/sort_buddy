import React from 'react';

const SortBar = props => {
  const height = 100 * (props.value / 10);
  const divStyle = {
    height: `${height}%`
  };

  return <div className="sort-bar" style={divStyle} />;
};

export default SortBar;
