import {
  HistoryIcon,
  LightbulbIcon,
  ListIcon,
  InfoCircleIcon,
  CheckCircleIcon,
  QuestionCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CogIcon,
  PlayIcon,
  DownloadIcon,
} from '@patternfly/react-icons';
import IconAnsible from '../components/icon-ansible';
import IconInsights from '../components/icon-insights';

const iconMapper = {
  insights: IconInsights,
  ansible: IconAnsible,
  lightbulb: LightbulbIcon,
  error: ExclamationCircleIcon,
  info: InfoCircleIcon,
  warning: ExclamationTriangleIcon,
  success: CheckCircleIcon,
  list: ListIcon,
  history: HistoryIcon,
  cog: CogIcon,
  play: PlayIcon,
  unknown: QuestionCircleIcon,
  download: DownloadIcon,
};

export default iconMapper;
