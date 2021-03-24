import React from 'react';
import { Flex } from '@patternfly/react-core';
import configTryLearnRenderer from '../../components/app-content-renderer/config-try-learn-renderer';
import { useSelector } from 'react-redux';

const Footer = () => {
  const footer = useSelector(({ contentStore: { footer } }) => footer);
  return (
    <Flex className="third-level">
      <Flex className="level-wrapper">{configTryLearnRenderer(footer)}</Flex>
    </Flex>
  );
};

export default Footer;
