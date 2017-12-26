// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
import { combineReducers } from 'redux';

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

export const foundDocument = (state = '', { type, id }) => {
  switch (type) {
    case FOUND_DOCUMENT:
      return id;
    default:
      return state;
  }
};

export const selectedBucket = (state = '', { type, bucket }) => {
  switch (type) {
    case SELECT_BUCKET:
      return bucket;
    default:
      return state;
  }
};

export const loadAllKeysSuccess = (state = {}, { type, allKeys }) => {
  switch (type) {
    case LOAD_ALLKEYS_SUCCESS:
      return { ...state, allKeys };
    default:
      return state;
  }
};

export const loadAllKeysFailed = (state = [], { type, error }) => {
  switch (type) {
    case LOAD_ALLKEYS_FAILED:
      return { ...state, error };
    default:
      return state;
  }
};

export const loadDatafailed = (state = [], { type, error }) => {
  switch (type) {
    case LOAD_DATA_FAILED:
      return { ...state, error };
    default:
      return state;
  }
};

export const removeDocumentFailed = (state = [], { type, error }) => {
  switch (type) {
    case REMOVE_DOCUMENT_FAILED:
      return { ...state, error };
    default:
      return state;
  }
};

export const saveDocumentFailed = (state = [], { type, error }) => {
  switch (type) {
    case SAVE_DOCUMENT_FAILED:
      return { ...state, error };
    default:
      return state;
  }
};

export const updateCurrentPage = (state = '', { type, currentPage }) => {
  switch (type) {
    case UPDATE_CURRENT_PAGE:
      return currentPage;
    default:
      return state;
  }
};

export const updatePageCount = (state = '', { type, pageCount }) => {
  switch (type) {
    case UPDATE_PAGE_COUNT:
      return pageCount;
    default:
      return state;
  }
};

export const searchDocument = (state = '', { type, searchValue }) => {
  switch (type) {
    case SEARCH_DOCUMENT:
      return searchValue;
    default:
      return state;
  }
};

export const progressBar = (state = [], { type, timer }) => {
  switch (type) {
    case PROGRESS_BAR:
      return timer;
    default:
      return state;
  }
};

export const dataReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      return { ...state, data: action.rows };
    case SAVE_DOCUMENT:
      return {
        ...state,
        data: state.data.map(
          ele => (ele._id === action.id ? action.newDoc : ele),
        ),
      };
    case REMOVE_DOCUMENT:
      return {
        ...state,
        data: state.data.filter(ele => ele._id !== action.id),
      };
    case UPDATE_STATUS:
      return {
        ...state,
        id: action.id,
        status: action.status,
      };
    case UPDATE_SAVE_BUTTON:
      return { ...state, id: action.id, status: action.status };
    default:
      return state;
  }
};

export default combineReducers({
  foundDocument,
  selectedBucket,
  loadAllKeysSuccess,
  loadAllKeysFailed,
  loadDatafailed,
  removeDocumentFailed,
  saveDocumentFailed,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  dataReducer,
  progressBar,
});
