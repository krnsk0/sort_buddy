import React from 'react';
import { connect } from 'react-redux';
import { resetArray, step } from '../redux/store';

class disconnectedTopbar extends React.Component {
  componentDidMount() {
    this.props.reset(10);
  }

  render() {
    return (
      <div className="topbar">
        <span className="title">sort_buddy</span>
        <span className="topbar-link-container">
          <a href="#0" onClick={this.props.step} className="topbar-link">
            step
          </a>
          <a
            href="#0"
            onClick={() => this.props.reset(10)}
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
    step: () => dispatch(step())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(disconnectedTopbar);
