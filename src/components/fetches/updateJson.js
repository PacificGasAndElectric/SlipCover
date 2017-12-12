import * as queryString from 'query-string';
import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

export default async (selectedBucket, arr, editedDoc, docId) => {
  let doc = '';
  arr.find((obj, i) => {
    if (obj._id === docId) {
      doc = arr[i];
      doc = editedDoc;
      doc._id = obj._id; // if user try to chnage doc _id
      doc._rev = obj._rev; // if user try to chnage doc _rev
      doc.name = 'Ibrahim';
      doc.updated = new Date().toJSON();
      return true; // stop searching
    }
    return false;
  });

  try {
    const syncgatewayUrl = manifest.syncgatewayUrl;
    const params = {
      new_edits: true,
      rev: doc._rev,
    };
    const res = await fetch(
      `${syncgatewayUrl}/${selectedBucket}/${doc._id}?${queryString.stringify(
        params,
      )}`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
      },
    );
    if (!res.ok) throw Error('bad data fetch');
  } catch (err) {
    console.log(err);
  }
};
