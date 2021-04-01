import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Skeleton,
  Text,
  Title,
} from '@patternfly/react-core';
import { useDispatch } from 'react-redux';

import { removeEstateTile } from '../../store/actions';
import useRequest from './use-request';

const FirstPanelTile = ({ id, ...tile }) => {
  const dispatch = useDispatch();
  // No count = no data, remove it from redux store and load next in line
  const onResponse = ({ count }) =>
    typeof count !== 'number' && dispatch(removeEstateTile(id));
  // If tile fails to load, remove it from redux store and load next in line
  const onError = () => dispatch(removeEstateTile(id));

  const [{ loaded, title, count }] = useRequest(tile, onResponse, onError);

  return (
    <DescriptionListGroup className="estate-group">
      <DescriptionListDescription
        className={classnames('estate-section', {
          'is-empty': tile?.shape?.section?.length === 0,
        })}
      >
        <Text component="p">
          {tile?.shape?.section}&nbsp;
          {/** empty line char is required to keep proper horizontal alignment. Empty "p" tag does not have height */}
        </Text>
      </DescriptionListDescription>
      <DescriptionListTerm className="estate-count">
        <Title headingLevel="h5" size="3xl">
          {loaded ? count : <Skeleton screenreaderText="Loading data" />}
        </Title>
      </DescriptionListTerm>
      <DescriptionListDescription className="estate-title">
        {loaded ? (
          <Text component="p">{title}</Text>
        ) : (
          <Skeleton screenreaderText="Loading title" />
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
