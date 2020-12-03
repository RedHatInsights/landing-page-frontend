import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import NotFound from '../NotFound';

const mockStore = configureMockStore();
const store = mockStore({});

describe('NotFound component', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NotFound />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with data', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NotFound technologies={{ foo: 'bar' }} />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
