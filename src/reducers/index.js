// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
import {
    ADD_ALLKEYS,
    SAVE_DOCUMENT,
    REMOVE_DOCUMENT,
    LOAD_ALLKEYS_SUCCESS,
    LOAD_AllKEYS_FAILED,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAILED
}  from '../constants';
import { createLogger } from 'redux-logger';

createLogger({
    collapsed: (state =[], action) => action.type === LOAD_ALLKEYS_SUCCESS
});

const addAllKeys = (action) => {
    const {allKeys} = action;
    return {
        allKeys
    }
}

const saveDocument = (state=[], action) => {
    const { id, newDoc } = action;
    return {
        id, 
        newDoc
    } 
}

const removeDocument = (state=[], action) => {
    const { id } = action;
    return {
        id
    }    
}

const loadAllKeysSuccess = (state=[], action) => {
    const { keysResponse } = action;
    return {
        keysResponse
    }
}

const loadDataSuccess = (state=[], action) => {
    const { dataResponse } = action;
    return {
        dataResponse
    }
}

const loadAllKeysFailed = (state=[], action) => {
    const { error } = action;
    return {
        error
    }
}

const loadDataFailed = (state=[], action) => {
    const { error } = action;
    return {
        error
    }
}

const reducers = (state =[], action) => {
    let reducers = null;
    switch (action.type) {
        case ADD_ALLKEYS:
            reducers = [...state, addAllKeys(action)];
            // console.log('ADD_ALLKEYS in reducer.js: ', reducers);
            return reducers;
        case SAVE_DOCUMENT:
            reducers = [...state, saveDocument(state, action)]
            // console.log('SAVE_DOCUMENT in reducer.js: ', reducers);
            return reducers;
        case REMOVE_DOCUMENT:
            reducers = [...state, removeDocument(state, action)]
            // console.log('REMOVE_DOCUMENT in reducer.js: ', reducers);
            return reducers;        
        case LOAD_ALLKEYS_SUCCESS:
            reducers = [...state, loadAllKeysSuccess(state, action)]
            // console.log('LOAD_ALLKEYS_SUCCESS in reducer.js: ', reducers);
            return reducers;
        case LOAD_DATA_SUCCESS:
            reducers = [...state, loadDataSuccess(state, action)]
            // console.log('LOAD_DATA_SUCCESS in reducer.js: ', reducers);
            return reducers; 
        case LOAD_AllKEYS_FAILED:
            reducers = [...state, loadAllKeysFailed(state, action)]
            // console.log('LOAD_AllKEYS_FAILED in reducer.js: ', reducers);
            return reducers;
        case LOAD_DATA_FAILED:
            reducers = [...state, loadDataFailed(state, action)]
            // console.log('LOAD_DATA_FAILED in reducer.js: ', reducers);
            return reducers;
        default:
            return state;
    }
}

export default reducers;