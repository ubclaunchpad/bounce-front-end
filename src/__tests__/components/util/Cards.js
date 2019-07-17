/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow } from 'enzyme';
import Cards from '../../../components/util/Cards';
/* eslint-disable no-unused-vars */


it('renders Cards component', () => {
    let clubs = [];
    shallow(<Cards items={clubs}/>);
});