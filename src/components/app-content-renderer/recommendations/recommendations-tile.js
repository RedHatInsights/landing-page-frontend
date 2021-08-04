import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Title } from '@patternfly/react-core';
import RecommendationEntry from './recommendation-entry';

const RhelTile = ({ category, items }) => {
  return (
    <Card isFlat>
      <CardBody>
        <Title headingLevel="h3" size="md" className="pf-u-mb-md">
          Recommendations
        </Title>
        {items.map((item) => (
          <RecommendationEntry key={item.id} category={category} {...item} />
        ))}
      </CardBody>
    </Card>
  );
};

RhelTile.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
    .isRequired,
};

export default RhelTile;
