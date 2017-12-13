import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

export default async (selectedBucket, arr, id, rev) => {
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
    if (!res.ok) throw Error('bad data fetch'); // IXAK handle errors
  } catch (err) {
    console.log(err);
  }
};
