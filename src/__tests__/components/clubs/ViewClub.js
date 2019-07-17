/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow } from 'enzyme';
import ViewClub from '../../../components/clubs/ViewClub';
import BounceClient from '../../../api';
/* eslint-disable no-unused-vars */


it('renders View club component', () => {
    let testClient = new BounceClient();
    shallow(<ViewClub client={testClient}/>);
});