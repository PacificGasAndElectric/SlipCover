import test from 'ava';
import {
  SELECT_BUCKET,
  LOAD_ALLKEYS_SUCCESS,
  LOAD_ALLKEYS_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  SAVE_DOCUMENT,
  SAVE_DOCUMENT_FAILED,
  REMOVE_DOCUMENT,
  REMOVE_DOCUMENT_FAILED,
  UPDATE_CURRENT_PAGE,
  UPDATE_PAGE_COUNT,
  FOUND_DOCUMENT,
  SEARCH_DOCUMENT,
  UPDATE_STATUS,
  UPDATE_SAVE_BUTTON,
  PROGRESS_BAR,
} from '../constants';
import {
  selectBucket,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDatafailed,
  saveDocumentFailed,
  removeDocumentFailed,
  updateCurrentPage,
  updatePageCount,
  foundDocument,
  searchDocument,
  dataReducer, // saveDocument, removeDocument, loadDataSuccess, updateStatus, updateSaveButton
  progressBar,
} from './index';

test('should set the current bucket', t => {
  const state = [];
  const action = {
    type: SELECT_BUCKET,
    bucket: 'beer-sample',
    bucketDefaultKey: false,
  };
  const result = {
    bucket: 'beer-sample',
    bucketDefaultKey: false,
  };
  t.deepEqual(selectBucket(state, action), result);
});

test('all keys should be loaded', t => {
  const arrOfKeys = ['key1', 'key2', 'key3'];
  const state = [];
  const action = {
    type: LOAD_ALLKEYS_SUCCESS,
    allKeys: arrOfKeys,
  };
  const result = { allKeys: arrOfKeys };
  t.deepEqual(loadAllKeysSuccess(state, action), result);
});

test('fail loading all keys while fetching', t => {
  const state = [];
  const action = {
    type: LOAD_ALLKEYS_FAILED,
    error: '400 Bad Request',
  };
  const result = {
    error: '400 Bad Request',
  };
  t.deepEqual(loadAllKeysFailed(state, action), result);
});

test('data should be loaded', t => {
  const data = [
    {
      _id: '111',
      description: 'test',
      name: 'Ibrahim',
    },
    {
      _id: '222',
      description: 'test',
      name: 'Al Sinafi',
    },
  ];
  const state = [];
  const action = {
    type: LOAD_DATA_SUCCESS,
    rows: data,
  };
  const result = {
    data,
  };
  t.deepEqual(dataReducer(state, action), result); // loadDataSuccess
});

test('fail loading data', t => {
  const state = [];
  const action = {
    type: LOAD_DATA_FAILED,
    error: '409 Bad Conflict',
  };
  const result = {
    error: '409 Bad Conflict',
  };
  t.deepEqual(loadDatafailed(state, action), result);
});

/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
test('new document should be saved', t => {
  const id = '123456789';
  const newDoc = {
    _id: '123456789',
    description: 'Updated test',
    name: 'Ibrahim Al Sinafi',
  };
  const oldDoc = {
    _id: '123456789',
    description: 'test',
    name: '',
  };

  const state = {
    data: [
      {
        _id: '123456789',
        description: 'test',
        name: '',
      },
      {
        _id: '101010',
        description: 'sample document',
        name: '',
      },
    ],
  };

  const updatedData = [
    {
      _id: '123456789',
      description: 'Updated test',
      name: 'Ibrahim Al Sinafi',
    },
    {
      _id: '101010',
      description: 'sample document',
      name: '',
    },
  ];

  const action = {
    type: SAVE_DOCUMENT,
    id,
    newDoc,
    oldDoc,
  };
  const result = {
    data: updatedData,
  };
  t.deepEqual(dataReducer(state, action), result); // saveDocument
});

test('fail saving document while fetching', t => {
  const state = [];
  const action = {
    type: SAVE_DOCUMENT_FAILED,
    error: '405 Method Not Allowed',
  };
  const result = {
    error: '405 Method Not Allowed',
  };
  t.deepEqual(saveDocumentFailed(state, action), result);
});

test('document should be removed per id', t => {
  const id = '123456789';
  const state = {
    data: [
      {
        _id: '123456789',
        description: 'test',
        name: '',
      },
      {
        _id: '101010',
        description: 'sample document',
        name: '',
      },
    ],
  };

  // remove a doc from state with id declared above
  const updatedDocument = [
    {
      _id: '101010',
      description: 'sample document',
      name: '',
    },
  ];

  const action = {
    type: REMOVE_DOCUMENT,
    id,
  };
  const result = {
    data: updatedDocument,
  };
  t.deepEqual(dataReducer(state, action), result); // removeDocument
});

test('fail removing document while fetching', t => {
  const state = [];
  const action = {
    type: REMOVE_DOCUMENT_FAILED,
    error: '404 Not Found',
  };
  const result = {
    error: '404 Not Found',
  };
  t.deepEqual(removeDocumentFailed(state, action), result);
});

test('should update the current page', t => {
  const state = [];
  const action = {
    type: UPDATE_CURRENT_PAGE,
    currentPage: 5,
  };
  const result = {
    currentPage: 5,
  };
  t.deepEqual(updateCurrentPage(state, action), result);
});

test('should update the page count', t => {
  const state = [];
  const action = {
    type: UPDATE_PAGE_COUNT,
    pageCount: 294,
  };
  const result = {
    pageCount: 294,
  };
  t.deepEqual(updatePageCount(state, action), result);
});

test('document should be found', t => {
  const state = '';
  const action = {
    type: FOUND_DOCUMENT,
    id: '8-897657896525251',
  };
  const result = {
    id: '8-897657896525251',
  };
  t.deepEqual(foundDocument(state, action), result);
});

test('search document should be found', t => {
  const state = [];
  const action = {
    type: SEARCH_DOCUMENT,
    searchValue: '8-897657896525251',
  };
  const result = {
    searchValue: '8-897657896525251',
  };
  t.deepEqual(searchDocument(state, action), result);
});

test('status flag should be updated', t => {
  const state = [];
  const action = {
    type: UPDATE_STATUS,
    status: false,
    id: '987654321',
  };
  const result = {
    status: false,
    id: '987654321',
  };
  t.deepEqual(dataReducer(state, action), result); // updateStatus
});

test('save button flag should be updated', t => {
  const state = [];
  const action = {
    type: UPDATE_SAVE_BUTTON,
    status: true,
    id: '195',
  };
  const result = {
    status: true,
    id: '195',
  };
  t.deepEqual(dataReducer(state, action), result); // updateSaveButton
});

test('timer should be updated when load the page', t => {
  const timer = 99.2;
  const state = [];
  const action = {
    type: PROGRESS_BAR,
    timer,
  };
  const result = { timer };
  t.deepEqual(progressBar(state, action), result);
});
