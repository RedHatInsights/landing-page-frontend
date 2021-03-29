import React, { useEffect, useState } from 'react';
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
import processRequest from '../../contentApi/request-processor';
import { useDispatch } from 'react-redux';
import { removeEstateTile } from '../../store/actions';

const FirstPanelTile = ({ id, ...tile }) => {
  const [{ loaded, title, count, section }, setData] = useState({
    loaded: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    processRequest(tile)
      .then((data) => setData({ loaded: true, ...data }))
      .catch(() => {
        /**
         * If tile fails to load, remove it from redux store and load next in line
         */
        dispatch(removeEstateTile(id));
      });
  }, []);
  return (
    <DescriptionListGroup className="estate-group">
      <DescriptionListDescription
        className={classnames('estate-section', {
          'is-empty': section?.length === 0,
        })}
      >
        <Text component="p">
          {section}&nbsp;
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
