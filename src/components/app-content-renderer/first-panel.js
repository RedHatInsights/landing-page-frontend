import React from 'react';
import { Text, TextContent } from '@patternfly/react-core';
import SimpleSlider from './SimpleSlider';

function FirstPanel() {
  return (
    <>
      <div className="land-l-first-panel pf-u-px-xl pf-u-py-2xl">
        <TextContent>
          <Text component="h1" className="pf-u-color-light-100">
            Hi, Morgan.
            <br />
            Welcome to your Hybrid Cloud Console.
          </Text>
        </TextContent>
      </div>
      <SimpleSlider />
    </>
  );
}

export default FirstPanel;
