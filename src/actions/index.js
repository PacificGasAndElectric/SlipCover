// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {
    ADD_ALLKEYS,
    SAVE_DOCUMENT,
    REMOVE_DOCUMENT,
    LOAD_ALLKEYS_SUCCESS,
    LOAD_AllKEYS_FAILED,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAILED
}  from '../constants';

export const addAllKeys = (allKeys) => {
    const action = {
        type: ADD_ALLKEYS,
        allKeys: allKeys
    }
    // console.log('ADD_ALLKEYS in actions.js: ', action);
    return action;
}

export const saveDocument = (id, newDoc) => {
    const action = {
        type: SAVE_DOCUMENT,
        id, 
        newDoc
    }
    // console.log('SAVE_DOCUMENT in action.js: ', action);
    return action;
}

export const removeDocument = (id) => {
    const action = {
        type: REMOVE_DOCUMENT,
        id    
    }
    // console.log('REMOVE_DOCUMENT in action.js: ', action);
    return action;
}

export const loadAllKeysSuccess = (keysResponse) => {
    const action = {
        type: LOAD_ALLKEYS_SUCCESS,
        keysResponse
    }
    // console.log('LOAD_ALLKEYS_SUCCESS in action.js: ', action);
    return action;
}

export const loadDataSuccess = (dataResponse) => {
    const action = {
        type: LOAD_DATA_SUCCESS,
        dataResponse
    }
    // console.log('LOAD_DATA_SUCCESS in action.js: ', action);
    return action;
}

export const loadAllKeysFailed = (error) => {
    const action = {
        type: LOAD_AllKEYS_FAILED,
        error
    }
    // console.log('LOAD_AllKEYS_FAILED in action.js: ', action);
    return action;
}

export const loadDataFailed = (error) => {
    const action = {
        type: LOAD_DATA_FAILED,
        error
    }
    // console.log('LOAD_AllKEYS_FAILED in action.js: ', action);
    return action;
}