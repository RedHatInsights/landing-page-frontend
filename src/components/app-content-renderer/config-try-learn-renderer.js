import React from 'react';
import ConfigTryLearnTile from './config-try-learn-tile';

const columns = ['config', 'try', 'learn'];

const configTryLearnRenderer = (sections) => (
  <div className="ins-c-third--panel pf-u-pt-xl pf-u-pr-lg pf-u-pl-lg">
    {sections.map((section, index) => (
      <ConfigTryLearnTile
        key={section.id}
        column={`ins-c-grid__${columns[index]}`}
        {...section}
      />
    ))}
  </div>
);

export default configTryLearnRenderer;
