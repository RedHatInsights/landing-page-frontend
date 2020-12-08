import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon404 from '../icon-404';

describe('404 component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Icon404 />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
