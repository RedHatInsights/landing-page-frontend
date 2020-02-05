import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hero from '../Hero';

describe('Hero component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Hero title='test' needsCTA className='classname'/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click: Not a customer link', () => {
        const wrapper = shallow(<Hero needsCTA/>);
        expect(wrapper.find('.ins-c-hero__new-customer').first().props().href).toBe('https://www.redhat.com/en/customers');
    });
});
