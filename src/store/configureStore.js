import {createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import clubsReducer from '../reducers/clubsReducer.js';
/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    // Uncomment the line below to use redux dev tools
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
/* eslint-enable */
export default store;
