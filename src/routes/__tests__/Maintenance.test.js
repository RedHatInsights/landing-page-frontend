import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Maintenance from '../Maintenance';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Maintenance page', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Maintenance />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Maintenance: go home', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Maintenance />
      </Provider>
    );
    wrapper.find('a').at(1).simulate('click');
    expect(window.location.pathname).toBe('/');
  });
});
