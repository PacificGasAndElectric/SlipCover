export default async ({ syncgatewayUrl, selectedBucket }, queryString) => {
  try {
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
    // this.props.loadAllKeysSuccess(json);
    const trueResult = json.rows.map(element => element.id);

    const newState = this.state;
    newState.pageCount = Math.ceil(trueResult.length / this.state.rowsPerPage);
    newState.allKeys = trueResult;
    // this.props.addAllKeys(trueResult);
    this.setState(newState);
    console.log('this.state.pageCount: ', this.state.pageCount);
    this.getChannelFeed();

    return Promise.resolve(trueResult);
  } catch (err) {
    console.log(err);
    // this.props.loadAllKeysFailed(err);
  }
  return true;
};
