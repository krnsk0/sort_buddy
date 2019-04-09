/* eslint-disable function-paren-newline */
import React from 'react';
import { connect } from 'react-redux';
import { resetArray, stepForward, stepBack } from '../redux/store';

class disconnectedTopbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 8, playing: false };
    this.onSizeChange = this.onSizeChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.props.reset(this.state.size);
    window.addEventListener('keydown', evt =>
      this.keyHandler(evt, this.props.stepBack, this.props.stepForward, () =>
        this.props.reset(this.state.size)
      )
    );
  }

  togglePlay() {
    this.setState({ playing: !this.state.playing });
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

  onSizeChange(evt) {
    this.setState({ size: evt.target.value });
  }

  render() {
    return (
      <div className="topbar">
        <span className="topbar-container">
          <span className="title">sort_buddy</span>
        </span>
        <span className="topbar-container">
          <button
            type="button"
            onClick={this.props.stepBack}
            className="topbar-button"
          >
            {'<<'}
          </button>
          <span className="topbar-text">
            {this.props.pointer} / {this.props.maxLength}
          </span>
          <button
            type="button"
            onClick={this.props.stepForward}
            className="topbar-button"
          >
            {'>>'}
          </button>
        </span>
        <span className="topbar-container">
          <button
            type="button"
            onClick={this.togglePlay}
            className="topbar-button"
          >
            {this.state.playing ? 'pause' : 'play'}
          </button>
          <form
            onSubmit={evt => {
              evt.preventDefault();
              this.props.reset(this.state.size);
            }}
            id="size-form"
          >
            <button type="submit" className="topbar-button">
              reset
            </button>
            <select
              id="size-selector"
              className="size-selector"
              onChange={this.onSizeChange}
              value={this.state.size}
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </select>
          </form>
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
