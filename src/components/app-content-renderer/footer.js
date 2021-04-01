import { useSelector } from 'react-redux';

import configTryLearnRenderer from './config-try-learn-renderer';

const Footer = () => {
  const configTryLearn = useSelector(
    ({ contentStore: { configTryLearn } }) => configTryLearn
  );
  return configTryLearnRenderer(configTryLearn);
};

export default Footer;
