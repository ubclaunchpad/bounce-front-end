/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import BounceClient from './api';
import index from './reduxtest/index';
import store from './store/configureStore';
import {Provider} from 'react-redux';
/* eslint-enable no-unused-vars */

const client = new BounceClient('http://localhost:8080');
ReactDOM.render(
    <Provider store = {store}>
        <App client={client}/>
    </Provider>, document.getElementById('root'));
