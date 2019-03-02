import React from 'react'
import { shallow } from 'enzyme'
import SettingsSidebar from '../../../components/accounts/SettingsSidebar';

it('renders account settings component', () => {
    shallow(<SettingsSidebar />);
});