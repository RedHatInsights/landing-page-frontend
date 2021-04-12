import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFound from '../404';

describe('404 page', () => {
  it('should render correctly', () => {
    const wrapper = mount(<NotFound />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('click: Return to homepage', () => {
    const wrapper = mount(<NotFound />);
    wrapper.find('a').simulate('click');
    expect(window.location.pathname).toBe('/');
  });
});
