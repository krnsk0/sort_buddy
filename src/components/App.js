import React from 'react';
import Topbar from './Topbar';
import SortBox from './SortBox';
import Popup from './Popup';
import { connect } from 'react-redux';
import { selectSorts, togglePopup } from '../redux/store';

const disconnectedApp = ({ pointer, popup, sorts, closePopup }) => (
  <div className="app">
    <Topbar />
    <div className="body-column-container">
      <div className="body-column">
        {/* the left column */}
        {['bubble', 'selection', 'insertion'].map(sort => (
          <SortBox
            key={sort}
            displayName={`${sort}_sort`}
            history={sorts[sort]}
            pointer={pointer}
          />
        ))}
      </div>
      <div className="body-column">
        {/* the right column */}
        {['quick', 'merge', 'heap'].map(sort => (
          <SortBox
            key={sort}
            displayName={`${sort}_sort`}
            history={sorts[sort]}
            pointer={pointer}
          />
        ))}
      </div>
    </div>
    {popup && <Popup togglePopup={closePopup} />}
  </div>
);

const mapStateToProps = state => {
  return {
    pointer: state.pointer,
    popup: state.popup,
    sorts: selectSorts(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => dispatch(togglePopup())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedApp);
