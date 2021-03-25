import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import ConfigTryLearnTile from './config-try-learn-tile';

const configTryLearnRenderer = (sections) => (
  <Grid hasGutter className="third-level pf-u-pt-xl pf-u-pr-lg pf-u-pl-lg">
    {sections.map((section) => (
      <GridItem xl={4} lg={12} key={section.id}>
        <ConfigTryLearnTile {...section} />
      </GridItem>
    ))}
  </Grid>
);

export default configTryLearnRenderer;
