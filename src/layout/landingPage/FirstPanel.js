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
            section="Application Services"
            count="149"
            title="API Objects"
          />
          <FirstPanelTile count="331" title="ODH Projects" />
          <FirstPanelTile
            section="Platforms"
            count="12,302"
            title="RHEL Systems"
          />
          <FirstPanelTile count="8" title="OpenShift Clusters" />
          <FirstPanelTile
            section="Automation"
            count="4"
            title="Tower Clusters"
          />
          <FirstPanelTile count="" title="" />
        </Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
