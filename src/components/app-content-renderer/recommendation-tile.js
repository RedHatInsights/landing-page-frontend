import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  ProcessAutomationIcon,
  SecurityIcon,
} from '@patternfly/react-icons';
import { Button, Flex, FlexItem, Text, Title } from '@patternfly/react-core';

const NoIcon = () => <div>No icon</div>;

const groupIconMapper = {
  automation: ProcessAutomationIcon,
  exclamationTriangle: ExclamationTriangleIcon,
  exclamationCircle: ExclamationCircleIcon,
  infoCircle: InfoCircleIcon,
  checkCircle: CheckCircleIcon,
  security: SecurityIcon,
  // eslint-disable-next-line react/display-name
  default: () => <div>No icon</div>,
};

const RecommendationGroup = ({
  component,
  title,
  icon,
  state,
  description,
  action,
}) => {
  const GroupIcon = groupIconMapper[icon] || NoIcon;
  if (component === 'title') {
    return (
      <div>
        <Title headingLevel="h2" size="md">
          {title}
        </Title>
      </div>
    );
  }
  return (
    <FlexItem className="tile-group">
      <Flex className="tile">
        <FlexItem className="icon">
          <GroupIcon
            className={classnames({
              error: state === 'error',
              warning: state === 'warning',
              info: state === 'info',
              green: state === 'success',
            })}
          />
        </FlexItem>
        <FlexItem className="title">
          <Title headingLevel="h5" size="sm">
            {description}
          </Title>
        </FlexItem>
        <FlexItem className="button" align={{ default: 'alignRight' }}>
          <Button component="a" href={action.url} variant="secondary" isSmall>
            {action.title}
          </Button>
        </FlexItem>
      </Flex>
    </FlexItem>
  );
};

RecommendationGroup.propTypes = {
  icon: PropTypes.string.isRequired,
  state: PropTypes.oneOf(['error', 'warning', 'info']),
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  component: PropTypes.string,
  title: PropTypes.string,
};

RecommendationGroup.defaultProps = {
  icon: 'default',
};

const RecommendationSection = ({ groups, title }) => (
  <Flex className="subsection">
    <FlexItem>
      <Text component="h1" className="title">
        {title}
      </Text>
    </FlexItem>
    {groups.map((group) => (
      <RecommendationGroup key={group.id} {...group} />
    ))}
  </Flex>
);

RecommendationSection.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
};

RecommendationSection.defaultProps = {
  groups: [],
  title: '',
};

const RecommendationTile = ({ groups, sections }) => (
  <Flex className="section">
    {groups.length > 0 && (
      <Flex className="subsection">
        {groups.map((group) => (
          <RecommendationGroup key={group.id} {...group} />
        ))}
      </Flex>
    )}
    {sections.map((section) => (
      <RecommendationSection key={section.id} {...section} />
    ))}
  </Flex>
);

RecommendationTile.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
  sections: PropTypes.arrayOf(PropTypes.shape(RecommendationSection.propTypes)),
};

RecommendationTile.defaultProps = {
  groups: [],
  sections: [],
};

export default RecommendationTile;
