import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  ProcessAutomationIcon,
  QuestionCircleIcon,
  SecurityIcon,
} from '@patternfly/react-icons';
import {
  Button,
  Flex,
  FlexItem,
  GridItem,
  Title,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import useRequest from './use-request';

const NoIcon = () => <span>No icon</span>;

const groupIconMapper = {
  automation: ProcessAutomationIcon,
  exclamationTriangle: ExclamationTriangleIcon,
  exclamationCircle: ExclamationCircleIcon,
  infoCircle: InfoCircleIcon,
  checkCircle: CheckCircleIcon,
  security: SecurityIcon,
  unknown: QuestionCircleIcon,
  default: NoIcon,
};

const RecommendationGroup = (recommendation) => {
  const intl = useIntl();
  const [{ count, response, show }] = useRequest(recommendation);

  const text = (message) =>
    typeof message === 'object'
      ? intl.formatMessage(message, { count, response })
      : message;

  const GroupIcon = groupIconMapper[recommendation.icon] || NoIcon;

  if (!show) {
    return null;
  }

  if (recommendation.component === 'title') {
    return (
      <Title headingLevel="h2" size="md">
        {recommendation.title}
      </Title>
    );
  }
  return (
    <React.Fragment>
      <Flex flexWrap={{ default: 'nowrap' }} className="whole-row">
        <FlexItem>
          <GroupIcon
            className={classnames({
              error: recommendation.state === 'error',
              warning: recommendation.state === 'warning',
              info: recommendation.state === 'info',
              green: recommendation.state === 'success',
            })}
          />
        </FlexItem>
        <FlexItem>
          <TextContent>
            {recommendation.title && (
              <Text component="h5">{text(recommendation.title)}</Text>
            )}
            <Text>{text(recommendation.description)}</Text>
          </TextContent>
        </FlexItem>
      </Flex>
      <Button
        component="a"
        className="recommendation-button"
        href={recommendation.action.href}
        variant="secondary"
        isSmall
      >
        {text(recommendation.action.title)}
      </Button>
    </React.Fragment>
  );
};

RecommendationGroup.propTypes = {
  icon: PropTypes.string,
  state: PropTypes.oneOf(['error', 'warning', 'info']),
  description: PropTypes.string,
  action: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  component: PropTypes.string,
  title: PropTypes.string,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.string.isRequired,
      args: PropTypes.array,
    })
  ),
  url: PropTypes.string,
  condition: PropTypes.shape({
    when: PropTypes.string,
    is: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  accessor: PropTypes.string,
  method: PropTypes.oneOf(['get', 'post']),
};

RecommendationGroup.defaultProps = {
  icon: 'default',
  method: 'get',
};

const RecommendationSection = ({ groups, title }) => (
  <React.Fragment>
    <Title headingLevel="h1" className="pf-u-mb-md">
      {title}
    </Title>
    <div className="custom-grid">
      {groups.map((group, index) => (
        <RecommendationGroup key={group.id || index} {...group} />
      ))}
    </div>
  </React.Fragment>
);

RecommendationSection.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
};

RecommendationSection.defaultProps = {
  groups: [],
};

const RecommendationTile = ({ groups, sections, countOfReccomentations }) => (
  <GridItem md={12} lg={countOfReccomentations > 2 ? 4 : 12} xs={12}>
    {groups.map((group, index) => (
      <RecommendationGroup key={group.id || index} {...group} />
    ))}
    {sections.map((section, index) => (
      <RecommendationSection key={section.id || index} {...section} />
    ))}
  </GridItem>
);
RecommendationTile.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
  sections: PropTypes.arrayOf(PropTypes.shape(RecommendationSection.propTypes)),
  countOfReccomentations: PropTypes.number.isRequired,
};

RecommendationTile.defaultProps = {
  groups: [],
  sections: [],
};

export default RecommendationTile;
