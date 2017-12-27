import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import * as queryString from 'query-string';
import manifest from '../../manifest.js';

// fetch all ID's of a specific bucket to manage the pagination
export default async selectedBucket => {
  let trueResult = '';
  try {
    const syncgatewayUrl = manifest.syncgatewayUrl;

    const params = {
      access: false,
      include_docs: false,
    };
    const res = await fetch(
      `${syncgatewayUrl}/${selectedBucket}/_all_docs?${queryString.stringify(
        params,
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      trueResult = `bad keys fetch: ${res.status} ${res.statusText}`;
      Alert.error(trueResult, {
        offset: 150,
        timeout: 5000,
        onShow() {
          console.log(trueResult);
        },
      });
      return trueResult;
    }
    const json = await res.json();
    trueResult = json.rows.map(element => element.id);

    return Promise.resolve(trueResult);
  } catch (err) {
    console.log(err);
  }
  return trueResult;
};
