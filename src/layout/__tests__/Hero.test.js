import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hero from '../Hero';

describe('Hero component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Hero />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click: Login button', () => {
        const wrapper = shallow(<Hero/>);
        wrapper.find('.ins-c-hero__login').simulate('click');
    });

    it('click: Not a customer link', () => {
        const wrapper = shallow(<Hero/>);
        wrapper.find('a.ins-c-hero__new-customer').simulate('click');
    });
});
