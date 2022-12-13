/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ScalprumProvider } from '@scalprum/react-core';
import Landing from '../Landing';

const mockStore = configureStore();
const store = mockStore({});
const LandingWrapper = ({ store, children }) => (
  <ScalprumProvider
    api={{
      chrome: {
        getEnvironment: () => '',
        isProd: () => false,
        isBeta: () => false,
      },
    }}
  >
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  </ScalprumProvider>
);

describe('<Landing/>', () => {
  test('should render correctly', () => {
    const { container } = render(
      <LandingWrapper store={store}>
        <Landing />
      </LandingWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
