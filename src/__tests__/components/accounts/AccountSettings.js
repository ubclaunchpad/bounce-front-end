/* eslint-disable no-unused-vars */
import React from 'react';
import AccountSettings from '../../../components/accounts/AccountSettings';
import { shallow, mount } from 'enzyme';
import BounceClient from '../../../api';
import { NOT_SIGNED_IN_ERROR } from '../../../constants';


it('renders account settings component', () => {
    let testClient = new BounceClient();
    shallow(<AccountSettings client={testClient}/>);
});

it('renders Alert in account settings component', () => {
    let testClient  = new BounceClient();
    const wrapper  = mount(<AccountSettings client={testClient}/>);
    const child = wrapper.find('Alert').text();
    expect(child).toEqual(NOT_SIGNED_IN_ERROR);
});

it('renders container page in account settings component if client has token field set', () => {
    let testClient = new BounceClient();
    testClient.token = 'testToken';
    const wrapper  = mount(<AccountSettings client={testClient}/>);
    const child = wrapper.find('div.page').children().at(0).text();
    expect(child).toEqual('Account Settings');
});

it('renders container page in account settings component if client has JSON Web Token', () => {
    let testClient = new BounceClient();
    localStorage.setItem('jwt', 'testToken');
    const wrapper  = mount(<AccountSettings client={testClient}/>);
    const child = wrapper.find('div.page').children().at(0).text();
    expect(child).toEqual('Account Settings');
});