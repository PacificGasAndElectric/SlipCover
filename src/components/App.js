import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Alert from 'react-s-alert'; // Alert messages
import 'react-s-alert/dist/s-alert-default.css'; // CSS for Alert messages
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from './LinearProgress';
import idValidation from './validation/idValidation.js';
import ListDocuments from './ListDocuments.js';
import MenuGenerator from './MenuGenerator.js';
import getAllAvailableKeys from './fetches/getAllAvailableKeys'; // Fetch: get all keys
import getChannelFeed from './fetches/getChannelFeed'; // Fetch: get documents based on keys
import removeJson from './fetches/removeJson'; // Fetch: remove documents
import updateJson from './fetches/updateJson'; // Fetch: update docuements

import '../App.css';
import {
  foundDocument,
  selectedBucket,
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
  progressBar,
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
    this.props.updateStatus(false);
    this.props.updateSaveButton(false);
    this.props.updateCurrentPage(1);
    this.props.progressBar(0);
  }

  /* 
    This function will grab ONLY documents ID's
      - Put all documents ID's in store
      - Determine page numbers and store them for pagination purpose
  */
  async getAllAvailableKeys() {
    const trueResult = await getAllAvailableKeys(
      this.props.storeData.selectedBucket,
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

  /*
    This function will grab number of documents per page based on available documents ID's
    Update pagination 'rowsPerPage'
  */
  async getChannelFeed() {
    const trueResult = await getChannelFeed(
      this.props.storeData.selectedBucket,
      this.props.storeData.loadAllKeysSuccess,
      this.props.storeData.updateCurrentPage,
    ); // GET fetch
    if (trueResult.includes('bad data fetch:')) {
      this.props.loadDatafailed(trueResult);
    } else {
      this.props.loadDataSuccess(trueResult);
    }
  }

  /*
    This function will remove a specific document
      - Update documents ID's
      - Update pagination
  */
  async removeJson(id, rev) {
    const trueResult = await removeJson(
      this.props.storeData.selectedBucket,
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

  /*
    This function will update any changes to a document
      - Update documents ID's in the store
      - Update pagination
  */
  async updateJson(newDoc, id, rev) {
    const trueResult = await updateJson(
      this.props.storeData.selectedBucket,
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

  // Put the selected bucket into the store
  async bucketHandleChecked(event) {
    await this.props.selectedBucket(event.target.value);
    if (
      this.props.storeData.selectedBucket !== '' &&
      this.props.storeData.selectedBucket !== '-- Select Bucket --'
    ) {
      this.getAllAvailableKeys();
    }
  }

  // eslint-disable-next-line
  // Upate current page 'Pagination'
  async handlePageClick(data) {
    const currentPage = data.selected + 1;
    await this.props.updateCurrentPage(currentPage);
    this.getChannelFeed();
  }

  // Insert whatever you type in the search field into the store
  async searchHandleChange(event) {
    console.log('search clicked!');
    const searchValue = event.target.value;
    await this.props.searchDocument(searchValue);
  }

  // search for doc by ID and return it if found
  async searchHandleSubmit(event) {
    const { storeData } = this.props;
    const id = storeData.searchDocument.trim(); // truncate spaces
    if (storeData.loadAllKeysSuccess) {
      const pos = storeData.loadAllKeysSuccess.indexOf(id);
      const isFound = idValidation(pos, event);
      console.log('isFound: ', isFound);
      if (isFound) {
        event.preventDefault(); // make sure before 1st await for async func to avoid refreshing page

        await this.props.foundDocument(id);
        const rowsPerPage = manifest.rowsPerPage;
        const currentPage = Math.ceil((pos + 1) / rowsPerPage);

        await this.props.updateCurrentPage(currentPage);
        console.log('Key is found in pageNumber: ', currentPage);
        this.getChannelFeed();
      }
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
            selectedBucket={storeData.selectedBucket}
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
                pageCount={storeData.updatePageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            ) : null}
          </div>

          {/*   
            Map though the data
            Each document will have it's unique Key/Index
          */}
          <div>
            {storeData.dataReducer && storeData.dataReducer.data
              ? storeData.dataReducer.data.map(object => {
                  if (storeData.selectedBucket) {
                    return (
                      <ListDocuments
                        key={object._id}
                        index={object._id}
                        prop={object}
                        removeJson={this.removeJson}
                        updateJson={this.updateJson}
                        foundID={storeData.foundDocument}
                      />
                    );
                  }
                  return true;
                })
              : null}
          </div>
          <Alert />
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
  selectedBucket,
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
  progressBar,
})(App);
