import { useFlag } from '@unleash/proxy-client-react';
import React from 'react';
import { ScalprumComponent } from '@scalprum/react-core';

import './virtual-assistant.scss';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

function VirtualAssistant() {
  const showVirtualAssistant = useFlag(
    'platform.landing-page.virtual-assistant'
  );
  const chrome = useChrome();

  // Disable it for prod, any stable environment or if the feature flag is off
  if (chrome.isProd() || !chrome.isBeta || !showVirtualAssistant) {
    return null;
  }

  return (
    <div className="virtualAssistant astro__landing-page">
      <ScalprumComponent
        scope="virtualAssistant"
        module="./AstroVirtualAssistant"
        fallback={null}
      />
    </div>
  );
}

export default VirtualAssistant;
