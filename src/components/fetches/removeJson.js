import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

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
      alert(trueResult); // eslint-disable-line no-alert
      return trueResult;
    }
  } catch (err) {
    console.log(err);
  }
  return trueResult;
};
