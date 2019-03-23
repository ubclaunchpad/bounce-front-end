import store from '../store/configureStore';
import { addUsers} from '../actions/addUser';
import { changeClubs} from '../actions/changeClubs';
import {changeQuery} from '../actions/changeQuery';


window.store = store;
window.addUsers = addUsers;
window.changeClubs = changeClubs;
window.changeQuery = changeQuery;
