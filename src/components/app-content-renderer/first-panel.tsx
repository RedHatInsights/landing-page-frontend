import React from 'react';
import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page';

import SimpleSlider from './SimpleSlider';

function FirstPanel() {
  return (
    <PageSection
      isFilled={false}
      className="land-l-first-panel pf-v5-u-px-xl pf-v5-u-pt-lg pf-v5-u-pb-xl"
    >
      <SimpleSlider />
    </PageSection>
  );
}

export default FirstPanel;
