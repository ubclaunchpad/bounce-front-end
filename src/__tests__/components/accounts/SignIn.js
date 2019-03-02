import React from 'react'
import SignIn from '../../../components/accounts/SignIn'
import { shallow } from 'enzyme'


it('renders account settings component', () => {
    shallow(<SignIn />);
});