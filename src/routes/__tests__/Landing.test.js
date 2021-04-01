/* eslint-disable react/display-name */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Landing from '../Landing';

import * as actions from '../../store/actions';

jest.mock('../../components/app-content-renderer/first-panel', () => ({
  __esModule: true,
  default: () => <span>FirstPanel</span>,
}));

jest.mock('../../components/app-content-renderer/second-panel', () => ({
  __esModule: true,
  default: () => <span>SecondPanel</span>,
}));

jest.mock('../../components/app-content-renderer/footer', () => ({
  __esModule: true,
  default: () => <span>Footer</span>,
}));

const mockStore = configureMockStore();
const store = mockStore({});

describe('Landing component renders authenticated page', () => {
  let wrapper;

  it('should render correctly', async () => {
    jest
      .spyOn(actions, 'loadData')
      .mockImplementation(() => ({ type: 'nonsense' }));

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
