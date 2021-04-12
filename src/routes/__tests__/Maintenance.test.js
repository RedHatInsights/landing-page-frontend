import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Maintenance from '../Maintenance';

describe('Maintenance page', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Maintenance />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Maintenance: go home', () => {
    const wrapper = mount(<Maintenance />);
    wrapper.find('a').at(1).simulate('click');
    expect(window.location.pathname).toBe('/');
  });
});
