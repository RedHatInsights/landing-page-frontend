import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import { useSelector } from 'react-redux';
import InsightsTile from './recommendations/insights-tile';

import RecommendationsTile from './recommendations/recommendations-tile';

const RecommendationsPanel = () => {
  const recommendations = useSelector(
    ({ contentStore: { recommendations } }) => recommendations
  );

  const { recs, ...insights } = recommendations;

  return (
    <Grid
      hasGutter
      className="ins-l-second--panel-wrapper pf-u-mx-lg pf-u-mt-lg"
    >
      <GridItem sm={12} md={6}>
        <InsightsTile {...insights} />
      </GridItem>
      <GridItem sm={12} md={6}>
        <RecommendationsTile {...recs} />
      </GridItem>
    </Grid>
  );
};

export default RecommendationsPanel;
