import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RhLogo from '../rh-logo';

describe('RH Logo component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RhLogo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
