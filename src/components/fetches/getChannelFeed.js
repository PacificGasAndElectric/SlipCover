import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import * as queryString from 'query-string';
import manifest from '../../manifest.js';

// fetch certain number of documents per page based
// on certain number of ID's
export default async (selectedBucket, allKeys, currentPage) => {
  console.log(` CURRENT PAGE: ${currentPage}`);
  const rowsPerPage = manifest.rowsPerPage;
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = currentPage * rowsPerPage;
  let trueResult = '';

  try {
    const syncgatewayUrl = manifest.syncgatewayUrl;

    const params = {
      access: false,
      include_docs: true,
      keys: JSON.stringify(allKeys.slice(startIdx, endIdx)),
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
      trueResult = `bad data fetch: ${res.status} ${res.statusText}`;
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
    trueResult = json.rows.map(element => element.doc);
    return Promise.resolve(trueResult);
  } catch (err) {
    console.log(err);
  }
  return trueResult;
};
