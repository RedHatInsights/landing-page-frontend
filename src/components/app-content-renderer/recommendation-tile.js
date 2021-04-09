import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import {
  Button,
  Flex,
  FlexItem,
  Title,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';

import useRequest from './use-request';
import iconMapper from '../../utils/icon-mapper';
import { useDispatch } from 'react-redux';
import { removeRecommendationTile } from '../../store/actions';

const RecommendationGroup = ({
  sectionTitle,
  showSectionTitle,
  ...recommendation
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const removeTile = ({ show }) =>
    show === false &&
    dispatch(
      removeRecommendationTile(recommendation.id, recommendation.category)
    );
  const [{ count, response }] = useRequest(recommendation, removeTile, () =>
    removeTile({ show: false })
  );

  const text = (message) =>
    typeof message === 'object'
      ? intl.formatMessage(message, { count, response })
      : message;

  const GroupIcon = iconMapper[recommendation.icon] || QuestionCircleIcon;

  return (
    <Flex direction={{ default: 'column' }} className="recommendation-test">
      {showSectionTitle && (
        <Title headingLevel="h3" size="lg">
          {sectionTitle}
        </Title>
      )}
      <Flex direction={{ default: 'row' }} className="recommendation-group">
        <FlexItem className="recommendation-icon">
          <GroupIcon
            className={classnames({
              error: recommendation.state === 'error',
              warning: recommendation.state === 'warning',
              info: recommendation.state === 'info',
              green: recommendation.state === 'success',
              gray: typeof recommendation.state === 'undefined',
            })}
          />
        </FlexItem>
        <FlexItem grow={{ default: 'grow' }}>
          <TextContent>
            {recommendation.title && <Text>{text(recommendation.title)}</Text>}
            <Text>{text(recommendation.description)}</Text>
          </TextContent>
        </FlexItem>
        <FlexItem>
          <Button
            component="a"
            href={recommendation.action.href}
            variant="secondary"
            isSmall
          >
            {text(recommendation.action.title)}
          </Button>
        </FlexItem>
      </Flex>
    </Flex>
  );
};

RecommendationGroup.propTypes = {
  icon: PropTypes.string,
  state: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  category: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]),
  action: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  component: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]),
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
  sectionTitle: PropTypes.string.isRequired,
  showSectionTitle: PropTypes.bool.isRequired,
};

RecommendationGroup.defaultProps = {
  icon: 'default',
  method: 'get',
};

const RecommendationTile = ({ items, title, id }) =>
  items.length > 0 ? (
    <span>
      {items.map((group, index) => (
        <RecommendationGroup
          sectionTitle={title}
          showSectionTitle={index === 0}
          category={id}
          key={group.id || index}
          {...group}
        />
      ))}
    </span>
  ) : null;

const groupSchemaPropShape = (({
  category,
  sectionTitle,
  showSectionTitle,
  ...types
}) => types)(RecommendationGroup.propTypes);
RecommendationTile.propTypes = {
  title: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(groupSchemaPropShape)),
  countOfReccomentations: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

RecommendationTile.defaultProps = {
  items: [],
};

export default RecommendationTile;
