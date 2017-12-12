import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

export default async (selectedBucket, arr, docId) => {
  let doc = '';
  arr.find((obj, i) => {
    if (obj._id === docId) {
      doc = arr[i];
      return true; // stop searching
    }
    return false;
  });

  try {
    const syncgatewayUrl = manifest.syncgatewayUrl;
    const res = await fetch(
      `${syncgatewayUrl}/${selectedBucket}/${doc._id}?rev=${doc._rev}`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) throw Error('bad data fetch'); // IXAK handle errors
  } catch (err) {
    console.log(err);
  }
};
