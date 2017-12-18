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
} from '../constants';
import {
  selectBucket,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDataSuccess,
  loadDatafailed,
  saveDocument,
  saveDocumentFailed,
  removeDocument,
  removeDocumentFailed,
  updateCurrentPage,
  updatePageCount,
  foundDocument,
  searchDocument,
  updateStatus,
  updateSaveButton,
} from './index';

test('select a bucket - action', t => {
  t.deepEqual(selectBucket('beer-sample'), {
    type: SELECT_BUCKET,
    bucket: 'beer-sample',
  });
});

test('load all keys while fetching - action', t => {
  const arrOfKeys = ['key1', 'key2', 'key3'];
  t.deepEqual(loadAllKeysSuccess(arrOfKeys), {
    type: LOAD_ALLKEYS_SUCCESS,
    allKeys: arrOfKeys,
  });
});

test('load all keys faild while fetching - action', t => {
  t.deepEqual(loadAllKeysFailed('400 Bad Request'), {
    type: LOAD_ALLKEYS_FAILED,
    error: '400 Bad Request',
  });
});

test('load data - action', t => {
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

  t.deepEqual(loadDataSuccess(data), {
    type: LOAD_DATA_SUCCESS,
    rows: data,
  });
});

test('load data failed while fetching - action', t => {
  t.deepEqual(loadDatafailed('409 Bad Conflict'), {
    type: LOAD_DATA_FAILED,
    error: '409 Bad Conflict',
  });
});

test('save document - action', t => {
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

  t.deepEqual(saveDocument(id, newDoc, oldDoc), {
    type: SAVE_DOCUMENT,
    id,
    newDoc,
    oldDoc,
  });
});

test('save document failed while fetching - action', t => {
  t.deepEqual(saveDocumentFailed('405 Method Not Allowed'), {
    type: SAVE_DOCUMENT_FAILED,
    error: '405 Method Not Allowed',
  });
});

test('remove document per id - action', t => {
  t.deepEqual(removeDocument('987654321'), {
    type: REMOVE_DOCUMENT,
    id: '987654321',
  });
});

test('remove document failed while fetching new keys', t => {
  t.deepEqual(removeDocumentFailed('404 Not Found'), {
    type: REMOVE_DOCUMENT_FAILED,
    error: '404 Not Found',
  });
});

test('update current page - action', t => {
  t.deepEqual(updateCurrentPage(5), {
    type: UPDATE_CURRENT_PAGE,
    currentPage: 5,
  });
});

test('update page count - action', t => {
  t.deepEqual(updatePageCount(293), {
    type: UPDATE_PAGE_COUNT,
    pageCount: 293,
  });
});

test('document found per id - action', t => {
  t.deepEqual(foundDocument('8-897657896525251'), {
    type: FOUND_DOCUMENT,
    id: '8-897657896525251',
  });
});

test('search a specific document per id - action', t => {
  t.deepEqual(searchDocument('8-897657896525251'), {
    type: SEARCH_DOCUMENT,
    searchValue: '8-897657896525251',
  });
});

test('update status flag - action', t => {
  t.deepEqual(updateStatus(false, '987654321'), {
    type: UPDATE_STATUS,
    status: false,
    id: '987654321',
  });
});

test('update save button flag - action', t => {
  t.deepEqual(updateSaveButton(true, '195'), {
    type: UPDATE_SAVE_BUTTON,
    status: true,
    id: '195',
  });
});
