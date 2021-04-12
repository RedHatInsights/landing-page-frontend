import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App';

const mockStore = configureMockStore();
const store = mockStore({});

jest.mock('../routes/Landing', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name
  default: () => <span>Landing</span>,
}));

describe('App component', () => {
  it('should render correctly', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
