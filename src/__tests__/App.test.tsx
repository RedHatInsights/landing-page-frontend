import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../routes/Landing', () => ({
  __esModule: true,

  default: () => <span>Landing</span>,
}));

vi.mock('@redhat-cloud-services/frontend-components/useChrome', async () => {
  const actual = await vi.importActual(
    '@redhat-cloud-services/frontend-components/useChrome',
  );
  return {
    __esModule: true,

    ...actual,
    default: () => ({
      on: () => {},
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

vi.mock('@unleash/proxy-client-react', async () => {
  const unleash = await vi.importActual('@unleash/proxy-client-react');
  return {
    __esModule: true,
    ...unleash,
    useFlag: () => false,
    useFlagsStatus: () => ({ flagsReady: true }),
  };
});

describe('App component', () => {
  it('should render correctly', async () => {
    let container: HTMLElement | undefined = undefined;
    await act(async () => {
      const { container: ci } = await render(
        <Router>
          <App />
        </Router>,
      );
      expect(ci).toMatchSnapshot();
      container = ci;
    });
    expect(container).toMatchSnapshot();
  });
});
