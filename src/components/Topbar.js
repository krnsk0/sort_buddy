import React from 'react';

const Topbar = props => {
  return (
    <div className="topbar">
      <span className="title">sort_buddy</span>
      <span className="topbar-link-container">
        <a href="" className="topbar-link">
          step
        </a>
        <a href="" className="topbar-link">
          reset
        </a>
      </span>
    </div>
  );
};

export default Topbar;
