import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

export default str => {
  try {
    JSON.parse(str);
  } catch (e) {
    Alert.error('This is NOT accepable JSON format!', {
      offset: 150,
      timeout: 5000,
      onShow() {
        console.log('This is NOT accepable JSON format!');
      },
    });
    return false;
  }
  return true;
};
