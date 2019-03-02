import React from 'react'
import EmailSettings from '../../../components/accounts/EmailSettings'
import { shallow } from 'enzyme'

it('renders account settings component', () => {
    shallow(<EmailSettings />);
});