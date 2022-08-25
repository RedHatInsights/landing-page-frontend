import React from 'react';
import { PageSection, Text, TextContent } from '@patternfly/react-core';

import SimpleSlider from './SimpleSlider';
import useCurrentUser from '../useCurrentUser';

function FirstPanel() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <PageSection
        isFilled={false}
        className="land-l-first-panel pf-u-px-xl pf-u-py-2xl"
      >
        <TextContent>
          <Text component="h1" className="pf-u-pb-md pf-u-color-light-100">
            Hi, {currentUser.username}.
            <br />
            Welcome to your Hybrid Cloud Console.
          </Text>
        </TextContent>
        <SimpleSlider />
      </PageSection>
    </>
  );
}

export default FirstPanel;
