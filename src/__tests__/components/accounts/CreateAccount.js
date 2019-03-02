import React from 'react'
import CreateAccount from '../../../components/accounts/CreateAccount'
import { shallow } from 'enzyme'

it('renders account settings component', () => {
    shallow(<CreateAccount />);
});