import React from 'react';
import { Grid } from '@patternfly/react-core';
import { useSelector } from 'react-redux';

import recommendationRenderer from './recommendation-renderer';

const SecondPanel = () => {
  const recommendations = useSelector(
    ({ contentStore: { recommendations } }) => recommendations
  );

  return (
    <div className="second-panel">
      <Grid className="pf-u-p-lg pf-u-pt-xl pf-u-pb-xl" hasGutter>
        {recommendationRenderer(recommendations)}
      </Grid>
    </div>
  );
};

export default SecondPanel;
