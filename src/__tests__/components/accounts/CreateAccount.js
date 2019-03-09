/* eslint-disable no-unused-vars */
import React from 'react';
import CreateAccount from '../../../components/accounts/CreateAccount';
import { shallow, mount } from 'enzyme';


it('renders Create Account component', () => {
    shallow(<CreateAccount />);
});

it('Checks handleSubmit is called on Submit', () => {
    const mock = jest.fn();
    CreateAccount.prototype.handleSubmit = mock;

    const wrapper = mount(<CreateAccount />);

    wrapper.find('button').at(0).props().onClick();
    expect(mock).toHaveBeenCalled();
});

it('Checks that handleOnSignInClick is called on Click', () =>{
    const mock = jest.fn();
    CreateAccount.prototype.handleSignInClick = mock;

    const wrapper = mount(<CreateAccount />);

    wrapper.find('button').at(1).props().onClick();
    expect(mock).toBeCalled();
});

it('checks that handleInput is called on data input', () => {
    const mock = jest.fn();
    CreateAccount.prototype.handleInput = mock;

    const wrapper = mount(<CreateAccount />);

    wrapper.find('input').at(0).props().onChange(); 
    expect(mock).toHaveBeenCalled();
});