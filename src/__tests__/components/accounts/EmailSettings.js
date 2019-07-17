/* eslint-disable no-unused-vars */
import React from 'react';
import EmailSettings from '../../../components/accounts/EmailSettings';
import { shallow, mount } from 'enzyme';


it('renders Email settings component', () => {
    shallow(<EmailSettings />);
});

it('EmailChangeSubmit handler gets called on submit', () => {
    let mockfn = jest.fn();
    EmailSettings.prototype.handleEmailChangeSubmit = mockfn;

    const wrapper = mount(<EmailSettings />);

    wrapper.find('form').props().onSubmit();
    expect(mockfn).toBeCalled();
});
