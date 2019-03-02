import React from 'react'
import { shallow } from 'enzyme'
import CreateClub from '../../../components/clubs/CreateClub';
import BounceClient from '../../../api';

it('renders account settings component', () => {
    let testClient = new BounceClient();

    shallow(<CreateClub client={testClient}/>);
});