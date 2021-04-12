import React from 'react';
import ConfigTryLearnTile from './config-try-learn-tile';

const columns = ['config', 'try', 'learn'];

const configTryLearnRenderer = (sections) => (
  <div className="ins-c-third--panel-wrapper  pf-u-pt-xl pf-u-pr-lg pf-u-pl-lg">
    <div className="ins-c-third--panel">
      {sections.map((section, index) => (
        <ConfigTryLearnTile
          key={section.id}
          sectionName={columns[index]}
          column={`ins-c-grid__${columns[index]}`}
          {...section}
        />
      ))}
    </div>
  </div>
);

export default configTryLearnRenderer;
