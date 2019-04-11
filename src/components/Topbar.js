/* eslint-disable function-paren-newline */
import React from 'react';
import { connect } from 'react-redux';
import {
  resetArray,
  stepForward,
  stepBack,
  togglePlaying,
  selectMaxLength
} from '../redux/store';

class disconnectedTopbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: props.size }; // for the controlled form element
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyHandler);
  }

  componentDidUpdate(prevProps) {
    const { playing, pointer, maxLength, togglePlaying } = this.props;

    // if playing and have hit the max, stop
    if (playing && pointer >= maxLength) {
      togglePlaying();
      clearInterval(this.interval);
      return;
    }

    // set or clear an interval if playing flag changed
    if (playing && !prevProps.playing) {
      this.interval = setInterval(this.props.stepForward, 100);
    } else if (!playing && prevProps.playing) {
      clearInterval(this.interval);
    }
  }

  keyHandler = evt => {
    const { stepBack, stepForward, togglePlaying } = this.props;
    // arrow key presses will stop playing if playing
    if (evt.keyCode === 39) {
      if (this.props.playing) togglePlaying();
      stepForward();
    } else if (evt.keyCode === 37) {
      if (this.props.playing) togglePlaying();
      stepBack();
    } else if (evt.keyCode === 32) {
      evt.preventDefault(); // prevents spacebar from activating the previously selected button
      togglePlaying();
    }
  };

  // runs when the select element changes
  onSizeChange = evt => {
    this.setState({ size: evt.target.value });
  };

  onReset(evt, props) {
    evt.preventDefault(); // stops form submission and page refresh
    const { playing, reset } = props;
    if (playing) togglePlaying(); // stops playing if it's playing
    reset(this.state.size);
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
            onClick={evt => {
              // stops playing if playing
              if (this.props.playing) this.props.togglePlaying();
              this.props.stepBack();
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
            onClick={evt => {
              // stops playing if playing
              if (this.props.playing) this.props.togglePlaying();
              this.props.stepForward();
            }}
            className="topbar-button"
          >
            {'>>'}
          </button>
        </span>
        <span className="topbar-container">
          <button
            type="button"
            onClick={this.props.togglePlaying}
            className="topbar-button"
          >
            {this.props.playing ? 'stop' : 'play'}
          </button>
          <form
            onSubmit={evt => {
              // have to pass in props to put them in scope
              this.onReset(evt, this.props);
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
              // taken from the initial state in redux store
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

const mapDispatchToProps = {
  reset: resetArray,
  stepForward,
  stepBack,
  togglePlaying
};

const mapStateToProps = state => {
  return {
    playing: state.playing,
    pointer: state.pointer,
    maxLength: selectMaxLength(state),
    size: state.size
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedTopbar);
