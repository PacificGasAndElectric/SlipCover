// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
// import { combineReducers } from 'redux';

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

// TODO: refactor as a separate message reducer with css
const loadAllKeysFailed = (state = [], action) => {
  const { error } = action;
  return {
    error,
  };
};

const loadDataFailed = (state = [], action) => {
  const { error } = action;
  return {
    error,
  };
};

// const foundID = (state = '', { type, foundId }) => {
//   switch (type) {
//     case FOUND_ID:
//       return foundId;
//     default: {
//       return state;
//     }
//   }
// };
//
// const selectBucket = (state = [], { type, selected }) => {
//   switch (type) {
//     case SELECT_BUCKET:
//       return { ...state, selected };
//     default: {
//       return state;
//     }
//   }
// };

const reducer = (state = [], action) => {
  let reducers = null;
  switch (action.type) {
    case SAVE_DOCUMENT:
      return {
        ...state,
        data: state.data.map(n => (n.id === action.id ? action.newDoc : n)),
      };
    case REMOVE_DOCUMENT:
      return { ...state, data: state.data.filter(ele => ele.id !== action.id) };
    case LOAD_ALLKEYS_SUCCESS:
      return { ...state, allKeys: action.allKeys };
    case LOAD_DATA_SUCCESS:
      return { ...state, data: action.dataResponse.rows.map(n => n.doc) };
    case LOAD_ALLKEYS_FAILED:
      reducers = [...state, loadAllKeysFailed(state, action)];
      return reducers;
    case LOAD_DATA_FAILED:
      reducers = [...state, loadDataFailed(state, action)];
      return reducers;
    case SELECT_BUCKET:
      return { ...state, selected: action.selected };
    case UPDATE_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case UPDATE_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount };
    case SEARCH_DOCUMENT:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case FOUND_ID:
      return {
        ...state,
        foundID: action.foundID,
      };
    default:
      return state;
  }
};
export default reducer;
// export default combineReducers({ reducer, foundID, selectBucket });
