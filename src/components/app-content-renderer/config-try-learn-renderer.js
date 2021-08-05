import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfigTryLearnTile from './config-try-learn-tile';
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardFooter,
} from '@patternfly/react-core';

const columns = ['config', 'try', 'learn'];

const ConfigTryLearnRenderer = ({ sections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="ins-c-ctl-card pf-u-m-lg" isFlat>
      <CardBody className="ins-c-ctl-card__body">
        {sections.map((section, index) => (
          <ConfigTryLearnTile
            isExpanded={isExpanded}
            key={section.id}
            sectionName={columns[index]}
            column={`ins-c-grid__${columns[index]}`}
            {...section}
          />
        ))}
      </CardBody>
      <CardFooter>
        <Bullseye>
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            variant="tertiary"
          >
            {isExpanded ? 'See less' : 'See more'}
          </Button>
        </Bullseye>
      </CardFooter>
    </Card>
  );
};

ConfigTryLearnRenderer.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ).isRequired,
};

export default ConfigTryLearnRenderer;
