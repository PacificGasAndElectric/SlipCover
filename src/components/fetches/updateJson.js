import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import * as queryString from 'query-string';
import manifest from '../../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */

export default async (selectedBucket, newDoc, id, rev) => {
  let doc = '';
  let trueResult = '';
  doc = newDoc;
  doc._id = id; // if user try to chnage doc _id
  doc._rev = rev; // if user try to chnage doc _rev
  doc.updated = new Date().toJSON();

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
    if (!res.ok) {
      trueResult = `bad update fetch: ${res.status} ${res.statusText}`;
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
