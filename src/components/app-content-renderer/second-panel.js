import React from 'react';
import { useSelector } from 'react-redux';

import recommendationRenderer from './recommendation-renderer';

const SecondPanel = () => {
  const recommendations = useSelector(
    ({ contentStore: { recommendations } }) => recommendations
  );

  return (
    <div className="ins-c-second-panel">
      <div className="ins-c-recommendation__container">
        {recommendationRenderer(recommendations)}
      </div>
    </div>
  );
};

export default SecondPanel;
