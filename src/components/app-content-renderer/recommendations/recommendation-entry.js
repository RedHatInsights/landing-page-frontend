import React from 'react';
import PropTypes from 'prop-types';
import {
  Split,
  SplitItem,
  Stack,
  StackItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import classNames from 'classnames';
import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';

import useRequest from '../use-request';
import iconMapper from '../../../utils/icon-mapper';
import { removeRecommendationTile } from '../../../store/actions';

const RecommendationEntry = (props) => {
  const { id, category, icon, description, action } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const removeTile = ({ show }) =>
    show === false && dispatch(removeRecommendationTile(id, category));
  const [{ count, response, loaded }] = useRequest(props, removeTile, () =>
    removeTile({ show: false })
  );

  const text = (message) =>
    typeof message === 'object'
      ? intl.formatMessage(message, { count, response })
      : message;

  const GroupIcon = iconMapper[icon] || QuestionCircleIcon;

  if (!loaded) {
    return (
      <div className="pf-u-p-md">
        <Skeleton className="pf-u-mb-md" size="lg" />
      </div>
    );
  }
  return (
    <Split hasGutter className="pf-u-mb-md">
      <SplitItem>
        <GroupIcon
          className={classNames('gray', {
            error: icon === 'error',
            warning: icon === 'warning',
            info: icon === 'info',
            green: icon === 'success',
          })}
        />
      </SplitItem>
      <SplitItem isFilled>
        <Stack>
          <StackItem className="pf-u-mb-sm">
            <a
              href={action.href}
              {...(action.external
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {})}
            >
              {text(action.title)}
            </a>
          </StackItem>
          <StackItem>
            <TextContent>
              {description && <Text>{text(description)}</Text>}
            </TextContent>
          </StackItem>
        </Stack>
      </SplitItem>
    </Split>
  );
};

RecommendationEntry.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([
    'insights',
    'ansible',
    'lightbulb',
    'error',
    'list',
    'history',
    'cog',
    'play',
    'unknown',
    'download',
  ]),
  state: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  action: PropTypes.shape({
    external: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    href: PropTypes.string.isRequired,
  }),
};

export default RecommendationEntry;
