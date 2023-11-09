/* eslint-disable react/prop-types */
import React from 'react';
import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScalprumProvider } from '@scalprum/react-core';
import Landing from '../Landing';
import FlagProvider, { UnleashClient } from '@unleash/proxy-client-react';

const LandingWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const unleashClient = React.useMemo(
    () =>
      new UnleashClient({
        url: `${document.location.origin}/api/featureflags/v0`,
        clientKey: 'proxy-123',
        appName: 'web',
        fetch: () =>
          Promise.resolve({
            status: 200,
            body: {
              toggles: [],
            },
          }),
      }),
    []
  );
  return (
    <ScalprumProvider
      config={{}}
      api={{
        chrome: {
          getEnvironment: () => '',
          isProd: () => false,
          isBeta: () => false,
        },
      }}
    >
      <FlagProvider unleashClient={unleashClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </FlagProvider>
    </ScalprumProvider>
  );
};

describe('<Landing/>', () => {
  test('should render correctly', async () => {
    let container;
    await act(async () => {
      const { container: c } = render(
        <LandingWrapper>
          <Landing />
        </LandingWrapper>
      );
      container = c;
    });
    expect(container).toMatchSnapshot();
  });
});
