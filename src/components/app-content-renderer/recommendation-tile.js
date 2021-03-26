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
      <Title headingLevel="h2" size="md">
        {title}
      </Title>
    );
  }
  return (
    <React.Fragment>
      <Flex flexWrap={{ default: 'nowrap' }} className="whole-row">
        <FlexItem>
          <GroupIcon
            className={classnames({
              error: state === 'error',
              warning: state === 'warning',
              info: state === 'info',
              green: state === 'success',
            })}
          />
        </FlexItem>
        <FlexItem>
          <TextContent>
            {title && <Text component="h5">{title}</Text>}
            <Text>{description}</Text>
          </TextContent>
        </FlexItem>
      </Flex>
      <Button
        component="a"
        className="recommendation-button"
        href={action.href}
        variant="secondary"
        isSmall
      >
        {action.title}
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
};

RecommendationGroup.defaultProps = {
  icon: 'default',
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
