// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
import {ADD_ALLKEYS, SAVE_DOCUMENT}  from '../constants';

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