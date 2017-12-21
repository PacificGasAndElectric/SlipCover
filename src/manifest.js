const path = require('path');
// const Confidence = require('confidence');
require('dotenv').config({ path: path.join(__dirname, '.', '.env') }); // eslint-disable-line global-require

const manifest = {
  logLevel: 'DEBUG',
  syncgatewayUrl: process.env.REACT_APP_SYNC_GATEWAY,
  bucket: ['beer-sample'],
  rowsPerPage: 25,
};

module.exports = manifest;
