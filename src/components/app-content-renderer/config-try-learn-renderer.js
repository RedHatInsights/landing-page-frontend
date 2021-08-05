import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfigTryLearnTile from './config-try-learn-tile';
import { Button, Card, CardBody, Flex, FlexItem } from '@patternfly/react-core';

const columns = ['config', 'try', 'learn'];

const ConfigTryLearnRenderer = ({ sections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card isFlat className="pf-u-m-lg">
      <CardBody>
        <div className="ins-l-third--panel-wrapper  pf-u-pt-xl pf-u-pr-lg pf-u-pl-lg">
          <div className="ins-l-third--panel">
            {sections.map((section, index) => (
              <ConfigTryLearnTile
                isExpanded={isExpanded}
                key={section.id}
                sectionName={columns[index]}
                column={`ins-c-grid__${columns[index]}`}
                {...section}
              />
            ))}
          </div>
        </div>
        <Flex justifyContent={{ default: 'justifyContentCenter' }}>
          <FlexItem>
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              variant="tertiary"
            >
              {isExpanded ? 'See less' : 'See more'}
            </Button>
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
};

ConfigTryLearnRenderer.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ).isRequired,
};

export default ConfigTryLearnRenderer;
