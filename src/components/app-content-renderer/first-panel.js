import React from 'react';
import { PageSection } from '@patternfly/react-core';

import SimpleSlider from './SimpleSlider';

function FirstPanel() {
  return (
    <PageSection
      isFilled={false}
      className="land-l-first-panel pf-u-px-xl pf-u-pt-lg pf-u-pb-xl"
    >
      <SimpleSlider />
    </PageSection>
  );
}

export default FirstPanel;
