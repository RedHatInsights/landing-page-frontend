import React from 'react';
import { shallow, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import FooterTraditional from '../FooterTraditional';

describe('Footer Traditional component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FooterTraditional />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click: Red Hat Logo', () => {
        const wrapper = shallow(<FooterTraditional/>);
        wrapper.find('.ins-p-footer__logo').simulate('click');
    })
});
