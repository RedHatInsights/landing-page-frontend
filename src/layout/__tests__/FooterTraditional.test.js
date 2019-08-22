import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FooterTraditional from '../FooterTraditional';

describe('Footer Traditional component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FooterTraditional />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Link: Red Hat Logo is correct', () => {
        const wrapper = mount(<FooterTraditional/>);
        const logo = wrapper.find('.ins-p-footer__logo');
        expect(logo.getDOMNode().getAttribute('target')).toBe('_blank');
        expect(logo.getDOMNode().getAttribute('href')).toBe('https://www.redhat.com');
    });
});
