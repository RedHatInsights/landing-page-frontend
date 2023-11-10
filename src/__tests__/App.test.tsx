import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { render } from '@testing-library/react';

jest.mock('../routes/Landing', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name
  default: () => <span>Landing</span>,
}));

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => {
  const actual = jest.requireActual(
    '@redhat-cloud-services/frontend-components/useChrome'
  );
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    ...actual,
    default: () => ({
      auth: {
        getUser: () =>
          Promise.resolve({
            identity: {
              user: {
                is_org_admin: true,
              },
            },
          }),
      },
    }),
  };
});

describe('App component', () => {
  it('should render correctly', async () => {
    let container: HTMLElement | undefined = undefined;
    await act(async () => {
      const { container: ci } = await render(
        <Router>
          <App />
        </Router>
      );
      expect(ci).toMatchSnapshot();
      container = ci;
    });
    expect(container).toMatchSnapshot();
  });
});
