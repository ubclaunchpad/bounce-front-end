import clubsReducer from '../reducers/clubsReducer.js';
import userReducer from '../reducers/userReducer';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    clubsReducer: clubsReducer,
    userReducer: userReducer
});

export default rootReducer;
