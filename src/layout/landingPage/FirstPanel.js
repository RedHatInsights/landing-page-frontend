import React from 'react';
import FirstPanelTile from './FirstPanelTile';
import { Flex } from '@patternfly/react-core';
import './styles/Panels.scss';

const FirstPanel = () => {
  return (
    <>
      <Flex className="first-level">
        <Flex className="level-wrapper">
          <FirstPanelTile
            section="Application services"
            count="149"
            title="API objects"
          />
          <FirstPanelTile count="30" title="Kafka instances" />
          <FirstPanelTile count="331" title="ODH projects" />
          <FirstPanelTile
            section="Platforms"
            count="12,302"
            title="RHEL systems"
            variant="danger"
            labelText="Needs Attention"
          />
          <FirstPanelTile count="8" title="OpenShift clusters" />
          <FirstPanelTile
            section="Automation"
            count="4"
            title="Tower clusters"
            variant="danger"
            labelText="Needs Attention"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
