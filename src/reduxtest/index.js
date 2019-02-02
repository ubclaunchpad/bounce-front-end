import store from '../store/configureStore';
import { addUsers } from '../actions/index';

window.store = store;
window.addUsers = addUsers;
