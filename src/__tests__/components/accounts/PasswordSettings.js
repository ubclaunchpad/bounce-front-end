import React from 'react'
import { shallow } from 'enzyme'
import PasswordSettings from '../../../components/accounts/PasswordSettings';

it('renders account settings component', () => {
    shallow(<PasswordSettings />);
});