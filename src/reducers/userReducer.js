import {ADD_USER} from '../constants/action-types';

const initialState =  {
    user:{
        username:'',
        fullName:'',
        email: '',
        token:''
    }
};

function userReducer(state = initialState, action){
    if (action.type === ADD_USER){
        return Object.assign({}, state, {
            user: action.payload
        });
    }
    return state;
}

export default userReducer;
