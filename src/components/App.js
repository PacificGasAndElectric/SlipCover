import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import Display from './Display.js';
// import Async from './Async';
import '../App.css';
import {
  saveDocument,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDataSuccess,
  loadDataFailed,
  selectBucket,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  foundId,
} from '../actions';
import manifest from '../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      // allKeys: [],
      // currentPage: 1,
      // rowsPerPage: 25,
      // pageCount: 0,
      // value: '',
      // searchValue: '',
      // foundID: '',
      // bucket: ['beer-sample'],
      // syncgatewayUrl: 'http://localhost:4984',
      // selectedBucket: '',
      // bucketDefaultKey: false,
    };
    this.updateJson = this.updateJson.bind(this);
    this.removeJson = this.removeJson.bind(this);
    this.getChannelFeed = this.getChannelFeed.bind(this);
    this.getAllAvailableKeys = this.getAllAvailableKeys.bind(this);
    this.bucketHandleChecked = this.bucketHandleChecked.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchHandleSubmit = this.searchHandleSubmit.bind(this);
    this.searchHandleChange = this.searchHandleChange.bind(this);
  }

  componentWillMount() {
    const { storeData } = this.props;
    const currentPage = 1;
    if (!storeData.currentPage) {
      this.props.updateCurrentPage(currentPage);
    }
  }

  async getAllAvailableKeys() {
    const { storeData } = this.props;
    console.log('storeData in keys: ', storeData);
    try {
      const syncgatewayUrl = manifest.syncgatewayUrl;
      const selectedBucket = storeData.selected;
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

      const pageCount = Math.ceil(trueResult.length / manifest.rowsPerPage);
      console.log('pageCount: ', pageCount);
      // this.props.updatePaging({ pageCount, currentPage: 1 }); // IXAK currentPage
      this.props.updatePageCount(pageCount);

      this.props.loadAllKeysSuccess(trueResult);
      this.getChannelFeed();

      return Promise.resolve(trueResult);
    } catch (err) {
      console.log(err);
      // this.props.loadAllKeysFailed(err);
    }
    return true;
  }

  async getChannelFeed() {
    const { storeData } = this.props; // to access store methods!
    console.log(` CURRENT PAGE: ${storeData.currentPage}`);
    const rowsPerPage = manifest.rowsPerPage;
    const currentPage = storeData.currentPage;
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = currentPage * rowsPerPage;

    try {
      const syncgatewayUrl = manifest.syncgatewayUrl;
      const selectedBucket = storeData.selected;

      const params = {
        access: false,
        include_docs: true,
        keys: JSON.stringify(storeData.allKeys.slice(startIdx, endIdx)),
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
      if (!res.ok) throw Error('bad data fetch');
      const json = await res.json();
      this.props.loadDataSuccess(json);
      const trueResult = json.rows.map(element => element.doc);

      // this.setState({ data: trueResult });
      return Promise.resolve(trueResult);
    } catch (err) {
      console.log(err);
      // this.props.loadDataFailed(err);
    }
    return true;
  }

  async updateJson(editedDoc, docId) {
    const { storeData } = this.props; // to access store methods!
    console.log('storeData: ', storeData);
    const arr = storeData.data;
    let doc = '';
    arr.find((obj, i) => {
      if (obj._id === docId) {
        arr[i] = JSON.parse(editedDoc);
        arr[i]._id = obj._id; // if user try to chnage doc _id
        arr[i]._rev = obj._rev; // if user try to chnage doc _rev
        arr[i].name = 'Ibrahim';
        arr[i].updated = new Date().toJSON();
        doc = arr[i];
        return true; // stop searching
      }
      return false;
    });

    try {
      const syncgatewayUrl = manifest.syncgatewayUrl;
      const selectedBucket = storeData.selected;
      // const selectedBucket = storeData.selected;
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
      this.getChannelFeed();
    } catch (err) {
      console.log(err);
    }
  }

  // remove doc
  async removeJson(docId) {
    const { storeData } = this.props;
    const arr = storeData.data;
    let doc = '';
    arr.find((obj, i) => {
      if (obj._id === docId) {
        arr[i]._id = obj._id; // if user try to chnage doc _id
        arr[i]._rev = obj._rev; // if user try to chnage doc _rev
        doc = arr[i];
        return true; // stop searching
      }
      return false;
    });

    try {
      const syncgatewayUrl = manifest.syncgatewayUrl;
      const selectedBucket = storeData.selected;
      // const selectedBucket = storeData.selected;
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
      this.getAllAvailableKeys();
    } catch (err) {
      console.log(err);
    }
  }

  async bucketHandleChecked(event) {
    const { storeData } = this.props;
    await this.props.selectBucket(event.target.value);
    console.log('storeData in bucketSelected: ', storeData);
    // this.setState({ bucketDefaultKey: true });
    this.getAllAvailableKeys();
  }

  //eslint-disable-next-line
  async handlePageClick(data) {
    const currentPage = data.selected + 1;
    await this.props.updateCurrentPage(currentPage);
    this.getChannelFeed();
  }

  async searchHandleChange(event) {
    console.log('search clicked!');
    const searchValue = event.target.value;
    await this.props.searchDocument(searchValue);
    // this.setState({ searchValue: event.target.value });
  }

  // search for doc by ID and return it if found
  async searchHandleSubmit(event) {
    const { storeData } = this.props;
    // const newState = this.state;
    // const key = this.state.searchValue.trim(); // truncate spaces
    const foundID = storeData.searchValue.trim(); // truncate spaces

    const pos = storeData.allKeys.indexOf(foundID);

    if (pos !== -1) {
      // newState.foundID = key;
      // this.setState(newState);
      this.props.foundId(foundID);

      const rowsPerPage = manifest.rowsPerPage;
      const currentPage = Math.ceil((pos + 1) / rowsPerPage);
      event.preventDefault(); // make sure before 1st await for async func to avoid refreshing page

      await this.props.updateCurrentPage(currentPage);
      console.log('Key is found in pageNumber: ', currentPage);
      this.getChannelFeed();
      console.log('key exist!');
    } else {
      alert('Document id is not found!');
    }
  }

  render() {
    const { storeData } = this.props;
    return (
      <div>
        <div className="menuBar">
          <h1 className="header"> Sync-Gateway-Cushion Open Source </h1>
          <div className="menuRow">
            {/* Buckets dropdown menu */}
            <div className="bucket-box">
              <select
                className="bucketSelectList"
                onChange={e => {
                  this.bucketHandleChecked(e);
                }}
                value={storeData.selected}
              >
                <option key="default">-- Select Buckets --</option>
                {manifest.bucket.map(m => (
                  <option key={m.toString()} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            {/* search document id */}
            <div className="search">
              <form className="inputBox" onSubmit={this.searchHandleSubmit}>
                <input
                  className="label"
                  type="text"
                  name="name"
                  placeholder="Document ID"
                  // value={this.props.storeData.searchValue}
                  onChange={this.searchHandleChange}
                />
                <input
                  className="submit"
                  type="submit"
                  value="&#x1F50D; Search"
                />
              </form>
            </div>
          </div>
        </div>

        <div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            // pageCount={storeData ? storeData.pageCount : 0}
            pageCount={storeData.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <div>
          {storeData.data
            ? storeData.data.map(object => {
                if (storeData.selected) {
                  return (
                    <Display
                      key={object._id}
                      index={object._id}
                      prop={object}
                      updateJson={this.updateJson}
                      removeJson={this.removeJson}
                      foundID={storeData.foundID}
                    />
                  );
                }
                return true;
              })
            : null}
        </div>
      </div>
    );
  }
}

// allows reducers in the redux store to become accessible within React Components through this.props.
function mapStateToProps(state) {
  // console.log('state in mapStateToProps: ', state);
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
  saveDocument,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDataSuccess,
  loadDataFailed,
  selectBucket,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  foundId,
})(App);
