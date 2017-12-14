import * as queryString from 'query-string';
import manifest from '../../manifest.js';

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
      alert(trueResult); // eslint-disable-line no-alert
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
