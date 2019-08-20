import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Logout from '../Logout';

describe('Logout component', () => {
    it('should render correctly', () => {
        const wrapper = mount(<Logout />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});