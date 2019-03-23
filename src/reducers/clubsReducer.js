import {CHANGE_QUERY} from '../constants/action-types';
import {CLUB_LIST} from '../constants/action-types';

const initialState =  {
    clubs:[],
    searchQuery:''

};

function clubsReducer(state = initialState, action){
    switch(action.type){
    case CHANGE_QUERY:
        return {
            ...state,
            searchQuery: action.payload
        };
    case CLUB_LIST:
        return{
            ...state,
            clubs:action.payload

        };
    default:
        return initialState;
    }
}

export default clubsReducer;
