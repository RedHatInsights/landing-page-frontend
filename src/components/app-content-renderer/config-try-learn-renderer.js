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
    <Card className="land-c-ctl-card pf-u-m-lg" isFlat>
      <CardBody className="land-c-ctl-card__body pf-u-pb-0">
        {sections.map((section, index) => (
          <ConfigTryLearnTile
            isExpanded={isExpanded}
            key={section.id}
            sectionName={columns[index]}
            column={`land-c-grid__${columns[index]}`}
            {...section}
          />
        ))}
      </CardBody>
      <CardFooter className="land-c-ctl-card__footer">
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
