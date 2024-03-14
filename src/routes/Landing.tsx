import React, { Fragment } from 'react';
import { useFlag } from '@unleash/proxy-client-react';

import '../components/app-content-renderer/styles/panels.scss';

import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';
import VirtualAssistant from '../components/app-content-renderer/virtual-assistant';
import { useLoadModule } from '@scalprum/react-core';
import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page';

const getWidgetLayoutLandingPage = () => {
  const scope = 'frontendStarterApp';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ default: GridLayout }] = useLoadModule(
    { scope, module: './WidgetLayout' },
    {}
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ default: AddWidgetDrawer }] = useLoadModule(
    { scope, module: './WidgetDrawer' },
    {}
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ default: Header }] = useLoadModule(
    { scope, module: './WidgetHeader' },
    {}
  );
  if (!GridLayout || !AddWidgetDrawer || !Header) {
    return <></>;
  }
  return (
    <>
      <Header />
      <AddWidgetDrawer dismissible={false}>
        <PageSection>
          <GridLayout isLayoutLocked={false} />
        </PageSection>
      </AddWidgetDrawer>
    </>
  );
};

const Landing = () => {
  const widgetLayoutLandingPageEnabled = useFlag(
    'platform.landing-page.widgetization'
  );
  return (
    <div className="land-c-page-content pf-v5-u-display-flex pf-v5-u-flex-direction-column">
      <Fragment>
        <VirtualAssistant />
        {widgetLayoutLandingPageEnabled ? null : <FirstPanel />}
        {widgetLayoutLandingPageEnabled ? null : <SecondPanel />}
        {widgetLayoutLandingPageEnabled ? getWidgetLayoutLandingPage() : null}
      </Fragment>
    </div>
  );
};

export default Landing;
