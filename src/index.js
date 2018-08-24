/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import BounceClient from './api';
import EditAccountMainPage from './components/edit_account/EditAccountMainPage';
/* eslint-enable no-unused-vars */

const client = new BounceClient('http://localhost:8080');
// ReactDOM.render(<App client={client}/>, document.getElementById('root'));
ReactDOM.render(<EditAccountMainPage/>, document.getElementById('root'));
