import {ADD_USER} from '../constants/action-types';

export function addUsers(payload){
    return {type: ADD_USER, payload};
}
