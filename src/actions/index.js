// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {
  SAVE_DOCUMENT,
  REMOVE_DOCUMENT,
  LOAD_ALLKEYS_SUCCESS,
  LOAD_ALLKEYS_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  SELECT_BUCKET,
  UPDATE_CURRENT_PAGE,
  UPDATE_PAGE_COUNT,
  SEARCH_DOCUMENT,
  FOUND_ID,
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

export const loadDataSuccess = dataResponse => ({
  type: LOAD_DATA_SUCCESS,
  dataResponse,
});

export const loadAllKeysFailed = error => ({
  type: LOAD_ALLKEYS_FAILED,
  error,
});

export const loadDataFailed = error => ({
  type: LOAD_DATA_FAILED,
  error,
});

export const selectBucket = selected => ({
  type: SELECT_BUCKET,
  selected,
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

export const foundId = foundID => ({
  type: FOUND_ID,
  foundID,
});
