import { useFlag } from '@unleash/proxy-client-react';
import React, { Fragment } from 'react';
import { ScalprumComponent } from '@scalprum/react-core';

import './virtual-assistant.scss';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

function VirtualAssistant() {
  const chrome = useChrome();
  const showVirtualAssistant = useFlag(
    chrome.isBeta()
      ? 'platform.landing-page.virtual-assistant.preview'
      : 'platform.landing-page.virtual-assistant.stable'
  );

  // Disable if the feature flag is off
  if (!showVirtualAssistant) {
    return null;
  }

  return (
    <div className="virtualAssistant astro__landing-page pf-v5-u-mr-xs">
      <ScalprumComponent
        scope="virtualAssistant"
        module="./AstroVirtualAssistant"
        fallback={null}
        ErrorComponent={<Fragment />}
      />
    </div>
  );
}

export default VirtualAssistant;
