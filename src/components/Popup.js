import React from 'react';

const Topbar = props => {
  return (
    <div className="popup-outer">
      <div className="popup-inner">
        <span>popup</span>
        <button type="button" onClick={props.togglePopup}>
          close me
        </button>
      </div>
    </div>
  );
};

export default Topbar;
