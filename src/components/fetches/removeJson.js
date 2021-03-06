import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

// remove a document from the specified bucket
export default async (selectedBucket, arr, id, rev) => {
  let trueResult = '';
  try {
    const syncgatewayUrl = manifest.syncgatewayUrl;
    const res = await fetch(
      `${syncgatewayUrl}/${selectedBucket}/${id}?rev=${rev}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      trueResult = `bad remove fetch: ${res.status} ${res.statusText}`;
      Alert.error(trueResult, {
        offset: 150,
        timeout: 5000,
        onShow() {
          console.log(trueResult);
        },
      });
      return trueResult;
    }
  } catch (err) {
    console.log(err);
  }
  return trueResult;
};
