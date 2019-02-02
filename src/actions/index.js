import {ADD_USERS} from '../constants/action-types';


export function addUsers(payload){
    return {type: ADD_USERS, payload};
}
