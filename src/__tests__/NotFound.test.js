import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFound from '../NotFound';

describe('NotFound component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<NotFound />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
