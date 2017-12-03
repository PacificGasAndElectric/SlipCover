// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {
    ADD_ALLKEYS,
    SAVE_DOCUMENT,
    REMOVE_DOCUMENT,
    LOAD_SUCCESS,
    LOAD_FAILED
}  from '../constants';

export const addAllKeys = (allKeys) => {
    const action = {
        type: ADD_ALLKEYS,
        allKeys: allKeys
    }
    console.log('ADD_ALLKEYS in actions.js: ', action);
    return action;
}

export const saveDocument = (id, newDoc) => {
    const action = {
        type: SAVE_DOCUMENT,
        id, 
        newDoc
    }
    console.log('SAVE_DOCUMENT in action.js: ', action);
    return action;
}

export const removeDocument = (id) => {
    const action = {
        type: REMOVE_DOCUMENT,
        id    
    }
    console.log('REMOVE_DOCUMENT in action.js: ', action);
    return action;
}

export const loadSuccess = (response) => {
    const action = {
        type: LOAD_SUCCESS,
        response
    }
    console.log('LOAD_SUCCESS in action.js: ', action);
    return action;
}

export const loadFailed = (error) => {
    const action = {
        type: LOAD_FAILED,
        error
    }
    console.log('LOAD_FAILED in action.js: ', action);
    return action;
}