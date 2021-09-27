import React from 'react';
import { useSelector } from 'react-redux';

import ConfigTryLearnRenderer from './config-try-learn-renderer';

const Footer = () => {
  const configTryLearn = useSelector(
    ({ contentStore: { configTryLearn } }) => configTryLearn
  );
  return <ConfigTryLearnRenderer sections={configTryLearn} />;
};

export default Footer;
