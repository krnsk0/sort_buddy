import React from 'react';

const Topbar = props => {
  return (
    <div className="popup-outer">
      <div className="popup-inner">
        <div className="popup-inner-container">
          <div className="popup-title">sort_buddy</div>
        </div>
        <div className="popup-inner-container">
          <div className="popup-text">
            A sorting algorithm visualizer built by{' '}
            <a href="https://github.com/krnsk0">krnsk0</a>
          </div>
        </div>
        <div className="popup-inner-container">
          <div className="popup-text">
            <b>Keyboard shortcuts:</b>
          </div>
          <div className="popup-text">Play/pause: [spacebar]</div>
          <div className="popup-text">Step forward: [right arrow]</div>
          <div className="popup-text">Step backward: [left arrow]</div>
        </div>
        <div className="popup-inner-container">
          <button type="button" onClick={props.togglePopup}>
            close
            <div>
              [<span>spacebar</span>]
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
