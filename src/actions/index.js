// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {
  SAVE_DOCUMENT,
  REMOVE_DOCUMENT,
  LOAD_ALLKEYS_SUCCESS,
  LOAD_DATA_SUCCESS,
  SELECT_BUCKET,
  UPDATE_CURRENT_PAGE,
  UPDATE_PAGE_COUNT,
  SEARCH_DOCUMENT,
  FOUND_DOCUMENT,
  UPDATE_STATUS,
  UPDATE_SAVE_BUTTON,
} from '../constants';

export const loadAllKeysSuccess = allKeys => ({
  type: LOAD_ALLKEYS_SUCCESS,
  allKeys,
});

export const saveDocument = (id, newDoc, oldDoc) => ({
  type: SAVE_DOCUMENT,
  id,
  newDoc,
  oldDoc,
});

export const removeDocument = id => ({ type: REMOVE_DOCUMENT, id });

export const loadDataSuccess = rows => ({
  type: LOAD_DATA_SUCCESS,
  rows,
});

export const selectBucket = bucket => ({
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
