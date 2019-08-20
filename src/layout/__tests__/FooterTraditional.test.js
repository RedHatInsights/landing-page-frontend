import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FooterTraditional from '../FooterTraditional';

describe('Footer Traditional component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FooterTraditional />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
