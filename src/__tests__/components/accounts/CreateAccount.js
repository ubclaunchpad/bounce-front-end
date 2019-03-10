/* eslint-disable no-unused-vars */
import React from 'react';
import CreateAccount from '../../../components/accounts/CreateAccount';
import { shallow, mount } from 'enzyme';

it('renders Create Account component', () => {
    shallow(<CreateAccount />);
});

it('Checks handleSubmit is called on Submit', () => {
    const event = {
        preventDefault() {}
    };

    const wrapper = shallow(<CreateAccount />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('Button').at(0).simulate('click', event);
    expect(spy).toHaveBeenCalled();
});

it('Checks that handleSignInClick is hooked to button onClick handler', () =>{
    const event = {
        preventDefault() {}
    };

    const wrapper = shallow(<CreateAccount />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSignInClick');
    wrapper.instance().forceUpdate();
    wrapper.find('Button').at(1).simulate('click', event);
    expect(spy).toHaveBeenCalled();
});

it('checks that handleInput function is properly hooked up to onChange handler', () => {
    const event = {
        preventDefault() {},
        target: { name: 'username', 
            value: 'BingoBongo'}
    };

    const wrapper = shallow(<CreateAccount />);
    const spy = jest.spyOn(wrapper.instance(), 'handleInput');
    wrapper.instance().forceUpdate();
    wrapper.find('input').at(0).simulate('change', event); 
    expect(spy).toHaveBeenCalled();
});

it('checks that the handleInput function updates the state correctly', () => {
    let event = {
        preventDefault() {},
        target: { name: 'username', 
            value: 'BingoBongo'}
    };
    const wrapper = mount(<CreateAccount />);
    const instance = wrapper.instance();
    instance.handleInput(event);
    expect(wrapper.state('usernameIsValid')).toBe(true);


    event = {
        preventDefault() {},
        target: { name: 'password', 
            value: 'BingoBongo11!'}
    }; 
    instance.handleInput(event);
    expect(wrapper.state('passwordIsValid')).toBe(true);

    event = {
        preventDefault() {},
        target: { name: 'email', 
            value: 'Bingo@Bongo.com'}
    }; 
    instance.handleInput(event);
    expect(wrapper.state('emailIsValid')).toBe(true);
});
