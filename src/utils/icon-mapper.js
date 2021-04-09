import {
  HistoryIcon,
  LightbulbIcon,
  ListIcon,
  QuestionCircleIcon,
  ExclamationCircleIcon,
  CogIcon,
  PlayIcon,
} from '@patternfly/react-icons';
import IconAnsible from '../components/icon-ansible';
import IconInsights from '../components/icon-insights';

const iconMapper = {
  insights: IconInsights,
  ansible: IconAnsible,
  lightbulb: LightbulbIcon,
  error: ExclamationCircleIcon,
  list: ListIcon,
  history: HistoryIcon,
  cog: CogIcon,
  play: PlayIcon,
  unknown: QuestionCircleIcon,
};

export default iconMapper;
