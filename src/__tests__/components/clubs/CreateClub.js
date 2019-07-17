/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow } from 'enzyme';
import CreateClub from '../../../components/clubs/CreateClub';
import BounceClient from '../../../api';
/* eslint-disable no-unused-vars */

it('renders Create club component', () => {
    let testClient = new BounceClient();

    shallow(<CreateClub client={testClient}/>);
});