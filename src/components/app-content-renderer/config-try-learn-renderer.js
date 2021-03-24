import React from 'react';
import ConfigTryLearnTile from './config-try-learn-tile';

const configTryLearnRenderer = (sections) =>
  sections.map((section) => (
    <ConfigTryLearnTile key={section.id} {...section} />
  ));

export default configTryLearnRenderer;
