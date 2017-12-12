// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
import { combineReducers } from 'redux';

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

const foundDocument = (state = '', { type, id }) => {
  switch (type) {
    case FOUND_DOCUMENT:
      return {
        ...state,
        id,
      };
    default:
      return state;
  }
};

const selectBucket = (state = [], { type, bucket }) => {
  switch (type) {
    case SELECT_BUCKET:
      return { ...state, bucket };
    default:
      return state;
  }
};

const loadAllKeysSuccess = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALLKEYS_SUCCESS:
      return { ...state, allKeys: action.allKeys };
    default:
      return state;
  }
};

const updateCurrentPage = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    default:
      return state;
  }
};

const updatePageCount = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount };
    default:
      return state;
  }
};

const searchDocument = (state = [], action) => {
  switch (action.type) {
    case SEARCH_DOCUMENT:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    default:
      return state;
  }
};

const dataReducer = (state = [], action) => {
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
        // status: state.data.indexOf(action.id) ? action.status : !action.status,
        // status: state.data.map(
        //   ele => (ele._id === action.id ? action.status : !action.status),
        // ),
      };
    case UPDATE_SAVE_BUTTON:
      return { ...state, id: action.id, status: action.status };
    default:
      return state;
  }
};

export default combineReducers({
  foundDocument,
  selectBucket,
  loadAllKeysSuccess,
  updateCurrentPage,
  updatePageCount,
  searchDocument,
  dataReducer,
});
