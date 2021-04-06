import React from 'react';
import { Grid, GridItem } from '@patternfly/react-core';

import ConfigTryLearnTile from './config-try-learn-tile';

const configTryLearnRenderer = (sections) => (
  <div className="third-panel">
    <Grid hasGutter className="pf-u-pt-xl pf-u-pr-lg pf-u-pl-lg">
      {sections.map((section) => (
        <GridItem xl={4} lg={12} key={section.id}>
          <ConfigTryLearnTile {...section} />
        </GridItem>
      ))}
    </Grid>
  </div>
);

export default configTryLearnRenderer;
