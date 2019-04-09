/* eslint-disable function-paren-newline */
import React from 'react';
import { connect } from 'react-redux';
import { resetArray, stepForward, stepBack } from '../redux/store';

class disconnectedTopbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 16, playing: false };
    this.onSizeChange = this.onSizeChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.onReset = this.onReset.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stepForwardWrapper = this.stepForwardWrapper.bind(this);
    this.stepBackWrapper = this.stepBackWrapper.bind(this);
  }

  componentDidMount() {
    this.props.reset(this.state.size);
    window.addEventListener('keydown', evt =>
      this.keyHandler(evt, this.props.stepBack, this.props.stepForward)
    );
  }

  togglePlay() {
    if (this.state.playing === false) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    let intervalHandle = window.setInterval(
      () => this.stepForwardWrapper(),
      100
    );
    this.setState({ playing: intervalHandle });
  }

  pause() {
    window.clearInterval(this.state.playing);
    this.setState({ playing: false });
  }

  stepForwardWrapper() {
    this.props.stepForward();
  }

  stepBackWrapper() {
    this.props.stepBack();
  }

  keyHandler(evt) {
    if (evt.keyCode === 39) {
      this.pause();
      this.stepForwardWrapper();
    } else if (evt.keyCode === 37) {
      this.pause();
      this.stepBackWrapper();
    } else if (evt.keyCode === 32) {
      evt.preventDefault();
      this.togglePlay();
    }
  }

  onSizeChange(evt) {
    this.setState({ size: evt.target.value });
  }

  onReset(evt) {
    evt.preventDefault();
    this.pause();
    this.props.reset(this.state.size);
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
            onClick={() => {
              this.pause();
              this.props.stepBackWrapper();
            }}
            className="topbar-button"
          >
            {'<<'}
          </button>
          <span className="topbar-text">
            {this.props.pointer} / {this.props.maxLength}
          </span>
          <button
            type="button"
            onClick={() => {
              this.pause();
              this.props.stepForwardWrapper();
            }}
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
          <form onSubmit={this.onReset} id="size-form">
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
