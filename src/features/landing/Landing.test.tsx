import React from 'react';
import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScalprumProvider } from '@scalprum/react-core';
import Landing from './Landing';
import FlagProvider, { UnleashClient } from '@unleash/proxy-client-react';

import { vi } from 'vitest';
vi.mock('@scalprum/react-core', async () => {
  const actual = await vi.importActual('@scalprum/react-core');
  return {
    ...actual,
    // Landing is a thin Scalprum mount: stub the remote loader so the unit
    // test exercises Landing's own prop wiring, not scalprum internals.
    ScalprumComponent: (props: Record<string, unknown>) => (
      <div
        data-testid="scalprum-stub"
        data-scope={props.scope as string}
        data-module={props.module as string}
      />
    ),
  };
});

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
    [],
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
  test('mounts the widgetLayout remote', async () => {
    let queries: ReturnType<typeof render> | undefined;
    await act(async () => {
      queries = render(
        <LandingWrapper>
          <Landing />
        </LandingWrapper>,
      );
    });

    // Landing's entire job is pointing Scalprum at the right remote module.
    // If either of these drifts, the dashboard renders nothing in the console.
    const stub = queries!.getByTestId('scalprum-stub');
    expect(stub.getAttribute('data-scope')).toBe('widgetLayout');
    expect(stub.getAttribute('data-module')).toBe('./WidgetLayout');
  });
});
