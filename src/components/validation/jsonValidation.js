import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

// str must be NOT empty and JSON format
export default str => {
  try {
    if (str === '') {
      Alert.error('No changes has been made!', {
        offset: 150,
        timeout: 5000,
        onShow() {
          console.log('No changes has been made!');
        },
      });
      return false;
    }

    JSON.parse(str);
    return true;
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
};
