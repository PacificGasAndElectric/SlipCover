export default str => {
  try {
    JSON.parse(str);
  } catch (e) {
    alert('This is NOT accepable JSON format!');
    console.log('This is NOT accepable JSON format! ', e);
    return false;
  }
  return true;
};
