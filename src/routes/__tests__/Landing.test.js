import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Maintenance from '../Maintenance';

import Loading from '../../layout/Loading';
import FirstPanel from '../../components/app-content-renderer/first-panel';
import SecondPanel from '../../components/app-content-renderer/second-panel';


test('expect SecondPanel to render children', () => {
  const children = <span>SecondPanel</span>;

  render(<SecondPanel>{children}</SecondPanel>);
  expect(wrapper.find(SecondtPanel)).toHaveLength(1);
});

    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(SecondPanel)).toHaveLength(1);