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
    const wrapper = mount(<FooterTraditional />);
    const logo = wrapper.find('.land-p-footer__logo');
    expect(logo.getDOMNode().getAttribute('target')).toBe('_blank');
    expect(logo.getDOMNode().getAttribute('href')).toBe(
      'https://www.redhat.com'
    );
  });

  it('Click browser support link', () => {
    const wrapper = mount(<FooterTraditional />);
    const browserSupport = wrapper
      .find('.land-p-footer__browser-support')
      .at(0);
    browserSupport.simulate('click');
    const browserSupportModal = wrapper
      .find('.land-p-browser-support .pf-c-button')
      .at(0);
    browserSupportModal.simulate('click');
  });
});
