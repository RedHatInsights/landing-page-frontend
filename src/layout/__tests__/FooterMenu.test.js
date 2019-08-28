import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FooterMenu from '../FooterMenu';

describe('Footer Menu component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FooterMenu />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
