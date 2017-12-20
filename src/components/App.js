import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from './LinearProgress';

// import LinearProgress from 'material-ui/LinearProgress';

import Display from './Display.js';
import MenuGenerator from './MenuGenerator.js';
import getAllAvailableKeys from './fetches/getAllAvailableKeys';
import getChannelFeed from './fetches/getChannelFeed';
import removeJson from './fetches/removeJson';
import updateJson from './fetches/updateJson';

import '../App.css';
import {
  foundDocument,
  selectBucket,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDataSuccess,
  loadDatafailed,
  removeDocumentFailed,
  saveDocumentFailed,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  updateStatus,
  updateSaveButton,
} from '../actions';
import manifest from '../manifest.js';

injectTapEventPlugin();

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */
class App extends Component {
  constructor(props) {
    super(props);
    this.removeJson = this.removeJson.bind(this);
    this.updateJson = this.updateJson.bind(this);
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
    const bucketDefaultKey = false;
    this.props.updateStatus(status);
    this.props.updateSaveButton(status);
    this.props.selectBucket('--Select Buckets--', bucketDefaultKey);
    if (!storeData.updateCurrentPage.currentPage) {
      this.props.updateCurrentPage(currentPage);
    }
  }

  async getAllAvailableKeys() {
    const trueResult = await getAllAvailableKeys(
      this.props.storeData.selectBucket.bucket,
    ); // GET fetch

    if (trueResult.includes('bad keys fetch:')) {
      this.props.loadAllKeysFailed(trueResult); // in store
    } else {
      this.props.loadAllKeysSuccess(trueResult);
      const pageCount = Math.ceil(trueResult.length / manifest.rowsPerPage);
      console.log('pageCount: ', pageCount);
      this.props.updatePageCount(pageCount);
      this.getChannelFeed();
    }
  }

  async getChannelFeed() {
    const trueResult = await getChannelFeed(
      this.props.storeData.selectBucket.bucket,
      this.props.storeData.loadAllKeysSuccess.allKeys,
      this.props.storeData.updateCurrentPage.currentPage,
    ); // GET fetch
    if (trueResult.includes('bad data fetch:')) {
      this.props.loadDatafailed(trueResult);
    } else {
      this.props.loadDataSuccess(trueResult);
    }
  }

  async removeJson(id, rev) {
    const trueResult = await removeJson(
      this.props.storeData.selectBucket.bucket,
      this.props.storeData.dataReducer.data,
      id,
      rev,
    ); // DELETE fetch
    if (trueResult.includes('bad remove fetch:')) {
      this.props.removeDocumentFailed(trueResult);
    } else {
      this.getAllAvailableKeys();
    }
  }

  async updateJson(newDoc, id, rev) {
    const trueResult = await updateJson(
      this.props.storeData.selectBucket.bucket,
      newDoc,
      id,
      rev,
    ); // PUT fetch
    if (trueResult.includes('bad update fetch:')) {
      console.log('in store');
      this.props.saveDocumentFailed(trueResult);
    } else {
      this.getAllAvailableKeys();
    }
    this.getChannelFeed(); // incase a doc saved multiple times
  }

  async bucketHandleChecked(event) {
    await this.props.selectBucket(event.target.value, true);
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
      alert('Document id is not found!'); // eslint-disable-line no-alert
      event.preventDefault();
    }
  }

  render() {
    const { storeData } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <LinearProgress />
          <MenuGenerator
            bucketHandleChecked={this.bucketHandleChecked}
            bucketDefaultKey={storeData.selectBucket.bucketDefaultKey}
            selectBucket={storeData.selectBucket.bucket}
            searchHandleSubmit={this.searchHandleSubmit}
            searchHandleChange={this.searchHandleChange}
          />
          <div>
            {storeData.dataReducer && storeData.dataReducer.data ? (
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
            ) : null}
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
                        removeJson={this.removeJson}
                        updateJson={this.updateJson}
                        foundID={storeData.foundDocument.id}
                      />
                    );
                  }
                  return true;
                })
              : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// allows reducers in the redux store to become accessible within React Components through this.props.
function mapStateToProps(state) {
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
  foundDocument,
  selectBucket,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDataSuccess,
  loadDatafailed,
  removeDocumentFailed,
  saveDocumentFailed,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  updateStatus,
  updateSaveButton,
})(App);
