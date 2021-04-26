import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Text,
  Title,
} from '@patternfly/react-core';

import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/Skeleton';

import { useDispatch } from 'react-redux';

import { removeEstateTile } from '../../store/actions';
import useRequest from './use-request';

const FirstPanelTile = ({ id, ...tile }) => {
  const dispatch = useDispatch();
  // No count = no data, remove it from redux store and load next in line
  const onResponse = ({ count, show }) =>
    (typeof count !== 'number' || show === false) &&
    dispatch(removeEstateTile(id));
  // If tile fails to load, remove it from redux store and load next in line
  const onError = () => dispatch(removeEstateTile(id));

  const [{ loaded, title, count, href }] = useRequest(
    tile,
    onResponse,
    onError
  );

  return (
    <DescriptionListGroup className="estate-group">
      <DescriptionListDescription
        className={classnames('estate-section', {
          'is-empty': tile?.shape?.section?.length === 0,
        })}
      >
        <Text title={tile?.shape?.section} component="p">
          {tile?.shape?.section}
        </Text>
      </DescriptionListDescription>
      <DescriptionListTerm className="estate-count">
        <Title headingLevel="h5" size="3xl">
          {loaded ? (
            <a href={href || '#'}>{count}</a>
          ) : (
            <Skeleton size={SkeletonSize.md} className="ins-m-dark" />
          )}
        </Title>
      </DescriptionListTerm>
      <DescriptionListDescription className="estate-title">
        {loaded ? (
          <Text title={title} component="p">
            {title}
          </Text>
        ) : (
          <Skeleton size={SkeletonSize.lg} className="ins-m-dark" />
        )}
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

FirstPanelTile.propTypes = {
  id: PropTypes.string.isRequired,
  shape: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    section: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default FirstPanelTile;
