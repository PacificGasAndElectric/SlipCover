// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
import {
    ADD_ALLKEYS,
    SAVE_DOCUMENT,
    REMOVE_DOCUMENT,
    LOAD_SUCCESS,
    LOAD_FAILED
}  from '../constants';

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

const loadSuccess = (state={}, action) => {
    const { response } = action;
    return {
        response
    }
}

const loadFailed = (state=[], action) => {
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
        case LOAD_SUCCESS:
            reducers = [...state, loadSuccess(state, action)]
            // console.log('LOAD_SUCCESS in reducer.js: ', reducers);
            return reducers;
        case LOAD_FAILED:
            reducers = [...state, loadFailed(state, action)]
            // console.log('LOAD_FAILED in reducer.js: ', reducers);
            return reducers;   
        default:
            return state;
    }
}

export default reducers;