import React from 'react';
import { Grid } from '@patternfly/react-core';
import recommendationRenderer from '../../components/app-content-renderer/recommendation-renderer';
import { useSelector } from 'react-redux';

const SecondPanel = () => {
  const recommendations = useSelector(
    ({ contentStore: { recommendations } }) => recommendations
  );

  return (
    <Grid className="pf-u-p-lg pf-u-pt-xl pf-u-pb-xl second-panel" hasGutter>
      {recommendationRenderer(recommendations)}
    </Grid>
  );
};

export default SecondPanel;
