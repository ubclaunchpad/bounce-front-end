import store from '../store/configureStore';
import { addUsers} from '../actions/addUser';
import { changeClub} from '../actions/changeClub';
import {changeQuery} from '../actions/changeQuery';


window.store = store;
window.addUsers = addUsers;
window.changeClub = changeClub;
window.changeQuery = changeQuery;
