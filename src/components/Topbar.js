import React from 'react';
import { connect } from 'react-redux';
import { resetArray, stepForward, stepBack } from '../redux/store';

const ARRAY_SIZE = 24;

class disconnectedTopbar extends React.Component {
  componentDidMount() {
    this.props.reset(ARRAY_SIZE);
    window.addEventListener('keydown', evt =>
      this.keyHandler(evt, this.props.stepBack, this.props.stepForward, () =>
        this.props.reset(ARRAY_SIZE)
      )
    );
  }

  keyHandler(evt, stepBackFunc, stepForwardFunc, resetFunc) {
    if (evt.keyCode === 39) {
      stepForwardFunc();
    } else if (evt.keyCode === 37) {
      stepBackFunc();
    } else if (evt.keyCode === 32) {
      resetFunc();
    }
  }

  render() {
    return (
      <div className="topbar">
        <span className="title">sort_buddy</span>
        <span className="topbar-link-container">
          <a href={null} onClick={this.props.stepBack} className="topbar-link">
            {'<<'}
          </a>
          <span className="topbar-text">
            {this.props.pointer} / {this.props.maxLength}
          </span>
          <a
            href={null}
            onClick={this.props.stepForward}
            className="topbar-link"
          >
            {'>>'}
          </a>
          <a
            href={null}
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
