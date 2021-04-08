import React, { useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
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

const RecommendationGroup = (recommendation) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [{ count, response, show }] = useRequest(recommendation);

  useEffect(() => {
    if (show === false) {
      dispatch(
        removeRecommendationTile(recommendation.id, recommendation.recId)
      );
    }
  }, [show]);
  const text = (message) =>
    typeof message === 'object'
      ? intl.formatMessage(message, { count, response })
      : message;

  const GroupIcon = iconMapper[recommendation.icon] || QuestionCircleIcon;

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
      <Flex direction={{ default: 'column' }} className="recommendation-test">
        <Flex>
          <Title headingLevel="h3" className="pf-u-mb-md">
            Section title here
          </Title>
        </Flex>
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
              {recommendation.title && (
                <Text>{text(recommendation.title)}</Text>
              )}
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
    </React.Fragment>
  );
};

RecommendationGroup.propTypes = {
  icon: PropTypes.string,
  state: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  recId: PropTypes.string,
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
};

RecommendationGroup.defaultProps = {
  icon: 'default',
  method: 'get',
};

const RecommendationSection = ({ groups, title, recId }) =>
  groups.length === 0 ? null : (
    <React.Fragment>
      <Title headingLevel="h3" className="pf-u-mb-md">
        {title}
      </Title>
      {groups.map((group, index) => (
        <RecommendationGroup recId={recId} key={group.id || index} {...group} />
      ))}
    </React.Fragment>
  );

RecommendationSection.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
  recId: PropTypes.string,
};

RecommendationSection.defaultProps = {
  groups: [],
};

const RecommendationTile = ({ groups, sections, id }) => (
  <span>
    {groups.map((group, index) => (
      <RecommendationGroup recId={id} key={group.id || index} {...group} />
    ))}
    {sections.map((section, index) => (
      <RecommendationSection
        recId={id}
        key={section.id || index}
        {...section}
      />
    ))}
  </span>
);
RecommendationTile.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape(RecommendationGroup.propTypes)),
  sections: PropTypes.arrayOf(PropTypes.shape(RecommendationSection.propTypes)),
  countOfReccomentations: PropTypes.number.isRequired,
  id: string.isRequired,
};

RecommendationTile.defaultProps = {
  groups: [],
  sections: [],
};

export default RecommendationTile;
