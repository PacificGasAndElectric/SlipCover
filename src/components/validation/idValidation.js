import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

export default (pos, event) => {
  if (pos !== -1) {
    event.persist();
    return true;
  }
  Alert.warning('Document is not found!', {
    offset: 150,
    timeout: 5000,
    onShow() {
      console.log('Document is not found!');
    },
  });
  event.persist();
  return false;
};
