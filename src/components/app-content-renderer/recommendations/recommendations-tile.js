import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Text } from '@patternfly/react-core';
import RecommendationEntry from './recommendation-entry';

const RhelTile = ({ category, items = [] }) => {
  return (
    <Card className="land-c-recommendations-card" isFlat>
      <CardHeader className="land-c-recommendations-card__header">
        <Text component="p">Recommendations</Text>
      </CardHeader>
      <CardBody className="land-c-recommendations-card__body">
        {items.map((item) => (
          <RecommendationEntry key={item.id} category={category} {...item} />
        ))}
      </CardBody>
    </Card>
  );
};

RhelTile.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ),
};

export default RhelTile;
