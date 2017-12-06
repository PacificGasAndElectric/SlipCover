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

const addAllKeys = (state=[], action) => {
    const obj = state.filter(ele => !ele.allKeys);
    obj.push(action);
    return obj;
}

const saveDocument = (state=[], action) => {
    let id = [];
    let newDoc = [];
    let oldDoc = [];
    id.push(action.id);
    newDoc.push(action.newDoc)
    oldDoc.push(action.oldDoc);

    state.filter(ele => {
        if (ele.type === action.type){
            id = id.concat(ele.id);
            newDoc = newDoc.concat(ele.newDoc);
            oldDoc = oldDoc.concat(ele.oldDoc);
        }
        return false;
    })
    action.id = id;
    action.newDoc = newDoc;
    action.oldDoc = oldDoc;
    const obj = state.filter(ele => ele.type !== action.type) // eliminate the old action
    obj.push(action); // push action with new id's
    return obj; 
}

const removeDocument = (state=[], action) => {
    let id = [];
    id.push(action.id);     

    state.filter(ele => {
        if (ele.type === action.type){
            id = id.concat(ele.id);
        }
        return false;
    })
    action.id = id;
    const obj = state.filter(ele => ele.type !== action.type) // eliminate the old action
    obj.push(action); // push action with new id's
    return obj; 
}

const loadAllKeysSuccess = (state=[], action) => {
    const obj = state.filter(ele => !ele.keysResponse);
    obj.push(action);
    return obj;
}

const loadDataSuccess = (state=[], action) => {
    const obj = state.filter(ele => !ele.dataResponse);
    obj.push(action);
    return obj;
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
            reducers = addAllKeys(state, action);
            console.log('ADD_ALLKEYS in reducer.js: ', reducers);
            return reducers;
        case SAVE_DOCUMENT:
            reducers = saveDocument(state, action)
            return reducers;
        case REMOVE_DOCUMENT:
            reducers = removeDocument(state, action)
            return reducers;        
        case LOAD_ALLKEYS_SUCCESS:
            reducers = loadAllKeysSuccess(state, action)
            return reducers;
        case LOAD_DATA_SUCCESS:
            reducers = loadDataSuccess(state, action)
            return reducers; 
        case LOAD_AllKEYS_FAILED:
            reducers = [...state, loadAllKeysFailed(state, action)]
            return reducers;
        case LOAD_DATA_FAILED:
            reducers = [...state, loadDataFailed(state, action)]
            return reducers;
        default:
            return state;
    }
}

export default reducers;