import React from 'react';
import { connect } from 'react-redux';
import { resetArray, stepForward, stepBack } from '../redux/store';

const ARRAY_SIZE = 24;

class disconnectedTopbar extends React.Component {
  componentDidMount() {
    this.props.reset(arraySize);
    window.addEventListener('keydown', evt =>
      this.keyHandler(evt, this.props.stepBack, this.props.stepForward, () =>
        this.props.reset(ARRAY_SIZE)
      )
    );
  }

  keyHandler(evt, stepBack, stepForward, reset) {
    if (evt.keyCode === 39) {
      stepForward();
    } else if (evt.keyCode === 37) {
      stepBack();
    } else if (evt.keyCode === 32) {
      reset();
    }
  }

  render() {
    return (
      <div className="topbar">
        <span className="title">sort_buddy</span>
        <span className="topbar-link-container">
          <a href="#0" onClick={this.props.stepBack} className="topbar-link">
            {'<<'}
          </a>
          <span className="topbar-text">
            {this.props.pointer} / {this.props.maxLength}
          </span>
          <a href="#0" onClick={this.props.stepForward} className="topbar-link">
            {'>>'}
          </a>
          <a
            href="#0"
            onClick={() => this.props.reset(ARRAY_SIZE)}
            className="topbar-link"
          >
            reset
          </a>
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: size => dispatch(resetArray(size)),
    stepForward: () => dispatch(stepForward()),
    stepBack: () => dispatch(stepBack())
  };
};

const mapStateToProps = state => {
  return {
    pointer: state.pointer,
    maxLength: state.maxLength
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedTopbar);
