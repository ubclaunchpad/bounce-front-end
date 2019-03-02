import React from 'react'
import { shallow } from 'enzyme'
import Cards from '../../../components/util/Cards';

it('renders account settings component', () => {
    let clubs = []
    shallow(<Cards items={clubs}/>);
});