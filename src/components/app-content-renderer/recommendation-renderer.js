import React from 'react';
import RecommendationTile from './recommendation-tile';
const recommendationRenderer = (recommendations) => {
  return recommendations.map((rec) => (
    <RecommendationTile key={rec.id} {...rec} />
  ));
};

export default recommendationRenderer;
