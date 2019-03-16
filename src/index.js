/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import BounceClient from './api';
import index from './reduxtest/index';
/* eslint-enable no-unused-vars */

const client = new BounceClient('http://localhost:8080');
ReactDOM.render(<App client={client}/>, document.getElementById('root'));
