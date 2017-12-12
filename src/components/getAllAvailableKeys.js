import * as queryString from 'query-string';
import manifest from '../manifest.js';

export default async selectedBucket => {
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
    if (!res.ok) throw Error("bad ID's fetch");
    const json = await res.json();
    const trueResult = json.rows.map(element => element.id);

    return Promise.resolve(trueResult);
  } catch (err) {
    console.log(err);
  }
  return true;
};
