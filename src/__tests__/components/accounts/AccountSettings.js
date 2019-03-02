/* eslint-disable no-unused-vars */
import React from 'react';
import AccountSettings from '../../../components/accounts/AccountSettings';
import { shallow } from 'enzyme';
import BounceClient from '../../../api';


it('renders account settings component', () => {
    let testClient = new BounceClient();
    shallow(<AccountSettings client={testClient}/>);
});