// Reducers - extract the Redux logic for the store into functions that handle actions and return pieces of the state.
import {ADD_ALLKEYS, SAVE_DOCUMENT}  from '../constants';
const addAllKeys = (action) => {
    const {allKeys} = action;
    return {
        allKeys
    }
}

const saveDocument = (state=[], action) => {
    // console.log('state in saveDocument in reducer: ', state[0].allKeys);
    let newDoc = '';
    state[0].allKeys.filter(key => {
        if (key === action.id){
            newDoc = action.newDoc;
        }
        return false;
    });
    return {newDoc};
}

const reducers = (state =[], action) => {
    let reducers = null;
    switch (action.type) {
        case ADD_ALLKEYS:
            reducers = [...state, addAllKeys(action)];
            console.log('ADD_ALLKEYS in reducer.js: ', reducers);
            return reducers;
        case SAVE_DOCUMENT:
            reducers = [...state, saveDocument(state, action)]
            console.log('SAVE_DOCUMENT in reducer.js: ', reducers);
            return reducers;
        default:
            return state;
    }
}

export default reducers;