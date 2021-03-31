import React, { useEffect, useReducer } from 'react';
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
import get from 'lodash/get';
import { permissionProcessor } from '../../contentApi/request-processor';
import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors';

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

const reducer = (state, payload) => ({ ...state, ...payload });

const calculateCondition = (data, condition) => {
  const value = get(data, condition.when);

  return value === condition.is;
};

const RecommendationGroup = ({
  component,
  title,
  icon,
  state,
  description,
  action,
  permissions,
  api,
  condition,
  accessor,
}) => {
  const intl = useIntl();
  const [{ count, data, show }, setState] = useReducer(reducer, {});

  const text = (message) =>
    typeof message === 'object'
      ? intl.formatMessage(message, { count, data })
      : message;

  const GroupIcon = groupIconMapper[icon] || NoIcon;

  useEffect(async () => {
    const hasPermission = await permissionProcessor(permissions);

    if (hasPermission && api) {
      try {
        const data = await instance.get(api);

        setState({
          count: get(data, accessor),
          data,
          show: condition ? calculateCondition(data, condition) : true,
        });
      } catch (e) {
        console.error(e);
      }
    } else if (hasPermission) {
      setState({
        show: true,
      });
    }
  }, []);

  if (!show) {
    return null;
  }

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
            {title && <Text component="h5">{text(title)}</Text>}
            <Text>{text(description)}</Text>
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
        {text(action.title)}
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
  api: PropTypes.string,
  condition: PropTypes.shape({
    when: PropTypes.string,
    is: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  accessor: PropTypes.string,
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
