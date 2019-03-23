import store from '../store/configureStore';
import { addUser} from '../actions/addUser';
import { changeClubs} from '../actions/changeClubs';
import {changeQuery} from '../actions/changeQuery';


window.store = store;
window.addUser = addUser;
window.changeClubs = changeClubs;
window.changeQuery = changeQuery;
