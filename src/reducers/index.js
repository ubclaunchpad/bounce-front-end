import {ADD_USER} from '../constants/action-types';

const initialState =  {
    users:[]
};

function rootReducer(state = initialState, action){
    if (action.type == ADD_USER){
        return Object.assign({}, state, {
            users : state.users.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;
