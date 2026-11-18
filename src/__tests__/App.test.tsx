import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { vi } from 'vitest';

vi.mock('../features/landing/Landing', () => ({
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
  it('renders the Landing composition through the Suspense boundary', async () => {
    let queries: ReturnType<typeof render> | undefined;
    await act(async () => {
      queries = render(
        <IntlProvider locale="en">
          <Router>
            <App />
          </Router>
        </IntlProvider>,
      );
    });

    // Landing is mocked above — this asserts App resolves past its Suspense
    // fallback and renders its child rather than getting stuck on the spinner.
    // getByText throws when absent, so reaching the assertion is the signal.
    expect(queries!.getByText('Landing')).toBeTruthy();
  });
});
