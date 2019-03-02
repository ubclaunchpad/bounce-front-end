import React from 'react'
import { shallow } from 'enzyme'
import ViewClub from '../../../components/clubs/ViewClub';
import BounceClient from '../../../api';

it('renders account settings component', () => {
    let testClient = new BounceClient();
    shallow(<ViewClub client={testClient}/>);
});