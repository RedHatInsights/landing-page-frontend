import configTryLearnRenderer from '../../components/app-content-renderer/config-try-learn-renderer';
import { useSelector } from 'react-redux';

const Footer = () => {
  const configTryLearn = useSelector(
    ({ contentStore: { configTryLearn } }) => configTryLearn
  );
  return configTryLearnRenderer(configTryLearn);
};

export default Footer;
