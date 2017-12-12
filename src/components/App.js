import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import LinearProgress from 'material-ui/LinearProgress';
import * as queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import Display from './Display.js';

import getAllAvailableKeys from './getAllAvailableKeys';
import getChannelFeed from './getChannelFeed';

import '../App.css';
import {
  foundDocument,
  selectBucket,
  loadAllKeysSuccess,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  loadDataSuccess,
  updateStatus,
  updateSaveButton,
} from '../actions';
import manifest from '../manifest.js';

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */
class App extends Component {
  constructor(props) {
    super(props);
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
    const status = false;
    this.props.updateStatus(status);
    this.props.updateSaveButton(status);
    if (!storeData.updateCurrentPage.currentPage) {
      console.log('componentWillMount!');
      this.props.updateCurrentPage(currentPage);
    }
  }

  async getAllAvailableKeys() {
    const trueResult = await getAllAvailableKeys(
      this.props.storeData.selectBucket.bucket,
    );
    this.props.loadAllKeysSuccess(trueResult);
    const pageCount = Math.ceil(trueResult.length / manifest.rowsPerPage);
    console.log('pageCount: ', pageCount);
    this.props.updatePageCount(pageCount);
    this.getChannelFeed();
  }

  async getChannelFeed() {
    const trueResult = await getChannelFeed(
      this.props.storeData.selectBucket.bucket,
      this.props.storeData.loadAllKeysSuccess.allKeys,
      this.props.storeData.updateCurrentPage.currentPage,
    );
    this.props.loadDataSuccess(trueResult);
  }

  async updateJson(editedDoc, docId) {
    const { storeData } = this.props; // to access store methods!
    console.log('storeData in updateJson: ', storeData);
    const arr = storeData.dataReducer.data;
    let doc = '';
    arr.find((obj, i) => {
      if (obj._id === docId) {
        arr[i] = editedDoc;
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
      const selectedBucket = storeData.selectBucket.bucket;
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
    const arr = storeData.dataReducer.data;
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
      const selectedBucket = storeData.selectBucket.bucket;
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
    // const { storeData } = this.props;
    // const bucketDefaultKey = true;
    await this.props.selectBucket(event.target.value);
    // console.log('storeData in bucketSelected: ', storeData);

    this.getAllAvailableKeys();

    // const syncgatewayUrl = manifest.syncgatewayUrl;
    // const selectedBucket = this.props.storeData.selectBucket.bucket;
    // const rowsPerPage = manifest.rowsPerPage;
    //
    // await this.props.getAllAvailableKeys({
    //   syncgatewayUrl,
    //   selectedBucket,
    //   rowsPerPage,
    // })();
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
  }

  // search for doc by ID and return it if found
  async searchHandleSubmit(event) {
    const { storeData } = this.props;
    const id = storeData.searchDocument.searchValue.trim(); // truncate spaces
    const pos = storeData.loadAllKeysSuccess.allKeys.indexOf(id);
    if (pos !== -1) {
      event.preventDefault(); // make sure before 1st await for async func to avoid refreshing page

      await this.props.foundDocument(id);
      const rowsPerPage = manifest.rowsPerPage;
      const currentPage = Math.ceil((pos + 1) / rowsPerPage);

      await this.props.updateCurrentPage(currentPage);
      console.log('Key is found in pageNumber: ', currentPage);
      this.getChannelFeed();
    } else {
      alert('Document id is not found!');
      event.preventDefault();
    }
  }

  render() {
    const { storeData } = this.props;
    return (
      <div>
        <div className="menuBar">
          <h1 className="header"> Sync-Gateway-SlipCover Open Source </h1>
          <div className="menuRow">
            {/* Buckets dropdown menu */}
            <div className="bucket-box">
              <select
                className="bucketSelectList"
                onChange={e => {
                  this.bucketHandleChecked(e);
                }}
                value={storeData.selectBucket.bucket}
              >
                <option
                // key="default"
                // disabled={
                //   this.props.storeData.selectedBucket.bucketDefaultKey
                // }
                >
                  -- Select Buckets --
                </option>
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
            pageCount={storeData.updatePageCount.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <div>
          {storeData.dataReducer && storeData.dataReducer.data
            ? storeData.dataReducer.data.map(object => {
                if (storeData.selectBucket.bucket) {
                  return (
                    <Display
                      key={object._id}
                      index={object._id}
                      prop={object}
                      updateJson={this.updateJson}
                      removeJson={this.removeJson}
                      foundID={storeData.foundDocument.id}
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
  return {
    storeData: state,
  };
}

// export default connect(mapStateToProps, {
//   foundDocument,
//   selectBucket,
//   loadAllKeysSuccess,
//   updateCurrentPage,
//   updatePageCount,
//   searchDocument,
//   loadDataSuccess,
//   updateStatus,
//   updateSaveButton,
// })(App);

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(
    {
      foundDocument,
      selectBucket,
      loadAllKeysSuccess,
      updateCurrentPage,
      updatePageCount,
      searchDocument,
      loadDataSuccess,
      updateStatus,
      updateSaveButton,
      getAllAvailableKeys,
    },
    dispatch,
  ),
)(App);
