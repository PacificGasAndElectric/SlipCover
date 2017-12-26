// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {
  LOAD_ALLKEYS_SUCCESS,
  LOAD_ALLKEYS_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  REMOVE_DOCUMENT,
  REMOVE_DOCUMENT_FAILED,
  SAVE_DOCUMENT,
  SAVE_DOCUMENT_FAILED,
  SELECT_BUCKET,
  UPDATE_CURRENT_PAGE,
  UPDATE_PAGE_COUNT,
  SEARCH_DOCUMENT,
  FOUND_DOCUMENT,
  UPDATE_STATUS,
  UPDATE_SAVE_BUTTON,
  PROGRESS_BAR,
} from '../constants';

export const loadAllKeysSuccess = allKeys => ({
  type: LOAD_ALLKEYS_SUCCESS,
  allKeys,
});

export const loadAllKeysFailed = error => ({
  type: LOAD_ALLKEYS_FAILED,
  error,
});

export const loadDataSuccess = rows => ({
  type: LOAD_DATA_SUCCESS,
  rows,
});

export const loadDatafailed = error => ({
  type: LOAD_DATA_FAILED,
  error,
});

export const removeDocument = id => ({ type: REMOVE_DOCUMENT, id });

export const removeDocumentFailed = error => ({
  type: REMOVE_DOCUMENT_FAILED,
  error,
});

export const saveDocument = (id, newDoc, oldDoc) => ({
  type: SAVE_DOCUMENT,
  id,
  newDoc,
  oldDoc,
});

export const saveDocumentFailed = error => ({
  type: SAVE_DOCUMENT_FAILED,
  error,
});

export const selectedBucket = bucket => ({
  type: SELECT_BUCKET,
  bucket,
});

export const updateCurrentPage = currentPage => ({
  type: UPDATE_CURRENT_PAGE,
  currentPage,
});

export const updatePageCount = pageCount => ({
  type: UPDATE_PAGE_COUNT,
  pageCount,
});

export const searchDocument = searchValue => ({
  type: SEARCH_DOCUMENT,
  searchValue,
});

export const foundDocument = id => ({
  type: FOUND_DOCUMENT,
  id,
});

export const updateStatus = (status, id) => ({
  type: UPDATE_STATUS,
  status,
  id,
});

export const updateSaveButton = (status, id) => ({
  type: UPDATE_SAVE_BUTTON,
  status,
  id,
});

export const progressBar = timer => ({
  type: PROGRESS_BAR,
  timer,
});
