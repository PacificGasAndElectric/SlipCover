import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import { progressBar } from '../actions';

class LinearProgressExampleDeterminate extends Component {
  componentWillMount() {
    this.props.progressBar(0);
  }

  componentDidMount() {
    this.props.progressBar(0);
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      const timer = 100;
      this.props.progressBar(timer);
    } else {
      const timer = completed;
      this.props.progressBar(timer);
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 3000);
    }
  }

  render() {
    const { storeData } = this.props;
    return (
      <LinearProgress mode="determinate" value={storeData.progressBar.timer} />
    );
  }
}

function mapStateToProps(state) {
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
  progressBar,
})(LinearProgressExampleDeterminate);
