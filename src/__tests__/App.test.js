/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import App from '../components/App';
import BounceClient from '../api';

/* eslint-enable no-unused-vars */



it('renders without crashing', () => {
    const div = document.createElement('div');
    const client = new BounceClient('http://localhost:8080');
    ReactDOM.render(
        <Provider store={store}>
            <App client={client}/>
        </Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
