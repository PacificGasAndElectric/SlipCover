import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import { connect } from 'react-redux';
import { progressBar } from '../actions';

class LinearProgressExampleDeterminate extends Component {
  componentDidMount() {
    this.props.progressBar(0);
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    Alert.warning('Finshed uploading the documents', {
      offset: 150,
      timeout: 1000,
      onShow() {
        console.log('Finshed uploading the documents');
      },
    });
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed < 10) {
      Alert.warning('uploading documents in process ...', {
        offset: 150,
        timeout: 5000,
        onShow() {
          console.log('Finshed uploading the documents');
        },
      });
    }

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
    return <LinearProgress mode="determinate" value={storeData.progressBar} />;
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
